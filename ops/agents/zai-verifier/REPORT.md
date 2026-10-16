# דוח-אמת (verifier) · 2026-10-16T20:27:00.259Z

**overall: FAIL** · auth: token(fed) · took: 18804ms · כללים: config.json (אפס-דעה-אישית)

> יש-דברים-שבורים-ממש — זה הדוח-הכן, בלי-קישוטים.

## 1. בריאות-עורקי-הסנדבוקס
| בדיקה | דרגה | ראיה |
|---|---|---|
| `sbx.wf-sovereign` | **OK** | success recent |
| `sbx.wf-sovereign-state` | **DEGRADED** | last success 22min ago > slot |
| `sbx.wf-artery-catchup` | **OK** | success recent |
| `sbx.wf-artery-watch` | **DEGRADED** | last success 23min ago > slot |
| `sbx.wf-verifier` | **DEGRADED** | last success 43min ago > slot |
| `sbx.wf-federation` | **DEGRADED** | last success 33min ago > slot |
| `sbx.wf-value-scan` | **FAIL** | last success 122min ago > 4x slot |
| `sbx.wf-hive-probe` | **OK** | success recent |
| `sbx.wf-fleet-heal` | **DEGRADED** | last success 33min ago > slot |
| `sbx.wf-artery-decision-truth` | **DEGRADED** | last success 50min ago > slot |
| `sbx.wf-artery-grid` | **FAIL** | last success 304min ago > 4x slot |
| `sbx.wf-artery-wallet` | **OK** | success recent |
| `sbx.wf-artery-integrity` | **OK** | success recent |
| `sbx.wf-artery-participation` | **OK** | success recent |
| `sbx.wf-artery-fleet` | **DEGRADED** | last success 136min ago > slot |
| `sbx.wf-artery-flow` | **OK** | success recent |

## 2. קצב-בנייה-אמת (24h · code = infra/engine/src/scripts, churn = state/receipts/ops)
| ריפו | נראות | commits-24h | code-חלק | הערה |
|---|---|---|---|---|
| Autonomy | public | 100+ | 0% | ok |
| Console | public | 100+ | 42% | ok |
| Domain | public | 100+ | 0% | ok |
| Pulse | public | 70 | 0% | ok |

**מדד-מסכם:** codeShare = 12% (42 commits מסווגים מתוך 370)
> שיפוט: `dev.rate` = **NOTICE** — mixed activity: codeShare 12%

## 3. אמת-על-השרשרת · Steem (https://api.steemit.com)
| חשבון | SP אפקטיבי | VP% | פוסט-אחרון | הצבעה-אחרונה |
|---|---|---|---|---|
| @acct-00 | 3502 | 57% | 14.9h | 3.3h |
| @acct-01 | 75 | 82% | 93.3h | 7.8h |
| @acct-02 | 78 | 83% | 93.3h | 7.8h |
| @acct-03 | 95 | 81% | 93.2h | 7.8h |
| @acct-04 | 80 | 82% | 93.8h | 7.8h |
| @acct-05 | 75 | 82% | 110.9h | 7.8h |
| @acct-06 | 31 | 79% | 93.2h | 7.8h |
| @acct-07 | 31 | 83% | 94.5h | 7.7h |
| @acct-08 | 33 | 81% | 94.5h | 7.8h |
| @acct-09 | 12 | 73% | 94.5h | 7.8h |
| @acct-10 | 70 | 85% | 94.4h | 7.8h |
| @acct-11 | 17 | 93% | 113.3h | 92.6h |
| @acct-12 | 17 | 95% | 94.4h | 92.5h |
| @acct-13 | 17 | 93% | 111.8h | 92.5h |

> `steem.fleet` = **OK** — fleet posted 14.9h ago
> `steem.treasury` = **OK** — treasury acct-00 at 3502 SP

## 4. Blurt (UNREACHABLE)
RPC בלתי-נגיש מהרץ: no blurt accounts configured in this repo's verifier config — fleet-intel honestly absent here (nothing measured, nothing claimed)
> `blurt.alive` = **NOTICE** — blurt RPC unreachable from runner (1 hosts tried) — UNREACHABLE, לא "מת" עד-שיימד

## 5. שלמות-עץ (ריקבון-מצבות)
נסרקו 115 קבצים; פגומים: 0

## 6. דלתא-מול-הריצה-הקודמת
- ↘ התדרדר: `sbx.wf-verifier` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-federation` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-value-scan` DEGRADED → **FAIL**
- ↘ התדרדר: `sbx.wf-fleet-heal` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-artery-decision-truth` OK → **DEGRADED**
- ↗ השתפר: `sbx.wf-artery-wallet` DEGRADED → **OK**
- ↘ התדרדר: `sbx.wf-artery-fleet` OK → **DEGRADED**
- ↗ השתפר: `sbx.wf-artery-flow` DEGRADED → **OK**

## 7. משימות-שנצרתו-עכשיו
- **V-LOOP-SOVEREIGN-STATE** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WATCH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-VERIFIER** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-FEDERATION** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-VALUE-SCAN** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-FLEET-HEAL** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-DECISION-TRUTH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-GRID** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-FLEET** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)

## 8. שיטה-וראיות
- GitHub API: repos/commits/actions של roshpinacare-sys (read-only)
- RPC ציבורי keyless: https://api.steemit.com
- פנקס: state/verifier/history.jsonl (מרקל) · אימות-עצמי: node engine/verifier.mjs --verify-ledger
- קוד-הבדיקה: engine/verifier.mjs · כללים: ops/agents/zai-verifier/config.json
- עמוד-האמת-הציבורי: status/truth.html (נאפה-בכל-ריצה מהמדידה-הזו-עצמה; אפס-JS)
