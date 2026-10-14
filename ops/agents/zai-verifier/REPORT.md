# דוח-אמת (verifier) · 2026-10-14T04:54:09.046Z

**overall: FAIL** · auth: token(fed) · took: 16171ms · כללים: config.json (אפס-דעה-אישית)

> יש-דברים-שבורים-ממש — זה הדוח-הכן, בלי-קישוטים.

## 1. בריאות-עורקי-הסנדבוקס
| בדיקה | דרגה | ראיה |
|---|---|---|
| `sbx.wf-sovereign` | **OK** | success recent |
| `sbx.wf-sovereign-state` | **DEGRADED** | last success 25min ago > slot |
| `sbx.wf-artery-catchup` | **DEGRADED** | last success 31min ago > slot |
| `sbx.wf-artery-watch` | **DEGRADED** | last success 31min ago > slot |
| `sbx.wf-verifier` | **OK** | success recent |
| `sbx.wf-federation` | **DEGRADED** | last success 46min ago > slot |
| `sbx.wf-value-scan` | **FAIL** | last success 219min ago > 4x slot |
| `sbx.wf-hive-probe` | **OK** | success recent |
| `sbx.wf-fleet-heal` | **DEGRADED** | last success 46min ago > slot |
| `sbx.wf-artery-decision-truth` | **OK** | success recent |
| `sbx.wf-artery-grid` | **DEGRADED** | last success 37min ago > slot |
| `sbx.wf-artery-wallet` | **OK** | success recent |
| `sbx.wf-artery-integrity` | **DEGRADED** | last success 105min ago > slot |
| `sbx.wf-artery-participation` | **OK** | success recent |
| `sbx.wf-artery-fleet` | **OK** | success recent |
| `sbx.wf-artery-flow` | **OK** | success recent |

## 2. קצב-בנייה-אמת (24h · code = infra/engine/src/scripts, churn = state/receipts/ops)
| ריפו | נראות | commits-24h | code-חלק | הערה |
|---|---|---|---|---|
| Autonomy | public | 100+ | 0% | ok |
| Console | public | 100+ | 8% | ok |
| Domain | public | 100+ | 0% | ok |
| Pulse | public | 61 | 17% | ok |

**מדד-מסכם:** codeShare = 5% (42 commits מסווגים מתוך 361)
> שיפוט: `dev.rate` = **DEGRADED** — heartbeat-without-building: codeShare 5% < 10% over 361 commits/24h

## 3. אמת-על-השרשרת · Steem (https://api.steemit.com)
| חשבון | SP אפקטיבי | VP% | פוסט-אחרון | הצבעה-אחרונה |
|---|---|---|---|---|
| @acct-00 | 2842 | 41% | 3.6h | 0h |
| @acct-01 | 75 | 79% | 29.7h | 0.3h |
| @acct-02 | 78 | 80% | 29.7h | 0.8h |
| @acct-03 | 94 | 77% | 29.7h | 0.8h |
| @acct-04 | 80 | 81% | 30.2h | 0.8h |
| @acct-05 | 75 | 79% | 47.4h | 0.8h |
| @acct-06 | 31 | 75% | 29.6h | 29.1h |
| @acct-07 | 31 | 80% | 30.9h | 0.8h |
| @acct-08 | 33 | 79% | 30.9h | 0.8h |
| @acct-09 | 12 | 55% | 30.9h | 0.3h |
| @acct-10 | 70 | 80% | 30.9h | 0.2h |
| @acct-11 | 17 | 93% | 49.8h | 29h |
| @acct-12 | 17 | 95% | 30.9h | 29h |
| @acct-13 | 17 | 93% | 48.3h | 29h |

> `steem.fleet` = **OK** — fleet posted 3.6h ago
> `steem.treasury` = **DEGRADED** — treasury acct-00 at 2842 SP < 3000 (recovery-plan §3)

## 4. Blurt (UNREACHABLE)
RPC בלתי-נגיש מהרץ: no blurt accounts configured in this repo's verifier config — fleet-intel honestly absent here (nothing measured, nothing claimed)
> `blurt.alive` = **NOTICE** — blurt RPC unreachable from runner (1 hosts tried) — UNREACHABLE, לא "מת" עד-שיימד

## 5. שלמות-עץ (ריקבון-מצבות)
נסרקו 104 קבצים; פגומים: 0

## 6. דלתא-מול-הריצה-הקודמת
- ↘ התדרדר: `sbx.wf-artery-catchup` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-federation` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-fleet-heal` OK → **DEGRADED**
- ↗ השתפר: `sbx.wf-artery-decision-truth` DEGRADED → **OK**
- ↘ התדרדר: `sbx.wf-artery-grid` OK → **DEGRADED**
- ↗ השתפר: `sbx.wf-artery-participation` DEGRADED → **OK**

## 7. משימות-שנצרתו-עכשיו
- **V-LOOP-SOVEREIGN-STATE** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-CATCHUP** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WATCH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-FEDERATION** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-VALUE-SCAN** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-FLEET-HEAL** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-GRID** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-INTEGRITY** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-DEV-FOCUS** — דופק-בלי-בנייה: להפנות-משאב-סוכנים מטביעות-מצב לבניית-מוצר/תיקונים אמתיים
- **V-TREASURY-BALANCE** — איזון-אוצר לפי §3: לשמר ≥3,000 SP אצל-האוצר; top-up חשבונות-פעילים ל-100 SP

## 8. שיטה-וראיות
- GitHub API: repos/commits/actions של roshpinacare-sys (read-only)
- RPC ציבורי keyless: https://api.steemit.com
- פנקס: state/verifier/history.jsonl (מרקל) · אימות-עצמי: node engine/verifier.mjs --verify-ledger
- קוד-הבדיקה: engine/verifier.mjs · כללים: ops/agents/zai-verifier/config.json
- עמוד-האמת-הציבורי: status/truth.html (נאפה-בכל-ריצה מהמדידה-הזו-עצמה; אפס-JS)
