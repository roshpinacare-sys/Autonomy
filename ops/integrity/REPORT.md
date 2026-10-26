# דוח-שומר-השלמות — 2026-10-26T12:44:06.996Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40309571890 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40316570283 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40314920028 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40323403650 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40311536956 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40304242383 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40304242383 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40310107713 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40316847527 conc=failure repo=Autonomy
- ✅ `Domain:office/data.json` — run=40316852279 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40318337009 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40313242917 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 140h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
