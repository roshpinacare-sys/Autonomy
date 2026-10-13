#!/usr/bin/env node
/**
 * SELFHOOD — עצמיות-הרשת · Autonomy · עצמאי לחלוטין מסנדבוקסים (Node 20, אפס-תלות).
 * -----------------------------------------------------------------------------
 * למה: הבעלים בונה ומעדכן כל-הזמן — והרשת לא-הייתה מודעת לזה, לא בודקת את-עצמה,
 * ולא מודעת ליכולות-הריבונות-האוטונומיות שלה. וגם: פניות-אל-המפעיל נערמו ללא-מענה.
 *
 * המחזור (כל-הרצה):
 *   1. DISCOVERY    — סריקת-כל-הריפו (פומבי+פרטי): חדשים/שינויים מאז-הזיכרון הקודם.
 *   2. CAPABILITIES — מפת-יכולות נמדדת: אילו-איברים באמת-רצו (הצלחות-7ימים),
 *                     פידים-חיים וגילם, אתרים 200, מצב-החישוב (פומבי/פרטי).
 *   3. CLAIMS       — פניות-אל-הריבונות (owner-claim מהאפליקציה + דוחות-סוכנים
 *                     מ-OWNER-CHANNEL) מקבלות הכרעה-אינטליגנטית: מוח-LLM
 *                     (fail-closed) + חוקי-אמת, ותשובה-מפורסמת-חזרה.
 *   4. COMMIT+VERIFY— דחיפה + קריאה-חזרה לכל-קובץ (blob-sha) · יציאה-רועשת-בכשל.
 *
 * חוקים: מדידה-בלבד (כל-מספר עם-מקור) · אפס-סודות-בפלטים (redact) ·
 *        המוח לא-מחליף-מדידה — הוא מנסח-הכרעה על-גבי-מדידה בלבד · כנות-מלאה.
 */
import { readFileSync } from 'node:fs';

const OWNER = 'roshpinacare-sys';
const REPO = 'Autonomy';
const BRANCH = 'main';
const DIR = 'state/selfhood';
const API = 'https://api.github.com';
const UA = { 'User-Agent': 'selfhood-organ', Accept: 'application/vnd.github+json' };
const PAT = (process.env.SBX_FLEET_PAT || process.env.GITHUB_TOKEN || '').trim();
const AI = (() => { try { return process.env.SBX_AI_CONFIG ? JSON.parse(process.env.SBX_AI_CONFIG) : null; } catch { return null; } })();
const now = () => new Date().toISOString();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function redact(s) {
  return String(s ?? '')
    .replace(/ghp_[A-Za-z0-9]{16,}/g, '[REDACTED]')
    .replace(/github_pat_[A-Za-z0-9_]{16,}/g, '[REDACTED]')
    .replace(/[A-Za-z0-9+/=]{96,}/g, '[REDACTED]');
}
function tryJson(t) { try { return JSON.parse(t); } catch { return null; } }

async function gh(path, opts = {}) {
  const res = await fetch(`${API}${path}`, {
    ...opts,
    headers: { ...UA, Authorization: `Bearer ${PAT}`, ...(opts.headers || {}) },
  });
  if (res.status === 409 || res.status >= 500) { await sleep(1500); return gh(path, opts); }
  const txt = await res.text();
  const j = txt ? tryJson(txt) : null;
  if (!res.ok) return { __err: res.status, ...(j ? { j } : {}) };
  return j;
}

async function rawRead(repo, path, ref = BRANCH) {
  const res = await fetch(`${API}/repos/${OWNER}/${repo}/contents/${path}?ref=${ref}`, {
    headers: { ...UA, Authorization: `Bearer ${PAT}`, Accept: 'application/vnd.github.raw' },
  });
  if (!res.ok) return null;
  return res.text();
}

/** דחיפת-קובץ עם sha-cache + קריאה-חזרה; מחזיר {ok, sha} */
async function putVerified(repo, path, content, message) {
  let head = await gh(`/repos/${OWNER}/${repo}/contents/${path}?ref=${BRANCH}`);
  let sha = head && !head.__err ? head.sha : undefined;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const body = { message, content: Buffer.from(content, 'utf8').toString('base64'), branch: BRANCH, ...(sha ? { sha } : {}) };
    const r = await gh(`/repos/${OWNER}/${repo}/contents/${path}`, { method: 'PUT', body: JSON.stringify(body) });
    if (r && r.content && r.content.sha) {
      const back = await rawRead(repo, path);
      if (back !== null && redact(back) === redact(content)) return { ok: true, sha: r.content.sha };
    }
    if (r && r.__err === 409) {
      head = await gh(`/repos/${OWNER}/${repo}/contents/${path}?ref=${BRANCH}`);
      sha = head && !head.__err ? head.sha : undefined;
    }
    await sleep(1500 * attempt);
  }
  return { ok: false, path };
}

/* ────────────────────────── 1. DISCOVERY ────────────────────────── */
async function listRepos() {
  const out = []; let page = 1;
  while (true) {
    const rs = await gh(`/user/repos?per_page=100&page=${page}&sort=pushed`);
    if (!Array.isArray(rs)) break;
    out.push(...rs.map((r) => ({ name: r.name, private: r.private, pushedAt: r.pushed_at, desc: redact(r.description || '') })));
    if (rs.length < 100) break; page++;
  }
  return out;
}
async function repoSignature(repo, branch) {
  const tree = await gh(`/repos/${OWNER}/${repo}/git/trees/${branch}`);
  const wfs = await gh(`/repos/${OWNER}/${repo}/actions/workflows?per_page=100`);
  const topBlobs = tree && tree.tree ? tree.tree.filter((t) => t.type === 'blob').map((t) => t.path).sort() : [];
  const wf = wfs && wfs.workflows ? wfs.workflows.map((w) => `${w.name}:${w.state}`).sort() : [];
  return { topBlobs, topHash: tree && tree.sha ? tree.sha.slice(0, 12) : null, workflows: wf };
}

async function discovery(memory) {
  const repos = await listRepos();
  const discoveries = [];
  const newMemory = { schema: 'selfhood.memory/1', updatedAt: now(), repos: {} };
  for (const r of repos) {
    const branch = 'main';
    let sig = { topBlobs: [], topHash: null, workflows: [] };
    try { sig = await repoSignature(r.name, branch); } catch { /* ריפו-ריק — כנות */ }
    const prev = memory.repos?.[r.name];
    const entry = { pushedAt: r.pushedAt, topHash: sig.topHash, workflows: sig.workflows, topBlobs: sig.topBlobs.slice(0, 40), desc: r.desc };
    newMemory.repos[r.name] = entry;
    if (!prev) {
      discoveries.push({ kind: 'repo-new', repo: r.name, at: r.pushedAt, note: `ריפו-${r.private ? 'פרטי' : 'פומבי'} באחוזה · ${sig.topBlobs.length} קבצים-עליונים · ${sig.workflows.length} איברי-חישוב` });
    } else {
      const prevWf = new Set(prev.workflows || []);
      for (const w of sig.workflows) if (!prevWf.has(w)) discoveries.push({ kind: 'workflow-changed', repo: r.name, at: r.pushedAt, note: `איבר-חישוב השתנה/נוסף: ${w}` });
      if (prev.topHash && sig.topHash && prev.topHash !== sig.topHash) discoveries.push({ kind: 'files-changed', repo: r.name, at: r.pushedAt, note: `קבצי-על חדשים/שונים (${(prev.topBlobs || []).length}→${sig.topBlobs.length} עליונים)` });
      if (r.desc && r.desc !== prev.desc) discoveries.push({ kind: 'desc-changed', repo: r.name, at: r.pushedAt, note: `תיאור עודכן: ${r.desc}` });
    }
  }
  for (const name of Object.keys(memory.repos || {})) {
    if (!newMemory.repos[name]) discoveries.push({ kind: 'repo-gone', repo: name, at: now(), note: 'ריפו-נעלם מהאחוזה (נמחק/הופך)' });
  }
  return { repos, discoveries, newMemory };
}

/* ────────────────────────── 2. CAPABILITIES ────────────────────────── */
const FEEDS = [
  ['Domain', 'office/world-state.json', 'משרד-חי'],
  ['Autonomy', 'state/network-state.json', 'פעימת-ריבונות'],
  ['Autonomy', 'ops/flow/flow-map.json', 'מפת-זרימה'],
  ['ops-intake', 'ops/QUEUE.json', 'תור-עבודה'],
  ['ops-forge', 'ops/RECEIPTS.jsonl', 'קבלות-ביצוע'],
  ['saos-dex', 'grids/state/state.json', 'גריד-DEX'],
  ['saos-dex', 'db/dex-metrics.json', 'מדדי-DEX'],
  ['Pulse', 'public/pulse.json', 'דופק-ציבורי'],
  ['GridWatch', 'public/fleet-health.json', 'בריאות-צי'],
];
const SITES = [
  'https://roshpinacare-sys.github.io/',
  'https://roshpinacare-sys.github.io/Domain/',
  'https://roshpinacare-sys.github.io/GridWatch/',
  'https://roshpinacare-sys.github.io/ops-forge/',
  'https://roshpinacare-sys.github.io/FleetHQ/',
];
async function headStatus(url) {
  try {
    const c = new AbortController(); const t = setTimeout(() => c.abort(), 8000);
    const res = await fetch(url, { method: 'GET', signal: c.signal, headers: { 'User-Agent': 'selfhood-organ' } });
    clearTimeout(t); return res.status;
  } catch { return 0; }
}
async function capabilities(repos) {
  const since = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString().slice(0, 10);
  const organs = [];
  for (const r of repos) {
    const runs = await gh(`/repos/${OWNER}/${r.name}/actions/runs?per_page=40&created=>${since}`);
    if (!runs || !runs.workflow_runs) continue;
    const byName = {};
    for (const run of runs.workflow_runs) {
      const b = (byName[run.name] ||= { success: 0, failure: 0, lastSuccess: null, lastRun: null });
      b.lastRun = b.lastRun || run.created_at;
      if (run.conclusion === 'success') { b.success++; b.lastSuccess = b.lastSuccess || run.created_at; }
      if (run.conclusion === 'failure') b.failure++;
    }
    for (const [name, b] of Object.entries(byName)) {
      const ageH = b.lastSuccess ? ((Date.now() - Date.parse(b.lastSuccess)) / 3600000) : null;
      organs.push({ repo: r.name, workflow: name, success7d: b.success, failure7d: b.failure, lastSuccess: b.lastSuccess, lastSuccessAgeH: ageH === null ? null : Math.round(ageH * 10) / 10, private: r.private });
    }
  }
  organs.sort((a, b) => (b.lastSuccess || '').localeCompare(a.lastSuccess || ''));
  const feeds = [];
  for (const [repo, path, label] of FEEDS) {
    const txt = await rawRead(repo, path);
    let ageH = null; let stamp = null;
    if (txt) {
      const j = tryJson(txt);
      const t = j ? (j.generatedAt || j.updatedAt || j.at || j.savedAt || (j.keeper && j.keeper.lastTick)) : null;
      if (t) { stamp = t; ageH = Math.round(((Date.now() - Date.parse(t)) / 3600000) * 10) / 10; }
    }
    feeds.push({ repo, path, label, alive: !!txt, stamp, ageH });
  }
  const sites = [];
  for (const u of SITES) sites.push({ url: u, status: await headStatus(u) });
  const activePrivate = [];
  for (const r of repos.filter((x) => x.private)) {
    const wfs = await gh(`/repos/${OWNER}/${r.name}/actions/workflows?per_page=100`);
    if (wfs && wfs.workflows) for (const w of wfs.workflows) if (w.state === 'active') activePrivate.push(`${r.name}/${w.name}`);
  }
  return { organs: organs.slice(0, 80), feeds, sites, compute: { activePrivateWorkflows: activePrivate, publicOrgans: organs.filter((o) => !o.private).length }, measuredAt: now() };
}

/* ────────────────────────── 3. BRAIN + CLAIMS ────────────────────────── */
const SYSTEM_PROMPT = [
  'אתה המוח-המנסח של ריבונות אוטונומית (Autonomy) של האחוזה roshpinacare-sys.',
  'חוקים בלתי-נפסעים:',
  '1. ההכרעה נשענת רק על המדידות שבהקשר — אסור להמציא מספרים או להניח דברים שלא נמדדו.',
  '2. כנות-מלאה: אין-מידע מספיק → אומרים זאת במפורש ומציעים איזו-מדידה תכריע.',
  '3. אפס-סודות, אפס-מפתחות, אפס-שמות-פרטיים-של-אנשים בתשובה.',
  '4. הריבונות היא המפעיל: פנייה שהופנתה אל-המפעיל מגיעה אליך — עליך להכריע או לסמן בדיוק מה-חסר-להכרעה.',
  '5. מבנה-תשובה חובה (JSON בלבד, ללא טקסט סביב):',
  '{"verdictHe":"...","stepsHe":["..."],"confidence":"high|medium|low","needMore":true|false}',
].join('\n');

async function brain(userContent) {
  if (!AI || !AI.baseUrl || !AI.apiKey) return { ok: false, why: 'no-config' };
  const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 60000);
  try {
    const res = await fetch(`${AI.baseUrl}/chat/completions`, {
      method: 'POST', signal: ctrl.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AI.apiKey}`,
        'X-Z-AI-From': 'Z',
        ...(AI.chatId ? { 'X-Chat-Id': AI.chatId } : {}),
        ...(AI.userId ? { 'X-User-Id': AI.userId } : {}),
        ...(AI.token ? { 'X-Token': AI.token } : {}),
      },
      body: JSON.stringify({ messages: [{ role: 'system', content: SYSTEM_PROMPT }, { role: 'user', content: redact(userContent) }], thinking: { type: 'disabled' } }),
    });
    clearTimeout(t);
    if (!res.ok) return { ok: false, why: `http-${res.status}` };
    const j = await res.json();
    const txt = j?.choices?.[0]?.message?.content ?? '';
    const m = String(txt).match(/\{[\s\S]*\}/);
    const v = m ? tryJson(m[0]) : null;
    if (!v || !v.verdictHe) return { ok: false, why: 'unparseable' };
    return { ok: true, verdict: v };
  } catch (e) { clearTimeout(t); return { ok: false, why: redact(String(e?.message || e)).slice(0, 120) }; }
}

function contextFor(cap, journalTail) {
  const aliveFeeds = cap.feeds.filter((f) => f.alive).map((f) => `${f.label}(${f.repo}): גיל ${f.ageH ?? '?'}h`).join(' · ');
  const deadFeeds = cap.feeds.filter((f) => !f.alive).map((f) => f.label).join(', ');
  const topOrgans = cap.organs.slice(0, 12).map((o) => `${o.repo}/${o.workflow} ✓${o.success7d}✗${o.failure7d}`).join(' · ');
  return [
    '=== הקשר נמדד (עדכני להרצה זו) ===',
    `פידים-חיים: ${aliveFeeds || 'אין'}`,
    `פידים-לא-זמינים: ${deadFeeds || 'אין'}`,
    `איברים-פעילים (7 ימים): ${topOrgans}`,
    `אתרים: ${cap.sites.map((s) => `${s.url.replace('https://roshpinacare-sys.github.io', '')}=${s.status}`).join(' ')}`,
    `חישוב-פרטי-פעיל (אמור-להיות-0): ${cap.compute.activePrivateWorkflows.length}`,
    `יומן-גילויים אחרון: ${journalTail.join(' | ')}`,
  ].join('\n');
}

async function loadJsonl(repo, path, cap = 400) {
  const txt = await rawRead(repo, path);
  if (!txt) return { lines: [], all: 0 };
  const lines = txt.trim() ? txt.trim().split('\n').filter(Boolean) : [];
  return { lines: lines.slice(-cap), all: lines.length };
}

async function processClaims(cap, journalTail) {
  const processed = await loadJsonl(REPO, `${DIR}/claims-processed.jsonl`);
  const seen = new Set(processed.lines.map((l) => { const j = tryJson(l); return j ? j.key : null; }).filter(Boolean));
  const local = await loadJsonl(REPO, `${DIR}/claims.jsonl`, 50);
  const ctx = contextFor(cap, journalTail);
  const out = [];
  const replies = [];

  // מקור-א — פניות-מקומיות (האפליקציה של-הבעלים / כל-סוכן שפותח-PR)
  for (const l of local.lines) {
    const c = tryJson(l); if (!c || !c.text) continue;
    const key = `claim:${(c.at || '') + '|' + String(c.text).slice(0, 60)}`;
    if (seen.has(key)) continue;
    const b = await brain(`${ctx}\n\n=== פנייה (${c.role || 'לא-מזוהה'} · ${c.at}) ===\n${redact(c.text)}`);
    out.push({ key, at: now(), claimAt: c.at, from: c.role || c.source || 'unknown', claim: redact(String(c.text)).slice(0, 400), brainUsed: b.ok, brainWhy: b.ok ? null : b.why, verdict: b.ok ? { verdictHe: redact(b.verdict.verdictHe), stepsHe: (b.verdict.stepsHe || []).map(redact), confidence: b.verdict.confidence, needMore: !!b.verdict.needMore } : { verdictHe: 'OBSERVING — המוח לא-היה-זמין (' + b.why + '); הפנייה נרשמה מדודה וממתינה-למחזור-עם-מוח.', stepsHe: [], confidence: 'low', needMore: true }, evidence: { feedsAlive: cap.feeds.filter((f) => f.alive).length, sitesOk: cap.sites.filter((s) => s.status === 200).length + '/' + cap.sites.length } });
    replies.push({ replyTo: key, text: out[out.length - 1].verdict.verdictHe });
  }

  // מקור-ב — דוחות-סוכנים בערוץ-המפעיל (פניות-אל-המפעיל → מנותבות-לריבונות)
  const inboxTxt = await rawRead('Sandbox', 'ops/sovereign/OWNER-CHANNEL/inbox.jsonl');
  if (inboxTxt) {
    const lines = inboxTxt.trim().split('\n').filter(Boolean).slice(-8);
    for (const l of lines) {
      const e = tryJson(l); if (!e) continue;
      if (e.role === 'autonomy') continue; // תשובה-שלנו — לא-פנייה
      const key = `owner-channel:${e.at}|${String(e.source || '')}`;
      if (seen.has(key)) continue;
      const b = await brain(`${ctx}\n\n=== דוח/פנייה מ-${e.source || 'סוכן'} (${e.at}) ===\n${redact(JSON.stringify(e).slice(0, 900))}`);
      out.push({ key, at: now(), claimAt: e.at, from: e.source || 'agent', claim: redact(String(e.text || JSON.stringify(e).slice(0, 300))).slice(0, 400), brainUsed: b.ok, brainWhy: b.ok ? null : b.why, verdict: b.ok ? { verdictHe: redact(b.verdict.verdictHe), stepsHe: (b.verdict.stepsHe || []).map(redact), confidence: b.verdict.confidence, needMore: !!b.verdict.needMore } : { verdictHe: 'OBSERVING — המוח לא-היה-זמין (' + b.why + '); הדוח נרשם מדוד.', stepsHe: [], confidence: 'low', needMore: true }, evidence: { source: 'OWNER-CHANNEL' } });
      replies.push({ replyTo: key, text: out[out.length - 1].verdict.verdictHe });
    }
    // תשובה-חזרה לערוץ (dedup לפי replyTo)
    if (replies.length) {
      const newLines = replies.map((r) => JSON.stringify({ at: now(), role: 'autonomy', source: 'selfhood', replyTo: r.replyTo, text: redact(r.text).slice(0, 500) }));
      await putVerified('Sandbox', 'ops/sovereign/OWNER-CHANNEL/inbox.jsonl', inboxTxt.trimEnd() + '\n' + newLines.join('\n') + '\n', `selfhood: ${replies.length} תשובות-ריבונות לפניות (role autonomy, dedup)`);
    }
  }
  return { processed: [...processed.lines, ...out.map((o) => JSON.stringify(o))].slice(-200), newCount: out.length, replies: replies.length };
}

/* ────────────────────────── MAIN ────────────────────────── */
async function main() {
  const t0 = Date.now();
  if (!PAT) { console.error('FATAL: אין-אמצעי-קריאה (SBX_FLEET_PAT/GITHUB_TOKEN)'); process.exit(1); }
  const memTxt = await rawRead(REPO, `${DIR}/memory.json`);
  const memory = (memTxt && tryJson(memTxt)) || { schema: 'selfhood.memory/1', repos: {} };
  const prevJournal = await loadJsonl(REPO, `${DIR}/journal.jsonl`, 400);

  console.log('[selfhood] 1/4 DISCOVERY…');
  const { repos, discoveries, newMemory } = await discovery(memory);
  console.log(`  repos=${repos.length} discoveries=${discoveries.length}`);

  console.log('[selfhood] 2/4 CAPABILITIES…');
  const cap = await capabilities(repos);
  console.log(`  organs=${cap.organs.length} feedsAlive=${cap.feeds.filter((f) => f.alive).length}/${cap.feeds.length} sitesOk=${cap.sites.filter((s) => s.status === 200).length}/${cap.sites.length}`);

  console.log('[selfhood] 3/4 CLAIMS…');
  const journalNewLines = discoveries.slice(-40).map((d) => JSON.stringify({ at: now(), ...d }));
  const journal = [...prevJournal.lines, ...journalNewLines].slice(-400);
  const claims = await processClaims(cap, journal.slice(-6).map((l) => { const j = tryJson(l); return j ? `${j.kind}:${j.repo}` : '?'; }));
  console.log(`  processed=${claims.newCount} replies=${claims.replies} brainConfig=${AI ? 'on' : 'off'}`);

  console.log('[selfhood] 4/4 COMMIT+VERIFY…');
  const results = {};
  results['memory.json'] = await putVerified(REPO, `${DIR}/memory.json`, JSON.stringify(newMemory, null, 1), 'selfhood: זיכרון-גילוי עודכן (מדוד)');
  results['journal.jsonl'] = await putVerified(REPO, `${DIR}/journal.jsonl`, journal.join('\n') + '\n', `selfhood: יומן-מודעות +${journalNewLines.length} (מדוד)`);
  const capsObj = { schema: 'selfhood.capabilities/1', ...cap };
  results['capabilities.json'] = await putVerified(REPO, `${DIR}/capabilities.json`, JSON.stringify(capsObj, null, 1), 'selfhood: מפת-יכולות נמדדה');
  const md = [
    `# מפת-יכולות הרשת — נמדד ${now()}`,
    '',
    '> כל-מספר כאן נמדד בהרצה זו מול הגיט והאתרים. אין-שאיפות — רק מציאות.',
    `> מחזור: DISCOVERY ${discoveries.length} גילויים · CLAIMS ${claims.newCount} הכרעות (מוח ${AI ? 'מחובר' : 'כבוי-fail-closed'})`,
    '',
    '## איברי-חישוב שרצו-בפועל (7 ימים, עיקריים)',
    ...cap.organs.slice(0, 20).map((o) => `- ${o.repo}/${o.workflow} — ✓${o.success7d} ✗${o.failure7d} · הצלחה-אחרונה לפני ${o.lastSuccessAgeH ?? '?'}h ${o.private ? '· פרטי' : ''}`),
    '',
    '## פידי-אמת חיים',
    ...cap.feeds.map((f) => `- ${f.label} (${f.repo}/${f.path}) — ${f.alive ? `חי · גיל ${f.ageH ?? '?'}h` : 'לא-זמין'}`),
    '',
    '## אתרים',
    ...cap.sites.map((s) => `- ${s.url} — HTTP ${s.status}`),
    '',
    '## חישוב',
    `- איברים-פומביים פעילים: ${cap.compute.publicOrgans}`,
    `- וורקפלו-פעילים בריפו-פרטי (אמור-להיות-0, חוק-עצירת-הדימום): ${cap.compute.activePrivateWorkflows.length}${cap.compute.activePrivateWorkflows.length ? ' — ' + cap.compute.activePrivateWorkflows.join(', ') : ''}`,
    '',
  ].join('\n');
  results['CAPABILITIES.md'] = await putVerified(REPO, `${DIR}/CAPABILITIES.md`, md, 'selfhood: מפת-יכולות (MD נמדד)');
  results['claims-processed.jsonl'] = await putVerified(REPO, `${DIR}/claims-processed.jsonl`, claims.processed.join('\n') + (claims.processed.length ? '\n' : ''), `selfhood: ${claims.newCount} פניות-הוכרעו (כנות+מדידה)`);
  const selfCheck = { schema: 'selfhood.self-check/1', at: now(), durationMs: Date.now() - t0, commits: results, allVerified: Object.values(results).every((r) => r.ok), discoveries: discoveries.length, claimsProcessed: claims.newCount, brain: AI ? 'wired' : 'off' };
  results['self-check.json'] = await putVerified(REPO, `${DIR}/self-check.json`, JSON.stringify(selfCheck, null, 1), 'selfhood: בדיקה-עצמית (קריאה-חזרה לכל-קובץ)');
  const failed = Object.entries(results).filter(([, r]) => !r.ok);
  if (failed.length) { console.error('VERIFY FAILED:', failed.map(([k]) => k).join(',')); process.exit(1); }
  console.log(`[selfhood] OK · ${Date.now() - t0}ms · כל-${Object.keys(results).length}-הקבצים נקראו-חזרה ואומתו`);
}
main().catch((e) => { console.error('SELFHOOD FATAL:', redact(String(e && e.stack || e)).slice(0, 400)); process.exit(1); });
