# Research Ledger — hypothesis → measurement → verdict → next

> research-lane.mjs (10-d) · read-only · every entry cites its finding file


## 2026-10-12T20:59:40.538Z
- **E1 spread-regime** · 2026-10-12 — measured: spread tightened (76.27 < 93.5 bps) — grid-side liquidity improving
  - next: track weekly; correlate with grid-beat placements (saos-dex ledger) before claiming causality
- **E2 feed-divergence** · 2026-10-12 — measured: peg stress signal: divergence 365.47 bps > 300 (feed_above_market) — surface to operator
  - next: if >300 bps repeats 2× consecutively, escalate to operator brief (peg-door policy ref)
- **E3 rc-census** · 2026-10-12 — measured: 3 RC-starved accounts (<40%): acct-11 11.8%, acct-12 27.77%, acct-13 11.06% — propose SP delegation top-up or activity cap (owner word for delegation lane)
  - next: if starved persists 2× weekly, draft a delegation delta into grids/delegate-plan (owner word gate)

## 2026-10-12T21:06:44.811Z
- **E1 spread-regime** · 2026-10-12 — measured: spread tightened (73.68 < 93.5 bps) — grid-side liquidity improving
  - next: track weekly; correlate with grid-beat placements (saos-dex ledger) before claiming causality
- **E2 feed-divergence** · 2026-10-12 — measured: peg stress signal: divergence 364.43 bps > 300 (feed_above_market) — surface to operator
  - next: if >300 bps repeats 2× consecutively, escalate to operator brief (peg-door policy ref)
- **E3 rc-census** · 2026-10-12 — measured: 3 RC-starved accounts (<40%): acct-11 11.8%, acct-12 27.77%, acct-13 11.06% — propose SP delegation top-up or activity cap (owner word for delegation lane)
  - next: if starved persists 2× weekly, draft a delegation delta into grids/delegate-plan (owner word gate)

## 2026-10-12T21:08:38.319Z
- **E1 spread-regime** · 2026-10-12 — measured: spread tightened (73.68 < 93.5 bps) — grid-side liquidity improving
  - next: track weekly; correlate with grid-beat placements (saos-dex ledger) before claiming causality
- **E2 feed-divergence** · 2026-10-12 — measured: peg stress signal: divergence 364.43 bps > 300 (feed_above_market) — surface to operator
  - next: if >300 bps repeats 2× consecutively, escalate to operator brief (peg-door policy ref)
- **E3 rc-census** · 2026-10-12 — measured: 3 RC-starved accounts (<40%): acct-11 11.8%, acct-12 27.77%, acct-13 11.06% — propose SP delegation top-up or activity cap (owner word for delegation lane)
  - next: if starved persists 2× weekly, draft a delegation delta into grids/delegate-plan (owner word gate)

## 2026-10-12T21:27:54.487Z
- **E1 spread-regime** · 2026-10-12 — measured: spread tightened (76.68 < 93.5 bps) — grid-side liquidity improving
  - next: track weekly; correlate with grid-beat placements (saos-dex ledger) before claiming causality
- **E2 feed-divergence** · 2026-10-12 — measured: peg stress signal: divergence 365.47 bps > 300 (feed_above_market) — surface to operator
  - next: if >300 bps repeats 2× consecutively, escalate to operator brief (peg-door policy ref)
- **E3 rc-census** · 2026-10-12 — measured: 3 RC-starved accounts (<40%): acct-11 6.53%, acct-12 16.97%, acct-13 6.24% — propose SP delegation top-up or activity cap (owner word for delegation lane)
  - next: if starved persists 2× weekly, draft a delegation delta into grids/delegate-plan (owner word gate)

## 2026-10-14T07:47:08.072Z
- **exec31 frontier-absorption** · 2026-10-14 — measured: 10 external repos read statically (agentic-pantheon 5 · Zen7-Labs 4 · legion_agi · Artificial-Superintelligence), 10/10 real by git-log; verdicts RESEARCH-ONLY across the board; patterns harvested as laws R330-R333 (registry-checked free on origin; R308-R311 taken per DECISIONS #22, R328-R329 taken mid-flight by T-87/T-88); ASI repo rejected as vaporware — full dossier in `state/research/exec31-frontier-super-agent-asi-zerotrust-2026-10-14.md`, DECISIONS exec31 row registered
  - next: patterns only until owner-armed; any future value-move pipeline must implement the R328 gate shape before it exists; wallet surfaces stay behind R331 (Class C, not activated)

## 2026-10-14T11:46:16.000Z
- **registry-integrity: first-registration-wins under a live cross-session race** · 2026-10-14 — hypothesis: first-registration-wins (registry law #21) survives a live cross-session registry race without history rewrite. measurement: four Pulse DECISIONS commits re-verified at repair time — exec31 `f90a53b` 07:55:33Z registered R330=value-move gate (Mercury harvest) / R331=spawn-manifest / R332=idempotency lifecycle / R333=allowance-bounded custody; T-89 `2da71f3` 08:41:52Z **CLOBBERED row #25** (rewrote instead of appended — first clobber incident in the registry; grep "exec31" in DECISIONS.md = 0 post-clobber); T-90 `97d194a` 10:47:19Z and T-91 `d7f3f30` 11:12:45Z collided labels R331/R332. Repair (labels only, zero behavior change): T-89 drift-closure→**R334** (9 steem sites), T-90 sovereign-book→**R335** (2 Pulse sites), T-91 swarm-planner→**R336** (3 steem sites) — steem `597e23be` (selftest 1537/1537 green) + Pulse `54a82bcd`; exec31's registration RESTORED-IN-RECORD via Pulse DECISIONS row #28 `5d746474`; **R337** born: DECISIONS.md append-only with re-read-before-append CAS, row numbers strictly monotonic, and mandatory parallel-session worklog receipts (memory-bypass = recorded root cause). verdict: law #21 held — precedence was decidable from immutable git history alone (07:55:33Z < 08:41:52Z < 10:47:19Z < 11:12:45Z), the collision was repairable with zero code changes, and the append-only law (R337) closes the clobber class; the fleet needed no history rewrite and none was performed (owner-gated per DECISIONS #5). next: **R333 remains the only lawful custody shape** (allowance-bounded, Class C, owner-armed — standing presentation, never activated by a lane); **R330 value-gate is unimplemented by design** (owner-only arming — no value may move until the owner's dual-key ceremony instantiates it); future engine work must cite R334/R335/R336 for drift-closure / sovereign-book / swarm-planner respectively; every parallel session appends receipts to the shared worklog per R337.
