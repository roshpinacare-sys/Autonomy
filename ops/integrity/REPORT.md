# דוח-שומר-השלמות — 2026-10-27T07:51:50.645Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40456539450 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40462534835 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40461209986 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40469268799 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40452184853 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40351666473 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40351666473 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40464458160 conc=failure repo=Autonomy
- ✅ `Domain:office/data.json` — run=40464451993 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40464460154 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40469273157 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40469271057 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 159h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
