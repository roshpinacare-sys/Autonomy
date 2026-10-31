# דוח-שומר-השלמות — 2026-10-31T21:07:46.207Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=41234107619 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=41238333657 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41237276440 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41240397419 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41236242292 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41192342567 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41192342567 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41238182478 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41239066793 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41236876952 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41241408067 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=41241407537 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 269h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
