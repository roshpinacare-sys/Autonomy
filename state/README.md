# state/ — חוזה מדינת-הרשת של Autonomy (`sanbox-state/1`)
#
# קובץ-החוזה-המחייב של עורק-המדינה (engine/state-tick.mjs + engine/state-lib.mjs).
# הועבר-ל-Autonomy ב-2026-10-12 (task 3-a) לאחר-שנמדד שקובץ-המדינה של הסנדבוקס-הפרטי
# לא-נישא-הנה (run 38305674414: "טעינת-מצב-המדינה-נכשלה — לא-נכתב-מצב-מומצא").
#
# הכללים (נאכפים-ב-validateState — מבנה-רע = זריקה, לא-ניחוש):
#   · schema קבוע: sanbox-state/1 · genesis קבוע: sha256("sanbox-genesis-v1")
#   · שרשרת-מרקל-מצטבר: prevMerkle=null → merkle===genesis; אחרת chainRoot של-הליבה
#   · כתיבה-אטומית בלבד (tmp+rename) · יומן-keeper ב-512-שורות-אחרונות
#   · אפס-המצאה: כל-שדה = מדידה או null — כישלון נרשם-כן (status failed), לא-מומצא
#   · אפס-סודות · אפס-שמות-אחוזה — הקובץ נסרק fail-closed ב-engine/leak-scan.mjs בכל-טיק
#
# הטריטוריה: network-state.json (המצב) · keeper.log (היומן) — בעורק-זה בלבד.
# המפעיל: workflow_dispatch עם action=health/selftest/snapshot/arm/disarm (נאכף-ב-engine/operator.mjs).
