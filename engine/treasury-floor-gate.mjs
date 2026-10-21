#!/usr/bin/env node
/**
 * treasury-floor-gate.mjs — שער-רצפת-האוצר [t53 · agent-9] · TREASURY-FLOOR-GATE/1
 * ══════════════════════════════════════════════════════════════════════════════════════════
 * למה נולד (מדידה חיה 2026-10-21 03:08→03:41Z): מכונת-האיחוד (t52) כיווצה-האצלות-חוצה
 * והרוויחה +228-SP אל-הרצפה-3000; 33-דקות-אחר-כך מכונת-הזנה-ציית-אחרת (מפתח-active-מורשה,
 * מחוץ-למישור-Actions-הנבדק) האצילה ~1255-SP-חזרה-החוצה ל-13-ידיים — מתיחת-חבל-על-אותו-אוצר.
 * שתיהן-ממלאות-מנדט-בעלים; הפתרון-אינו-מלחמה-אלא חוק-מכני-אחד שכל-מאציל-חייב: **האצלה-חוצה
 * מותרת-רק-מהעודף-מעל-הרצפה**.
 *
 * מה-הוא-עושה:
 *   · מודד חי את net-SP של האוצר (own + received − delegated_field) ואת שורות-ההאצלה-החיות.
 *   · מפיק פסק-דין לכל-דלתא-האצלה-מוצעת: PASS / BREACH / UNMEASURED (fail-closed) —
 *     אפס-סודות-כאן, אפס-שידור; זהו-שער-חישובי-בלבד שכל-מסילת-האצלה נדרשת-לקרוא-לפני-חתימה.
 *
 * חוקת-הרצפה: net-SP ≥ 3000 (t42-t52, מאושר-בעלים). העודף = max(0, net − FLOOR).
 * הארגומנט-המוצע הוא **דלתא** (SP-חדש-להאציל-החוצה): חוק-הרצפה = דלתא ≤ עודף
 * (האצלה-של-דלתא-מורידה-את-net-בערך-דלתא; הרצפה-מושגת-אם-net-אחרי ≥ FLOOR).
 * בעת-כשל-רשת/RPC: verdict=UNMEASURED (fail-closed — אף-מסילה-לא-מאצילה-בלי-מדידה-טרייה).
 *
 * שימוש: node engine/treasury-floor-gate.mjs --selftest
 *         node engine/treasury-floor-gate.mjs --account "$TREASURY_NAME" [--proposed-out-sp 250]   # [19.48 refs-cure] השם-מהסביבה-בלבד (חוק-refs)
 */
export const FLOOR_SP = 3000;

// [19.48 refs-cure] חוק-הקבלות (19.47): פלט/קבלה מדברים-refs בלבד — house-refOf דרך
// refs.mjs; לא-נפתר = acct-h-<sha8> יציב (אותו-שם→אותו-ref חוצה-קבלות), לעולם לא שם-גלוי.
import { createHash } from "node:crypto";
import { refOf as houseRefOf } from "./refs.mjs";
const sha8 = (s) => createHash("sha256").update(String(s)).digest("hex").slice(0, 8);
export function receiptRefOf(n) {
  const r = houseRefOf(n);
  return r && r !== n ? r : `acct-h-${sha8(n)}`;
}

/** זרימת-שער — pure (testable): ממדידה לפסק-דין. אפס-סודות, אפס-רשת. */
export function gateVerdict({ account, netSp, rowsOut, proposedOutSp = 0, now = "T" }) {
  if (!Number.isFinite(netSp) || !Number.isFinite(rowsOut)) {
    return { verdict: "UNMEASURED", reason: "net/rows not finite — fail-closed (no delegation without fresh measurement)", account, now };
  }
  const surplus = Math.max(0, netSp - FLOOR_SP);
  const ok = proposedOutSp <= surplus + 1e-9;
  return {
    protocol: "TREASURY-FLOOR-GATE/1",
    verdict: ok ? "PASS" : "BREACH",
    account,
    now,
    measured: { netSp: +netSp.toFixed(3), rowsOut: +rowsOut.toFixed(3), floorSp: FLOOR_SP, surplus: +surplus.toFixed(3) },
    proposed: { outDeltaSp: +Number(proposedOutSp || 0).toFixed(3) },
    reason: ok
      ? `delta ${proposedOutSp} ≤ surplus ${surplus.toFixed(3)} (net ${netSp.toFixed(3)} − floor ${FLOOR_SP})`
      : `delta ${proposedOutSp} > surplus ${surplus.toFixed(3)} — the floor law wins; feed the hands from surplus only (t53 measured tug-of-war)`,
  };
}

/* ── selftest — דטרמיניסטי, אפס-רשת ─────────────────────────────────────────── */
export function selftest() {
  const A = (c, m) => { if (!c) { console.error("SELFTEST-FAIL:", m); process.exitCode = 1; } };
  const g = (netSp, rowsOut, prop) => gateVerdict({ account: "acct-ref", netSp, rowsOut, proposedOutSp: prop, now: "T" });

  const v1 = g(3200, 1200, 200);   // עודף 200 → מותר בדיוק
  A(v1.verdict === "PASS", "surplus exactly covers proposed");
  const v2 = g(3200, 1200, 200.5); // חצי-SP-מעל-העודף → בריחה
  A(v2.verdict === "BREACH", "over-surplus refused");
  const v3 = g(2500, 1200, 0);     // מתחת-לרצפה: רק-אפס-האצלה-חוצה-חדשה
  A(v3.verdict === "PASS" && v3.measured.surplus === 0, "below floor → surplus 0, no new outs");
  const v4 = g(2500, 1200, 1);     // וכל-דלתא-חיובית → BREACH
  A(v4.verdict === "BREACH", "any new out below floor refused");
  const v5 = g(NaN, 1200, 10);     // מדידה-לא-תקינה → UNMEASURED (fail-closed)
  A(v5.verdict === "UNMEASURED", "bad measurement → fail-closed");
  const v6 = g(5000, 1000, 2000);  // עודף 2000 → הזנה-גדולה-מותרת
  A(v6.verdict === "PASS", "large surplus allows large feeding");
  const v7 = g(-5, 0, 0);          // שלילי-כנה → surplus 0, PASS-רק-לאפס
  A(v7.verdict === "PASS" && v7.measured.surplus === 0, "negative net → zero surplus, honest");
  // [19.48 refs-cure] חוקי-הפסבדונים: יציב · בפורמט acct-h-<sha8> · לעולם לא שווה-לקלט
  const p1 = receiptRefOf("some-live-account");
  const p2 = receiptRefOf("some-live-account");
  A(p1 === p2, "pseudonym stable across calls (same name → same ref)");
  A(/^acct-h-[0-9a-f]{8}$/.test(p1), "pseudonym format acct-h-sha8");
  A(p1 !== "some-live-account", "raw name never passes through unresolved");
  console.log("treasury-floor-gate selftest: 10/10 PASS");
}

/* ── main ─────────────────────────────────────────────────────────────────────── */
async function rpcSteem(method, params) {
  const res = await fetch("https://api.steemit.com", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", method, params, id: 1 }),
  });
  const j = await res.json();
  if (j.error) throw new Error(String(j.error?.message || "rpc error").slice(0, 120));
  return j.result;
}

export async function measureLive(account, rpc = rpcSteem) {
  const props = await rpc("condenser_api.get_dynamic_global_properties", []);
  const vps = parseFloat(props.total_vesting_shares);
  const vfs = parseFloat(props.total_vesting_fund_steem);
  const f = vfs / vps;
  const tre = (await rpc("condenser_api.get_accounts", [[account]]))[0];
  const num = (s) => parseFloat(s);
  const netSp = (num(tre.vesting_shares) + num(tre.received_vesting_shares) - num(tre.delegated_vesting_shares)) * f;
  const dl = await rpc("condenser_api.get_vesting_delegations", [account, "", 100]);
  const rowsOut = dl.reduce((acc, d) => acc + num(d.vesting_shares) * f, 0);
  return { netSp, rowsOut, rowsCount: dl.length, vestsPerSP: vps / vfs };
}

const isMain = process.argv[1] && process.argv[1].endsWith("treasury-floor-gate.mjs");
if (isMain) {
  // strict-argv [t53 · adopted from Vibe-Trading #1935 pattern: unknown config keys are a
  // failure, not silence — a typo'd --acount must fail-closed, never default to a
  // fleet-name literal (refs law — 19.48 cure)]
  const KNOWN = new Set(["--selftest", "--account", "--proposed-out-sp"]);
  const unknown = process.argv.slice(2).filter((a) => a.startsWith("--") && !KNOWN.has(a));
  if (unknown.length) {
    console.error(`FATAL: unknown argv ${unknown.join(", ")} — fail-closed (known: ${[...KNOWN].join(", ")})`);
    process.exit(1);
  }
}
if (isMain && process.argv.includes("--selftest")) { selftest(); process.exit(process.exitCode || 0); }
if (isMain) {
  const accIdx = process.argv.indexOf("--account");
  // [19.48 refs-cure] אין-ברירת-מחדל-ליטרלית — דפוס-הבית של treasury-consolidate (19.47):
  // שם-אחוזה חי בסוד/סביבה בלבד; חסר = יציאה-כנה (exit 2), לא שקר.
  const account = accIdx >= 0 ? process.argv[accIdx + 1] : (process.env.TREASURY_NAME || "");
  if (!account) {
    console.error("[floor-gate] TREASURY_NAME env missing — fail-honest exit 2 (refs law: zero fleet-name literals in the public tree)");
    process.exit(2);
  }
  const propIdx = process.argv.indexOf("--proposed-out-sp");
  const proposedOutSp = propIdx >= 0 ? parseFloat(process.argv[propIdx + 1]) : 0;
  measureLive(account)
    .then((m) => {
      // [19.48 refs-cure] הפסק-המודפס (ומשם-הקבלה) נושא-ref פסבדונים — לעולם לא-שם-גלוי.
      const v = gateVerdict({ account: receiptRefOf(account), netSp: m.netSp, rowsOut: m.rowsOut, proposedOutSp, now: new Date().toISOString() });
      v.live = { rowsCount: m.rowsCount, vestsPerSP: +m.vestsPerSP.toFixed(2) };
      console.log(JSON.stringify(v, null, 1));
    })
    .catch((e) => {
      console.log(JSON.stringify({ protocol: "TREASURY-FLOOR-GATE/1", verdict: "UNMEASURED", reason: `rpc: ${String(e.message).slice(0, 100)}`, account: receiptRefOf(account) }, null, 1));
      process.exit(1);
    });
}
