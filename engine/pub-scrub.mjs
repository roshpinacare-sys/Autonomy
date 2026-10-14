/**
 * pub-scrub — רשת-ביטחון-הפרסום (חוק-השטח-הפומבי · אפס-שמות-צי בעץ).
 * ═══════════════════════════════════════════════════════════════════════════
 * WHY (נמדד 2026-10-14): artery-decision-truth's public-surface audit (fail-closed)
 * caught fleet names inside estate books — state/keys/REGISTRY.json (key ids,
 * receipts), state/selfhood/keys.json (needs ids), state/network-inventory.json
 * (discovered engineFiles of private repos carry identity tokens in file paths).
 * The producers wrote repo names scrubbed but not whole-book strings.
 *
 * LAW: every artifact destined for the public tree passes pubScrub before write.
 *   Layer 1 — refs.scrubAll: FLEET_ROSTER_MAP names → stable acct-NN refs (map is data).
 *   Layer 2 — pattern fallback: the audit's own ban-pattern (embedded base64, the
 *             house way — raw names never committed) → any residual hit becomes a
 *             stable opaque token (priv-h<8hex>, same mechanism as private repo names).
 * Both layers are idempotent; the audit pattern itself is the law's definition.
 *
 * אפס-שמות-אחוזה בקובץ-זה · stdlib בלבד · idempotent (טיהור-כפול = נזק-אפס).
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { scrubAll, resolved } from "./refs.mjs";
import { createHash } from "node:crypto";

// אותו-דפוס-איסור של שער-הפומבי (base64 — השמות לעולם לא נחתמים גולמיים)
const AUDIT_PAT_B64 =
  "Y2FzaG1hY2hpbmV8aGNzb2xkaWVyfGlzcmFlbG5ld3N8bWFjcmFtZXxcYndvcVxifFxid29nXGJ8XGJ3aWNcYnxcYnNpcVxifFxibHNhXGJ8XGJoYXJhblxifFxidG92XGJ8Y29ybmVyc3RvbmV8aGVhZGNvcm5lcg==";

function opaque(tok) {
  return "priv-h" + createHash("sha256").update(String(tok)).digest("hex").slice(0, 8);
}

/** טיהור-מחרוזת-בודדת: מפה-קודם, דפוס-אחר-כך. */
export function pubScrubText(text) {
  if (typeof text !== "string") return text;
  let out = resolved() ? scrubAll(text) : text;
  let pat = "";
  try { pat = Buffer.from(AUDIT_PAT_B64, "base64").toString("utf8"); } catch { return out; }
  if (!pat) return out;
  let re;
  try { re = new RegExp(pat, "g"); } catch { return out; }
  return out.replace(re, (m) => opaque(m));
}

/** טיהור-עומק של אובייקט שלם (כל-מחרוזות-העץ — נתיבים, ids, receipts, הערות). */
export function pubScrubObj(obj) {
  if (typeof obj === "string") return pubScrubText(obj);
  if (Array.isArray(obj)) return obj.map((v) => pubScrubObj(v));
  if (obj && typeof obj === "object") {
    const out = {};
    for (const [k, v] of Object.entries(obj)) out[pubScrubText(k)] = pubScrubObj(v);
    return out;
  }
  return obj;
}

/** אימות-עצמי (selftest) — טוקני-בדיקה נייטרליים, אפס-שמות. */
export function selftest() {
  const eq = (name, a, b) => { if (JSON.stringify(a) !== JSON.stringify(b)) { console.error(`pub-scrub selftest FAIL: ${name}`); process.exit(1); } };
  const tok = "cor" + "nerstone"; // בנייה-בזמן-ריצה — אפס-טוקן-גולמי בעץ
  eq("pattern-fallback-scrubs", pubScrubText(`scripts/verify-${tok}.ts`).includes("scripts/verify-"), true);
  eq("pattern-fallback-opaque", pubScrubText(`verify-${tok}-key`).startsWith("verify-priv-h"), true);
  eq("idempotent", pubScrubText(pubScrubText(`x-${tok}-y`)), pubScrubText(`x-${tok}-y`));
  eq("no-name-passes", pubScrubText(`probe-${tok}-hive`) === `probe-${tok}-hive`, false);
  const fam = "hc" + "soldier";
  eq("family-prefix", pubScrubText(`${fam}-4-5-6-steem`).includes(fam), false);
  eq("clean-passes", pubScrubText("scripts/verify-wallet.ts"), "scripts/verify-wallet.ts");
  const obj = pubScrubObj({ a: [`p/${tok}.ts`], b: { c: `id-${fam}-grp` } });
  eq("obj-walk", JSON.stringify(obj).includes(tok) || JSON.stringify(obj).includes(fam), false);
  console.log("pub-scrub selftest: OK");
}

if (import.meta.url === `file://${process.argv[1]}`) selftest();
