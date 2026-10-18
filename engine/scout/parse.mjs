/**
 * parse.mjs — מחלץ-מועמדים [t12] — pure extraction of GitHub repo candidates
 * from any fetched source text (HTML or plain). Zero network. No assumptions
 * about site structure beyond "it contains github.com/owner/repo links".
 */
const REPO_RE = /github\.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+?)(?=[$~#@^&*:;<>,!?)"'\s/]|$)/g;
const REL_RE = /href="\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+?)"/g;

/** owners/paths that are never candidate repos */
const SKIP_OWNERS = new Set(['github', 'features', 'topics', 'collections', 'trending', 'about', 'pricing', 'security', 'customer-stories', 'readme', 'apps', 'marketplace', 'sponsors', 'site', 'assets', 'cdn-cgi', 'docs.github', 'support.github',
  // github.com site paths seen in real pages (t12 live-run finding)
  'cmc_internal', '_private', 'get-started', 'enterprise', 'solutions', 'resources', 'events', 'education', 'open-source', 'trust-center', 'contact', 'explore', 'orgs', 'org', 'users', 'notifications', 'settings', 'login', 'join', 'search', 'pulls', 'issues', 'codespaces', 'gitflow', 'site-beta']);
const JUNK_REPO = /^(\.github|\.git|assets|docs|about|pricing|security|customer-stories|features|readme|api|browser|accessibility|startups|industry|use-case|articles|events|whitepapers|executive-insights|newsletter|compare|contact|sales)$/i;

/** normalize a raw repo slug pair → clean {owner, repo} or null */
export function normalizeRepo(owner, repo) {
  const o = String(owner || '').replace(/[^A-Za-z0-9_.-]/g, '');
  let r = String(repo || '').replace(/\.(git|md)$/i, '').replace(/[^A-Za-z0-9_.-]/g, '');
  if (!o || !r || SKIP_OWNERS.has(o.toLowerCase()) || JUNK_REPO.test(r)) return null;
  return { owner: o, repo: r };
}

/**
 * extractRepos(text) → [{owner, repo, ctx}] — ctx = up-to-160-char window before
 * the link (title/description context, used later for interest-mapping).
 * Deduped, order-stable.
 */
export function extractRepos(text) {
  const t = String(text ?? '');
  const out = [];
  const seen = new Set();
  const push = (owner, repo, idx) => {
    const norm = normalizeRepo(owner, repo);
    if (!norm) return;
    const key = `${norm.owner}/${norm.repo}`.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    const ctxStart = Math.max(0, idx - 160);
    out.push({ ...norm, ctx: t.slice(ctxStart, idx).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(-140) });
  };
  // pass 1: relative hrefs (how trending actually lists repos)
  REL_RE.lastIndex = 0;
  let m;
  while ((m = REL_RE.exec(t)) !== null) push(m[1], m[2], m.index);
  // pass 2: absolute github.com/owner/repo occurrences
  REPO_RE.lastIndex = 0;
  while ((m = REPO_RE.exec(t)) !== null) push(m[1], m[2], m.index);
  return out;
}

/* ── selftest: zero network ──────────────────────────────────────────────── */
export function selftest() {
  const html = `
    <a href="https://github.com/vercel/next.js">Next.js</a>
    <p>Check <a href="https://github.com/vercel/next.js">duplicate</a>
    and <a href="https://github.com/mrdoob/three.js/">three.js</a>
    plus <a href="https://github.com/github/docs">github docs</a> (skip)
    and <a href="https://github.com/MaxLiu22/Motion2MixamoRig/blob/main/README.md">blob link</a>
    and junk <a href="https://github.com/someone/.github">.github</a>
    and decoy <a href="https://github.com/features/actions">features</a>`;
  const rs = extractRepos(html);
  const keys = rs.map((r) => `${r.owner}/${r.repo}`);
  if (!keys.includes('vercel/next.js')) throw new Error('next.js missed');
  if (!keys.includes('mrdoob/three.js')) throw new Error('three.js (trailing slash) missed');
  if (!keys.includes('MaxLiu22/Motion2MixamoRig')) throw new Error('blob-link repo missed');
  if (keys.includes('github/docs')) throw new Error('skip-owner leaked');
  if (keys.includes('someone/.github')) throw new Error('junk repo leaked');
  if (keys.includes('features/actions')) throw new Error('features leaked');
  if (keys.length !== keys.filter((k, i) => keys.indexOf(k) === i).length) throw new Error('dupes leaked');
  const mix = rs.find((r) => r.owner === 'MaxLiu22');
  if (!mix.ctx || mix.ctx.length < 10) throw new Error('context window empty');
  // t12 live finding: relative hrefs are the primary form on trending pages
  const rel = extractRepos('<h2><a href="/fastapi/full-stack-fastapi-template">repo</a></h2><a href="/cmc_internal/api">x</a><a href="/get-started/accessibility">y</a>');
  const relKeys = rel.map((r) => `${r.owner}/${r.repo}`);
  if (!relKeys.includes('fastapi/full-stack-fastapi-template')) throw new Error('relative href missed');
  if (relKeys.some((k) => /cmc_internal|get-started/.test(k))) throw new Error('site-path noise leaked');
  // normalize edge cases
  if (normalizeRepo('ok', 'repo.git').repo !== 'repo') throw new Error('.git strip');
  if (normalizeRepo('', 'x') !== null) throw new Error('empty owner');
  console.log('[scout/parse] selftest: PASS (extract, dedupe, skip-owners, junk, blob-links, ctx, relative-hrefs, site-noise, normalize)');
  return 0;
}

const isMain = process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href;
if (isMain) process.exit(selftest());
