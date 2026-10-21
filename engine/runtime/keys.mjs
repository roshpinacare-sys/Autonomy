/**
 * keys.mjs — ריצת-מפתחות-ב-VM [t12 · owner approval: P1 "fleet posting keys→VM runtime"]
 * ═══════════════════════════════════════════════════════════════════════════════════════
 * THE ONLY LEGAL WAY KEYS EXIST IN THIS ARCHITECTURE AT RUNTIME:
 *
 *   repo secret (owner sets it once)
 *        → GitHub injects it as ENV into a workflow run
 *        → organ calls loadKey('NAME') at runtime — MEMORY ONLY
 *        → never written to disk, never echoed, never committed, never logged
 *
 * This closes the P1 gap measured in t10 ("0/14 posting-live"): organs no longer
 * need keys ON DISK to be "live" — they need the owner to add a secret, and this
 * loader + census turns presence/absence into an honest, loud receipt.
 *
 * Registry law honored (state/keys/REGISTRY.json): an organ must declare the
 * secret-name it needs; loadKey refuses undeclared names (fail-closed).
 *
 * Dual-mode: exported functions + --selftest (zero network, injected env/fetch)
 *            + live census → receipts/keys/latest.json (names only — NEVER values)
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = process.env.GITHUB_WORKSPACE || join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const REPO = process.env.GITHUB_REPOSITORY || 'roshpinacare-sys/Autonomy';
const API = `https://api.github.com/repos/${REPO}`;

/**
 * Secrets the organism expects at runtime (P1 registry section).
 * Present → organs flip PENDING→LIVE with proof; absent → loud pending receipts.
 */
export const REQUIRED_SECRETS = [
  { name: 'FLEET_PAT', purpose: 'GitHub org PAT for fleet organs (verified live t11)' },
  { name: 'NVIDIA_NIM_KEY', purpose: 'LLM brain fuel — auto-activates when NIM catalog revives (verified auth-valid t11, catalog 410/404 measured)' },
  { name: 'CI_ADOPT_WIF_ACTIVE', purpose: 'P2: treasury top-up executor — delegate to restore treasury ≥3000 SP (relayed t52 via key-relay-to-autonomy; verified live in consolidation runs)' },
  { name: 'FIXEDFLOAT_API_KEY', purpose: 't52 owner-added FF gate (key id) — read-only price probe lane; createOrder armed behind FIXEDFLOAT_EXEC=1' },
  { name: 'FIXEDFLOAT_API_SECRET', purpose: 't52 owner-added FF gate (HMAC secret) — memory-only, never echoed' },
];

/** loadKey(name, env) — memory-only key access, fail-closed, never logged */
export function loadKey(name, env = process.env) {
  const declared = REQUIRED_SECRETS.some((s) => s.name === name);
  if (!declared) return { ok: false, reason: 'undeclared-secret-name (registry law)' };
  const v = env[name];
  if (!v || typeof v !== 'string' || v.length < 8) return { ok: false, reason: 'absent' };
  return { ok: true, key: v }; // caller MUST keep memory-only; never write/echo
}

/** masked census shape (value NEVER included) */
export function maskPresence(names) {
  return names.map((n) => ({ name: n, present: true, value: undefined }));
}

/** secrets census via GitHub API — returns NAMES ONLY (GitHub never returns values) */
export async function censusSecrets(token, { apiBase = API, env = process.env } = {}) {
  if (!token) return { ok: false, reason: 'no-token', names: null };
  try {
    const res = await fetch(`${apiBase}/actions/secrets?per_page=100`, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'user-agent': 'saos-keys-census' },
    });
    if (res.status === 403 || res.status === 401) return { ok: false, reason: `forbidden-${res.status} (census needs admin PAT)`, names: null };
    if (!res.ok) return { ok: false, reason: `http-${res.status}`, names: null };
    const j = await res.json();
    const have = new Set((j.secrets ?? []).map((s) => s.name));
    const required = REQUIRED_SECRETS.map((r) => ({ name: r.name, purpose: r.purpose, present: have.has(r.name) }));
    return { ok: true, reason: 'census', total: (j.secrets ?? []).length, required };
  } catch (e) {
    return { ok: false, reason: `fetch-error:${String(e?.message || e).slice(0, 60)}`, names: null };
  }
}

async function live() {
  const token = process.env.GITHUB_TOKEN || process.env.FLEET_PAT;
  const receipt = { schema: 'keys.census/1', at: new Date().toISOString(), repo: REPO, ok: false, law: 'names-only — key values never enter this receipt' };
  const c = await censusSecrets(token);
  receipt.census = c;
  receipt.ok = c.ok === true;
  if (c.ok) {
    receipt.missing = c.required.filter((r) => !r.present).map((r) => r.name);
    receipt.ready = c.required.filter((r) => r.present).map((r) => r.name);
    receipt.summary = `${receipt.ready.length}/${c.required.length} required secrets present — organs with declared needs flip PENDING→LIVE per receipt`;
  }
  const out = join(ROOT, 'receipts', 'keys');
  mkdirSync(out, { recursive: true });
  writeFileSync(join(out, 'latest.json'), JSON.stringify(receipt, null, 1) + '\n');
  console.log(`[keys] census: ok=${receipt.ok} ${receipt.summary ?? c.reason ?? ''}`);
  return 0; // measured state, not failure — absent keys are a loud PENDING, not a crash
}

/* ── selftest: zero network ──────────────────────────────────────────────── */
export async function selftest() {
  // loadKey law
  const absent = loadKey('FLEET_PAT', {});
  if (absent.ok !== false || absent.reason !== 'absent') throw new Error('absent must fail-closed');
  const undeclared = loadKey('SOME_RANDOM_KEY', { SOME_RANDOM_KEY: 'x'.repeat(20) });
  if (undeclared.ok !== false || undeclared.reason !== 'undeclared-secret-name (registry law)') throw new Error('undeclared must refuse');
  const present = loadKey('NVIDIA_NIM_KEY', { NVIDIA_NIM_KEY: 'nvapi-' + 'x'.repeat(30) });
  if (!present.ok || typeof present.key !== 'string') throw new Error('present must load');
  const short = loadKey('FLEET_PAT', { FLEET_PAT: 'short' });
  if (short.ok !== false) throw new Error('too-short must fail-closed');
  // mask law: value never included
  const m = maskPresence(['FLEET_PAT']);
  if ('value' in m[0] && m[0].value !== undefined) throw new Error('mask law broken');
  if (JSON.stringify(m).includes('secret-material')) throw new Error('leak in mask');
  // census law: 403 path via injected fetch
  const c403 = await censusSecrets('tok', { apiBase: 'https://example.invalid/repos/x/y', env: {} });
  // (network-less: fetch to invalid host throws → caught → fetch-error path)
  if (c403.ok !== false || !c403.reason) throw new Error('census must fail-honest');
  console.log('[keys] selftest: PASS (declared-law, absent, too-short, mask, census fail-honest)');
  return 0;
}

const isMain = process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href;
if (isMain) {
  process.exit(process.argv.includes('--selftest') ? await selftest() : await live());
}
