# דוח-שומר-השלמות — 2026-10-20T12:10:40.049Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=39404631224 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=39410313924 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=39414992730 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=39419794299 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=39411825067 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=39420063353 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39400266387 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39408213842 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39414672966 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39408215971 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=39418180724 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=39414648144 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=noreply@github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 195h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
