# דוח-אמת (verifier) · 2026-11-19T07:50:34.770Z

**overall: DEGRADED** · auth: token(fed) · took: 20193ms · כללים: config.json (אפס-דעה-אישית)

> המערכת חיה אך לא בריאה-כולה: יש עורקים/לולאות שאינם מתפקדים — עם ראיות.

## 1. בריאות-עורקי-הסנדבוקס
| בדיקה | דרגה | ראיה |
|---|---|---|
| `sbx.wf-sovereign` | **OK** | success recent |
| `sbx.wf-sovereign-state` | **DEGRADED** | last success 27min ago > slot |
| `sbx.wf-artery-catchup` | **OK** | success recent |
| `sbx.wf-artery-watch` | **DEGRADED** | last success 17min ago > slot |
| `sbx.wf-verifier` | **DEGRADED** | last success 33min ago > slot |
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
| Autonomy | public | 100+ | 0% | ok |
| Console | public | 100+ | 17% | ok |
| Domain | public | 100+ | 17% | ok |
| Pulse | public | 77 | 67% | ok |

**מדד-מסכם:** codeShare = 19% (42 commits מסווגים מתוך 377)
> שיפוט: `dev.rate` = **NOTICE** — mixed activity: codeShare 19%

## 3. אמת-על-השרשרת · Steem (https://api.steemit.com)
| חשבון | SP אפקטיבי | VP% | פוסט-אחרון | הצבעה-אחרונה |
|---|---|---|---|---|
| @acct-00 | 2492 | 65% | 7.2h | 0.9h |
| @acct-01 | 301 | 96% | 83.2h | 58.3h |
| @acct-02 | 304 | 55% | 752.9h | 546.6h |
| @acct-03 | 321 | 55% | 751.4h | 546.6h |
| @acct-04 | 305 | 55% | 750h | 546.6h |
| @acct-05 | 301 | 55% | 914.3h | 546.5h |
| @acct-06 | 100 | 0% | 896.6h | 546.5h |
| @acct-07 | 100 | 96% | 83.3h | 58.3h |
| @acct-08 | 100 | 96% | 82.9h | 58.3h |
| @acct-09 | 100 | 0% | 897.9h | 546.5h |
| @acct-10 | 100 | 0% | 897.8h | 546.5h |
| @acct-11 | 31 | 96% | 82.7h | 58.3h |
| @acct-12 | 45 | 96% | 897.8h | 58.3h |
| @acct-13 | 36 | 0% | 915.2h | 516.6h |

> `steem.fleet` = **OK** — fleet posted 7.2h ago
> `steem.treasury` = **DEGRADED** — treasury acct-00 at 2492 SP < 3000 (recovery-plan §3)

## 4. Blurt (UNREACHABLE)
RPC בלתי-נגיש מהרץ: no blurt accounts configured in this repo's verifier config — fleet-intel honestly absent here (nothing measured, nothing claimed)
> `blurt.alive` = **NOTICE** — blurt RPC unreachable from runner (1 hosts tried) — UNREACHABLE, לא "מת" עד-שיימד

## 5. שלמות-עץ (ריקבון-מצבות)
נסרקו 522 קבצים; פגומים: 0

## 6. דלתא-מול-הריצה-הקודמת
- ↘ התדרדר: `sbx.wf-verifier` OK → **DEGRADED**
- ↗ השתפר: `sbx.wf-value-scan` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-artery-decision-truth` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-artery-grid` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-artery-integrity` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-artery-participation` DEGRADED → **OK**
- ↗ השתפר: `dev.rate` DEGRADED → **NOTICE**
- ↗ השתפר: `steem.fleet` DEGRADED → **OK**
- ↘ התדרדר: `steem.treasury` NOTICE → **DEGRADED**
- הוסר-מהבדיקה: `steem.rpc` (היה FAIL)

## 7. משימות-שנצרתו-עכשיו
- **V-LOOP-SOVEREIGN-STATE** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WATCH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-VERIFIER** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-TREASURY-BALANCE** — איזון-אוצר לפי §3: לשמר ≥3,000 SP אצל-האוצר; top-up חשבונות-פעילים ל-100 SP

## 8. שיטה-וראיות
- GitHub API: repos/commits/actions של roshpinacare-sys (read-only)
- RPC ציבורי keyless: https://api.steemit.com
- פנקס: state/verifier/history.jsonl (מרקל) · אימות-עצמי: node engine/verifier.mjs --verify-ledger
- קוד-הבדיקה: engine/verifier.mjs · כללים: ops/agents/zai-verifier/config.json
- עמוד-האמת-הציבורי: status/truth.html (נאפה-בכל-ריצה מהמדידה-הזו-עצמה; אפס-JS)
