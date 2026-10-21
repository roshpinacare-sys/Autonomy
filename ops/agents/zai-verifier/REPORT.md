# דוח-אמת (verifier) · 2026-10-21T03:00:16.886Z

**overall: DEGRADED** · auth: token(fed) · took: 18616ms · כללים: config.json (אפס-דעה-אישית)

> המערכת חיה אך לא בריאה-כולה: יש עורקים/לולאות שאינם מתפקדים — עם ראיות.

## 1. בריאות-עורקי-הסנדבוקס
| בדיקה | דרגה | ראיה |
|---|---|---|
| `sbx.wf-sovereign` | **OK** | success recent |
| `sbx.wf-sovereign-state` | **DEGRADED** | last success 26min ago > slot |
| `sbx.wf-artery-catchup` | **OK** | success recent |
| `sbx.wf-artery-watch` | **DEGRADED** | last success 41min ago > slot |
| `sbx.wf-verifier` | **OK** | success recent |
| `sbx.wf-federation` | **OK** | success recent |
| `sbx.wf-value-scan` | **DEGRADED** | last success 33min ago > slot |
| `sbx.wf-hive-probe` | **OK** | success recent |
| `sbx.wf-fleet-heal` | **DEGRADED** | last success 41min ago > slot |
| `sbx.wf-artery-decision-truth` | **DEGRADED** | last success 33min ago > slot |
| `sbx.wf-artery-grid` | **DEGRADED** | last success 49min ago > slot |
| `sbx.wf-artery-wallet` | **DEGRADED** | last success 173min ago > slot |
| `sbx.wf-artery-integrity` | **DEGRADED** | last success 78min ago > slot |
| `sbx.wf-artery-participation` | **DEGRADED** | last success 67min ago > slot |
| `sbx.wf-artery-fleet` | **DEGRADED** | last success 138min ago > slot |
| `sbx.wf-artery-flow` | **OK** | success recent |

## 2. קצב-בנייה-אמת (24h · code = infra/engine/src/scripts, churn = state/receipts/ops)
| ריפו | נראות | commits-24h | code-חלק | הערה |
|---|---|---|---|---|
| Autonomy | public | 100+ | 17% | ok |
| Console | public | 100+ | 42% | ok |
| Domain | public | 100+ | 0% | ok |
| Pulse | public | 55 | 0% | ok |

**מדד-מסכם:** codeShare = 17% (42 commits מסווגים מתוך 355)
> שיפוט: `dev.rate` = **NOTICE** — mixed activity: codeShare 17%

## 3. אמת-על-השרשרת · Steem (https://api.steemit.com)
| חשבון | SP אפקטיבי | VP% | פוסט-אחרון | הצבעה-אחרונה |
|---|---|---|---|---|
| @acct-00 | 2417 | 35% | 20.7h | 1h |
| @acct-01 | 135 | 75% | 59.4h | 0.5h |
| @acct-02 | 78 | 70% | 52h | 0.5h |
| @acct-03 | 155 | 75% | 50.6h | 0.5h |
| @acct-04 | 140 | 73% | 49.2h | 0.5h |
| @acct-05 | 135 | 75% | 213.5h | 0.5h |
| @acct-06 | 143 | 91% | 195.7h | 0h |
| @acct-07 | 148 | 90% | 197h | 0h |
| @acct-08 | 61 | 70% | 197h | 0.5h |
| @acct-09 | 89 | 86% | 197h | 0h |
| @acct-10 | 20 | 59% | 197h | 0.5h |
| @acct-11 | 17 | 93% | 59.4h | 195.1h |
| @acct-12 | 17 | 95% | 197h | 195.1h |
| @acct-13 | 17 | 93% | 214.4h | 195.1h |

> `steem.fleet` = **OK** — fleet posted 20.7h ago
> `steem.treasury` = **DEGRADED** — treasury acct-00 at 2417 SP < 3000 (recovery-plan §3)

## 4. Blurt (UNREACHABLE)
RPC בלתי-נגיש מהרץ: no blurt accounts configured in this repo's verifier config — fleet-intel honestly absent here (nothing measured, nothing claimed)
> `blurt.alive` = **NOTICE** — blurt RPC unreachable from runner (1 hosts tried) — UNREACHABLE, לא "מת" עד-שיימד

## 5. שלמות-עץ (ריקבון-מצבות)
נסרקו 232 קבצים; פגומים: 0

## 6. דלתא-מול-הריצה-הקודמת
- ↗ השתפר: `sbx.wf-federation` DEGRADED → **OK**
- ↘ התדרדר: `sbx.wf-value-scan` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-fleet-heal` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-artery-decision-truth` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-artery-grid` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-artery-integrity` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-artery-participation` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-artery-fleet` OK → **DEGRADED**

## 7. משימות-שנצרתו-עכשיו
- **V-LOOP-SOVEREIGN-STATE** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WATCH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-VALUE-SCAN** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
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
