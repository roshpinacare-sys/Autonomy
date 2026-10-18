#!/usr/bin/env node
/**
 * treasury-forensics.mjs — משטרת-האוצר [t14 · owner order: "תמשיך ודחוף"]
 * ═══════════════════════════════════════════════════════════════════════════
 * MEASURED MYSTERY (t14): treasury acct-00 was 4029 SP at 02:08 and 2855 SP
 * at 03:55 — a 1174 SP drop in <2h, with NO organ claiming it. The owner's
 * sovereignty must not leak silently. This module measures the DRAIN
 * directly from the chain: last vesting-affecting ops on the treasury
 * account (delegate_vesting_shares out/in, withdraw_vesting, transfer),
 * net flow over the window, counterparty as REF ONLY (estate names are
 * memory-only — refs.mjs law).
 *
 * Pure core + injected fetch/resolver → selftest is zero-network.
 */
import { refOf } from './refs.mjs';

/** pure: parse account-history entries → treasury vesting flow (refs-only) */
export function parseFlow(entries, { resolver = (n) => refOf(n), treasuryRef = 'acct-00', cutoffIso = null } = {}) {
  const out = { events: [], outSpVests: 0, inSpVests: 0, window: { from: null, to: null } };
  for (const entry of entries ?? []) {
    const op = entry?.op;
    if (!Array.isArray(op) || op.length < 2) continue;
    const [type, body] = op;
    const ts = entry.timestamp ?? null;
    if (cutoffIso && ts && ts < cutoffIso) continue;
    if (!out.window.from || ts < out.window.from) out.window.from = ts;
    if (!out.window.to || ts > out.window.to) out.window.to = ts;
    if (type === 'delegate_vesting_shares') {
      // direction relative to treasury: delegator=treasury → OUT; delegatee=treasury → IN
      const isOut = body.delegator && resolver(body.delegator) === treasuryRef;
      const isIn = body.delegatee && resolver(body.delegatee) === treasuryRef;
      if (!isOut && !isIn) continue;
      const event = {
        ts, op: type, dir: isOut ? 'out' : 'in',
        vests: body.vesting_shares ?? null,
        counterparty: isOut ? resolver(body.delegatee) : resolver(body.delegator),
      };
      out.events.push(event);
      if (isOut) out.outSpVests += parseFloat(body.vesting_shares) || 0;
      else out.inSpVests += parseFloat(body.vesting_shares) || 0;
    } else if (type === 'withdraw_vesting' && body?.acct && resolver(body.acct) === treasuryRef) {
      const v = parseFloat(body.vesting_shares) || 0;
      if (v === 0) continue; // 0 = power-down stop, not a flow
      out.events.push({ ts, op: type, dir: 'out', vests: body.vesting_shares, counterparty: null });
      out.outSpVests += v;
    } else if (type === 'transfer_to_vesting' && body?.to && resolver(body.to) === treasuryRef) {
      const amt = parseFloat(body.amount) || 0;
      out.events.push({ ts, op: type, dir: 'in', vests: `${amt} STEEM→VESTS`, counterparty: resolver(body.from) });
      out.inSpVests += amt; // approximation in STEEM terms — flagged by op type
    } else if (type === 'transfer' && body?.from && body?.to && (resolver(body.from) === treasuryRef || resolver(body.to) === treasuryRef)) {
      const isOut = resolver(body.from) === treasuryRef;
      out.events.push({ ts, op: type, dir: isOut ? 'out' : 'in', vests: body.amount, counterparty: isOut ? resolver(body.to) : resolver(body.from) });
    }
  }
  out.events.sort((a, b) => String(b.ts).localeCompare(String(a.ts)));
  return out;
}

/** live: chain query for the treasury flow window (hours) */
export async function treasuryFlow(treasuryName, hosts, { hours = 48, limit = 500, fetchImpl = fetch, resolver } = {}) {
  const cutoffIso = new Date(Date.now() - hours * 3600000).toISOString();
  for (const h of hosts ?? []) {
    try {
      const res = await fetchImpl(h, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', method: 'condenser_api.get_account_history', params: [treasuryName, -1, limit], id: 1 }),
        signal: AbortSignal.timeout(20000),
      });
      const j = await res.json();
      if (j.error) continue;
      const entries = (j.result ?? []).map((x) => x[1]);
      const flow = parseFlow(entries, { resolver, cutoffIso });
      flow.at = new Date().toISOString();
      flow.windowHours = hours;
      flow.host = new URL(h).host;
      flow.events = flow.events.slice(0, 30); // refs-only, bounded
      return { ok: true, ...flow };
    } catch { /* next host — honest fallback */ }
  }
  return { ok: false, reason: 'all-rpc-hosts-failed-or-empty', at: new Date().toISOString(), windowHours: hours };
}

export function selftest() {
  const results = [];
  const t = (name, cond) => results.push({ name, pass: !!cond });
  const R = (n) => (n === 'real-treasury' ? 'acct-00' : n === 'real-fleet-a' ? 'acct-02' : 'acct-x');

  const entries = [
    { timestamp: '2026-10-18T02:00:00Z', op: ['vote', { voter: 'real-treasury' }] },                                  // not a flow op
    { timestamp: '2026-10-18T02:30:00Z', op: ['delegate_vesting_shares', { delegator: 'real-treasury', delegatee: 'real-fleet-a', vesting_shares: '600000000.000000 VESTS' }] },
    { timestamp: '2026-10-18T02:35:00Z', op: ['delegate_vesting_shares', { delegator: 'real-treasury', delegatee: 'real-fleet-b', vesting_shares: '574000000.000000 VESTS' }] },
    { timestamp: '2026-10-17T01:00:00Z', op: ['delegate_vesting_shares', { delegator: 'real-fleet-a', delegatee: 'real-treasury', vesting_shares: '100000000.000000 VESTS' }] }, // outside cutoff
    { timestamp: '2026-10-18T02:40:00Z', op: ['transfer', { from: 'real-treasury', to: 'real-fleet-a', amount: '5.000 STEEM' }] },
    { timestamp: '2026-10-18T02:45:00Z', op: ['withdraw_vesting', { acct: 'real-treasury', vesting_shares: '0.000000 VESTS' }] }, // power-down stop = not flow
  ];
  const f = parseFlow(entries, { resolver: R, cutoffIso: '2026-10-18T00:00:00Z' });
  t('counts 2 delegate outs + 1 transfer out', f.events.length === 3);
  t('out vests summed', Math.abs(f.outSpVests - (600000000 + 574000000)) < 1);
  t('in zero (outside cutoff excluded)', f.inSpVests === 0);
  t('counterparty is REF (acct-02) not estate name', f.events.some(e => e.counterparty === 'acct-02') && !JSON.stringify(f.events).includes('real-fleet-a'));
  t('dir correct', f.events.every(e => e.dir === 'out'));
  t('zero withdraw skipped', !f.events.some(e => e.op === 'withdraw_vesting'));
  t('sorted newest first', f.events[0].ts === '2026-10-18T02:40:00Z');

  const f2 = parseFlow([
    { timestamp: '2026-10-18T03:00:00Z', op: ['delegate_vesting_shares', { delegator: 'other', delegatee: 'real-treasury', vesting_shares: '100000000.000000 VESTS' }] },
  ], { resolver: R });
  t('inbound delegation counted as in', f2.inSpVests === 100000000 && f2.events[0].dir === 'in');

  const f3 = parseFlow([], { resolver: R });
  t('empty history honest', f3.events.length === 0 && f3.outSpVests === 0);

  return { ok: results.every(r => r.pass), results };
}

if (process.argv[1] && process.argv[1].endsWith('treasury-forensics.mjs') && process.argv.includes('--selftest')) {
  const r = selftest();
  for (const x of r.results) console.log(`${x.pass ? 'PASS' : 'FAIL'} ${x.name}`);
  process.exit(r.ok ? 0 : 1);
}
