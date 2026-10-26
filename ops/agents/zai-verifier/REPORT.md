# דוח-אמת (verifier) · 2026-10-26T21:19:34.739Z

**overall: FAIL** · auth: token(fed) · took: 19454ms · כללים: config.json (אפס-דעה-אישית)

> יש-דברים-שבורים-ממש — זה הדוח-הכן, בלי-קישוטים.

## 1. בריאות-עורקי-הסנדבוקס
| בדיקה | דרגה | ראיה |
|---|---|---|
| `sbx.wf-sovereign` | **OK** | success recent |
| `sbx.wf-sovereign-state` | **DEGRADED** | last success 25min ago > slot |
| `sbx.wf-artery-catchup` | **DEGRADED** | last success 43min ago > slot |
| `sbx.wf-artery-watch` | **DEGRADED** | last success 49min ago > slot |
| `sbx.wf-verifier` | **DEGRADED** | last success 31min ago > slot |
| `sbx.wf-federation` | **DEGRADED** | last success 69min ago > slot |
| `sbx.wf-value-scan` | **DEGRADED** | last success 42min ago > slot |
| `sbx.wf-hive-probe` | **OK** | success recent |
| `sbx.wf-fleet-heal` | **DEGRADED** | last success 36min ago > slot |
| `sbx.wf-artery-decision-truth` | **DEGRADED** | last success 31min ago > slot |
| `sbx.wf-artery-grid` | **DEGRADED** | last success 49min ago > slot |
| `sbx.wf-artery-wallet` | **FAIL** | no success in last 6 runs of artery-wallet.yml |
| `sbx.wf-artery-integrity` | **DEGRADED** | last success 77min ago > slot |
| `sbx.wf-artery-participation` | **OK** | success recent |
| `sbx.wf-artery-fleet` | **FAIL** | no success in last 7 runs of artery-fleet.yml |
| `sbx.wf-artery-flow` | **OK** | success recent |

## 2. קצב-בנייה-אמת (24h · code = infra/engine/src/scripts, churn = state/receipts/ops)
| ריפו | נראות | commits-24h | code-חלק | הערה |
|---|---|---|---|---|
| Autonomy | public | 100+ | 0% | ok |
| Console | public | 100+ | 0% | ok |
| Domain | public | 100+ | 0% | ok |
| Pulse | public | 56 | 0% | ok |

**מדד-מסכם:** codeShare = 0% (42 commits מסווגים מתוך 356)
> שיפוט: `dev.rate` = **DEGRADED** — heartbeat-without-building: codeShare 0% < 10% over 356 commits/24h

## 3. אמת-על-השרשרת · Steem (https://api.steemit.com)
| חשבון | SP אפקטיבי | VP% | פוסט-אחרון | הצבעה-אחרונה |
|---|---|---|---|---|
| @acct-00 | 3661 | 72% | 2.2h | 3.2h |
| @acct-01 | 75 | 66% | 197.7h | 5.5h |
| @acct-02 | 78 | 78% | 190.3h | 5.5h |
| @acct-03 | 60 | 70% | 188.9h | 5.5h |
| @acct-04 | 45 | 67% | 187.5h | 5.5h |
| @acct-05 | 40 | 66% | 351.8h | 5.5h |
| @acct-06 | 41 | 78% | 334.1h | 5.5h |
| @acct-07 | 41 | 73% | 335.4h | 5.5h |
| @acct-08 | 43 | 77% | 335.4h | 5.5h |
| @acct-09 | 41 | 75% | 335.3h | 5.5h |
| @acct-10 | 44 | 79% | 335.3h | 5.5h |
| @acct-11 | 17 | 0% | 197.7h | 333.4h |
| @acct-12 | 17 | 0% | 335.3h | 333.4h |
| @acct-13 | 250 | 91% | 352.7h | 27.5h |

> `steem.fleet` = **OK** — fleet posted 2.2h ago
> `steem.treasury` = **OK** — treasury acct-00 at 3661 SP

## 4. Blurt (UNREACHABLE)
RPC בלתי-נגיש מהרץ: no blurt accounts configured in this repo's verifier config — fleet-intel honestly absent here (nothing measured, nothing claimed)
> `blurt.alive` = **NOTICE** — blurt RPC unreachable from runner (1 hosts tried) — UNREACHABLE, לא "מת" עד-שיימד

## 5. שלמות-עץ (ריקבון-מצבות)
נסרקו 255 קבצים; פגומים: 0

## 6. דלתא-מול-הריצה-הקודמת
- ↘ התדרדר: `sbx.wf-artery-catchup` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-value-scan` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-fleet-heal` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-artery-grid` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-artery-integrity` OK → **DEGRADED**

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
- **V-LOOP-ARTERY-FLEET** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-DEV-FOCUS** — דופק-בלי-בנייה: להפנות-משאב-סוכנים מטביעות-מצב לבניית-מוצר/תיקונים אמתיים

## 8. שיטה-וראיות
- GitHub API: repos/commits/actions של roshpinacare-sys (read-only)
- RPC ציבורי keyless: https://api.steemit.com
- פנקס: state/verifier/history.jsonl (מרקל) · אימות-עצמי: node engine/verifier.mjs --verify-ledger
- קוד-הבדיקה: engine/verifier.mjs · כללים: ops/agents/zai-verifier/config.json
- עמוד-האמת-הציבורי: status/truth.html (נאפה-בכל-ריצה מהמדידה-הזו-עצמה; אפס-JS)
