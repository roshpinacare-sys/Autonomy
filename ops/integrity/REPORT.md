# דוח-שומר-השלמות — 2026-10-27T00:07:43.493Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40423144430 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40415424628 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40412078338 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40418631117 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40406751482 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40351666473 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40351666473 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40422025907 conc=failure repo=Autonomy
- ✅ `Domain:office/data.json` — run=40421974234 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40423509187 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40421688656 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40423164412 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 152h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
