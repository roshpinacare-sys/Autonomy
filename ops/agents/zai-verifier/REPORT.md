# דוח-אמת (verifier) · 2026-10-29T08:17:26.855Z

**overall: FAIL** · auth: token(fed) · took: 22777ms · כללים: config.json (אפס-דעה-אישית)

> יש-דברים-שבורים-ממש — זה הדוח-הכן, בלי-קישוטים.

## 1. בריאות-עורקי-הסנדבוקס
| בדיקה | דרגה | ראיה |
|---|---|---|
| `sbx.wf-sovereign` | **OK** | success recent |
| `sbx.wf-sovereign-state` | **DEGRADED** | last success 26min ago > slot |
| `sbx.wf-artery-catchup` | **OK** | success recent |
| `sbx.wf-artery-watch` | **DEGRADED** | last success 26min ago > slot |
| `sbx.wf-verifier` | **OK** | success recent |
| `sbx.wf-federation` | **DEGRADED** | last success 57min ago > slot |
| `sbx.wf-value-scan` | **DEGRADED** | last success 54min ago > slot |
| `sbx.wf-hive-probe` | **OK** | success recent |
| `sbx.wf-fleet-heal` | **DEGRADED** | last success 57min ago > slot |
| `sbx.wf-artery-decision-truth` | **OK** | success recent |
| `sbx.wf-artery-grid` | **OK** | success recent |
| `sbx.wf-artery-wallet` | **OK** | success recent |
| `sbx.wf-artery-integrity` | **OK** | success recent |
| `sbx.wf-artery-participation` | **OK** | success recent |
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
| @acct-00 | 2590 | 51% | 6.3h | 2.2h |
| @acct-01 | 300 | 68% | 256.7h | 43h |
| @acct-02 | 303 | 69% | 249.3h | 43h |
| @acct-03 | 60 | 68% | 247.9h | 43h |
| @acct-04 | 45 | 67% | 246.5h | 43h |
| @acct-05 | 40 | 66% | 410.8h | 43h |
| @acct-06 | 41 | 74% | 393h | 43h |
| @acct-07 | 41 | 73% | 394.3h | 43h |
| @acct-08 | 43 | 73% | 394.3h | 43h |
| @acct-09 | 41 | 73% | 394.3h | 43h |
| @acct-10 | 44 | 76% | 394.3h | 43h |
| @acct-11 | 300 | 94% | 256.7h | 12.6h |
| @acct-12 | 300 | 94% | 394.3h | 13h |
| @acct-13 | 300 | 77% | 411.7h | 13h |

> `steem.fleet` = **OK** — fleet posted 6.3h ago
> `steem.treasury` = **DEGRADED** — treasury acct-00 at 2590 SP < 3000 (recovery-plan §3)

## 4. Blurt (UNREACHABLE)
RPC בלתי-נגיש מהרץ: no blurt accounts configured in this repo's verifier config — fleet-intel honestly absent here (nothing measured, nothing claimed)
> `blurt.alive` = **NOTICE** — blurt RPC unreachable from runner (1 hosts tried) — UNREACHABLE, לא "מת" עד-שיימד

## 5. שלמות-עץ (ריקבון-מצבות)
נסרקו 266 קבצים; פגומים: 0

## 6. דלתא-מול-הריצה-הקודמת
- ↘ התדרדר: `sbx.wf-federation` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-value-scan` OK → **DEGRADED**
- ↘ התדרדר: `sbx.wf-fleet-heal` OK → **DEGRADED**
- ↗ השתפר: `sbx.wf-artery-decision-truth` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-artery-grid` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-artery-integrity` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-artery-participation` DEGRADED → **OK**

## 7. משימות-שנצרתו-עכשיו
- **V-LOOP-SOVEREIGN-STATE** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WATCH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-FEDERATION** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-VALUE-SCAN** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-FLEET-HEAL** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-FLEET** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-DEV-FOCUS** — דופק-בלי-בנייה: להפנות-משאב-סוכנים מטביעות-מצב לבניית-מוצר/תיקונים אמתיים
- **V-TREASURY-BALANCE** — איזון-אוצר לפי §3: לשמר ≥3,000 SP אצל-האוצר; top-up חשבונות-פעילים ל-100 SP

## 8. שיטה-וראיות
- GitHub API: repos/commits/actions של roshpinacare-sys (read-only)
- RPC ציבורי keyless: https://api.steemit.com
- פנקס: state/verifier/history.jsonl (מרקל) · אימות-עצמי: node engine/verifier.mjs --verify-ledger
- קוד-הבדיקה: engine/verifier.mjs · כללים: ops/agents/zai-verifier/config.json
- עמוד-האמת-הציבורי: status/truth.html (נאפה-בכל-ריצה מהמדידה-הזו-עצמה; אפס-JS)
