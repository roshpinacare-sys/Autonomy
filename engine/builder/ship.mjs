#!/usr/bin/env node
/**
 * builder/ship.mjs — איבר-הבונה · מפליג-השינויים [t13]
 * ═══════════════════════════════════════════════════════════════════════════
 * SHIP + VERIFY PHASE: applies craft deltas to the site checkout (collision
 * law: new files + marker-scoped sections only), commits scoped paths,
 * pushes with rebase-retry ×3 (fleet law: siblings push in parallel), then
 * verifies the LIVE Pages URL actually serves the new marker — no silent-green.
 *
 * git + fetch are injectable → selftest is zero-network, zero-git.
 */
import { writeFileSync, readFileSync, existsSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { PULSE_START, injectSection } from './craft.mjs';
import { execSync } from 'node:child_process';

const sh = (cmd, cwd, exec) => (exec ?? ((c, o) => execSync(c, { encoding: 'utf8', ...o })))(`cd ${JSON.stringify(cwd)} && ${cmd}`, { encoding: 'utf8' });

/** apply craft deltas to the site checkout; returns per-file summary */
export function applyEdits(siteRoot, edits, log = () => {}) {
  const out = [];
  for (const e of edits) {
    const p = join(siteRoot, e.path);
    if (e.mode === 'section') {
      if (!existsSync(p)) { out.push({ path: e.path, ok: false, why: 'section target missing' }); continue; }
      const before = readFileSync(p, 'utf8');
      const after = injectSection(before, e.content);
      if (after === null) { out.push({ path: e.path, ok: false, why: 'no anchor found — refusing blind edit' }); continue; }
      if (after === before) { out.push({ path: e.path, ok: true, changed: false, why: 'section identical' }); continue; }
      mkdirSync(dirname(p), { recursive: true });
      writeFileSync(p, after);
      out.push({ path: e.path, ok: true, changed: true, bytes: after.length });
      log(`section ${e.path}: ${before.length}→${after.length} bytes`);
    } else { // write (new file)
      mkdirSync(dirname(p), { recursive: true });
      writeFileSync(p, e.content);
      out.push({ path: e.path, ok: true, changed: true, bytes: e.content.length, created: !existsSync(p) });
      log(`write ${e.path}: ${e.content.length} bytes`);
    }
  }
  return out;
}

/** last commit date (YYYY-MM-DD) per path, from git truth; null when never committed */
export function gitLastDates(siteRoot, paths, exec) {
  const map = {};
  for (const p of paths) {
    try {
      const o = sh(`git log -1 --format=%cs -- ${JSON.stringify(p)}`, siteRoot, exec).trim();
      map[p] = /^\d{4}-\d{2}-\d{2}$/.test(o) ? o : null;
    } catch { map[p] = null; }
  }
  return map;
}

/** commit scoped paths + push with rebase-retry ×3; measured, loud on failure */
export function gitShip(siteRoot, { message, paths, exec }) {
  const run = (cmd) => sh(cmd, siteRoot, exec).trim();
  const changed = run(`git status --porcelain -- ${paths.map(p => JSON.stringify(p)).join(' ')}`);
  if (!changed) return { pushed: false, why: 'nothing changed', commit: null };
  run(`git add -- ${paths.map(p => JSON.stringify(p)).join(' ')}`);
  run(`git -c user.name=sovereign-agent-9 -c user.email=agent9@fleet.local commit -m ${JSON.stringify(message)}`);
  const sha = run('git rev-parse --short HEAD');
  let pushed = false, lastErr = null;
  for (let i = 1; i <= 3 && !pushed; i++) {
    try { run('git push origin main'); pushed = true; }
    catch (err) {
      lastErr = String(err?.message || err).slice(0, 300);
      try { run('git pull --rebase origin main'); } catch (e2) { lastErr = String(e2?.message || e2).slice(0, 300); }
    }
  }
  return { pushed, why: pushed ? 'ok' : `push failed after 3 retries: ${lastErr}`, commit: sha };
}

/** git log tail parsed into {sha,date,msg} — the site's own evolution story */
export function gitLogTail(siteRoot, n = 40, exec) {
  try {
    const raw = sh(`git log -n ${n} --pretty=%h%x1f%cs%x1f%s`, siteRoot, exec);
    return raw.split('\n').filter(Boolean).map(line => {
      const [sha, date, msg] = line.split('\x1f');
      return { sha, date, msg };
    });
  } catch { return []; }
}

/** verify the LIVE pages actually serve the new build (marker check) */
export async function verifyLive(urls, { marker = PULSE_START, fetchImpl = fetch } = {}) {
  const out = [];
  for (const url of urls) {
    try {
      const res = await fetchImpl(url, { redirect: 'follow', signal: AbortSignal.timeout(15000) });
      const body = res.ok ? await res.text() : '';
      out.push({ url, status: res.status, ok: res.ok, hasMarker: marker ? body.includes(marker) : null, bytes: body.length });
    } catch (err) {
      out.push({ url, status: 0, ok: false, error: String(err?.message || err).slice(0, 160) });
    }
  }
  return out;
}

export async function selftest() {
  const results = [];
  const t = (name, cond) => results.push({ name, pass: !!cond });

  // applyEdits: write + section modes on temp dir
  const dir = mkdtempSync(join(tmpdir(), 'builder-ship-'));
  const w = applyEdits(dir, [
    { path: 'pulse.json', mode: 'write', content: '{"schema":"builder-pulse/1"}\n' },
    { path: 'sub/x.html', mode: 'write', content: '<html></html>' },
  ]);
  t('write creates file', w[0].ok && existsSync(join(dir, 'pulse.json')));
  t('write mkdirs parents', w[1].ok && existsSync(join(dir, 'sub/x.html')));

  const host = join(dir, 'index.html');
  writeFileSync(host, '<html><body>\n  <!-- ═══ surfaces ═══ -->\n</body></html>');
  const s = applyEdits(dir, [{ path: 'index.html', mode: 'section', content: `${PULSE_START}\nSEC\n${'<!--/builder:pulse-->'}` }]);
  t('section injects', s[0].ok && s[0].changed && readFileSync(host, 'utf8').includes('SEC'));
  const s2 = applyEdits(dir, [{ path: 'index.html', mode: 'section', content: `${PULSE_START}\nSEC\n${'<!--/builder:pulse-->'}` }]);
  t('section idempotent', s2[0].ok && !s2[0].changed);

  // gitShip with fake exec (no real git): verify command ordering + retry
  let calls = [];
  const fakeExec = (cmd) => { calls.push(cmd); if (cmd.includes('git status --porcelain')) return ' M pulse.json\n'; if (cmd.includes('git push')) throw new Error('rejected'); return ''; };
  const r = gitShip(dir, { message: 'test', paths: ['pulse.json'], exec: fakeExec });
  t('ship fails loud after retries', r.pushed === false && r.why.includes('3 retries'));
  t('ship retried 3x', calls.filter(c => c.includes('git push')).length === 3);
  t('ship rebases between retries', calls.some(c => c.includes('pull --rebase')));

  calls = [];
  const okExec = (cmd) => { calls.push(cmd); if (cmd.includes('git status --porcelain')) return ' M pulse.json\n'; if (cmd.includes('rev-parse')) return 'abc1234'; return ''; };
  const r2 = gitShip(dir, { message: 'test', paths: ['pulse.json'], exec: okExec });
  t('ship ok path', r2.pushed === true && r2.commit === 'abc1234');
  t('ship adds only scoped paths', calls.some(c => c.includes('git add -- "pulse.json"')));

  // nothing-changed → honest no-op
  calls = [];
  const quiet = gitShip(dir, { message: 'x', paths: ['pulse.json'], exec: (cmd) => { calls.push(cmd); return ''; } });
  t('ship no-op honest', quiet.pushed === false && quiet.why === 'nothing changed' && !calls.some(c => c.includes('commit')));

  // verifyLive with stub fetch
  const v = await verifyLive(['https://x/ok', 'https://x/404', 'https://x/err'], {
    marker: 'MARK',
    fetchImpl: async (url) => {
      if (url.endsWith('ok')) return { ok: true, status: 200, text: async () => 'hello MARK world' };
      if (url.endsWith('404')) return { ok: false, status: 404, text: async () => '' };
      throw new Error('boom');
    },
  });
  t('verify ok+marker', v[0].ok && v[0].hasMarker === true);
  t('verify 404 loud', v[1].ok === false && v[1].status === 404);
  t('verify error honest', v[2].ok === false && v[2].error.includes('boom'));

  // gitLastDates format guard
  const d = gitLastDates(dir, ['pulse.json'], () => '2026-10-18');
  t('dates parsed', d['pulse.json'] === '2026-10-18');
  const d2 = gitLastDates(dir, ['pulse.json'], () => '');
  t('dates empty → null', d2['pulse.json'] === null);

  rmSync(dir, { recursive: true, force: true });
  return { ok: results.every(r => r.pass), results };
}

if (process.argv[1] && process.argv[1].endsWith('ship.mjs') && process.argv.includes('--selftest')) {
  const r = await selftest();
  for (const x of r.results) console.log(`${x.pass ? 'PASS' : 'FAIL'} ${x.name}`);
  process.exit(r.ok ? 0 : 1);
}
