# דוח-אמת (verifier) · 2026-10-14T08:21:03.909Z

**overall: FAIL** · auth: token(fed) · took: 23296ms · כללים: config.json (אפס-דעה-אישית)

> יש-דברים-שבורים-ממש — זה הדוח-הכן, בלי-קישוטים.

## 1. בריאות-עורקי-הסנדבוקס
| בדיקה | דרגה | ראיה |
|---|---|---|
| `sbx.wf-sovereign` | **OK** | success recent |
| `sbx.wf-sovereign-state` | **DEGRADED** | last success 18min ago > slot |
| `sbx.wf-artery-catchup` | **OK** | success recent |
| `sbx.wf-artery-watch` | **DEGRADED** | last success 25min ago > slot |
| `sbx.wf-verifier` | **OK** | success recent |
| `sbx.wf-federation` | **OK** | success recent |
| `sbx.wf-value-scan` | **FAIL** | last success 128min ago > 4x slot |
| `sbx.wf-hive-probe` | **OK** | success recent |
| `sbx.wf-fleet-heal` | **DEGRADED** | last success 52min ago > slot |
| `sbx.wf-artery-decision-truth` | **DEGRADED** | last success 46min ago > slot |
| `sbx.wf-artery-grid` | **DEGRADED** | last success 55min ago > slot |
| `sbx.wf-artery-wallet` | **OK** | success recent |
| `sbx.wf-artery-integrity` | **OK** | success recent |
| `sbx.wf-artery-participation` | **DEGRADED** | last success 74min ago > slot |
| `sbx.wf-artery-fleet` | **OK** | success recent |
| `sbx.wf-artery-flow` | **OK** | success recent |

## 2. קצב-בנייה-אמת (24h · code = infra/engine/src/scripts, churn = state/receipts/ops)
| ריפו | נראות | commits-24h | code-חלק | הערה |
|---|---|---|---|---|
| Autonomy | public | 100+ | 0% | ok |
| Console | public | 100+ | 0% | ok |
| Domain | public | 100+ | 8% | ok |
| Pulse | public | 68 | 0% | ok |

**מדד-מסכם:** codeShare = 2% (42 commits מסווגים מתוך 368)
> שיפוט: `dev.rate` = **DEGRADED** — heartbeat-without-building: codeShare 2% < 10% over 368 commits/24h

## 3. אמת-על-השרשרת · Steem (https://api.steemit.com)
| חשבון | SP אפקטיבי | VP% | פוסט-אחרון | הצבעה-אחרונה |
|---|---|---|---|---|
| @acct-00 | 2842 | 41% | 0.6h | 0.1h |
| @acct-01 | 75 | 79% | 33.2h | 3.7h |
| @acct-02 | 78 | 80% | 33.2h | 4.2h |
| @acct-03 | 94 | 77% | 33.1h | 4.2h |
| @acct-04 | 80 | 81% | 33.7h | 4.2h |
| @acct-05 | 75 | 79% | 50.8h | 4.2h |
| @acct-06 | 31 | 75% | 33.1h | 32.6h |
| @acct-07 | 31 | 80% | 34.4h | 4.2h |
| @acct-08 | 33 | 79% | 34.4h | 4.2h |
| @acct-09 | 12 | 55% | 34.4h | 3.7h |
| @acct-10 | 70 | 80% | 34.3h | 3.7h |
| @acct-11 | 17 | 93% | 53.2h | 32.5h |
| @acct-12 | 17 | 95% | 34.3h | 32.4h |
| @acct-13 | 17 | 93% | 51.7h | 32.4h |

> `steem.fleet` = **OK** — fleet posted 0.6h ago
> `steem.treasury` = **DEGRADED** — treasury acct-00 at 2842 SP < 3000 (recovery-plan §3)

## 4. Blurt (UNREACHABLE)
RPC בלתי-נגיש מהרץ: no blurt accounts configured in this repo's verifier config — fleet-intel honestly absent here (nothing measured, nothing claimed)
> `blurt.alive` = **NOTICE** — blurt RPC unreachable from runner (1 hosts tried) — UNREACHABLE, לא "מת" עד-שיימד

## 5. שלמות-עץ (ריקבון-מצבות)
נסרקו 107 קבצים; פגומים: 0

## 6. דלתא-מול-הריצה-הקודמת
- ↗ השתפר: `sbx.wf-federation` DEGRADED → **OK**
- ↘ התדרדר: `sbx.wf-value-scan` DEGRADED → **FAIL**
- ↘ התדרדר: `sbx.wf-fleet-heal` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-artery-decision-truth` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-artery-grid` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-artery-participation` OK → **DEGRADED**
- ↘ התדרדר: `dev.rate` NOTICE → **DEGRADED**

## 7. משימות-שנצרתו-עכשיו
- **V-LOOP-SOVEREIGN-STATE** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WATCH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-VALUE-SCAN** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-FLEET-HEAL** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-DECISION-TRUTH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-GRID** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-PARTICIPATION** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-DEV-FOCUS** — דופק-בלי-בנייה: להפנות-משאב-סוכנים מטביעות-מצב לבניית-מוצר/תיקונים אמתיים
- **V-TREASURY-BALANCE** — איזון-אוצר לפי §3: לשמר ≥3,000 SP אצל-האוצר; top-up חשבונות-פעילים ל-100 SP

## 8. שיטה-וראיות
- GitHub API: repos/commits/actions של roshpinacare-sys (read-only)
- RPC ציבורי keyless: https://api.steemit.com
- פנקס: state/verifier/history.jsonl (מרקל) · אימות-עצמי: node engine/verifier.mjs --verify-ledger
- קוד-הבדיקה: engine/verifier.mjs · כללים: ops/agents/zai-verifier/config.json
- עמוד-האמת-הציבורי: status/truth.html (נאפה-בכל-ריצה מהמדידה-הזו-עצמה; אפס-JS)
