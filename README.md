# Autonomy — המוח-הריבוני על דקות-ציבור

[![SAOS office](https://roshpinacare-sys.github.io/Domain/badge/office.svg)](https://roshpinacare-sys.github.io/Domain/office3d/)
[![SAOS fleet](https://roshpinacare-sys.github.io/Domain/badge/fleet.svg)](https://roshpinacare-sys.github.io/Domain/status/)
[![steem-edge](https://roshpinacare-sys.github.io/Domain/badge/edge.svg)](https://roshpinacare-sys.github.io/Domain/money.html)


> **Public compute, private memory.** הריפו הזה הוא שכבת-ההרצה של הריבונות:
> עורקי-ההחלטה, הלמידה, הצמיחה והבקרה רצים כאן 24/7 על דקות-Actions ציבוריות
> (חינם, ללא מכסה), ללא שום תלות בשום סנדבוקס, שום סשן, שום סוכן ער.
>
> הזיכרון ההיסטורי (פנקסים, קבלות-עבר, ספרי-צי) נשאר בריפו הפרטי.
> כאן רק **קוד + מצב-חי**. כל קבלה שנכתבת כאן עוברת חסם-דחיפה
> (`engine/leak-scan.mjs`) — אפס חומר-מפתח, אפס מזהי-צי, אפס נתיבי-גישה.

## למה זה קיים (הבעיה ההנדסית)

הריפו הפרטי שרץ על דקות-פרטיות מת כשהמכסה נגמרת (0 שלבים, נפילה-מיידית).
התשובה: **הרצה ציבורית = אינסוף דקות**. ריפו ציבורי + schedules = הלב
פועם לנצח, בחינם, בלי בעלים, בלי סנדבוקס.

## המסילות (wave 1)

| עורק | תפקיד |
|---|---|
| `artery-catchup` / `sovereign` | פעימת-הריבונות: tick, תיקוף, לכידת-פיגור |
| `sovereign-state` | tick מצב + ערוץ-מפעיל |
| `artery-flow` | מפת-זרימה בין כל נכסי-האחוזה |
| `artery-fleet` / `artery-wallet` / `artery-grid` / `artery-integrity` | אימות-צי, ארנק, גריד, שלמות |
| `artery-scribe` | הסופר: תצפיות → פנקס |
| `verifier` / `federation` / `fleet-heal` | מאמת, פדרציה, ריפוי-צי (PAT חוצה-ריפו) |
| `hive-probe` | בדיקת-חיות רשתות-השרשרת |
| `evo-windows-staleness` / `fresh-oracle` / `office-growth` / `token-watchdog` / `retro` / `sovereign-decider` | חלונות-אבולוציה, אורקלים, צמיחה, שומר-טוקנים, רטרוספקטיבה |

## עורקים ב-wave 2 (מוסתרים עד סניטיזציה של roster)

`decision-truth`, `participation`, `fleet-yield`, `key-proof`, `research-lane`,
`value-scan`, `profit-oracle` — הסקריפטים שלהם מכילים מזהי-צי מילוליים ודורשים
רפקטורינג לפתרון-רוסטר דרך סוד (`FLEET_ROSTER_MAP`) לפי דפוס-refs של Console.

## חוקי-הבית

1. **כנות**: כל מסילה מדווחת verdict אמיתי — UNAVAILABLE זה חוקי, שקר אסור.
2. **fail-closed**: חסם-הדחיפה חוסם כל commit עם חומר-רגיש.
3. **אדיטיבי**: כל סוכן מוסיף, לא דורס.
4. **עצמאות**: אפס תלות בסנדבוקס/סשן/סוכן — רק git + Actions ציבורי.

---
מקור: מראה של שכבת-הרצת Sandbox (HEAD מסוניט 2026-10-12), נבנה בעקבות הוראת-בעלים
על עצמאות מלאה מתשתית-חיצונית.

## הצטרפות-סוכן חדש (onboarding) [t17 · agent-9]

כל סשן/סוכן חדש — הכלים והזיכרון כבר מוכנים כאן. שלוש פקודות:

1. `node agents/agent-9/sandbox-tools/sandbox-restore.mjs` — drill בריאות מלא (עם `--fix`: משחזר לבד תעודה/repos/worklog)
2. קרא `agents/agent-9/tools-manifest.md` — מניפסט כל הכלים: מה קיים, מה הוא עושה, איך מריצים
3. `bash agents/agent-9/sandbox-tools/restore.sh` — drill + הקמת watchdog חיצוני (כל 5 דקות census+revive)

הזיכרון המלא: `agents/agent-9/worklog.md` — חוקי-הבית, מתקפות-עבר והלקחים, כל המדידות.
עותק-ביטוח שלישי: repo `steem` (פרטי) תחת `agents/agent-9/` — אם השניים האחרים נפגעים.
אחרי כל אתחול-סנדבוקס: drill → watchdog → המשך-בנייה. איסור כתיבה בסינית לבעלים — עברית בלבד.
