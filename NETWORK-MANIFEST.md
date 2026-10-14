# NETWORK-MANIFEST — דיוקן-העצמי של הרשת

נוצר 2026-10-14T17:25:21.675Z · מנוע network-inventory/1.0 · מדוד מה-API של הגיט, אפס-המצאה.
חוק-הבעלים (2026-10-13): "הרשת תבדוק את עצמה, תהיה מודעת לעצמה וליכולות הריבוניות האוטונומיות שלה, ותדע לזהות כל דבר חדש שהבעלים בונה."

## מה הרשת כוללת עכשיו

- ריפואים: **36** (פומביים 13 · פרטיים 23 מוסרים ל-ref-יציב)
- workflows: **313** · קבצי-מנוע/סוכן: **838**
- מצב: פעילים 30 · דוממים (48h+) 12 · נכשלים-אחרון 79
- מצב-מדידה: **FULL**

## מה נתגלה מאז המדידה הקודמת (מודעות לחדש)

- ריפואים חדשים: `priv-h7d07bc4a`, `priv-hb139f244`
- workflows חדשים: 
  - `Domain` ← `dex-watchdog.yml`
  - `Domain` ← `press-bake.yml`
  - `Domain` ← `public-loops-bake.yml`
- נעלמו: ריפואים 0 · workflows 1

## מפת-היכולות לפי-ריפו

| ריפו | workflows | מנועים | יכולות | פעילות-אחרונה | דומם | נכשל |
|---|---|---|---|---|---|---|
| `GridWatch` | 4 | 0 | grid,verify | 2026-10-14 17:23Z | — | — |
| `FleetHQ` | 20 | 4 | grid,office,artery,decider,intake,verify,retro | 2026-10-14 17:23Z | — | — |
| `Autonomy` | 39 | 49 | grid,office,wallet,artery,decider,economy,intake,witness,verify,retro | 2026-10-14 17:23Z | 1 | 1 |
| `Domain` | 93 | 330 | dex,grid,office,wallet,artery,decider,content,economy,intake,witness,verify,retro | 2026-10-14 17:23Z | 7 | — |
| `Console` | 22 | 17 | dex,grid,artery,content,economy,verify,retro | 2026-10-14 17:21Z | 2 | — |
| `priv-h483d57f5` 🔒 | 10 | 43 | dex,grid,wallet,artery,decider,witness,verify,retro | 2026-10-13 21:51Z | — | 10 |
| `priv-h8068b020` 🔒 | 13 | 79 | dex,wallet,artery,decider,content,witness,verify,retro | 2026-10-13 10:53Z | — | 10 |
| `Pulse` | 3 | 1 | artery,verify | 2026-10-14 17:20Z | — | — |
| `priv-heda61fc2` 🔒 | 8 | 40 | office,wallet,decider,content,intake,witness,verify,retro | 2026-10-14 03:17Z | — | 5 |
| `roshpinacare-sys.github.io` | 1 | 0 | — | 2026-10-14 17:17Z | — | — |
| `priv-h7d07bc4a` 🔒 | 0 | 0 | — | מעולם-לא | — | — |
| `priv-hea2461aa` 🔒 | 34 | 47 | grid,office,wallet,artery,decider,content,economy,witness,verify,retro | 2026-10-14 05:21Z | 1 | 16 |
| `sovereign-lighthouse` | 3 | 0 | artery,decider | 2026-10-14 17:06Z | — | — |
| `saos-runtime` | 15 | 5 | grid,wallet,decider,content | 2026-10-14 17:21Z | — | — |
| `priv-hb3fe6cc4` 🔒 | 3 | 0 | verify | 2026-10-13 04:37Z | — | 3 |
| `sovereign-beacon` | 2 | 0 | artery,decider | 2026-10-14 16:00Z | — | — |
| `ops-forge` | 1 | 2 | intake | 2026-10-14 15:46Z | — | — |
| `sovereign-runner-kit` | 0 | 0 | decider | מעולם-לא | — | — |
| `ops-intake` | 1 | 5 | intake | 2026-10-14 13:12Z | — | — |
| `priv-h68f58d82` 🔒 | 4 | 0 | decider,verify,retro | 2026-10-13 02:12Z | 1 | 3 |
| `priv-hb139f244` 🔒 | 0 | 0 | — | מעולם-לא | — | — |
| `priv-h5c117460` 🔒 | 0 | 0 | decider | מעולם-לא | — | — |
| `priv-h469de745` 🔒 | 0 | 0 | wallet | מעולם-לא | — | — |
| `priv-h13720b34` 🔒 | 4 | 71 | dex,wallet,artery,decider,witness,verify,retro | 2026-10-13 03:24Z | — | 3 |
| `priv-h8a4395cb` 🔒 | 3 | 22 | dex,wallet,decider,witness,verify,retro | 2026-10-13 03:24Z | — | 3 |
| `priv-h1a414e6e` 🔒 | 3 | 11 | wallet,intake,witness,verify,retro | 2026-10-13 10:52Z | — | 3 |
| `priv-h4fb715c3` 🔒 | 2 | 0 | verify | 2026-10-13 03:24Z | — | 1 |
| `priv-h54671ac9` 🔒 | 3 | 0 | verify | 2026-10-13 03:24Z | — | 3 |
| `priv-h48bec02c` 🔒 | 1 | 26 | wallet,artery,decider,verify,retro | 2026-10-13 03:24Z | — | 1 |
| `priv-hcd554c54` 🔒 | 3 | 76 | dex,grid,wallet,artery,decider,witness,verify,retro | 2026-10-13 03:24Z | — | 3 |
| `priv-h0064bfe1` 🔒 | 3 | 0 | intake,verify | 2026-10-13 03:24Z | — | 3 |
| `priv-hb50f794b` 🔒 | 4 | 0 | witness,verify | 2026-10-13 03:24Z | — | 4 |
| `priv-h7cc2c942` 🔒 | 5 | 5 | witness,verify | 2026-10-13 03:24Z | — | 3 |
| `priv-h4d2f452d` 🔒 | 4 | 0 | verify | 2026-10-13 03:24Z | — | 3 |
| `priv-ha63e8e09` 🔒 | 2 | 5 | artery,verify,retro | 2026-10-13 03:24Z | — | 1 |
| `priv-he8972163` 🔒 | 0 | 0 | — | מעולם-לא | — | — |

## דורש-תשומת-לב (הרשת רואה ומצהירה, לא משתיקה)

- דוממים (12):
  - `Autonomy` ← `retro.yml` (מעולם-לא-רץ)
  - `Domain` ← `audience-analyst.yml` (ראן אחרון לפני 131.7h)
  - `Domain` ← `canary.yml` (ראן אחרון לפני 155.6h)
  - `Domain` ← `cloud-heart.yml` (ראן אחרון לפני 197.9h)
  - `Domain` ← `content-truth-wave.yml` (ראן אחרון לפני 293.7h)
  - `Domain` ← `social-audit.yml` (ראן אחרון לפני 132.8h)
  - `Domain` ← `vault-transfer.yml` (ראן אחרון לפני 262.6h)
  - `Domain` ← `workflow-yaml-guard.yml` (ראן אחרון לפני 197.6h)
  - `Console` ← `gitleaks.yml` (ראן אחרון לפני 198h)
  - `Console` ← `workflow-yaml-guard.yml` (ראן אחרון לפני 198h)
  - `priv-hea2461aa` ← `sovereign-invariants.yml` (מעולם-לא-רץ)
  - `priv-h68f58d82` ← `sovereign-invariants-i38.yml` (מעולם-לא-רץ)
- ראן-אחרון-נכשל (79): `Autonomy`←`artery-fleet.yml`, `priv-h483d57f5`←`arb-scan.yml`, `priv-h483d57f5`←`ci.yml`, `priv-h483d57f5`←`dex-beat.yml`, `priv-h483d57f5`←`dex-grid.yml`, `priv-h483d57f5`←`gitleaks.yml`, `priv-h483d57f5`←`grid-trigger.yml`, `priv-h483d57f5`←`identity-guard.yml`, `priv-h483d57f5`←`llm-bridge.yml`, `priv-h483d57f5`←`mm-supremacy.yml`, `priv-h483d57f5`←`workflow-yaml-guard.yml`, `priv-h8068b020`←`fleet-audit.yml`, `priv-h8068b020`←`gitleaks.yml`, `priv-h8068b020`←`weave-anchor-lines.yml`, `priv-h8068b020`←`weave-brain-restore.yml`, `priv-h8068b020`←`weave-ecosystem.yml`, `priv-h8068b020`←`weave-heart.yml`, `priv-h8068b020`←`web-probe.yml`, `priv-h8068b020`←`web-probe2.yml`, `priv-h8068b020`←`web-publish.yml` ...

## חוקי-כנות של הדיוקן הזה

- שמות-ריפו-פרטיים מוסרים ל-ref-יציב `priv-h<8hex>` (hash של-השם — יציב בין-ריצות, בלי-שמירת-מפה).
- כל-מספר נמדד מה-API בריצה הזו · שדה שלא-נמדד = null ונקרא בשמו.
- "דום" = workflow פעיל בלי ראן מוצלח מעל 72h — מצב-מדידה, לא-אישום; ההכרעה מה לעשות עם זה שייכת למסילות-ההכרעה (sovereign-decider/claims-intake).
