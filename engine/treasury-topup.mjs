#!/usr/bin/env node
/**
 * treasury-topup.mjs — מבצע-איזון-האוצר [P2 · owner-approved t12 · recovery-plan §3]
 * ═══════════════════════════════════════════════════════════════════════════════════
 * LAW: treasury holds ≥3000 SP (verifier: steem.treasury DEGRADED below floor).
 * Measured 2026-10-18: 2855 SP < 3000.
 *
 * Honest ladder:
 *   1. resolve roster refs→real names via engine/refs.mjs (FLEET_ROSTER_MAP env,
 *      git-ignored local map; UNRESOLVED = honest PENDING receipt — never a guess)
 *   2. read treasury SP from Steem RPC (read-only, keyless — safe)
 *   3. compute exact top-up plan: fleet accounts above the 100-SP floor delegate
 *      their surplus until the treasury reaches 3000 (§3 law verbatim)
 *   4. receipts are PUBLIC — real account names are estate secrets: receipts show
 *      refs (acct-NN) only, via refOf() (the refs.mjs scrub law)
 *   5. key readiness: CI_ADOPT_WIF_ACTIVE (declared in engine/runtime/keys.mjs —
 *      the name already lives as a cloud secret per keys REGISTRY law: never
 *      demand a key that exists). PRESENT → READY receipt; ABSENT → loud PENDING.
 *
 * fail-honest: RPC unreachable / roster unresolved = {reason} exit 0 (measured state).
 * selftest: zero network — plan math + scrub law on fixtures.
 */
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { R, refOf } from './refs.mjs';
import { loadKey, REQUIRED_SECRETS } from './runtime/keys.mjs';
import { treasuryFlow } from './treasury-forensics.mjs';

const ROOT = process.env.GITHUB_WORKSPACE || join(dirname(fileURLToPath(import.meta.url)), '..');
const CFG_PATH = join(ROOT, 'ops', 'agents', 'zai-verifier', 'config.json');
const OUT = join(ROOT, 'receipts', 'treasury');

export const TREASURY_REF = 'acct-00';
export const TREASURY_MIN_SP = 3000;
export const FLEET_MIN_SP = 100; // §3: active fleet accounts keep ≥100 SP

async function rpc(method, params, hosts) {
  let last = null;
  for (const h of hosts) {
    try {
      const res = await fetch(h, {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', method, params, id: 1 }),
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) { last = `http-${res.status}@${new URL(h).host}`; continue; }
      const j = await res.json();
      if (j.error) { last = `rpc-error@${new URL(h).host}`; continue; }
      return { ok: true, result: j.result };
    } catch (e) { last = `unreachable@${new URL(h).host}`; }
  }
  return { ok: false, reason: last ?? 'no-hosts' };
}

/** Steem convention: SP = vests_number × fund/shares (raw VESTS string number) */
export function vestsToSp(vests, props) {
  const fund = parseFloat(props.total_vesting_fund_steem);
  const shares = parseFloat(props.total_vesting_shares);
  return (vests * fund) / shares;
}

/**
 * planTopup({treasurySp, fleet:[{name, sp}]}, floor, fleetMin) — PURE, selftest-anchored.
 * Fleet accounts above fleetMin contribute their surplus until need is met.
 * Names in this function's output are whatever the caller passed (callers pass
 * REFS into public receipts — the scrub law lives at the call sites).
 */
export function planTopup({ treasurySp, fleet }, floor = TREASURY_MIN_SP, fleetMin = FLEET_MIN_SP) {
  const need = Math.max(0, floor - treasurySp);
  const contributors = (fleet ?? []).filter((a) => a.sp > fleetMin).map((a) => ({ name: a.name, surplus: a.sp - fleetMin }));
  const ops = [];
  let remaining = need;
  for (const c of contributors) {
    if (remaining <= 0) break;
    const give = Math.min(c.surplus, remaining);
    if (give <= 0) continue;
    ops.push({ op: 'delegate_vesting_shares', delegator: c.name, delegatee: TREASURY_REF, sp: Math.round(give * 1000) / 1000 });
    remaining -= give;
  }
  return { need: Math.round(need * 1000) / 1000, covered: Math.round((need - remaining) * 1000) / 1000, feasible: remaining <= 0.001, ops, contributors: contributors.length };
}

async function live() {
  const receipt = { schema: 'treasury.topup/1', at: new Date().toISOString(), ok: false, treasury: TREASURY_REF, floor: TREASURY_MIN_SP };
  // 0. roster resolution (real names are process-memory only)
  let cfg;
  try { cfg = JSON.parse(readFileSync(CFG_PATH, 'utf8')); } catch (e) { receipt.reason = `config-unreadable: ${e.message}`; publish(receipt); return 0; }
  const hosts = cfg.steem?.rpc ?? [];
  if (!R(cfg.steem?.treasury)) {
    receipt.reason = 'roster-unresolved (FLEET_ROSTER_MAP missing on this runner) — PENDING, never a guess';
    publish(receipt); return 0;
  }
  const treasuryName = R(cfg.steem.treasury); // memory-only
  // 1. chain truth (read-only)
  const [dyn, acct] = await Promise.all([
    rpc('condenser_api.get_dynamic_global_properties', [], hosts),
    rpc('condenser_api.get_accounts', [[treasuryName]], hosts),
  ]);
  if (!dyn.ok || !acct.ok) { receipt.reason = `rpc-unreachable: ${dyn.reason ?? acct.reason}`; publish(receipt); return 0; }
  if (!Array.isArray(acct.result) || !acct.result[0]) { receipt.reason = `treasury-not-on-chain (ref ${TREASURY_REF} unresolved name) — PENDING owner clarification`; publish(receipt); return 0; }
  const sp = vestsToSp(parseFloat(acct.result[0].vesting_shares), dyn.result);
  receipt.treasurySp = Math.round(sp * 1000) / 1000;
  receipt.healthy = receipt.treasurySp >= TREASURY_MIN_SP;
  // 2. fleet headroom (real names fetched → scrubbed to refs before receipt)
  const fleetRes = await rpc('condenser_api.get_accounts', [cfg.steem.accounts.map((r) => R(r)).filter(Boolean)], hosts);
  let fleetRefs = [];
  if (fleetRes.ok && Array.isArray(fleetRes.result)) {
    const realAccounts = cfg.steem.accounts.map((r) => R(r)).filter(Boolean);
    fleetRefs = fleetRes.result.map((a, i) => ({
      ref: refOf(realAccounts[i] ?? `acct-unknown-${i}`),
      sp: Math.round(vestsToSp(parseFloat(a.vesting_shares), dyn.result) * 1000) / 1000,
    }));
  }
  receipt.fleet = fleetRefs; // refs only — estate names never enter the receipt
  receipt.plan = planTopup({ treasurySp: receipt.treasurySp, fleet: fleetRefs.map((f, i) => ({ name: f.ref, sp: f.sp })) });
  // NOTE: plan ops use refs — the executor (with key present) re-resolves names in memory
  // 3. DRAIN FORENSICS (t14): who moved the treasury's vesting? measured from
  //    the chain every run — the 4029→2855 drop will never be a mystery again.
  const fx = await treasuryFlow(treasuryName, hosts, { hours: 48, resolver: R });
  receipt.flow48h = fx.ok
    ? { ok: true, host: fx.host, windowHours: fx.windowHours, outEvents: fx.events.filter(e => e.dir === 'out').length, inEvents: fx.events.filter(e => e.dir === 'in').length, events: fx.events, note: 'vests strings as-returned · counterparty refs-only' }
    : { ok: false, reason: fx.reason };
  // 4. key readiness (declared name; the value itself never printed/persisted)
  const k = loadKey('CI_ADOPT_WIF_ACTIVE');
  receipt.keyStatus = k.ok ? 'READY (present at runtime, memory-only)' : 'PENDING — cloud secret CI_ADOPT_WIF_ACTIVE not present on this runner (keys REGISTRY: exists in saos-runtime cloud)';
  receipt.ready = Boolean(k.ok) && receipt.healthy === false;
  receipt.ok = true;
  publish(receipt);
  return 0;
}

function publish(receipt) {
  mkdirSync(OUT, { recursive: true });
  writeFileSync(join(OUT, 'latest.json'), JSON.stringify(receipt, null, 1) + '\n');
  console.log(`[treasury] ${receipt.reason ?? `SP=${receipt.treasurySp ?? '?'} healthy=${receipt.healthy ?? '?'} key=${String(receipt.keyStatus).slice(0, 20)}… plan.need=${receipt.plan?.need ?? '?'}`}`);
}

/* ── selftest: zero network — plan math + scrub law on fixtures ──────────── */
export function selftest() {
  const props = { total_vesting_fund_steem: '200000000', total_vesting_shares: '400000000000000' }; // 1 VEST = 5e-7 SP
  if (Math.abs(vestsToSp(2e6, props) - 1) > 1e-9) throw new Error('vestsToSp math');
  // below floor, fleet has headroom → feasible plan (refs as names — public-safe)
  const p1 = planTopup({ treasurySp: 2855, fleet: [{ name: 'acct-01', sp: 250 }, { name: 'acct-02', sp: 400 }, { name: 'acct-03', sp: 50 }] });
  if (Math.abs(p1.need - 145) > 0.001) throw new Error(`need wrong: ${p1.need}`);
  if (!p1.feasible) throw new Error('plan must be feasible');
  if (p1.contributors !== 2) throw new Error('acct-03 (sp=50<100) must not contribute');
  if (p1.ops[0].delegatee !== 'acct-00' || p1.ops[0].op !== 'delegate_vesting_shares') throw new Error('op shape');
  const gave = p1.ops.reduce((s, o) => s + o.sp, 0);
  if (Math.abs(gave - 145) > 0.001) throw new Error(`covered ${gave} != need 145`);
  // fleet exhausted → infeasible, honest
  const p2 = planTopup({ treasurySp: 2000, fleet: [{ name: 'acct-01', sp: 150 }] });
  if (p2.feasible) throw new Error('must be infeasible when headroom < need');
  // already healthy → zero ops
  const p3 = planTopup({ treasurySp: 3100, fleet: [{ name: 'acct-01', sp: 500 }] });
  if (p3.need !== 0 || p3.ops.length !== 0) throw new Error('healthy must need nothing');
  // scrub law at the call site: real names enter memory, refs enter the plan
  process.env.FLEET_ROSTER_MAP = JSON.stringify({ 'real-estate-name': 'acct-07' });
  const p4 = planTopup({ treasurySp: 2990, fleet: [{ name: refOf('real-estate-name'), sp: 500 }] });
  if (JSON.stringify(p4.ops).includes('real-estate-name')) throw new Error('scrub law broken — real name in plan');
  if (p4.ops[0]?.delegator !== 'acct-07') throw new Error('call-site refOf pattern broken');
  if (!REQUIRED_SECRETS.some((s) => s.name === 'CI_ADOPT_WIF_ACTIVE')) throw new Error('registry missing CI_ADOPT_WIF_ACTIVE');
  console.log('[treasury] selftest: PASS (vests math, feasibility, fleet-min, zero-need, scrub law, registry name)');
  return 0;
}

const isMain = process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href;
if (isMain) {
  process.exit(process.argv.includes('--selftest') ? selftest() : await live());
}
