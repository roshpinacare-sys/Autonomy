# exec33 — No-arming doctrine laws R338–R342 (the mechanics of self-sufficiency)

> lane 33-c (registry-doctrine) · 2026-10-14 · doctrine doc: `ops/sovereign/DIRECTIVES/NO-ARMING-SELF-SUFFICIENCY.md` (Autonomy `15ecb0b`)
> Owner principles cited: P1 repo-hygiene · P2 non-blocking-ops · P3 pre-flight-readback · P4 atomic-receipt (owner's exec33 working principles) · R342 = the owner's autonomy mandate itself.
> Registration law (DECISIONS #21/R337): grep-verified free on origins **immediately before writing** — Autonomy origin/main `15ecb0b` (0 hits R338–R342 outside this lane's own directive file), Pulse origin/main `4f8a7a3` (R338 mention = row #28's "free numbering" note, not a claim), steem origin/saos-cockpit `85d897f7` (hits only in `skills/design/**` HTML templates — unrelated content, no law registry collision).

> Honesty note (numbering): 33-b's research dossier recorded five *candidates* under R338–R342 (gate-lease, execution-evidence, triage-before-self-heal, budget-governed retries, typed receipts) — explicitly **unregistered** pending grep-before-write. This lane registers the owner's five doctrine laws first (first-registration-wins); 33-b's five upgrade patterns remain recorded in `research/exec33/33-b-protocol10.md` for future lanes and will claim the next free numbers (R343+) when registered.

## R338 — repo-hygiene law (P1)

The execution tree is not the source tree. `core.fileMode` noise is isolated (file-mode churn never masquerades as a content change); `.gitignore` strictly separates execution logs, beat state, and runtime scratch from source; anything the beat regenerates lives under a state path that is either ignored or committed as sealed evidence (`state/*-latest.json` convention) — never as accidental diff noise. A reviewer diffing a commit must see intent, not exhaust.

## R339 — non-blocking-ops law (P2)

All network revalidation/probe/reachability work runs **concurrent and non-awaited**: `Promise.allSettled` + per-target timeout, so one slow or dead surface can never wedge the beat. A probe that hangs is a measured result ("timed out"), not a stalled fleet. Sequential awaits across independent targets are a defect, not a style choice.

## R340 — pre-flight-readback law (P3)

No state closes on cache. Live values are read at the moment of decision; mutating operations **simulate-then-verify** — the readback must **MATCH** the intended effect before success is claimed or recorded. Already practiced by 32-a/32-b/33-a (manifest round-trips, registry read-backs, surface-watch fresh measurements); now it is law, not habit. A claim without a matching readback is false output, treated as a defect even when the action itself succeeded.

## R341 — atomic-receipt law (P4, extends R337)

Every systemic action = **one clean atomic commit + one shared-worklog receipt**. Commits never mix unrelated concerns; parallel sessions **MUST** receipt to the shared worklog (the workspace-root `worklog.md`) — the R337 clobber incident proved worklog bypass is the root cause of cross-session corruption. A session that lands commits without a worklog receipt has not finished its task, regardless of what landed.

## R342 — self-heal-mandate law (the owner's autonomy mandate)

Every live surface self-verifies **every beat**; degradation is measured, not assumed. Repair is a lawful autonomous action (observe-first on a healthy prior verdict; act-gated only on a prior non-OK verdict; infrastructure/state-only; readback-MATCH required). When a fault is beyond lawful repair, escalation is **honest or nothing** — silent endurance is the one forbidden outcome. This is the law that makes "the site fell and nobody fixed it until the owner intervened" structurally impossible to repeat quietly.

---
*R338–R342 · exec33 doctrine laws · registered under DECISIONS #21/R337 registry discipline · standby gates untouched (SOCIAL-STANDBY / CHARTER R6 / R330 / R333).*
