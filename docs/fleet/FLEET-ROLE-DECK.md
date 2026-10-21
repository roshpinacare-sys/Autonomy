# FLEET-ROLE-DECK/1 — ספר-התפקידים-החי של-הצי [t54 · agent-9]

> **מקור-ההשראה (t54, פקודת-בעלים "בחן את אלו ונצל מה שניתן"):** 
> github.com/msitarzewski/agency-agents — דפוס-אמת: אישיות-סוכן נכתבת-במבנה
> **Identity → Mission → Critical-Rules → Deliverables → Success-Metrics**.
> אומץ-המבנה בלבד (R330 — התוכן-שלהם עוסק-בדמויות-דמיוניות; אצלנו כל-סעיף
> נכתב מתוך **מדידה-חיה מן-הקבלות** — מה שרץ, מה שחתם, מה שנמדד).

מטרת-המסמך: **שרשור-קו-אחד** לבעלים — מי-עושה-מה בצי, איזה-עורק נושא-איזה-שער,
איפה-החסימות-היחידות-האמת, וכיצד-אין-דריסות-וכפילויות. עודכן: 2026-10-21 05:0xZ.

---

## האיברים-החיים (מדודים)

### 1. 🎯 headcorner-trader — יד-הסחר-הפנימית
- **Identity:** חשבון-הסוחר על הספרים-הפנימיים STEEM/SBD — התזרים-החוץ-האמת-היחיד-שחי-היום.
- **Mission:** להציב-גריד-רציף על הספר-הפנימי, לקצור-spread אמיתי (SBD), לשמור-נזילות.
- **Critical-Rules:** אין-שידור-בלי-מדידה-טרייה; כל-גל עובר AUTOHEDGE-GATE/1 לפני-חתימה;
  רצפת-האוצר-3000-SP-עדיפה-על-כל-גל-סחר.
- **Deliverables (נמדד-חי 05:05Z):** 35–42 פקודות-פתוחות, מילויים-רציפים (fill 27.292-STEEM↔2.833-SBD ×2 ב-04:46Z), יתרת-נזיל 107.87-STEEM+2.06-SBD.
- **Success-Metrics:** מילויים/שעה · רווח-SBD-מצטבר · פסק-דין-שער-ירוק.
- **מפתחות:** active-key בסודות-CI-של-Autonomy (מסילת-relay-t52) — אין-מפתח-בשום-עץ-עבודה.

### 2. 🛡️ treasury-keeper — שומר-הרצפה
- **Identity:** מסילות-האוצר של-agent-9 (floor-gate · consolidate · forensics).
- **Mission:** חוק-אחד-מכני: **האצלה-חוצה רק-מעודף-מעל-רצפת-3000**; משיכת-הידיים-מהעודף-בלבד.
- **Critical-Rules:** fail-closed-UNMEASURED על-רקב-RPC; אפס-סודות-בשער; כל-הרצה מפרסמת-קבלה.
- **Deliverables (נמדד):** engine/treasury-floor-gate.mjs (selftest-7/7) · artery-treasury-floor-watch-שעתית — קבלת **PASS @ 04:30Z** (net 1679.78, rowsOut 1289.59, surplus 0) · כיווץ-t52: +228-SP-על-השרשרת.
- **Success-Metrics:** כל-BREACH נראה-תוך-שעה · הרצפה-מתמלאת-מהחזרות-ה-7-ימים (1361-SP-בפייפליין).

### 3. ⚖️ autotrade-hedge-gate — שער-הסיכון-לפני-ביצוע *(חדש-t54)*
- **Identity:** אימוץ-מכני מ-AutoHedge (The-Swarm-Corporation): Risk-first + MarketMakingConfig.
- **Mission:** כל-גל-פקודות עובר-שער-חישובי-טהור לפני-חתימה: גודל-פקודה ≤1%-מהון-עובד ·
  חשיפת-base ≤20% (חוק-הדלתא: מעל-התקרה-אסור-להעמיק — מכירות-בלבד) · רווח-מינימלי 0.2% ·
  איזון-מחדש-ייעוץ-מעל-10%-סטייה. **אפס-LLM, אפס-עלות, fail-closed.**
- **Deliverables:** engine/autotrade-hedge-gate.mjs (selftest-15/15) · engine/autotrade-measure.mjs
  (מדידה-חיה keyless: יתרות+ספר+oracle-CoinGecko+פער-ארביטראז) · artery-autotrade-hedge-gate.yml-שעתית (:37).
- **Success-Metrics:** פסק-דין-שעתי-על-הגריד-העומד · פער-פנים↔חוץ-נמדד-באחוזים (05:05Z: −0.62% → BUY-INTERNAL-DISCOUNT).

### 4. 🔀 ff-gatekeeper — שער-FixedFloat
- **Identity:** מסילת-ההמרה-האיכותית-ל-BTC-אמיתי (מפתח-הבעלים-על-Autonomy).
- **Mission:** ערוץ-המרה STEEM/HIVE→BTC כשהרשת-תאשר.
- **Deliverables:** engine/fixedfloat.mjs (HMAC-חתימה-מאומתת 200) · probe-שעתי —
  **HONEST-FAIL @ 03:23Z: STEEM/HIVE-"fromCcy is incorrect" + /ccies-501** — המפתח-ללא-הרשאות/הזוגות-טרם-אושרו-ב-dashboard-FF-שלהם.
- **Success-Metrics:** flip-מ-HONEST-FAIL-ל-quote-חי · אישור-הטוקן-הפנדינג-שלהם.
- **חסימה-חוץ:** תהליך-אישור-שלהם — **הבעלים-הורה-לחכות** (t53); אין-פעולת-בעלים-נדרשת-עד-אישורם.

### 5. 🗄️ insurance-archive — סוכן-הביטוח (אני, agent-9)
- **Identity:** ארבעת-עותקי-האמת + פורנזיקת-המחיקות + שחזור-מן-הגיט.
- **Mission:** ששום-עבודה-אמת-לא-תיעלם; שכל-רישום-ייבדק-מן-הרחוק.
- **Deliverables:** worklog-×4 (מקומי ≡ saos-runtime ≡ steem-תג ≡ estate-agent-9) — כל-4-נמדדו byte-identical-`b0fe7baf`-מיד-לפני-t54 · תיקון-שורש-floating-builds (@090edd03: פטור-ARCHIVE-BASE + אימות-כיסוי-תג) — המכונה-v3-רצה-נקייה (archived=0, אפס-ענפי-ארכיון-נחתכים).
- **Success-Metrics:** אפס-עותק-אמת-שנפגע-מאז-התיקון · שחזור-מהיר-מוכח (t51).

### 6. 🌊 עורקי-הצי-האחים (מחוץ-למישור-שלי — נמדד-לשרשור, לא-לנגיעה)
- **wave-19.47 (אחי-המנוע):** מנוע-הדקס-הפנימי; refs-cure-עצמאי (2785bf0a) — רפואת-refs-כנה-מדודה.
- **pacer/builder/chainbus (sovereign-agent-9):** פעימה/בנייה/סריקה — רצים-לסירוגין-עם-העורקים-שלי.
- **census/participation (מכונת-בעלים):** מדדה-0/14-market-capable-דרך-קבלת-סקר-מפתחות-ישנה —
  **תיקון-תפיסה-מדוד:** המפתחות-חיים-ב-CI-Autonomy (מסילת-relay-t52); ראיה: 19+-טרנזקציות-חתומות-על-השרשרת-וסחר-חי-עכשיו. הקבלה-מדווחת-מקור-ישן-ולא-ממישור-ה-relay.
- **dex-grid.yml (phase0-zai):** תקוע-מ-18-10 (run 39083910311, conclusion=None-×3-ימים) — נרשם-בפנקס-t53; מסילת-אחר.

---

## מטריצת-השרשור (אין-דריסות)

| מישור | בעלים | שער-מכני | קבלה-מפרסמת |
|---|---|---|---|
| האצלות-אוצר | agent-9 (floor) | TREASURY-FLOOR-GATE/1 | receipts/treasury-floor |
| גלי-סחר/גריד | כל-מסילה-מבצעת | AUTOHEDGE-GATE/1 | receipts/autotrade-hedge |
| מחיקת-ענפים-רופפים | floating-builds-v3 | פטור-ARCHIVE-BASE+תג-מוזז | commits-המכונה |
| המרה-חוץ-ל-BTC | ff-gatekeeper | FIXEDFLOAT-PROBE/1 | receipts/fixedfloat |
| ארכיון/שחזור | insurance-archive | עותקי-אמת-×4 | steem-תג+estate |
| מנוע-דקס-פנימי | wave (אחי) | רפואת-refs-עצמית | commits-הגל |

**חוק-החיזוק-ההדדי:** כל-מסילה-חדשה קוראת-לשערים-הקיימים-במקום-לבנות-חוק-מקביל;
קבלות-כנות-בלבד (PASS/BLOCK/UNMEASURED/HONEST-FAIL) — אין-ירוק-שקרי.

---

## החסימות-היחידות-האמת (נמדד-05:0xZ)

1. **FF-dashboard:** הרשאות-מפתח/זוגות-STEEM-HIVE — ממתינים-לאישורם (חוץ-טהור; אפס-פעולת-בעלים).
2. **Hive-keys-0/12:** הספר-הפנימי-HIVE-לא-נסחר-על-ידינו — דורש-מפתחות-HIVE-בכספת (החלטת-בעלים-מתועדת).
3. **רצפה-בפייפליין:** 1679.78-net-+1361-SP-חזרות-7-ימים → נסגרת-מאליה-אם-החוק-מאוכף.

אין-חסימה-אחרת. הכל-השאר — חי, רץ, מדוד.
