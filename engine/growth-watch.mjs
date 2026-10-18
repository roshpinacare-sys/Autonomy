#!/usr/bin/env node
/**
 * growth-watch.mjs — איבר-הצמיחה [t13 · owner order: "בקרוב אני הולך לישון...
 * משאירים את הארכיטקטורה לעבוד לבד... רק לוודא התפתחות וגדילה ולא סגירה,
 * המנעות, נעילה וקיפול של המערכת"]
 * ═══════════════════════════════════════════════════════════════════════════
 * THE NO-CLOSURE COVENANT. Daily, before the owner even asks:
 *
 *   C1 arteries — every scheduled workflow still ACTIVE (GitHub auto-disables
 *      cron workflows; the t10 lesson: 9 died silently). API census, names-only.
 *   C2 product — the site's product surfaces are FRESH (builder receipt age)
 *      and the LIVE Pages URL serves the pulse marker.
 *   C3 pulse — receipts are flowing (latest receipts younger than 26h).
 *   C4 backlog — the builder has a non-empty backlog or shipped recently:
 *      a sovereignty with nothing to build has stopped looking.
 *
 * Any closure signal → receipt ok:false + exit 2 (LOUD — no silent-green,
 * no "avoidance"). Zero closure signals → ok:true. Names-only (no secrets,
 * no contents): refs-scrub law.
 *
 *   node engine/growth-watch.mjs --selftest  (zero-network)
 *   node engine/growth-watch.mjs             (live census)
 */
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = process.env.GITHUB_WORKSPACE || resolve(join(dirname(fileURLToPath(import.meta.url)), '..'));
const RECEIPTS = join(ROOT, 'receipts', 'growth');
const nowIso = () => new Date().toISOString();
const hoursSince = (iso, now = Date.now()) => (iso ? Math.max(0, (now - Date.parse(iso)) / 3600000) : null);

export const LIMITS = { maxReceiptAgeH: 26, maxBuilderAgeH: 26, maxPagesH: 26 };

/** C1: workflow state census via REST API (names-only, fail-honest) */
export async function censusWorkflows({ repo, token, fetchImpl = fetch } = {}) {
  const out = { repo, ok: null, active: 0, disabled: [], disabled_fork: [], error: null };
  if (!repo) { out.error = 'no repo'; return out; }
  try {
    const names = [];
    let page = 1, total = 0;
    for (; page <= 5; page++) {
      const res = await fetchImpl(`https://api.github.com/repos/${repo}/actions/workflows?per_page=100&page=${page}`, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' } : {}),
          'User-Agent': 'growth-watch',
        },
        signal: AbortSignal.timeout(20000),
      });
      if (!res.ok) { out.error = `api ${res.status}`; return out; }
      const j = await res.json();
      const wfs = j?.workflows ?? [];
      total += wfs.length;
      for (const w of wfs) { names.push({ path: String(w.path || '').replace('refs/heads/', ''), state: w.state }); }
      if (!j?.workflows?.length || wfs.length < 100) break;
    }
    out.active = names.filter(w => w.state === 'active' && w.path.startsWith('.github/workflows/')).length;
    for (const w of names) {
      if (w.state !== 'active' && w.path.startsWith('.github/workflows/')) out.disabled.push(w.path);
      if (w.state !== 'active' && w.path.startsWith('@@FORK@@')) out.disabled_fork.push(w.path);
    }
    out.counted = total;
    out.ok = out.disabled.length === 0;
  } catch (err) { out.error = String(err?.message || err).slice(0, 200); }
  return out;
}

/** C2/C3/C4 signals from local receipts (fail-honest, names/ages only) */
export function localSignals(root, opts = {}) {
  const now = opts.now ?? new Date();
  const nowMs = now.getTime();
  const read = p => { try { return JSON.parse(readFileSync(p, 'utf8')); } catch { return null; } };
  const signals = [];
  const builder = read(join(root, 'receipts', 'builder', 'latest.json'));
  const builderAge = hoursSince(builder?.doneAt ?? builder?.at, nowMs);
  if (builderAge === null || builderAge > LIMITS.maxBuilderAgeH)
    signals.push({ id: 'BUILDER_STALE', detail: `builder receipt age ${builderAge === null ? 'missing' : `${Math.round(builderAge)}h`} > ${LIMITS.maxBuilderAgeH}h` });

  const vf = read(join(root, 'state', 'verifier', 'verdict-latest.json'));
  const vAge = hoursSince(vf?.at ?? vf?.generated_at, nowMs);
  if (vAge === null || vAge > LIMITS.maxReceiptAgeH)
    signals.push({ id: 'VERIFIER_STALE', detail: `verifier verdict age ${vAge === null ? 'missing' : `${Math.round(vAge)}h`}` });

  const sh = read(join(root, 'receipts', 'self-heal', 'latest.json'));
  if (sh?.workflows?.disabled > 0)
    signals.push({ id: 'WORKFLOWS_DISABLED', detail: `${sh.workflows.disabled} workflows disabled (self-heal census)` });

  const backlogEmpty = builder?.audit?.backlog?.length === 0;
  const lastShip = hoursSince(builder?.ship ? builder?.doneAt : null, nowMs);
  if (backlogEmpty && (lastShip === null || lastShip > 48))
    signals.push({ id: 'EMPTY_BACKLOG', detail: 'builder sees nothing to build and has not shipped in 48h — a system with nothing to build has stopped looking' });

  return { signals, builderAge, verifierAge: vAge };
}

export async function live() {
  const receipt = {
    schema: 'growth/1', at: nowIso(), ok: false, organ: 'growth-watch',
    covenant: 'growth-not-closure · התפתחות-וגדילה-ולא-סגירה',
    checks: {}, signals: [], reasons: [],
  };
  try {
    const token = process.env.GITHUB_TOKEN || '';
    const local = localSignals(ROOT);
    receipt.checks.local = { builderAgeH: local.builderAge === null ? null : Math.round(local.builderAge), verifierAgeH: local.verifierAge === null ? null : Math.round(local.verifierAge) };
    receipt.signals.push(...local.signals);

    const repo = process.env.GITHUB_REPOSITORY || 'roshpinacare-sys/Autonomy';
    const census = await censusWorkflows({ repo, token });
    receipt.checks.workflows = { repo: census.repo, active: census.active, disabled: census.disabled, error: census.error };
    if (census.disabled?.length) receipt.signals.push({ id: 'WORKFLOWS_DISABLED', detail: `${census.disabled.length} disabled: ${census.disabled.join(', ')}` });
    if (census.error) receipt.reasons.push(`census incomplete: ${census.error} (fail-honest, will retry next run)`);

    // live site check (names only — no content dumps)
    const base = process.env.SITE_BASE || 'https://roshpinacare-sys.github.io/Domain';
    try {
      const res = await fetch(`${base}/pulse.json`, { signal: AbortSignal.timeout(15000) });
      const okLive = res.ok;
      const j = okLive ? await res.json().catch(() => null) : null;
      const age = hoursSince(j?.at);
      receipt.checks.live = { url: `${base}/pulse.json`, status: res.status, ageH: age === null ? null : Math.round(age) };
      if (!okLive) receipt.signals.push({ id: 'LIVE_SITE_DOWN', detail: `pulse.json HTTP ${res.status}` });
      else if (age !== null && age > LIMITS.maxPagesH) receipt.signals.push({ id: 'LIVE_SITE_STALE', detail: `live pulse age ${Math.round(age)}h > ${LIMITS.maxPagesH}h` });
    } catch (err) {
      receipt.checks.live = { error: String(err?.message || err).slice(0, 160) };
      receipt.reasons.push('live check unreachable (network) — fail-honest');
    }

    receipt.ok = receipt.signals.length === 0;
    if (receipt.signals.length) {
      console.log(`[growth-watch] CLOSURE SIGNALS (${receipt.signals.length}):`);
      for (const s of receipt.signals) console.log(`  ⚠ ${s.id}: ${s.detail}`);
      console.log('[growth-watch] the covenant demands growth — loud report, owner-visible');
    } else {
      console.log('[growth-watch] covenant held: arteries active, product fresh, receipts flowing, backlog alive');
    }
  } catch (err) {
    receipt.defect = true;
    receipt.reasons.push(`organ defect: ${String(err?.stack || err).slice(0, 400)}`);
  }
  receipt.doneAt = nowIso();
  mkdirSync(RECEIPTS, { recursive: true });
  writeFileSync(join(RECEIPTS, 'latest.json'), JSON.stringify(receipt, null, 2) + '\n');
  return receipt;
}

export async function selftest() {
  const results = [];
  const t = (name, cond) => results.push({ name, pass: !!cond });

  t('hoursSince null', hoursSince(null) === null);
  t('hoursSince 2h', Math.round(hoursSince(new Date(Date.now() - 7200000).toISOString())) === 2);

  const cw = await censusWorkflows({ repo: null });
  t('census no-repo honest', cw.error === 'no repo' && cw.ok === null);

  const cw2 = await censusWorkflows({
    repo: 'x/y', token: 't',
    fetchImpl: async () => ({ ok: true, status: 200, json: async () => ({ workflows: [
      { path: '.github/workflows/a.yml', state: 'active' },
      { path: '.github/workflows/b.yml', state: 'disabled_inactivity' },
    ] }) }),
  });
  t('census counts active', cw2.active === 1);
  t('census names disabled', cw2.disabled.length === 1 && cw2.disabled[0].includes('b.yml'));
  t('census ok=false when disabled', cw2.ok === false);

  const { mkdtempSync, rmSync, writeFileSync, mkdirSync: mkd } = await import('node:fs');
  const { tmpdir } = await import('node:os');
  const dir = mkdtempSync(join(tmpdir(), 'growth-'));
  const s0 = localSignals(dir);
  t('empty root → BUILDER_STALE signal', s0.signals.some(s => s.id === 'BUILDER_STALE'));

  mkd(join(dir, 'receipts', 'builder'), { recursive: true });
  writeFileSync(join(dir, 'receipts', 'builder', 'latest.json'), JSON.stringify({
    doneAt: new Date(Date.now() - 3600000).toISOString(),
    audit: { backlog: [{ id: 'PULSE_SNAPSHOT' }] },
  }));
  const s1 = localSignals(dir);
  t('fresh builder no signal', !s1.signals.some(s => s.id === 'BUILDER_STALE'));

  writeFileSync(join(dir, 'receipts', 'builder', 'latest.json'), JSON.stringify({
    doneAt: new Date().toISOString(), audit: { backlog: [] }, ship: { pushed: true },
  }));
  const s2 = localSignals(dir, { now: new Date(Date.now() + 49 * 3600000) });
  t('empty backlog + old ship → signal', s2.signals.some(s => s.id === 'EMPTY_BACKLOG'));
  rmSync(dir, { recursive: true, force: true });

  return { ok: results.every(r => r.pass), results };
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  if (process.argv.includes('--selftest')) {
    const r = await selftest();
    if (process.env.SELFTEST_VERBOSE) for (const x of r.results) console.log(`${x.pass ? 'PASS' : 'FAIL'} ${x.name}`);
    console.log(`growth-watch selftest: ${r.ok ? 'PASS' : 'FAIL'} (${r.results.length} checks)`);
    process.exit(r.ok ? 0 : 1);
  } else {
    const r = await live();
    process.exit(r.defect ? 2 : (r.signals.length ? 2 : 0)); // closure signals = loud non-zero
  }
}
