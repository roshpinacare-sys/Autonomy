# דוח-אמת (verifier) · 2026-10-17T17:35:56.270Z

**overall: FAIL** · auth: token(fed) · took: 19136ms · כללים: config.json (אפס-דעה-אישית)

> יש-דברים-שבורים-ממש — זה הדוח-הכן, בלי-קישוטים.

## 1. בריאות-עורקי-הסנדבוקס
| בדיקה | דרגה | ראיה |
|---|---|---|
| `sbx.wf-sovereign` | **OK** | success recent |
| `sbx.wf-sovereign-state` | **OK** | success recent |
| `sbx.wf-artery-catchup` | **DEGRADED** | last success 32min ago > slot |
| `sbx.wf-artery-watch` | **DEGRADED** | last success 50min ago > slot |
| `sbx.wf-verifier` | **OK** | success recent |
| `sbx.wf-federation` | **OK** | success recent |
| `sbx.wf-value-scan` | **FAIL** | last success 1060min ago > 4x slot |
| `sbx.wf-hive-probe` | **DEGRADED** | last success 1891min ago > slot |
| `sbx.wf-fleet-heal` | **FAIL** | last success 988min ago > 4x slot |
| `sbx.wf-artery-decision-truth` | **FAIL** | last success 986min ago > 4x slot |
| `sbx.wf-artery-grid` | **DEGRADED** | last success 117min ago > slot |
| `sbx.wf-artery-wallet` | **FAIL** | last success 965min ago > 4x slot |
| `sbx.wf-artery-integrity` | **OK** | success recent |
| `sbx.wf-artery-participation` | **FAIL** | last success 938min ago > 4x slot |
| `sbx.wf-artery-fleet` | **FAIL** | last success 1020min ago > 4x slot |
| `sbx.wf-artery-flow` | **OK** | success recent |

## 2. קצב-בנייה-אמת (24h · code = infra/engine/src/scripts, churn = state/receipts/ops)
| ריפו | נראות | commits-24h | code-חלק | הערה |
|---|---|---|---|---|
| Autonomy | public | 100+ | 0% | ok |
| Console | public | 100+ | 0% | ok |
| Domain | public | 100+ | 0% | ok |
| Pulse | public | 20 | 0% | ok |

**מדד-מסכם:** codeShare = 0% (42 commits מסווגים מתוך 320)
> שיפוט: `dev.rate` = **DEGRADED** — heartbeat-without-building: codeShare 0% < 10% over 320 commits/24h

## 3. אמת-על-השרשרת · Steem (https://api.steemit.com)
| חשבון | SP אפקטיבי | VP% | פוסט-אחרון | הצבעה-אחרונה |
|---|---|---|---|---|
| @acct-00 | 2813 | 40% | 36.1h | 2.1h |
| @acct-01 | 75 | 77% | 114.4h | 13.9h |
| @acct-02 | 78 | 77% | 114.4h | 13.9h |
| @acct-03 | 95 | 73% | 114.4h | 13.9h |
| @acct-04 | 80 | 77% | 114.9h | 13.9h |
| @acct-05 | 75 | 77% | 132.1h | 13.9h |
| @acct-06 | 83 | 84% | 114.3h | 13.1h |
| @acct-07 | 14 | 24% | 115.6h | 13.9h |
| @acct-08 | 61 | 81% | 115.6h | 13.9h |
| @acct-09 | 89 | 86% | 115.6h | 13.9h |
| @acct-10 | 70 | 77% | 115.6h | 13.9h |
| @acct-11 | 17 | 93% | 134.5h | 113.7h |
| @acct-12 | 17 | 95% | 115.6h | 113.7h |
| @acct-13 | 17 | 93% | 133h | 113.7h |

> `steem.fleet` = **OK** — fleet posted 36.1h ago
> `steem.treasury` = **DEGRADED** — treasury acct-00 at 2813 SP < 3000 (recovery-plan §3)

## 4. Blurt (UNREACHABLE)
RPC בלתי-נגיש מהרץ: no blurt accounts configured in this repo's verifier config — fleet-intel honestly absent here (nothing measured, nothing claimed)
> `blurt.alive` = **NOTICE** — blurt RPC unreachable from runner (1 hosts tried) — UNREACHABLE, לא "מת" עד-שיימד

## 5. שלמות-עץ (ריקבון-מצבות)
נסרקו 130 קבצים; פגומים: 0

## 6. דלתא-מול-הריצה-הקודמת
- ↗ השתפר: `sbx.wf-sovereign-state` DEGRADED → **OK**
- ↘ התדרדר: `sbx.wf-artery-catchup` OK → **DEGRADED**
- ↗ השתפר: `sbx.wf-federation` DEGRADED → **OK**

## 7. משימות-שנצרתו-עכשיו
- **V-LOOP-ARTERY-CATCHUP** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WATCH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-VALUE-SCAN** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-HIVE-PROBE** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-FLEET-HEAL** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-DECISION-TRUTH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-GRID** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WALLET** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
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
