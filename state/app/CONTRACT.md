# חוזה-הרשת (מיוצר — לא-נכתב-יד)

· סכמה: `network.contract/1` · מקור: `src/lib/contract-facts.ts` · sha256: `54d8ab3628cb4cb4…`

## מסילת-כתיבה
- כל-כתיבה נושאת baseSha שנקרא-טרי; התנגשות → 409 עם המצב-הטרי
- אחרי-כל-כתיבה readback עם MD5 — אימות-עצמי או דיווח-כישלון-כנה

## שער-ריבונות
- אין-כתיבה-אנונימית-לנתיבי-ריבונות; נדרש authority=sovereign + ownerVerified
  - `Autonomy:state/keys/` (קידומת)
  - `Autonomy:state/app/engineering.json`
- יישוב authority=receipt מחייב receiptRef>=8 + ownerVerified

## חוק-קבלות
- מינימום 8 תווים; קבלה-טרמינלית על-סדר-פתוח = סדר-שחייב-היה-להיסגר (סגירה-מוכחת); קבלה-ממתינת-עבודה = נשארת-פתוחה-בכנות

## רוטציה והסגר
- יומני-JSONL חסומים (appendJsonlBounded) — שורות-ישנות נשמטות; אין-גידול-ללא-גבול
- JSON שאינו-תקני אינו-מושתק-בשקט — מדווח corrupt עם-הקשר, אין-אתחול-שקט

## קאש ומדידה
- קריאות-תצוגה מקאש; כל-קריאה-שמזינה-כתיבה טרייה-תמיד (fresh) — baseSha/readback מדלגים-על-הקאש (TTL 30000ms)
- מדידת-שרשרת מקאש-עם-fetchedAt-אמת (TTL 60000ms)

## דמה, שער-כוונות, כלוב
- דמה: SIM=1 בסביבה וגם x-sim:1 בבקשה — בלי-השניים 403 fail-closed
- שער: חוצת-מקור → 403; x-intent מול-כוונה-צפויה; דלי-אסימונים לכל (IP,מסילה)
- כלוב: כל-תהליך-גיט-של-סוכן: protocol.allow=never + מלכודת-insteadOf + GIT_CEILING_DIRECTORIES + GIT_TERMINAL_PROMPT=0

## חוק-מפתחות וריפו-פרטי
- המערכת-אינה-דורשת-מפתח-שלא-במלאי בלי-לדווח-אדום-כנה; המלאי-הקנוני: Autonomy/state/keys/REGISTRY.json
- ריפו-פרטי = זיכרון-בלבד; אפס-וורקפלו-פעיל (חוק-T23)

## מפת-אימוצים
- מינימום 12 מנגנונים ב-`Autonomy/state/app/engineering.json — adopted`: A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12

## קבצי-מצב מאומתים-ב-CI
- `Autonomy:state/app/engineering.json`
- `Autonomy:state/app/decisions-cycle.json`
- `Autonomy:state/app/sessions.json`
- `Autonomy:state/keys/REGISTRY.json`
- `ops-intake:ops/QUEUE.json`

- קבצים-אלה חייבים-להתקיים, להתפרס כ-JSON, ולעמוד-במפתחות-החוזה; סטייה = CI-אדום
