# דוח-אמת (verifier) · 2026-11-08T22:11:20.519Z

**overall: DEGRADED** · auth: token(fed) · took: 19539ms · כללים: config.json (אפס-דעה-אישית)

> המערכת חיה אך לא בריאה-כולה: יש עורקים/לולאות שאינם מתפקדים — עם ראיות.

## 1. בריאות-עורקי-הסנדבוקס
| בדיקה | דרגה | ראיה |
|---|---|---|
| `sbx.wf-sovereign` | **OK** | success recent |
| `sbx.wf-sovereign-state` | **DEGRADED** | last success 17min ago > slot |
| `sbx.wf-artery-catchup` | **OK** | success recent |
| `sbx.wf-artery-watch` | **DEGRADED** | last success 24min ago > slot |
| `sbx.wf-verifier` | **DEGRADED** | last success 51min ago > slot |
| `sbx.wf-federation` | **DEGRADED** | last success 33min ago > slot |
| `sbx.wf-value-scan` | **DEGRADED** | last success 51min ago > slot |
| `sbx.wf-hive-probe` | **OK** | success recent |
| `sbx.wf-fleet-heal` | **DEGRADED** | last success 33min ago > slot |
| `sbx.wf-artery-decision-truth` | **DEGRADED** | last success 51min ago > slot |
| `sbx.wf-artery-grid` | **OK** | success recent |
| `sbx.wf-artery-wallet` | **OK** | success recent |
| `sbx.wf-artery-integrity` | **DEGRADED** | last success 86min ago > slot |
| `sbx.wf-artery-participation` | **OK** | success recent |
| `sbx.wf-artery-fleet` | **OK** | success recent |
| `sbx.wf-artery-flow` | **OK** | success recent |

## 2. קצב-בנייה-אמת (24h · code = infra/engine/src/scripts, churn = state/receipts/ops)
| ריפו | נראות | commits-24h | code-חלק | הערה |
|---|---|---|---|---|
| Autonomy | public | 100+ | 0% | ok |
| Console | public | 100+ | 17% | ok |
| Domain | public | 100+ | 17% | ok |
| Pulse | public | 100+ | 50% | ok |

**מדד-מסכם:** codeShare = 17% (42 commits מסווגים מתוך 400)
> שיפוט: `dev.rate` = **NOTICE** — mixed activity: codeShare 17%

## 3. אמת-על-השרשרת · Steem (https://api.steemit.com)
| חשבון | SP אפקטיבי | VP% | פוסט-אחרון | הצבעה-אחרונה |
|---|---|---|---|---|
| @acct-00 | 2561 | 45% | 21.7h | 0.2h |
| @acct-01 | 301 | 58% | 510.6h | 18.1h |
| @acct-02 | 304 | 55% | 503.2h | 296.9h |
| @acct-03 | 320 | 55% | 501.8h | 296.9h |
| @acct-04 | 305 | 55% | 500.4h | 296.9h |
| @acct-05 | 300 | 55% | 664.7h | 296.9h |
| @acct-06 | 100 | 0% | 646.9h | 296.9h |
| @acct-07 | 100 | 57% | 648.2h | 18.1h |
| @acct-08 | 100 | 55% | 648.2h | 18.1h |
| @acct-09 | 100 | 0% | 648.2h | 296.9h |
| @acct-10 | 100 | 0% | 648.2h | 296.9h |
| @acct-11 | 31 | 56% | 510.6h | 18.1h |
| @acct-12 | 45 | 56% | 648.2h | 18.1h |
| @acct-13 | 1 | 0% | 665.6h | 266.9h |

> `steem.fleet` = **OK** — fleet posted 21.7h ago
> `steem.treasury` = **DEGRADED** — treasury acct-00 at 2561 SP < 3000 (recovery-plan §3)

## 4. Blurt (UNREACHABLE)
RPC בלתי-נגיש מהרץ: no blurt accounts configured in this repo's verifier config — fleet-intel honestly absent here (nothing measured, nothing claimed)
> `blurt.alive` = **NOTICE** — blurt RPC unreachable from runner (1 hosts tried) — UNREACHABLE, לא "מת" עד-שיימד

## 5. שלמות-עץ (ריקבון-מצבות)
נסרקו 380 קבצים; פגומים: 0

## 6. דלתא-מול-הריצה-הקודמת
- ↗ השתפר: `sbx.wf-artery-catchup` DEGRADED → **OK**
- ↘ התדרדר: `sbx.wf-federation` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-value-scan` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-fleet-heal` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-artery-decision-truth` OK → **DEGRADED**
- ↗ השתפר: `sbx.wf-artery-grid` DEGRADED → **OK**
- ↘ התדרדר: `sbx.wf-artery-integrity` OK → **DEGRADED**
- ↗ השתפר: `sbx.wf-artery-participation` DEGRADED → **OK**
- ↗ השתפר: `dev.rate` DEGRADED → **NOTICE**

## 7. משימות-שנצרתו-עכשיו
- **V-LOOP-SOVEREIGN-STATE** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WATCH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-VERIFIER** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-FEDERATION** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-VALUE-SCAN** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-FLEET-HEAL** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-DECISION-TRUTH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-INTEGRITY** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-TREASURY-BALANCE** — איזון-אוצר לפי §3: לשמר ≥3,000 SP אצל-האוצר; top-up חשבונות-פעילים ל-100 SP

## 8. שיטה-וראיות
- GitHub API: repos/commits/actions של roshpinacare-sys (read-only)
- RPC ציבורי keyless: https://api.steemit.com
- פנקס: state/verifier/history.jsonl (מרקל) · אימות-עצמי: node engine/verifier.mjs --verify-ledger
- קוד-הבדיקה: engine/verifier.mjs · כללים: ops/agents/zai-verifier/config.json
- עמוד-האמת-הציבורי: status/truth.html (נאפה-בכל-ריצה מהמדידה-הזו-עצמה; אפס-JS)
