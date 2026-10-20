/**
 * claims-ledger.mjs — R310 · הפנקס-הטענות הניתן-לשקר (Falsifiable Claims Ledger).
 *
 * מדוד (2026-10-20): הפער-המרכזי בריבונות אינו תשתית — הוא **פער-טענות**:
 * הארכיטקטורה מדווחת "ירוק" על-בסיס חיות-שירותים (HTTP 200), בזמן שהכלכלה-עצמה
 * קפואה (yield=0 · curator SIGNING-DEAD · פליטה-חברתית STANDBY). התרופה אינה
 * דוח נוסף — היא **מנגנון**: כל-טענה של הארכיטקטורה נרשמת כפריט בעל מבחן-חי
 * (פקודה מדודה), ציפייה, וקריטריון שיקר. כל-ריצה מודדת מחדש — MEASURED-TRUE
 * / REFUTED / UNMEASURABLE — ומצרף ראיה (שורה-אחת, לעולם בלי סודות).
 *
 * חוקים:
 *  - כל-טענה חייבת מבחן-רץ (cmd) + ציפייה (expect). אין-מבחן = UNMEASURABLE (fail-closed).
 *  - הפנקס append-only: היסטוריה מצטברת (claims-history.jsonl); שינוי-טענה = רישום-גרסה, לא עריכה.
 *  - אפס-חשיפה: רק verdict + ראיה-חתוכה (evidence maxChars) — לעולם לא תוכן סוד.
 *  - verdict מחושב מ-exit-code + רגקס על stdout/stderr — אין-טענה-על-בסיס-אמונה.
 *  - R309-a: כל-REFUTED נותב לתיקון-ארכיטקטורה (remedy) — לא לבעלים.
 *
 * CLI:  bun engine/claims-ledger.mjs run [--json] | add <id> | verify <id> | list
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const CLAIMS_FILE = path.join(ROOT, "ops", "sovereign", "CLAIMS.json");
const STATE_DIR = path.join(ROOT, "state", "claims");
const VERDICT_FILE = path.join(STATE_DIR, "claims-verdict.json");
const HISTORY_FILE = path.join(STATE_DIR, "claims-history.jsonl");

const readJson = (p, d = null) => { try { return JSON.parse(fs.readFileSync(p, "utf8")); } catch { return d; } };
const jlog = (v) => console.log(JSON.stringify(v, null, 2));

/* ── measured run of one claim ─────────────────────────────────────────────── */
function measureClaim(claim, { now = new Date().toISOString(), timeoutMs = 30000 } = {}) {
  const t0 = Date.now();
  const base = { id: claim.id, text: claim.text, category: claim.category ?? "general", criticality: claim.criticality ?? "normal", at: now };
  if (!claim.cmd || !claim.expect) {
    return { ...base, verdict: "UNMEASURABLE", evidence: "missing cmd or expect — a claim without a test is a belief, not a claim", remedy: claim.remedy ?? "define cmd+expect or retire the claim", ms: Date.now() - t0 };
  }
  let stdout = "", stderr = "", code = 0, spawnErr = null;
  try {
    const out = execFileSync("/bin/sh", ["-c", claim.cmd], { cwd: ROOT, timeout: timeoutMs, maxBuffer: 1024 * 1024, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    stdout = out ?? "";
  } catch (e) {
    code = e.status ?? 1; stdout = (e.stdout ?? "").toString(); stderr = (e.stderr ?? String(e?.message ?? e)).toString();
    spawnErr = code;
  }
  const combined = `${stdout}\n${stderr}`.slice(0, claim.evidenceMaxChars ?? 200);
  let verdict;
  if (spawnErr === null && (claim.expect.exit ?? 0) !== code) verdict = "REFUTED";
  else if (claim.expect.regex && !new RegExp(claim.expect.regex, "m").test(combined)) verdict = "REFUTED";
  else if (spawnErr === null) verdict = "MEASURED-TRUE";
  else verdict = "UNMEASURABLE";
  return { ...base, verdict: claim.verdictOverride ?? verdict, exit: code, evidence: combined.replace(/\s+/g, " ").trim().slice(0, claim.evidenceMaxChars ?? 200), remedy: verdict === "MEASURED-TRUE" ? null : (claim.remedy ?? null), ms: Date.now() - t0 };
}

/* ── run the whole ledger ──────────────────────────────────────────────────── */
export function runLedger({ now = new Date().toISOString() } = {}) {
  const ledger = readJson(CLAIMS_FILE);
  if (!ledger?.claims?.length) return { ok: false, verdict: "LEDGER-ABSENT", error: "no claims file or empty", at: now };
  const results = ledger.claims.map((c) => measureClaim(c, { now }));
  const counts = results.reduce((a, r) => { a[r.verdict] = (a[r.verdict] ?? 0) + 1; return a; }, {});
  /* R310 · REFUTATION TAXONOMY (the T-16 lesson applied to the ledger itself —
   * measured 2026-10-20: overall=CLAIMS-REFUTED while the machine-side truth
   * was 12-alive/0-dead + cycle-ok, ONLY because two OWNER-GATED claims
   * (push-channel, yield) were lawfully waiting for the operator — one number
   * conflating "machine sick" with "machine lawfully waiting for its owner".
   * Law: a refutation of an explicitly-marked externalGate claim (owner-side
   * gate, remedy routes to the owner, graded at its own ladder step) or of a
   * normal-criticality tracked-debt claim is a LAWFUL WAIT, not a malfunction:
   * overall=CLAIMS-PARTIAL. Any high/critical MACHINE-SIDE refutation is a
   * real malfunction: overall=CLAIMS-REFUTED. The marking lives in the claims
   * file itself — visible, auditable, revocable by the owner. */
  const claimById = Object.fromEntries(ledger.claims.map((c) => [c.id, c]));
  const machineRefuted = results.filter((r) => {
    if (r.verdict !== "REFUTED") return false;
    const c = claimById[r.id] ?? {};
    if (c.externalGate === "owner") return false;
    return c.criticality === "high" || c.criticality === "critical";
  });
  const overall = machineRefuted.length > 0 ? "CLAIMS-REFUTED"
    : ((counts.REFUTED ?? 0) + (counts.UNMEASURABLE ?? 0)) > 0 ? "CLAIMS-PARTIAL"
    : "CLAIMS-TRUE";
  const doc = { schema: "claims-ledger/1", at: now, overall, counts, results };
  fs.mkdirSync(STATE_DIR, { recursive: true });
  fs.writeFileSync(VERDICT_FILE, JSON.stringify(doc, null, 2) + "\n");
  fs.appendFileSync(HISTORY_FILE, JSON.stringify({ at: now, overall, counts, results: results.map(({ id, verdict }) => ({ id, verdict })) }) + "\n");
  return doc;
}

/* ── sovereignty grade S0..S5 — the ladder the owner can read at a glance ──── */
/* S0 human-in-loop for everything · S1 organs alive, human pushes ·
 * S2 self-measuring (claims ledger green) · S3 self-healing fleet + signed identity ·
 * S4 economy pays its own costs (yield rail live) · S5 self-reproducing on own network */
export function sovereigntyGrade(now = new Date().toISOString()) {
  const v = readJson(VERDICT_FILE);
  if (!v) return { grade: "S0", reason: "no claims verdict measured yet", at: now };
  const claims = Object.fromEntries((v.results ?? []).map((r) => [r.id, r.verdict]));
  const t = (id) => claims[id] === "MEASURED-TRUE";
  /* CUMULATIVE LADDER: grade N holds only if every gate up to N holds —
   * a strong S5 test can never mask a dead S3 (measured defect 2026-10-20:
   * a weak S5 proxy graded S5 while 9 claims were REFUTED — fixed). */
  const ladder = [
    ["S1", t("organs-7-alive")],
    ["S2", v.overall === "CLAIMS-TRUE" || v.overall === "CLAIMS-PARTIAL"],
    ["S3", t("signing-identity-alive") && t("agent-fleet-alive")],
    ["S4", t("yield-rail-live") && t("push-channel-alive") && t("curator-signing-alive")],
    ["S5", t("sovereign-network-selfhosted")],
  ];
  let grade = "S0", reason = "below S1 — no organ liveness measured";
  for (const [g, ok] of ladder) {
    if (!ok) { reason = `blocked at ${g}`; break; }
    grade = g;
  }
  return { grade, reason, blockedBy: (v.results ?? []).filter((r) => r.verdict !== "MEASURED-TRUE").map((r) => r.id), at: now, verdictAt: v.at };
}

/* ── CLI ───────────────────────────────────────────────────────────────────── */
const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname);
if (isMain) {
  const cmd = process.argv[2] ?? "run";
  if (cmd === "run") jlog(runLedger());
  else if (cmd === "grade") jlog(sovereigntyGrade());
  else if (cmd === "list") jlog((readJson(CLAIMS_FILE)?.claims ?? []).map((c) => ({ id: c.id, text: c.text, criticality: c.criticality })));
  else jlog({ ok: false, error: "unknown command", usage: "run|grade|list" });
}
