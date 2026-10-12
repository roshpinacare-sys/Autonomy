# דוח-אמת (verifier) · 2026-10-12T22:34:08.293Z

**overall: FAIL** · auth: token(fed) · took: 16906ms · כללים: config.json (אפס-דעה-אישית)

> יש-דברים-שבורים-ממש — זה הדוח-הכן, בלי-קישוטים.

## 1. בריאות-עורקי-הסנדבוקס
| בדיקה | דרגה | ראיה |
|---|---|---|
| `sbx.wf-sovereign` | **OK** | success recent |
| `sbx.wf-sovereign-state` | **DEGRADED** | last success 16min ago > slot |
| `sbx.wf-artery-catchup` | **DEGRADED** | last success 30min ago > slot |
| `sbx.wf-artery-watch` | **DEGRADED** | last success 30min ago > slot |
| `sbx.wf-verifier` | **FAIL** | no success in last 2 runs of verifier.yml |
| `sbx.wf-federation` | **DEGRADED** | last success 30min ago > slot |
| `sbx.wf-value-scan` | **DEGRADED** | last success 78min ago > slot |
| `sbx.wf-hive-probe` | **FAIL** | no success in last 2 runs of hive-probe.yml |
| `sbx.wf-fleet-heal` | **DEGRADED** | last success 30min ago > slot |
| `sbx.wf-artery-decision-truth` | **DEGRADED** | last success 78min ago > slot |
| `sbx.wf-artery-grid` | **FAIL** | no success in last 1 runs of artery-grid.yml |
| `sbx.wf-artery-wallet` | **FAIL** | no success in last 1 runs of artery-wallet.yml |
| `sbx.wf-artery-integrity` | **DEGRADED** | last success 114min ago > slot |
| `sbx.wf-artery-participation` | **DEGRADED** | last success 78min ago > slot |
| `sbx.wf-artery-fleet` | **FAIL** | no success in last 1 runs of artery-fleet.yml |
| `sbx.wf-artery-flow` | **NOTICE** | latest completed=failure |

## 2. קצב-בנייה-אמת (24h · code = infra/engine/src/scripts, churn = state/receipts/ops)
| ריפו | נראות | commits-24h | code-חלק | הערה |
|---|---|---|---|---|
| Autonomy | public | 41 | 17% | ok |
| Console | public | 90 | 8% | ok |
| Domain | public | 100+ | 33% | ok |
| Pulse | public | 19 | 17% | ok |

**מדד-מסכם:** codeShare = 19% (42 commits מסווגים מתוך 250)
> שיפוט: `dev.rate` = **NOTICE** — mixed activity: codeShare 19%

## 3. אמת-על-השרשרת · Steem (https://api.steemit.com)
| חשבון | SP אפקטיבי | VP% | פוסט-אחרון | הצבעה-אחרונה |
|---|---|---|---|---|
| @acct-00 | 2830 | 50% | 0.7h | 0.9h |
| @acct-01 | 75 | 79% | 19.4h | 0.7h |
| @acct-02 | 78 | 80% | 0.8h | 0.7h |
| @acct-03 | 94 | 78% | 0.8h | 0.7h |
| @acct-04 | 80 | 77% | 0.7h | 0.7h |
| @acct-05 | 75 | 79% | 17.1h | 0.6h |
| @acct-06 | 31 | 83% | 0.8h | 0.6h |
| @acct-07 | 31 | 83% | 0.6h | 0.6h |
| @acct-08 | 33 | 82% | 0.6h | 0.6h |
| @acct-09 | 12 | 36% | 0.6h | 0.6h |
| @acct-10 | 70 | 89% | 0.6h | 0.6h |
| @acct-11 | 17 | 96% | 19.4h | 0.5h |
| @acct-12 | 17 | 98% | 0.5h | 0.5h |
| @acct-13 | 17 | 96% | 18h | 0.5h |

> `steem.fleet` = **OK** — fleet posted 0.5h ago
> `steem.treasury` = **DEGRADED** — treasury acct-00 at 2830 SP < 3000 (recovery-plan §3)

## 4. Blurt (UNREACHABLE)
RPC בלתי-נגיש מהרץ: no blurt accounts configured in this repo's verifier config — fleet-intel honestly absent here (nothing measured, nothing claimed)
> `blurt.alive` = **NOTICE** — blurt RPC unreachable from runner (1 hosts tried) — UNREACHABLE, לא "מת" עד-שיימד

## 5. שלמות-עץ (ריקבון-מצבות)
נסרקו 47 קבצים; פגומים: 0

## 6. דלתא-מול-הריצה-הקודמת
- ↗ השתפר: `sbx.wf-sovereign-state` FAIL → **DEGRADED**
- ↗ השתפר: `sbx.wf-artery-watch` FAIL → **DEGRADED**
- ↗ השתפר: `sbx.wf-federation` FAIL → **DEGRADED**
- ↗ השתפר: `sbx.wf-fleet-heal` FAIL → **DEGRADED**
- ↘ התדרדר: `sbx.wf-artery-participation` OK → **DEGRADED**
- ↘ התדרדר: `dev.rate` OK → **NOTICE**

## 7. משימות-שנצרתו-עכשיו
- **V-LOOP-SOVEREIGN-STATE** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-CATCHUP** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WATCH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-VERIFIER** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-FEDERATION** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-VALUE-SCAN** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-HIVE-PROBE** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-FLEET-HEAL** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-DECISION-TRUTH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-GRID** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WALLET** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-INTEGRITY** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-PARTICIPATION** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-FLEET** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-TREASURY-BALANCE** — איזון-אוצר לפי §3: לשמר ≥3,000 SP אצל-האוצר; top-up חשבונות-פעילים ל-100 SP

## 8. שיטה-וראיות
- GitHub API: repos/commits/actions של roshpinacare-sys (read-only)
- RPC ציבורי keyless: https://api.steemit.com
- פנקס: state/verifier/history.jsonl (מרקל) · אימות-עצמי: node engine/verifier.mjs --verify-ledger
- קוד-הבדיקה: engine/verifier.mjs · כללים: ops/agents/zai-verifier/config.json
- עמוד-האמת-הציבורי: status/truth.html (נאפה-בכל-ריצה מהמדידה-הזו-עצמה; אפס-JS)
