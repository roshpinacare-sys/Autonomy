# דוח-אמת (verifier) · 2026-11-16T18:34:59.876Z

**overall: DEGRADED** · auth: token(fed) · took: 21699ms · כללים: config.json (אפס-דעה-אישית)

> המערכת חיה אך לא בריאה-כולה: יש עורקים/לולאות שאינם מתפקדים — עם ראיות.

## 1. בריאות-עורקי-הסנדבוקס
| בדיקה | דרגה | ראיה |
|---|---|---|
| `sbx.wf-sovereign` | **OK** | success recent |
| `sbx.wf-sovereign-state` | **DEGRADED** | last success 15min ago > slot |
| `sbx.wf-artery-catchup` | **OK** | success recent |
| `sbx.wf-artery-watch` | **DEGRADED** | last success 20min ago > slot |
| `sbx.wf-verifier` | **DEGRADED** | last success 34min ago > slot |
| `sbx.wf-federation` | **OK** | success recent |
| `sbx.wf-value-scan` | **OK** | success recent |
| `sbx.wf-hive-probe` | **OK** | success recent |
| `sbx.wf-fleet-heal` | **OK** | success recent |
| `sbx.wf-artery-decision-truth` | **OK** | success recent |
| `sbx.wf-artery-grid` | **DEGRADED** | last success 34min ago > slot |
| `sbx.wf-artery-wallet` | **DEGRADED** | last success 61min ago > slot |
| `sbx.wf-artery-integrity` | **DEGRADED** | last success 61min ago > slot |
| `sbx.wf-artery-participation` | **DEGRADED** | last success 67min ago > slot |
| `sbx.wf-artery-fleet` | **OK** | success recent |
| `sbx.wf-artery-flow` | **OK** | success recent |

## 2. קצב-בנייה-אמת (24h · code = infra/engine/src/scripts, churn = state/receipts/ops)
| ריפו | נראות | commits-24h | code-חלק | הערה |
|---|---|---|---|---|
| Autonomy | public | 100+ | 0% | ok |
| Console | public | 100+ | 17% | ok |
| Domain | public | 100+ | 0% | ok |
| Pulse | public | 92 | 33% | ok |

**מדד-מסכם:** codeShare = 10% (42 commits מסווגים מתוך 392)
> שיפוט: `dev.rate` = **NOTICE** — mixed activity: codeShare 10%

## 3. אמת-על-השרשרת · Steem (https://api.steemit.com)
| חשבון | SP אפקטיבי | VP% | פוסט-אחרון | הצבעה-אחרונה |
|---|---|---|---|---|
| @acct-00 | 2490 | 54% | 4.9h | 4.7h |
| @acct-01 | 301 | 88% | 21.9h | 24.7h |
| @acct-02 | 304 | 55% | 691.6h | 485.3h |
| @acct-03 | 320 | 55% | 690.2h | 485.3h |
| @acct-04 | 305 | 55% | 688.8h | 485.3h |
| @acct-05 | 301 | 55% | 853.1h | 485.3h |
| @acct-06 | 100 | 0% | 835.3h | 485.3h |
| @acct-07 | 100 | 87% | 22h | 24.7h |
| @acct-08 | 100 | 87% | 21.7h | 24.7h |
| @acct-09 | 100 | 0% | 836.6h | 485.3h |
| @acct-10 | 100 | 0% | 836.6h | 485.3h |
| @acct-11 | 31 | 90% | 21.5h | 24.7h |
| @acct-12 | 45 | 90% | 836.5h | 24.7h |
| @acct-13 | 36 | 0% | 854h | 455.3h |

> `steem.fleet` = **OK** — fleet posted 4.9h ago
> `steem.treasury` = **DEGRADED** — treasury acct-00 at 2490 SP < 3000 (recovery-plan §3)

## 4. Blurt (UNREACHABLE)
RPC בלתי-נגיש מהרץ: no blurt accounts configured in this repo's verifier config — fleet-intel honestly absent here (nothing measured, nothing claimed)
> `blurt.alive` = **NOTICE** — blurt RPC unreachable from runner (1 hosts tried) — UNREACHABLE, לא "מת" עד-שיימד

## 5. שלמות-עץ (ריקבון-מצבות)
נסרקו 490 קבצים; פגומים: 0

## 6. דלתא-מול-הריצה-הקודמת
- ↗ השתפר: `sbx.wf-artery-catchup` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-federation` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-value-scan` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-artery-decision-truth` DEGRADED → **OK**
- ↘ התדרדר: `sbx.wf-artery-grid` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-artery-wallet` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-artery-integrity` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-artery-participation` OK → **DEGRADED**
- ↗ השתפר: `dev.rate` DEGRADED → **NOTICE**

## 7. משימות-שנצרתו-עכשיו
- **V-LOOP-SOVEREIGN-STATE** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WATCH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-VERIFIER** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-GRID** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WALLET** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-INTEGRITY** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-PARTICIPATION** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-TREASURY-BALANCE** — איזון-אוצר לפי §3: לשמר ≥3,000 SP אצל-האוצר; top-up חשבונות-פעילים ל-100 SP

## 8. שיטה-וראיות
- GitHub API: repos/commits/actions של roshpinacare-sys (read-only)
- RPC ציבורי keyless: https://api.steemit.com
- פנקס: state/verifier/history.jsonl (מרקל) · אימות-עצמי: node engine/verifier.mjs --verify-ledger
- קוד-הבדיקה: engine/verifier.mjs · כללים: ops/agents/zai-verifier/config.json
- עמוד-האמת-הציבורי: status/truth.html (נאפה-בכל-ריצה מהמדידה-הזו-עצמה; אפס-JS)
