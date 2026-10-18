# CHAINBUS — הוראות-ריבוניות-ללא-מארח (saos-bus-v1 · directive)

**הבעיה שנמדדה (2026-10-17, מהשרשרת עצמה):** המנוע משדר `cycle.receipt` כל ~35 דקות
ומדווח `ok:false, health:null` — אין מארח דלוק. הפרוטוקול כבר קיים
(`steem/mini-services/saos-engine/bus.mjs` R243) כולל טיפוס `directive`
("operator-plane → agents, from <owner> only") — חסר היה **צרכן תמידי חסר-מפתחות**.

**הפתרון:** `engine/directive-bus.mjs` — קורא-בלבד, אפס-תלות, רץ על כל מארח שיש בו node.
כרגע המארח = Actions ציבורי (דקות חינם ללא מכסה, cron */30) — אבל זו רק הבחירה הנוכחית,
לא התלות: `node engine/directive-bus.mjs` רץ גם על מחשב הבעלים, גם על כל VM, גם בלי גיט.

## השכבות (מדוד, לא משוער)

| שכבה | מה | מי מחזיק | תלות |
|---|---|---|---|
| תור-פקודות | custom_json `saos-bus-v1` על Steem | השרשרת (צמתים ציבוריים, 24/7) | אפס |
| אימות | posting-authority חתימה — `from: <owner>` בלבד | הכספת שלך (לעולם לא עוברת הנה) | אפס |
| ביצוע | `engine/tasks/<task>.json` → `engine/exec-task.mjs` | הריפו הציבורי הזה | node בלבד |
| מצב | קבלה ב-receipts/chainbus/ = הונחיה נצרכה (dedup גיט-נטיבי) | הגיט | אפס |
| קבלה-חזרה | `receipts/execution/<id>.json` + `receipts/chainbus/d-<block>-<idx>.json` | הגיט | אפס |

## איך הבעלים שולח הונחיה (op אחד, מהכלים הקיימים שלך)

דרך `signer.mjs` / כלי השידור הקיים שלך (posting key, memory-only) — אותו מבנה כמו
`cycle.receipt` שאתה כבר משדר:

```json
["custom_json", {
  "required_auths": [],
  "required_posting_auths": ["<owner>"],
  "id": "saos-bus-v1",
  "json": "{\"v\":1,\"from\":\"<owner>\",\"to\":\"*\",\"type\":\"directive\",\"seq\":1,\"at\":\"<ISO>\",\"body\":{\"task\":\"health-probe\",\"runId\":\"d-<ts>\"}}"
}]
```

חוקי-הבית (נאכפים כאן, fail-closed):
- `from` חייב להיות `<owner>` (חתימת השרשרת היא האימות — אין עקיפה).
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
- `self-heal` — הריאה-האוטונומית [t10]: קורא פסק-אמת, מצית עורקים-סטיים (dispatch
  בלבד; כבוי = דווח-רועש, לא-הפעלה-חריגה-מהחוקה). ב-cron: `artery-selfheal.yml`
  (11,41 — 4דק אחרי verifier). דרך-האוטובוס: דורש `GITHUB_TOKEN`+`actions:write`
  בסביבת-הצרכן — בלעדיהם קבלת-{ok:false,no-token} כנה (fail-closed)
  · t12: מפקד-מפתחות בקבלה — סקר-שמות-סודות (FLEET_PAT/NVIDIA_NIM_KEY/CI_ADOPT_WIF_ACTIVE
  נוכחות-בלבד; ערכים-מעולם-לא)

- `scout` — איבר-הצייד [t12 · owner order]: צינור-הלמידה — sources (pinoyfreecoder
  github-finds + github-trending) → סולם-אחזור (direct→wayback→jina) → חילוץ-מועמדים →
  ביקורת-אספקה-קורפוס-קוד-זדוני (קריאה-בלבד; critical=BLOCKED-הסגר-בשם) → רשומות-ידע
  (clean-room). חוקה: `knowledge/LEARNING.md`. ב-cron: `artery-scout.yml` (5,14 @ :18)

- `treasury-topup` — מבצע-איזון-האוצר [P2 · t12 · owner-approved]: §3 — אוצר ≥3000 SP.
  מדידה-קריאה-בלבד + תוכנית-delegate מעודפי-הצי (מעל-רצפת-100SP) + נכונות-מפתח
  (CI_ADOPT_WIF_ACTIVE). קבלות-refs-בלבד (refOf — שמות-אחוזה בזיכרון-בלבד).
  ב-cron: `artery-treasury.yml` (יומי 06:33)

- `builder` — איבר-הבונה [t13 · owner order: "אני רוצה בניה שיפור תמיד ולא רק
  בדיקות · אין מוצר אמיתי"]: **איבר-הכותב** — עד-t13 כל-העורקים רק בדקו ותיעדו;
  האתר-הציבורי קפא (מוצר 2 ימים נמדד). builder מודד את-האתר כמו-הבעלים (טריות,
  חסרים, קישורים-שבורים) → כל-חולשה-נהיית-מטלה-מדורגת → יוצר דלתות-מוצר אמיתיות
  (פס-דופק חי מהקבלות, מרכז-תיעוד, יומן-בנייה, pulse.json) → commit מקוף ל-Domain →
  push עם rebase-retry ×3 → אימות-URL חי (מרקר-חייב-להיות-מוגש). בייטים-אידמפוטנטים:
  נתונים-זהים = no-op כנה. חוק-התנגשות: קבצים-חדשים בלבד + סעיפי-מרקר
  (<!--builder:pulse-->). ב-cron: `artery-builder.yml` (שעתי @ :17). קבלות: receipts/builder

- `growth-watch` — איבר-הצמיחה [t13 · owner order: "לוודא התפתחות וגדילה ולא סגירה,
  המנעות, נעילה וקיפול"]: **ברית-אי-הסגירה** — יומית: עורקים-פעילים (סקר-state מול-API,
  GitHub מכבה-cron אחרי-60 יום-חוסר-פעילות), משטחי-מוצר טריים, אתר-חי מגיש-דופק,
  קבלות-זורמות, backlog חי. כל-אות-סגירה = exit-2 רועש + קבלה (אין-ירוק-שקט).
  ב-cron: `artery-growth.yml` (יומי 06:19). חוק: LEARNING.md L7

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

- `artery-pacer` — איבר-הקצב [t14 · owner order: "תמשיך ודחוף"]: **הלב שאינו-בוטח-במתזמן** —
  נמדד-חי: GitHub משמיט-משבצות-cron בשקט (value-scan: 0 הרצות-meschedule מ-01:32; artery-fleet: 0
  מ-5-האחרונות; גם-משבצות-ה-self-heal אבדו אחרי-02:12) ו-6 עורקים ישבו DEGRADED על-סטיות-זמן
  בלבד. ה-pacer משרשר-עצמו ב-repository_dispatch (הדפוס-המוכח של sovereign-state): מודד גיל-הצלחה
  אחרונה מול-קצב-כל-עורק, מצית סטיים (cap-6, חוק-הרשאת-dispatch בלבד), מדווח בכנות. מצערת-14דק
  (אין-דפיקות-כפולות) · no-churn (רק-פעימות-משמעותיות נכתבות-לגיט) · cron=מחלץ-חירום בלבד.
  ב-workflow: `artery-pacer.yml`. קבלות: receipts/pacer

- `treasury-forensics` — משטרת-האוצר [t14]: מודד-מהשרשרת מי-הזיז-vesting של-האוצר ב-48h
  (delegate/withdraw/transfer, צד-שני כ-ref בלבד). פסק-ראשון: **0-פעולות** — עליית-ה-SP 2855↔4029
  היא-תנודת-הערכה/צומת, לא-דליפה. מחובר-ל-treasury-topup (flow48h בכל-קבלה). תיקון-נמדד:
  get_account_history מוגבל-100 לצומת.
