# דוח-שומר-השלמות — 2026-10-28T12:00:05.574Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40668124221 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40677581808 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40663398021 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40682730007 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40666962291 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40672770499 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40672770499 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40671594233 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40675119958 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40678547113 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40682732792 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40674112143 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 188h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
