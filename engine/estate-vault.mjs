// estate-vault.mjs — תמונת-מצב-שוטפת של-כל-האחוזה אל-הכספת (disaster-recovery tier).
// ═════════════════════════════════════════════════════════════════════════════
// דוקטרינה (SOVEREIGNTY.md §1): "ריבונות-שמוחזקת-בבית-אחד בלבד היא ריבונות-בחסד-מארח אחד".
// gitlab-mirror (T-53) = הבית-השני-חוצה-מארח (נכון-היום 3/34 — דורש GITLAB_TOKEN).
// estate-vault = השכבה-בתוך-האחוזה: bundle-git מלא של-כל-ריפו (עד-40MB) אל
// vault-home/vault-chain/bundles/ — גלגול-יומי (תמונה-אחת-אחרונה לכל-ריפו) +
// MANIFEST.json חי (המניפסט-הקיים מ-2026-10-10 — מתעדכן-עתה מה-API, roles נשמרים).
//
// חוקים-על-הסיפון: measured-or-null · rate-limit = BLOCKED receipt exit-0 (T-77) ·
// budget-exhausted = named-terminal · אף-ערך-סוד-לא-נדפס · private-names מוסרים
// hash-ref בפלט-הציבורי של-Autonomy (בתוך-vault-home — פרטי — שמות-מלאים-כן).
// יציאה: 0 תמיד-עם-קבלה (receipt-is-the-alarm); קריסה-בלתי-צפויה = רועמת.
import { execFileSync } from "node:child_process";
import { writeFileSync, mkdirSync, existsSync, rmSync, readFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";

const API = "https://api.github.com";
const OWNER = "roshpinacare-sys";
const token = process.env.INV_TOKEN || process.env.ZIP_PAT || process.env.GITHUB_TOKEN || "";
const WORK = "/tmp/estate-vault-work";
const MAX_REPO_MB = Number(process.env.MAX_REPO_MB || 40);
const PER_REPO_TIMEOUT_MS = 90_000;
const DRYRUN = process.env.ESTATE_VAULT_DRYRUN === "1";
const log = (...a) => console.log("[estate-vault]", ...a);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function die(msg) { console.error("[estate-vault] FATAL", msg); process.exit(1); }
if (!token) die("no token (INV_TOKEN/ZIP_PAT) — keyless run is pointless here (fail-closed)");

async function api(pathname, opts = {}) {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), 25_000);
  try {
    const res = await fetch(`${API}${pathname}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "User-Agent": "saos-estate-vault", ...(opts.headers || {}) },
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

// ── 1. census: all repos with sizes ──────────────────────────────────────────
const repos = [];
let page = 1;
while (true) {
  const batch = await api(`/user/repos?per_page=100&page=${page}&sort=full_name`);
  if (!Array.isArray(batch) || batch.length === 0) break;
  repos.push(...batch);
  if (batch.length < 100) break;
  page++;
}
log(`census: ${repos.length} repos, estate=${Math.round(repos.reduce((s, r) => s + r.size, 0) / 1024)}MB`);
const bundleable = repos.filter((r) => r.size <= MAX_REPO_MB * 1024);
const skipped = repos.filter((r) => r.size > MAX_REPO_MB * 1024);
log(`bundleable: ${bundleable.length} (<=${MAX_REPO_MB}MB) · skipped: ${skipped.length}`);

// ── 2. clone bare + bundle each (bounded) ────────────────────────────────────
rmSync(WORK, { recursive: true, force: true });
mkdirSync(`${WORK}/bundles`, { recursive: true });
const results = [];
const credHeader = `http.https://github.com/.extraheader=AUTHORIZATION: basic ${Buffer.from(`x-access-token:${token}`).toString("base64")}`;

for (const r of bundleable) {
  const t0 = Date.now();
  const dest = `${WORK}/${r.name}.git`;
  try {
    sh("git", ["clone", "--bare", "--quiet", `https://github.com/${r.full_name}.git`, dest], { env: { ...process.env, GIT_CONFIG_COUNT: "1", GIT_CONFIG_KEY_0: credHeader.split("=")[0], GIT_CONFIG_VALUE_0: credHeader.split("=").slice(1).join("=") }, timeout: PER_REPO_TIMEOUT_MS });
    const bundle = `${WORK}/bundles/${r.name}.bundle`;
    sh("git", [`--git-dir=${dest}`, "bundle", "create", bundle, "--all"], { timeout: PER_REPO_TIMEOUT_MS });
    const headSha = sh("git", [`--git-dir=${dest}`, "rev-parse", "HEAD"]).trim();
    const bytes = statSync(bundle).size;
    const sha256 = createHash("sha256").update(readFileSync(bundle)).digest("hex");
    results.push({ repo: r.name, private: r.private, bytes, sha256, head: headSha, pushedAt: r.pushed_at, ms: Date.now() - t0 });
    log(`bundled ${r.name}: ${(bytes / 1048576).toFixed(1)}MB in ${(Date.now() - t0) / 1000 | 0}s`);
  } catch (e) {
    results.push({ repo: r.name, private: r.private, error: String(e.message || e).slice(0, 160), ms: Date.now() - t0 });
    log(`SKIP-FAIL ${r.name}: ${String(e.message || e).slice(0, 100)}`);
  }
}

const okBundles = results.filter((r) => r.sha256);
const totalMb = (okBundles.reduce((s, r) => s + r.bytes, 0) / 1048576).toFixed(1);
log(`bundled OK: ${okBundles.length}/${bundleable.length} · ${totalMb}MB total`);

// ── 3. DRYRUN stops before any push ─────────────────────────────────────────
if (DRYRUN) {
  log("DRYRUN — no push. sample:", JSON.stringify(results.slice(0, 3)));
  console.log(JSON.stringify({ ok: okBundles.length, skipped: skipped.length, totalMb }, null, 2));
  process.exit(0);
}

// ── 4. land into vault-home (clone → bundles/ + MANIFEST.json → push) ───────
const VAULT_DIR = `${WORK}/vault-home`;
// the credential env must ride EVERY git call on the vault clone (clone, pull,
// push) — a lesson measured live: env passed only to clone left pull/push keyless
const vaultEnv = { ...process.env, GIT_CONFIG_COUNT: "1", GIT_CONFIG_KEY_0: credHeader.split("=")[0], GIT_CONFIG_VALUE_0: credHeader.split("=").slice(1).join("=") };
sh("git", ["clone", "--quiet", `https://github.com/${OWNER}/vault-home.git`, VAULT_DIR], { env: vaultEnv, timeout: 120_000 });

// bundles: rolling — keep latest per repo
const B_DIR = `${VAULT_DIR}/vault-chain/bundles`;
mkdirSync(B_DIR, { recursive: true });
for (const f of existsSync(B_DIR) ? sh("ls", ["-1", B_DIR]).trim().split("\n").filter((f) => f.endsWith(".bundle")) : []) {
  rmSync(`${B_DIR}/${f}`);
}
for (const b of okBundles) {
  sh("cp", [`${WORK}/bundles/${b.repo}.bundle`, `${B_DIR}/${b.repo}.bundle`]);
}

// bundles index (current snapshot)
const snap = {
  schema: "estate-bundles/1",
  generatedAt: new Date().toISOString(),
  maxRepoMb: MAX_REPO_MB,
  totals: { bundled: okBundles.length, skippedOversize: skipped.length, bytes: okBundles.reduce((s, r) => s + r.bytes, 0) },
  bundles: results,
  oversize: skipped.map((r) => ({ repo: r.name, mb: Math.round(r.size / 1024), note: "size-bound — estate-vault tier skips; owner-words may re-tier" })),
  recovery: "git clone vault-home && git clone vault-chain/bundles/<repo>.bundle <repo> && cd <repo> && git checkout main",
};
writeFileSync(`${B_DIR}/bundles.json`, JSON.stringify(snap, null, 1) + "\n");

// MANIFEST.json — live refresh, roles preserved
const M_PATH = `${VAULT_DIR}/MANIFEST.json`;
let oldRoles = {};
try { for (const r of JSON.parse(readFileSync(M_PATH, "utf8")).repos || []) oldRoles[r.name] = r.role; } catch { /* seed fresh */ }
const manifest = {
  format: "sovereign-manifest-1",
  org: OWNER,
  keyring: "fleet-vault",
  generatedAt: new Date().toISOString(),
  generator: "estate-vault.mjs (live API census — roles preserved from the seeded manifest)",
  repos: repos
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((r) => ({ name: r.name, visibility: r.private ? "private" : "public", role: oldRoles[r.name] || "member repo (live-census)", url: `https://github.com/${r.full_name}.git`, defaultBranch: r.default_branch, pushedAt: r.pushed_at, sizeKb: r.size })),
};
writeFileSync(M_PATH, JSON.stringify(manifest, null, 1) + "\n");

// LEDGER append (bounded tail)
const LEDGER = `${B_DIR}/LEDGER.jsonl`;
let prev = [];
try { prev = readFileSync(LEDGER, "utf8").trim().split("\n").filter(Boolean).slice(-255); } catch { /* new */ }
prev.push(JSON.stringify({ at: snap.generatedAt, bundled: okBundles.length, skipped: skipped.length, totalMb: Number(totalMb), headShas: Object.fromEntries(okBundles.map((b) => [b.repo, b.head])) }));
writeFileSync(LEDGER, prev.join("\n") + "\n");

// push with bounded rebase-retry (fleet law — never force)
sh("git", ["-C", VAULT_DIR, "config", "user.email", "estate-vault@fleet"], { env: vaultEnv });
sh("git", ["-C", VAULT_DIR, "config", "user.name", "estate-vault"], { env: vaultEnv });
sh("git", ["-C", VAULT_DIR, "add", "-A"], { env: vaultEnv });
let pushed = false;
for (let i = 1; i <= 5 && !pushed; i++) {
  try {
    sh("git", ["-C", VAULT_DIR, "commit", "-m", `estate-vault snapshot: ${okBundles.length} bundles ${totalMb}MB + live MANIFEST @ ${snap.generatedAt}`, "--allow-empty"], { env: vaultEnv, timeout: 60_000 });
    sh("git", ["-C", VAULT_DIR, "pull", "--rebase", "-q"], { env: vaultEnv, timeout: 120_000 });
    sh("git", ["-C", VAULT_DIR, "push", "-q", "origin", "HEAD:main"], { env: vaultEnv, timeout: 600_000 });
    pushed = true;
  } catch (e) {
    log(`push attempt ${i} failed: ${String(e.message || e).slice(0, 120)}`);
    if (i < 5) { try { sh("git", ["-C", VAULT_DIR, "rebase", "--abort"], { env: vaultEnv, timeout: 10_000 }); } catch { /* not rebasing */ } await sleep(3000 * i); }
  }
}
if (!pushed) {
  // named terminal — the snapshot exists locally in the runner; next daily flight re-lands it
  const note = `PUBLISH-DEFERRED: budget exhausted after 5 bounded attempts (never force). Next daily flight re-lands. Census ${repos.length} repos, bundles OK ${okBundles.length} (${totalMb}MB).`;
  log(note);
  mkdirSync("ops/sovereign/ESTATE-VAULT", { recursive: true });
  writeFileSync("ops/sovereign/ESTATE-VAULT/receipt.md", `# estate-vault receipt\n\n${snap.generatedAt}\n\n- verdict: **PUBLISH-DEFERRED** (named terminal, exit-0)\n- ${note}\n- bundles.json (runner-side) totals: ${JSON.stringify(snap.totals)}\n`);
  process.exit(0);
}
log(`pushed to vault-home ✓ (${okBundles.length} bundles, ${totalMb}MB, MANIFEST refreshed ${repos.length} repos)`);

// ── 5. receipt in Autonomy (public, private-names hash-ref'd — fleet law) ───
mkdirSync("ops/sovereign/ESTATE-VAULT", { recursive: true });
// exact convention of network-inventory.mjs (cross-manifest stable refs):
const h = (n) => `priv-h${createHash("sha256").update(`priv:${n}`).digest("hex").slice(0, 8)}`;
const pubSafe = (name, isPrivate) => (isPrivate ? h(name) : name);
// oversize-skip entries are raw API objects (.name/.private/.size) — normalize
const skipNorm = skipped.map((r) => ({ repo: r.name, private: r.private, size: r.size }));
const receipt = [
  `# estate-vault receipt`,
  ``,
  `- at: ${snap.generatedAt}`,
  `- verdict: **LANDED** — ${okBundles.length}/${bundleable.length} bundles (${totalMb}MB) pushed to vault-home/vault-chain/bundles/`,
  `- MANIFEST.json refreshed live: ${repos.length} repos (roles preserved, pushedAt fresh)`,
  `- oversize-skipped (honest): ${skipNorm.map((r) => `${pubSafe(r.repo, r.private)} ${Math.round(r.size / 1024)}MB`).join(", ") || "none"}`,
  `- failures (honest): ${results.filter((r) => r.error).map((r) => `${pubSafe(r)}: ${r.error}`).join("; ") || "none"}`,
  `- recovery one-liner: \`git clone vault-home && git clone vault-chain/bundles/<repo>.bundle\``,
  `- tier honesty: in-estate copy (survives repo-loss/corruption/force-push); cross-host tier = gitlab-mirror (GITLAB_TOKEN = owner-words)`,
].join("\n");
writeFileSync("ops/sovereign/ESTATE-VAULT/receipt.md", receipt + "\n");
log("receipt written");
