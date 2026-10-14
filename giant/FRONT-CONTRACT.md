# חוזה-הפרונט — FRONT-CONTRACT

> מטרה: שתאומים-מקבילים **יבנו מטוסי-נתונים תואמים — לא פרונטים-כפולים** (צ'ארטר §2). כל-צרכן (פלטפורמת-sandbox של 38-front, כל-משטח-עתידי) חייב-לצרוך רק-דרך-החוזה-הזה. עדכון-חוזה = קומיט-בגיט-בלבד.

## 1 · Endpoints

| שיטה | נתיב | תפקיד |
|---|---|---|
| GET | `/api/giant/overview` | תמונת-מצב אחת: selftest + surfaces + פליטה-חיה + R-registry-גודל |
| GET | `/api/giant/laws` | כל-החוקים R297+ מכותרות-המדורים |
| GET | `/api/giant/decisions` | שורות-הרישום (DECISIONS) מהריבונות |
| GET | `/api/giant/engine` | מצב-המנוע המלא (selftest/surfaces/fire-drill/lease/קבלות) |
| GET | `/api/giant/dex` | דקס: נזילות, ווליום, לדגרי-ראיה, SAOS במרכז |
| GET | `/api/giant/fleet` | קבלות-המסילות (worklog-tail) ולוח-הערוצים |
| POST | `/api/giant/auth` | אימות-בעלים — סיסמה **מסוד-סביבה בלבד** (`GIANT_OWNER_PASSWORD`) |
| POST | `/api/giant/session` | פתיחת-סשן מאומת |
| POST | `/api/giant/logout` | סגירת-סשן |

## 2 · מקורות-קריאה מדויקים (קבצי-אמת)

| Endpoint | מקורות (ריפו → קובץ) |
|---|---|
| `overview` | צירוף-חלקי של engine+laws+decisions: `steem: mini-services/saos-engine/state/selftest-last-run.json` + `Autonomy: state/network-state.json` + גודל-`Pulse: DECISIONS.md` |
| `laws` | `Autonomy: state/research/*.md` — **כותרות-מדורים בלבד** (`## R3xx …`) מכל-קובץ-חוקים (exec33…36), לא גופי-מלל |
| `decisions` | `Pulse: DECISIONS.md` — פענוח-הטבלה, שורה-אחרונה קודם |
| `engine` | `steem: mini-services/saos-engine/state/{selftest-last-run.json, selftest-run-marker.json, surface-watch-latest.json, fire-drill-latest.json, watch-receipts.jsonl}` + `state/lease/` (רישומי-חכירה R353) |
| `dex` | `saos-dex: grids/state/{STASIS.json, arb-ledger.json, army-receipts.jsonl, BOOK-LAW-RECEIPT.json, SUPREMACY-RECEIPT.md}` + `audit-package/proof-pack/proof-ledger.jsonl` + `db/grid-ledger.json` |
| `fleet` | `worklog.md` (root פרויקט-העבודה, מקטע-זנב בלבד: קבלות-מסילות אחרונות) + `Autonomy: giant/STATE.md` |

כל-קריאה = **fetch-origin-טרי או קריאת-עבודה מסונכרנת** — אסור-להציג-מצב-מקומי-מיושן-בלי-סימון.

## 3 · צורת-כשל fail-closed
אין-חריגות-ללקוח. כל-כישלון (קובץ-חסר, פארס-כושל, timeout, ריפו-לא-נגיש):
```json
{ "ok": false, "reason": "<קוד-מכוננת: MISSING_SOURCE | PARSE | TIMEOUT | AUTH | UPSTREAM>" }
```
**אף-שדה-ממצא איננו-מומצא**: אין-נתוני-מילוי, אין-ברירת-מחדל-מחמיאה. `ok:true` רק-עם-מקור-שנקרא-באמת (מזהה-קומיט/זמן-קריאה כלול).

## 4 · מטמון
**15 שניות** ל-כל-endpoint (Cache: `max-age=15, stale-while-revalidate=60`). POST-ים אינם-נשמרים. `?fresh=1` (auth-only) עוקף-מטמון לביקורת.

## 5 · איסורים
- אין-כתיבה לריפות-המקור מתוך-ה-api (קריאה-בלבד; כתיבה רק-דרך-מסילות-git-מוסמכות).
- אין-מפתח, אין-sudo, אין-סיסמה בתשובות, בלוגים או בלקוח — סיסמת-הבעלים סוד-סביבה בלבד (צ'ארטר §9).
- אין-endpoint חדש ללא-שורה-בטבלה-כאן + קומיט.
