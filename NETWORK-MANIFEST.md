# NETWORK-MANIFEST — דיוקן-העצמי של הרשת

נוצר 2026-10-17T15:44:18.532Z · מנוע network-inventory/1.0 · מדוד מה-API של הגיט, אפס-המצאה.
חוק-הבעלים (2026-10-13): "הרשת תבדוק את עצמה, תהיה מודעת לעצמה וליכולות הריבוניות האוטונומיות שלה, ותדע לזהות כל דבר חדש שהבעלים בונה."

## מה הרשת כוללת עכשיו

- ריפואים: **43** (פומביים 15 · פרטיים 28 מוסרים ל-ref-יציב)
- workflows: **336** · קבצי-מנוע/סוכן: **870**
- מצב: פעילים 22 · דוממים (48h+) 32 · נכשלים-אחרון 79
- מצב-מדידה: **FULL**

## מה נתגלה מאז המדידה הקודמת (מודעות לחדש)

- ריפואים חדשים: `saos-dex`, `priv-h3a6f7e5e`, `priv-ha4c1a4d5`, `priv-hc1241174`
- workflows חדשים: 
  - `Autonomy` ← `directive-bus.yml`
  - `Autonomy` ← `executor.yml`
  - `saos-runtime` ← `dex-beat.yml`
  - `saos-runtime` ← `directive-now.yml`
  - `saos-runtime` ← `hive-custody-revival.yml`
  - `saos-runtime` ← `sovereign-pulse.yml`
  - `priv-heda61fc2` ← `directive-now.yml`
  - `priv-heda61fc2` ← `hive-custody-revival.yml`
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
  - `sovereign-runner-kit` ← `netrun-loop.yml`
  - `priv-h3b0260e0` ← `ci-probe.yml`
  - `priv-h3b0260e0` ← `economy-beat.yml`
  - `priv-h1a414e6e` ← `ci.yml`
- נעלמו: ריפואים 1 · workflows 0

## מפת-היכולות לפי-ריפו

| ריפו | workflows | מנועים | יכולות | פעילות-אחרונה | דומם | נכשל |
|---|---|---|---|---|---|---|
| `Console` | 22 | 17 | dex,grid,artery,content,economy,verify,retro | 2026-10-17 15:42Z | 2 | 2 |
| `Autonomy` | 43 | 52 | grid,office,wallet,artery,decider,economy,intake,witness,verify,retro | 2026-10-17 15:42Z | 4 | 5 |
| `FleetHQ` | 20 | 4 | grid,office,artery,decider,intake,verify,retro | 2026-10-17 15:39Z | — | 1 |
| `Domain` | 96 | 343 | dex,grid,office,wallet,artery,decider,content,economy,intake,witness,verify,retro | 2026-10-17 15:39Z | 14 | 1 |
| `saos-runtime` | 19 | 6 | dex,grid,wallet,artery,decider,content | 2026-10-17 15:00Z | 1 | — |
| `GridWatch` | 4 | 0 | grid,verify | 2026-10-17 15:02Z | — | — |
| `priv-heda61fc2` 🔒 | 11 | 40 | office,wallet,decider,content,intake,witness,verify,retro | 2026-10-17 05:43Z | — | 4 |
| `priv-hb3fe6cc4` 🔒 | 3 | 0 | verify | 2026-10-13 04:37Z | — | 3 |
| `saos-dex` | 12 | 46 | dex,grid,wallet,artery,decider,witness,verify,retro | 2026-10-17 10:53Z | 3 | 6 |
| `priv-hea2461aa` 🔒 | 34 | 48 | grid,office,wallet,artery,decider,content,economy,witness,verify,retro | 2026-10-16 05:59Z | 2 | 15 |
| `sovereign-runner-kit` | 1 | 0 | decider | 2026-10-17 13:54Z | — | — |
| `giant` | 2 | 10 | artery,decider,witness,retro | 2026-10-17 13:22Z | 1 | — |
| `priv-h3b0260e0` 🔒 | 2 | 0 | artery,economy | 2026-10-17 15:30Z | — | 2 |
| `priv-h68f58d82` 🔒 | 4 | 0 | decider,verify,retro | 2026-10-13 02:12Z | 1 | 3 |
| `priv-h3a6f7e5e` 🔒 | 0 | 0 | — | מעולם-לא | — | — |
| `priv-h093636a5` 🔒 | 0 | 0 | — | מעולם-לא | — | — |
| `priv-ha4c1a4d5` 🔒 | 0 | 0 | — | מעולם-לא | — | — |
| `priv-hc1241174` 🔒 | 0 | 0 | — | מעולם-לא | — | — |
| `priv-h469de745` 🔒 | 0 | 0 | wallet | מעולם-לא | — | — |
| `priv-h48bec02c` 🔒 | 1 | 26 | wallet,artery,decider,verify,retro | 2026-10-13 03:24Z | — | 1 |
| `priv-h7d07bc4a` 🔒 | 0 | 0 | — | מעולם-לא | — | — |
| `priv-ha63e8e09` 🔒 | 2 | 5 | artery,verify,retro | 2026-10-16 17:12Z | 1 | — |
| `priv-h1a414e6e` 🔒 | 4 | 11 | wallet,intake,witness,verify,retro | 2026-10-13 10:52Z | 1 | 3 |
| `priv-h54671ac9` 🔒 | 3 | 0 | verify | 2026-10-15 11:41Z | — | 2 |
| `priv-h13720b34` 🔒 | 4 | 71 | dex,wallet,artery,decider,witness,verify,retro | 2026-10-13 03:24Z | — | 3 |
| `priv-hd31e424c` 🔒 | 0 | 0 | — | מעולם-לא | — | — |
| `priv-hcd554c54` 🔒 | 3 | 76 | dex,grid,wallet,artery,decider,witness,verify,retro | 2026-10-13 03:24Z | — | 3 |
| `priv-h5c117460` 🔒 | 0 | 0 | decider | מעולם-לא | — | — |
| `Pulse` | 4 | 2 | artery,decider,content,verify | 2026-10-17 11:12Z | — | — |
| `sovereign-lighthouse` | 3 | 0 | artery,decider | 2026-10-17 15:30Z | 1 | — |
| `sovereign-beacon` | 2 | 0 | artery,decider | 2026-10-17 15:30Z | 1 | — |
| `priv-h8068b020` 🔒 | 13 | 79 | dex,wallet,artery,decider,content,witness,verify,retro | 2026-10-13 10:53Z | — | 10 |
| `ops-forge` | 1 | 2 | intake | 2026-10-17 00:16Z | — | — |
| `ops-intake` | 1 | 5 | intake | 2026-10-17 00:10Z | — | — |
| `roshpinacare-sys.github.io` | 1 | 0 | — | 2026-10-14 20:07Z | — | — |
| `priv-hb139f244` 🔒 | 0 | 0 | — | מעולם-לא | — | — |
| `priv-h8a4395cb` 🔒 | 3 | 22 | dex,wallet,decider,witness,verify,retro | 2026-10-13 03:24Z | — | 3 |
| `priv-h4fb715c3` 🔒 | 2 | 0 | verify | 2026-10-16 17:05Z | — | — |
| `priv-h0064bfe1` 🔒 | 3 | 0 | intake,verify | 2026-10-15 11:41Z | — | 2 |
| `priv-hb50f794b` 🔒 | 4 | 0 | witness,verify | 2026-10-13 03:24Z | — | 4 |
| `priv-h7cc2c942` 🔒 | 5 | 5 | witness,verify | 2026-10-13 03:24Z | — | 3 |
| `priv-h4d2f452d` 🔒 | 4 | 0 | verify | 2026-10-13 03:24Z | — | 3 |
| `priv-he8972163` 🔒 | 0 | 0 | — | מעולם-לא | — | — |

## דורש-תשומת-לב (הרשת רואה ומצהירה, לא משתיקה)

- דוממים (32):
  - `Console` ← `gitleaks.yml` (ראן אחרון לפני 268.3h)
  - `Console` ← `workflow-yaml-guard.yml` (ראן אחרון לפני 268.3h)
  - `Autonomy` ← `evo-windows-staleness.yml` (ראן אחרון לפני 97.2h)
  - `Autonomy` ← `fresh-oracle.yml` (ראן אחרון לפני 77.6h)
  - `Autonomy` ← `research-lane.yml` (ראן אחרון לפני 114.3h)
  - `Autonomy` ← `retro.yml` (מעולם-לא-רץ)
  - `Domain` ← `adsmarket-panel.yml` (ראן אחרון לפני 122.2h)
  - `Domain` ← `audience-analyst.yml` (ראן אחרון לפני 202h)
  - `Domain` ← `canary.yml` (ראן אחרון לפני 225.9h)
  - `Domain` ← `cloud-heart.yml` (ראן אחרון לפני 268.2h)
  - `Domain` ← `content-truth-wave.yml` (ראן אחרון לפני 364.1h)
  - `Domain` ← `evo-windows.yml` (ראן אחרון לפני 136.6h)
  - `Domain` ← `gitleaks.yml` (ראן אחרון לפני 80.5h)
  - `Domain` ← `org-gitleaks.yml` (ראן אחרון לפני 112.9h)
  - `Domain` ← `org-selftests.yml` (ראן אחרון לפני 78.4h)
  - `Domain` ← `social-audit.yml` (ראן אחרון לפני 203.1h)
  - `Domain` ← `sovereign-selftests.yml` (ראן אחרון לפני 76h)
  - `Domain` ← `steem-posting-repair.yml` (ראן אחרון לפני 134.1h)
  - `Domain` ← `token-forge.yml` (ראן אחרון לפני 138h)
  - `Domain` ← `workflow-yaml-guard.yml` (ראן אחרון לפני 267.9h)
  - `saos-runtime` ← `owner-key-adopt.yml` (ראן אחרון לפני 118.9h)
  - `saos-dex` ← `dex-grid.yml` (ראן אחרון לפני 110.5h)
  - `saos-dex` ← `grid-trigger.yml` (ראן אחרון לפני 110.5h)
  - `saos-dex` ← `llm-bridge.yml` (ראן אחרון לפני 110.5h)
  - `priv-hea2461aa` ← `identity-guard.yml` (ראן אחרון לפני 89.8h)
  - `priv-hea2461aa` ← `sovereign-invariants.yml` (מעולם-לא-רץ)
  - `giant` ← `ext-audit.yml` (מעולם-לא-רץ)
  - `priv-h68f58d82` ← `sovereign-invariants-i38.yml` (מעולם-לא-רץ)
  - `priv-ha63e8e09` ← `pages-build-deployment` (ראן אחרון לפני 136.1h)
  - `priv-h1a414e6e` ← `ci.yml` (מעולם-לא-רץ)
  - ... ועוד 2
- ראן-אחרון-נכשל (79): `Console`←`console-publish.yml`, `Console`←`identity-guard.yml`, `Autonomy`←`artery-decision-truth.yml`, `Autonomy`←`artery-fleet.yml`, `Autonomy`←`artery-participation.yml`, `Autonomy`←`fleet-yield.yml`, `Autonomy`←`value-scan.yml`, `FleetHQ`←`office-ci.yml`, `Domain`←`dex-beat.yml`, `priv-heda61fc2`←`gitleaks.yml`, `priv-heda61fc2`←`social-cadence.yml`, `priv-heda61fc2`←`sovereign-cycle.yml`, `priv-heda61fc2`←`token-forge.yml`, `priv-hb3fe6cc4`←`archive-keeper.yml`, `priv-hb3fe6cc4`←`gitleaks.yml`, `priv-hb3fe6cc4`←`workflow-yaml-guard.yml`, `saos-dex`←`dex-grid.yml`, `saos-dex`←`gitleaks.yml`, `saos-dex`←`grid-trigger.yml`, `saos-dex`←`hive-heartbeat.yml` ...

## חוקי-כנות של הדיוקן הזה

- שמות-ריפו-פרטיים מוסרים ל-ref-יציב `priv-h<8hex>` (hash של-השם — יציב בין-ריצות, בלי-שמירת-מפה).
- כל-מספר נמדד מה-API בריצה הזו · שדה שלא-נמדד = null ונקרא בשמו.
- "דום" = workflow פעיל בלי ראן מוצלח מעל 72h — מצב-מדידה, לא-אישום; ההכרעה מה לעשות עם זה שייכת למסילות-ההכרעה (sovereign-decider/claims-intake).
