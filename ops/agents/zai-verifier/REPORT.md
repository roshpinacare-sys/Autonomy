# דוח-אמת (verifier) · 2026-10-20T21:35:44.630Z

**overall: FAIL** · auth: token(fed) · took: 18166ms · כללים: config.json (אפס-דעה-אישית)

> יש-דברים-שבורים-ממש — זה הדוח-הכן, בלי-קישוטים.

## 1. בריאות-עורקי-הסנדבוקס
| בדיקה | דרגה | ראיה |
|---|---|---|
| `sbx.wf-sovereign` | **OK** | success recent |
| `sbx.wf-sovereign-state` | **OK** | success recent |
| `sbx.wf-artery-catchup` | **OK** | success recent |
| `sbx.wf-artery-watch` | **DEGRADED** | last success 39min ago > slot |
| `sbx.wf-verifier` | **OK** | success recent |
| `sbx.wf-federation` | **DEGRADED** | last success 39min ago > slot |
| `sbx.wf-value-scan` | **FAIL** | no success in last 8 runs of value-scan.yml |
| `sbx.wf-hive-probe` | **OK** | success recent |
| `sbx.wf-fleet-heal` | **OK** | success recent |
| `sbx.wf-artery-decision-truth` | **FAIL** | no success in last 8 runs of artery-decision-truth.yml |
| `sbx.wf-artery-grid` | **DEGRADED** | last success 39min ago > slot |
| `sbx.wf-artery-wallet` | **OK** | success recent |
| `sbx.wf-artery-integrity` | **DEGRADED** | last success 91min ago > slot |
| `sbx.wf-artery-participation` | **FAIL** | last success 307min ago > 4x slot |
| `sbx.wf-artery-fleet` | **OK** | success recent |
| `sbx.wf-artery-flow` | **OK** | success recent |

## 2. קצב-בנייה-אמת (24h · code = infra/engine/src/scripts, churn = state/receipts/ops)
| ריפו | נראות | commits-24h | code-חלק | הערה |
|---|---|---|---|---|
| Autonomy | public | 100+ | 0% | ok |
| Console | public | 100+ | 8% | ok |
| Domain | public | 100+ | 0% | ok |
| Pulse | public | 53 | 0% | ok |

**מדד-מסכם:** codeShare = 2% (42 commits מסווגים מתוך 353)
> שיפוט: `dev.rate` = **DEGRADED** — heartbeat-without-building: codeShare 2% < 10% over 353 commits/24h

## 3. אמת-על-השרשרת · Steem (https://api.steemit.com)
| חשבון | SP אפקטיבי | VP% | פוסט-אחרון | הצבעה-אחרונה |
|---|---|---|---|---|
| @acct-00 | 2417 | 24% | 15.3h | 9.3h |
| @acct-01 | 135 | 82% | 54h | 15.8h |
| @acct-02 | 78 | 73% | 46.6h | 16.6h |
| @acct-03 | 155 | 81% | 45.2h | 16.6h |
| @acct-04 | 140 | 88% | 43.8h | 5.3h |
| @acct-05 | 135 | 85% | 208.1h | 9h |
| @acct-06 | 143 | 85% | 190.3h | 15.1h |
| @acct-07 | 148 | 82% | 191.6h | 15.7h |
| @acct-08 | 61 | 75% | 191.6h | 13.9h |
| @acct-09 | 89 | 78% | 191.6h | 15.7h |
| @acct-10 | 20 | 59% | 191.6h | 15.5h |
| @acct-11 | 17 | 93% | 54h | 189.7h |
| @acct-12 | 17 | 95% | 191.6h | 189.7h |
| @acct-13 | 17 | 93% | 209h | 189.7h |

> `steem.fleet` = **OK** — fleet posted 15.3h ago
> `steem.treasury` = **DEGRADED** — treasury acct-00 at 2417 SP < 3000 (recovery-plan §3)

## 4. Blurt (UNREACHABLE)
RPC בלתי-נגיש מהרץ: no blurt accounts configured in this repo's verifier config — fleet-intel honestly absent here (nothing measured, nothing claimed)
> `blurt.alive` = **NOTICE** — blurt RPC unreachable from runner (1 hosts tried) — UNREACHABLE, לא "מת" עד-שיימד

## 5. שלמות-עץ (ריקבון-מצבות)
נסרקו 231 קבצים; פגומים: 0

## 6. דלתא-מול-הריצה-הקודמת
- ↗ השתפר: `sbx.wf-sovereign-state` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-artery-catchup` DEGRADED → **OK**
- ↘ התדרדר: `sbx.wf-federation` OK → **DEGRADED**
- ↗ השתפר: `sbx.wf-fleet-heal` DEGRADED → **OK**
- ↘ התדרדר: `sbx.wf-artery-grid` OK → **DEGRADED**

## 7. משימות-שנצרתו-עכשיו
- **V-LOOP-ARTERY-WATCH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-FEDERATION** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-VALUE-SCAN** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
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
