# דוח-שומר-השלמות — 2026-10-31T13:50:09.272Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=41200017008 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=41201327895 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41199356922 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41206356585 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41202316820 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41192342567 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41192342567 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41204215566 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41204171134 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41206187432 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41203306164 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=41204341724 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 261h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
