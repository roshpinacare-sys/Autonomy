# דוח-שומר-השלמות — 2026-10-23T18:35:41.471Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=39998089900 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=39992315072 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=39992325655 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40003382262 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=39997812958 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=39982744750 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39982744750 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39998046857 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39998087098 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39998049659 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40003387721 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40001554326 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 74h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
