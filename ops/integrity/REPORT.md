# דוח-שומר-השלמות — 2026-11-04T13:55:00.387Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=41823118408 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=41836571436 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41825026651 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41838602114 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41836577636 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41825746796 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41825746796 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41826752376 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41838453826 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41834418439 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41838603143 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=41832643354 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 357h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
