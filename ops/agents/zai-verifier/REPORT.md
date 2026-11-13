# דוח-אמת (verifier) · 2026-11-13T12:40:18.538Z

**overall: DEGRADED** · auth: token(fed) · took: 20822ms · כללים: config.json (אפס-דעה-אישית)

> המערכת חיה אך לא בריאה-כולה: יש עורקים/לולאות שאינם מתפקדים — עם ראיות.

## 1. בריאות-עורקי-הסנדבוקס
| בדיקה | דרגה | ראיה |
|---|---|---|
| `sbx.wf-sovereign` | **OK** | success recent |
| `sbx.wf-sovereign-state` | **DEGRADED** | last success 19min ago > slot |
| `sbx.wf-artery-catchup` | **OK** | success recent |
| `sbx.wf-artery-watch` | **DEGRADED** | last success 24min ago > slot |
| `sbx.wf-verifier` | **DEGRADED** | last success 50min ago > slot |
| `sbx.wf-federation` | **OK** | success recent |
| `sbx.wf-value-scan` | **DEGRADED** | last success 51min ago > slot |
| `sbx.wf-hive-probe` | **OK** | success recent |
| `sbx.wf-fleet-heal` | **OK** | success recent |
| `sbx.wf-artery-decision-truth` | **DEGRADED** | last success 50min ago > slot |
| `sbx.wf-artery-grid` | **OK** | success recent |
| `sbx.wf-artery-wallet` | **DEGRADED** | last success 78min ago > slot |
| `sbx.wf-artery-integrity` | **OK** | success recent |
| `sbx.wf-artery-participation` | **DEGRADED** | last success 70min ago > slot |
| `sbx.wf-artery-fleet` | **OK** | success recent |
| `sbx.wf-artery-flow` | **OK** | success recent |

## 2. קצב-בנייה-אמת (24h · code = infra/engine/src/scripts, churn = state/receipts/ops)
| ריפו | נראות | commits-24h | code-חלק | הערה |
|---|---|---|---|---|
| Autonomy | public | 100+ | 0% | ok |
| Console | public | 100+ | 0% | ok |
| Domain | public | 100+ | 8% | ok |
| Pulse | public | 78 | 33% | ok |

**מדד-מסכם:** codeShare = 7% (42 commits מסווגים מתוך 378)
> שיפוט: `dev.rate` = **DEGRADED** — heartbeat-without-building: codeShare 7% < 10% over 378 commits/24h

## 3. אמת-על-השרשרת · Steem (https://api.steemit.com)
| חשבון | SP אפקטיבי | VP% | פוסט-אחרון | הצבעה-אחרונה |
|---|---|---|---|---|
| @acct-00 | 2604 | 41% | 12.6h | 6h |
| @acct-01 | 301 | 97% | 621.1h | 26.5h |
| @acct-02 | 304 | 55% | 613.7h | 407.4h |
| @acct-03 | 320 | 55% | 612.3h | 407.4h |
| @acct-04 | 305 | 55% | 610.9h | 407.4h |
| @acct-05 | 300 | 55% | 775.2h | 407.4h |
| @acct-06 | 100 | 0% | 757.4h | 407.4h |
| @acct-07 | 100 | 96% | 758.7h | 26.5h |
| @acct-08 | 100 | 96% | 758.7h | 26.5h |
| @acct-09 | 100 | 0% | 758.7h | 407.4h |
| @acct-10 | 100 | 0% | 758.7h | 407.4h |
| @acct-11 | 31 | 97% | 621.1h | 26.5h |
| @acct-12 | 45 | 96% | 758.6h | 26.5h |
| @acct-13 | 1 | 0% | 776.1h | 377.4h |

> `steem.fleet` = **OK** — fleet posted 12.6h ago
> `steem.treasury` = **DEGRADED** — treasury acct-00 at 2604 SP < 3000 (recovery-plan §3)

## 4. Blurt (UNREACHABLE)
RPC בלתי-נגיש מהרץ: no blurt accounts configured in this repo's verifier config — fleet-intel honestly absent here (nothing measured, nothing claimed)
> `blurt.alive` = **NOTICE** — blurt RPC unreachable from runner (1 hosts tried) — UNREACHABLE, לא "מת" עד-שיימד

## 5. שלמות-עץ (ריקבון-מצבות)
נסרקו 442 קבצים; פגומים: 0

## 6. דלתא-מול-הריצה-הקודמת
- ↗ השתפר: `sbx.wf-artery-catchup` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-federation` DEGRADED → **OK**
- ↘ התדרדר: `sbx.wf-value-scan` OK → **DEGRADED**
- ↗ השתפר: `sbx.wf-fleet-heal` DEGRADED → **OK**
- ↘ התדרדר: `sbx.wf-artery-decision-truth` OK → **DEGRADED**
- ↗ השתפר: `sbx.wf-artery-grid` DEGRADED → **OK**
- ↘ התדרדר: `sbx.wf-artery-wallet` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-artery-participation` OK → **DEGRADED**
- ↘ התדרדר: `dev.rate` NOTICE → **DEGRADED**

## 7. משימות-שנצרתו-עכשיו
- **V-LOOP-SOVEREIGN-STATE** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WATCH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-VERIFIER** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-VALUE-SCAN** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-DECISION-TRUTH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WALLET** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-PARTICIPATION** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-DEV-FOCUS** — דופק-בלי-בנייה: להפנות-משאב-סוכנים מטביעות-מצב לבניית-מוצר/תיקונים אמתיים
- **V-TREASURY-BALANCE** — איזון-אוצר לפי §3: לשמר ≥3,000 SP אצל-האוצר; top-up חשבונות-פעילים ל-100 SP

## 8. שיטה-וראיות
- GitHub API: repos/commits/actions של roshpinacare-sys (read-only)
- RPC ציבורי keyless: https://api.steemit.com
- פנקס: state/verifier/history.jsonl (מרקל) · אימות-עצמי: node engine/verifier.mjs --verify-ledger
- קוד-הבדיקה: engine/verifier.mjs · כללים: ops/agents/zai-verifier/config.json
- עמוד-האמת-הציבורי: status/truth.html (נאפה-בכל-ריצה מהמדידה-הזו-עצמה; אפס-JS)
