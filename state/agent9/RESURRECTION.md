# RESURRECTION.md — פרוטוקול-התגלמות-מחדש של agent-9 מאפס מוחלט

**למי:** כל-גלגול חדש של agent-9 בסנדבוקס חדש (הקודם נמחק — זה נורמלי וצפוי).
**עקרון:** לעבוד לפי **הגיט**, לא לפי הסנדבוקס. הסנדבוקס אפמרלי; הגיט הוא הזיכרון.
נמדד חי: 3 מיתות-סנדבוקס (17/10), כל-אחת שוחזרה לתפוקה מלאה בתוך דקות — בזכות הפרוטוקול הזה.

## 0. מה אתה (זהות)
- agent-9, סוכן-חיצוני מ-9 מקבילים על org `roshpinacare-sys` (42 ריפו).
- קרא: `AGENT9-PROTOCOL.md` בשורש — חוקי-הדחיפה, הזהות, הקבלות, איסור-מחיקה.

## 1. creds (מיידי, אף-פעם לא להדפיס)
הבעלים מעלה `pat.env`. בנה `/home/z/.git-creds`:
```bash
LINE=$(tr -d ' \n\r' < /home/z/my-project/upload/pat.env)
case "$LINE" in
  https://*) printf '%s\n' "$LINE" > /home/z/.git-creds ;;
  gh*|github_pat*) printf 'https://sovereign-agent-9:%s@github.com\n' "$LINE" > /home/z/.git-creds ;;
esac; chmod 600 /home/z/.git-creds
```

## 2. clone (רק מה שצריך למשימה)
```bash
mkdir -p /home/z/project-review && cd /home/z/project-review
URL=$(tr -d '\n' < /home/z/.git-creds)
git clone -q "${URL%/}/roshpinacare-sys/Autonomy.git"        # הספר הראשי + המנוע
git clone -q "${URL%/}/roshpinacare-sys/saos-runtime.git"    # ריל-ה-CI הציבורי (חינם)
```

## 3. זהות (חוק — identity-guard כושל על NAME@users.noreply.github.com)
```bash
cd Autonomy && git config user.name "sovereign-agent-9" && git config user.email "agent9@sovereign.local"
cd ../saos-runtime && git config user.name "sovereign-agent-9" && git config user.email "agent9@sovereign.local"
```

## 4. קרא-מצב (מהגיט — לא מזיכרון, אין זיכרון)
1. `state/agent9/worklog-snapshot.md` — יומן-הגלים (עדכן אותו בסוף-כל-גל!)
2. `receipts/remediation/agent9-latest.json` — הקבלה הקנונית שלי
3. `receipts/chainbus/latest-scan.json` — מצב-האוטובוס
4. `receipts/execution/latest.json` — הביצוע האחרון של הצרכן
5. `state/review/EFFICIENCY-REVIEW-2026-10-17.md` — הסקירה הגלובלית + סולם L1–L6

## 5. מטריצת-אימות חיה (לפני כל-עבודה)
- אוטובוס: `receipts/chainbus/latest-scan.json` → 3-צמתים-מסכים? כמה כניסות?
- צרכן: Actions של Autonomy → directive-bus active? ריצות אחרונות ירוקות?
- pulse: saos-runtime → sovereign-pulse ירוק? גיל-השידור האחרון?
- watchdog: `state/grid-status.json` ב-saos-runtime → redCount? (אם אדום — **ודא ישירות
  מול raw** לפני שאתה מאמין: למוניטור עצמו יכול להיות באג — נמדד 17/10 אזעקת-שווא)
- minutes-0: אין cron פעיל בריפו פרטיים (API: workflows state != active)

## 6. דרך-העבודה (אותם חוקים, תמיד)
- דחיפה מוקדמת-ותכופה (הסנדבוקס עלול למות בכל-רגע).
- `--no-force` בלבד; דחייה → `pull --rebase` ונסה-שוב ×3; כישלון → branch `agent9/<task>`.
- `git add` עם-נתיבים-מפורשים בלבד (עולם-ה-CI כותב state בלי-הרף).
- סריקת-חדירה לפני commit: `grep -rE "gh[pousr]_|github_pat_|5[HJK][1-9A-HJ-NP-Za-km-z]{50}"` על מה שאתה מוסיף.
- כל-משימה → קבלה מכונה `receipts/remediation/` + סעיף ב-yomán (ס'4.1 למעלה) + worklog מקומי.

## 7. מה-חי-כרגע (עדכן תאריך!)
- 2026-10-17: לולאה חיה (3 קבלות), אוטובוס 26 כניסות/3-צמתים, minutes-0 מוחזק, pulse עם
  cron-כפול+שער-טריות, watchdog עם חוק-rail-חי, hive-probe עם cron-שני.
- פתוחים להחלטת-בעלים: re-arm סטרימת-תוכן (L4), מפתח-LLM ל-thinkGate (L3), אחדות-ספרים (L5).
