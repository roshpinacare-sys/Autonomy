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
import { pulseHtml, docsIndexHtml, changelogHtml, pulseJson, executableTasks, PULSE_START } from './builder/craft.mjs';
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
      const gitDates = gitLastDates(SITE, ['index.html', 'console.html', 'products.html', 'truth.html', 'docs/index.html', 'changelog.html', 'pulse.json']);
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
      }
      // changelog freshness: refresh it whenever the page exists but is stale
      const cl = audit.pages.find(p => p.path === 'changelog.html');
      if (cl?.exists && !tasks.some(t => t.id === 'CREATE_CHANGELOG_HTML') && (cl.days === null || cl.days >= 1)) {
        edits.push({ path: 'changelog.html', mode: 'write', content: changelogHtml(gitLogTail(SITE, 40), new Date()) });
        receipt.tasks.push('REFRESH_CHANGELOG');
      }

      // ── 4. SHIP: scoped commit + rebase-retry push ─────────────────────
      const applied = applyEdits(SITE, edits, m => console.log(`[builder] ${m}`));
      receipt.edits = applied;
      const touched = applied.filter(a => a.ok && a.changed).map(a => a.path);
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
