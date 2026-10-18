#!/usr/bin/env node
/**
 * builder/audit.mjs — איבר-הבונה · מודד-האתר [t13 · owner order:
 * "למה האתר שלנו לא משתפר ומתעדכן באמת קבוע על ידי הריבונות — אני רוצה בניה
 * שיפור תמיד ולא רק בדיקות · מה סגור מוגבל לא מעודכן · הרבה דברים חסרים"]
 * ═══════════════════════════════════════════════════════════════════════════
 * AUDIT PHASE: measures the public site the way the owner experiences it —
 * product-page staleness (git truth), missing product surfaces, broken
 * relative links, runtime-data integrity — and turns every measured weakness
 * into a SCORED BUILD TASK. The organ that finds the weakness is the organ
 * that fixes it: no findings without a task.
 *
 * Pure + dual-mode: selftest is zero-network, zero-git (dates injected).
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';

/** stale if product page untouched this many days (owner's complaint: frozen pages) */
export const STALE_DAYS = 2;

/** the product surfaces the owner judges the site by — freshness here = life */
export const PRODUCT_PAGES = [
  'index.html', 'console.html', 'products.html', 'truth.html',
  'docs/index.html', 'changelog.html', 'pulse.json',
];

/** load a JSON file fail-honest — missing/corrupt = null, never a throw */
export function loadJson(path) {
  try { return JSON.parse(readFileSync(path, 'utf8')); } catch { return null; }
}

/** days since ISO date string (or null) */
export function ageDays(isoDate, now = new Date()) {
  if (!isoDate) return null;
  const t = Date.parse(isoDate);
  if (Number.isNaN(t)) return null;
  return Math.max(0, (now.getTime() - t) / 86400000);
}

/**
 * snapshotFacts — read the sovereignty's real receipts into a flat pulse
 * snapshot. Every field fail-honest: null when unmeasurable, never invented.
 */
export function snapshotFacts(root, now = new Date()) {
  const r = join(root, 'receipts');
  const verifier = loadJson(join(root, 'state', 'verifier', 'verdict-latest.json'));
  const treasury = loadJson(join(r, 'treasury', 'latest.json'));
  const selfHeal = loadJson(join(r, 'self-heal', 'latest.json'));
  const scout = loadJson(join(r, 'scout', 'latest.json'));
  const world = loadJson(join(r, 'world', 'latest.json'));
  const fleet = loadJson(join(r, 'fleet', 'verdict.json'));
  return {
    at: now.toISOString(),
    verifier: {
      overall: verifier?.overall ?? null,
      at: verifier?.at ?? verifier?.generated_at ?? null,
    },
    treasury: {
      health: treasury?.healthy === true ? 'HEALTHY' : treasury?.healthy === false ? 'BELOW-FLOOR' : treasury?.health ?? treasury?.status ?? null,
      acct00sp: treasury?.treasurySp
        ?? treasury?.accounts?.['acct-00']?.sp
        ?? treasury?.acct00?.sp
        ?? treasury?.acct00_sp
        ?? null,
      floor: treasury?.floor ?? null,
      at: treasury?.at ?? null,
    },
    selfHeal: {
      ok: typeof selfHeal?.ok === 'boolean' ? selfHeal.ok : null,
      workflowsActive: selfHeal?.workflows?.active ?? null,
      workflowsDisabled: selfHeal?.workflows?.disabled ?? null,
      at: selfHeal?.at ?? null,
    },
    scout: { ok: scout?.ok ?? null, entries: scoutEntries(root, scout), at: scout?.at ?? null },
    world: { version: world?.version ?? world?.world?.version ?? null, at: world?.at ?? null },
    fleet: { ok: fleet?.ok ?? null, total: fleet?.summary?.total ?? fleet?.total ?? null, at: fleet?.at ?? null },
  };
}

/** count real knowledge entries in knowledge/scout/entries-*.json (fail-honest) */
export function scoutEntries(root, scout) {
  if (Array.isArray(scout?.lessons) && scout.lessons.length) return scout.lessons.length;
  const dir = join(root, 'knowledge', 'scout');
  try {
    let n = 0;
    for (const f of readdirSync(dir)) {
      if (!f.startsWith('entries-') || !f.endsWith('.json')) continue;
      const j = loadJson(join(dir, f));
      if (Array.isArray(j)) n += j.length;
      else if (Array.isArray(j?.entries)) n += j.entries.length;
    }
    return n;
  } catch { return null; }
}

/**
 * auditSite — measure the site + emit the build backlog.
 * gitDates: { [repoRelPath]: 'YYYY-MM-DD' } provided by the orchestrator
 * (git is executed once there, keeping this pure).
 */
export function auditSite(siteRoot, gitDates = {}, opts = {}) {
  const now = opts.now ?? new Date();
  const pages = [];
  const missing = [];
  for (const rel of PRODUCT_PAGES) {
    const p = join(siteRoot, rel);
    if (!existsSync(p)) { missing.push(rel); pages.push({ path: rel, exists: false, days: null }); continue; }
    const days = ageDays(gitDates[rel], now);
    pages.push({ path: rel, exists: true, days });
  }
  const linkReport = checkRelativeLinks(siteRoot, { now, limit: opts.linkLimit ?? 400 });
  const backlog = buildBacklog({ pages, missing, links: linkReport, facts: opts.facts ?? null });
  return {
    at: now.toISOString(),
    siteRoot,
    pages,
    missing,
    links: { checked: linkReport.checked, brokenCount: linkReport.broken.length, broken: linkReport.broken.slice(0, 20) },
    backlog,
  };
}

/** buildBacklog — every weakness becomes a scored task (never bare findings) */
export function buildBacklog({ pages, missing, links, facts }) {
  const tasks = [];
  const stale = pages.filter(p => p.exists && (p.days === null || p.days >= STALE_DAYS));
  if (stale.length) {
    tasks.push({
      id: 'REFRESH_PRODUCT_SURFACES', priority: 1,
      paths: stale.map(p => p.path),
      why: `משטחי-מוצר קפואים ${STALE_DAYS}+ ימים בזמן שהרשת פועמת מתחת — בדיוק התלונה שנמדדה`,
    });
  }
  const missingCore = missing.filter(m => ['docs/index.html', 'changelog.html', 'pulse.json'].includes(m));
  for (const m of missingCore) {
    tasks.push({
      id: `CREATE_${m.replace(/[/.]/g, '_').toUpperCase()}`, priority: m === 'docs/index.html' ? 2 : 3,
      paths: [m], why: 'משטח חסר במוצר — כניסה שאינה קיימת (סגור/חסר, כפי שהבעלים מדד)',
    });
  }
  if (links.broken.length) {
    tasks.push({
      id: 'RECORD_BROKEN_LINKS', priority: 4, paths: [],
      why: `${links.broken.length} קישורים-פנימיים שבורים — נרשמים לתיקון ממוקד (לא נוגעים בקבצי סוכנים-אחרים בריצה זו)`,
      broken: links.broken,
    });
  }
  tasks.push({
    id: 'PULSE_SNAPSHOT', priority: 0, paths: ['pulse.json'],
    why: 'דופק-מדידה חי של הריבונות — מתעדכן בכל ריצה מהקבלות בגיט',
  });
  return tasks.sort((a, b) => a.priority - b.priority);
}

/** skip list: churn dirs (receipts/truth snapshots) that are not product surface */
const SKIP_DIRS = new Set(['.git', '.github', 'truth', 'receipts', 'agents', 'archive', 'models', 'node_modules']);

/**
 * checkRelativeLinks — walk top-level html files, verify relative hrefs resolve.
 * Absolute /Domain/... hrefs are SKIPPED (production-correct on Pages; the
 * earlier audit's "console.html broken" rows were exactly that false positive).
 */
export function checkRelativeLinks(siteRoot, opts = {}) {
  const now = opts.now ?? new Date();
  const out = { at: now.toISOString(), checked: 0, broken: [] };
  let htmlFiles = [];
  try { htmlFiles = readdirSync(siteRoot).filter(f => f.endsWith('.html')); } catch { return out; }
  for (const f of htmlFiles) {
    let html;
    try { html = readFileSync(join(siteRoot, f), 'utf8'); } catch { continue; }
    const hrefs = [...html.matchAll(/href="([^"#][^"]*)"/g)].map(m => m[1]);
    for (const raw of hrefs) {
      if (/^(https?:|mailto:|data:|\/\/|\/)/.test(raw)) continue;   // absolute/external: production truth
      if (/\$\{|\{\{/.test(raw)) continue;                          // JS template artifacts
      out.checked++;
      const clean = raw.split('?')[0].split('#')[0];
      if (!clean) continue;
      const target = resolve(dirname(join(siteRoot, f)), decodeURIComponent(clean));
      const rel = relative(siteRoot, target);
      const top = rel.split(/[\\/]/)[0];
      if (SKIP_DIRS.has(top)) continue;
      if (!existsSync(target) && !existsSync(join(target, 'index.html'))) {
        out.broken.push({ from: f, href: raw });
        if (out.broken.length >= (opts.limit ?? 400)) return out;
      }
    }
  }
  return out;
}

export async function selftest() {
  const results = [];
  const t = (name, cond) => results.push({ name, pass: !!cond });

  t('loadJson missing → null', loadJson('/nonexistent/x.json') === null);

  const now = new Date('2026-10-18T10:00:00Z');
  t('ageDays 2d', Math.round(ageDays('2026-10-16T10:00:00Z', now)) === 2);
  t('ageDays null', ageDays(null, now) === null);

  const bl = buildBacklog({
    pages: [{ path: 'index.html', exists: true, days: 3 }],
    missing: ['docs/index.html'],
    links: { broken: [{ from: 'a.html', href: 'x.html' }] },
    facts: null,
  });
  const ids = bl.map(x => x.id);
  t('backlog refresh task', ids.includes('REFRESH_PRODUCT_SURFACES'));
  t('backlog docs task', ids.includes('CREATE_DOCS_INDEX_HTML'));
  t('backlog links task', ids.includes('RECORD_BROKEN_LINKS'));
  t('backlog pulse always', ids.includes('PULSE_SNAPSHOT'));
  t('priority sort', bl[0].id === 'PULSE_SNAPSHOT');

  const bl2 = buildBacklog({
    pages: [{ path: 'index.html', exists: true, days: 0 }],
    missing: [], links: { broken: [] }, facts: null,
  });
  t('fresh page → no refresh', !bl2.map(x => x.id).includes('REFRESH_PRODUCT_SURFACES'));

  const { mkdtempSync, writeFileSync, rmSync } = await import('node:fs');
  const { tmpdir } = await import('node:os');
  const dir = mkdtempSync(join(tmpdir(), 'builder-audit-'));
  writeFileSync(join(dir, 'a.html'), '<a href="b.html">ok</a><a href="missing.html">bad</a><a href="https://x.y">ext</a>');
  writeFileSync(join(dir, 'b.html'), '<html></html>');
  const rep = checkRelativeLinks(dir);
  t('links checked counts relative only', rep.checked === 2);
  t('links finds broken', rep.broken.length === 1 && rep.broken[0].href === 'missing.html');
  rmSync(dir, { recursive: true, force: true });

  const emptyRoot = mkdtempSync(join(tmpdir(), 'builder-facts-'));
  const facts = snapshotFacts(emptyRoot, now);
  t('facts fail-honest verifier', facts.verifier.overall === null);
  t('facts has at', typeof facts.at === 'string');
  rmSync(emptyRoot, { recursive: true, force: true });

  return { ok: results.every(r => r.pass), results };
}

if (process.argv[1] && process.argv[1].endsWith('audit.mjs') && process.argv.includes('--selftest')) {
  const r = await selftest();
  for (const x of r.results) console.log(`${x.pass ? 'PASS' : 'FAIL'} ${x.name}`);
  process.exit(r.ok ? 0 : 1);
}
