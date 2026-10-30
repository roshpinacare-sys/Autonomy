# דוח-שומר-השלמות — 2026-10-30T22:57:28.736Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=41132383735 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=41138153237 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41139604894 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41139604477 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41138154328 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41043639225 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41043639225 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41133230231 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41140570509 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41139354971 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41139605905 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=41141052298 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 246h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
