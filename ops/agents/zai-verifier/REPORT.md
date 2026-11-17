# דוח-אמת (verifier) · 2026-11-17T17:49:09.247Z

**overall: DEGRADED** · auth: token(fed) · took: 23425ms · כללים: config.json (אפס-דעה-אישית)

> המערכת חיה אך לא בריאה-כולה: יש עורקים/לולאות שאינם מתפקדים — עם ראיות.

## 1. בריאות-עורקי-הסנדבוקס
| בדיקה | דרגה | ראיה |
|---|---|---|
| `sbx.wf-sovereign` | **OK** | success recent |
| `sbx.wf-sovereign-state` | **DEGRADED** | last success 37min ago > slot |
| `sbx.wf-artery-catchup` | **OK** | success recent |
| `sbx.wf-artery-watch` | **DEGRADED** | last success 49min ago > slot |
| `sbx.wf-verifier` | **DEGRADED** | last success 49min ago > slot |
| `sbx.wf-federation` | **OK** | success recent |
| `sbx.wf-value-scan` | **DEGRADED** | last success 49min ago > slot |
| `sbx.wf-hive-probe` | **OK** | success recent |
| `sbx.wf-fleet-heal` | **OK** | success recent |
| `sbx.wf-artery-decision-truth` | **DEGRADED** | last success 50min ago > slot |
| `sbx.wf-artery-grid` | **OK** | success recent |
| `sbx.wf-artery-wallet` | **DEGRADED** | last success 77min ago > slot |
| `sbx.wf-artery-integrity` | **OK** | success recent |
| `sbx.wf-artery-participation` | **DEGRADED** | last success 66min ago > slot |
| `sbx.wf-artery-fleet` | **OK** | success recent |
| `sbx.wf-artery-flow` | **OK** | success recent |

## 2. קצב-בנייה-אמת (24h · code = infra/engine/src/scripts, churn = state/receipts/ops)
| ריפו | נראות | commits-24h | code-חלק | הערה |
|---|---|---|---|---|
| Autonomy | public | 100+ | 0% | ok |
| Console | public | 100+ | 25% | ok |
| Domain | public | 100+ | 42% | ok |
| Pulse | public | 100+ | 67% | ok |

**מדד-מסכם:** codeShare = 29% (42 commits מסווגים מתוך 400)
> שיפוט: `dev.rate` = **OK** — building: codeShare 29% over 400 commits/24h

## 3. אמת-על-השרשרת · Steem (https://api.steemit.com)
| חשבון | SP אפקטיבי | VP% | פוסט-אחרון | הצבעה-אחרונה |
|---|---|---|---|---|
| @acct-00 | 2491 | 66% | 0.7h | 0.7h |
| @acct-01 | 301 | 96% | 45.2h | 20.3h |
| @acct-02 | 304 | 55% | 714.8h | 508.5h |
| @acct-03 | 320 | 55% | 713.4h | 508.5h |
| @acct-04 | 305 | 55% | 712h | 508.5h |
| @acct-05 | 301 | 55% | 876.3h | 508.5h |
| @acct-06 | 100 | 0% | 858.6h | 508.5h |
| @acct-07 | 100 | 96% | 45.3h | 20.3h |
| @acct-08 | 100 | 96% | 44.9h | 20.3h |
| @acct-09 | 100 | 0% | 859.8h | 508.5h |
| @acct-10 | 100 | 0% | 859.8h | 508.5h |
| @acct-11 | 31 | 96% | 44.7h | 20.3h |
| @acct-12 | 45 | 96% | 859.8h | 20.3h |
| @acct-13 | 36 | 0% | 877.2h | 478.5h |

> `steem.fleet` = **OK** — fleet posted 0.7h ago
> `steem.treasury` = **DEGRADED** — treasury acct-00 at 2491 SP < 3000 (recovery-plan §3)

## 4. Blurt (UNREACHABLE)
RPC בלתי-נגיש מהרץ: no blurt accounts configured in this repo's verifier config — fleet-intel honestly absent here (nothing measured, nothing claimed)
> `blurt.alive` = **NOTICE** — blurt RPC unreachable from runner (1 hosts tried) — UNREACHABLE, לא "מת" עד-שיימד

## 5. שלמות-עץ (ריקבון-מצבות)
נסרקו 504 קבצים; פגומים: 0

## 6. דלתא-מול-הריצה-הקודמת
- ↘ התדרדר: `sbx.wf-value-scan` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-artery-decision-truth` OK → **DEGRADED**
- ↗ השתפר: `sbx.wf-artery-grid` DEGRADED → **OK**
- ↘ התדרדר: `sbx.wf-artery-wallet` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-artery-participation` OK → **DEGRADED**
- ↗ השתפר: `dev.rate` DEGRADED → **OK**
- ↗ השתפר: `steem.fleet` DEGRADED → **OK**
- ↘ התדרדר: `steem.treasury` NOTICE → **DEGRADED**
- הוסר-מהבדיקה: `steem.rpc` (היה FAIL)

## 7. משימות-שנצרתו-עכשיו
- **V-LOOP-SOVEREIGN-STATE** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WATCH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-VERIFIER** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-VALUE-SCAN** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-DECISION-TRUTH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WALLET** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-PARTICIPATION** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-TREASURY-BALANCE** — איזון-אוצר לפי §3: לשמר ≥3,000 SP אצל-האוצר; top-up חשבונות-פעילים ל-100 SP

## 8. שיטה-וראיות
- GitHub API: repos/commits/actions של roshpinacare-sys (read-only)
- RPC ציבורי keyless: https://api.steemit.com
- פנקס: state/verifier/history.jsonl (מרקל) · אימות-עצמי: node engine/verifier.mjs --verify-ledger
- קוד-הבדיקה: engine/verifier.mjs · כללים: ops/agents/zai-verifier/config.json
- עמוד-האמת-הציבורי: status/truth.html (נאפה-בכל-ריצה מהמדידה-הזו-עצמה; אפס-JS)
