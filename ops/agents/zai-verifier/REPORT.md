# דוח-אמת (verifier) · 2026-10-21T16:19:17.941Z

**overall: DEGRADED** · auth: token(fed) · took: 21328ms · כללים: config.json (אפס-דעה-אישית)

> המערכת חיה אך לא בריאה-כולה: יש עורקים/לולאות שאינם מתפקדים — עם ראיות.

## 1. בריאות-עורקי-הסנדבוקס
| בדיקה | דרגה | ראיה |
|---|---|---|
| `sbx.wf-sovereign` | **OK** | success recent |
| `sbx.wf-sovereign-state` | **DEGRADED** | last success 42min ago > slot |
| `sbx.wf-artery-catchup` | **OK** | success recent |
| `sbx.wf-artery-watch` | **DEGRADED** | last success 40min ago > slot |
| `sbx.wf-verifier` | **OK** | success recent |
| `sbx.wf-federation` | **OK** | success recent |
| `sbx.wf-value-scan` | **OK** | success recent |
| `sbx.wf-hive-probe` | **OK** | success recent |
| `sbx.wf-fleet-heal` | **DEGRADED** | last success 37min ago > slot |
| `sbx.wf-artery-decision-truth` | **DEGRADED** | last success 34min ago > slot |
| `sbx.wf-artery-grid` | **OK** | success recent |
| `sbx.wf-artery-wallet` | **OK** | success recent |
| `sbx.wf-artery-integrity` | **OK** | success recent |
| `sbx.wf-artery-participation` | **DEGRADED** | last success 61min ago > slot |
| `sbx.wf-artery-fleet` | **OK** | success recent |
| `sbx.wf-artery-flow` | **OK** | success recent |

## 2. קצב-בנייה-אמת (24h · code = infra/engine/src/scripts, churn = state/receipts/ops)
| ריפו | נראות | commits-24h | code-חלק | הערה |
|---|---|---|---|---|
| Autonomy | public | 100+ | 0% | ok |
| Console | public | 100+ | 8% | ok |
| Domain | public | 100+ | 25% | ok |
| Pulse | public | 55 | 0% | ok |

**מדד-מסכם:** codeShare = 10% (42 commits מסווגים מתוך 355)
> שיפוט: `dev.rate` = **NOTICE** — mixed activity: codeShare 10%

## 3. אמת-על-השרשרת · Steem (https://api.steemit.com)
| חשבון | SP אפקטיבי | VP% | פוסט-אחרון | הצבעה-אחרונה |
|---|---|---|---|---|
| @acct-00 | 1645 | 6% | 7.4h | 3.4h |
| @acct-01 | 75 | 24% | 72.7h | 9h |
| @acct-02 | 78 | 68% | 65.3h | 13.9h |
| @acct-03 | 60 | 40% | 63.9h | 8.9h |
| @acct-04 | 45 | 19% | 62.5h | 13.9h |
| @acct-05 | 40 | 16% | 226.8h | 13.8h |
| @acct-06 | 41 | 55% | 209.1h | 12h |
| @acct-07 | 41 | 49% | 210.4h | 12h |
| @acct-08 | 43 | 57% | 210.3h | 13.8h |
| @acct-09 | 41 | 56% | 210.3h | 12h |
| @acct-10 | 44 | 80% | 210.3h | 13.8h |
| @acct-11 | 17 | 0% | 72.7h | 208.4h |
| @acct-12 | 17 | 0% | 210.3h | 208.4h |
| @acct-13 | 250 | 0% | 227.7h | 208.4h |

> `steem.fleet` = **OK** — fleet posted 7.4h ago
> `steem.treasury` = **DEGRADED** — treasury acct-00 at 1645 SP < 3000 (recovery-plan §3)

## 4. Blurt (UNREACHABLE)
RPC בלתי-נגיש מהרץ: no blurt accounts configured in this repo's verifier config — fleet-intel honestly absent here (nothing measured, nothing claimed)
> `blurt.alive` = **NOTICE** — blurt RPC unreachable from runner (1 hosts tried) — UNREACHABLE, לא "מת" עד-שיימד

## 5. שלמות-עץ (ריקבון-מצבות)
נסרקו 244 קבצים; פגומים: 0

## 6. דלתא-מול-הריצה-הקודמת
- ↗ השתפר: `sbx.wf-artery-catchup` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-verifier` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-value-scan` DEGRADED → **OK**
- ↘ התדרדר: `sbx.wf-fleet-heal` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-artery-decision-truth` OK → **DEGRADED**
- ↗ השתפר: `sbx.wf-artery-grid` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-artery-integrity` DEGRADED → **OK**
- ↘ התדרדר: `sbx.wf-artery-participation` OK → **DEGRADED**
- ↗ השתפר: `dev.rate` DEGRADED → **NOTICE**

## 7. משימות-שנצרתו-עכשיו
- **V-LOOP-SOVEREIGN-STATE** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WATCH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-FLEET-HEAL** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-DECISION-TRUTH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-PARTICIPATION** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-TREASURY-BALANCE** — איזון-אוצר לפי §3: לשמר ≥3,000 SP אצל-האוצר; top-up חשבונות-פעילים ל-100 SP

## 8. שיטה-וראיות
- GitHub API: repos/commits/actions של roshpinacare-sys (read-only)
- RPC ציבורי keyless: https://api.steemit.com
- פנקס: state/verifier/history.jsonl (מרקל) · אימות-עצמי: node engine/verifier.mjs --verify-ledger
- קוד-הבדיקה: engine/verifier.mjs · כללים: ops/agents/zai-verifier/config.json
- עמוד-האמת-הציבורי: status/truth.html (נאפה-בכל-ריצה מהמדידה-הזו-עצמה; אפס-JS)
