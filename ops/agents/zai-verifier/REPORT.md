# דוח-אמת (verifier) · 2026-11-11T21:11:48.859Z

**overall: FAIL** · auth: token(fed) · took: 19795ms · כללים: config.json (אפס-דעה-אישית)

> יש-דברים-שבורים-ממש — זה הדוח-הכן, בלי-קישוטים.

## 1. בריאות-עורקי-הסנדבוקס
| בדיקה | דרגה | ראיה |
|---|---|---|
| `sbx.wf-sovereign` | **DEGRADED** | last success 72min ago > slot |
| `sbx.wf-sovereign-state` | **DEGRADED** | last success 58min ago > slot |
| `sbx.wf-artery-catchup` | **FAIL** | last success 121min ago > 4x slot |
| `sbx.wf-artery-watch` | **FAIL** | last success 94min ago > 4x slot |
| `sbx.wf-verifier` | **DEGRADED** | last success 94min ago > slot |
| `sbx.wf-federation` | **FAIL** | last success 121min ago > 4x slot |
| `sbx.wf-value-scan` | **DEGRADED** | last success 67min ago > slot |
| `sbx.wf-hive-probe` | **OK** | success recent |
| `sbx.wf-fleet-heal` | **FAIL** | last success 121min ago > 4x slot |
| `sbx.wf-artery-decision-truth` | **DEGRADED** | last success 94min ago > slot |
| `sbx.wf-artery-grid` | **DEGRADED** | last success 67min ago > slot |
| `sbx.wf-artery-wallet` | **DEGRADED** | last success 67min ago > slot |
| `sbx.wf-artery-integrity` | **DEGRADED** | last success 153min ago > slot |
| `sbx.wf-artery-participation` | **DEGRADED** | last success 153min ago > slot |
| `sbx.wf-artery-fleet` | **DEGRADED** | last success 120min ago > slot |
| `sbx.wf-artery-flow` | **OK** | success recent |

## 2. קצב-בנייה-אמת (24h · code = infra/engine/src/scripts, churn = state/receipts/ops)
| ריפו | נראות | commits-24h | code-חלק | הערה |
|---|---|---|---|---|
| Autonomy | public | 100+ | 0% | ok |
| Console | public | 100+ | 0% | ok |
| Domain | public | 100+ | 0% | ok |
| Pulse | public | 49 | 0% | ok |

**מדד-מסכם:** codeShare = 0% (42 commits מסווגים מתוך 349)
> שיפוט: `dev.rate` = **DEGRADED** — heartbeat-without-building: codeShare 0% < 10% over 349 commits/24h

## 3. אמת-על-השרשרת · Steem (https://api.steemit.com)
| חשבון | SP אפקטיבי | VP% | פוסט-אחרון | הצבעה-אחרונה |
|---|---|---|---|---|
| @acct-00 | 2603 | 40% | 20.8h | 7h |
| @acct-01 | 301 | 68% | 581.6h | 40.6h |
| @acct-02 | 304 | 55% | 574.2h | 367.9h |
| @acct-03 | 320 | 55% | 572.8h | 367.9h |
| @acct-04 | 305 | 55% | 571.4h | 367.9h |
| @acct-05 | 300 | 55% | 735.7h | 367.9h |
| @acct-06 | 100 | 0% | 717.9h | 367.9h |
| @acct-07 | 100 | 69% | 719.2h | 40.6h |
| @acct-08 | 100 | 64% | 719.2h | 40.6h |
| @acct-09 | 100 | 0% | 719.2h | 367.9h |
| @acct-10 | 100 | 0% | 719.2h | 367.9h |
| @acct-11 | 31 | 66% | 581.6h | 40.6h |
| @acct-12 | 45 | 67% | 719.2h | 40.6h |
| @acct-13 | 1 | 0% | 736.6h | 337.9h |

> `steem.fleet` = **OK** — fleet posted 20.8h ago
> `steem.treasury` = **DEGRADED** — treasury acct-00 at 2603 SP < 3000 (recovery-plan §3)

## 4. Blurt (UNREACHABLE)
RPC בלתי-נגיש מהרץ: no blurt accounts configured in this repo's verifier config — fleet-intel honestly absent here (nothing measured, nothing claimed)
> `blurt.alive` = **NOTICE** — blurt RPC unreachable from runner (1 hosts tried) — UNREACHABLE, לא "מת" עד-שיימד

## 5. שלמות-עץ (ריקבון-מצבות)
נסרקו 406 קבצים; פגומים: 0

## 6. דלתא-מול-הריצה-הקודמת
- ↘ התדרדר: `sbx.wf-sovereign` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-artery-catchup` DEGRADED → **FAIL**
- ↘ התדרדר: `sbx.wf-artery-watch` DEGRADED → **FAIL**
- ↘ התדרדר: `sbx.wf-federation` DEGRADED → **FAIL**
- ↘ התדרדר: `sbx.wf-fleet-heal` DEGRADED → **FAIL**
- ↘ התדרדר: `sbx.wf-artery-decision-truth` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-artery-fleet` OK → **DEGRADED**

## 7. משימות-שנצרתו-עכשיו
- **V-LOOP-SOVEREIGN** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
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
- **V-DEV-FOCUS** — דופק-בלי-בנייה: להפנות-משאב-סוכנים מטביעות-מצב לבניית-מוצר/תיקונים אמתיים
- **V-TREASURY-BALANCE** — איזון-אוצר לפי §3: לשמר ≥3,000 SP אצל-האוצר; top-up חשבונות-פעילים ל-100 SP

## 8. שיטה-וראיות
- GitHub API: repos/commits/actions של roshpinacare-sys (read-only)
- RPC ציבורי keyless: https://api.steemit.com
- פנקס: state/verifier/history.jsonl (מרקל) · אימות-עצמי: node engine/verifier.mjs --verify-ledger
- קוד-הבדיקה: engine/verifier.mjs · כללים: ops/agents/zai-verifier/config.json
- עמוד-האמת-הציבורי: status/truth.html (נאפה-בכל-ריצה מהמדידה-הזו-עצמה; אפס-JS)
