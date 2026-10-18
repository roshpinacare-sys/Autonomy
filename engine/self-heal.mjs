#!/usr/bin/env node
/**
 * self-heal.mjs — הריאה-האוטונומית [t10 · הסקירה: "להפעיל-לא-לסגור-ולצמצם"]
 * ═══════════════════════════════════════════════════════════════════════════
 * הבעיה-שנמדדה (17/10): פסק-האמת הציג 7-אדומים (עורקים-סטיים) — ואף-רכיב-לא-סגר
 * את-הלולאה verifier→remediation. התיקון-היה-ידני (agent-9). החוק-החדש: האורגניזם
 * מרפא-את-עורקיו-בעצמו — קורא-את-פסק-האמת-הטרי, מצית-כל-עורק-שסטה, מפרסם-קבלה-כנה.
 *
 * מה-הוא-עושה:
 *   · קורא state/verifier/verdict-latest.json (מקור-האמת-היחיד — אף-הסקה-עצמית)
 *   · לכל-בדיקת sbx.wf-<name> בלתי-OK → dispatch ישיר ל-<name>.yml (ref: main)
 *   · סמכות-מצומצמת-בכוונה: dispatch בלבד — לעולם-לא enable/disable (זו-החוקה;
 *     שינוי-חוקה = בעלים-בלבד). workflow-כבוי → דווח-DISABLED-רועש, לא-שתיקה
 *   · בדיקות-שאינן-workflow (dev.rate, steem.treasury…) → notHealable-by-dispatch
 *     (כנות: הריאה-הזו-מרימה-איברים-קיימים, לא-מטפלת-כלכלה)
 *   · קבלה: receipts/self-heal/latest.json + ledger.jsonl (מוגבל-400)
 *
 * fail-closed: אין-verdict / אין-טוקן-בריצה-חיה = קבלת-{ok:false,reason} + יציאה 1.
 * שימוש: node engine/self-heal.mjs           (ריצה-חיה)
 *         node engine/self-heal.mjs --selftest (אפס-רשת, חייב-ירוק)
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = process.env.GITHUB_WORKSPACE || join(dirname(fileURLToPath(import.meta.url)), '..');
const VERDICT = join(ROOT, 'state', 'verifier', 'verdict-latest.json');
const OUT_DIR = join(ROOT, 'receipts', 'self-heal');
const REPO = process.env.GITHUB_REPOSITORY || 'roshpinacare-sys/Autonomy';
const API = `https://api.github.com/repos/${REPO}`;
const MAX_DISPATCH_PER_RUN = 6;
const SELF_EXCLUDE = new Set(['artery-selfheal']); // loop-guard: אין-הצתה-עצמית

const nowIso = () => new Date().toISOString();

/** סיווג-טהור (נבדק-ב-selftest): מה-רפוא-למה */
export function classify(checks) {
  const healable = [];
  const notHealable = [];
  for (const c of checks ?? []) {
    const level = c.level || 'OK';
    if (level === 'OK') continue;
    const m = /^sbx\.wf-([a-z0-9-]+)$/.exec(c.id || '');
    if (!m || SELF_EXCLUDE.has(m[1])) {
      notHealable.push({ id: c.id, level, why: c.why ?? null, reason: 'not-a-dispatchable-workflow' });
      continue;
    }
    healable.push({ workflow: `${m[1]}.yml`, id: c.id, level, why: c.why ?? null });
  }
  return { healable: healable.slice(0, MAX_DISPATCH_PER_RUN), truncated: Math.max(0, healable.length - MAX_DISPATCH_PER_RUN), notHealable };
}

function ghHeaders(token) {
  return { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'user-agent': 'saos-self-heal' };
}

/** dispatch אחד — מחזיר {ok, status, note} (כנות-מלאה, אף-סימולציה) */
export async function dispatchWorkflow(workflow, token) {
  const meta = await fetch(`${API}/actions/workflows/${workflow}`, { headers: ghHeaders(token) });
  if (meta.status === 404) return { ok: false, status: 404, note: 'workflow-file-not-found' };
  if (!meta.ok) return { ok: false, status: meta.status, note: 'meta-fetch-failed' };
  const mj = await meta.json();
  if (mj.state !== 'active') return { ok: false, status: 200, note: `DISABLED(${mj.state}) — דרוש-החלטת-חוקה (בעלים), לא-ריאה` };
  const d = await fetch(`${API}/actions/workflows/${mj.id}/dispatches`, { method: 'POST', headers: ghHeaders(token), body: JSON.stringify({ ref: 'main' }) });
  // 204 = מוצת; 403 = אין-scope; 422/409 = שרת-מסרב (מתועד-כנה)
  return d.status === 204 ? { ok: true, status: 204, note: 'dispatched' } : { ok: false, status: d.status, note: 'dispatch-refused' };
}

function appendBoundedLedger(entry) {
  mkdirSync(OUT_DIR, { recursive: true });
  const p = join(OUT_DIR, 'ledger.jsonl');
  let lines = [];
  if (existsSync(p)) lines = readFileSync(p, 'utf8').split('\n').filter(Boolean);
  lines.push(JSON.stringify(entry));
  writeFileSync(p, lines.slice(-400).join('\n') + '\n');
}

function publish(receipt) {
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(join(OUT_DIR, 'latest.json'), JSON.stringify(receipt, null, 1) + '\n');
  appendBoundedLedger({ at: receipt.at, ok: receipt.ok, dispatched: (receipt.dispatched ?? []).length, refused: (receipt.refused ?? []).length, notHealable: (receipt.notHealable ?? []).length, truncated: receipt.truncated ?? 0 });
  console.log(`[self-heal] receipt: dispatched=${receipt.dispatched?.length ?? 0} refused=${receipt.refused?.length ?? 0} notHealable=${receipt.notHealable?.length ?? 0}`);
}

async function live() {
  const token = process.env.GITHUB_TOKEN;
  const receipt = { schema: 'self-heal/1', at: nowIso(), repo: REPO, ok: false, verdictAt: null, dispatched: [], refused: [], skipped: [], notHealable: [], truncated: 0 };
  if (!existsSync(VERDICT)) { receipt.reason = 'no-verdict-file (fail-closed)'; publish(receipt); return 1; }
  if (!token) { receipt.reason = 'no-token (fail-closed — live mode requires GITHUB_TOKEN)'; publish(receipt); return 1; }
  let verdict;
  try { verdict = JSON.parse(readFileSync(VERDICT, 'utf8')); } catch (e) { receipt.reason = `verdict-unparseable: ${e.message}`; publish(receipt); return 1; }
  receipt.verdictAt = verdict.at ?? null;
  receipt.verdictOverall = verdict.overall ?? null;
  const { healable, notHealable, truncated } = classify(verdict.checks);
  receipt.notHealable = notHealable;
  receipt.truncated = truncated;
  for (const h of healable) {
    const r = await dispatchWorkflow(h.workflow, token);
    const rec = { workflow: h.workflow, check: h.id, level: h.level, status: r.status, note: r.note, ok: r.ok };
    (r.ok ? receipt.dispatched : receipt.refused).push(rec);
  }
  receipt.ok = true; // הריצה-עצמה-אמתה; כל-סירוב-מתועד-כנה בתוכה
  // מפקד-שעונים (t10-נותר): מצב-הפעלה-של-כל-השעונים — הריאה-מדווחת-על-כיבויים
  // (נמדד 17/10: 9-שעונים-כבו-בשקט-ואף-ביקורת-לא-כיסתה — עכשיו-הריאה-מפרסמת-זאת-בכל-ריצה)
  try {
    const wl = await fetch(`${API}/actions/workflows?per_page=100`, { headers: ghHeaders(token) }).then((x) => x.json());
    const all = (wl.workflows || []).map((w) => ({ path: w.path, state: w.state }));
    receipt.workflows = { total: all.length, active: all.filter((w) => w.state === 'active').length, disabled: all.filter((w) => w.state !== 'active').map((w) => w.path) };
  } catch (e) { receipt.workflows = { error: String(e?.message || e).slice(0, 120) }; }
  // מפקד-מפתחות (t12-P1): סקר-שמות-סודות בלבד (GitHub מעולם-לא-מחזיר ערכים) —
  // נוכחות/היעדר = קבלה-רועשת; איברים-עם-צורך-מוצהר עוברים PENDING→LIVE לפי-זה.
  // FLEET_PAT קודם (GITHUB_TOKEN נענה 403 — אין-סקופ-admin; נמדד בריצה-הראשונה)
  try {
    const { censusSecrets } = await import('./runtime/keys.mjs');
    const c = await censusSecrets(process.env.FLEET_PAT || token);
    receipt.keys = c.ok ? { total: c.total, required: c.required.map((r) => ({ name: r.name, present: r.present })), via: process.env.FLEET_PAT ? 'FLEET_PAT' : 'GITHUB_TOKEN' } : { error: c.reason };
  } catch (e) { receipt.keys = { error: String(e?.message || e).slice(0, 120) }; }
  publish(receipt);
  // יציאה 0 תמיד-כשהריאה-רצה: אדומיות-של-עורקים-היא-מצב-מדידה, לא-כישלון-הריאה
  return 0;
}

/** selftest: אפס-רשת — מאמת-חוקי-סיווג על פסיקות-קבועות */
export function selftest() {
  const mk = (id, level) => ({ id, level, why: 'test' });
  const a = classify([mk('sbx.wf-artery-watch', 'FAIL'), mk('sbx.wf-value-scan', 'DEGRADED'), mk('sbx.wf-verifier', 'OK'), mk('dev.rate', 'DEGRADED'), mk('sbx.wf-artery-selfheal', 'FAIL'), mk('steem.treasury', 'DEGRADED')]);
  const names = a.healable.map((h) => h.workflow).sort();
  if (JSON.stringify(names) !== JSON.stringify(['artery-watch.yml', 'value-scan.yml'])) throw new Error(`classify-healable: ${JSON.stringify(names)}`);
  if (a.notHealable.length !== 3) throw new Error(`notHealable: ${a.notHealable.length}`);
  if (a.notHealable.some((n) => n.reason !== 'not-a-dispatchable-workflow')) throw new Error('notHealable reason drift');
  // תקרה-6
  const many = classify(Array.from({ length: 9 }, (_, i) => mk(`sbx.wf-vein-${i}`, 'FAIL')));
  if (many.healable.length !== 6 || many.truncated !== 3) throw new Error('cap law broken');
  console.log('[self-heal] selftest: PASS (classify laws: names, OK-skip, non-wf, self-exclude, cap=6)');
  return 0;
}

const isMain = process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href;
if (isMain) {
  process.exit(process.argv.includes('--selftest') ? selftest() : await live());
}
