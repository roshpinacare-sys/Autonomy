# דוח-אמת (verifier) · 2026-10-31T08:43:52.904Z

**overall: FAIL** · auth: token(fed) · took: 18375ms · כללים: config.json (אפס-דעה-אישית)

> יש-דברים-שבורים-ממש — זה הדוח-הכן, בלי-קישוטים.

## 1. בריאות-עורקי-הסנדבוקס
| בדיקה | דרגה | ראיה |
|---|---|---|
| `sbx.wf-sovereign` | **OK** | success recent |
| `sbx.wf-sovereign-state` | **DEGRADED** | last success 16min ago > slot |
| `sbx.wf-artery-catchup` | **OK** | success recent |
| `sbx.wf-artery-watch` | **DEGRADED** | last success 56min ago > slot |
| `sbx.wf-verifier` | **OK** | success recent |
| `sbx.wf-federation` | **OK** | success recent |
| `sbx.wf-value-scan` | **FAIL** | no success in last 8 runs of value-scan.yml |
| `sbx.wf-hive-probe` | **OK** | success recent |
| `sbx.wf-fleet-heal` | **OK** | success recent |
| `sbx.wf-artery-decision-truth` | **FAIL** | no success in last 8 runs of artery-decision-truth.yml |
| `sbx.wf-artery-grid` | **OK** | success recent |
| `sbx.wf-artery-wallet` | **OK** | success recent |
| `sbx.wf-artery-integrity` | **OK** | success recent |
| `sbx.wf-artery-participation` | **FAIL** | no success in last 8 runs of artery-participation.yml |
| `sbx.wf-artery-fleet` | **FAIL** | no success in last 8 runs of artery-fleet.yml |
| `sbx.wf-artery-flow` | **OK** | success recent |

## 2. קצב-בנייה-אמת (24h · code = infra/engine/src/scripts, churn = state/receipts/ops)
| ריפו | נראות | commits-24h | code-חלק | הערה |
|---|---|---|---|---|
| Autonomy | public | 100+ | 0% | ok |
| Console | public | 100+ | 0% | ok |
| Domain | public | 100+ | 0% | ok |
| Pulse | public | 53 | 0% | ok |

**מדד-מסכם:** codeShare = 0% (42 commits מסווגים מתוך 353)
> שיפוט: `dev.rate` = **DEGRADED** — heartbeat-without-building: codeShare 0% < 10% over 353 commits/24h

## 3. אמת-על-השרשרת · Steem (https://api.steemit.com)
| חשבון | SP אפקטיבי | VP% | פוסט-אחרון | הצבעה-אחרונה |
|---|---|---|---|---|
| @acct-00 | 1511 | 35% | 6h | 3.1h |
| @acct-01 | 300 | 55% | 305.1h | 91.5h |
| @acct-02 | 303 | 55% | 297.8h | 91.5h |
| @acct-03 | 320 | 55% | 296.3h | 91.4h |
| @acct-04 | 305 | 55% | 294.9h | 91.4h |
| @acct-05 | 300 | 55% | 459.2h | 91.4h |
| @acct-06 | 41 | 55% | 441.5h | 91.4h |
| @acct-07 | 41 | 54% | 442.8h | 91.4h |
| @acct-08 | 43 | 54% | 442.8h | 91.4h |
| @acct-09 | 41 | 54% | 442.7h | 91.4h |
| @acct-10 | 44 | 54% | 442.7h | 91.4h |
| @acct-11 | 0 | 0% | 305.1h | 61h |
| @acct-12 | 0 | 0% | 442.7h | 61.4h |
| @acct-13 | 0 | 0% | 460.1h | 61.4h |

> `steem.fleet` = **OK** — fleet posted 6h ago
> `steem.treasury` = **DEGRADED** — treasury acct-00 at 1511 SP < 3000 (recovery-plan §3)

## 4. Blurt (UNREACHABLE)
RPC בלתי-נגיש מהרץ: no blurt accounts configured in this repo's verifier config — fleet-intel honestly absent here (nothing measured, nothing claimed)
> `blurt.alive` = **NOTICE** — blurt RPC unreachable from runner (1 hosts tried) — UNREACHABLE, לא "מת" עד-שיימד

## 5. שלמות-עץ (ריקבון-מצבות)
נסרקו 286 קבצים; פגומים: 0

## 6. דלתא-מול-הריצה-הקודמת
- ↗ השתפר: `sbx.wf-artery-catchup` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-verifier` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-federation` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-fleet-heal` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-artery-grid` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-artery-integrity` DEGRADED → **OK**

## 7. משימות-שנצרתו-עכשיו
- **V-LOOP-SOVEREIGN-STATE** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WATCH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-VALUE-SCAN** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-DECISION-TRUTH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
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
