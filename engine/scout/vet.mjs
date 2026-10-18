/**
 * vet.mjs — ביקורת-אספקה [t12] — read-only vetting of candidate repos.
 * ═══════════════════════════════════════════════════════════════════════════
 * LAW (knowledge/LEARNING.md L2): study is API text-reads ONLY. We never clone,
 * run, install, or execute foreign code. We read: repo metadata, README head,
 * package.json, and ≤3 small root code files — everything passes through the
 * signals corpus before the repo earns a verdict.
 *
 *   SAFE_TO_STUDY    → clean; lesson extraction allowed
 *   STUDY_WITH_CARE  → warn-level signals; lesson allowed, flagged in receipt
 *   BLOCKED          → ANY critical signal; quarantined BY NAME, never studied
 */
import { scanText, scanPackageJson, verdictFromSignals, RED_FLAG_RE } from './signals.mjs';

const GH = 'https://api.github.com';

function ghHeaders(token) {
  const h = { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'user-agent': 'saos-scout' };
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

/** repo metadata via API (stars/license/age/fork/description) */
export async function fetchRepoMeta(owner, repo, token) {
  const r = await fetch(`${GH}/repos/${owner}/${repo}`, { headers: ghHeaders(token) });
  if (!r.ok) return { ok: false, status: r.status };
  const j = await r.json();
  return {
    ok: true,
    status: 200,
    meta: {
      stars: j.stargazers_count ?? 0,
      license: j.license?.spdx_id ?? null,
      createdAt: j.created_at ?? null,
      pushedAt: j.pushed_at ?? null,
      archived: !!j.archived,
      fork: !!j.fork,
      description: String(j.description ?? '').slice(0, 200),
      topics: Array.isArray(j.topics) ? j.topics.slice(0, 10) : [],
    },
  };
}

const CODE_EXTS = /\.(m?js|ts|py|sh|bat|ps1)$|^(Makefile|Dockerfile|justfile)$/i;

/** pick ≤max root files worth scanning (small text files only) */
function pickScanTargets(contents, max) {
  const files = (Array.isArray(contents) ? contents : []).filter(
    (f) => f.type === 'file' && f.size > 0 && f.size <= 65536 && (CODE_EXTS.test(f.name) || /^package\.json$/i.test(f.name)),
  );
  // package.json first, then most recently-relevant code files
  files.sort((a, b) => (/^package\.json$/i.test(b.name) ? 1 : 0) - (/^package\.json$/i.test(a.name) ? 1 : 0));
  return files.slice(0, max).map((f) => ({ name: f.name, url: f.download_url }));
}

/** fetch one file head (≤8KB) — text only */
async function fileHead(url, token, bytes = 8192) {
  const r = await fetch(url, { headers: { ...ghHeaders(token), Range: `bytes=0-${bytes - 1}` } });
  if (!r.ok && r.status !== 206) return null;
  return (await r.text()).slice(0, bytes);
}

/**
 * vetCandidate({owner, repo}, token) →
 * {owner, repo, verdict, reason, signals[], redFlags, meta|null, scannedFiles[]}
 */
export async function vetCandidate(c, token, { maxFiles = 3 } = {}) {
  const out = { owner: c.owner, repo: c.repo, signals: [], redFlags: 0, meta: null, scannedFiles: [], verdict: 'BLOCKED', reason: 'unvetted' };
  const meta = await fetchRepoMeta(c.owner, c.repo, token);
  if (!meta.ok) { out.reason = `repo-meta-${meta.status}`; out.verdict = meta.status === 404 ? 'GONE' : 'UNREACHABLE'; return out; }
  out.meta = meta.meta;
  // name/description bait
  const baitText = `${c.repo} ${c.ctx ?? ''} ${out.meta.description}`;
  if (RED_FLAG_RE.test(baitText)) out.redFlags = 1;
  // README head + root files
  const readme = await (async () => {
    const r = await fetch(`${GH}/repos/${c.owner}/${c.repo}/readme`, { headers: { ...ghHeaders(token, ), Accept: 'application/vnd.github.raw+json' } });
    if (!r.ok) return null;
    return (await r.text()).slice(0, 8192);
  })();
  if (readme) { out.scannedFiles.push('README'); out.signals.push(...scanText(readme)); }
  const contentsRes = await fetch(`${GH}/repos/${c.owner}/${c.repo}/contents/`, { headers: ghHeaders(token) });
  if (contentsRes.ok) {
    const targets = pickScanTargets(await contentsRes.json(), maxFiles);
    for (const f of targets) {
      const head = await fileHead(f.url, token);
      if (head == null) continue;
      out.scannedFiles.push(f.name);
      if (/^package\.json$/i.test(f.name)) {
        try { out.signals.push(...scanPackageJson(JSON.parse(head))); } catch { out.signals.push(...scanText(head)); }
      } else {
        out.signals.push(...scanText(head));
      }
    }
  }
  const v = verdictFromSignals(out.signals, out.redFlags);
  out.verdict = v.verdict; out.reason = v.reason;
  out.signals = out.signals.slice(0, 12);
  return out;
}

/* ── selftest: zero network — pick + verdict law on fixtures ─────────────── */
export function selftest() {
  const contents = [
    { type: 'file', name: 'package.json', size: 300, download_url: 'u/pkg' },
    { type: 'file', name: 'index.js', size: 2000, download_url: 'u/idx' },
    { type: 'file', name: 'big.min.js', size: 5_000_000, download_url: 'u/big' },
    { type: 'file', name: 'logo.png', size: 900, download_url: 'u/png' },
    { type: 'dir', name: 'lib', size: 0, download_url: 'u/lib' },
    { type: 'file', name: 'run.py', size: 1200, download_url: 'u/py' },
    { type: 'file', name: 'empty.js', size: 0, download_url: 'u/e' },
  ];
  const picked = pickScanTargets(contents, 3);
  const names = picked.map((p) => p.name);
  if (names[0] !== 'package.json') throw new Error('package.json must be first');
  if (names.includes('big.min.js')) throw new Error('>64KB must be skipped');
  if (names.includes('logo.png')) throw new Error('binary must be skipped');
  if (names.includes('lib')) throw new Error('dir must be skipped');
  if (names.length !== 3) throw new Error(`cap-3 broken: ${names.length}`);
  // verdict law lives in signals.mjs (tested there) — here: import integrity
  if (typeof verdictFromSignals !== 'function' || typeof RED_FLAG_RE.test !== 'function') throw new Error('signal imports broken');
  console.log('[scout/vet] selftest: PASS (pick law: pkg-first, size-cap, binary-skip, cap-3; imports ok)');
  return 0;
}

const isMain = process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href;
if (isMain) process.exit(selftest());
