# דוח-שומר-השלמות — 2026-11-08T22:57:40.822Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42532658139 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42524998156 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42528339166 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42531746443 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42526111561 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=42474811441 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42474811441 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42524812940 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42526905320 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42529541603 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42531747834 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42530599187 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 462h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
