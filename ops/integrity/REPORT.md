# דוח-שומר-השלמות — 2026-10-31T01:40:51.920Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=41151413733 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=41156048287 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41154981866 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41154982047 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41138154328 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41043639225 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41043639225 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41149953296 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41153697518 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41153702851 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41154984567 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=41151408416 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 249h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
