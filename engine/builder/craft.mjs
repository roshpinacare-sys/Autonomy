#!/usr/bin/env node
/**
 * builder/craft.mjs — איבר-הבונה · יוצר-המוצר [t13 · owner order:
 * "אני רוצה בניה שיפור תמיד ולא רק בדיקות · אין מוצר אמיתי ·
 * צריך תוצאות אמיתיות טובות איכותיות"]
 * ═══════════════════════════════════════════════════════════════════════════
 * CRAFT PHASE: turns audit tasks into REAL product deltas — pure functions
 * returning {path, mode, content, anchor?}. Every generator renders honest
 * data (facts snapshot from git receipts) and degrades to "אין-מדידה" —
 * never invents a number. Collision law: only NEW files + marker-scoped
 * sections in shared files — 8 sibling agents work in parallel.
 *
 * Selftest: zero-network, zero-git, pure.
 */
import { join } from 'node:path';

export const PULSE_START = '<!--builder:pulse v1-->';
export const PULSE_END = '<!--/builder:pulse-->';

const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const dash = v => (v === null || v === undefined || v === '' ? 'אין-מדידה' : v);

/** human age string from ISO; null-safe, honest */
export function ageLabel(iso, now = new Date()) {
  if (!iso) return 'לא-נמדד';
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return 'לא-נמדד';
  const mins = Math.max(0, Math.round((now.getTime() - t) / 60000));
  if (mins < 60) return `${mins} דק׳`;
  const hrs = Math.round(mins / 60);
  if (hrs < 48) return `${hrs} שע׳`;
  return `${Math.round(hrs / 24)} ימ׳`;
}

/** the live sovereignty pulse strip — injected between markers in index.html */
export function pulseHtml(facts, now = new Date()) {
  const cards = [
    {
      l: 'דופק-האמת · פסק-הדין האחרון של המאמת',
      v: dash(facts?.verifier?.overall),
      t: `measured · ${ageLabel(facts?.verifier?.at, now)}`,
    },
    {
      l: 'דלק-הפעלה של השרשרת · SP מדוד בשירות הארכיטקטורה',
      v: facts?.treasury?.acct00sp != null
        ? `${dash(facts.treasury.health)} · ${Math.round(facts.treasury.acct00sp)} SP`
        : dash(facts?.treasury?.health),
      t: `measured · ${ageLabel(facts?.treasury?.at, now)}`,
    },
    {
      l: 'העורקים · וורקפלואו חי מול כבוי',
      v: facts?.selfHeal?.workflowsActive != null
        ? `${facts.selfHeal.workflowsActive} חי${facts?.selfHeal?.workflowsDisabled ? ` · ${facts.selfHeal.workflowsDisabled} כבוי` : ''}`
        : 'אין-מדידה',
      t: `measured · ${ageLabel(facts?.selfHeal?.at, now)}`,
    },
    {
      l: 'הידע · רשומות-למידה נקיות-חדר',
      v: facts?.scout?.entries != null ? `${facts.scout.entries} רשומות` : dash(facts?.scout?.ok),
      t: `measured · ${ageLabel(facts?.scout?.at, now)}`,
    },
    {
      l: 'העולם החי · גרסת-office3d מתפתחת',
      v: facts?.world?.version != null ? `v${facts.world.version}` : 'אין-מדידה',
      t: `measured · ${ageLabel(facts?.world?.at, now)}`,
    },
    {
      l: 'הצי · מדידת-צי אחרונה',
      v: facts?.fleet?.total != null ? `${facts.fleet.total} חשבונות` : dash(facts?.fleet?.ok),
      t: `measured · ${ageLabel(facts?.fleet?.at, now)}`,
    },
    {
      l: 'הקצב · דופק-הרשת העצמי (pacer)',
      v: facts?.pacer?.lastBeatChecked != null
        ? `${facts.pacer.lastBeatChecked} נבדקו${facts?.pacer?.lastBeatDispatched ? ` · ${facts.pacer.lastBeatDispatched} שוגרו` : ''}`
        : dash(facts?.pacer?.at),
      t: `measured · ${ageLabel(facts?.pacer?.lastBeatAt ?? facts?.pacer?.at, now)}`,
    },
  ];
  const card = c => `<div class="pcard"><div class="v num">${esc(c.v)}</div><div class="l">${esc(c.l)}</div><span class="t">${esc(c.t)}</span></div>`;
  return [
    PULSE_START,
    '  <!-- איבר-הבונה [artery-builder]: פס-דופק חי, נבנה-מחדש בכל ריצה מהקבלות בגיט — אסור-לערוך-ידנית בתוך המרקרים -->',
    `  <section class="wrap proof" aria-label="דופק-הריבונות החי" style="padding-top:0">`,
    `    <div class="proof-grid">`,
    ...cards.map(c => '    ' + card(c)),
    '    </div>',
    `    <p style="text-align:center;font-size:12px;color:var(--faint);margin-top:14px">פס-זה נבנה אוטונומית על-ידי איבר-הבונה בכל שעה עגולה מהקבלות בגיט · כל מספר מדידה-אמיתית עם גיל-מדידה · בלי מדידה כתוב "אין-מדידה" ולא המצאה · <a href="changelog.html" style="color:var(--fg)">יומן-הבנייה</a> · <a href="tools.html" style="color:var(--fg)">קטלוג-היכולות</a> · <a href="receipts.html" style="color:var(--fg)">פנקס-הקבלות</a></p>`,
    '  </section>',
    PULSE_END,
  ].join('\n');
}

/** replace or inject the marker-scoped section inside an HTML document */
export function injectSection(html, section) {
  const start = html.indexOf(PULSE_START);
  const end = html.indexOf(PULSE_END);
  if (start !== -1 && end !== -1 && end > start) {
    return html.slice(0, start) + section + html.slice(end + PULSE_END.length);
  }
  // first-time injection: before the surfaces anchor (stable landmark)
  const anchor = html.indexOf('<!-- ═══ surfaces ═══ -->');
  if (anchor === -1) return null; // refuse blind edits — honest failure
  return html.slice(0, anchor) + section + '\n\n  ' + html.slice(anchor);
}

/** docs/index.html — the missing entry into the docs forest */
export function docsIndexHtml(docFiles, now = new Date()) {
  const rows = docFiles
    .map(f => `<li><a href="${esc(f.href)}">${esc(f.title)}</a> — ${esc(f.desc || '')}</li>`)
    .join('\n      ');
  return `<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>מרכז-התיעוד · ריבונות SAOS</title>
<style>
  :root { --fg:#e8e6e1; --faint:#8a877f; --bg:#0d0e11; }
  body { background:var(--bg); color:var(--fg); font-family:system-ui,'Segoe UI',sans-serif; margin:0; padding:48px 20px; line-height:1.7; }
  main { max-width:820px; margin:0 auto; }
  h1 { font-size:28px; margin:0 0 6px; } h2 { font-size:20px; margin-top:34px; }
  .sub { color:var(--faint); font-size:13px; }
  ul { padding-inline-start:22px; } li { margin:7px 0; }
  a { color:#d8b46a; text-decoration:none; } a:hover { text-decoration:underline; }
  .card { background:#14151a; border:1px solid #26272e; border-radius:12px; padding:18px 22px; margin-top:22px; }
  footer { margin-top:44px; color:var(--faint); font-size:12px; text-align:center; }
</style>
</head>
<body>
<main>
  <h1>מרכז-התיעוד</h1>
  <p class="sub">נבנה אוטונומית על-ידי איבר-הבונה · ${esc(now.toISOString())} · ${docFiles.length} מסמכים חיים מהגיט</p>
  <div class="card">
    <h2 style="margin-top:0">מפת-המסמכים</h2>
    <ul>
      ${rows || '<li>אין-מדידה — לא נמצאו מסמכים</li>'}
    </ul>
  </div>
  <footer>איבר-הבונה · כל מסמך כאן נסרק מהעץ בזמן-בנייה · בלי המצאות</footer>
</main>
</body>
</html>
`;
}

/** changelog.html — the site's own evolution, rendered from git truth */
export function changelogHtml(commits, now = new Date()) {
  const byDay = new Map();
  for (const c of commits) {
    const day = (c.date || '').slice(0, 10);
    if (!byDay.has(day)) byDay.set(day, []);
    byDay.get(day).push(c);
  }
  const days = [...byDay.entries()].slice(0, 10);
  const dayBlock = ([day, list]) => `
    <section class="day">
      <h2>${esc(day)} <span class="n">${list.length} בניינים</span></h2>
      <ul>${list.map(c => `<li><code>${esc(c.sha)}</code> ${esc(c.msg)}</li>`).join('\n')}</ul>
    </section>`;
  return `<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>יומן-הבנייה · ריבונות SAOS</title>
<style>
  :root { --fg:#e8e6e1; --faint:#8a877f; --bg:#0d0e11; }
  body { background:var(--bg); color:var(--fg); font-family:system-ui,'Segoe UI',sans-serif; margin:0; padding:48px 20px; line-height:1.65; }
  main { max-width:900px; margin:0 auto; }
  h1 { font-size:28px; margin:0 0 6px; }
  .sub { color:var(--faint); font-size:13px; }
  .day { background:#14151a; border:1px solid #26272e; border-radius:12px; padding:16px 22px; margin-top:16px; }
  h2 { font-size:17px; margin:0 0 8px; } .n { color:var(--faint); font-size:12px; font-weight:400; }
  ul { list-style:none; padding:0; margin:0; } li { padding:3px 0; border-bottom:1px dashed #1f2027; font-size:13.5px; }
  li:last-child { border-bottom:none; }
  code { color:#d8b46a; font-size:12px; margin-inline-end:8px; }
  footer { margin-top:36px; color:var(--faint); font-size:12px; text-align:center; }
</style>
</head>
<body>
<main>
  <h1>יומן-הבנייה</h1>
  <p class="sub">האתר בונה את עצמו — כל ריצת איבר-הבונה נרשמת כאן מהגיט · עודכן ${esc(now.toISOString())}</p>
  ${days.map(dayBlock).join('\n') || '<p class="sub">אין-מדידה — עדיין לא נבנה</p>'}
  <footer>מיוצר אוטונומית מ-git log · אימת כאן שהריבונות באמת בונה ולא רק בודקת</footer>
</main>
</body>
</html>
`;
}

/**
 * receiptsLedgerHtml — פנקס-הקבלות [t15 · owner order: "שיפור שמישות של הכל"]:
 * the open-ledger page — every organ's latest receipt rendered human-readable.
 * State sovereignty in public: any citizen can audit who beat, when, and whether
 * it was honest. Data-driven from real receipts (latest.json per organ dir) — nothing invented.
 */
export function receiptsLedgerHtml(streams, now = new Date()) {
  const list = Array.isArray(streams) ? streams : [];
  const healthy = list.filter(s => s.status === 'ok').length;
  const stale = list.filter(s => s.status === 'defect').length;
  const missing = list.filter(s => s.status === 'missing').length;
  const rowCls = s => s.status === 'ok' ? 'ok' : s.status === 'defect' ? 'bad' : s.status === 'missing' ? 'faint' : 'warn';
  const statusHe = s => s.status === 'ok' ? 'תקין' : s.status === 'defect' ? 'פגם-מדוד' : s.status === 'noop' ? 'השהיה-כנה' : s.status === 'skipped' ? 'פעימה-שקטה' : s.status === 'missing' ? 'אין-מדידה' : s.status;
  const row = s => `<tr class="${rowCls(s)}"><td><code>${esc(s.organ)}</code></td><td>${esc(statusHe(s))}</td><td class="num">${esc(s.age ?? '—')}</td><td class="sub">${esc(s.at ?? '')}</td></tr>`;
  return `<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>פנקס-הקבלות · ריבונות SAOS</title>
<style>
  :root { --fg:#e8e6e1; --faint:#8a877f; --bg:#0d0e11; }
  body { background:var(--bg); color:var(--fg); font-family:system-ui,'Segoe UI',sans-serif; margin:0; padding:48px 20px; line-height:1.6; }
  main { max-width:940px; margin:0 auto; }
  h1 { font-size:28px; margin:0 0 6px; }
  .sub { color:var(--faint); font-size:13px; }
  .sum { display:flex; gap:18px; margin:18px 0; flex-wrap:wrap; }
  .sum div { background:#14151a; border:1px solid #26272e; border-radius:12px; padding:12px 20px; font-size:14px; }
  .sum b { font-size:20px; display:block; }
  table { width:100%; border-collapse:collapse; margin-top:14px; background:#101116; border:1px solid #26272e; border-radius:12px; overflow:hidden; }
  th { text-align:start; font-size:12px; color:var(--faint); padding:10px 14px; border-bottom:1px solid #26272e; }
  td { padding:9px 14px; border-bottom:1px dashed #1f2027; font-size:13.5px; }
  tr:last-child td { border-bottom:none; }
  td.num { font-variant-numeric:tabular-nums; }
  td.sub, .sub td { color:var(--faint); font-size:12px; }
  tr.ok td:nth-child(2) { color:#4cc38a; } tr.bad td:nth-child(2) { color:#e0564a; }
  tr.warn td:nth-child(2) { color:#d8b46a; } tr.faint td:nth-child(2) { color:var(--faint); }
  code { color:#d8b46a; font-size:12px; }
  footer { margin-top:36px; color:var(--faint); font-size:12px; text-align:center; }
</style>
</head>
<body>
<main>
  <h1>פנקס-הקבלות</h1>
  <p class="sub">כל איבר-מדידה בריבונות מדווח לכאן מהקבלות בגיט · נבנה אוטונומית בכל שעה · עודכן ${esc(now.toISOString())}</p>
  <div class="sum">
    <div><b>${healthy}</b>איברים-תקינים</div>
    <div><b>${stale}</b>פגמים-מדודים</div>
    <div><b>${missing}</b>בלי-מדידה</div>
    <div><b>${list.length}</b>זרמי-קבלה</div>
  </div>
  <table>
    <thead><tr><th>איבר</th><th>מצב-אחרון</th><th>גיל-מדידה</th><th>זמן-קבלה (UTC)</th></tr></thead>
    <tbody>
      ${list.map(row).join('\n      ') || '<tr><td colspan="4" class="sub">אין-מדידה — עדיין לא זרמו קבלות</td></tr>'}
    </tbody>
  </table>
  <footer>כל שורה נקראת מ-receipts/&lt;איבר&gt;/latest.json בזמן-בנייה · בלי מדידה כתוב "אין-מדידה" · פגם-מדוד לא מוסתר — כך נבנה אמון</footer>
</main>
<div id="agent9-truth-band"></div>
<script src="agent9-truth-band.js" defer></script>
</body>
</html>
`;
}

/** pulse.json — machine-readable snapshot for any consumer (console, agents) */
export function pulseJson(facts, audit, now = new Date()) {
  return JSON.stringify({
    schema: 'builder-pulse/1',
    at: now.toISOString(),
    builder: { organ: 'artery-builder', cadence: 'hourly', law: 'fail-honest, refs-only, marker-scoped' },
    facts,
    audit: {
      pages: audit?.pages ?? [],
      missing: audit?.missing ?? [],
      linksChecked: audit?.links?.checked ?? null,
      brokenCount: audit?.links?.brokenCount ?? null,
      backlog: (audit?.backlog ?? []).map(t => ({ id: t.id, priority: t.priority, why: t.why })),
    },
  }, null, 2) + '\n';
}

/** which tasks this craft generation executes (collision-safe set) */
export function executableTasks(backlog) {
  const ok = new Set(['PULSE_SNAPSHOT', 'REFRESH_PRODUCT_SURFACES', 'CREATE_DOCS_INDEX_HTML', 'CREATE_CHANGELOG_HTML', 'CREATE_PULSE_JSON', 'RECORD_BROKEN_LINKS', 'CREATE_TOOLS_CATALOG', 'CREATE_TOOLS_HTML', 'FIX_RELATIVE_LINKS']);
  return (backlog || []).filter(t => ok.has(t.id));
}

/**
 * toolsCatalogHtml — השמישות-כמוצר [t14 · owner order: "יש לנו מלא כלים
 * שאספנו... חשוב לשפר שמישות של הכל"]: the architecture's full capability
 * surface, human-readable, data-driven from real repo files — organs
 * (CHAINBUS), live receipts (who beat last), arteries (cron cadences),
 * learning entries (scout knowledge). Regenerated hourly by the builder.
 */
export function toolsCatalogHtml({ organs = [], knowledge = [], arteries = [], receiptSummary = [] }, now = new Date()) {
  const organRow = (o) => `<tr><td><code>${esc(o.name)}</code></td><td>${esc(o.desc)}</td><td class="${o.live ? 'ok' : 'warn'}">${esc(o.live ?? '—')}</td></tr>`;
  const artRow = (a) => `<tr><td><code>${esc(a.name)}</code></td><td>${esc(a.crons.join(' · ') || 'dispatch-only')}</td></tr>`;
  const knowRow = (k) => `<tr><td><a href="${esc(k.url)}" target="_blank" rel="noopener">${esc(k.repo)}</a></td><td>${esc(k.verdict)}</td><td>${esc(k.summary)}</td></tr>`;
  const recRow = (r) => `<li><code>${esc(r.organ)}</code> — ${esc(r.age ?? '?')} · ${r.ok === true ? 'ok' : r.ok === false ? 'בעיה-מדודה' : 'אין-מדידה'}</li>`;
  return `<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>קטלוג-היכולות · ריבונות SAOS</title>
<style>
  :root { --fg:#e8e6e1; --faint:#8a877f; --bg:#0d0e11; }
  body { background:var(--bg); color:var(--fg); font-family:system-ui,'Segoe UI',sans-serif; margin:0; padding:48px 20px; line-height:1.65; }
  main { max-width:1000px; margin:0 auto; }
  h1 { font-size:28px; margin:0 0 6px; } h2 { font-size:19px; margin-top:36px; }
  .sub { color:var(--faint); font-size:13px; }
  table { width:100%; border-collapse:collapse; background:#14151a; border:1px solid #26272e; border-radius:12px; overflow:hidden; margin-top:14px; }
  th, td { padding:8px 12px; text-align:right; border-bottom:1px solid #1f2027; font-size:13.5px; vertical-align:top; }
  th { color:var(--faint); font-weight:600; font-size:12px; }
  tr:last-child td { border-bottom:none; }
  code { color:#d8b46a; font-size:12px; } a { color:#d8b46a; text-decoration:none; }
  .ok { color:#7dd087; } .warn { color:#e0b45e; }
  ul { padding-inline-start:20px; } li { margin:5px 0; font-size:13.5px; }
  footer { margin-top:40px; color:var(--faint); font-size:12px; text-align:center; }
</style>
</head>
<body>
<main>
  <h1>קטלוג-היכולות</h1>
  <p class="sub">מה הריבונות יודעת לעשות — כל איבר, עורק, וידע · נבנה אוטונומית · ${esc(now.toISOString())}</p>

  <h2>האיברים (organs) · מה כל אחד עושה ומתי פעם אחרונה</h2>
  <table><tr><th>איבר</th><th>תפקיד</th><th>דופק-אחרון</th></tr>
  ${organs.map(organRow).join('\n  ') || '<tr><td colspan="3">אין-מדידה</td></tr>'}
  </table>

  <h2>העורקים (workflows) · קצב-הפעמעום</h2>
  <table><tr><th>עורק</th><th>cron</th></tr>
  ${arteries.map(artRow).join('\n  ') || '<tr><td colspan="2">אין-מדידה</td></tr>'}
  </table>

  <h2>הידע שנאסף · סקירה-והנדסה (clean-room)</h2>
  <table><tr><th>מקור</th><th>פסק</th><th>מה לומדים ממנו</th></tr>
  ${knowledge.map(knowRow).join('\n  ') || '<tr><td colspan="3">אין-מדידה</td></tr>'}
  </table>

  <h2>קבלות-חיות · מי פעם אחרונה</h2>
  <ul>
  ${receiptSummary.map(recRow).join('\n  ') || '<li>אין-מדידה</li>'}
  </ul>

  <footer>נבנה על-ידי איבר-הבונה מהקבצים האמיתיים בגיט · השמישות היא חוק, לא מותרות</footer>
</main>
<div id="agent9-truth-band"></div>
<script src="agent9-truth-band.js" defer></script>
</body>
</html>
`;
}

/**
 * fixLinks — safe, unambiguous relative-link repair (t14: the builder now
 * FIXES, not just records). Law: only when exactly ONE product-page candidate
 * matches the broken href's basename; never touches churn dirs; bounded.
 * Returns {fixes:[{file, from, to}], skipped:[{file, href, why}]}.
 */
export function fixLinks(broken, candidates, { max = 5 } = {}) {
  const byBase = new Map();
  for (const c of candidates) {
    const base = c.split('/').pop().toLowerCase();
    if (!byBase.has(base)) byBase.set(base, []);
    byBase.get(base).push(c);
  }
  const fixes = [], skipped = [];
  for (const b of broken ?? []) {
    if (fixes.length >= max) { skipped.push({ ...b, why: 'cap reached' }); continue; }
    const base = b.href.split('?')[0].split('#')[0].split('/').pop().toLowerCase();
    if (!base) { skipped.push({ ...b, why: 'no basename' }); continue; }
    const cands = byBase.get(base) ?? [];
    if (cands.length !== 1) { skipped.push({ ...b, why: cands.length === 0 ? 'no candidate' : `ambiguous (${cands.length})` }); continue; }
    fixes.push({ file: b.from, from: b.href, to: cands[0] });
  }
  return { fixes, skipped };
}

/** apply link fixes to an html file's content (pure string transform) */
export function rewriteLinks(html, fixesForFile) {
  let out = html;
  for (const f of fixesForFile) {
    const needle = `href="${f.from}"`;
    if (out.includes(needle)) out = out.split(needle).join(`href="${f.to}"`);
  }
  return out;
}

export function selftest() {
  const results = [];
  const t = (name, cond) => results.push({ name, pass: !!cond });
  const now = new Date('2026-10-18T10:00:00Z');
  const facts = {
    at: now.toISOString(),
    verifier: { overall: 'GREEN', at: '2026-10-18T09:00:00Z' },
    treasury: { health: 'HEALTHY', acct00sp: 4029.05, at: '2026-10-18T08:00:00Z' },
    selfHeal: { ok: true, workflowsActive: 44, workflowsDisabled: 0, at: '2026-10-18T07:00:00Z' },
    scout: { ok: true, entries: 8, at: '2026-10-17T20:00:00Z' },
    world: { version: 3, at: null },
    fleet: { ok: true, total: 14, at: '2026-10-18T02:33:00Z' },
    pacer: { at: '2026-10-18T09:50:00Z', skipped: true, checked: 0, staleN: 0, dispatchedN: 0, lastBeatAt: '2026-10-18T09:35:00Z', lastBeatChecked: 12, lastBeatDispatched: 1 },
  };

  const html = pulseHtml(facts, now);
  t('pulse has start marker', html.startsWith(PULSE_START));
  t('pulse verifier value', html.includes('GREEN'));
  t('pulse treasury value', html.includes('4029 SP'));
  t('pulse workflows value', html.includes('44 חי'));
  t('pulse honest missing', pulseHtml({ verifier: { overall: null, at: null } }, now).includes('אין-מדידה'));
  t('pulse age label', html.includes('measured · 1 שע׳'));
  t('pulse heartbeat card', html.includes('דופק-הרשת העצמי') && html.includes('12 נבדקו · 1 שוגרו'));
  t('pulse strip links receipts', html.includes('receipts.html'));

  // receipts ledger page
  const rl = receiptsLedgerHtml([
    { organ: 'builder', status: 'ok', age: '3 דק׳', at: '2026-10-18T09:57:00Z' },
    { organ: 'pacer', status: 'skipped', age: '1 דק׳', at: '2026-10-18T09:59:00Z' },
    { organ: 'world', status: 'defect', age: '2 שע׳', at: '2026-10-18T08:00:00Z' },
    { organ: 'ghost', status: 'missing', age: null, at: null },
  ], now);
  t('ledger renders organs', rl.includes('builder') && rl.includes('pacer'));
  t('ledger honest statuses', rl.includes('תקין') && rl.includes('פעימה-שקטה') && rl.includes('פגם-מדוד') && rl.includes('אין-מדידה'));
  t('ledger summary counts', rl.includes('<b>1</b>איברים-תקינים') && rl.includes('<b>1</b>פגמים-מדודים') && rl.includes('<b>1</b>בלי-מדידה'));
  t('ledger honest empty', receiptsLedgerHtml([], now).includes('עדיין לא זרמו קבלות'));

  // injectSection: replace path
  const doc = `<html><body>
  <!-- ═══ surfaces ═══ -->
  <section id="s">x</section>
</body></html>`;
  const withSec = injectSection(doc, pulseHtml(facts, now));
  t('inject first time', withSec.includes(PULSE_START) && withSec.includes('surfaces'));
  const replaced = injectSection(withSec, pulseHtml({ ...facts, verifier: { overall: 'DEGRADED', at: null } }, now));
  t('inject replaces (no dup markers)', (replaced.match(new RegExp(PULSE_START, 'g')) || []).length === 1);
  t('inject updated value', replaced.includes('DEGRADED'));
  t('inject refuses blind doc', injectSection('<html>nothing here</html>', html) === null);

  // docs index
  const d = docsIndexHtml([
    { href: 'CHAINBUS.md', title: 'שרשרת-העורקים', desc: 'רוסטר האיברים' },
    { href: 'LEARNING.md', title: 'חוקי-הלמידה', desc: '' },
  ], now);
  t('docs index lists files', d.includes('CHAINBUS.md') && d.includes('LEARNING.md'));
  t('docs index honest empty', docsIndexHtml([], now).includes('אין-מדידה'));

  // changelog
  const c = changelogHtml([
    { sha: 'abc1234', date: '2026-10-18T02:33:00Z', msg: 'builder: pulse run' },
    { sha: 'def5678', date: '2026-10-17T10:00:00Z', msg: 'older' },
  ], now);
  t('changelog groups days', c.includes('2026-10-18') && c.includes('abc1234'));
  t('changelog honest empty', changelogHtml([], now).includes('אין-מדידה'));

  // pulse.json
  const pj = JSON.parse(pulseJson(facts, { pages: [], missing: [], links: { checked: 10, brokenCount: 1 }, backlog: [{ id: 'PULSE_SNAPSHOT', priority: 0, why: 'w' }] }, now));
  t('pulse.json parses', pj.schema === 'builder-pulse/1' && pj.facts.verifier.overall === 'GREEN');
  t('pulse.json backlog', pj.audit.backlog.length === 1);

  // executableTasks filter
  const et = executableTasks([
    { id: 'PULSE_SNAPSHOT' }, { id: 'SOMETHING_ELSE' }, { id: 'CREATE_DOCS_INDEX_HTML' },
  ]);
  t('executable filter', et.length === 2);

  // ageLabel
  t('ageLabel minutes→hour', ageLabel('2026-10-18T09:00:00Z', now) === '1 שע׳');
  t('ageLabel null', ageLabel(null, now) === 'לא-נמדד');

  // tools catalog
  const tc = toolsCatalogHtml({
    organs: [{ name: 'builder', desc: 'הכותב', live: '3 דק׳' }],
    knowledge: [{ repo: 'x/y', verdict: 'SAFE_TO_STUDY', summary: 'learn s', url: 'https://github.com/x/y' }],
    arteries: [{ name: 'artery-pacer.yml', crons: ['7 2 * * *'] }],
    receiptSummary: [{ organ: 'pacer', age: '1 דק׳', ok: true }],
  }, now);
  t('catalog renders organs', tc.includes('builder') && tc.includes('הכותב'));
  t('catalog renders knowledge', tc.includes('SAFE_TO_STUDY'));
  t('catalog renders arteries + receipts', tc.includes('artery-pacer.yml') && tc.includes('pacer'));
  t('catalog honest empty', toolsCatalogHtml({}, now).includes('אין-מדידה'));

  // fixLinks law
  const fl = fixLinks(
    [{ from: 'a.html', href: 'tools.html' }, { from: 'a.html', href: 'ghost.html' }, { from: 'b.html', href: 'index.html' }, { from: 'c.html', href: 'dup.html' }],
    ['tools.html', 'index.html', 'dup.html', 'x/dup.html'],
  );
  t('unambiguous fixed', fl.fixes.length === 2 && fl.fixes[0].to === 'tools.html');
  t('no-candidate skipped', fl.skipped.some(s => s.href === 'ghost.html'));
  t('ambiguous skipped', fl.skipped.some(s => s.href === 'dup.html'));
  t('cap honored', fixLinks(Array.from({ length: 8 }, (_, i) => ({ from: `f${i}.html`, href: 'tools.html' })), ['tools.html']).fixes.length === 5);

  // rewriteLinks
  const html2 = '<a href="tools.html">x</a> <a href="other.html">y</a>';
  t('rewrite replaces only target', rewriteLinks(html2, [{ from: 'tools.html', to: 'tools2.html' }]).includes('href="tools2.html"') && rewriteLinks(html2, [{ from: 'tools.html', to: 'tools2.html' }]).includes('href="other.html"'));

  return { ok: results.every(r => r.pass), results };
}

if (process.argv[1] && process.argv[1].endsWith('craft.mjs') && process.argv.includes('--selftest')) {
  const r = await selftest();
  for (const x of r.results) console.log(`${x.pass ? 'PASS' : 'FAIL'} ${x.name}`);
  process.exit(r.ok ? 0 : 1);
}
