# דוח-אמת (verifier) · 2026-10-13T14:35:46.260Z

**overall: FAIL** · auth: token(fed) · took: 21751ms · כללים: config.json (אפס-דעה-אישית)

> יש-דברים-שבורים-ממש — זה הדוח-הכן, בלי-קישוטים.

## 1. בריאות-עורקי-הסנדבוקס
| בדיקה | דרגה | ראיה |
|---|---|---|
| `sbx.wf-sovereign` | **OK** | success recent |
| `sbx.wf-sovereign-state` | **DEGRADED** | last success 23min ago > slot |
| `sbx.wf-artery-catchup` | **OK** | success recent |
| `sbx.wf-artery-watch` | **DEGRADED** | last success 36min ago > slot |
| `sbx.wf-verifier` | **OK** | success recent |
| `sbx.wf-federation` | **OK** | success recent |
| `sbx.wf-value-scan` | **FAIL** | last success 290min ago > 4x slot |
| `sbx.wf-hive-probe` | **OK** | success recent |
| `sbx.wf-fleet-heal` | **OK** | success recent |
| `sbx.wf-artery-decision-truth` | **DEGRADED** | last success 116min ago > slot |
| `sbx.wf-artery-grid` | **DEGRADED** | last success 47min ago > slot |
| `sbx.wf-artery-wallet` | **DEGRADED** | last success 192min ago > slot |
| `sbx.wf-artery-integrity` | **OK** | success recent |
| `sbx.wf-artery-participation` | **DEGRADED** | last success 116min ago > slot |
| `sbx.wf-artery-fleet` | **DEGRADED** | last success 159min ago > slot |
| `sbx.wf-artery-flow` | **OK** | success recent |

## 2. קצב-בנייה-אמת (24h · code = infra/engine/src/scripts, churn = state/receipts/ops)
| ריפו | נראות | commits-24h | code-חלק | הערה |
|---|---|---|---|---|
| Autonomy | public | 100+ | 0% | ok |
| Console | public | 100+ | 17% | ok |
| Domain | public | 100+ | 8% | ok |
| Pulse | public | 64 | 0% | ok |

**מדד-מסכם:** codeShare = 7% (42 commits מסווגים מתוך 364)
> שיפוט: `dev.rate` = **DEGRADED** — heartbeat-without-building: codeShare 7% < 10% over 364 commits/24h

## 3. אמת-על-השרשרת · Steem (https://api.steemit.com)
| חשבון | SP אפקטיבי | VP% | פוסט-אחרון | הצבעה-אחרונה |
|---|---|---|---|---|
| @acct-00 | 2791 | 43% | 1.1h | 1.7h |
| @acct-01 | 75 | 77% | 15.4h | 14.9h |
| @acct-02 | 78 | 77% | 15.4h | 14.9h |
| @acct-03 | 94 | 76% | 15.4h | 14.9h |
| @acct-04 | 80 | 75% | 15.9h | 14.8h |
| @acct-05 | 75 | 77% | 33.1h | 14.8h |
| @acct-06 | 31 | 75% | 15.3h | 14.8h |
| @acct-07 | 31 | 81% | 16.6h | 14.8h |
| @acct-08 | 33 | 80% | 16.6h | 14.8h |
| @acct-09 | 12 | 47% | 16.6h | 14.8h |
| @acct-10 | 70 | 86% | 16.6h | 14.7h |
| @acct-11 | 17 | 93% | 35.5h | 14.7h |
| @acct-12 | 17 | 95% | 16.6h | 14.7h |
| @acct-13 | 17 | 93% | 34h | 14.7h |

> `steem.fleet` = **OK** — fleet posted 1.1h ago
> `steem.treasury` = **DEGRADED** — treasury acct-00 at 2791 SP < 3000 (recovery-plan §3)

## 4. Blurt (UNREACHABLE)
RPC בלתי-נגיש מהרץ: no blurt accounts configured in this repo's verifier config — fleet-intel honestly absent here (nothing measured, nothing claimed)
> `blurt.alive` = **NOTICE** — blurt RPC unreachable from runner (1 hosts tried) — UNREACHABLE, לא "מת" עד-שיימד

## 5. שלמות-עץ (ריקבון-מצבות)
נסרקו 67 קבצים; פגומים: 0

## 6. דלתא-מול-הריצה-הקודמת
- ↗ השתפר: `sbx.wf-artery-catchup` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-federation` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-fleet-heal` DEGRADED → **OK**
- ↘ התדרדר: `sbx.wf-artery-grid` OK → **DEGRADED**

## 7. משימות-שנצרתו-עכשיו
- **V-LOOP-SOVEREIGN-STATE** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WATCH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-VALUE-SCAN** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
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
