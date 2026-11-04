# NETWORK-MANIFEST — דיוקן-העצמי של הרשת

נוצר 2026-11-04T19:57:54.314Z · מנוע network-inventory/1.0 · מדוד מה-API של הגיט, אפס-המצאה.
חוק-הבעלים (2026-10-13): "הרשת תבדוק את עצמה, תהיה מודעת לעצמה וליכולות הריבוניות האוטונומיות שלה, ותדע לזהות כל דבר חדש שהבעלים בונה."

## מה הרשת כוללת עכשיו

- ריפואים: **50** (פומביים 41 · פרטיים 9 מוסרים ל-ref-יציב)
- workflows: **400** · קבצי-מנוע/סוכן: **983**
- מצב: פעילים 27 · דוממים (48h+) 122 · נכשלים-אחרון 43
- מצב-מדידה: **FULL**

## מה נתגלה מאז המדידה הקודמת (מודעות לחדש)

- ריפואים חדשים: `dynamis`
- workflows חדשים: 
  - `Domain` ← `bridge-keeper.yml`
  - `dynamis` ← `ci.yml`
  - `dynamis` ← `dependabot-updates`
  - `dynamis` ← `pages-build-deployment`
- נעלמו: ריפואים 0 · workflows 1

## מפת-היכולות לפי-ריפו

| ריפו | workflows | מנועים | יכולות | פעילות-אחרונה | דומם | נכשל |
|---|---|---|---|---|---|---|
| `Domain` | 100 | 355 | dex,grid,office,wallet,artery,decider,content,economy,intake,witness,verify,retro | 2026-11-04 19:54Z | 15 | 9 |
| `Autonomy` | 59 | 68 | grid,office,wallet,artery,decider,economy,intake,witness,verify,retro | 2026-11-04 19:55Z | 2 | 1 |
| `steem` | 6 | 7 | wallet,decider,verify,retro | 2026-11-04 12:59Z | 5 | 2 |
| `saos-dex` | 16 | 48 | dex,grid,wallet,artery,decider,content,economy,witness,verify,retro | 2026-11-04 19:52Z | 4 | 6 |
| `roshpina` | 4 | 0 | decider,verify,retro | 2026-10-26 16:09Z | 4 | 1 |
| `Console` | 26 | 21 | dex,grid,artery,content,economy,verify,retro | 2026-11-04 19:50Z | 3 | 1 |
| `fleet-economy` | 3 | 1 | artery,economy,verify | 2026-11-04 19:45Z | 1 | — |
| `Sandbox` | 35 | 49 | grid,office,wallet,artery,decider,content,economy,witness,verify,retro | 2026-11-04 19:55Z | 17 | 10 |
| `sovereign-runner-kit` | 12 | 23 | artery,decider,content,intake,verify,retro | 2026-11-04 19:43Z | — | — |
| `Defi` | 3 | 0 | verify | 2026-10-21 04:59Z | 3 | — |
| `dynamis` | 3 | 1 | — | 2026-11-04 19:37Z | — | — |
| `sovereign-executor` | 1 | 4 | artery,decider,verify | 2026-11-04 19:41Z | — | — |
| `saos-runtime` | 39 | 10 | dex,grid,wallet,artery,decider,content,verify,retro | 2026-11-04 19:54Z | 13 | 1 |
| `Pulse` | 5 | 3 | artery,decider,content,economy,verify | 2026-11-04 19:30Z | 1 | — |
| `roshpinacare-sys.github.io` | 4 | 0 | verify | 2026-11-04 19:42Z | 1 | — |
| `GridWatch` | 5 | 0 | grid,verify | 2026-11-04 19:55Z | 2 | — |
| `sovereign-lighthouse` | 3 | 0 | artery,decider | 2026-11-04 19:26Z | 1 | — |
| `Zip` | 17 | 79 | dex,wallet,artery,decider,content,witness,verify,retro | 2026-11-04 18:52Z | 15 | 8 |
| `saos-desk` | 0 | 0 | — | מעולם-לא | — | — |
| `anchor-baseline` | 4 | 0 | witness,verify | 2026-10-24 16:01Z | 4 | — |
| `FleetHQ` | 7 | 4 | office,retro | 2026-11-04 17:28Z | 3 | 2 |
| `ops-intake` | 1 | 5 | intake | 2026-11-04 16:26Z | — | — |
| `sovereign-beacon` | 3 | 1 | artery,decider | 2026-11-04 19:33Z | 1 | — |
| `ops-forge` | 1 | 2 | intake | 2026-11-04 15:09Z | — | — |
| `giant` | 7 | 16 | artery,decider,witness,verify,retro | 2026-11-04 19:46Z | — | 1 |
| `priv-h469de745` 🔒 | 0 | 0 | wallet | מעולם-לא | — | — |
| `saos-sovereign-platform` | 4 | 71 | dex,wallet,artery,decider,witness,verify,retro | 2026-11-03 20:15Z | 3 | — |
| `saos-sovereign-foundry` | 3 | 22 | dex,wallet,decider,witness,verify,retro | 2026-10-20 05:34Z | 3 | 1 |
| `Saosmartwallet` | 5 | 11 | wallet,intake,witness,verify,retro | 2026-11-03 21:37Z | 3 | — |
| `priv-h9d7b862d` 🔒 | 0 | 29 | grid,wallet,artery,decider,witness,retro | מעולם-לא | — | — |
| `execution-fabric` | 1 | 15 | wallet,witness,retro | 2026-10-27 15:26Z | 1 | — |
| `priv-h5c117460` 🔒 | 0 | 6 | artery,decider,verify,retro | מעולם-לא | — | — |
| `saos-control-center` | 3 | 82 | dex,grid,wallet,artery,decider,witness,verify,retro | 2026-10-24 16:01Z | 3 | — |
| `priv-h8042ff60` 🔒 | 0 | 0 | — | מעולם-לא | — | — |
| `priv-ha4c1a4d5` 🔒 | 0 | 13 | artery,decider,witness,retro | מעולם-לא | — | — |
| `agent9-clock` | 2 | 0 | — | 2026-11-04 19:55Z | — | — |
| `TruthRail` | 2 | 5 | artery,verify,retro | 2026-11-04 12:55Z | 1 | — |
| `Adsmarket` | 3 | 0 | intake,verify | 2026-10-24 20:06Z | 3 | — |
| `priv-hc1241174` 🔒 | 0 | 0 | — | מעולם-לא | — | — |
| `saos-agents` | 2 | 0 | verify | 2026-11-04 13:06Z | — | — |
| `Project-files` | 0 | 0 | — | מעולם-לא | — | — |
| `priv-ha5351c26` 🔒 | 0 | 0 | — | מעולם-לא | — | — |
| `Sdk` | 4 | 0 | verify | 2026-10-24 16:01Z | 4 | — |
| `saos-jummper` | 6 | 5 | witness,verify | 2026-11-03 21:37Z | 5 | — |
| `oss-scanner` | 0 | 0 | retro | מעולם-לא | — | — |
| `sandbox-private` | 1 | 26 | wallet,artery,decider,verify,retro | 2026-10-20 11:43Z | 1 | — |
| `saos-owner-channel` | 0 | 1 | — | מעולם-לא | — | — |
| `saos-markets` | 0 | 0 | — | מעולם-לא | — | — |
| `priv-hb139f244` 🔒 | 0 | 0 | — | מעולם-לא | — | — |
| `priv-he8972163` 🔒 | 0 | 0 | — | מעולם-לא | — | — |

## דורש-תשומת-לב (הרשת רואה ומצהירה, לא משתיקה)

- דוממים (122):
  - `Domain` ← `bootstrap-pages.yml` (ראן אחרון לפני 460.2h)
  - `Domain` ← `canary.yml` (ראן אחרון לפני 374.9h)
  - `Domain` ← `cloud-heart.yml` (ראן אחרון לפני 704.4h)
  - `Domain` ← `content-campaign.yml` (ראן אחרון לפני 463.5h)
  - `Domain` ← `content-truth-wave.yml` (ראן אחרון לפני 800.3h)
  - `Domain` ← `evo-windows.yml` (ראן אחרון לפני 81.5h)
  - `Domain` ← `hive-adopt-t21.yml` (ראן אחרון לפני 402.7h)
  - `Domain` ← `key-census-relay-v2.yml` (ראן אחרון לפני 153.2h)
  - `Domain` ← `key-census-relay.yml` (ראן אחרון לפני 153.5h)
  - `Domain` ← `key-verify.yml` (ראן אחרון לפני 368.2h)
  - `Domain` ← `office3d-guard.yml` (ראן אחרון לפני 344h)
  - `Domain` ← `seal-adopt.yml` (ראן אחרון לפני 427.3h)
  - `Domain` ← `social-audit.yml` (ראן אחרון לפני 128.8h)
  - `Domain` ← `steem-posting-repair.yml` (ראן אחרון לפני 570.3h)
  - `Domain` ← `token-forge.yml` (ראן אחרון לפני 78.3h)
  - `Autonomy` ← `executor.yml` (ראן אחרון לפני 448.7h)
  - `Autonomy` ← `key-census-relay-v2.yml` (ראן אחרון לפני 153.2h)
  - `steem` ← `cloud-heart.yml` (ראן אחרון לפני 365.7h)
  - `steem` ← `gitleaks.yml` (ראן אחרון לפני 166.3h)
  - `steem` ← `workflow-yaml-guard.yml` (ראן אחרון לפני 166.3h)
  - `steem` ← `key-census-relay.yml` (ראן אחרון לפני 153.5h)
  - `steem` ← `key-census-relay-v2.yml` (ראן אחרון לפני 144.8h)
  - `saos-dex` ← `grid-trigger.yml` (ראן אחרון לפני 546.7h)
  - `saos-dex` ← `key-census-relay-v2.yml` (ראן אחרון לפני 153.2h)
  - `saos-dex` ← `key-census-relay.yml` (ראן אחרון לפני 156.1h)
  - `saos-dex` ← `llm-bridge.yml` (ראן אחרון לפני 546.7h)
  - `roshpina` ← `controls-audit.yml` (ראן אחרון לפני 372.2h)
  - `roshpina` ← `gitleaks.yml` (ראן אחרון לפני 704.5h)
  - `roshpina` ← `sovereign-invariants-i38.yml` (ראן אחרון לפני 219.8h)
  - `roshpina` ← `workflow-yaml-guard.yml` (ראן אחרון לפני 374.9h)
  - ... ועוד 92
- ראן-אחרון-נכשל (43): `Domain`←`bridge-keeper.yml`, `Domain`←`economy-engine.yml`, `Domain`←`estate-scrub.yml`, `Domain`←`exposure-gate.yml`, `Domain`←`fill-ledger-cron.yml`, `Domain`←`key-census-relay-v2.yml`, `Domain`←`ladder-refresh.yml`, `Domain`←`office3d-guard.yml`, `Domain`←`org-selftests.yml`, `Autonomy`←`estate-vault.yml`, `steem`←`gitleaks.yml`, `steem`←`workflow-yaml-guard.yml`, `saos-dex`←`arb-scan.yml`, `saos-dex`←`grid-trigger.yml`, `saos-dex`←`key-census-relay-v2.yml`, `saos-dex`←`key-census-relay.yml`, `saos-dex`←`llm-bridge.yml`, `saos-dex`←`selftest.yml`, `roshpina`←`gitleaks.yml`, `Console`←`key-census-relay-v2.yml` ...

## חוקי-כנות של הדיוקן הזה

- שמות-ריפו-פרטיים מוסרים ל-ref-יציב `priv-h<8hex>` (hash של-השם — יציב בין-ריצות, בלי-שמירת-מפה).
- כל-מספר נמדד מה-API בריצה הזו · שדה שלא-נמדד = null ונקרא בשמו.
- "דום" = workflow פעיל בלי ראן מוצלח מעל 72h — מצב-מדידה, לא-אישום; ההכרעה מה לעשות עם זה שייכת למסילות-ההכרעה (sovereign-decider/claims-intake).
