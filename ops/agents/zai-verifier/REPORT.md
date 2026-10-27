# דוח-אמת (verifier) · 2026-10-27T06:13:54.453Z

**overall: FAIL** · auth: token(fed) · took: 19566ms · כללים: config.json (אפס-דעה-אישית)

> יש-דברים-שבורים-ממש — זה הדוח-הכן, בלי-קישוטים.

## 1. בריאות-עורקי-הסנדבוקס
| בדיקה | דרגה | ראיה |
|---|---|---|
| `sbx.wf-sovereign` | **OK** | success recent |
| `sbx.wf-sovereign-state` | **DEGRADED** | last success 22min ago > slot |
| `sbx.wf-artery-catchup` | **DEGRADED** | last success 63min ago > slot |
| `sbx.wf-artery-watch` | **DEGRADED** | last success 35min ago > slot |
| `sbx.wf-verifier` | **OK** | success recent |
| `sbx.wf-federation` | **DEGRADED** | last success 61min ago > slot |
| `sbx.wf-value-scan` | **OK** | success recent |
| `sbx.wf-hive-probe` | **OK** | success recent |
| `sbx.wf-fleet-heal` | **DEGRADED** | last success 42min ago > slot |
| `sbx.wf-artery-decision-truth` | **OK** | success recent |
| `sbx.wf-artery-grid` | **OK** | success recent |
| `sbx.wf-artery-wallet` | **FAIL** | no success in last 8 runs of artery-wallet.yml |
| `sbx.wf-artery-integrity` | **OK** | success recent |
| `sbx.wf-artery-participation` | **DEGRADED** | last success 96min ago > slot |
| `sbx.wf-artery-fleet` | **FAIL** | no success in last 8 runs of artery-fleet.yml |
| `sbx.wf-artery-flow` | **OK** | success recent |

## 2. קצב-בנייה-אמת (24h · code = infra/engine/src/scripts, churn = state/receipts/ops)
| ריפו | נראות | commits-24h | code-חלק | הערה |
|---|---|---|---|---|
| Autonomy | public | 100+ | 0% | ok |
| Console | public | 100+ | 0% | ok |
| Domain | public | 100+ | 8% | ok |
| Pulse | public | 55 | 0% | ok |

**מדד-מסכם:** codeShare = 2% (42 commits מסווגים מתוך 355)
> שיפוט: `dev.rate` = **DEGRADED** — heartbeat-without-building: codeShare 2% < 10% over 355 commits/24h

## 3. אמת-על-השרשרת · Steem (https://api.steemit.com)
| חשבון | SP אפקטיבי | VP% | פוסט-אחרון | הצבעה-אחרונה |
|---|---|---|---|---|
| @acct-00 | 3661 | 67% | 5h | 1.2h |
| @acct-01 | 75 | 66% | 206.6h | 14.4h |
| @acct-02 | 78 | 78% | 199.3h | 14.4h |
| @acct-03 | 60 | 70% | 197.8h | 14.4h |
| @acct-04 | 45 | 67% | 196.4h | 14.4h |
| @acct-05 | 40 | 66% | 360.7h | 14.4h |
| @acct-06 | 41 | 78% | 343h | 14.4h |
| @acct-07 | 41 | 73% | 344.3h | 14.4h |
| @acct-08 | 43 | 77% | 344.3h | 14.4h |
| @acct-09 | 41 | 75% | 344.2h | 14.4h |
| @acct-10 | 44 | 79% | 344.2h | 14.4h |
| @acct-11 | 17 | 0% | 206.6h | 342.3h |
| @acct-12 | 17 | 0% | 344.2h | 342.3h |
| @acct-13 | 250 | 91% | 361.6h | 36.4h |

> `steem.fleet` = **OK** — fleet posted 5h ago
> `steem.treasury` = **OK** — treasury acct-00 at 3661 SP

## 4. Blurt (UNREACHABLE)
RPC בלתי-נגיש מהרץ: no blurt accounts configured in this repo's verifier config — fleet-intel honestly absent here (nothing measured, nothing claimed)
> `blurt.alive` = **NOTICE** — blurt RPC unreachable from runner (1 hosts tried) — UNREACHABLE, לא "מת" עד-שיימד

## 5. שלמות-עץ (ריקבון-מצבות)
נסרקו 255 קבצים; פגומים: 0

## 6. דלתא-מול-הריצה-הקודמת
- ↘ התדרדר: `sbx.wf-fleet-heal` OK → **DEGRADED**
- ↗ השתפר: `sbx.wf-artery-decision-truth` DEGRADED → **OK**
- ↗ השתפר: `sbx.wf-artery-grid` DEGRADED → **OK**

## 7. משימות-שנצרתו-עכשיו
- **V-LOOP-SOVEREIGN-STATE** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-CATCHUP** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WATCH** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-FEDERATION** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-FLEET-HEAL** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-WALLET** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-PARTICIPATION** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-LOOP-ARTERY-FLEET** — עורק-סנדבוקס סטלה/אדום — בדיקת-שורש + רה-הצתה (workflow_dispatch / תיקון-ה-workflow)
- **V-DEV-FOCUS** — דופק-בלי-בנייה: להפנות-משאב-סוכנים מטביעות-מצב לבניית-מוצר/תיקונים אמתיים

## 8. שיטה-וראיות
- GitHub API: repos/commits/actions של roshpinacare-sys (read-only)
- RPC ציבורי keyless: https://api.steemit.com
- פנקס: state/verifier/history.jsonl (מרקל) · אימות-עצמי: node engine/verifier.mjs --verify-ledger
- קוד-הבדיקה: engine/verifier.mjs · כללים: ops/agents/zai-verifier/config.json
- עמוד-האמת-הציבורי: status/truth.html (נאפה-בכל-ריצה מהמדידה-הזו-עצמה; אפס-JS)
