# דוח-שומר-השלמות — 2026-10-21T00:29:33.783Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=4

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=39521207459 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=39513756954 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=39505901782 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=39516665664 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=39502424671 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=39461127538 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39461127538 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39506923423 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39513144941 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39513148907 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=39520806222 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=39518041843 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
