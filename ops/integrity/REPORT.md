# דוח-שומר-השלמות — 2026-10-21T16:09:57.815Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=11 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=39612481362 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=39620310009 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=39614467046 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=39626225452 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=39631845400 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39609905421 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39627151379 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39631266955 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39624411060 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=39626227659 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=39626225198 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/grid/verdict.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: artery-grid
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
