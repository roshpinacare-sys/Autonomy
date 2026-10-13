# NETWORK-MANIFEST — דיוקן-העצמי של הרשת

נוצר 2026-10-13T22:57:43.016Z · מנוע network-inventory/1.0 · מדוד מה-API של הגיט, אפס-המצאה.
חוק-הבעלים (2026-10-13): "הרשת תבדוק את עצמה, תהיה מודעת לעצמה וליכולות הריבוניות האוטונומיות שלה, ותדע לזהות כל דבר חדש שהבעלים בונה."

## מה הרשת כוללת עכשיו

- ריפואים: **13** (פומביים 13 · פרטיים 0 מוסרים ל-ref-יציב)
- workflows: **190** · קבצי-מנוע/סוכן: **407**
- מצב: פעילים 12 · דוממים (48h+) 12 · נכשלים-אחרון 9
- מצב-מדידה: **PUBLIC-ONLY** (אין טוקן-פרטי בסודות — הפרטיים לא נמדדו; הוספת ZIP_PAT/INV_TOKEN לסודות-הריפו מדליקה מצב מלא)

## מה נתגלה מאז המדידה הקודמת (מודעות לחדש)

- ריפואים חדשים: — אין
- workflows חדשים: 
  - `Autonomy` ← `claims-intake.yml`
  - `Autonomy` ← `compute-rearm.yml`
  - `Autonomy` ← `network-self-awareness.yml`
  - `Autonomy` ← `operator-routing.yml`
- נעלמו: ריפואים 21 · workflows 0

## מפת-היכולות לפי-ריפו

| ריפו | workflows | מנועים | יכולות | פעילות-אחרונה | דומם | נכשל |
|---|---|---|---|---|---|---|
| `FleetHQ` | 17 | 4 | grid,office,artery,decider,intake,verify,retro | 2026-10-13 22:55Z | — | 1 |
| `Autonomy` | 34 | 44 | grid,office,wallet,artery,decider,economy,intake,witness,verify,retro | 2026-10-13 22:56Z | 2 | — |
| `sovereign-beacon` | 2 | 0 | artery,decider | 2026-10-13 22:56Z | — | — |
| `Domain` | 90 | 329 | dex,grid,office,wallet,artery,decider,content,economy,intake,witness,verify,retro | 2026-10-13 22:56Z | 8 | 4 |
| `Console` | 22 | 17 | dex,grid,artery,content,economy,verify,retro | 2026-10-13 22:54Z | 2 | 3 |
| `saos-runtime` | 13 | 5 | grid,wallet,decider,content | 2026-10-13 22:50Z | — | 1 |
| `ops-forge` | 1 | 2 | intake | 2026-10-13 20:35Z | — | — |
| `sovereign-lighthouse` | 2 | 0 | artery,decider | 2026-10-13 22:40Z | — | — |
| `Pulse` | 3 | 1 | artery,verify | 2026-10-13 22:30Z | — | — |
| `ops-intake` | 1 | 5 | intake | 2026-10-13 22:26Z | — | — |
| `GridWatch` | 4 | 0 | grid,verify | 2026-10-13 21:57Z | — | — |
| `roshpinacare-sys.github.io` | 1 | 0 | — | 2026-10-13 11:25Z | — | — |
| `sovereign-runner-kit` | 0 | 0 | decider | מעולם-לא | — | — |

## דורש-תשומת-לב (הרשת רואה ומצהירה, לא משתיקה)

- דוממים (12):
  - `Autonomy` ← `fresh-oracle.yml` (מעולם-לא-רץ)
  - `Autonomy` ← `retro.yml` (מעולם-לא-רץ)
  - `Domain` ← `audience-analyst.yml` (ראן אחרון לפני 113.2h)
  - `Domain` ← `canary.yml` (ראן אחרון לפני 137.1h)
  - `Domain` ← `cloud-heart.yml` (ראן אחרון לפני 179.4h)
  - `Domain` ← `content-truth-wave.yml` (ראן אחרון לפני 275.3h)
  - `Domain` ← `org-selftests.yml` (ראן אחרון לפני 163.3h)
  - `Domain` ← `social-audit.yml` (ראן אחרון לפני 114.4h)
  - `Domain` ← `vault-transfer.yml` (ראן אחרון לפני 244.1h)
  - `Domain` ← `workflow-yaml-guard.yml` (ראן אחרון לפני 179.1h)
  - `Console` ← `gitleaks.yml` (ראן אחרון לפני 179.5h)
  - `Console` ← `workflow-yaml-guard.yml` (ראן אחרון לפני 179.5h)
- ראן-אחרון-נכשל (9): `FleetHQ`←`identity-patrol.yml`, `Domain`←`anchor-execute.yml`, `Domain`←`estate-scrub.yml`, `Domain`←`operator-console.yml`, `Domain`←`published-ledger.yml`, `Console`←`console-publish.yml`, `Console`←`key-verify.yml`, `Console`←`line-agreement.yml`, `saos-runtime`←`treasury-ladder.yml`

## חוקי-כנות של הדיוקן הזה

- שמות-ריפו-פרטיים מוסרים ל-ref-יציב `priv-h<8hex>` (hash של-השם — יציב בין-ריצות, בלי-שמירת-מפה).
- כל-מספר נמדד מה-API בריצה הזו · שדה שלא-נמדד = null ונקרא בשמו.
- "דום" = workflow פעיל בלי ראן מוצלח מעל 72h — מצב-מדידה, לא-אישום; ההכרעה מה לעשות עם זה שייכת למסילות-ההכרעה (sovereign-decider/claims-intake).
