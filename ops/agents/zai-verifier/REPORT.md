# דוח-אמת (verifier) · 2026-10-14T07:51:28.904Z

**overall: DEGRADED** · auth: token(fed) · took: 23621ms · כללים: config.json (אפס-דעה-אישית)

> המערכת חיה אך לא בריאה-כולה: יש עורקים/לולאות שאינם מתפקדים — עם ראיות.

## 1. בריאות-עורקי-הסנדבוקס
| בדיקה | דרגה | ראיה |
|---|---|---|
| `sbx.wf-sovereign` | **OK** | success recent |
| `sbx.wf-sovereign-state` | **DEGRADED** | last success 17min ago > slot |
| `sbx.wf-artery-catchup` | **OK** | success recent |
| `sbx.wf-artery-watch` | **DEGRADED** | last success 39min ago > slot |
| `sbx.wf-verifier` | **OK** | success recent |
| `sbx.wf-federation` | **DEGRADED** | last success 39min ago > slot |
| `sbx.wf-value-scan` | **DEGRADED** | last success 98min ago > slot |
| `sbx.wf-hive-probe` | **OK** | success recent |
| `sbx.wf-fleet-heal` | **OK** | success recent |
| `sbx.wf-artery-decision-truth` | **OK** | success recent |
| `sbx.wf-artery-grid` | **OK** | success recent |
| `sbx.wf-artery-wallet` | **OK** | success recent |
| `sbx.wf-artery-integrity` | **OK** | success recent |
| `sbx.wf-artery-participation` | **OK** | success recent |
| `sbx.wf-artery-fleet` | **OK** | success recent |
| `sbx.wf-artery-flow` | **OK** | success recent |

## 2. קצב-בנייה-אמת (24h · code = infra/engine/src/scripts, churn = state/receipts/ops)
| ריפו | נראות | commits-24h | code-חלק | הערה |
|---|---|---|---|---|
| Autonomy | public | 100+ | 17% | ok |
| Console | public | 100+ | 25% | ok |
| Domain | public | 100+ | 0% | ok |
| Pulse | public | 67 | 17% | ok |

**מדד-מסכם:** codeShare = 14% (42 commits מסווגים מתוך 367)
> שיפוט: `dev.rate` = **NOTICE** — mixed activity: codeShare 14%

## 3. אמת-על-השרשרת · Steem (https://api.steemit.com)
| חשבון | SP אפקטיבי | VP% | פוסט-אחרון | הצבעה-אחרונה |
|---|---|---|---|---|
| @acct-00 | 2842 | 42% | 0.1h | 0.1h |
| @acct-01 | 75 | 79% | 32.7h | 3.2h |
| @acct-02 | 78 | 80% | 32.7h | 3.7h |
| @acct-03 | 94 | 77% | 32.6h | 3.7h |
| @acct-04 | 80 | 81% | 33.2h | 3.7h |
| @acct-05 | 75 | 79% | 50.4h | 3.7h |
| @acct-06 | 31 | 75% | 32.6h | 32.1h |
| @acct-07 | 31 | 80% | 33.9h | 3.7h |
| @acct-08 | 33 | 79% | 33.9h | 3.7h |
| @acct-09 | 12 | 55% | 33.9h | 3.2h |
| @acct-10 | 70 | 80% | 33.9h | 3.2h |
| @acct-11 | 17 | 93% | 52.7h | 32h |
| @acct-12 | 17 | 95% | 33.8h | 32h |
| @acct-13 | 17 | 93% | 51.2h | 31.9h |

> `steem.fleet` = **OK** — fleet posted 0.1h ago
> `steem.treasury` = **DEGRADED** — treasury acct-00 at 2842 SP < 3000 (recovery-plan §3)

## 4. Blurt (UNREACHABLE)
RPC בלתי-נגיש מהרץ: no blurt accounts configured in this repo's verifier config — fleet-intel honestly absent here (nothing measured, nothing claimed)
> `blurt.alive` = **NOTICE** — blurt RPC unreachable from runner (1 hosts tried) — UNREACHABLE, לא "מת" עד-שיימד

## 5. שלמות-עץ (ריקבון-מצבות)
נסרקו 106 קבצים; פגומים: 0

## 6. דלתא-מול-הריצה-הקודמת
- ↘ התדרדר: `sbx.wf-federation` OK → **DEGRADED**
- ↗ השתפר: `sbx.wf-fleet-heal` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-artery-decision-truth` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-artery-grid` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-artery-integrity` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-artery-fleet` DEGRADED → **OK**

## 7. משימות-שנצרתו-עכשיו
- **V-LOOP-SOVEREIGN-STATE** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WATCH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-FEDERATION** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-VALUE-SCAN** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-TREASURY-BALANCE** — איזון-אוצר לפי §3: לשמר ≥3,000 SP אצל-האוצר; top-up חשבונות-פעילים ל-100 SP

## 8. שיטה-וראיות
- GitHub API: repos/commits/actions של roshpinacare-sys (read-only)
- RPC ציבורי keyless: https://api.steemit.com
- פנקס: state/verifier/history.jsonl (מרקל) · אימות-עצמי: node engine/verifier.mjs --verify-ledger
- קוד-הבדיקה: engine/verifier.mjs · כללים: ops/agents/zai-verifier/config.json
- עמוד-האמת-הציבורי: status/truth.html (נאפה-בכל-ריצה מהמדידה-הזו-עצמה; אפס-JS)
