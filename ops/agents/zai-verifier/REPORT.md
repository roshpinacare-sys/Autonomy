# דוח-אמת (verifier) · 2026-10-14T21:10:03.634Z

**overall: DEGRADED** · auth: token(fed) · took: 20888ms · כללים: config.json (אפס-דעה-אישית)

> המערכת חיה אך לא בריאה-כולה: יש עורקים/לולאות שאינם מתפקדים — עם ראיות.

## 1. בריאות-עורקי-הסנדבוקס
| בדיקה | דרגה | ראיה |
|---|---|---|
| `sbx.wf-sovereign` | **OK** | success recent |
| `sbx.wf-sovereign-state` | **DEGRADED** | last success 20min ago > slot |
| `sbx.wf-artery-catchup` | **DEGRADED** | last success 36min ago > slot |
| `sbx.wf-artery-watch` | **DEGRADED** | last success 58min ago > slot |
| `sbx.wf-verifier` | **OK** | success recent |
| `sbx.wf-federation` | **OK** | success recent |
| `sbx.wf-value-scan` | **OK** | success recent |
| `sbx.wf-hive-probe` | **OK** | success recent |
| `sbx.wf-fleet-heal` | **DEGRADED** | last success 36min ago > slot |
| `sbx.wf-artery-decision-truth` | **OK** | success recent |
| `sbx.wf-artery-grid` | **DEGRADED** | last success 105min ago > slot |
| `sbx.wf-artery-wallet` | **DEGRADED** | last success 138min ago > slot |
| `sbx.wf-artery-integrity` | **OK** | success recent |
| `sbx.wf-artery-participation` | **DEGRADED** | last success 108min ago > slot |
| `sbx.wf-artery-fleet` | **DEGRADED** | last success 403min ago > slot |
| `sbx.wf-artery-flow` | **OK** | success recent |

## 2. קצב-בנייה-אמת (24h · code = infra/engine/src/scripts, churn = state/receipts/ops)
| ריפו | נראות | commits-24h | code-חלק | הערה |
|---|---|---|---|---|
| Autonomy | public | 100+ | 0% | ok |
| Console | public | 100+ | 25% | ok |
| Domain | public | 100+ | 0% | ok |
| Pulse | public | 100+ | 0% | ok |

**מדד-מסכם:** codeShare = 7% (42 commits מסווגים מתוך 400)
> שיפוט: `dev.rate` = **DEGRADED** — heartbeat-without-building: codeShare 7% < 10% over 400 commits/24h

## 3. אמת-על-השרשרת · Steem (https://api.steemit.com)
| חשבון | SP אפקטיבי | VP% | פוסט-אחרון | הצבעה-אחרונה |
|---|---|---|---|---|
| @acct-00 | 2811 | 36% | 12h | 2.7h |
| @acct-01 | 75 | 79% | 46h | 16.5h |
| @acct-02 | 78 | 80% | 46h | 17.1h |
| @acct-03 | 94 | 77% | 46h | 17h |
| @acct-04 | 80 | 81% | 46.5h | 17h |
| @acct-05 | 75 | 79% | 63.7h | 17h |
| @acct-06 | 31 | 81% | 45.9h | 5.9h |
| @acct-07 | 31 | 80% | 47.2h | 17h |
| @acct-08 | 33 | 79% | 47.2h | 17h |
| @acct-09 | 12 | 65% | 47.2h | 16.5h |
| @acct-10 | 70 | 80% | 47.2h | 16.5h |
| @acct-11 | 17 | 93% | 66h | 45.3h |
| @acct-12 | 17 | 95% | 47.1h | 45.3h |
| @acct-13 | 17 | 93% | 64.6h | 45.2h |

> `steem.fleet` = **OK** — fleet posted 12h ago
> `steem.treasury` = **DEGRADED** — treasury acct-00 at 2811 SP < 3000 (recovery-plan §3)

## 4. Blurt (UNREACHABLE)
RPC בלתי-נגיש מהרץ: no blurt accounts configured in this repo's verifier config — fleet-intel honestly absent here (nothing measured, nothing claimed)
> `blurt.alive` = **NOTICE** — blurt RPC unreachable from runner (1 hosts tried) — UNREACHABLE, לא "מת" עד-שיימד

## 5. שלמות-עץ (ריקבון-מצבות)
נסרקו 117 קבצים; פגומים: 0

## 6. דלתא-מול-הריצה-הקודמת
- ↘ התדרדר: `sbx.wf-artery-catchup` OK → **DEGRADED**
- ↗ השתפר: `sbx.wf-value-scan` FAIL → **OK**
- ↘ התדרדר: `sbx.wf-fleet-heal` OK → **DEGRADED**
- ↗ השתפר: `sbx.wf-artery-decision-truth` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-artery-integrity` DEGRADED → **OK**
- ↘ התדרדר: `dev.rate` NOTICE → **DEGRADED**

## 7. משימות-שנצרתו-עכשיו
- **V-LOOP-SOVEREIGN-STATE** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-CATCHUP** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WATCH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-FLEET-HEAL** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
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
