#!/usr/bin/env node
// minutes-census — keyless posture check of the PUBLIC compute fleet.
// Why: private repos have no Actions minutes (quota-dead since 2026-10-14); all
// scheduled fleet compute now lives on public repos (free minutes). This task
// watches that plane: for every public repo — last run status/conclusion.
// Zero secrets, zero deps, zero writes. Unauthenticated GitHub API (60 req/h)
// — lean by design: 1 call per repo, 1 for the repo list. Receipt is the report.
const OWNER = 'roshpinacare-sys';
const H = { Accept: 'application/vnd.github+json', 'User-Agent': 'saos-minutes-census' };

async function gh(path) {
  const r = await fetch(`https://api.github.com${path}`, { headers: H });
  if (r.status === 403 || r.status === 429) throw new Error(`github-rate-limited ${path}`);
  if (!r.ok) throw new Error(`github ${r.status} ${path}`);
  return r.json();
}

async function pageAll(path) {
  let out = [], page = 1;
  for (; page <= 3; page++) {
    const sep = path.includes('?') ? '&' : '?';
    const d = await gh(`${path}${sep}per_page=100&page=${page}`);
    out = out.concat(Array.isArray(d) ? d : []);
    if (!Array.isArray(d) || d.length < 100) break;
  }
  return out;
}

const repos = await pageAll(`/users/${OWNER}/repos`); // unauthenticated = public only
const fleet = [];
for (const r of repos.sort((a, b) => a.name.localeCompare(b.name))) {
  try {
    const d = await gh(`/repos/${OWNER}/${r.name}/actions/runs?per_page=1`);
    const last = d.workflow_runs?.[0] ?? null;
    fleet.push({ repo: r.name, visibility: 'public', totalRuns: d.total_count ?? null,
      lastRun: last ? { status: last.status, conclusion: last.conclusion, event: last.event, created: last.created_at } : null });
  } catch (e) {
    fleet.push({ repo: r.name, visibility: 'public', error: String(e.message).slice(0, 120) });
  }
}
const healthy = fleet.filter(x => x.lastRun && (x.lastRun.conclusion === 'success' || x.lastRun.status === 'in_progress' || x.lastRun.status === 'queued'));
const unhealthy = fleet.filter(x => x.lastRun && x.lastRun.conclusion && x.lastRun.conclusion !== 'success' && x.lastRun.conclusion !== 'skipped' && x.lastRun.conclusion !== 'neutral');
const silent = fleet.filter(x => !x.lastRun);
const errored = fleet.filter(x => x.error);
const report = {
  measuredAt: new Date().toISOString(),
  purpose: 'public-compute-fleet posture (the plane that replaced private minutes)',
  publicRepos: fleet.length,
  summary: { healthy: healthy.length, unhealthy: unhealthy.length, silent: silent.length, errored: errored.length },
  fleet,
};
console.log(JSON.stringify(report, null, 2));
if (errored.length === fleet.length && fleet.length > 0) process.exit(1); // total failure only
