#!/usr/bin/env node
/**
 * world-evolver.mjs — מפתח-העולם האוטונומי [t11 · הבעלים: "הם צריכים לפתח את
 * העולם הזה בעצמם"].
 *
 * שני-מצבים (כנות-מלאה בקבלה):
 *   A) llm      — אם NVIDIA_NIM_KEY קיים וקטלוג-המודלים-חי → הצעות-התפתחות ממודל
 *                 (נמדד 18/10: הקטלוג-של-החשבון-מת — 12-מודלים 410/404; המצב
 *                 יתעורר-אוטומטית כשהקטלוג-יחזור)
 *   B) kingdom  — התפתחות-קבועה-מהאמת: העולם גדל-עם-כל-משמרת-מאומתת (צמחים
 *                 צומחים, שלט-רגעים-חי מקבלות-אמת, פארק-רהיטים-ממתינים,
 *                 יומן-התפתחות-מצורף) — עובד-תמיד, אפס-תלות-חיצונית
 *
 * חוקי-עולם: גדל-בלבד (append/expand), כל-שינוי-עם-קבלה, גרסה-עולה,
 * אפס-מחיקות. פלט: world.json-חדש ל-stdout-קובץ + קבלה ל-receipts/world/.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = process.env.GITHUB_WORKSPACE || join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'receipts', 'world');
const RAW = 'https://raw.githubusercontent.com/roshpinacare-sys';
const nowIso = () => new Date().toISOString();

const jget = async (url, ms = 9000) => {
  const c = new AbortController(); const t = setTimeout(() => c.abort(), ms);
  try { const r = await fetch(`${url}?t=${Date.now()}`, { signal: c.signal }); if (!r.ok) throw new Error(`HTTP ${r.status}`); return await r.json(); }
  finally { clearTimeout(t); }
};

/** האמת-החיה שממנה-העולם גדל */
async function gatherTruth() {
  const out = { shifts: null, booksFresh: null, booksTotal: null, busEntries: null, lungDispatched: null, verdict: null };
  try { const o = await jget(`${RAW}/Domain/main/agents/office-live.json`); out.shifts = o?.shifts?.total ?? null; out.booksFresh = o?.books?.fresh ?? null; out.booksTotal = o?.books?.total ?? null; } catch { }
  try { const v = await jget(`${RAW}/Autonomy/main/state/verifier/verdict-latest.json`); out.verdict = v?.overall ?? null; } catch { }
  try { const l = await jget(`${RAW}/Autonomy/main/receipts/self-heal/latest.json`); out.lungDispatched = (l?.dispatched ?? []).length; } catch { }
  return out;
}

/** מצב-B: התפתחות-ממלכתית-קבועה — העולם-צומח-עם-העבודה-האמתית */
export function evolveKingdom(world, truth) {
  const w = structuredClone(world);
  const log = [];
  const shifts = truth.shifts ?? 0;

  // 1) צמחים-צומחים: כל-משמרת-מאומתת מוסיפה-ירוק (חסם-בריאות)
  for (const p of w.props || []) {
    if (p.kind === 'plant' && (p.s ?? 1) < 2.0) { p.s = Math.round(((p.s ?? 1) + 0.035) * 1000) / 1000; }
  }

  // 2) עולם-מפורסם-ברגעים: שלט-הרגעים מקבל-את-הקבלה-החיה-האחרונה
  const moment = `משמרות-מאומתות: ${shifts} · ספרים-טריים: ${truth.booksFresh ?? '?'}/${truth.booksTotal ?? '?'} · פסק: ${truth.verdict ?? '?'}`;
  w.moments = [...(w.moments || []).slice(-5), { at: nowIso(), text: moment }];

  // 3) אבני-דרך: כל-25-משמרות — עץ-חדש (העולם מתרחב, לעולם-לא-מתכווץ)
  const milestones = Math.floor(shifts / 25);
  const have = (w.props || []).filter((p) => p.kind === 'plant').length;
  const bank = [[-11.2, -2.2], [11.3, 2.4], [-10.4, -4.9], [10.2, -2.1], [-11.5, 3.2], [11.5, -4.8]];
  for (let i = have; i < Math.min(milestones + 2, bank.length + 2); i++) {
    const [x, z] = bank[(i - 2 + bank.length) % bank.length] || [0, -6.5];
    if (!(w.props || []).some((p) => p.kind === 'plant' && Math.abs(p.x - x) < 0.2 && Math.abs(p.z - z) < 0.2)) {
      (w.props = w.props || []).push({ kind: 'plant', x, z, s: 0.9 + (i % 3) * 0.1 });
      log.push(`עץ-נשתל (אבן-דרך ${shifts} משמרות) @${x},${z}`);
    }
  }

  // 4) יומן-התפתחות-מצורף (אף-פעם-לא-נמחק)
  w.version = (w.version ?? 1) + 1;
  w.evolvedAt = nowIso();
  w.evolvedBy = 'world-evolver (kingdom mode)';
  (w.evolutionLog = w.evolutionLog || []).push({ at: nowIso(), by: 'world-evolver', change: `v${w.version} — ${moment}${log.length ? ' · ' + log.join(' · ') : ''}` });
  return { world: w, changes: [moment, ...log], mode: 'kingdom' };
}

/** מצב-A: LLM מציע-התפתחות (מופעל-אוטומטית-כשהקטלוג-חי) */
export async function evolveLlm(world, truth, key) {
  const candidates = ['deepseek-ai/deepseek-v4.1-flash', 'meta/llama-3.3-70b-instruct', 'openai/gpt-oss-120b'];
  const prompt = `אתה אדריכל-עולם של משרד-תלת-מימדי חי (Three.js). העולם: ${JSON.stringify({ version: world.version, props: (world.props || []).length, desks: (world.desks || []).length })}. האמת: ${JSON.stringify(truth)}.
הצע עד-2-שינויים-קטנים-בטוחים ב-json: {"add":[{"kind":"poster|plant|lamp","x":..,"z":..,"title":"..","sub":".."}],"note":".."} — עברית-בלבד, קואורדינטות בתוך חדר 24x15, x∈[-11,11], z∈[-7,7]. רק-json.`;
  for (const model of candidates) {
    try {
      const r = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, messages: [{ role: 'user', content: prompt }], max_tokens: 400, temperature: 0.6 }),
        signal: AbortSignal.timeout(30000),
      });
      if (!r.ok) continue;
      const d = await r.json();
      const txt = d?.choices?.[0]?.message?.content || '';
      const m = /\{[\s\S]*\}/.exec(txt);
      if (!m) continue;
      const proposal = JSON.parse(m[0]);
      return { proposal, model, mode: 'llm' };
    } catch { /* מודל-הבא */ }
  }
  return null;
}

/** הצעת-LLM → שינוי-עולם-בטוח (סכמה-נאכפת, גידול-בלבד) */
export function applyProposal(world, proposal) {
  const w = structuredClone(world);
  const added = [];
  const kinds = new Set(['poster', 'plant', 'lamp']);
  for (const a of (proposal?.add || []).slice(0, 2)) {
    if (!kinds.has(a.kind)) continue;
    if (![a.x, a.z].every((v) => Number.isFinite(v) && Math.abs(v) <= 12)) continue;
    (w.props = w.props || []).push(a.kind === 'poster'
      ? { kind: 'poster', x: a.x, z: a.z, w: 1.6, h: 1.0, rotY: 0, title: String(a.title || 'רגע-חי').slice(0, 18), sub: String(a.sub || 'על-הגיט').slice(0, 24) }
      : { kind: a.kind, x: a.x, z: a.z, s: 1 });
    added.push(`${a.kind}@${a.x},${a.z}`);
  }
  w.version = (w.version ?? 1) + 1;
  w.evolvedAt = nowIso();
  w.evolvedBy = `world-evolver (llm:${proposal.model})`;
  (w.evolutionLog = w.evolutionLog || []).push({ at: nowIso(), by: 'world-evolver', change: `v${w.version} — llm:${added.join(' ') || 'הצעה-ללא-שינויים-בטוחים'}` });
  return { world: w, added, mode: 'llm' };
}

async function live() {
  const receipt = { schema: 'world-evolver/1', at: nowIso(), ok: false, mode: null };
  try {
    const world = await jget(`${RAW}/Domain/main/office3d/world/world.json`);
    const truth = await gatherTruth();
    receipt.truth = truth;
    const key = process.env.NVIDIA_NIM_KEY;
    let result = key ? await evolveLlm(world, truth, key).then((p) => p ? applyProposal(world, p) : null).catch(() => null) : null;
    if (!result) result = evolveKingdom(world, truth);
    receipt.mode = result.mode;
    receipt.changes = result.changes ?? result.added ?? [];
    receipt.version = result.world.version;
    // פלט-העולם-החדש (ה-workflow כותב-אותו-ל-Domain)
    const outPath = process.env.EVOLVE_OUT || join(ROOT, 'receipts', 'world', 'world-next.json');
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, JSON.stringify(result.world, null, 1) + '\n');
    receipt.outPath = outPath;
    receipt.ok = true;
  } catch (e) {
    receipt.error = String(e?.message || e).slice(0, 300);
  }
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(join(OUT_DIR, 'latest.json'), JSON.stringify(receipt, null, 1) + '\n');
  console.log(`[world-evolver] mode=${receipt.mode} v${receipt.version ?? '?'} ok=${receipt.ok} changes=${(receipt.changes || []).length}`);
  return receipt.ok ? 0 : 1;
}

function selftest() {
  const w = { schema: 'office3d.world/2', version: 2, props: [{ kind: 'plant', x: 1, z: 1, s: 1 }], desks: [], evolutionLog: [] };
  const r1 = evolveKingdom(w, { shifts: 103, booksFresh: 8, booksTotal: 13, verdict: 'FAIL' });
  if (r1.world.version !== 3) throw new Error('version must increment');
  if (r1.world.props[0].s <= 1) throw new Error('plant must grow');
  if (r1.world.moments.length !== 1) throw new Error('moments must append');
  const r2 = evolveKingdom(r1.world, { shifts: 103, booksFresh: 8, booksTotal: 13, verdict: 'FAIL' });
  if (r2.world.version !== 4 || r2.world.evolutionLog.length !== 2) throw new Error('log must append');
  const p = applyProposal(r2.world, { model: 'test', add: [{ kind: 'poster', x: 3, z: -6.8, title: 'נס', sub: 'ב' }] });
  if (p.world.props.at(-1).kind !== 'poster' || p.world.version !== 5) throw new Error('proposal apply failed');
  const bad = applyProposal(r2.world, { model: 't', add: [{ kind: 'rocket', x: 3, z: 3 }] });
  if (bad.world.props.length !== r2.world.props.length) throw new Error('unknown kind must be rejected');
  console.log('[world-evolver] selftest: PASS (grow-only, version++, moments append, schema-enforced)');
  return 0;
}

const isMain = process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href;
if (isMain) process.exit(process.argv.includes('--selftest') ? selftest() : await live());
