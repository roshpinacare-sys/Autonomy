# NETWORK-MANIFEST — דיוקן-העצמי של הרשת

נוצר 2026-10-18T16:02:39.916Z · מנוע network-inventory/1.0 · מדוד מה-API של הגיט, אפס-המצאה.
חוק-הבעלים (2026-10-13): "הרשת תבדוק את עצמה, תהיה מודעת לעצמה וליכולות הריבוניות האוטונומיות שלה, ותדע לזהות כל דבר חדש שהבעלים בונה."

## מה הרשת כוללת עכשיו

- ריפואים: **45** (פומביים 16 · פרטיים 29 מוסרים ל-ref-יציב)
- workflows: **372** · קבצי-מנוע/סוכן: **899**
- מצב: פעילים 22 · דוממים (48h+) 39 · נכשלים-אחרון 81
- מצב-מדידה: **FULL**

## מה נתגלה מאז המדידה הקודמת (מודעות לחדש)

- ריפואים חדשים: `priv-h9d7b862d`, `sovereign-executor`
- workflows חדשים: 
  - `Domain` ← `autonomy-guardian.yml`
  - `Domain` ← `pulse-bake.yml`
  - `Autonomy` ← `agent-9-vault-sync.yml`
  - `sovereign-runner-kit` ← `capability-gate.yml`
  - `sovereign-runner-kit` ← `keepalive.yml`
  - `sovereign-runner-kit` ← `registry-verify.yml`
  - `priv-heda61fc2` ← `signing-health.yml`
  - `saos-runtime` ← `agent-9-vault-sync.yml`
  - `saos-runtime` ← `arsenal-sentinel.yml`
  - `saos-runtime` ← `builder-catchup.yml`
  - `saos-runtime` ← `cross-custody-probe.yml`
  - `saos-runtime` ← `main-key-refresh.yml`
  - `saos-runtime` ← `organ-guardian.yml`
  - `saos-runtime` ← `organ-pacemaker.yml`
  - `saos-runtime` ← `signing-health.yml`
  - `saos-runtime` ← `steem-hand-revival.yml`
  - `sovereign-executor` ← `fleet-beat.yml`
  - `sovereign-beacon` ← `keepalive.yml`
- נעלמו: ריפואים 0 · workflows 0

## מפת-היכולות לפי-ריפו

| ריפו | workflows | מנועים | יכולות | פעילות-אחרונה | דומם | נכשל |
|---|---|---|---|---|---|---|
| `Domain` | 99 | 344 | dex,grid,office,wallet,artery,decider,content,economy,intake,witness,verify,retro | 2026-10-18 16:00Z | 12 | 2 |
| `FleetHQ` | 21 | 4 | grid,office,artery,decider,intake,verify,retro | 2026-10-18 16:00Z | 1 | — |
| `Autonomy` | 51 | 61 | grid,office,wallet,artery,decider,economy,intake,witness,verify,retro | 2026-10-18 16:01Z | 5 | 5 |
| `Console` | 22 | 17 | dex,grid,artery,content,economy,verify,retro | 2026-10-18 16:01Z | 3 | 1 |
| `saos-dex` | 12 | 46 | dex,grid,wallet,artery,decider,witness,verify,retro | 2026-10-18 11:49Z | 2 | 6 |
| `priv-h54671ac9` 🔒 | 3 | 0 | verify | 2026-10-18 05:15Z | — | 3 |
| `priv-h3b0260e0` 🔒 | 2 | 0 | artery,economy | 2026-10-18 12:47Z | — | 2 |
| `priv-h9d7b862d` 🔒 | 0 | 0 | — | מעולם-לא | — | — |
| `giant` | 2 | 11 | artery,decider,witness,retro | 2026-10-18 13:41Z | 1 | — |
| `sovereign-runner-kit` | 8 | 11 | artery,decider,content,intake,verify,retro | 2026-10-18 15:50Z | 1 | — |
| `priv-hb3fe6cc4` 🔒 | 3 | 0 | verify | 2026-10-13 04:37Z | — | 3 |
| `priv-heda61fc2` 🔒 | 12 | 40 | office,wallet,decider,content,intake,witness,verify,retro | 2026-10-18 15:45Z | 7 | 7 |
| `saos-runtime` | 33 | 7 | dex,grid,wallet,artery,decider,content,verify | 2026-10-18 15:54Z | — | 2 |
| `priv-ha4c1a4d5` 🔒 | 0 | 0 | — | מעולם-לא | — | — |
| `sovereign-executor` | 1 | 3 | artery,decider | 2026-10-18 15:36Z | — | — |
| `priv-h68f58d82` 🔒 | 4 | 0 | decider,verify,retro | 2026-10-18 07:46Z | — | 4 |
| `priv-hea2461aa` 🔒 | 34 | 48 | grid,office,wallet,artery,decider,content,economy,witness,verify,retro | 2026-10-18 06:21Z | 1 | 10 |
| `priv-h7d07bc4a` 🔒 | 0 | 0 | — | מעולם-לא | — | — |
| `priv-h3a6f7e5e` 🔒 | 0 | 0 | — | מעולם-לא | — | — |
| `priv-h093636a5` 🔒 | 0 | 1 | — | מעולם-לא | — | — |
| `GridWatch` | 4 | 0 | grid,verify | 2026-10-18 16:01Z | — | — |
| `priv-h5c117460` 🔒 | 0 | 1 | decider | מעולם-לא | — | — |
| `priv-hc1241174` 🔒 | 0 | 0 | — | מעולם-לא | — | — |
| `sovereign-lighthouse` | 3 | 0 | artery,decider | 2026-10-18 16:01Z | 1 | — |
| `sovereign-beacon` | 3 | 1 | artery,decider | 2026-10-18 14:42Z | 1 | — |
| `priv-h469de745` 🔒 | 0 | 0 | wallet | מעולם-לא | — | — |
| `priv-h8068b020` 🔒 | 13 | 79 | dex,wallet,artery,decider,content,witness,verify,retro | 2026-10-13 10:53Z | — | 10 |
| `priv-hcd554c54` 🔒 | 3 | 76 | dex,grid,wallet,artery,decider,witness,verify,retro | 2026-10-13 03:24Z | — | 3 |
| `priv-h13720b34` 🔒 | 4 | 71 | dex,wallet,artery,decider,witness,verify,retro | 2026-10-13 03:24Z | — | 3 |
| `Pulse` | 4 | 2 | artery,decider,content,verify | 2026-10-18 06:30Z | — | — |
| `priv-hd31e424c` 🔒 | 0 | 0 | — | מעולם-לא | — | — |
| `priv-h4fb715c3` 🔒 | 2 | 0 | verify | 2026-10-18 05:20Z | — | 1 |
| `priv-h1a414e6e` 🔒 | 4 | 11 | wallet,intake,witness,verify,retro | 2026-10-13 10:52Z | 1 | 3 |
| `priv-h48bec02c` 🔒 | 1 | 26 | wallet,artery,decider,verify,retro | 2026-10-13 03:24Z | — | 1 |
| `priv-ha63e8e09` 🔒 | 2 | 5 | artery,verify,retro | 2026-10-16 17:12Z | 1 | — |
| `ops-forge` | 1 | 2 | intake | 2026-10-17 00:16Z | — | — |
| `ops-intake` | 1 | 5 | intake | 2026-10-17 00:10Z | — | — |
| `roshpinacare-sys.github.io` | 1 | 0 | — | 2026-10-14 20:07Z | 1 | — |
| `priv-hb139f244` 🔒 | 0 | 0 | — | מעולם-לא | — | — |
| `priv-h8a4395cb` 🔒 | 3 | 22 | dex,wallet,decider,witness,verify,retro | 2026-10-13 03:24Z | — | 3 |
| `priv-h0064bfe1` 🔒 | 3 | 0 | intake,verify | 2026-10-15 11:41Z | 1 | 2 |
| `priv-hb50f794b` 🔒 | 4 | 0 | witness,verify | 2026-10-13 03:24Z | — | 4 |
| `priv-h7cc2c942` 🔒 | 5 | 5 | witness,verify | 2026-10-13 03:24Z | — | 3 |
| `priv-h4d2f452d` 🔒 | 4 | 0 | verify | 2026-10-13 03:24Z | — | 3 |
| `priv-he8972163` 🔒 | 0 | 0 | — | מעולם-לא | — | — |

## דורש-תשומת-לב (הרשת רואה ומצהירה, לא משתיקה)

- דוממים (39):
  - `Domain` ← `adsmarket-panel.yml` (ראן אחרון לפני 146.5h)
  - `Domain` ← `audience-analyst.yml` (ראן אחרון לפני 226.3h)
  - `Domain` ← `canary.yml` (ראן אחרון לפני 250.2h)
  - `Domain` ← `cloud-heart.yml` (ראן אחרון לפני 292.5h)
  - `Domain` ← `content-truth-wave.yml` (ראן אחרון לפני 388.4h)
  - `Domain` ← `gitleaks.yml` (ראן אחרון לפני 104.8h)
  - `Domain` ← `org-gitleaks.yml` (ראן אחרון לפני 137.2h)
  - `Domain` ← `org-selftests.yml` (ראן אחרון לפני 102.7h)
  - `Domain` ← `social-audit.yml` (ראן אחרון לפני 227.4h)
  - `Domain` ← `sovereign-selftests.yml` (ראן אחרון לפני 100.3h)
  - `Domain` ← `steem-posting-repair.yml` (ראן אחרון לפני 158.4h)
  - `Domain` ← `workflow-yaml-guard.yml` (ראן אחרון לפני 292.2h)
  - `FleetHQ` ← `office-retro.yml` (ראן אחרון לפני 75.2h)
  - `Autonomy` ← `evo-windows-staleness.yml` (ראן אחרון לפני 121.5h)
  - `Autonomy` ← `fresh-oracle.yml` (ראן אחרון לפני 102h)
  - `Autonomy` ← `key-proof.yml` (ראן אחרון לפני 102.4h)
  - `Autonomy` ← `research-lane.yml` (ראן אחרון לפני 138.6h)
  - `Autonomy` ← `retro.yml` (מעולם-לא-רץ)
  - `Console` ← `gitleaks.yml` (ראן אחרון לפני 292.6h)
  - `Console` ← `rea-desk.yml` (ראן אחרון לפני 123.8h)
  - `Console` ← `workflow-yaml-guard.yml` (ראן אחרון לפני 292.6h)
  - `saos-dex` ← `grid-trigger.yml` (ראן אחרון לפני 134.8h)
  - `saos-dex` ← `llm-bridge.yml` (ראן אחרון לפני 134.8h)
  - `giant` ← `ext-audit.yml` (מעולם-לא-רץ)
  - `sovereign-runner-kit` ← `registry-verify.yml` (מעולם-לא-רץ)
  - `priv-heda61fc2` ← `cloud-heart.yml` (ראן אחרון לפני 250.1h)
  - `priv-heda61fc2` ← `gitleaks.yml` (ראן אחרון לפני 136h)
  - `priv-heda61fc2` ← `social-cadence.yml` (ראן אחרון לפני 136h)
  - `priv-heda61fc2` ← `sovereign-cycle.yml` (ראן אחרון לפני 136h)
  - `priv-heda61fc2` ← `token-forge.yml` (ראן אחרון לפני 136h)
  - ... ועוד 9
- ראן-אחרון-נכשל (81): `Domain`←`key-verify.yml`, `Domain`←`office3d-guard.yml`, `Autonomy`←`artery-decision-truth.yml`, `Autonomy`←`artery-participation.yml`, `Autonomy`←`fleet-yield.yml`, `Autonomy`←`value-scan.yml`, `Autonomy`←`world-evolver.yml`, `Console`←`console-publish.yml`, `saos-dex`←`ci.yml`, `saos-dex`←`gitleaks.yml`, `saos-dex`←`grid-trigger.yml`, `saos-dex`←`hive-heartbeat.yml`, `saos-dex`←`llm-bridge.yml`, `saos-dex`←`selftest.yml`, `priv-h54671ac9`←`canary.yml`, `priv-h54671ac9`←`gitleaks.yml`, `priv-h54671ac9`←`workflow-yaml-guard.yml`, `priv-h3b0260e0`←`ci-probe.yml`, `priv-h3b0260e0`←`economy-beat.yml`, `priv-hb3fe6cc4`←`archive-keeper.yml` ...

## חוקי-כנות של הדיוקן הזה

- שמות-ריפו-פרטיים מוסרים ל-ref-יציב `priv-h<8hex>` (hash של-השם — יציב בין-ריצות, בלי-שמירת-מפה).
- כל-מספר נמדד מה-API בריצה הזו · שדה שלא-נמדד = null ונקרא בשמו.
- "דום" = workflow פעיל בלי ראן מוצלח מעל 72h — מצב-מדידה, לא-אישום; ההכרעה מה לעשות עם זה שייכת למסילות-ההכרעה (sovereign-decider/claims-intake).
