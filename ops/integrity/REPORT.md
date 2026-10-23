# דוח-שומר-השלמות — 2026-10-23T10:02:35.130Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=39919610887 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=39929799945 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=39929803962 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=39931410149 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=39914433699 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=39930897821 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39930897821 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39930186246 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39934299895 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39930188507 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=39933024565 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=39926555627 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 66h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
