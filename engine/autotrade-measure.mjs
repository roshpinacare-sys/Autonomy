#!/usr/bin/env node
/**
 * autotrade-measure.mjs — מדידה-חיה-לשער-הסיכון [t54 · agent-9] · AUTOHEDGE-MEASURE/1
 * ══════════════════════════════════════════════════════════════════════════════════
 * אוסף מדידה חיה (keyless, ציבורי-בלבד) ומעביר אותה דרך AUTOHEDGE-GATE/1:
 *   · יתרות-חיות של חשבון-הסוחר (STEEM/SBD) — condenser_api.get_accounts
 *   · כל-הפקודות-הפתוחות שלו — condenser_api.get_open_orders  → הגל-המוצע שנבדק
 *     (מבחן-אמת: האם-הגריד-העומד כרגע עובר את שער-הסיכון שלנו?)
 *   · מחיר-אמצע מהספר-הפנימי — condenser_api.get_order_book
 *   · שער-חוץ (oracle) — CoinGecko (STEEM + SBD מול-USD) לפער-ארביטראז אמיתי
 * פלט: JSON אחד — מדידה + פסק-דין + פער-ארביטראז. fail-closed: כל-רקב-רשת
 * מניב UNMEASURED (לעולם לא PASS-שקרי). אפס-סודות, אפס-חתימה, אפס-שידור.
 *
 * שימוש: node engine/autotrade-measure.mjs [--account headcorner]
 */
import { hedgeGateVerdict } from "./autotrade-hedge-gate.mjs";

const RPC = "https://api.steemit.com";
async function rpc(method, params) {
  const body = JSON.stringify({ jsonrpc: "2.0", method, params, id: 1 });
  for (let i = 0; i < 3; i++) {
    try {
      const res = await fetch(RPC, { method: "POST", body, headers: { "Content-Type": "application/json" } });
      const j = await res.json();
      if (j && j.result !== undefined) return j.result;
    } catch { /* retry */ }
    await new Promise(r => setTimeout(r, 1200));
  }
  throw new Error(`rpc-fail:${method}`);
}
async function oracleUsd() {
  // CoinGecko keyless; אם-רקב → נזרוק (fail-closed), לא נמציא מחיר
  const url = "https://api.coingecko.com/api/v3/simple/price?ids=steem,steem-dollars&vs_currencies=usd";
  for (let i = 0; i < 2; i++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "saos-agent9/1 (keyless probe)" } });
      if (res.ok) {
        const j = await res.json();
        const s = j?.steem?.usd, sbd = j?.["steem-dollars"]?.usd;
        if (Number.isFinite(s) && Number.isFinite(sbd) && s > 0 && sbd > 0) return { steemUsd: s, sbdUsd: sbd, src: "coingecko" };
      }
    } catch { /* retry */ }
    await new Promise(r => setTimeout(r, 1500));
  }
  throw new Error("oracle-fail");
}

export async function measureAndGate(account = "headcorner") {
  const now = new Date().toISOString();
  try {
    const [accArr, openOrders, book, px] = await Promise.all([
      rpc("condenser_api.get_accounts", [[account]]),
      rpc("condenser_api.get_open_orders", [account]),
      rpc("condenser_api.get_order_book", [10]),
      oracleUsd(),
    ]);
    const acc = accArr?.[0];
    if (!acc) throw new Error("account-not-found");
    const baseBal = parseFloat(acc.balance);              // STEEM נזיל
    const quoteBal = parseFloat(acc.sbd_balance);         // SBD
    // get_order_book returns asks/bids as {order_price:{base,quote}, real_price, steem, sbd}
    // real_price = SBD per STEEM (base of book). אמצע-הספר:
    let mid = null;
    try {
      const b = parseFloat(book.bids[0].real_price), a = parseFloat(book.asks[0].real_price);
      if (Number.isFinite(b) && Number.isFinite(a) && b > 0 && a > 0) mid = (a + b) / 2;
    } catch { mid = null; }
    if (!Number.isFinite(baseBal) || !Number.isFinite(quoteBal) || !mid) throw new Error("book-or-balance-unmeasured");

    // הגל-הנבדק = הפקודות-הפתוחות החיות (האם הגריד-העומד עובר-את-השער?)
    // limit_order_create: sell_price.base = מה נמכר, sell_price.quote = מה מתקבל.
    //   נמכר STEEM → SELL, מחיר = quote/base (SBD ל-STEEM);
    //   נמכר SBD → BUY, מחיר = base/quote (SBD ל-STEEM).
    const orders = (openOrders || []).map(o => {
      const base = String(o.sell_price.base), quote = String(o.sell_price.quote);
      if (base.includes("STEEM")) {
        const amount = parseFloat(base);
        const price = parseFloat(quote) / Math.max(1e-9, amount);
        return { side: "sell", amount, price: +price.toFixed(6) };
      }
      const amount = parseFloat(base); // SBD
      const price = amount / Math.max(1e-9, parseFloat(quote));
      return { side: "buy", amount: parseFloat(quote), price: +price.toFixed(6) };
    });

    const gate = hedgeGateVerdict({ baseBal, quoteBal, mid, orders, now });

    // פער-ארביטראז אמיתי: מחיר-פנימי (mid × SBD/USD) מול STEEM/USD-חוץ
    const internalUsd = mid * px.sbdUsd;
    const gapPct = ((internalUsd - px.steemUsd) / px.steemUsd) * 100;

    return {
      protocol: "AUTOHEDGE-MEASURE/1", account, now,
      measured: {
        baseBal, quoteBal, mid: +mid.toFixed(6), openOrders: (openOrders || []).length,
        oracle: px,
      },
      gate,
      arb: {
        internalSteemUsd: +internalUsd.toFixed(6),
        externalSteemUsd: px.steemUsd,
        gapPct: +gapPct.toFixed(3),
        edge: gapPct > 0.5 ? "SELL-INTERNAL-PREMIUM" : gapPct < -0.5 ? "BUY-INTERNAL-DISCOUNT" : "NO-EDGE(<0.5%)",
      },
    };
  } catch (e) {
    return {
      protocol: "AUTOHEDGE-MEASURE/1", account, now,
      verdict: "UNMEASURED", reason: `fail-closed: ${e.message}`,
      gate: hedgeGateVerdict({ baseBal: NaN, quoteBal: NaN, mid: NaN, orders: [], now }),
    };
  }
}

/* ── CLI ─────────────────────────────────────────────────────────────────────── */
if (import.meta.url === `file://${process.argv[1]}`) {
  const argv = process.argv.slice(2);
  const known = new Set(["--account"]);
  const unknown = argv.filter(a => a.startsWith("--") && !known.has(a));
  if (unknown.length) { console.error(`unknown-config-keys=failure: ${unknown.join(" ")}`); process.exit(2); }
  const idx = argv.indexOf("--account");
  const account = idx >= 0 ? argv[idx + 1] : "headcorner";
  measureAndGate(account).then(v => { process.stdout.write(JSON.stringify(v, null, 1) + "\n"); });
}
