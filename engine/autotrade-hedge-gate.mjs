#!/usr/bin/env node
/**
 * autotrade-hedge-gate.mjs — שער-סיכון-לפני-ביצוע [t54 · agent-9] · AUTOHEDGE-GATE/1
 * ══════════════════════════════════════════════════════════════════════════════════
 * נולד מפקודת-בעלים (t54): "בחן את אלו ונצל מה שניתן בהתאמה לריבונות האוטונומית שלנו
 * שיביא לנו ערך ככל הניתן — בחן תכנן בצע דחוף" על github.com/The-Swarm-Corporation/AutoHedge.
 *
 * מה אומץ (דפוסים-בלבד, R330 — הקוד-שלהם לא רץ כאן):
 *   1. Risk-first design: ב-AutoHedge כל-צינור הוא Director→Quant→RISK→Execution —
 *      שלב-הסיכון חוסם-ביצוע לפני-חתימה. אנחנו ממכניזים את שלב-ה-Risk בלי-LLM-ובלי-עלות:
 *      שער-חישובי-טהור שכל-גל-פקודות (grid/arb) נדרש לעבור דרכו לפני שידור.
 *   2. MarketMakingConfig (experimental/market_making.py שלהם) — הפרמטרים שנאמצו
 *      כחוקת-ברירת-מחדל-שלנו: גודל-פקודה ≤1% מהון-עובד · חשיפת-מלאי-חד-צדדית ≤20% ·
 *      סף-איזון-מחדש 10% · רווח-מינימלי 0.2%. מותאם לספרים-הפנימיים STEEM/SBD שלנו.
 *
 * מה-הוא-עושה: קלט = מדידה-חיה (יתרות + מחיר-אמצע) + גל-פקודות מוצע; פלט = פסק-דין
 *   PASS / BLOCK(סיבות-לכל-פקודה) / UNMEASURED (fail-closed). אפס-סודות, אפס-רשת-בשער;
 *   הרשת נמדדת בעורק (artery-autotrade-gate) והפסק-דין מתפרסם כקבלה.
 *
 * שימוש: node engine/autotrade-hedge-gate.mjs --selftest
 *         node engine/autotrade-hedge-gate.mjs --json '{...}'   (קלט-מדידה)
 */

/** חוקת-ברירת-מחדל — נגזרת מ-MarketMakingConfig של-AutoHedge, מותאמת-לספרים-שלנו */
export const HEDGE_CFG = {
  ORDER_SIZE_PCT: 0.01,          // ≤1% מהון-עובד לפקודה-בודדת
  MAX_INVENTORY_EXPOSURE: 0.20,  // ≤20% מהסה"כ בצד-אחד (base)
  REBALANCE_THRESHOLD: 0.10,     // סטיית-מלאי >10% מהיעד = המלצת-איזון
  MIN_PROFIT_PCT: 0.002,         // כל-פקודה חייבת-רווח-מינימלי 0.2% מהאמצע
};

/**
 * שער-הסיכון — pure (testable): ממדידה+גל-מוצע לפסק-דין. אפס-סודות, אפס-רשת.
 * @param {object} p
 * @param {number} p.baseBal    - יתרת-מטבע-הבסיס (STEEM) נמדדת
 * @param {number} p.quoteBal   - יתרת-מטבע-הציטוט (SBD) נמדדת
 * @param {number} p.mid        - מחיר-אמצע נמדד מהספר
 * @param {Array}  p.orders     - [{side:'buy'|'sell', amount, price}] ביחידות-base
 * @param {object} [p.cfg]      - עקיפת-חוקה לבדיקות
 */
export function hedgeGateVerdict({ baseBal, quoteBal, mid, orders = [], cfg = HEDGE_CFG, now = "T" }) {
  const fin = (x) => Number.isFinite(x) && x >= 0;
  if (!fin(baseBal) || !fin(quoteBal) || !(fin(mid) && mid > 0)) {
    return { protocol: "AUTOHEDGE-GATE/1", verdict: "UNMEASURED", now,
      reason: "base/quote/mid not finite-positive — fail-closed (no orders without fresh measurement)" };
  }
  if (!Array.isArray(orders)) orders = [];
  const badOrder = orders.some(o => !o || !fin(o.amount) || !(fin(o.price) && o.price > 0) ||
    (o.side !== "buy" && o.side !== "sell"));
  if (badOrder) {
    return { protocol: "AUTOHEDGE-GATE/1", verdict: "UNMEASURED", now,
      reason: "malformed order in burst — fail-closed (t54: unknown-config-keys=failure, Vibe-Trading #1935 pattern)" };
  }

  const baseVal = baseBal * mid;                 // הון-בסיס במונחי-ציטוט
  const working = baseVal + quoteBal;            // הון-עובד
  if (!(working > 0)) {
    return { protocol: "AUTOHEDGE-GATE/1", verdict: "UNMEASURED", now,
      reason: "zero working capital — nothing to gate" };
  }

  // חשיפת-מלאי-נוכחית (צד-base)
  const curExposure = baseVal / working;

  const reasons = [];                            // סיבות-חסימה לפקודות
  let baseSideNew = 0;                           // סך-בקשות-קנייה (מגדיל-חשיפת-base)
  orders.forEach((o, i) => {
    const tag = `#${i}(${o.side})`;
    const orderVal = o.amount * (o.side === "buy" ? o.price : mid);
    if (orderVal > cfg.ORDER_SIZE_PCT * working * 1.0000001) {
      reasons.push(`${tag} size ${(100 * orderVal / working).toFixed(2)}% > cap ${(100 * cfg.ORDER_SIZE_PCT).toFixed(1)}%`);
    }
    // רווח-מינימלי: buy מתחת-לאמצע / sell מעל-האמצע ברווח-מינימלי
    const edge = o.side === "buy" ? (mid - o.price) / mid : (o.price - mid) / mid;
    if (edge < cfg.MIN_PROFIT_PCT) {
      reasons.push(`${tag} edge ${(100 * edge).toFixed(3)}% < min ${(100 * cfg.MIN_PROFIT_PCT).toFixed(1)}%`);
    }
    if (o.side === "buy") baseSideNew += o.amount;
  });

  // חוק-החשיפה (מותאם-כנה: עמדה-קיימת-לא-נחסמת-לצמיתות):
  //   אם-החשיפה-הנוכחית מתחת-לתקרה → הגל לא-ידחוף-אותה-מעל-התקרה;
  //   אם-היא-כבר-מעל-התקרה → אסור-להעמיק (כל-קנייה-חדשה נחסמת; מכירות מתקבלות-תמיד).
  const postExposure = (baseVal + baseSideNew * mid) / working;
  const exposureCeiling = Math.max(cfg.MAX_INVENTORY_EXPOSURE, curExposure);
  if (postExposure > exposureCeiling * 1.0000001) {
    reasons.push(`post-burst base exposure ${(100 * postExposure).toFixed(1)}% > ceiling ${(100 * exposureCeiling).toFixed(1)}% (cur ${curExposure <= cfg.MAX_INVENTORY_EXPOSURE ? "below cap" : "above cap — no new buys, sells only"})`);
  }

  // מלצת-איזון-מחדש (ייעוץ — לא חוסמת)
  const targetExposure = cfg.MAX_INVENTORY_EXPOSURE / 2; // יעד-סימטרי: 10%
  const advisory = Math.abs(curExposure - targetExposure) > cfg.REBALANCE_THRESHOLD
    ? `REBALANCE: current base exposure ${(100 * curExposure).toFixed(1)}% vs target ${(100 * targetExposure).toFixed(0)}%`
    : null;

  return {
    protocol: "AUTOHEDGE-GATE/1",
    verdict: reasons.length ? "BLOCK" : "PASS",
    now,
    measured: {
      workingCapitalQuote: +working.toFixed(4),
      currentBaseExposurePct: +(100 * curExposure).toFixed(2),
      postBurstBaseExposurePct: +(100 * postExposure).toFixed(2),
      orders: orders.length,
    },
    blocked: reasons,
    advisory,
    reason: reasons.length
      ? `risk-before-execution: ${reasons.length} order(s) blocked`
      : (advisory ? `PASS with advisory — ${advisory}` : "PASS — burst within risk-first caps (AutoHedge-pattern, mechanical)"),
  };
}

/* ── selftest — דטרמיניסטי, אפס-רשת ─────────────────────────────────────────── */
export function selftest() {
  let n = 0;
  const A = (c, m) => { n++; if (!c) { console.error("SELFTEST-FAIL:", m); process.exitCode = 1; } };
  const g = (args) => hedgeGateVerdict({ now: "T", ...args });

  // הון-עובד 1000 (base 500 STEEM × mid 1.0 + quote 500)
  const base = { baseBal: 500, quoteBal: 500, mid: 1.0 };

  // 1. גל-ריק = PASS (שער-לא-חוסם-שהייה)
  A(g({ ...base, orders: [] }).verdict === "PASS", "empty burst passes");

  // 2. מכירה-קטנה-רווחית מעמדה-50% → PASS (חוק-הדלתא: מכירה-מקטינה, לא-מעמיקה) + המלצת-איזון
  const v2 = g({ ...base, orders: [{ side: "sell", amount: 5, price: 1.005 }] });
  A(v2.verdict === "PASS", "small profitable sell passes");
  A(v2.advisory && v2.advisory.startsWith("REBALANCE"), "exposure 50% vs symmetric target 10% → rebalance advisory");

  // 2b. קנייה-מתחת-לתקרה-מעמדה-נמוכה: cur 10% → post 10.5% ≤ ceiling 20% → PASS
  const v2b = g({ baseBal: 100, quoteBal: 900, mid: 1.0, orders: [{ side: "buy", amount: 5, price: 0.99 }] });
  A(v2b.verdict === "PASS", "buy below cap from low exposure passes");

  // 2c. קנייה-מעל-תקרה-היסטורית: cur 50% (מעל-cap 20%) + קנייה-חדשה-קטנה → מעמיקה → BLOCK
  const v2c = g({ ...base, orders: [{ side: "buy", amount: 5, price: 0.99 }] });
  A(v2c.verdict === "BLOCK", "any new buy above existing ceiling blocked (no deepening)");

  // 3. פקודה-ענקית: 20% מההון (>1% cap) → BLOCK
  const v3 = g({ ...base, orders: [{ side: "sell", amount: 200, price: 1.005 }] });
  A(v3.verdict === "BLOCK", "oversized order blocked (size cap)");

  // 4. אפס-רווח: קנייה-בדיוק-באמצע (edge=0 < 0.2%) → BLOCK
  const v4 = g({ ...base, orders: [{ side: "buy", amount: 1, price: 1.0 }] });
  A(v4.verdict === "BLOCK", "mid-price buy blocked (min profit)");

  // 5. חשיפה-אחרי-גל-קניות-עוברת-את-התקרה
  //    base 500→הוספת-קניות 150-SBT-value ב-0.99 → post 65/100=65% > 20% → BLOCK
  const v5 = g({ ...base, orders: [{ side: "buy", amount: 151.5, price: 0.99 }] });
  A(v5.verdict === "BLOCK", "post-burst exposure cap enforced");
  //    (הפקודה-הזו גם-גודל-15%>1% — שתי-סיבות; נוודא ששתיהן-נתפסו)
  A(v5.blocked.length >= 2, "multiple reasons accumulated per burst");

  // 6. מצב-מדוד-חד-צדדי: כל-ההון ב-base → exposure 100%, גל-ריק = PASS+advisory-איזון
  const v6 = g({ baseBal: 1000, quoteBal: 0, mid: 1.0, orders: [] });
  A(v6.verdict === "PASS" && v6.advisory && v6.advisory.startsWith("REBALANCE"), "all-base inventory → advisory rebalance");

  // 7. fail-closed: מדידה-רקובה → UNMEASURED
  A(g({ baseBal: NaN, quoteBal: 500, mid: 1.0, orders: [] }).verdict === "UNMEASURED", "NaN base → fail-closed");
  A(g({ ...base, orders: [{ side: "steal", amount: 1, price: 1 }] }).verdict === "UNMEASURED", "malformed side → fail-closed");
  A(g({ ...base, orders: [{ side: "buy", amount: 1, price: -1 }] }).verdict === "UNMEASURED", "negative price → fail-closed");

  // 8. אפס-הון → UNMEASURED (nothing to gate)
  A(g({ baseBal: 0, quoteBal: 0, mid: 1.0, orders: [] }).verdict === "UNMEASURED", "zero capital → UNMEASURED");

  // 9. מכירות-מקטינות-חשיפה: base-כבד (80%) + מכירה-תקינה → post יורד, PASS (רק-סיבות-אמת חוסמות)
  const v9 = g({ baseBal: 800, quoteBal: 200, mid: 1.0, orders: [{ side: "sell", amount: 5, price: 1.01 }] });
  A(v9.verdict === "PASS" && v9.advisory && v9.advisory.startsWith("REBALANCE"),
    "sell from heavy base passes gate and advises rebalance");

  console.log(`selftest: ${n} assertions ran, failures = ${process.exitCode ? 1 : 0}`);
}

/* ── CLI ─────────────────────────────────────────────────────────────────────── */
if (import.meta.url === `file://${process.argv[1]}`) {
  const argv = process.argv.slice(2);
  // strict-argv (Vibe-Trading #1935 pattern — t53): דגל-לא-מוכר = מוות-קול
  const known = new Set(["--selftest", "--json"]);
  const unknown = argv.filter(a => a.startsWith("--") && !known.has(a));
  if (unknown.length) {
    console.error(`unknown-config-keys=failure: ${unknown.join(" ")} (typo-proof, fail-closed)`);
    process.exit(2);
  }
  if (argv.includes("--selftest")) { selftest(); process.exit(process.exitCode || 0); }
  if (argv.includes("--json")) {
    const idx = argv.indexOf("--json");
    const raw = argv[idx + 1];
    if (!raw) { console.error("--json requires payload"); process.exit(2); }
    let payload;
    try { payload = JSON.parse(raw); }
    catch (e) { console.error("UNMEASURED: unparsable payload —", e.message); process.exit(3); }
    process.stdout.write(JSON.stringify(hedgeGateVerdict(payload), null, 1) + "\n");
    process.exit(0);
  }
  console.error("usage: --selftest | --json '<payload>'");
  process.exit(2);
}
