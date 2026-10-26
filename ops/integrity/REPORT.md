# דוח-שומר-השלמות — 2026-10-26T00:21:31.417Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40241244090 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40242684415 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40248823958 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40247719250 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40247720250 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40219202644 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40219202644 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40245174491 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40246502065 conc=failure repo=Autonomy
- ✅ `Domain:office/data.json` — run=40246504427 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40248825350 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40247721489 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 128h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
