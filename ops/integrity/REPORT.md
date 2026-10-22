# דוח-שומר-השלמות — 2026-10-22T07:45:40.104Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=39742306326 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=39733921140 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=39732560064 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=39739686761 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=39729929127 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=39740383516 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39740383516 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39731315724 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39739882885 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39736918224 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=39741217316 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=39738191395 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 39h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
