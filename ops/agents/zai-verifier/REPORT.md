# דוח-אמת (verifier) · 2026-10-22T13:31:59.397Z

**overall: DEGRADED** · auth: token(fed) · took: 22394ms · כללים: config.json (אפס-דעה-אישית)

> המערכת חיה אך לא בריאה-כולה: יש עורקים/לולאות שאינם מתפקדים — עם ראיות.

## 1. בריאות-עורקי-הסנדבוקס
| בדיקה | דרגה | ראיה |
|---|---|---|
| `sbx.wf-sovereign` | **OK** | success recent |
| `sbx.wf-sovereign-state` | **DEGRADED** | last success 22min ago > slot |
| `sbx.wf-artery-catchup` | **DEGRADED** | last success 44min ago > slot |
| `sbx.wf-artery-watch` | **DEGRADED** | last success 20min ago > slot |
| `sbx.wf-verifier` | **DEGRADED** | last success 60min ago > slot |
| `sbx.wf-federation` | **DEGRADED** | last success 47min ago > slot |
| `sbx.wf-value-scan` | **DEGRADED** | last success 47min ago > slot |
| `sbx.wf-hive-probe` | **OK** | success recent |
| `sbx.wf-fleet-heal` | **DEGRADED** | last success 47min ago > slot |
| `sbx.wf-artery-decision-truth` | **DEGRADED** | last success 48min ago > slot |
| `sbx.wf-artery-grid` | **DEGRADED** | last success 49min ago > slot |
| `sbx.wf-artery-wallet` | **DEGRADED** | last success 84min ago > slot |
| `sbx.wf-artery-integrity` | **DEGRADED** | last success 84min ago > slot |
| `sbx.wf-artery-participation` | **OK** | success recent |
| `sbx.wf-artery-fleet` | **OK** | success recent |
| `sbx.wf-artery-flow` | **OK** | success recent |

## 2. קצב-בנייה-אמת (24h · code = infra/engine/src/scripts, churn = state/receipts/ops)
| ריפו | נראות | commits-24h | code-חלק | הערה |
|---|---|---|---|---|
| Autonomy | public | 100+ | 0% | ok |
| Console | public | 100+ | 25% | ok |
| Domain | public | 100+ | 0% | ok |
| Pulse | public | 55 | 17% | ok |

**מדד-מסכם:** codeShare = 10% (42 commits מסווגים מתוך 355)
> שיפוט: `dev.rate` = **NOTICE** — mixed activity: codeShare 10%

## 3. אמת-על-השרשרת · Steem (https://api.steemit.com)
| חשבון | SP אפקטיבי | VP% | פוסט-אחרון | הצבעה-אחרונה |
|---|---|---|---|---|
| @acct-00 | 2196 | 35% | 13.2h | 1.3h |
| @acct-01 | 75 | 34% | 93.9h | 8.3h |
| @acct-02 | 78 | 53% | 86.6h | 12.9h |
| @acct-03 | 60 | 33% | 85.1h | 12.9h |
| @acct-04 | 45 | 34% | 83.7h | 6.1h |
| @acct-05 | 40 | 33% | 248h | 2.2h |
| @acct-06 | 41 | 53% | 230.3h | 12.9h |
| @acct-07 | 41 | 47% | 231.6h | 12.9h |
| @acct-08 | 43 | 55% | 231.6h | 12.9h |
| @acct-09 | 41 | 54% | 231.5h | 12.9h |
| @acct-10 | 44 | 72% | 231.5h | 12.8h |
| @acct-11 | 17 | 0% | 93.9h | 229.6h |
| @acct-12 | 17 | 0% | 231.5h | 229.6h |
| @acct-13 | 250 | 0% | 248.9h | 229.6h |

> `steem.fleet` = **OK** — fleet posted 13.2h ago
> `steem.treasury` = **DEGRADED** — treasury acct-00 at 2196 SP < 3000 (recovery-plan §3)

## 4. Blurt (UNREACHABLE)
RPC בלתי-נגיש מהרץ: no blurt accounts configured in this repo's verifier config — fleet-intel honestly absent here (nothing measured, nothing claimed)
> `blurt.alive` = **NOTICE** — blurt RPC unreachable from runner (1 hosts tried) — UNREACHABLE, לא "מת" עד-שיימד

## 5. שלמות-עץ (ריקבון-מצבות)
נסרקו 246 קבצים; פגומים: 0

## 6. דלתא-מול-הריצה-הקודמת
- ↘ התדרדר: `sbx.wf-artery-catchup` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-federation` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-value-scan` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-fleet-heal` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-artery-decision-truth` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-artery-grid` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-artery-wallet` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-artery-integrity` OK → **DEGRADED**
- ↗ השתפר: `sbx.wf-artery-participation` FAIL → **OK**

## 7. משימות-שנצרתו-עכשיו
- **V-LOOP-SOVEREIGN-STATE** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-CATCHUP** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WATCH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-VERIFIER** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-FEDERATION** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-VALUE-SCAN** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-FLEET-HEAL** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-DECISION-TRUTH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-GRID** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WALLET** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-INTEGRITY** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-TREASURY-BALANCE** — איזון-אוצר לפי §3: לשמר ≥3,000 SP אצל-האוצר; top-up חשבונות-פעילים ל-100 SP

## 8. שיטה-וראיות
- GitHub API: repos/commits/actions של roshpinacare-sys (read-only)
- RPC ציבורי keyless: https://api.steemit.com
- פנקס: state/verifier/history.jsonl (מרקל) · אימות-עצמי: node engine/verifier.mjs --verify-ledger
- קוד-הבדיקה: engine/verifier.mjs · כללים: ops/agents/zai-verifier/config.json
- עמוד-האמת-הציבורי: status/truth.html (נאפה-בכל-ריצה מהמדידה-הזו-עצמה; אפס-JS)
