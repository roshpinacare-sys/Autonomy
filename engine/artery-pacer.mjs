#!/usr/bin/env node
/**
 * artery-pacer.mjs — איבר-הקצב [t14 · owner order: "תמשיך ודחוף" + t13:
 * "לוודא פעילות תקינה כי הארכיטקטורה נשארת לבד · התפתחות וגדילה ולא סגירה"]
 * ═══════════════════════════════════════════════════════════════════════════
 * THE HEARTBEAT THAT DOES NOT DEPEND ON THE SCHEDULER.
 * Measured live (t14 forensics): GitHub silently drops most cron slots in
 * this repo — value-scan (cron 9,39) zero schedule-runs since 01:32,
 * artery-fleet ZERO schedule-runs in its last 5, self-heal's own 11,41
 * slots lost after 02:12. The t10 lesson was already encoded in
 * sovereign-tick: "11 consecutive cron slots missed, silently". Verdict
 * 03:55 showed 6 arteries DEGRADED purely from staleness while self-heal
 * dispatched them (they succeed — then go stale again before anyone
 * re-fires them).
 *
 * THE CURE (proven pattern of sovereign-state's self-chain):
 *   beat → measure each roster artery's last SUCCESS age → dispatch stale
 *   ones (cap 6) → chain-next beat via repository_dispatch [artery-pace].
 *   Cron exists only as a reviver if the chain ever dies. Zero new
 *   dependencies; dispatch-only authority (constitution law); receipts
 *   refs-only, bounded.
 *
 *   node engine/artery-pacer.mjs --selftest   (zero-network, must be green)
 *   node engine/artery-pacer.mjs              (live beat: measure→dispatch→receipt)
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = process.env.GITHUB_WORKSPACE || resolve(join(dirname(fileURLToPath(import.meta.url)), '..'));
const RECEIPTS = join(ROOT, 'receipts', 'pacer');
const STATE = join(ROOT, 'state', 'pacer');
const API = 'https://api.github.com';
const nowIso = () => new Date().toISOString();

/** cap per beat (fleet law: bounded API spend, matches self-heal cap law) */
export const MAX_DISPATCH_PER_BEAT = 6;
/** chain rhythm: minimum minutes between beats (throttle law of sovereign-tick) */
export const MIN_BEAT_MIN = 14;

/**
 * THE ROSTER — every artery that must keep beating, with its cadence.
 * Cadence = each workflow's own cron interval; staleness = age > cadence
 * (+10min grace, matching the verifier's slot law). Daily organs get 26h.
 */
export const ROSTER = [
  { wf: 'value-scan.yml', cadenceMin: 30 },
  { wf: 'artery-grid.yml', cadenceMin: 30 },
  { wf: 'artery-watch.yml', cadenceMin: 30 },
  { wf: 'verifier.yml', cadenceMin: 30 },
  { wf: 'artery-selfheal.yml', cadenceMin: 30 },
  { wf: 'artery-decision-truth.yml', cadenceMin: 30 },
  { wf: 'artery-wallet.yml', cadenceMin: 60 },
  { wf: 'artery-fleet.yml', cadenceMin: 60 },
  { wf: 'artery-builder.yml', cadenceMin: 70 },
  { wf: 'artery-scout.yml', cadenceMin: 13 * 60 },
  { wf: 'artery-treasury.yml', cadenceMin: 26 * 60 },
  { wf: 'artery-growth.yml', cadenceMin: 26 * 60 },
];

/** pure: which roster entries are stale given last-success ages (minutes) */
export function staleArteries(ages, { now = Date.now() } = {}) {
  const out = [];
  for (const r of ROSTER) {
    const age = ages?.[r.wf];
    if (age === null || age === undefined) { out.push({ ...r, ageMin: null, why: 'never-success-or-unknown' }); continue; }
    if (age > r.cadenceMin + 10) out.push({ ...r, ageMin: age, why: `last success ${Math.round(age)}min ago > cadence ${r.cadenceMin}+10grace` });
  }
  return out;
}

/** pure: throttle — a beat is due only after MIN_BEAT_MIN since the previous one */
export function beatDue(prevBeatIso, now = new Date()) {
  if (!prevBeatIso) return true;
  const t = Date.parse(prevBeatIso);
  if (Number.isNaN(t)) return true;
  return (now.getTime() - t) >= MIN_BEAT_MIN * 60000;
}

/** pure: cap + dedupe law for a beat's dispatch list */
export function planDispatch(stale, cap = MAX_DISPATCH_PER_BEAT) {
  const seen = new Set();
  const plan = [];
  for (const s of stale) {
    if (seen.has(s.wf)) continue;
    seen.add(s.wf);
    plan.push(s);
  }
  return { dispatch: plan.slice(0, cap), truncated: Math.max(0, plan.length - cap) };
}

function ghHeaders(token) {
  return { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'user-agent': 'saos-artery-pacer' };
}

/** last successful run age (minutes) for one workflow — null when unknown */
export async function lastSuccessAgeMin(wf, token, fetchImpl = fetch) {
  try {
    const res = await fetchImpl(`${API}/repos/${process.env.GITHUB_REPOSITORY}/actions/workflows/${wf}/runs?status=success&per_page=1`, { headers: ghHeaders(token), signal: AbortSignal.timeout(15000) });
    if (!res.ok) return null;
    const j = await res.json();
    const at = j?.workflow_runs?.[0]?.created_at;
    if (!at) return null;
    return (Date.now() - Date.parse(at)) / 60000;
  } catch { return null; }
}

/** dispatch one workflow — measured, honest (same law as self-heal) */
export async function dispatchWorkflow(wf, token, fetchImpl = fetch) {
  try {
    const meta = await fetchImpl(`${API}/repos/${process.env.GITHUB_REPOSITORY}/actions/workflows/${wf}`, { headers: ghHeaders(token), signal: AbortSignal.timeout(15000) });
    if (meta.status === 404) return { ok: false, status: 404, note: 'workflow-file-not-found' };
    if (!meta.ok) return { ok: false, status: meta.status, note: 'meta-fetch-failed' };
    const mj = await meta.json();
    if (mj.state !== 'active') return { ok: false, status: 0, note: `state=${mj.state} — dispatch refused (constitution: enable/disable is owner-level; disabled is reported loudly)` };
    const d = await fetchImpl(`${API}/repos/${process.env.GITHUB_REPOSITORY}/actions/workflows/${mj.id}/dispatches`, { method: 'POST', headers: ghHeaders(token), body: JSON.stringify({ ref: 'main' }), signal: AbortSignal.timeout(15000) });
    return { ok: d.status === 204, status: d.status, note: d.status === 204 ? 'dispatched' : 'dispatch-failed' };
  } catch (err) {
    return { ok: false, status: 0, note: String(err?.message || err).slice(0, 120) };
  }
}

function appendBoundedLedger(dir, entry, cap = 400) {
  mkdirSync(dir, { recursive: true });
  const p = join(dir, 'ledger.jsonl');
  let lines = [];
  if (existsSync(p)) lines = readFileSync(p, 'utf8').split('\n').filter(Boolean);
  lines.push(JSON.stringify(entry));
  writeFileSync(p, lines.slice(-cap).join('\n') + '\n');
}

export async function live() {
  const token = process.env.GITHUB_TOKEN || '';
  const receipt = {
    schema: 'pacer/1', at: nowIso(), ok: false, organ: 'artery-pacer',
    covenant: 'every artery keeps its beat without trusting the scheduler',
    skipped: false, checked: 0, stale: [], dispatched: [], truncated: 0, reasons: [],
  };
  try {
    // throttle law: one chain, no double-beats (sovereign-tick lesson)
    let prev = null;
    try { prev = JSON.parse(readFileSync(join(STATE, 'beat.json'), 'utf8')); } catch { prev = null; }
    if (!beatDue(prev?.at)) {
      receipt.skipped = true;
      receipt.reasons.push(`last beat ${prev.at} < ${MIN_BEAT_MIN}min ago — throttled (no receipt churn, no double-work)`);
    } else {
      const ages = {};
      for (const r of ROSTER) { ages[r.wf] = await lastSuccessAgeMin(r.wf, token); receipt.checked++; }
      const stale = staleArteries(ages);
      receipt.stale = stale.map(s => ({ wf: s.wf, ageMin: s.ageMin === null ? null : Math.round(s.ageMin), cadenceMin: s.cadenceMin, why: s.why }));
      const { dispatch, truncated } = planDispatch(stale);
      receipt.truncated = truncated;
      for (const s of dispatch) {
        const res = await dispatchWorkflow(s.wf, token);
        receipt.dispatched.push({ wf: s.wf, ...res });
      }
      receipt.ok = true;
      // beat memory (bounded)
      mkdirSync(STATE, { recursive: true });
      writeFileSync(join(STATE, 'beat.json'), JSON.stringify({ at: receipt.at, seq: (prev?.seq ?? 0) + 1, stale: stale.length, dispatched: dispatch.length }, null, 2) + '\n');
    }
  } catch (err) {
    receipt.defect = true;
    receipt.reasons.push(`organ defect: ${String(err?.stack || err).slice(0, 400)}`);
  }
  receipt.doneAt = nowIso();
  mkdirSync(RECEIPTS, { recursive: true });
  writeFileSync(join(RECEIPTS, 'latest.json'), JSON.stringify(receipt, null, 2) + '\n');
  if (!receipt.skipped) {
    appendBoundedLedger(RECEIPTS, {
      at: receipt.doneAt, ok: receipt.ok, checked: receipt.checked,
      stale: (receipt.stale || []).map(s => s.wf),
      dispatched: (receipt.dispatched || []).filter(d => d.ok).map(d => d.wf),
      failed: (receipt.dispatched || []).filter(d => !d.ok).map(d => d.wf),
      truncated: receipt.truncated,
    });
    // no-churn law: only MEANINGFUL beats deserve a git commit (quiet heartbeats
    // live in Actions history; the chain itself is the aliveness evidence)
    const meaningful = receipt.dispatched.length > 0 || receipt.defect || receipt.stale.length > 0;
    if (meaningful) { mkdirSync(STATE, { recursive: true }); writeFileSync(join(STATE, 'COMMIT_ME'), receipt.doneAt + '\n'); }
  }
  console.log(`[pacer] skipped=${receipt.skipped} checked=${receipt.checked} stale=${receipt.stale.length} dispatched=${receipt.dispatched.filter(d => d.ok).length}/${receipt.dispatched.length}`);
  return receipt;
}

export async function selftest() {
  const results = [];
  const t = (name, cond) => results.push({ name, pass: !!cond });

  // staleness law
  const ages = {
    'value-scan.yml': 107,       // stale (30+10)
    'artery-grid.yml': 20,       // fresh
    'artery-wallet.yml': null,   // unknown → stale (loud)
    'artery-treasury.yml': 25 * 60, // fresh (26h cadence)
    'artery-growth.yml': 30 * 60,   // stale (26h)
  };
  const stale = staleArteries(ages);
  const names = stale.map(s => s.wf);
  t('stale detected', names.includes('value-scan.yml'));
  t('fresh skipped', !names.includes('artery-grid.yml'));
  t('unknown counts stale', names.includes('artery-wallet.yml'));
  t('daily fresh', !names.includes('artery-treasury.yml'));
  t('daily stale', names.includes('artery-growth.yml'));
  t('stale carries cadence', stale[0].cadenceMin > 0);

  // beat throttle
  t('first beat always due', beatDue(null) === true);
  t('fresh beat throttled', beatDue(new Date(Date.now() - 5 * 60000).toISOString()) === false);
  t('old beat due', beatDue(new Date(Date.now() - 20 * 60000).toISOString()) === true);
  t('corrupt beat due (fail-open to work, not to silence)', beatDue('not-a-date') === true);

  // cap + dedupe
  const many = Array.from({ length: 9 }, (_, i) => ({ wf: `w${i}.yml` }));
  const plan = planDispatch(many);
  t('cap 6 enforced', plan.dispatch.length === 6 && plan.truncated === 3);
  const dup = planDispatch([{ wf: 'a.yml' }, { wf: 'a.yml' }, { wf: 'b.yml' }]);
  t('dedupe', dup.dispatch.length === 2);

  // dispatch laws with stub fetch
  const d1 = await dispatchWorkflow('ghost.yml', 'tok', async (url) =>
    url.includes('/ghost.yml') ? { status: 404, ok: false, json: async () => ({}) } : { ok: true, status: 200, json: async () => ({ state: 'active', id: 1 }) });
  t('404 honest', d1.ok === false && d1.note === 'workflow-file-not-found');
  const d2 = await dispatchWorkflow('paused.yml', 'tok', async () => ({ ok: true, status: 200, json: async () => ({ state: 'disabled_inactivity', id: 1 }) }));
  t('disabled refused + loud', d2.ok === false && d2.note.startsWith('state=disabled_inactivity'));
  const d3 = await dispatchWorkflow('live.yml', 'tok', async (url, init) =>
    init?.method === 'POST' ? { status: 204 } : { ok: true, status: 200, json: async () => ({ state: 'active', id: 7 }) });
  t('dispatch ok 204', d3.ok === true && d3.note === 'dispatched');

  // lastSuccessAge null-safe
  const a1 = await lastSuccessAgeMin('x.yml', 'tok', async () => ({ ok: false, status: 500 }));
  t('api fail → null age', a1 === null);

  // roster sanity
  t('roster includes covenant + builder', ROSTER.some(r => r.wf === 'artery-growth.yml') && ROSTER.some(r => r.wf === 'artery-builder.yml'));
  t('roster bounded ≤ 14 (API spend law)', ROSTER.length <= 14);

  return { ok: results.every(r => r.pass), results };
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  if (process.argv.includes('--selftest')) {
    const r = await selftest();
    if (process.env.SELFTEST_VERBOSE) for (const x of r.results) console.log(`${x.pass ? 'PASS' : 'FAIL'} ${x.name}`);
    console.log(`artery-pacer selftest: ${r.ok ? 'PASS' : 'FAIL'} (${r.results.length} checks)`);
    process.exit(r.ok ? 0 : 1);
  } else {
    const r = await live();
    process.exit(r.defect ? 2 : 0);
  }
}
