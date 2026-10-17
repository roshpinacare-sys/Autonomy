# דוח-אמת (verifier) · 2026-10-17T11:12:50.069Z

**overall: FAIL** · auth: token(fed) · took: 17223ms · כללים: config.json (אפס-דעה-אישית)

> יש-דברים-שבורים-ממש — זה הדוח-הכן, בלי-קישוטים.

## 1. בריאות-עורקי-הסנדבוקס
| בדיקה | דרגה | ראיה |
|---|---|---|
| `sbx.wf-sovereign` | **OK** | success recent |
| `sbx.wf-sovereign-state` | **FAIL** | last success 553min ago > 4x slot |
| `sbx.wf-artery-catchup` | **DEGRADED** | last success 38min ago > slot |
| `sbx.wf-artery-watch` | **DEGRADED** | last success 37min ago > slot |
| `sbx.wf-verifier` | **FAIL** | last success 562min ago > 4x slot |
| `sbx.wf-federation` | **DEGRADED** | last success 37min ago > slot |
| `sbx.wf-value-scan` | **FAIL** | last success 676min ago > 4x slot |
| `sbx.wf-hive-probe` | **DEGRADED** | last success 1508min ago > slot |
| `sbx.wf-fleet-heal` | **FAIL** | last success 605min ago > 4x slot |
| `sbx.wf-artery-decision-truth` | **FAIL** | last success 603min ago > 4x slot |
| `sbx.wf-artery-grid` | **OK** | success recent |
| `sbx.wf-artery-wallet` | **FAIL** | last success 582min ago > 4x slot |
| `sbx.wf-artery-integrity` | **FAIL** | last success 634min ago > 4x slot |
| `sbx.wf-artery-participation` | **FAIL** | last success 555min ago > 4x slot |
| `sbx.wf-artery-fleet` | **FAIL** | last success 637min ago > 4x slot |
| `sbx.wf-artery-flow` | **DEGRADED** | last success 573min ago > slot |

## 2. קצב-בנייה-אמת (24h · code = infra/engine/src/scripts, churn = state/receipts/ops)
| ריפו | נראות | commits-24h | code-חלק | הערה |
|---|---|---|---|---|
| Autonomy | public | 100+ | 0% | ok |
| Console | public | 100+ | 17% | ok |
| Domain | public | 100+ | 42% | ok |
| Pulse | public | 50 | 0% | ok |

**מדד-מסכם:** codeShare = 17% (42 commits מסווגים מתוך 350)
> שיפוט: `dev.rate` = **NOTICE** — mixed activity: codeShare 17%

## 3. אמת-על-השרשרת · Steem (https://api.steemit.com)
| חשבון | SP אפקטיבי | VP% | פוסט-אחרון | הצבעה-אחרונה |
|---|---|---|---|---|
| @acct-00 | 2813 | 30% | 29.7h | 9.5h |
| @acct-01 | 75 | 77% | 108h | 7.5h |
| @acct-02 | 78 | 77% | 108h | 7.5h |
| @acct-03 | 95 | 73% | 108h | 7.5h |
| @acct-04 | 80 | 77% | 108.5h | 7.5h |
| @acct-05 | 75 | 77% | 125.7h | 7.5h |
| @acct-06 | 83 | 84% | 108h | 6.8h |
| @acct-07 | 14 | 24% | 109.3h | 7.5h |
| @acct-08 | 61 | 81% | 109.2h | 7.5h |
| @acct-09 | 89 | 86% | 109.2h | 7.5h |
| @acct-10 | 70 | 77% | 109.2h | 7.5h |
| @acct-11 | 17 | 93% | 128.1h | 107.3h |
| @acct-12 | 17 | 95% | 109.2h | 107.3h |
| @acct-13 | 17 | 93% | 126.6h | 107.3h |

> `steem.fleet` = **OK** — fleet posted 29.7h ago
> `steem.treasury` = **DEGRADED** — treasury acct-00 at 2813 SP < 3000 (recovery-plan §3)

## 4. Blurt (UNREACHABLE)
RPC בלתי-נגיש מהרץ: no blurt accounts configured in this repo's verifier config — fleet-intel honestly absent here (nothing measured, nothing claimed)
> `blurt.alive` = **NOTICE** — blurt RPC unreachable from runner (1 hosts tried) — UNREACHABLE, לא "מת" עד-שיימד

## 5. שלמות-עץ (ריקבון-מצבות)
נסרקו 130 קבצים; פגומים: 0

## 6. דלתא-מול-הריצה-הקודמת
- ↘ התדרדר: `sbx.wf-sovereign-state` DEGRADED → **FAIL**
- ↘ התדרדר: `sbx.wf-artery-catchup` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-verifier` OK → **FAIL**
- ↘ התדרדר: `sbx.wf-federation` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-value-scan` DEGRADED → **FAIL**
- ↘ התדרדר: `sbx.wf-hive-probe` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-fleet-heal` DEGRADED → **FAIL**
- ↘ התדרדר: `sbx.wf-artery-decision-truth` DEGRADED → **FAIL**
- ↗ השתפר: `sbx.wf-artery-grid` FAIL → **OK**
- ↘ התדרדר: `sbx.wf-artery-wallet` OK → **FAIL**
- ↘ התדרדר: `sbx.wf-artery-integrity` DEGRADED → **FAIL**
- ↘ התדרדר: `sbx.wf-artery-participation` DEGRADED → **FAIL**
- ↘ התדרדר: `sbx.wf-artery-fleet` OK → **FAIL**
- ↘ התדרדר: `sbx.wf-artery-flow` OK → **DEGRADED**
- ↗ השתפר: `dev.rate` DEGRADED → **NOTICE**

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
- **V-LOOP-ARTERY-WALLET** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-INTEGRITY** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
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
