# דוח-אמת (verifier) · 2026-10-13T22:59:29.470Z

**overall: DEGRADED** · auth: token(fed) · took: 19630ms · כללים: config.json (אפס-דעה-אישית)

> המערכת חיה אך לא בריאה-כולה: יש עורקים/לולאות שאינם מתפקדים — עם ראיות.

## 1. בריאות-עורקי-הסנדבוקס
| בדיקה | דרגה | ראיה |
|---|---|---|
| `sbx.wf-sovereign` | **OK** | success recent |
| `sbx.wf-sovereign-state` | **DEGRADED** | last success 40min ago > slot |
| `sbx.wf-artery-catchup` | **OK** | success recent |
| `sbx.wf-artery-watch` | **DEGRADED** | last success 38min ago > slot |
| `sbx.wf-verifier` | **OK** | success recent |
| `sbx.wf-federation` | **OK** | success recent |
| `sbx.wf-value-scan` | **OK** | success recent |
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
| Autonomy | public | 100+ | 25% | ok |
| Console | public | 100+ | 0% | ok |
| Domain | public | 100+ | 17% | ok |
| Pulse | public | 60 | 0% | ok |

**מדד-מסכם:** codeShare = 12% (42 commits מסווגים מתוך 360)
> שיפוט: `dev.rate` = **NOTICE** — mixed activity: codeShare 12%

## 3. אמת-על-השרשרת · Steem (https://api.steemit.com)
| חשבון | SP אפקטיבי | VP% | פוסט-אחרון | הצבעה-אחרונה |
|---|---|---|---|---|
| @acct-00 | 2792 | 45% | 5.4h | 1.7h |
| @acct-01 | 75 | 77% | 23.8h | 23.3h |
| @acct-02 | 78 | 77% | 23.8h | 23.3h |
| @acct-03 | 94 | 76% | 23.8h | 23.3h |
| @acct-04 | 80 | 75% | 24.3h | 23.2h |
| @acct-05 | 75 | 77% | 41.5h | 23.2h |
| @acct-06 | 31 | 75% | 23.7h | 23.2h |
| @acct-07 | 31 | 81% | 25h | 23.2h |
| @acct-08 | 33 | 80% | 25h | 23.2h |
| @acct-09 | 12 | 47% | 25h | 23.1h |
| @acct-10 | 70 | 86% | 25h | 23.1h |
| @acct-11 | 17 | 93% | 43.9h | 23.1h |
| @acct-12 | 17 | 95% | 25h | 23.1h |
| @acct-13 | 17 | 93% | 42.4h | 23.1h |

> `steem.fleet` = **OK** — fleet posted 5.4h ago
> `steem.treasury` = **DEGRADED** — treasury acct-00 at 2792 SP < 3000 (recovery-plan §3)

## 4. Blurt (UNREACHABLE)
RPC בלתי-נגיש מהרץ: no blurt accounts configured in this repo's verifier config — fleet-intel honestly absent here (nothing measured, nothing claimed)
> `blurt.alive` = **NOTICE** — blurt RPC unreachable from runner (1 hosts tried) — UNREACHABLE, לא "מת" עד-שיימד

## 5. שלמות-עץ (ריקבון-מצבות)
נסרקו 88 קבצים; פגומים: 0

## 6. דלתא-מול-הריצה-הקודמת
- ↗ השתפר: `sbx.wf-federation` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-value-scan` FAIL → **OK**
- ↗ השתפר: `sbx.wf-fleet-heal` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-artery-decision-truth` FAIL → **OK**
- ↗ השתפר: `sbx.wf-artery-grid` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-artery-wallet` FAIL → **OK**
- ↗ השתפר: `sbx.wf-artery-integrity` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-artery-participation` FAIL → **OK**
- ↗ השתפר: `sbx.wf-artery-fleet` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-artery-flow` DEGRADED → **OK**

## 7. משימות-שנצרתו-עכשיו
- **V-LOOP-SOVEREIGN-STATE** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WATCH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-TREASURY-BALANCE** — איזון-אוצר לפי §3: לשמר ≥3,000 SP אצל-האוצר; top-up חשבונות-פעילים ל-100 SP

## 8. שיטה-וראיות
- GitHub API: repos/commits/actions של roshpinacare-sys (read-only)
- RPC ציבורי keyless: https://api.steemit.com
- פנקס: state/verifier/history.jsonl (מרקל) · אימות-עצמי: node engine/verifier.mjs --verify-ledger
- קוד-הבדיקה: engine/verifier.mjs · כללים: ops/agents/zai-verifier/config.json
- עמוד-האמת-הציבורי: status/truth.html (נאפה-בכל-ריצה מהמדידה-הזו-עצמה; אפס-JS)
