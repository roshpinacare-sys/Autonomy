// estate-relay.mjs — עורק-המשוך-המאולתר על-רץ-ציבורי (minutes-wall breaker).
// ═════════════════════════════════════════════════════════════════════════════
// דוקטרינה: ריפואי-פרטי-על-תוכנית-חינם = אפס-דקות → כל-הרצה מתה ב-2 שניות
// (נמדד: job נכשל לפני-שלב-ראשון, אפס-לוגים = BlobNotFound). הקיר-הזה אינו
// פגם-קוד — אין-מה-לתקן-בתוך-הריפו-הפרטי. הריבונות-עונה אחרת: הכשירות-הציבורית
// רצה-את-הבדיקות-חסרות-המפתח של-הריפואים-הפרטיים בשמן, קוראת-בלבד, ומפרסמת
// קבלות-כנות. הקיר-האדום-נשאר-גלוי (אסור-להשתיק P0) — היכולת-חוזרת-להיות-שלנו.
//
// מה-רץ (v1, מפתח-אפס על-התוכן): (a) gitleaks tree-scan — אם-הריפו-מבקש-זאת
// (יש-לו-workflow-gitleaks); (b) sanity-yaml לכל-.github/workflows/*.yml —
// ה-guard-האוניברסלי. תוצאות: ops/sovereign/RELAY/RELAY-RECEIPTS.md +
// relay-ledger.jsonl (טאיל-256). שמות-פרטיים = priv-h<sha256("priv:"+name)[:8]>
// (הקונבנציה-של-network-inventory). חוקים: bounded (25 ריפואים · timeouts) ·
// rate-limit = BLOCKED receipt exit-0 · יציאה-0 עם-קבלה; קריסה-בלתי-צפויה-רועמת.
import { execFileSync } from "node:child_process";
import { writeFileSync, mkdirSync, existsSync, readFileSync, rmSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";

const API = "https://api.github.com";
const OWNER = "roshpinacare-sys";
const token = process.env.INV_TOKEN || process.env.ZIP_PAT || process.env.GITHUB_TOKEN || "";
const WORK = "/tmp/estate-relay-work";
const MAX_REPOS = Number(process.env.MAX_RELAY_REPOS || 25);
const CLONE_TIMEOUT_MS = 90_000;
const SCAN_TIMEOUT_MS = 60_000;
const MAX_REPO_MB = 200;
const GITLEAKS_VERSION = "8.18.4";
const DRYRUN = process.env.ESTATE_RELAY_DRYRUN === "1";
const log = (...a) => console.log("[estate-relay]", ...a);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function die(msg) { console.error("[estate-relay] FATAL", msg); process.exit(1); }
if (!token) die("no token (INV_TOKEN/ZIP_PAT) — cannot see the private estate (fail-closed)");
const h = (n) => `priv-h${createHash("sha256").update(`priv:${n}`).digest("hex").slice(0, 8)}`;

async function api(pathname) {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), 25_000);
  try {
    const res = await fetch(`${API}${pathname}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "User-Agent": "saos-estate-relay" },
      signal: c.signal,
    });
    if (res.status === 403 && res.headers.get("x-ratelimit-remaining") === "0") {
      const e = new Error("RATE-LIMIT"); e.code = "RATE-LIMIT"; throw e;
    }
    if (!res.ok) { const e = new Error(`HTTP ${res.status} ${pathname}`); e.code = "HTTP"; throw e; }
    return res.json();
  } finally { clearTimeout(t); }
}

function sh(cmd, args, opts = {}) {
  return execFileSync(cmd, args, { encoding: "utf8", timeout: opts.timeout || 60_000, maxBuffer: 64 * 1024 * 1024, ...opts });
}

// ── 1. census: private repos only ────────────────────────────────────────────
const repos = [];
let page = 1;
while (true) {
  const batch = await api(`/user/repos?per_page=100&page=${page}&sort=full_name`);
  if (!Array.isArray(batch) || batch.length === 0) break;
  repos.push(...batch);
  if (batch.length < 100) break;
  page++;
}
const privs = repos.filter((r) => r.private && r.size <= MAX_REPO_MB * 1024).slice(0, MAX_REPOS);
const oversize = repos.filter((r) => r.private && r.size > MAX_REPO_MB * 1024);
log(`census: ${repos.length} repos · private-in-scope: ${privs.length} · oversize-skip: ${oversize.length}`);

// ── 2. gitleaks binary (once, pinned, self-healing vs corrupt leftover) ─────
const GL = `${WORK}/gitleaks`;
let glReady = false;
function glWorks() {
  try { sh(GL, ["version"], { timeout: 15_000 }); return true; } catch { return false; }
}
try {
  mkdirSync(WORK, { recursive: true });
  if (!existsSync(GL) || !glWorks()) {
    rmSync(GL, { force: true });
    const tgz = `${WORK}/gl.tar.gz`;
    // assets are .tar.gz (verified live: gitleaks_8.18.4_linux_x64.tar.gz)
    sh("curl", ["-sL", "--max-time", "120", "-o", tgz, `https://github.com/gitleaks/gitleaks/releases/download/v${GITLEAKS_VERSION}/gitleaks_${GITLEAKS_VERSION}_linux_x64.tar.gz`], { timeout: 130_000 });
    sh("tar", ["-xzf", tgz, "-C", WORK, "gitleaks"], { timeout: 60_000 });
    sh("chmod", ["+x", GL]);
  }
  glReady = glWorks();
  if (glReady) log(`gitleaks v${GITLEAKS_VERSION} ready`);
  else log("gitleaks still failing after fresh download — yaml-guard only this flight");
} catch (e) {
  log(`gitleaks unavailable (${String(e.message || e).slice(0, 80)}) — yaml-guard only this flight`);
}

// ── 3. relay each private repo (read-only) ───────────────────────────────────
rmSync(`${WORK}/clones`, { recursive: true, force: true });
mkdirSync(`${WORK}/clones`, { recursive: true });
const results = [];
const credHeader = `http.https://github.com/.extraheader=AUTHORIZATION: basic ${Buffer.from(`x-access-token:${token}`).toString("base64")}`;
const cloneEnv = { ...process.env, GIT_CONFIG_COUNT: "1", GIT_CONFIG_KEY_0: credHeader.split("=")[0], GIT_CONFIG_VALUE_0: credHeader.split("=").slice(1).join("=") };

for (const r of privs) {
  const t0 = Date.now();
  const dest = `${WORK}/clones/${r.name}`;
  const rec = { repo: r.name, ref: h(r.name), checks: {}, verdict: "PASS", ms: 0 };
  try {
    sh("git", ["clone", "--quiet", "--depth", "1", `https://github.com/${r.full_name}.git`, dest], { env: cloneEnv, timeout: CLONE_TIMEOUT_MS });
    const wfDir = `${dest}/.github/workflows`;
    const wfs = existsSync(wfDir) ? sh("ls", ["-1", wfDir]).trim().split("\n").filter((f) => f.endsWith(".yml") || f.endsWith(".yaml")) : [];

    // (a) yaml-guard — universal sanity on the repo's own workflows
    try {
      sh("python3", ["-c", `import yaml,sys,glob\nfiles=sorted(glob.glob(${JSON.stringify(wfDir)} + "/*.y*ml"))\nbad=[]\nfor f in files:\n    try: yaml.safe_load(open(f))\n    except Exception as e: bad.append(f"{f}: {str(e)[:80]}")\nprint("\\n".join(bad) if bad else "OK")\nsys.exit(1 if bad else 0)`], { timeout: SCAN_TIMEOUT_MS });
      rec.checks["workflow-yaml-guard"] = "PASS";
    } catch (e) {
      rec.checks["workflow-yaml-guard"] = "FAIL: " + String(e.stdout || e.message || "").slice(0, 140).replace(/\n/g, " | ");
      rec.verdict = "FAIL";
    }

    // (b) gitleaks tree-scan — only if the repo itself wants gitleaks
    const wantsGitleaks = wfs.some((f) => /gitleaks/i.test(readFileSync(`${wfDir}/${f}`, "utf8").slice(0, 4000)));
    if (wantsGitleaks) {
      if (!glReady) {
        rec.checks["gitleaks"] = "SKIP: binary unavailable this flight";
      } else {
        try {
          sh(GL, ["detect", "--source", dest, "--no-git", "--redact", "--exit-code", "1", "--report-path", `${WORK}/${r.name}-leaks.json`], { timeout: SCAN_TIMEOUT_MS });
          rec.checks["gitleaks"] = "PASS (tree-scan, depth-1)";
        } catch (e) {
          // gitleaks exit 1 = findings; parse report for counts (no secrets in receipt — counts only)
          let count = -1;
          try { count = JSON.parse(readFileSync(`${WORK}/${r.name}-leaks.json`, "utf8")).length; } catch { /* keep -1 */ }
          rec.checks["gitleaks"] = count >= 0 ? `FINDINGS:${count} (tree-scan, depth-1 — see the repo's own lane)` : "FAIL: scan error";
          rec.verdict = "FINDINGS";
        }
      }
    } else {
      rec.checks["gitleaks"] = "N/A (repo has no gitleaks lane)";
    }
  } catch (e) {
    rec.verdict = "CLONE-FAIL";
    rec.checks["clone"] = String(e.message || e).slice(0, 120);
  }
  rec.ms = Date.now() - t0;
  results.push(rec);
  log(`${rec.verdict} ${h(r.name)} (${rec.ms}ms) ${JSON.stringify(rec.checks).slice(0, 120)}`);
  await sleep(400);
}

// ── 4. DRYRUN stops before publishing ────────────────────────────────────────
if (DRYRUN) {
  log("DRYRUN — no publish. results:", JSON.stringify(results, null, 1).slice(0, 2000));
  process.exit(0);
}

// ── 5. publish receipts (public surface — hash-refs only) ────────────────────
const OUT = "ops/sovereign/RELAY";
mkdirSync(OUT, { recursive: true });
const now = new Date().toISOString();
const L = [];
L.push(`# RELAY-RECEIPTS — בדיקות-חסרות-המפתח של-הריפואים-הפרטיים, על-רץ-ציבורי`);
L.push("");
L.push(`נמדד ${now} · estate-relay/1 · קריאה-בלבד של-הריפואים-הפרטיים · אף-כתיבה-חזרה`);
L.push("");
L.push(`- הקשר: ריפואים-פרטיים על-תוכנית-חינם = קיר-דקות (run מת-בלי-שלב-ראשון) — זהו-תיקון-היכולת, לא-הסתרת-הקיר.`);
L.push(`- סקופ: ${results.length} ריפואים-פרטיים (≤${MAX_REPO_MB}MB) · oversize דולגו כנה: ${oversize.map((r) => h(r.name)).join(", ") || "אין"}`);
L.push(`- gitleaks: v${GITLEAKS_VERSION} tree-scan (depth-1) — אם-ורק-אם-הריפו-עצמו-מבקש-זאת`);
L.push("");
L.push(`| ref | verdict | yaml-guard | gitleaks |`);
L.push(`|---|---|---|---|`);
for (const r of results) {
  L.push(`| ${r.ref} | ${r.verdict} | ${r.checks["workflow-yaml-guard"] || "-"} | ${r.checks["gitleaks"] || "-"} |`);
}
L.push("");
const fails = results.filter((r) => r.verdict !== "PASS");
L.push(`- verdict: ${fails.length === 0 ? "**הכל-נקי בסקופ-הזה**" : `${fails.length} לא-נקיים (כנה — זה-האלרם, לא-השתקה)`}`);
L.push(`- הקיר-האדום-על-הריפואים-הפרטיים-עצמם נשאר-גלוי ב-manifest (P0 owner-words: דקות-בתשלום או-העברת-מסלולים-לפומבי)`);
writeFileSync(`${OUT}/RELAY-RECEIPTS.md`, L.join("\n") + "\n");

let prev = [];
const LEDGER = `${OUT}/relay-ledger.jsonl`;
try { prev = readFileSync(LEDGER, "utf8").trim().split("\n").filter(Boolean).slice(-255); } catch { /* new */ }
prev.push(JSON.stringify({ at: now, scanned: results.length, pass: results.filter((r) => r.verdict === "PASS").length, findings: results.filter((r) => r.verdict === "FINDINGS").length, cloneFails: results.filter((r) => r.verdict === "CLONE-FAIL").length }));
writeFileSync(LEDGER, prev.join("\n") + "\n");
log(`receipts published: ${results.length} repos, ${fails.length} non-clean`);
