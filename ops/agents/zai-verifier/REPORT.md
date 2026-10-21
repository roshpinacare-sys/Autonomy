# דוח-אמת (verifier) · 2026-10-21T08:55:23.348Z

**overall: DEGRADED** · auth: token(fed) · took: 21012ms · כללים: config.json (אפס-דעה-אישית)

> המערכת חיה אך לא בריאה-כולה: יש עורקים/לולאות שאינם מתפקדים — עם ראיות.

## 1. בריאות-עורקי-הסנדבוקס
| בדיקה | דרגה | ראיה |
|---|---|---|
| `sbx.wf-sovereign` | **OK** | success recent |
| `sbx.wf-sovereign-state` | **DEGRADED** | last success 25min ago > slot |
| `sbx.wf-artery-catchup` | **OK** | success recent |
| `sbx.wf-artery-watch` | **DEGRADED** | last success 30min ago > slot |
| `sbx.wf-verifier` | **OK** | success recent |
| `sbx.wf-federation` | **DEGRADED** | last success 71min ago > slot |
| `sbx.wf-value-scan` | **DEGRADED** | last success 30min ago > slot |
| `sbx.wf-hive-probe` | **OK** | success recent |
| `sbx.wf-fleet-heal` | **DEGRADED** | last success 71min ago > slot |
| `sbx.wf-artery-decision-truth` | **DEGRADED** | last success 30min ago > slot |
| `sbx.wf-artery-grid` | **DEGRADED** | last success 30min ago > slot |
| `sbx.wf-artery-wallet` | **OK** | success recent |
| `sbx.wf-artery-integrity` | **DEGRADED** | last success 66min ago > slot |
| `sbx.wf-artery-participation` | **DEGRADED** | last success 237min ago > slot |
| `sbx.wf-artery-fleet` | **OK** | success recent |
| `sbx.wf-artery-flow` | **OK** | success recent |

## 2. קצב-בנייה-אמת (24h · code = infra/engine/src/scripts, churn = state/receipts/ops)
| ריפו | נראות | commits-24h | code-חלק | הערה |
|---|---|---|---|---|
| Autonomy | public | 100+ | 0% | ok |
| Console | public | 100+ | 8% | ok |
| Domain | public | 100+ | 8% | ok |
| Pulse | public | 55 | 17% | ok |

**מדד-מסכם:** codeShare = 7% (42 commits מסווגים מתוך 355)
> שיפוט: `dev.rate` = **DEGRADED** — heartbeat-without-building: codeShare 7% < 10% over 355 commits/24h

## 3. אמת-על-השרשרת · Steem (https://api.steemit.com)
| חשבון | SP אפקטיבי | VP% | פוסט-אחרון | הצבעה-אחרונה |
|---|---|---|---|---|
| @acct-00 | 1645 | 0% | 3.8h | 5.7h |
| @acct-01 | 75 | 24% | 65.3h | 1.6h |
| @acct-02 | 78 | 68% | 57.9h | 6.5h |
| @acct-03 | 60 | 40% | 56.5h | 1.5h |
| @acct-04 | 45 | 19% | 55.1h | 6.5h |
| @acct-05 | 40 | 16% | 219.4h | 6.4h |
| @acct-06 | 41 | 55% | 201.7h | 4.6h |
| @acct-07 | 41 | 49% | 203h | 4.6h |
| @acct-08 | 43 | 57% | 203h | 6.4h |
| @acct-09 | 41 | 56% | 202.9h | 4.6h |
| @acct-10 | 44 | 80% | 202.9h | 6.4h |
| @acct-11 | 17 | 0% | 65.3h | 201h |
| @acct-12 | 17 | 0% | 202.9h | 201h |
| @acct-13 | 250 | 0% | 220.3h | 201h |

> `steem.fleet` = **OK** — fleet posted 3.8h ago
> `steem.treasury` = **DEGRADED** — treasury acct-00 at 1645 SP < 3000 (recovery-plan §3)

## 4. Blurt (UNREACHABLE)
RPC בלתי-נגיש מהרץ: no blurt accounts configured in this repo's verifier config — fleet-intel honestly absent here (nothing measured, nothing claimed)
> `blurt.alive` = **NOTICE** — blurt RPC unreachable from runner (1 hosts tried) — UNREACHABLE, לא "מת" עד-שיימד

## 5. שלמות-עץ (ריקבון-מצבות)
נסרקו 238 קבצים; פגומים: 0

## 6. דלתא-מול-הריצה-הקודמת
- ↗ השתפר: `sbx.wf-artery-catchup` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-verifier` DEGRADED → **OK**
- ↘ התדרדר: `sbx.wf-value-scan` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-artery-decision-truth` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-artery-grid` OK → **DEGRADED**
- ↗ השתפר: `sbx.wf-artery-wallet` DEGRADED → **OK**
- ↘ התדרדר: `sbx.wf-artery-integrity` OK → **DEGRADED**

## 7. משימות-שנצרתו-עכשיו
- **V-LOOP-SOVEREIGN-STATE** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WATCH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-FEDERATION** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-VALUE-SCAN** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-FLEET-HEAL** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-DECISION-TRUTH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-GRID** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-INTEGRITY** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-PARTICIPATION** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-DEV-FOCUS** — דופק-בלי-בנייה: להפנות-משאב-סוכנים מטביעות-מצב לבניית-מוצר/תיקונים אמתיים
- **V-TREASURY-BALANCE** — איזון-אוצר לפי §3: לשמר ≥3,000 SP אצל-האוצר; top-up חשבונות-פעילים ל-100 SP

## 8. שיטה-וראיות
- GitHub API: repos/commits/actions של roshpinacare-sys (read-only)
- RPC ציבורי keyless: https://api.steemit.com
- פנקס: state/verifier/history.jsonl (מרקל) · אימות-עצמי: node engine/verifier.mjs --verify-ledger
- קוד-הבדיקה: engine/verifier.mjs · כללים: ops/agents/zai-verifier/config.json
- עמוד-האמת-הציבורי: status/truth.html (נאפה-בכל-ריצה מהמדידה-הזו-עצמה; אפס-JS)
