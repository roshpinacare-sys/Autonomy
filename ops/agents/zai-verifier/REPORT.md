# דוח-אמת (verifier) · 2026-10-13T00:47:37.039Z

**overall: FAIL** · auth: token(fed) · took: 17523ms · כללים: config.json (אפס-דעה-אישית)

> יש-דברים-שבורים-ממש — זה הדוח-הכן, בלי-קישוטים.

## 1. בריאות-עורקי-הסנדבוקס
| בדיקה | דרגה | ראיה |
|---|---|---|
| `sbx.wf-sovereign` | **OK** | success recent |
| `sbx.wf-sovereign-state` | **DEGRADED** | last success 21min ago > slot |
| `sbx.wf-artery-catchup` | **DEGRADED** | last success 47min ago > slot |
| `sbx.wf-artery-watch` | **DEGRADED** | last success 47min ago > slot |
| `sbx.wf-verifier` | **FAIL** | last success 129min ago > 4x slot |
| `sbx.wf-federation` | **DEGRADED** | last success 47min ago > slot |
| `sbx.wf-value-scan` | **FAIL** | last success 211min ago > 4x slot |
| `sbx.wf-hive-probe` | **OK** | success recent |
| `sbx.wf-fleet-heal` | **DEGRADED** | last success 47min ago > slot |
| `sbx.wf-artery-decision-truth` | **DEGRADED** | last success 47min ago > slot |
| `sbx.wf-artery-grid` | **FAIL** | no success in last 4 runs of artery-grid.yml |
| `sbx.wf-artery-wallet` | **FAIL** | no success in last 3 runs of artery-wallet.yml |
| `sbx.wf-artery-integrity` | **FAIL** | last success 247min ago > 4x slot |
| `sbx.wf-artery-participation` | **DEGRADED** | last success 211min ago > slot |
| `sbx.wf-artery-fleet` | **FAIL** | no success in last 3 runs of artery-fleet.yml |
| `sbx.wf-artery-flow` | **OK** | success recent |

## 2. קצב-בנייה-אמת (24h · code = infra/engine/src/scripts, churn = state/receipts/ops)
| ריפו | נראות | commits-24h | code-חלק | הערה |
|---|---|---|---|---|
| Autonomy | public | 71 | 8% | ok |
| Console | public | 100+ | 50% | ok |
| Domain | public | 100+ | 17% | ok |
| Pulse | public | 29 | 50% | ok |

**מדד-מסכם:** codeShare = 29% (42 commits מסווגים מתוך 300)
> שיפוט: `dev.rate` = **OK** — building: codeShare 29% over 300 commits/24h

## 3. אמת-על-השרשרת · Steem (https://api.steemit.com)
| חשבון | SP אפקטיבי | VP% | פוסט-אחרון | הצבעה-אחרונה |
|---|---|---|---|---|
| @acct-00 | 2811 | 41% | 0.5h | 0h |
| @acct-01 | 75 | 77% | 1.6h | 1.1h |
| @acct-02 | 78 | 77% | 1.6h | 1.1h |
| @acct-03 | 94 | 76% | 1.6h | 1.1h |
| @acct-04 | 80 | 75% | 2.1h | 1h |
| @acct-05 | 75 | 77% | 19.3h | 1h |
| @acct-06 | 12 | 50% | 1.5h | 1h |
| @acct-07 | 31 | 81% | 2.8h | 1h |
| @acct-08 | 33 | 80% | 2.8h | 1h |
| @acct-09 | 31 | 74% | 2.8h | 0.9h |
| @acct-10 | 70 | 86% | 2.8h | 0.9h |
| @acct-11 | 17 | 93% | 21.7h | 0.9h |
| @acct-12 | 17 | 95% | 2.8h | 0.9h |
| @acct-13 | 17 | 93% | 20.2h | 0.9h |

> `steem.fleet` = **OK** — fleet posted 0.5h ago
> `steem.treasury` = **DEGRADED** — treasury acct-00 at 2811 SP < 3000 (recovery-plan §3)

## 4. Blurt (UNREACHABLE)
RPC בלתי-נגיש מהרץ: no blurt accounts configured in this repo's verifier config — fleet-intel honestly absent here (nothing measured, nothing claimed)
> `blurt.alive` = **NOTICE** — blurt RPC unreachable from runner (1 hosts tried) — UNREACHABLE, לא "מת" עד-שיימד

## 5. שלמות-עץ (ריקבון-מצבות)
נסרקו 51 קבצים; פגומים: 0

## 6. דלתא-מול-הריצה-הקודמת
- ↘ התדרדר: `sbx.wf-value-scan` DEGRADED → **FAIL**
- ↗ השתפר: `sbx.wf-hive-probe` FAIL → **OK**
- ↘ התדרדר: `sbx.wf-artery-integrity` DEGRADED → **FAIL**
- ↗ השתפר: `sbx.wf-artery-flow` NOTICE → **OK**
- ↗ השתפר: `dev.rate` NOTICE → **OK**

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
- **V-LOOP-ARTERY-PARTICIPATION** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-FLEET** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-TREASURY-BALANCE** — איזון-אוצר לפי §3: לשמר ≥3,000 SP אצל-האוצר; top-up חשבונות-פעילים ל-100 SP

## 8. שיטה-וראיות
- GitHub API: repos/commits/actions של roshpinacare-sys (read-only)
- RPC ציבורי keyless: https://api.steemit.com
- פנקס: state/verifier/history.jsonl (מרקל) · אימות-עצמי: node engine/verifier.mjs --verify-ledger
- קוד-הבדיקה: engine/verifier.mjs · כללים: ops/agents/zai-verifier/config.json
- עמוד-האמת-הציבורי: status/truth.html (נאפה-בכל-ריצה מהמדידה-הזו-עצמה; אפס-JS)
