# דוח-אמת (verifier) · 2026-10-17T23:00:21.209Z

**overall: FAIL** · auth: token(fed) · took: 17247ms · כללים: config.json (אפס-דעה-אישית)

> יש-דברים-שבורים-ממש — זה הדוח-הכן, בלי-קישוטים.

## 1. בריאות-עורקי-הסנדבוקס
| בדיקה | דרגה | ראיה |
|---|---|---|
| `sbx.wf-sovereign` | **OK** | success recent |
| `sbx.wf-sovereign-state` | **FAIL** | no success in last 6 runs of sovereign-state.yml |
| `sbx.wf-artery-catchup` | **DEGRADED** | last success 44min ago > slot |
| `sbx.wf-artery-watch` | **FAIL** | last success 66min ago > 4x slot |
| `sbx.wf-verifier` | **OK** | success recent |
| `sbx.wf-federation` | **DEGRADED** | last success 75min ago > slot |
| `sbx.wf-value-scan` | **FAIL** | last success 121min ago > 4x slot |
| `sbx.wf-hive-probe` | **DEGRADED** | last success 2215min ago > slot |
| `sbx.wf-fleet-heal` | **FAIL** | last success 1312min ago > 4x slot |
| `sbx.wf-artery-decision-truth` | **FAIL** | last success 121min ago > 4x slot |
| `sbx.wf-artery-grid` | **DEGRADED** | last success 64min ago > slot |
| `sbx.wf-artery-wallet` | **FAIL** | last success 1289min ago > 4x slot |
| `sbx.wf-artery-integrity` | **OK** | success recent |
| `sbx.wf-artery-participation` | **DEGRADED** | last success 121min ago > slot |
| `sbx.wf-artery-fleet` | **FAIL** | last success 1345min ago > 4x slot |
| `sbx.wf-artery-flow` | **OK** | success recent |

## 2. קצב-בנייה-אמת (24h · code = infra/engine/src/scripts, churn = state/receipts/ops)
| ריפו | נראות | commits-24h | code-חלק | הערה |
|---|---|---|---|---|
| Autonomy | public | 100+ | 0% | ok |
| Console | public | 100+ | 0% | ok |
| Domain | public | 100+ | 0% | ok |
| Pulse | public | 8 | 0% | ok |

**מדד-מסכם:** codeShare = 0% (42 commits מסווגים מתוך 308)
> שיפוט: `dev.rate` = **DEGRADED** — heartbeat-without-building: codeShare 0% < 10% over 308 commits/24h

## 3. אמת-על-השרשרת · Steem (https://api.steemit.com)
| חשבון | SP אפקטיבי | VP% | פוסט-אחרון | הצבעה-אחרונה |
|---|---|---|---|---|
| @acct-00 | 2909 | 42% | 41.5h | 0.8h |
| @acct-01 | 75 | 77% | 119.8h | 19.3h |
| @acct-02 | 78 | 77% | 119.8h | 19.3h |
| @acct-03 | 95 | 73% | 119.8h | 19.3h |
| @acct-04 | 80 | 77% | 120.3h | 19.3h |
| @acct-05 | 75 | 77% | 137.5h | 19.3h |
| @acct-06 | 83 | 84% | 119.7h | 18.5h |
| @acct-07 | 14 | 24% | 121h | 19.3h |
| @acct-08 | 61 | 81% | 121h | 19.3h |
| @acct-09 | 89 | 86% | 121h | 19.3h |
| @acct-10 | 70 | 77% | 121h | 19.3h |
| @acct-11 | 17 | 93% | 139.9h | 119.1h |
| @acct-12 | 17 | 95% | 121h | 119.1h |
| @acct-13 | 17 | 93% | 138.4h | 119.1h |

> `steem.fleet` = **OK** — fleet posted 41.5h ago
> `steem.treasury` = **DEGRADED** — treasury acct-00 at 2909 SP < 3000 (recovery-plan §3)

## 4. Blurt (UNREACHABLE)
RPC בלתי-נגיש מהרץ: no blurt accounts configured in this repo's verifier config — fleet-intel honestly absent here (nothing measured, nothing claimed)
> `blurt.alive` = **NOTICE** — blurt RPC unreachable from runner (1 hosts tried) — UNREACHABLE, לא "מת" עד-שיימד

## 5. שלמות-עץ (ריקבון-מצבות)
נסרקו 138 קבצים; פגומים: 0

## 6. דלתא-מול-הריצה-הקודמת
- ↘ התדרדר: `sbx.wf-artery-catchup` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-artery-watch` DEGRADED → **FAIL**
- ↘ התדרדר: `sbx.wf-value-scan` DEGRADED → **FAIL**
- ↘ התדרדר: `sbx.wf-artery-decision-truth` DEGRADED → **FAIL**

## 7. משימות-שנצרתו-עכשיו
- **V-LOOP-SOVEREIGN-STATE** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-CATCHUP** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WATCH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-FEDERATION** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
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
