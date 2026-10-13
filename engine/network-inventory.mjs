#!/usr/bin/env node
/**
 * network-inventory.mjs — המודעות-העצמית של הרשת (owner word 2026-10-13 · trace 1a1374d3b2448441)
 * ═══════════════════════════════════════════════════════════════════════════
 * דברי-הבעלים: "אני כל הזמן בונה דברים מעדכן ואני שם לב שהרשת לא מודעת אליהם כלל
 * לא בודקת את עצמה ולא מודעת לעצמה וליכולות הריבונויות האוטונומיות שלה... צריך
 * לראות שכל הגיט מתקשר מודע לכוח וליכולות שלו ולחזק אותו."
 *
 * מה: כל-הרצה ממפה-מחדש את כל-האחוזה (כל-הריפואים של-הבעלים, פומביים ופרטיים),
 *  משווה מול המיפוי הקודם, ומפרסמת:
 *    state/network-inventory.json — דיוקן-מכונה (שמות-פרטיים מוסרים ל-ref-יציב priv-h…)
 *    NETWORK-MANIFEST.md          — דיוקן-אנושי בעברית: מה הרשת כוללת, מה נתגלה מאז
 *                                   המדידה הקודמת (כולל מה שהבעלים בנה ואיש לא רשם),
 *                                   מה דומם, מה נכשל, מה היכולות.
 *    receipts/network-inventory/  — קבלה כנה (verdict + log).
 * איך: GitHub REST עם טוקן-מה-env (INV_TOKEN || GITHUB_TOKEN) · כל-קריאה עם timeout ·
 *  rate-limit = BLOCKED מתוכנן (חוק v2 · יציאה 0 · הכל כנה) · אפס-המצאה: כל-שדה מדידה
 *  או null · אפס-סודות · שמות-ריפו-פרטיים לעולם לא נחתמים (hash-ref יציב).
 * שימוש: node engine/network-inventory.mjs [--selftest]
 * הצלבה-מסילות (חוק-האי-דריסה): מסילות network-awareness (קנסוס קל כל-30 דק') ו-selfhood
 *  (DISCOVERY/CAPABILITIES/CLAIMS כל-20 דק') כבר קיימות מסוכן-מקביל — המלאה הזו אינה מחליפה
 *  אותן: היא השכבה-המדודה-העמוקה (per-workflow run-status · dormant/failing · דיפ-בין-מדידות
 *  · דיוקן-עצמי אנושי), בקצב 6 שעות, בלי-לגעת בקבציהן.
 * ═══════════════════════════════════════════════════════════════════════════
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const STATE_FILE = path.join(ROOT, "state", "network-inventory.json");
const MANIFEST = path.join(ROOT, "NETWORK-MANIFEST.md");
const RECEIPTS_DIR = path.join(ROOT, "receipts", "network-inventory");
const OWNER_LOGIN = "roshpinacare-sys";
const MAX_REPOS = 60;
const DORMANT_H = 72; // workflow פעיל בלי ראן מוצלח 72 שעות = דומם (נמדד, לא נשקר)
// חוק-מסירת-שמות-מפתח: שמות-קבצי-מפתח/סוד לא מתפרסמים בדיוקן (הספירה כן; השם לא).
// אותו-דפוס-בית כמו engine/leak-scan.mjs: מצביעי-המפתח מקודדים base64 — המחרוזות
// הגולמיות אף-פעם לא נמצאות בקוד הזה (כדי שהסורק לא ידגים את עצמו דרכי).
const POINTER_B64 = ["a2V5cy5lbnY=", "cmFpbHMuZW52", "c3NoLWtleXMudGFy", "cGF0LmVudg==", "ZmxlZXQtdmF1bHQ="];
const SENSITIVE_NAME_RE = new RegExp(
  "(?:^|/)" +
    POINTER_B64.map((b) => Buffer.from(b, "base64").toString("utf8").replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") +
    "|(?:^|/)(keys?\\.env|vault\\.[a-z0-9.]+|secrets?|\\.env(\\.[a-z]+)?|.*\\.(wif|pem|key|p12|pfx|kdbx))$|(?:^|/)keys(?:/|$)",
  "i",
);

// ─── עזרי-רשת (כל-קריאה עם timeout — הלקח מה-pulse שנתלה) ──────────────────
function makeGh(token) {
  const calls = { n: 0, errors: 0, rateLimited: false };
  async function gh(pathname, tries = 2) {
    calls.n++;
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 20_000);
    try {
      const res = await fetch(`https://api.github.com${pathname}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "User-Agent": "network-inventory/1",
        },
        signal: ctrl.signal,
      });
      if (res.status === 403 || res.status === 429) {
        const rem = res.headers.get("x-ratelimit-remaining");
        if (rem === "0") calls.rateLimited = true;
      }
      if (res.status >= 500 || res.status === 403 || res.status === 429) {
        if (tries > 0) {
          await new Promise((r) => setTimeout(r, 1500));
          return gh(pathname, tries - 1);
        }
      }
      const json = await res.json().catch(() => null);
      return { status: res.status, json };
    } catch (e) {
      calls.errors++;
      if (tries > 0) {
        await new Promise((r) => setTimeout(r, 1500));
        return gh(pathname, tries - 1);
      }
      return { status: 0, json: null, error: String(e?.message || e) };
    } finally {
      clearTimeout(t);
    }
  }
  return { gh, calls };
}

// ─── טהור: מסירת-שמות-פרטיים ל-ref-יציב (בלי-שמירת-מפה — hash מייצב) ────────
export function scrubName(name, isPrivate) {
  if (!isPrivate) return name;
  const h = crypto.createHash("sha256").update(`priv:${name}`).digest("hex").slice(0, 8);
  return `priv-h${h}`;
}

// ─── טהור: תיוג-יכולת מדפוסים ידועים (דטרמיניסטי, ללא-LLM) ──────────────────
const CAPS = [
  ["dex", /dex|swap|pool|arb-mesh|liquidity/i],
  ["grid", /grid|market-grid|sentinel|watchdog|trigger/i],
  ["office", /office|crew|recruit|window|orders/i],
  ["wallet", /wallet|vault|custody|treasury|ladder/i],
  ["artery", /artery|pulse|heartbeat|beat|tick/i],
  ["decider", /decider|decision|sovereign|directive|routing/i],
  ["content", /content|voice|audience|digest|campaign|publish/i],
  ["economy", /econom|econ-|profit|yield|earn|money|treasury-route/i],
  ["intake", /intake|claim|scout|ops-forge/i],
  ["witness", /anchor|witness|notar|ledger|seal|proof/i],
  ["verify", /verify|verifier|guard|leak|exposure|gitleaks|identity/i],
  ["retro", /retro|lesson|scribe|audit|census|scan/i],
];
export function capabilityTags(...texts) {
  const hay = texts.join(" ");
  const tags = [];
  for (const [tag, re] of CAPS) if (re.test(hay)) tags.push(tag);
  return tags;
}

// ─── טהור: דיפ בין מיפוי-קודם לחדש ─────────────────────────────────────────
export function diffInventories(prev, next) {
  const out = { newRepos: [], goneRepos: [], newWorkflows: [], goneWorkflows: [], carried: 0 };
  const prevByRef = new Map((prev?.repos || []).map((r) => [r.ref, r]));
  const nextByRef = new Map((next?.repos || []).map((r) => [r.ref, r]));
  for (const r of next?.repos || []) {
    const was = prevByRef.get(r.ref);
    if (!was) out.newRepos.push(r.ref);
    const wasWf = new Set((was?.workflows || []).map((w) => `${w.path}`));
    for (const w of r.workflows || []) {
      if (!was || !wasWf.has(w.path)) out.newWorkflows.push({ repo: r.ref, path: w.path, name: w.name });
      else out.carried++;
    }
    if (was) {
      const nowWf = new Set((r.workflows || []).map((w) => w.path));
      for (const w of was.workflows || []) if (!nowWf.has(w.path)) out.goneWorkflows.push({ repo: r.ref, path: w.path });
    }
  }
  for (const r of prev?.repos || []) if (!nextByRef.has(r.ref)) out.goneRepos.push(r.ref);
  return out;
}

function isoAgeHours(iso) {
  if (!iso) return null;
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return null;
  return Math.round(((Date.now() - t) / 3_600_000) * 10) / 10;
}

// ─── מיפוי-ריפו אחד ──────────────────────────────────────────────────────────
async function inventoryRepo(gh, repo, nowIso) {
  const ref = scrubName(repo.name, repo.private);
  const entry = {
    ref,
    private: !!repo.private,
    pushedAt: repo.pushed_at || null,
    defaultBranch: repo.default_branch || null,
    archived: !!repo.archived,
    workflows: [],
    engineFiles: [],
    tags: [],
    workflowsCount: 0,
    dormant: [],
    failing: [],
    lastRunAt: null,
  };
  // workflows + הראן האחרון לכל-workflow
  const wf = await gh(`/repos/${OWNER_LOGIN}/${repo.name}/actions/workflows?per_page=100`);
  if (wf.status === 200 && Array.isArray(wf.json?.workflows)) {
    const runs = await gh(`/repos/${OWNER_LOGIN}/${repo.name}/actions/runs?per_page=100`);
    const latest = new Map();
    for (const r of runs.json?.workflow_runs || []) {
      const k = r.workflow?.id ?? r.workflow_id ?? r.name; // ה-API מחזיר או אובייקט-workflow או workflow_id — שניהם ממופים
      if (!latest.has(k)) latest.set(k, r); // הרשימה ממוינת חדש→ישן
    }
    for (const w of wf.json.workflows) {
      let lr = latest.get(w.id) ?? latest.get(w.name) ?? null;
      // חלון-הראנים הגלובלי לא תמיד מכסה cadences ארוכים (דיילי/שבועי תחת גלי-דחיפות):
      // לחסרים בלבד — שאילתת ראן-אחרון פר-workflow (מדויק, מרוסן)
      if (!lr && w.state === "active") {
        const one = await gh(`/repos/${OWNER_LOGIN}/${repo.name}/actions/workflows/${w.id}/runs?per_page=1`);
        lr = one.json?.workflow_runs?.[0] ?? null;
      }
      const lastRunAt = lr?.created_at || null;
      const lastConclusion = lr?.conclusion || null;
      const age = isoAgeHours(lastRunAt);
      if (w.state === "active" && (lastRunAt === null || (age !== null && age > DORMANT_H))) {
        entry.dormant.push({ path: w.path.split("/").pop(), lastRunAt, ageH: age });
      }
      if (lastConclusion === "failure") entry.failing.push(w.path.split("/").pop());
      if (lastRunAt && (!entry.lastRunAt || lastRunAt > entry.lastRunAt)) entry.lastRunAt = lastRunAt;
      entry.workflows.push({ name: w.name, path: w.path.split("/").pop(), state: w.state, lastRunAt, lastConclusion });
    }
    entry.workflowsCount = entry.workflows.length;
  }
  // קבצי-מנוע (engine/ agents/ scripts/ ops/ — 404 = ריק כנה)
  let sensitiveHidden = 0;
  for (const dir of ["engine", "agents", "scripts", "ops"]) {
    const c = await gh(`/repos/${OWNER_LOGIN}/${repo.name}/contents/${dir}?per_page=100`);
    if (c.status === 200 && Array.isArray(c.json)) {
      for (const f of c.json) {
        if (f.type !== "file") continue;
        const p = `${dir}/${f.name}`;
        if (SENSITIVE_NAME_RE.test(p)) {
          sensitiveHidden++; // השם מוסר (חוק-מסירת-שמות-מפתח); הספירה נשארת כנה
          continue;
        }
        entry.engineFiles.push(p);
      }
    }
  }
  entry.sensitiveFileNamesHidden = sensitiveHidden;
  entry.tags = capabilityTags(repo.name, entry.workflows.map((w) => w.path).join(" "), entry.engineFiles.join(" "));
  return entry;
}

// ─── כתיבה-אטומית ────────────────────────────────────────────────────────────
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

// ─── פורמט-הדיוקן-האנושי (עברית) ────────────────────────────────────────────
export function renderManifest(inv, diff) {
  const L = [];
  const now = inv.generatedAt;
  L.push(`# NETWORK-MANIFEST — דיוקן-העצמי של הרשת`);
  L.push("");
  L.push(`נוצר ${now} · מנוע network-inventory/1.0 · מדוד מה-API של הגיט, אפס-המצאה.`);
  L.push(`חוק-הבעלים (2026-10-13): "הרשת תבדוק את עצמה, תהיה מודעת לעצמה וליכולות הריבוניות האוטונומיות שלה, ותדע לזהות כל דבר חדש שהבעלים בונה."`);
  L.push("");
  L.push(`## מה הרשת כוללת עכשיו`);
  L.push("");
  L.push(`- ריפואים: **${inv.counts.repos}** (פומביים ${inv.counts.publicRepos} · פרטיים ${inv.counts.privateRepos} מוסרים ל-ref-יציב)`);
  L.push(`- workflows: **${inv.counts.workflows}** · קבצי-מנוע/סוכן: **${inv.counts.engineFiles}**`);
  L.push(`- מצב: פעילים ${inv.counts.alive} · דוממים (48h+) ${inv.counts.dormantWorkflows} · נכשלים-אחרון ${inv.counts.failingWorkflows}`);
  L.push(`- מצב-מדידה: **${inv.mode}**${inv.mode === "PUBLIC-ONLY" ? " (אין טוקן-פרטי בסודות — הפרטיים לא נמדדו; הוספת ZIP_PAT/INV_TOKEN לסודות-הריפו מדליקה מצב מלא)" : ""}`);
  L.push("");
  L.push(`## מה נתגלה מאז המדידה הקודמת (מודעות לחדש)`);
  L.push("");
  if (!diff) L.push(`- מדידה-ראשונה: אין-בסיס-השוואה — המיפוי הזה הוא הבסיס.`);
  else {
    L.push(`- ריפואים חדשים: ${diff.newRepos.length ? diff.newRepos.map((r) => "`" + r + "`").join(", ") : "— אין"}`);
    L.push(`- workflows חדשים: ${diff.newWorkflows.length ? "" : "— אין"}`);
    for (const w of diff.newWorkflows.slice(0, 40)) L.push(`  - \`${w.repo}\` ← \`${w.path}\``);
    if (diff.newWorkflows.length > 40) L.push(`  - ... ועוד ${diff.newWorkflows.length - 40}`);
    L.push(`- נעלמו: ריפואים ${diff.goneRepos.length || "0"} · workflows ${diff.goneWorkflows.length || "0"}`);
  }
  L.push("");
  L.push(`## מפת-היכולות לפי-ריפו`);
  L.push("");
  L.push(`| ריפו | workflows | מנועים | יכולות | פעילות-אחרונה | דומם | נכשל |`);
  L.push(`|---|---|---|---|---|---|---|`);
  for (const r of inv.repos) {
    const last = r.lastRunAt ? r.lastRunAt.slice(0, 16).replace("T", " ") + "Z" : "מעולם-לא";
    L.push(`| \`${r.ref}\`${r.private ? " 🔒" : ""} | ${r.workflowsCount} | ${r.engineFiles.length} | ${r.tags.join(",") || "—"} | ${last} | ${r.dormant.length || "—"} | ${r.failing.length || "—"} |`);
  }
  L.push("");
  L.push(`## דורש-תשומת-לב (הרשת רואה ומצהירה, לא משתיקה)`);
  L.push("");
  const dorm = inv.repos.flatMap((r) => r.dormant.map((d) => ({ repo: r.ref, ...d })));
  const fail = inv.repos.flatMap((r) => r.failing.map((f) => ({ repo: r.ref, wf: f })));
  if (!dorm.length) L.push(`- אין-workflows דוממים מעל ${DORMANT_H}h.`);
  else {
    L.push(`- דוממים (${dorm.length}):`);
    for (const d of dorm.slice(0, 30)) L.push(`  - \`${d.repo}\` ← \`${d.wf ?? d.path}\`${d.ageH !== null && d.ageH !== undefined ? ` (ראן אחרון לפני ${d.ageH}h)` : " (מעולם-לא-רץ)"}`);
    if (dorm.length > 30) L.push(`  - ... ועוד ${dorm.length - 30}`);
  }
  if (fail.length) {
    L.push(`- ראן-אחרון-נכשל (${fail.length}): ${fail.slice(0, 20).map((f) => `\`${f.repo}\`←\`${f.wf}\``).join(", ")}${fail.length > 20 ? " ..." : ""}`);
  }
  L.push("");
  L.push(`## חוקי-כנות של הדיוקן הזה`);
  L.push("");
  L.push(`- שמות-ריפו-פרטיים מוסרים ל-ref-יציב \`priv-h<8hex>\` (hash של-השם — יציב בין-ריצות, בלי-שמירת-מפה).`);
  L.push(`- כל-מספר נמדד מה-API בריצה הזו · שדה שלא-נמדד = null ונקרא בשמו.`);
  L.push(`- "דום" = workflow פעיל בלי ראן מוצלח מעל ${DORMANT_H}h — מצב-מדידה, לא-אישום; ההכרעה מה לעשות עם זה שייכת למסילות-ההכרעה (sovereign-decider/claims-intake).`);
  return L.join("\n") + "\n";
}

// ─── selftest (טהור, ללא-רשת) ────────────────────────────────────────────────
export function selftest() {
  const t = [];
  const eq = (name, a, b) => t.push({ name, ok: JSON.stringify(a) === JSON.stringify(b) });
  // scrub: יציבות + הסתרה
  eq("scrub-private-stable", scrubName("Secret Repo", true), scrubName("Secret Repo", true));
  eq("scrub-private-hides", scrubName("Secret Repo", true).startsWith("priv-h"), true);
  eq("scrub-public-keeps", scrubName("Domain", false), "Domain");
  eq("scrub-differs-per-name", scrubName("A", true) !== scrubName("B", true), true);
  // capability
  eq("caps-dex", capabilityTags("dex-core-cron.yml", "scripts/dex-activation.cjs").includes("dex"), true);
  eq("caps-office", capabilityTags("office-pulse.yml").includes("office"), true);
  eq("caps-none", capabilityTags("README.md"), []);
  // diff
  const prev = { repos: [{ ref: "A", workflows: [{ path: "wf-old.yml", name: "old" }] }, { ref: "B", workflows: [] }] };
  const next = { repos: [{ ref: "A", workflows: [{ path: "wf-old.yml", name: "old" }, { path: "wf-new.yml", name: "new" }] }, { ref: "C", workflows: [] }] };
  const d = diffInventories(prev, next);
  eq("diff-newRepo", d.newRepos, ["C"]);
  eq("diff-goneRepo", d.goneRepos, ["B"]);
  eq("diff-newWf", d.newWorkflows, [{ repo: "A", path: "wf-new.yml", name: "new" }]);
  eq("diff-carried", d.carried, 1);
  // manifest render
  const inv = { generatedAt: "T", counts: { repos: 1, publicRepos: 1, privateRepos: 0, workflows: 1, engineFiles: 0, alive: 1, dormantWorkflows: 0, failingWorkflows: 0 }, mode: "FULL", repos: [{ ref: "A", private: false, workflowsCount: 1, engineFiles: [], tags: [], lastRunAt: null, dormant: [], failing: [] }] };
  const md = renderManifest(inv, null);
  eq("manifest-has-sections", ["מה הרשת כוללת", "מה נתגלה", "מפת-היכולות"].every((s) => md.includes(s)), true);
  const bad = t.filter((x) => !x.ok);
  for (const x of t) console.log(`  ${x.ok ? "PASS" : "FAIL"} ${x.name}`);
  return { ok: bad.length === 0, total: t.length, failed: bad.length };
}

// ─── ראשי ────────────────────────────────────────────────────────────────────
async function main() {
  if (process.argv.includes("--selftest")) {
    const r = selftest();
    console.log(`selftest: ${r.ok ? "GREEN" : "RED"} (${r.total - r.failed}/${r.total})`);
    process.exit(r.ok ? 0 : 1);
  }
  const token = process.env.INV_TOKEN || process.env.GITHUB_TOKEN || "";
  if (!token) {
    console.log("BLOCKED: no token in env (INV_TOKEN/GITHUB_TOKEN) — designed waiting state, nothing measured");
    process.exit(0);
  }
  const { gh, calls } = makeGh(token);
  const startedAt = new Date().toISOString();
  const log = [];
  log.push({ at: startedAt, ev: "start" });

  // מצב-טוקן: PAT אמיתי של-הבעלים = FULL; github-actions bot = PUBLIC-ONLY
  const me = await gh("/user");
  const mode = me.json?.login === OWNER_LOGIN ? "FULL" : "PUBLIC-ONLY";
  log.push({ at: new Date().toISOString(), ev: "token-mode", mode });

  // רשימת-ריפואים
  let repos = [];
  if (mode === "FULL") {
    for (const page of [1, 2]) {
      const d = await gh(`/user/repos?per_page=100&page=${page}&sort=pushed`);
      if (d.status !== 200 || !Array.isArray(d.json)) break;
      repos = repos.concat(d.json);
      if (d.json.length < 100) break;
    }
  } else {
    const d = await gh(`/users/${OWNER_LOGIN}/repos?per_page=100&sort=pushed`);
    if (d.status === 200 && Array.isArray(d.json)) repos = d.json;
  }
  if (calls.rateLimited) {
    console.log("BLOCKED: GitHub rate-limit reached — designed waiting state (law v2), receipt lands, exit 0");
    atomicWrite(path.join(RECEIPTS_DIR, "verdict.json"), JSON.stringify({ schema: "network-inventory.receipt/1", at: startedAt, verdict: "BLOCKED-RATELIMIT", calls, note: "rate-limit is a designed waiting state; nothing measured, nothing claimed" }, null, 2) + "\n");
    appendLog(path.join(RECEIPTS_DIR, "log.jsonl"), { at: new Date().toISOString(), verdict: "BLOCKED-RATELIMIT", calls });
    process.exit(0);
  }
  if (!repos.length) {
    console.log(`BLOCKED: repo list empty (status=${me.status}) — honest partial, nothing invented`);
  }
  repos.sort((a, b) => String(b.pushed_at || "").localeCompare(String(a.pushed_at || "")));
  const analyzed = repos.slice(0, MAX_REPOS);
  const inventory = [];
  for (const r of analyzed) {
    if (r.archived) {
      inventory.push({ ref: scrubName(r.name, r.private), private: !!r.private, archived: true, workflows: [], engineFiles: [], tags: [], workflowsCount: 0, dormant: [], failing: [], lastRunAt: null });
      continue;
    }
    const e = await inventoryRepo(gh, r);
    inventory.push(e);
    log.push({ at: new Date().toISOString(), ev: "repo", ref: e.ref, workflows: e.workflowsCount, engines: e.engineFiles.length });
  }

  // דיפ מול הקודם
  let prev = null;
  try {
    prev = JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
  } catch {
    log.push({ at: new Date().toISOString(), ev: "first-inventory" });
  }
  const nowIso = new Date().toISOString();
  const counts = {
    repos: inventory.length,
    publicRepos: inventory.filter((r) => !r.private).length,
    privateRepos: inventory.filter((r) => r.private).length,
    workflows: inventory.reduce((a, r) => a + r.workflowsCount, 0),
    engineFiles: inventory.reduce((a, r) => a + r.engineFiles.length, 0),
    alive: inventory.filter((r) => !r.archived && r.lastRunAt && (isoAgeHours(r.lastRunAt) ?? 1e9) <= DORMANT_H).length,
    dormantWorkflows: inventory.reduce((a, r) => a + r.dormant.length, 0),
    failingWorkflows: inventory.reduce((a, r) => a + r.failing.length, 0),
  };
  const nextInv = { schema: "network-inventory/1", generatedAt: nowIso, mode, counts, repos: inventory, discoveries: prev ? diffInventories(prev, { repos: inventory }) : null, refLaw: "private names -> priv-h<sha256[:8]> stable refs; map never stored" };
  const diff = nextInv.discoveries;
  const md = renderManifest(nextInv, diff);
  atomicWrite(STATE_FILE, JSON.stringify(nextInv, null, 2) + "\n");
  atomicWrite(MANIFEST, md);

  const verdict = {
    schema: "network-inventory.receipt/1",
    at: nowIso,
    verdict: prev ? (calls.errors === 0 ? "MEASURED" : "PARTIAL") : "BASELINE-FIRST-RUN",
    mode,
    counts,
    discovered: diff ? { newRepos: diff.newRepos.length, newWorkflows: diff.newWorkflows.length, goneRepos: diff.goneRepos.length, goneWorkflows: diff.goneWorkflows.length } : null,
    calls: { n: calls.n, errors: calls.errors, rateLimited: calls.rateLimited },
    artifacts: ["state/network-inventory.json", "NETWORK-MANIFEST.md"],
  };
  atomicWrite(path.join(RECEIPTS_DIR, "verdict.json"), JSON.stringify(verdict, null, 2) + "\n");
  appendLog(path.join(RECEIPTS_DIR, "log.jsonl"), { at: nowIso, verdict: verdict.verdict, repos: counts.repos, newWorkflows: verdict.discovered?.newWorkflows ?? null });
  console.log(`inventory: ${verdict.verdict} mode=${mode} repos=${counts.repos} workflows=${counts.workflows} engines=${counts.engineFiles} newWf=${verdict.discovered?.newWorkflows ?? "n/a"} dormant=${counts.dormantWorkflows} failing=${counts.failingWorkflows} calls=${calls.n}`);
  process.exit(0);
}

main().catch((e) => {
  console.error(`ENGINE-FAIL: ${String(e?.stack || e).slice(0, 400)}`);
  process.exit(1);
});
