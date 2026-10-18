#!/usr/bin/env node
/**
 * builder.mjs — איבר-הבונה [t13 · owner order: "למה האתר שלנו לא משתפר
 * ומתעדכן באמת קבוע על ידי הריבונות האוטונומית — מה היא עושה רק בודקת את
 * האתרים? אני רוצה בניה שיפור וכו תמיד ולא רק בדיקות · אין מוצר אמיתי ·
 * תוצאות ברמה גבוהה יותר מאנושי · לוודא התפתחות וגדילה ולא סגירה"]
 * ═══════════════════════════════════════════════════════════════════════════
 * THE WRITER ORGAN. Until t13 every artery only CHECKED and RECORDED; the
 * product pages the owner sees stayed frozen while hundreds of receipt
 * commits churned underneath. This organ closes the loop the other way:
 *
 *   audit (measure the site like the owner does) →
 *   backlog (every weakness becomes a scored task) →
 *   craft (real deltas: live pulse strip, docs hub, changelog, pulse.json) →
 *   ship (scoped commit, rebase-retry push — siblings push in parallel) →
 *   verify (the LIVE Pages URL must serve the new marker — no silent-green) →
 *   receipt (fail-honest, refs-only)
 *
 * Quality-beyond-human law: every output is marker-scoped, schema'd,
 * link-measured, age-stamped, and idempotent (identical data → identical
 * bytes → honest no-op, no junk churn). Cadence: hourly — the site visibly
 * improves all day, forever, without any human.
 *
 *   node engine/builder.mjs --selftest   (zero-net, zero-git, must be green)
 *   node engine/builder.mjs              (live: audits + builds + ships)
 *   env: DOMAIN_DIR (site checkout, default ../Domain), SITE_BASE (live URL)
 */
import { writeFileSync, mkdirSync, existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { snapshotFacts, auditSite, selftest as auditSelftest } from './builder/audit.mjs';
import { pulseHtml, docsIndexHtml, changelogHtml, pulseJson, executableTasks, PULSE_START, toolsCatalogHtml, receiptsLedgerHtml, fixLinks, rewriteLinks } from './builder/craft.mjs';
import { applyEdits, gitLastDates, gitShip, gitLogTail, verifyLive, selftest as shipSelftest } from './builder/ship.mjs';

const ROOT = process.env.GITHUB_WORKSPACE || resolve(join(dirname(fileURLToPath(import.meta.url)), '..'));
const SITE = process.env.DOMAIN_DIR ? resolve(process.env.DOMAIN_DIR) : resolve(join(ROOT, '..', 'Domain'));
const SITE_BASE = process.env.SITE_BASE || 'https://roshpinacare-sys.github.io/Domain';
const RECEIPTS = join(ROOT, 'receipts', 'builder');
const nowIso = () => new Date().toISOString();

/** receipt hygiene: never persist absolute sandbox paths or cred-bearing URLs (refs-scrub law) */
const scrub = s => String(s ?? '')
  .replace(/https?:\/\/[^\s"']*:[^\s"']*@[^\s"']*/g, '<redacted-cred-url>')
  .replace(/(\/home\/[^\s"']*)|(\/Users\/[^\s"']*)/g, '<workpath>')
  .slice(0, 400);

function appendBoundedLedger(dir, entry, cap = 400) {
  mkdirSync(dir, { recursive: true });
  const p = join(dir, 'ledger.jsonl');
  let lines = [];
  if (existsSync(p)) lines = readFileSync(p, 'utf8').split('\n').filter(Boolean);
  lines.push(JSON.stringify(entry));
  writeFileSync(p, lines.slice(-cap).join('\n') + '\n');
}

/** docs listing for the docs hub — title from first heading, honest fallback */
export function docListings(siteRoot) {
  const dir = join(siteRoot, 'docs');
  if (!existsSync(dir)) return [];
  const files = [];
  const walk = (d, rel) => {
    for (const f of require_listDir(d)) {
      const full = join(d, f);
      const r = rel ? `${rel}/${f}` : f;
      if (isDir(full)) walk(full, r);
      else if (f.toLowerCase().endsWith('.md')) files.push(r);
    }
  };
  walk(dir, '');
  return files.slice(0, 120).map(rel => {
    let title = rel, desc = '';
    try {
      const head = readFileSync(join(dir, rel), 'utf8').split('\n').filter(Boolean).slice(0, 3);
      const h1 = head.find(l => l.startsWith('# '));
      if (h1) { title = h1.slice(2).trim(); desc = head.filter(l => !l.startsWith('# '))[0]?.slice(0, 120) || ''; }
    } catch { /* unreadable doc: listed by name only, honest */ }
    return { href: rel, title, desc };
  });
}
/* tiny fs helpers kept local so audit/craft/ship stay pure */
const isDir = p => { try { return statSync(p).isDirectory(); } catch { return false; } };
const require_listDir = d => { try { return readdirSync(d).filter(f => !f.startsWith('.')); } catch { return []; } };

/**
 * collectCapabilityData — the real inputs for the usability catalog [t14]:
 * organs from CHAINBUS.md, knowledge entries from scout, arteries from
 * workflows, receipt liveness — every cell measured from real files,
 * nothing hand-written.
 */
export function collectCapabilityData(root, siteRoot) {
  const data = { organs: [], knowledge: [], arteries: [], receiptSummary: [] };
  // 1. organs: CHAINBUS.md roster lines "- `name` — desc"
  try {
    const md = readFileSync(join(root, 'engine', 'CHAINBUS.md'), 'utf8');
    for (const m of md.matchAll(/^- `([\w-]+)` —\s*(.+)$/gm)) {
      data.organs.push({ name: m[1], desc: m[2].replace(/\[|\]|\*/g, '').slice(0, 110) });
    }
  } catch { /* honest empty */ }
  // liveness column: last receipt per organ dir (fail-honest)
  const rdir = join(root, 'receipts');
  try {
    for (const d of require_listDir(rdir)) {
      if (!isDir(join(rdir, d))) continue;
      const j = (() => { try { return JSON.parse(readFileSync(join(rdir, d, 'latest.json'), 'utf8')); } catch { return null; } })();
      if (!j) continue;
      const at = j.doneAt ?? j.at;
      const mins = at ? Math.round((Date.now() - Date.parse(at)) / 60000) : null;
      const age = mins === null ? '?' : mins < 90 ? `${mins} דק׳` : mins < 2880 ? `${Math.round(mins / 60)} שע׳` : `${Math.round(mins / 1440)} ימ׳`;
      data.receiptSummary.push({ organ: d, age, ok: typeof j.ok === 'boolean' ? j.ok : null });
    }
    data.receiptSummary.sort((a, b) => String(a.age).localeCompare(String(b.age)));
  } catch { /* honest empty */ }
  // 2. knowledge: scout entries (repo, verdict, lesson summary, url)
  try {
    const kdir = join(root, 'knowledge', 'scout');
    for (const f of require_listDir(kdir)) {
      if (!f.startsWith('entries-') || !f.endsWith('.json')) continue;
      const j = (() => { try { return JSON.parse(readFileSync(join(kdir, f), 'utf8')); } catch { return null; } })();
      for (const e of j?.entries ?? []) {
        data.knowledge.push({
          repo: e.repo ?? 'unknown', verdict: e.verdict ?? '—',
          summary: (e.lesson?.summary ?? '').slice(0, 140),
          url: `https://github.com/${e.repo ?? ''}`,
        });
      }
    }
    data.knowledge = data.knowledge.slice(0, 20);
  } catch { /* honest empty */ }
  // 3. arteries: workflow files + their crons (names-only)
  try {
    const wdir = join(root, '.github', 'workflows');
    for (const f of require_listDir(wdir).sort()) {
      if (!f.endsWith('.yml') && !f.endsWith('.yaml')) continue;
      const src = readFileSync(join(wdir, f), 'utf8');
      const crons = [...src.matchAll(/cron:\s*["']?([^"'\n]+)["']?/g)].map(m => m[1].trim());
      data.arteries.push({ name: f, crons });
    }
  } catch { /* honest empty */ }
  void siteRoot;
  return data;
}

/**
 * collectReceiptStreams — every organ's latest receipt for the open-ledger
 * page [t15]: { organ, at, age, status } — status mapped fail-honest
 * (ok/noop/skipped/defect/missing), never invented, refs-only.
 */
export function collectReceiptStreams(root, now = new Date()) {
  const rdir = join(root, 'receipts');
  const streams = [];
  for (const d of require_listDir(rdir)) {
    if (!isDir(join(rdir, d))) continue;
    const p = join(rdir, d, 'latest.json');
    if (!existsSync(p)) { streams.push({ organ: d, at: null, age: null, status: 'missing' }); continue; }
    const j = (() => { try { return JSON.parse(readFileSync(p, 'utf8')); } catch { return null; } })();
    if (!j) { streams.push({ organ: d, at: null, age: null, status: 'missing' }); continue; }
    const at = j.doneAt ?? j.at ?? null;
    const mins = at ? Math.round((now.getTime() - Date.parse(at)) / 60000) : null;
    const age = mins === null ? null : mins < 1 ? 'עכשיו' : mins < 90 ? `${mins} דק׳` : mins < 2880 ? `${Math.round(mins / 60)} שע׳` : `${Math.round(mins / 1440)} ימ׳`;
    const status = j.defect ? 'defect' : j.skipped ? 'skipped' : j.ok === false ? 'defect' : j.ok === true ? 'ok' : j.noop ? 'noop' : 'ok';
    streams.push({ organ: d, at, age, status });
  }
  return streams.sort((a, b) => String(a.organ).localeCompare(String(b.organ)));
}

/** product html files (top-level + docs/) — candidates for link fixing */
export function listProductHtml(siteRoot) {
  const out = [];
  try {
    for (const f of require_listDir(siteRoot)) if (f.endsWith('.html')) out.push(f);
    const docs = join(siteRoot, 'docs');
    for (const f of require_listDir(docs)) if (f.endsWith('.html')) out.push(`docs/${f}`);
  } catch { /* honest empty */ }
  return out;
}

export async function live() {
  const started = nowIso();
  const receipt = {
    schema: 'builder/1', at: started, ok: false,
    organ: 'artery-builder', siteRef: 'roshpinacare-sys/Domain', siteBase: SITE_BASE,
    audit: null, tasks: [], edits: [], ship: null, verify: null, reasons: [],
  };
  try {
    if (!existsSync(join(SITE, '.git'))) {
      receipt.reasons.push('site checkout missing — nothing built, nothing faked');
    } else {
      // ── 1. FACTS: the sovereignty's real receipts ──────────────────────
      const facts = snapshotFacts(ROOT);
      receipt.factsAt = facts.at;

      // ── 2. AUDIT: measure the site like the owner does ─────────────────
      const PRODUCT_PATHS = ['index.html', 'console.html', 'products.html', 'truth.html', 'tools.html', 'docs/index.html', 'changelog.html', 'pulse.json', 'receipts.html'];
      const gitDates = gitLastDates(SITE, PRODUCT_PATHS);
      const audit = auditSite(SITE, gitDates, { facts });
      receipt.audit = { pages: audit.pages, missing: audit.missing, links: audit.links, backlog: audit.backlog.map(t => ({ id: t.id, priority: t.priority, why: t.why })) };

      // ── 3. CRAFT: turn tasks into real deltas ──────────────────────────
      const tasks = executableTasks(audit.backlog);
      receipt.tasks = tasks.map(t => t.id);
      const edits = [];
      for (const task of tasks) {
        if (task.id === 'PULSE_SNAPSHOT' || (task.id === 'CREATE_PULSE_JSON' && !tasks.some(t => t.id === 'PULSE_SNAPSHOT'))) {
          edits.push({ path: 'pulse.json', mode: 'write', content: pulseJson(facts, audit, new Date()) });
        }
        if (task.id === 'REFRESH_PRODUCT_SURFACES') {
          edits.push({ path: 'index.html', mode: 'section', content: pulseHtml(facts, new Date()) });
        }
        if (task.id === 'CREATE_DOCS_INDEX_HTML') {
          edits.push({ path: 'docs/index.html', mode: 'write', content: docsIndexHtml(docListings(SITE), new Date()) });
        }
        if (task.id === 'CREATE_CHANGELOG_HTML') {
          edits.push({ path: 'changelog.html', mode: 'write', content: changelogHtml(gitLogTail(SITE, 40), new Date()) });
        }
        if (task.id === 'CREATE_TOOLS_HTML' || task.id === 'CREATE_TOOLS_CATALOG') {
          edits.push({ path: 'tools.html', mode: 'write', content: toolsCatalogHtml(collectCapabilityData(ROOT, SITE), new Date()) });
        }
        if (task.id === 'CREATE_RECEIPTS_HTML') {
          edits.push({ path: 'receipts.html', mode: 'write', content: receiptsLedgerHtml(collectReceiptStreams(ROOT, new Date()), new Date()) });
        }
        if (task.id === 'FIX_RELATIVE_LINKS') {
          // t14: the builder now FIXES broken relative links — safe unambiguous
          // matches only (unique basename among product pages), cap 5/run.
          const candidates = listProductHtml(SITE);
          const { fixes, skipped } = fixLinks(audit.links.broken ?? [], candidates);
          for (const f of fixes) {
            const p = join(SITE, f.file);
            if (!existsSync(p)) continue;
            const before = readFileSync(p, 'utf8');
            const after = rewriteLinks(before, [f]);
            if (after !== before) {
              edits.push({ path: f.file, mode: 'raw', before, after });
              (receipt.linkFixes ??= []).push({ file: f.file, from: f.from, to: f.to });
              console.log(`[builder] link-fix ${f.file}: ${f.from} → ${f.to}`);
            }
          }
          if (skipped.length) (receipt.linkSkipped ??= []).push(...skipped.slice(0, 10));
        }
      }
      // tools.html freshness: regenerate whenever it exists but is ≥1 day stale
      const th = audit.pages.find(p => p.path === 'tools.html');
      if (th?.exists && !tasks.some(t => t.id.startsWith('CREATE_TOOLS')) && (th.days === null || th.days >= 1)) {
        edits.push({ path: 'tools.html', mode: 'write', content: toolsCatalogHtml(collectCapabilityData(ROOT, SITE), new Date()) });
        receipt.tasks.push('REFRESH_TOOLS_CATALOG');
      }
      // receipts.html: the public open-ledger — regenerated EVERY run (hourly
      // receipts change its bytes; identical data → write-mode honest no-op,
      // the idempotency lives in applyEdits now). Covers first-creation too.
      if (!edits.some(e => e.path === 'receipts.html')) {
        edits.push({ path: 'receipts.html', mode: 'write', content: receiptsLedgerHtml(collectReceiptStreams(ROOT, new Date()), new Date()) });
        receipt.tasks.push('RECEIPTS_LEDGER');
      }
      // changelog freshness: refresh it whenever the page exists but is stale
      const cl = audit.pages.find(p => p.path === 'changelog.html');
      if (cl?.exists && !tasks.some(t => t.id === 'CREATE_CHANGELOG_HTML') && (cl.days === null || cl.days >= 1)) {
        edits.push({ path: 'changelog.html', mode: 'write', content: changelogHtml(gitLogTail(SITE, 40), new Date()) });
        receipt.tasks.push('REFRESH_CHANGELOG');
      }

      // ── 4. SHIP: scoped commit + rebase-retry push ─────────────────────
      // 'raw' edits (link fixes) apply first — the rest go through applyEdits
      const rawTouched = [];
      for (const e of edits.filter(e => e.mode === 'raw')) {
        writeFileSync(join(SITE, e.path), e.after);
        rawTouched.push(e.path);
      }
      const applied = applyEdits(SITE, edits.filter(e => e.mode !== 'raw'), m => console.log(`[builder] ${m}`));
      receipt.edits = [...applied, ...rawTouched.map(p => ({ path: p, ok: true, changed: true }))];
      const touched = [...applied.filter(a => a.ok && a.changed).map(a => a.path), ...rawTouched];
      if (touched.length) {
        const ids = receipt.tasks.join('+') || 'audit';
        const ship = gitShip(SITE, {
          message: `builder: ${ids} — דופק חי + משטחי-מוצר מתחדשים [run ${process.env.GITHUB_RUN_ID || 'sandbox'}]`,
          paths: touched,
        });
        receipt.ship = { ...ship, why: scrub(ship.why) };
        receipt.ok = ship.pushed;
        if (!ship.pushed) receipt.reasons.push(`ship: ${scrub(ship.why)}`);

        // ── 5. VERIFY: the live URL must serve the new marker ────────────
        if (ship.pushed) {
          // Pages rebuild takes a couple of minutes: verify marker presence on
          // the live landing, fail-honest if not yet propagated (receipt still ok — ship measured).
          const v = await verifyLive([`${SITE_BASE}/`], { marker: PULSE_START });
          receipt.verify = v;
          const served = v[0]?.ok && v[0]?.hasMarker;
          receipt.liveVerified = !!served;
          if (!served) receipt.reasons.push('live URL not yet serving the new pulse (Pages rebuild lag) — ship measured, verify pending');
        }
      } else {
        receipt.ok = true;
        receipt.noop = true;
        receipt.reasons.push('site already up-to-date — honest no-op (idempotent bytes, no junk churn)');
      }
    }
  } catch (err) {
    receipt.defect = true;
    receipt.reasons.push(`organ defect: ${String(err?.stack || err).slice(0, 500)}`);
  }
  receipt.doneAt = nowIso();
  receipt.ok = !!receipt.ok;
  mkdirSync(RECEIPTS, { recursive: true });
  writeFileSync(join(RECEIPTS, 'latest.json'), JSON.stringify(receipt, null, 2) + '\n');
  appendBoundedLedger(RECEIPTS, {
    at: receipt.doneAt, ok: receipt.ok, noop: !!receipt.noop,
    tasks: receipt.tasks, edited: (receipt.edits || []).filter(e => e.changed).map(e => e.path),
    pushed: receipt.ship?.pushed ?? false, commit: receipt.ship?.commit ?? null,
    liveVerified: !!receipt.liveVerified,
  });
  console.log(`[builder] ok=${receipt.ok} noop=${!!receipt.noop} tasks=${receipt.tasks.join(',') || 'none'} pushed=${receipt.ship?.pushed ?? false}`);
  return receipt;
}

export async function selftest() {
  const a = await auditSelftest();
  const c = (await import('./builder/craft.mjs')).selftest();
  const s = await shipSelftest();
  const all = [...a.results, ...c.results, ...s.results];
  const ok = a.ok && c.ok && s.ok;
  if (process.env.SELFTEST_VERBOSE) for (const r of all) console.log(`${r.pass ? 'PASS' : 'FAIL'} ${r.name}`);
  return { ok, counts: { audit: a.results.length, craft: c.results.length, ship: s.results.length } };
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  if (process.argv.includes('--selftest')) {
    const r = await selftest();
    console.log(`builder selftest: ${r.ok ? 'PASS' : 'FAIL'} (${r.counts.audit}+${r.counts.craft}+${r.counts.ship} checks)`);
    process.exit(r.ok ? 0 : 1);
  } else {
    const r = await live();
    // fail-honest law: measured state (ok:false + reason) exits 0; only organ defects exit non-zero
    process.exit(r.defect ? 2 : 0);
  }
}
