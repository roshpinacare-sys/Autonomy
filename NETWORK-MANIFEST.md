# NETWORK-MANIFEST — דיוקן-העצמי של הרשת

נוצר 2026-10-20T17:24:18.273Z · מנוע network-inventory/1.0 · מדוד מה-API של הגיט, אפס-המצאה.
חוק-הבעלים (2026-10-13): "הרשת תבדוק את עצמה, תהיה מודעת לעצמה וליכולות הריבוניות האוטונומיות שלה, ותדע לזהות כל דבר חדש שהבעלים בונה."

## מה הרשת כוללת עכשיו

- ריפואים: **46** (פומביים 38 · פרטיים 8 מוסרים ל-ref-יציב)
- workflows: **383** · קבצי-מנוע/סוכן: **974**
- מצב: פעילים 34 · דוממים (48h+) 63 · נכשלים-אחרון 35
- מצב-מדידה: **FULL**

## מה נתגלה מאז המדידה הקודמת (מודעות לחדש)

- ריפואים חדשים: `fleet-economy`, `sovereign-beacon`, `saos-dex`, `priv-h9d7b862d`, `steem`, `Domain`, `Autonomy`, `Console`, `Sandbox`, `roshpina`, `Defi`, `execution-fabric`, `sovereign-runner-kit`, `FleetHQ`, `Pulse`, `saos-runtime`, `GridWatch`, `sovereign-lighthouse`, `saos-control-center`, `Project-files`, `sovereign-executor`, `ops-intake`, `giant`, `Adsmarket`, `priv-ha4c1a4d5`, `saos-desk`, `priv-h5c117460`, `priv-ha5351c26`, `priv-hc1241174`, `ops-forge`, `priv-h469de745`, `Zip`, `sandbox-private`, `Saosmartwallet`, `anchor-baseline`, `saos-sovereign-foundry`, `saos-jummper`, `Sdk`, `saos-owner-channel`, `saos-sovereign-platform`, `saos-markets`, `saos-agents`, `TruthRail`, `roshpinacare-sys.github.io`, `priv-hb139f244`, `priv-he8972163`
- workflows חדשים: 
  - `fleet-economy` ← `ci-probe.yml`
  - `fleet-economy` ← `economy-beat.yml`
  - `sovereign-beacon` ← `beacon-pulse.yml`
  - `sovereign-beacon` ← `keepalive.yml`
  - `sovereign-beacon` ← `pages-build-deployment`
  - `saos-dex` ← `arb-scan.yml`
  - `saos-dex` ← `ci.yml`
  - `saos-dex` ← `dex-beat.yml`
  - `saos-dex` ← `dex-grid.yml`
  - `saos-dex` ← `gitleaks.yml`
  - `saos-dex` ← `grid-trigger.yml`
  - `saos-dex` ← `hive-heartbeat.yml`
  - `saos-dex` ← `identity-guard.yml`
  - `saos-dex` ← `llm-bridge.yml`
  - `saos-dex` ← `mm-supremacy.yml`
  - `saos-dex` ← `selftest.yml`
  - `saos-dex` ← `workflow-yaml-guard.yml`
  - `steem` ← `cloud-heart.yml`
  - `steem` ← `gitleaks.yml`
  - `steem` ← `social-cadence.yml`
  - `steem` ← `sovereign-cycle.yml`
  - `steem` ← `ci-probe.yml`
  - `steem` ← `token-forge.yml`
  - `steem` ← `identity-guard.yml`
  - `steem` ← `presence-matrix.yml`
  - `steem` ← `exec-cycle.yml`
  - `steem` ← `directive-now.yml`
  - `steem` ← `hive-custody-revival.yml`
  - `steem` ← `signing-health.yml`
  - `steem` ← `armyseal-selfcontain.yml`
  - `steem` ← `sovereign-arming-flip.yml`
  - `steem` ← `army-active-custody.yml`
  - `Domain` ← `adsmarket-panel.yml`
  - `Domain` ← `agent-verify.yml`
  - `Domain` ← `anchor-execute.yml`
  - `Domain` ← `arb-mesh-cron.yml`
  - `Domain` ← `artery-integrity-twin.yml`
  - `Domain` ← `audience-analyst.yml`
  - `Domain` ← `autonomy-guardian.yml`
  - `Domain` ← `blurt-connect.yml`
  - ... ועוד 343
- נעלמו: ריפואים 0 · workflows 0

## מפת-היכולות לפי-ריפו

| ריפו | workflows | מנועים | יכולות | פעילות-אחרונה | דומם | נכשל |
|---|---|---|---|---|---|---|
| `fleet-economy` | 2 | 0 | artery,economy | 2026-10-20 13:50Z | — | — |
| `sovereign-beacon` | 3 | 1 | artery,decider | 2026-10-20 17:21Z | 1 | — |
| `saos-dex` | 12 | 46 | dex,grid,wallet,artery,decider,witness,verify,retro | 2026-10-20 17:21Z | 2 | 3 |
| `priv-h9d7b862d` 🔒 | 0 | 16 | wallet,artery,decider,witness,retro | מעולם-לא | — | — |
| `steem` | 15 | 60 | office,wallet,artery,decider,content,intake,witness,verify,retro | 2026-10-20 17:21Z | 3 | 3 |
| `Domain` | 100 | 344 | dex,grid,office,wallet,artery,decider,content,economy,intake,witness,verify,retro | 2026-10-20 17:21Z | 10 | 3 |
| `Autonomy` | 53 | 63 | grid,office,wallet,artery,decider,economy,intake,witness,verify,retro | 2026-10-20 17:22Z | 4 | 2 |
| `Console` | 23 | 20 | dex,grid,artery,content,economy,verify,retro | 2026-10-20 17:17Z | 2 | — |
| `Sandbox` | 34 | 49 | grid,office,wallet,artery,decider,content,economy,witness,verify,retro | 2026-10-20 17:14Z | 13 | 9 |
| `roshpina` | 4 | 0 | decider,verify,retro | 2026-10-20 15:40Z | 1 | 1 |
| `Defi` | 3 | 0 | verify | 2026-10-20 07:42Z | 1 | 1 |
| `execution-fabric` | 1 | 11 | witness | 2026-10-20 16:23Z | — | — |
| `sovereign-runner-kit` | 9 | 17 | artery,decider,content,intake,verify,retro | 2026-10-20 17:17Z | — | — |
| `FleetHQ` | 21 | 4 | grid,office,artery,decider,intake,verify,retro | 2026-10-20 17:00Z | 1 | — |
| `Pulse` | 4 | 2 | artery,decider,content,verify | 2026-10-20 17:00Z | — | — |
| `saos-runtime` | 35 | 7 | dex,grid,wallet,artery,decider,content,verify | 2026-10-20 17:20Z | — | — |
| `GridWatch` | 4 | 0 | grid,verify | 2026-10-20 17:22Z | 1 | — |
| `sovereign-lighthouse` | 3 | 0 | artery,decider | 2026-10-20 16:53Z | 1 | — |
| `saos-control-center` | 3 | 76 | dex,grid,wallet,artery,decider,witness,verify,retro | 2026-10-20 09:04Z | 1 | 1 |
| `Project-files` | 3 | 0 | verify | 2026-10-20 07:42Z | 1 | 1 |
| `sovereign-executor` | 1 | 4 | artery,decider,verify | 2026-10-20 16:46Z | — | — |
| `ops-intake` | 1 | 5 | intake | 2026-10-20 16:33Z | — | — |
| `giant` | 2 | 11 | artery,decider,witness,retro | 2026-10-20 16:33Z | — | — |
| `Adsmarket` | 3 | 0 | intake,verify | 2026-10-20 16:33Z | — | — |
| `priv-ha4c1a4d5` 🔒 | 0 | 12 | artery,decider,witness,retro | מעולם-לא | — | — |
| `saos-desk` | 0 | 0 | — | מעולם-לא | — | — |
| `priv-h5c117460` 🔒 | 0 | 4 | decider,verify,retro | מעולם-לא | — | — |
| `priv-ha5351c26` 🔒 | 0 | 0 | — | מעולם-לא | — | — |
| `priv-hc1241174` 🔒 | 0 | 0 | — | מעולם-לא | — | — |
| `ops-forge` | 1 | 2 | intake | 2026-10-20 14:25Z | — | — |
| `priv-h469de745` 🔒 | 0 | 0 | wallet | מעולם-לא | — | — |
| `Zip` | 13 | 79 | dex,wallet,artery,decider,content,witness,verify,retro | 2026-10-20 09:45Z | 11 | 9 |
| `sandbox-private` | 1 | 26 | wallet,artery,decider,verify,retro | 2026-10-20 11:43Z | — | — |
| `Saosmartwallet` | 4 | 11 | wallet,intake,witness,verify,retro | 2026-10-20 09:10Z | 1 | — |
| `anchor-baseline` | 4 | 0 | witness,verify | 2026-10-20 07:43Z | 1 | 1 |
| `saos-sovereign-foundry` | 3 | 22 | dex,wallet,decider,witness,verify,retro | 2026-10-20 05:34Z | 1 | 1 |
| `saos-jummper` | 5 | 5 | witness,verify | 2026-10-20 07:43Z | 2 | — |
| `Sdk` | 4 | 0 | verify | 2026-10-20 07:43Z | 1 | — |
| `saos-owner-channel` | 0 | 1 | — | מעולם-לא | — | — |
| `saos-sovereign-platform` | 4 | 71 | dex,wallet,artery,decider,witness,verify,retro | 2026-10-20 07:43Z | 1 | — |
| `saos-markets` | 0 | 0 | — | מעולם-לא | — | — |
| `saos-agents` | 2 | 0 | verify | 2026-10-20 05:00Z | 1 | — |
| `TruthRail` | 2 | 5 | artery,verify,retro | 2026-10-20 05:00Z | 1 | — |
| `roshpinacare-sys.github.io` | 1 | 0 | — | 2026-10-14 20:07Z | 1 | — |
| `priv-hb139f244` 🔒 | 0 | 0 | — | מעולם-לא | — | — |
| `priv-he8972163` 🔒 | 0 | 0 | — | מעולם-לא | — | — |

## דורש-תשומת-לב (הרשת רואה ומצהירה, לא משתיקה)

- דוממים (63):
  - `sovereign-beacon` ← `pages-build-deployment` (ראן אחרון לפני 198.3h)
  - `saos-dex` ← `grid-trigger.yml` (ראן אחרון לפני 184.1h)
  - `saos-dex` ← `llm-bridge.yml` (ראן אחרון לפני 184.1h)
  - `steem` ← `sovereign-cycle.yml` (ראן אחרון לפני 185.3h)
  - `steem` ← `ci-probe.yml` (ראן אחרון לפני 85.4h)
  - `steem` ← `sovereign-arming-flip.yml` (מעולם-לא-רץ)
  - `Domain` ← `bootstrap-pages.yml` (ראן אחרון לפני 97.6h)
  - `Domain` ← `cloud-heart.yml` (ראן אחרון לפני 341.9h)
  - `Domain` ← `content-campaign.yml` (ראן אחרון לפני 101h)
  - `Domain` ← `content-truth-wave.yml` (ראן אחרון לפני 437.7h)
  - `Domain` ← `foundry-mesh-tests.yml` (ראן אחרון לפני 97.6h)
  - `Domain` ← `gitleaks.yml` (ראן אחרון לפני 154.2h)
  - `Domain` ← `org-selftests.yml` (ראן אחרון לפני 152.1h)
  - `Domain` ← `social-audit.yml` (ראן אחרון לפני 276.8h)
  - `Domain` ← `sovereign-selftests.yml` (ראן אחרון לפני 149.7h)
  - `Domain` ← `steem-posting-repair.yml` (ראן אחרון לפני 207.7h)
  - `Autonomy` ← `executor.yml` (ראן אחרון לפני 86.2h)
  - `Autonomy` ← `fresh-oracle.yml` (ראן אחרון לפני 151.3h)
  - `Autonomy` ← `key-proof.yml` (ראן אחרון לפני 151.8h)
  - `Autonomy` ← `sovereign-arming-check.yml` (מעולם-לא-רץ)
  - `Console` ← `gitleaks.yml` (ראן אחרון לפני 342h)
  - `Console` ← `workflow-yaml-guard.yml` (ראן אחרון לפני 342h)
  - `Sandbox` ← `agent-access.yml` (ראן אחרון לפני 182h)
  - `Sandbox` ← `agent-roster-reseal.yml` (ראן אחרון לפני 263.1h)
  - `Sandbox` ← `evo-windows-staleness.yml` (ראן אחרון לפני 210.2h)
  - `Sandbox` ← `fresh-oracle.yml` (ראן אחרון לפני 211h)
  - `Sandbox` ← `hive-probe.yml` (ראן אחרון לפני 184.1h)
  - `Sandbox` ← `key-proof.yml` (מעולם-לא-רץ)
  - `Sandbox` ← `office-growth.yml` (ראן אחרון לפני 184.1h)
  - `Sandbox` ← `profit-oracle.yml` (ראן אחרון לפני 185.3h)
  - ... ועוד 33
- ראן-אחרון-נכשל (35): `saos-dex`←`grid-trigger.yml`, `saos-dex`←`hive-heartbeat.yml`, `saos-dex`←`llm-bridge.yml`, `steem`←`sovereign-cycle.yml`, `steem`←`hive-custody-revival.yml`, `steem`←`signing-health.yml`, `Domain`←`office3d-guard.yml`, `Domain`←`org-gitleaks.yml`, `Domain`←`saos-act.yml`, `Autonomy`←`fleet-yield.yml`, `Autonomy`←`value-scan.yml`, `Sandbox`←`agent-access.yml`, `Sandbox`←`fleet-heal.yml`, `Sandbox`←`hive-probe.yml`, `Sandbox`←`office-growth.yml`, `Sandbox`←`profit-oracle.yml`, `Sandbox`←`research-lane.yml`, `Sandbox`←`retro.yml`, `Sandbox`←`sovereign-decider.yml`, `Sandbox`←`token-watchdog.yml` ...

## חוקי-כנות של הדיוקן הזה

- שמות-ריפו-פרטיים מוסרים ל-ref-יציב `priv-h<8hex>` (hash של-השם — יציב בין-ריצות, בלי-שמירת-מפה).
- כל-מספר נמדד מה-API בריצה הזו · שדה שלא-נמדד = null ונקרא בשמו.
- "דום" = workflow פעיל בלי ראן מוצלח מעל 72h — מצב-מדידה, לא-אישום; ההכרעה מה לעשות עם זה שייכת למסילות-ההכרעה (sovereign-decider/claims-intake).
