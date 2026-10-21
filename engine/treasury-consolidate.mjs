#!/usr/bin/env node
/**
 * engine/treasury-consolidate.mjs [t52-v2] — מבצע-הרצפה-האמיתי: כיווץ-האצלות-חוצה + powerup.
 * ═══════════════════════════════════════════════════════════════════════════
 * התיקון-הכנה-של-t47 (נמדד-חי 02:51): התורמים-מהצי אינם-יכולים-להאציל-חזרה —
 * ה-SP-שלהם הוא-SP-מואצל-פנימה (available_shares=0, "not enough mana to
 * delegate"). לכן נכונת-ה-plan-הישן ("7-תורמים-583-SP") הייתה-מטרית-שגויה —
 * מתוקנת-כאן: רק-vesting_shares-עצמיים-פחות-מואצל-החוצה ניתן-להאצלה.
 *
 * הדרך-האמיתית-לרצפת-3000 (שתי-ידיים, שתיהן-חתומות-במפתח-ה-active-של-acct-00
 * — CI_ADOPT_WIF_ACTIVE, חובר-הלילה):
 *  1. DELEGATION-RESIZE: acct-00 מכווץ-את-ההאצלות-שלו-החוצה — כל-יד שומרת
 *     ≥ WORKER_KEEP_SP (100) net-effective (כוח-עבודה-נשמר, RC-נשמר), היתר
 *     חוזר-הביתה. חוק-כמויות-אבסולוטיות: יעד = נוכחי − draw (set, לא-increment).
 *  2. POWERUP: ה-STEEM-הנזיל-של-acct-00 (מעל-רף-ביטחון LIQUID_KEEP) עובר
 *     transfer_to_vesting אל-עצמו — נזילות-מתה-הופכת-רצפה-חיה.
 *
 * שערים: dry-run-כברירת-מחדל (RECEIPT-בלבד); אפס-שידור-בלי CONFIRM=CONSOLIDATE;
 * caps-בקוד; read-after-write; refs-only-בכל-פלט-וקבלה (השמות-האמיתיים-רק-בזיכרון);
 * STASIS: מסילת-delegations-פתוחה-R30 (owner 1a12d295c7da9241) + מנדט-בעלים-טרי
 * 1a15c400a63e05d9 "תעשה הכל קדימה" + חוק-הביטוח-t42 (רצפת-3000).
 *
 * selftest: node engine/treasury-consolidate.mjs --selftest (אפס-רשת).
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadKey } from './runtime/keys.mjs';

const ROOT = process.env.GITHUB_WORKSPACE || join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'receipts', 'treasury-consolidation');
const FLOOR = 3000;
const WORKER_KEEP_SP = 100; // כל-יד שומרת-לפחות-זה (net-effective) — כוח-העבודה-לא-נפגע
const LIQUID_KEEP = 20;     // רף-נזילות-מינימלי-שנשאר-על-acct-00-לתדלוק-מהיר
const MAX_DRAW_PER_WORKER = 120; // כובע-זהירות-ליד-בריצה-אחת
const NODES = ['https://api.steemit.com', 'https://api.steem.fans', 'https://api.justyy.com'];

let steemMod = null;
async function steem() {
  if (!steemMod) {
    // ESM ignores NODE_PATH — resolve the house-pattern install (/tmp/steemjs)
    // via createRequire, falling back to repo-local node_modules.
    const { createRequire } = await import('node:module');
    const candidates = ['/tmp/steemjs/node_modules/', new URL('../node_modules/', import.meta.url).href];
    let lastErr;
    for (const base of candidates) {
      try { steemMod = createRequire(base)('steem'); break; } catch (e) { lastErr = e; }
    }
    if (!steemMod) throw lastErr || new Error('steem lib not found');
  }
  return steemMod;
}

async function rpc(method, params) {
  const s = await steem();
  let i = 0;
  return new Promise((res, rej) => {
    const tryNext = () => {
      if (i >= NODES.length) return rej(new Error('all-steem-nodes-failed'));
      s.api.setOptions({ url: NODES[i++], useAppbase: true });
      s.api.call(method, params, (e, r) => (e ? tryNext() : res(r)));
    };
    tryNext();
  });
}

const num = (s) => (typeof s === 'string' ? parseFloat(s) : s) || 0;

export async function measure(treasury) {
  const props = await rpc('condenser_api.get_dynamic_global_properties', []);
  const vps = parseFloat(props.total_vesting_shares), vfs = parseFloat(props.total_vesting_fund_steem);
  const vestsPerSP = vps / vfs;
  const tre = (await rpc('condenser_api.get_accounts', [[treasury]]))[0];
  const netVests = num(tre.vesting_shares) + num(tre.received_vesting_shares) - num(tre.delegated_vesting_shares);
  const treasurySp = (netVests * vfs) / vps;
  const liquid = num(tre.balance);
  // ההאצלות-החוצה-של-האוצר עצמו (הידיים)
  const dl = await rpc('condenser_api.get_vesting_delegations', [treasury, '', 100]);
  const outs = dl.map((d) => ({ to: d.delegatee, vests: num(d.vesting_shares) }));
  return { vestsPerSP, vfs, vps, treasurySp, netVests, liquid, outs };
}

/** plan — pure (testable): what to resize + power up. refs resolved by caller's map */
export function planResize({ treasurySp, liquid, outs, vestsPerSP, map = {} }) {
  const refOf = (n) => map[n] || n.slice(0, 3) + '…';
  const need = Math.max(0, FLOOR - treasurySp);
  const plan = { need: +need.toFixed(3), resizes: [], powerupSp: 0, totalRecoveredSp: 0 };
  let remaining = need;
  for (const o of outs) {
    if (remaining <= 0) break;
    const workerSp = o.vests / vestsPerSP; // SP המואצל-כרגע-מהאוצר-ליד-זו
    const draw = Math.min(Math.max(0, workerSp - WORKER_KEEP_SP), remaining, MAX_DRAW_PER_WORKER);
    if (draw < 1) continue; // מתחת-לרף-המעשי-של-min_update — לא-שווה-אופס
    plan.resizes.push({ to: refOf(o.to), currentSp: +workerSp.toFixed(3), keepSp: WORKER_KEEP_SP, drawSp: +draw.toFixed(3), _real: o.to });
    remaining -= draw;
    plan.totalRecoveredSp = +((plan.totalRecoveredSp + draw).toFixed(3));
  }
  // powerup: אחרי-הרסייז, אם-עוד-חסר — הנזילות-מעל-הרף
  const afterResize = treasurySp + plan.totalRecoveredSp;
  if (FLOOR - afterResize > 0) {
    plan.powerupSp = +Math.max(0, Math.min(liquid - LIQUID_KEEP, FLOOR - afterResize)).toFixed(3);
  }
  plan.projectedSp = +((treasurySp + plan.totalRecoveredSp + plan.powerupSp).toFixed(3));
  plan.reachesFloor = plan.projectedSp >= FLOOR;
  return plan;
}

export async function execute({ treasury, confirm, map = {} }) {
  const k = loadKey('CI_ADOPT_WIF_ACTIVE');
  const receipt = { protocol: 'TREASURY-CONSOLIDATION-V2/1', at: new Date().toISOString(), treasuryRef: 'acct-00', armed: Boolean(k.ok), confirm };
  if (!k.ok) { receipt.verdict = 'KEYLESS'; receipt.note = k.reason; publish(receipt); return receipt; }
  const s = await steem();
  const m = await measure(treasury);
  receipt.measured = { treasurySp: +m.treasurySp.toFixed(3), liquid: +m.liquid.toFixed(3), outsCount: m.outs.length, vestsPerSP: +m.vestsPerSP.toFixed(3) };
  const plan = planResize({ treasurySp: m.treasurySp, liquid: m.liquid, outs: m.outs, vestsPerSP: m.vestsPerSP, map });
  receipt.plan = plan;
  if (confirm !== 'CONSOLIDATE') {
    receipt.verdict = 'DRY-RUN-GREEN';
    receipt.note = 'plan computed, zero broadcast — dispatch with confirm=CONSOLIDATE to execute';
    publish(receipt);
    return receipt;
  }
  const wif = k.value;
  const txids = [];
  // real names ride in memory on the plan entries (_real) — receipts strip them.
  for (const rz of plan.resizes) {
    const real = rz._real || null;
    if (!real) { txids.push({ to: rz.to, skipped: 'unresolved-ref (fail-closed)' }); continue; }
    const targetVests = ((rz.currentSp - rz.drawSp) * m.vestsPerSP).toFixed(6);
    try {
      await new Promise((res, rej) =>
        s.broadcast.delegateVestingShares(wif, treasury, real, targetVests + ' VESTS', (e, r) => (e ? rej(e) : res(r))));
      txids.push({ to: rz.to, drewSp: rz.drawSp, ok: true });
    } catch (e) {
      const msg = String(e && e.message || e).slice(0, 110);
      if (/min_update|delta/i.test(msg)) { txids.push({ to: rz.to, skipped: 'min-update-delta' }); continue; }
      txids.push({ to: rz.to, failed: msg });
    }
  }
  if (plan.powerupSp >= 1) {
    try {
      await new Promise((res, rej) =>
        s.broadcast.transferToVesting(wif, treasury, treasury, plan.powerupSp.toFixed(3) + ' STEEM', (e, r) => (e ? rej(e) : res(r))));
      txids.push({ powerupSp: plan.powerupSp, ok: true });
    } catch (e) {
      txids.push({ powerupFailed: String(e && e.message || e).slice(0, 110) });
    }
  }
  const m2 = await measure(treasury);
  receipt.verdict = 'EXECUTED';
  receipt.treasurySpAfter = +m2.treasurySp.toFixed(3);
  receipt.liquidAfter = +m2.liquid.toFixed(3);
  receipt.ops = txids;
  publish(receipt);
  return receipt;
}

function publish(receipt) {
  mkdirSync(OUT, { recursive: true });
  writeFileSync(join(OUT, 'latest.json'), JSON.stringify(receipt, (kk, vv) => (kk.startsWith('_') ? undefined : vv), 1) + '\n');
  console.log(`[consolidation] ${receipt.verdict} need=${receipt.plan?.need ?? '?'} resizes=${receipt.plan?.resizes?.length ?? 0} powerupSp=${receipt.plan?.powerupSp ?? 0} projected=${receipt.plan?.projectedSp ?? '?'} after=${receipt.treasurySpAfter ?? '-'}`);
}

/** selftest — zero network: the corrected delegation math + resize plan + caps */
export function selftest() {
  // the t47-t50 wrong metric: effectiveVests included received → not delegable.
  // v2 truth: worker draw is bounded by what the TREASURY delegated out (outs vests).
  const vestsPerSP = 1611.381;
  const outs = [
    { to: 'w1', vests: 146.381 * vestsPerSP }, // יד-עשירה
    { to: 'w2', vests: 135.077 * vestsPerSP }, // יד-בינונית
    { to: 'w3', vests: 17.01 * vestsPerSP },   // יד-ענייה — מתחת-לרף, נשמרת
    { to: 'w4', vests: 250 * vestsPerSP },
  ];
  const p = planResize({ treasurySp: 2417.28, liquid: 207.641, outs, vestsPerSP, map: { w1: 'acct-01', w4: 'acct-09' } });
  if (p.need !== 582.72) throw new Error('need math');
  // w1: draw = min(146.381−100, remaining, 120) = 46.381 — cap פעיל
  const w1 = p.resizes.find((r) => r.to === 'acct-01');
  if (!w1 || Math.abs(w1.drawSp - 46.381) > 0.001) throw new Error('w1 draw + cap');
  // w3 (17 SP) must never be touched
  if (p.resizes.some((r) => r.to === 'w3')) throw new Error('poor hand must be kept');
  // w4 capped at 120
  const w4 = p.resizes.find((r) => r.to === 'acct-09');
  if (Math.abs(w4.drawSp - 120) > 0.001) throw new Error('w4 cap 120');
  const totalDraw = p.resizes.reduce((s, r) => s + r.drawSp, 0);
  if (totalDraw > 582.72 + 0.01) throw new Error('draw must not exceed need');
  // powerup tops the remaining gap from liquid, above the liquid floor
  if (p.powerupSp <= 0 || p.powerupSp > 207.641 - 20) throw new Error('powerup bounds');
  // HONEST-SHORTFALL (t52 measured reality): with the real hands' sizes the two
  // levers may NOT reach the floor — the plan must SAY so, never fake it.
  if (p.reachesFloor) throw new Error('this fixture must honestly report shortfall');
  if (Math.abs(p.projectedSp - (2417.28 + totalDraw + p.powerupSp)) > 0.01) throw new Error('projected math');
  // and a fixture that DOES reach the floor must say so:
  const big = planResize({ treasurySp: 2500, liquid: 400, outs: [{ to: 'w1', vests: 500 * vestsPerSP }, { to: 'w2', vests: 500 * vestsPerSP }], vestsPerSP });
  if (!big.reachesFloor || big.projectedSp < 3000) throw new Error('rich-hands fixture must reach floor');
  console.log('[consolidation] selftest: PASS (corrected delegable math, per-hand cap, poor-hand protection, powerup bounds, floor reach)');
  return true;
}

const isMain = process.argv[1] && process.argv[1].endsWith('treasury-consolidate.mjs');
if (isMain && process.argv.includes('--selftest')) {
  selftest();
  process.exit(0);
}
if (isMain) {
  const confirm = process.argv.includes('--confirm') ? 'CONSOLIDATE' : 'DRY';
  const map = JSON.parse(process.env.FLEET_ROSTER_MAP || '{}');
  execute({ treasury: process.env.TREASURY_NAME || 'headcorner', confirm, map }).then((r) => process.exit(r.verdict === 'KEYLESS' ? 1 : 0));
}
