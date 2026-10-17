# דוח-אמת (verifier) · 2026-10-17T21:31:47.283Z

**overall: FAIL** · auth: token(fed) · took: 17944ms · כללים: config.json (אפס-דעה-אישית)

> יש-דברים-שבורים-ממש — זה הדוח-הכן, בלי-קישוטים.

## 1. בריאות-עורקי-הסנדבוקס
| בדיקה | דרגה | ראיה |
|---|---|---|
| `sbx.wf-sovereign` | **OK** | success recent |
| `sbx.wf-sovereign-state` | **DEGRADED** | last success 38min ago > slot |
| `sbx.wf-artery-catchup` | **OK** | success recent |
| `sbx.wf-artery-watch` | **DEGRADED** | last success 20min ago > slot |
| `sbx.wf-verifier` | **OK** | success recent |
| `sbx.wf-federation` | **OK** | success recent |
| `sbx.wf-value-scan` | **DEGRADED** | last success 32min ago > slot |
| `sbx.wf-hive-probe` | **DEGRADED** | last success 2127min ago > slot |
| `sbx.wf-fleet-heal` | **FAIL** | last success 1224min ago > 4x slot |
| `sbx.wf-artery-decision-truth` | **DEGRADED** | last success 32min ago > slot |
| `sbx.wf-artery-grid` | **DEGRADED** | last success 44min ago > slot |
| `sbx.wf-artery-wallet` | **FAIL** | last success 1201min ago > 4x slot |
| `sbx.wf-artery-integrity` | **DEGRADED** | last success 118min ago > slot |
| `sbx.wf-artery-participation` | **OK** | success recent |
| `sbx.wf-artery-fleet` | **FAIL** | last success 1256min ago > 4x slot |
| `sbx.wf-artery-flow` | **OK** | success recent |

## 2. קצב-בנייה-אמת (24h · code = infra/engine/src/scripts, churn = state/receipts/ops)
| ריפו | נראות | commits-24h | code-חלק | הערה |
|---|---|---|---|---|
| Autonomy | public | 100+ | 17% | ok |
| Console | public | 100+ | 0% | ok |
| Domain | public | 100+ | 0% | ok |
| Pulse | public | 11 | 0% | ok |

**מדד-מסכם:** codeShare = 5% (42 commits מסווגים מתוך 311)
> שיפוט: `dev.rate` = **DEGRADED** — heartbeat-without-building: codeShare 5% < 10% over 311 commits/24h

## 3. אמת-על-השרשרת · Steem (https://api.steemit.com)
| חשבון | SP אפקטיבי | VP% | פוסט-אחרון | הצבעה-אחרונה |
|---|---|---|---|---|
| @acct-00 | 2813 | 41% | 40h | 0.1h |
| @acct-01 | 75 | 77% | 118.3h | 17.8h |
| @acct-02 | 78 | 77% | 118.3h | 17.8h |
| @acct-03 | 95 | 73% | 118.3h | 17.8h |
| @acct-04 | 80 | 77% | 118.8h | 17.8h |
| @acct-05 | 75 | 77% | 136h | 17.8h |
| @acct-06 | 83 | 84% | 118.3h | 17.1h |
| @acct-07 | 14 | 24% | 119.6h | 17.8h |
| @acct-08 | 61 | 81% | 119.6h | 17.8h |
| @acct-09 | 89 | 86% | 119.5h | 17.8h |
| @acct-10 | 70 | 77% | 119.5h | 17.8h |
| @acct-11 | 17 | 93% | 138.4h | 117.6h |
| @acct-12 | 17 | 95% | 119.5h | 117.6h |
| @acct-13 | 17 | 93% | 136.9h | 117.6h |

> `steem.fleet` = **OK** — fleet posted 40h ago
> `steem.treasury` = **DEGRADED** — treasury acct-00 at 2813 SP < 3000 (recovery-plan §3)

## 4. Blurt (UNREACHABLE)
RPC בלתי-נגיש מהרץ: no blurt accounts configured in this repo's verifier config — fleet-intel honestly absent here (nothing measured, nothing claimed)
> `blurt.alive` = **NOTICE** — blurt RPC unreachable from runner (1 hosts tried) — UNREACHABLE, לא "מת" עד-שיימד

## 5. שלמות-עץ (ריקבון-מצבות)
נסרקו 138 קבצים; פגומים: 0

## 6. דלתא-מול-הריצה-הקודמת
- ↘ התדרדר: `sbx.wf-value-scan` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-artery-decision-truth` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-artery-grid` OK → **DEGRADED**

## 7. משימות-שנצרתו-עכשיו
- **V-LOOP-SOVEREIGN-STATE** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WATCH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-VALUE-SCAN** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-HIVE-PROBE** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-FLEET-HEAL** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-DECISION-TRUTH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-GRID** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WALLET** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-INTEGRITY** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-FLEET** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-DEV-FOCUS** — דופק-בלי-בנייה: להפנות-משאב-סוכנים מטביעות-מצב לבניית-מוצר/תיקונים אמתיים
- **V-TREASURY-BALANCE** — איזון-אוצר לפי §3: לשמר ≥3,000 SP אצל-האוצר; top-up חשבונות-פעילים ל-100 SP

## 8. שיטה-וראיות
- GitHub API: repos/commits/actions של roshpinacare-sys (read-only)
- RPC ציבורי keyless: https://api.steemit.com
- פנקס: state/verifier/history.jsonl (מרקל) · אימות-עצמי: node engine/verifier.mjs --verify-ledger
- קוד-הבדיקה: engine/verifier.mjs · כללים: ops/agents/zai-verifier/config.json
- עמוד-האמת-הציבורי: status/truth.html (נאפה-בכל-ריצה מהמדידה-הזו-עצמה; אפס-JS)
