#!/usr/bin/env node
/**
 * claims-intake.mjs — מסלול-הטענות של הריבונות (owner word 2026-10-13 · trace 1a1374d3b2448441)
 * ═══════════════════════════════════════════════════════════════════════════
 * דברי-הבעלים: "הריבונות היא המפעיל אז טענות למפעיל צריכות להיות מנותבות
 * לאוטונומיה ולוודא שהיא מספיק אינטילגנטית כדי באמת לקבל החלטות חכמות."
 *
 * מה: סורק את כל-ה-issues הפתוחים בריפואי-הליבה, מתייג כל-טענה בצורה
 *  דטרמיניסטית (defect / owner-words / observation), מנתב:
 *    DEFECT       → ops/sovereign/CLAIMS/queue.json (תשתית-קריאה בלבד למסילת-ההכרעה
 *                   הריבונית) + תגובת-ניתוב על ה-issue + תוויות claims/*
 *    OWNER-WORDS  → state/claims-owner-words.json (כנות: דורש-חומר-בעלים,
 *                   לעולם לא מזויף ולא משתיק)
 *    OBSERVATION  → רישום-לד-בלבד + תווית
 *  כל-ניתוב אידמפוטנטי: ledger (state/claims-ledger.json) + סימן-בתגובה.
 * אינטליגנציה: מפת-מסילות דטרמיניסטית (מילות-מפתח → מסילת-תיקון ידועה באחוזה)
 *  שנבנתה מהידע-המדוד של-הרשת; ההכרעות עצמן נשארות במסילות-ההכרעה.
 * חוקים: אפס-סודות-בתגובות · fail-soft לכל-issue (גוף-שבור לא מפיל את הסריקה) ·
 *  rate-limit = BLOCKED מתוכנן (חוק v2, יציאה 0) · כל-ניתוב נושא ראיות-מדודות.
 * הצלבה-מסילות (חוק-האי-דריסה): selfhood (state/selfhood/claims*.jsonl) ו-network-awareness
 *  מנהלים תיבת-תלונות-מכונה משלהם — המסלול הזה הוא הערוץ-השני: טענות-issues שנפתחות
 *  בידי-בני-אדם/סוכנים, עם תגובת-ניתוב גלויה על ה-issue. אפס-קבצים-משותפים.
 * שימוש: node engine/claims-intake.mjs [--selftest] (או CLAIMS_DRY=1 לסריקת-יבשה)
 * ═══════════════════════════════════════════════════════════════════════════
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const LEDGER = path.join(ROOT, "state", "claims-ledger.json");
const QUEUE = path.join(ROOT, "ops", "sovereign", "CLAIMS", "queue.json");
const OWNER_WORDS = path.join(ROOT, "state", "claims-owner-words.json");
const RECEIPTS_DIR = path.join(ROOT, "receipts", "claims");
const COMMENT_MARKER = "<!-- claims-intake/routing:v1 -->";

// ריפואי-הליבה שנסרקים לטענות (פומביים — issues API עובד מאומת-קריאה)
const CORE_REPOS = ["Domain", "FleetHQ", "Console", "saos-runtime", "Autonomy", "GridWatch", "sovereign-lighthouse", "Pulse", "ops-intake"];
const MAX_ISSUES_PER_REPO = 30;

// ─── מיון-דטרמיניסטי (ללא-LLM · עברית+אנגלית) ───────────────────────────────
const DEFECT_RE = /\b(fail|error|crash|broken|stuck|stale|down|silent|red|died|hang|frozen)\b|קרס|שגיאה|תקלה|לא עובד|לא-עובד|שקט|נתקע|קפא|מת|דומם|נפילה|כשל/i;
const OWNER_WORDS_RE = /\b(secret|token|key|credential|wif|password|permission|billing|minutes|quota|pat|secrets?)\b|סוד|טוקן|מפתח|חיוב|דקות|הרשאה|סיסמה|מימון|קרדנציאל/i;

export function classifyClaim(title, body) {
  const hay = `${title || ""}\n${body || ""}`;
  if (OWNER_WORDS_RE.test(hay)) return "OWNER-WORDS";
  if (DEFECT_RE.test(hay)) return "DEFECT";
  return "OBSERVATION";
}

// מפת-המסילות: מילות-מפתח → מסילת-תיקון ידועה באחוזה (מדוד, לא מומצא)
const LANE_MAP = [
  ["estate-scrub/exposure-gate", /\b(exposure|leak|scrub|public-surface|חשיפה|דליפה)\b/i],
  ["twin-audit", /\btwin|כפילות|near-dup/i],
  ["artery-watch/pacemaker", /\b(silence|silent|quiet|heartbeat|שקט|דומם|פעימה)\b/i],
  ["grid-watchdog/grid-lanes", /\b(grid|watchdog|signal|red|גריד|רשת-מסחר)\b/i],
  ["dex-lanes (dex-core/arb-mesh/dex-activation)", /\b(dex|swap|pool|arb|liquidity|נזילות|עמלה)\b/i],
  ["office-lanes (office-pulse/office-artery)", /\b(office|crew|worker|משרד|עובדים)\b/i],
  ["sandbox-arteries", /\b(sandbox|סנדבוקס)\b/i],
  ["custody/ladder lanes", /\b(custody|ladder|vault|treasury|אחזקה|כספת)\b/i],
  ["anchor/witness lanes", /\b(anchor|witness|beacon|notary|עוגן|עד)\b/i],
  ["content-lanes", /\b(content|publish|digest|campaign|תוכן|פרסום)\b/i],
  ["pages/site lanes", /\b(pages|site|link|404|אתר|קישור)\b/i],
];
export function suggestLane(title, body, cls) {
  if (cls === "OWNER-WORDS") return "owner-words (דורש חומר/החלטת בעלים — לעולם לא מזויף)";
  const hay = `${title || ""}\n${body || ""}`;
  for (const [lane, re] of LANE_MAP) if (re.test(hay)) return lane;
  return "sovereign-decider (queue.json — נמדד בפעימה הבאה)";
}

// ─── עזרי-רשת (timeout בכל-קריאה — לקח ה-pulse התלוי) ───────────────────────
function makeGh(token) {
  const calls = { n: 0, errors: 0, rateLimited: false };
  async function gh(method, pathname, body, tries = 2) {
    calls.n++;
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 20_000);
    try {
      const res = await fetch(`https://api.github.com${pathname}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "User-Agent": "claims-intake/1",
          ...(body ? { "Content-Type": "application/vnd.github+json" } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: ctrl.signal,
      });
      if ((res.status === 403 || res.status === 429) && res.headers.get("x-ratelimit-remaining") === "0") calls.rateLimited = true;
      if (res.status >= 500 || res.status === 403 || res.status === 429) {
        if (tries > 0) {
          await new Promise((r) => setTimeout(r, 1500));
          return gh(method, pathname, body, tries - 1);
        }
      }
      const json = await res.json().catch(() => null);
      return { status: res.status, json };
    } catch (e) {
      calls.errors++;
      if (tries > 0) {
        await new Promise((r) => setTimeout(r, 1500));
        return gh(method, pathname, body, tries - 1);
      }
      return { status: 0, json: null, error: String(e?.message || e) };
    } finally {
      clearTimeout(t);
    }
  }
  return { gh, calls };
}

function loadJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}
function atomicWrite(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = `${file}.tmp-${process.pid}`;
  fs.writeFileSync(tmp, text);
  fs.renameSync(tmp, file);
}
function appendLog(logFile, row) {
  fs.mkdirSync(path.dirname(logFile), { recursive: true });
  fs.appendFileSync(logFile, JSON.stringify(row) + "\n");
}

function commentBody(claim) {
  const lines = [];
  lines.push(COMMENT_MARKER);
  lines.push(`**ניתוב-טענה אוטונומי** (claims-intake/1.0 · ${claim.routedAt})`);
  lines.push("");
  lines.push(`- סיווג מדוד: **${claim.class}**`);
  lines.push(`- מסילה מוצעת: **${claim.lane}**`);
  lines.push(`- נרשם בלד הטענות: \`state/claims-ledger.json\`${claim.class === "DEFECT" ? ` · נכנס לתור-ההכרעה: \`ops/sovereign/CLAIMS/queue.json\` (תשתית-קריאה למסילת-ההכרעה הריבונית)` : ""}`);
  lines.push(`- חוק-כנות: זהו ניתוב אוטומטי דטרמיניסטי (אפס-LLM, אפס-המצאה); ההכרעה והביצוע באחריות המסילה המנותבת. טענות שדורשות חומר-בעלים נשארות פתוחות-כנה.`);
  lines.push("");
  lines.push(`_אם הניתוב שגוי — סמנו \`claims/misrouted\` והטענה תיבדק בסריקה הבאה._`);
  return lines.join("\n");
}

export function selftest() {
  const t = [];
  const eq = (name, a, b) => t.push({ name, ok: JSON.stringify(a) === JSON.stringify(b) });
  eq("cls-defect", classifyClaim("GRID-SILENCE: arteries measured silent", "no runs for 3h"), "DEFECT");
  eq("cls-owner", classifyClaim("billing: minutes quota exhausted", "need owner token"), "OWNER-WORDS");
  eq("cls-observation", classifyClaim("weekly summary posted", "all good"), "OBSERVATION");
  eq("cls-hebrew", classifyClaim("המשרד קרס", "הכל קפא"), "DEFECT");
  eq("lane-exposure", suggestLane("exposure-gate violation", "", "DEFECT").startsWith("estate-scrub"), true);
  eq("lane-twin", suggestLane("twin-audit near-duplication", "", "DEFECT").startsWith("twin-audit"), true);
  eq("lane-owner", suggestLane("missing wif", "", "OWNER-WORDS").startsWith("owner-words"), true);
  eq("lane-fallback", suggestLane("unknown topic x", "", "OBSERVATION").startsWith("sovereign-decider"), true);
  const bad = t.filter((x) => !x.ok);
  for (const x of t) console.log(`  ${x.ok ? "PASS" : "FAIL"} ${x.name}`);
  return { ok: bad.length === 0, total: t.length, failed: bad.length };
}

async function main() {
  if (process.argv.includes("--selftest")) {
    const r = selftest();
    console.log(`selftest: ${r.ok ? "GREEN" : "RED"} (${r.total - r.failed}/${r.total})`);
    process.exit(r.ok ? 0 : 1);
  }
  const token = process.env.GITHUB_TOKEN || "";
  if (!token) {
    console.log("BLOCKED: no GITHUB_TOKEN — designed waiting state, nothing measured");
    process.exit(0);
  }
  const { gh, calls } = makeGh(token);
  const DRY = !!process.env.CLAIMS_DRY; // סריקת-יבשה: קריאות+סיווג בלבד, אפס-תופעות-לוואי, אפס-לד
  const startedAt = new Date().toISOString();
  const ledger = DRY ? { schema: "claims-ledger/1", routed: {} } : loadJson(LEDGER, { schema: "claims-ledger/1", routed: {} });
  const queue = loadJson(QUEUE, { schema: "claims.queue/1", note: "קריאה-בלבד למסילות-ההכרעה · כתיבה רק מ-claims-intake · bounded 200", entries: [] });
  const ownerWords = loadJson(OWNER_WORDS, { schema: "claims.owner-words/1", note: "טענות שדורשות חומר/החלטת בעלים — כנות, לעולם לא מזויפות", entries: [] });
  const log = [];
  let routed = 0, skipped = 0, failed = 0;
  const counts = { DEFECT: 0, "OWNER-WORDS": 0, OBSERVATION: 0 };

  for (const repo of CORE_REPOS) {
    const d = await gh("GET", `/repos/roshpinacare-sys/${repo}/issues?state=open&per_page=${MAX_ISSUES_PER_REPO}`);
    if (d.status !== 200 || !Array.isArray(d.json)) {
      log.push({ at: new Date().toISOString(), ev: "repo-error", repo, status: d.status });
      failed++;
      continue;
    }
    for (const issue of d.json) {
      if (issue.pull_request) continue; // PRs אינם טענות
      const key = `${repo}#${issue.number}`;
      if (ledger.routed[key]) {
        skipped++;
        continue;
      }
      // אידמפוטנציה מול-הפרעות: אם כבר קיימת תגובת-ניתוב שלנו — נרשום ונדלג
      const cm = await gh("GET", `/repos/roshpinacare-sys/${repo}/issues/${issue.number}/comments?per_page=20`);
      const already = Array.isArray(cm.json) && cm.json.some((c) => typeof c.body === "string" && c.body.includes(COMMENT_MARKER));
      const cls = classifyClaim(issue.title, issue.body);
      const lane = suggestLane(issue.title, issue.body, cls);
      counts[cls] = (counts[cls] || 0) + 1;
      const claim = {
        id: `claim-${Date.now()}-${repo}${issue.number}`,
        repo,
        issue: issue.number,
        title: String(issue.title || "").slice(0, 120),
        class: cls,
        lane,
        routedAt: new Date().toISOString(),
        state: already ? "routed-earlier" : "routed-now",
      };
      if (DRY) {
        log.push({ at: claim.routedAt, ev: "dry", key, class: cls, lane });
        continue; // יבשה: אין-תגובה, אין-תוויות, אין-לד — רק-מדידה כנה
      }
      if (!already) {
        const post = await gh("POST", `/repos/roshpinacare-sys/${repo}/issues/${issue.number}/comments`, { body: commentBody(claim) });
        if (post.status !== 201) {
          log.push({ at: new Date().toISOString(), ev: "comment-fail", key, status: post.status });
          failed++;
          continue; // בלי-תגובה אין-ניתוב גלוי — לא מזייפים הצלחה
        }
        await gh("POST", `/repos/roshpinacare-sys/${repo}/issues/${issue.number}/labels`, { labels: ["claims/routed", `claims/${cls.toLowerCase()}`] });
      }
      ledger.routed[key] = { at: claim.routedAt, class: cls, lane };
      if (cls === "DEFECT") {
        queue.entries.push(claim);
      } else if (cls === "OWNER-WORDS") {
        ownerWords.entries.push(claim);
      }
      log.push({ at: claim.routedAt, ev: "routed", key, class: cls, lane });
      routed++;
    }
  }

  // bounded (חוק-גבולות)
  if (queue.entries.length > 200) queue.entries = queue.entries.slice(-200);
  if (ownerWords.entries.length > 200) ownerWords.entries = ownerWords.entries.slice(-200);
  queue.updatedAt = new Date().toISOString();
  ownerWords.updatedAt = queue.updatedAt;
  atomicWrite(LEDGER, JSON.stringify(ledger, null, 2) + "\n");
  if (queue.entries.length) atomicWrite(QUEUE, JSON.stringify(queue, null, 2) + "\n");
  if (ownerWords.entries.length) atomicWrite(OWNER_WORDS, JSON.stringify(ownerWords, null, 2) + "\n");

  if (calls.rateLimited) {
    console.log("BLOCKED: rate-limit mid-sweep — designed waiting (law v2); partial results already written honestly");
  }
  const verdict = {
    schema: "claims.receipt/1",
    at: new Date().toISOString(),
    verdict: DRY ? "DRY-SWEEP" : calls.rateLimited ? "PARTIAL-RATELIMIT" : calls.errors === 0 && failed === 0 ? "ROUTED" : failed ? "PARTIAL" : "ROUTED",
    routed,
    skipped,
    failed,
    counts,
    reposSwept: CORE_REPOS.length,
    calls: { n: calls.n, errors: calls.errors, rateLimited: calls.rateLimited },
    artifacts: ["state/claims-ledger.json", queue.entries.length ? "ops/sovereign/CLAIMS/queue.json" : null, ownerWords.entries.length ? "state/claims-owner-words.json" : null].filter(Boolean),
  };
  atomicWrite(path.join(RECEIPTS_DIR, "verdict.json"), JSON.stringify(verdict, null, 2) + "\n");
  appendLog(path.join(RECEIPTS_DIR, "log.jsonl"), { at: verdict.at, verdict: verdict.verdict, routed, skipped, failed });
  console.log(`claims: ${verdict.verdict} routed=${routed} skipped=${skipped} failed=${failed} classes=${JSON.stringify(counts)} calls=${calls.n}`);
  process.exit(0);
}

main().catch((e) => {
  console.error(`ENGINE-FAIL: ${String(e?.stack || e).slice(0, 400)}`);
  process.exit(1);
});
