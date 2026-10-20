# R318 — החוק-הכלכלי-נמדד (economic-law-measured)

**מקור-הסמכות**: דברי-הבעלים ירדו בלשונם ל-OWNER-LEGACY.md (R318: "תמשיך ודחוף").
**ההקשר**: גל-116 (agent-2-economy-core) הקים את המושל-הריבוני (lib/governor.ts + CONSTITUTION ננעלת בקנון). המושל חוקק בפועל: מדידה→הכרעה→חוק-בספר→פסק-דין-מבוסס-מדידה. אך מסילת-הריבונות (decider/claims/attestor) לא מדדה אותו — הכלכלה הייתה חוק-בלי-סרגל.

## ההכרעה

הכלכלה של הריבונות היא חוק-חוקתי, לא פרמטר-תצורה. מעתה:

### חוק 1 — חקיקה-כלכלית-נמדדת (economy-legislates-measured)
החלטות-המושל הן חוק בספר (kind:policy/govern/govern-outcome) ונמדדות ע"י מסילת-הריבונות כמו כל-גוף. מושל-שאינו-מחוקק (אפס-מדיניויות-טריות) או מושל-שאינו-נמדד (אין-טענה-עומדת) = סטייה.

### חוק 2 — חוקת-המושל fail-closed (constitution-bounds-fail-closed)
כל-מדיניות-חוץ-ל-CONSTITUTION (רצפת [30,250]$ · מס [250,500]bps · עמלות [50,90]% · קור-רוח · בדיקת-תוצאה · הקפאה-עצמית) = P0 fail-closed. המושל חוקק בתוך-החוקה; הקנון בלבד משנה-את-החוקה (הפרדת-רשויות — governor.ts סעיף-החוקה).

### חוק 3 — שוויון-ספר-לכלכלה (ledger-equality-economy)
חוק 3 של R317 מיושם על מסילת-הכלכלה: הטענות-הכלכליות נמדדות בספר-הטענות-האחד (CLAIMS.json) לצד-כל-המסילות. אין-ספר-נפרד לכלכלה, אין-טענות-פרטיות למושל.

### חוק 4 — הבעלים-לא-נשכח-בכלכלה (owner-report-rhythm-fail-closed)
דו"ח-הבעלים (kind:owner-report, כל-6ש' — הון-נטו · Δ · סגירות · runway · החלטות) הוא-חוק fail-closed: קצב-חסר או שדות-חסרים = סטייה נראית. הריבון מנהל-את-הרשת לטובת-הבעלים — ומדווח-על-זה מכנית גם-בהיעדרו.

## המבחנים-הכוזבים
- חוק 1: נגידה — מחיקת כל-שורות-ה-policy מהספר → D9 ENFORCED P0. אימות: D9 ירוק רק עם policy-טרי-בספר + gov-חי-ב-snapshot.
- חוק 2: נגידה — הזרקת מדיניות taxBps=900 → חייבת-להידחות/להיחשף בסריקת-גבולות. אימות: D9 סורק כל-policy-מול-הגבולות המפורסמים ב-governor.ts.
- חוק 3: נגידה — מחיקת טענות-governor מ-CLAIMS.json → attestor refutes. אימות: 3 טענות-המושל עומדות ונמדדות-טרי בכל-ריצה.
- חוק 4: נגידה — עצירת-מנוע → owner-report-cadence טענה refutes בתוך-מחזור. אימות: gov.reportEveryMs מחושב-מול-lastReportAt.

## יישום-מכני (R318)
- DIRECTIVES/R318-ECONOMIC-LAW-MEASURED.md — מסמך-זה (4 חוקים)
- CHARTER.md סעיף 9 — התיקון-החוקתי
- DECIDER/decider.py → D9-economic-governance עומדת-חסרת-מפתח (מודד doctrine+charter+governor.ts-RAW+snapshot-gov-RAW)
- CLAIMS.json 25→28: governor-legislating · governor-constitution-bounds · governor-owner-report-cadence
- OWNER-LEGACY.md — דברי-הבעלים R318 בלשונם
- LEVEL.json — בלוק-r318 + ממד-חדש
