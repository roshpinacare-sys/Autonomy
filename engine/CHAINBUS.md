# CHAINBUS — הוראות-ריבוניות-ללא-מארח (saos-bus-v1 · directive)

**הבעיה שנמדדה (2026-10-17, מהשרשרת עצמה):** המנוע משדר `cycle.receipt` כל ~35 דקות
ומדווח `ok:false, health:null` — אין מארח דלוק. הפרוטוקול כבר קיים
(`steem/mini-services/saos-engine/bus.mjs` R243) כולל טיפוס `directive`
("operator-plane → agents, from headcorner only") — חסר היה **צרכן תמידי חסר-מפתחות**.

**הפתרון:** `engine/directive-bus.mjs` — קורא-בלבד, אפס-תלות, רץ על כל מארח שיש בו node.
כרגע המארח = Actions ציבורי (דקות חינם ללא מכסה, cron */30) — אבל זו רק הבחירה הנוכחית,
לא התלות: `node engine/directive-bus.mjs` רץ גם על מחשב הבעלים, גם על כל VM, גם בלי גיט.

## השכבות (מדוד, לא משוער)

| שכבה | מה | מי מחזיק | תלות |
|---|---|---|---|
| תור-פקודות | custom_json `saos-bus-v1` על Steem | השרשרת (צמתים ציבוריים, 24/7) | אפס |
| אימות | posting-authority חתימה — `from: headcorner` בלבד | הכספת שלך (לעולם לא עוברת הנה) | אפס |
| ביצוע | `engine/tasks/<task>.json` → `engine/exec-task.mjs` | הריפו הציבורי הזה | node בלבד |
| מצב | קבלה ב-receipts/chainbus/ = הונחיה נצרכה (dedup גיט-נטיבי) | הגיט | אפס |
| קבלה-חזרה | `receipts/execution/<id>.json` + `receipts/chainbus/d-<block>-<idx>.json` | הגיט | אפס |

## איך הבעלים שולח הונחיה (op אחד, מהכלים הקיימים שלך)

דרך `signer.mjs` / כלי השידור הקיים שלך (posting key, memory-only) — אותו מבנה כמו
`cycle.receipt` שאתה כבר משדר:

```json
["custom_json", {
  "required_auths": [],
  "required_posting_auths": ["headcorner"],
  "id": "saos-bus-v1",
  "json": "{\"v\":1,\"from\":\"headcorner\",\"to\":\"*\",\"type\":\"directive\",\"seq\":1,\"at\":\"<ISO>\",\"body\":{\"task\":\"health-probe\",\"runId\":\"d-<ts>\"}}"
}]
```

חוקי-הבית (נאכפים כאן, fail-closed):
- `from` חייב להיות `headcorner` (חתימת השרשרת היא האימות — אין עקיפה).
- `body.task` חייב להתקיים כ-`engine/tasks/<task>.json` — **אין פקודות-inline מהשרשרת**.
- גוף ≤ 512 בתים (חוק R243). `to` מתקבל: `*`, `fleet`, `agent9`, `agent-9`, `all`, `agents`.
- כל הונחיה מביאה קבלה אחת — גם דחייה היא קבלה כנה (`ok:false` + סיבה).
- **סמנטיקה at-least-once:** אם push הקבלה נכשל (מירוץ), הסריקה הבאה תבצע שוב —
  לכן חוק: משימות חייבות להיות idempotent / קריאה-בלבד ככל האפשר.
- משימות מוגדרות דרך PR לריפו הזה (ביקורת גלויה, ללא סודות — חוק הפיילואד).

## משימות מובנות

- `health-probe` — ראש השרשרת + git tip (קריאה-בלבד)
- `fleet-report` — מלאי מנוע + קבלות אחרונות (קריאה-בלבד)
- `minutes-census` — בריאות-צי-החישוב-הציבורי (חסר-מפתחות, API ציבורי בלבד;
  המטוס שהחליף דקות-פרטיות. בסיס: `receipts/minutes/minutes-0-baseline.json`)

## הפעימה-העצמית (sovereign-pulse)

סוכן-9 הוסיף ל-saos-runtime (ציבורי, דקות-חינם) עורק `sovereign-pulse.yml`:
cron כל 6 שעות UTC שמשדר הנחיה אחת מהרוטציונה הקריאה-בלבד
(`health-probe`/`minutes-census`/`fleet-report`) — חתימת-posting מהכספת שלך,
adoption-נשפט-שרשרת, שער-selftest fail-closed, thinkGate. הצרכן החסר-המפתחות
כאן מבצע ומקבל. **הלופ מקצב את עצמו** — הוכח E2E ב-2026-10-17:
txid `de1a55fc…` → בלוק 110516064/112671 → קבלה `d-110516064-112671.json`
(ok:true, fleet-report, 340ms). הוראות-המפעיל שלך (directive-now) עוקפות
בכל רגע.

## מה זה פותר

אין מארח דלוק → המארח הוא השרשרת + חינם-ציבורי. הסנדבוקס יכול למות; הציקלוס ממשיך.
לתשלום אמת: השוק הפנימי של השרשרת (limit_order_create) הוא ה-DEX הציבורי הבטוח —
חתימה מהכספת שלך, escrow של הקונצנזוס, בלי שלישי, בלי חשיפה (ראה
saos-dex `deploy/PUBLIC-DEX-CHECKLIST.md`).
