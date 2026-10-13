# דוח-אמת (verifier) · 2026-10-13T02:16:19.187Z

**overall: FAIL** · auth: token(fed) · took: 18041ms · כללים: config.json (אפס-דעה-אישית)

> יש-דברים-שבורים-ממש — זה הדוח-הכן, בלי-קישוטים.

## 1. בריאות-עורקי-הסנדבוקס
| בדיקה | דרגה | ראיה |
|---|---|---|
| `sbx.wf-sovereign` | **OK** | success recent |
| `sbx.wf-sovereign-state` | **DEGRADED** | last success 24min ago > slot |
| `sbx.wf-artery-catchup` | **OK** | success recent |
| `sbx.wf-artery-watch` | **DEGRADED** | last success 46min ago > slot |
| `sbx.wf-verifier` | **OK** | success recent |
| `sbx.wf-federation` | **OK** | success recent |
| `sbx.wf-value-scan` | **FAIL** | last success 300min ago > 4x slot |
| `sbx.wf-hive-probe` | **OK** | success recent |
| `sbx.wf-fleet-heal` | **OK** | success recent |
| `sbx.wf-artery-decision-truth` | **DEGRADED** | last success 64min ago > slot |
| `sbx.wf-artery-grid` | **FAIL** | no success in last 6 runs of artery-grid.yml |
| `sbx.wf-artery-wallet` | **FAIL** | no success in last 6 runs of artery-wallet.yml |
| `sbx.wf-artery-integrity` | **OK** | success recent |
| `sbx.wf-artery-participation` | **DEGRADED** | last success 87min ago > slot |
| `sbx.wf-artery-fleet` | **FAIL** | no success in last 5 runs of artery-fleet.yml |
| `sbx.wf-artery-flow` | **DEGRADED** | last success 218min ago > slot |

## 2. קצב-בנייה-אמת (24h · code = infra/engine/src/scripts, churn = state/receipts/ops)
| ריפו | נראות | commits-24h | code-חלק | הערה |
|---|---|---|---|---|
| Autonomy | public | 98 | 0% | ok |
| Console | public | 96 | 25% | ok |
| Domain | public | 100+ | 0% | ok |
| Pulse | public | 32 | 33% | ok |

**מדד-מסכם:** codeShare = 12% (42 commits מסווגים מתוך 326)
> שיפוט: `dev.rate` = **NOTICE** — mixed activity: codeShare 12%

## 3. אמת-על-השרשרת · Steem (https://api.steemit.com)
| חשבון | SP אפקטיבי | VP% | פוסט-אחרון | הצבעה-אחרונה |
|---|---|---|---|---|
| @acct-00 | 2811 | 41% | 0.8h | 0.7h |
| @acct-01 | 75 | 77% | 3.1h | 2.6h |
| @acct-02 | 78 | 77% | 3.1h | 2.6h |
| @acct-03 | 94 | 76% | 3.1h | 2.5h |
| @acct-04 | 80 | 75% | 3.6h | 2.5h |
| @acct-05 | 75 | 77% | 20.8h | 2.5h |
| @acct-06 | 12 | 50% | 3h | 2.5h |
| @acct-07 | 31 | 81% | 4.3h | 2.5h |
| @acct-08 | 33 | 80% | 4.3h | 2.4h |
| @acct-09 | 31 | 74% | 4.3h | 2.4h |
| @acct-10 | 70 | 86% | 4.3h | 2.4h |
| @acct-11 | 17 | 93% | 23.2h | 2.4h |
| @acct-12 | 17 | 95% | 4.2h | 2.4h |
| @acct-13 | 17 | 93% | 21.7h | 2.3h |

> `steem.fleet` = **OK** — fleet posted 0.8h ago
> `steem.treasury` = **DEGRADED** — treasury acct-00 at 2811 SP < 3000 (recovery-plan §3)

## 4. Blurt (UNREACHABLE)
RPC בלתי-נגיש מהרץ: no blurt accounts configured in this repo's verifier config — fleet-intel honestly absent here (nothing measured, nothing claimed)
> `blurt.alive` = **NOTICE** — blurt RPC unreachable from runner (1 hosts tried) — UNREACHABLE, לא "מת" עד-שיימד

## 5. שלמות-עץ (ריקבון-מצבות)
נסרקו 51 קבצים; פגומים: 0

## 6. דלתא-מול-הריצה-הקודמת
- ↗ השתפר: `sbx.wf-artery-catchup` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-federation` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-fleet-heal` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-artery-integrity` FAIL → **OK**
- ↘ התדרדר: `sbx.wf-artery-participation` OK → **DEGRADED**

## 7. משימות-שנצרתו-עכשיו
- **V-LOOP-SOVEREIGN-STATE** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WATCH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-VALUE-SCAN** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-DECISION-TRUTH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-GRID** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WALLET** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-PARTICIPATION** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-FLEET** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-FLOW** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-TREASURY-BALANCE** — איזון-אוצר לפי §3: לשמר ≥3,000 SP אצל-האוצר; top-up חשבונות-פעילים ל-100 SP

## 8. שיטה-וראיות
- GitHub API: repos/commits/actions של roshpinacare-sys (read-only)
- RPC ציבורי keyless: https://api.steemit.com
- פנקס: state/verifier/history.jsonl (מרקל) · אימות-עצמי: node engine/verifier.mjs --verify-ledger
- קוד-הבדיקה: engine/verifier.mjs · כללים: ops/agents/zai-verifier/config.json
- עמוד-האמת-הציבורי: status/truth.html (נאפה-בכל-ריצה מהמדידה-הזו-עצמה; אפס-JS)
