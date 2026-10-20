# דוח-שומר-השלמות — 2026-10-20T15:02:21.622Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=39432460647 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=39434350863 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=39436366729 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=39442487564 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=39440439844 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=39443505144 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39441213975 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39429845051 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39439130550 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39432761541 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=39440442568 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=39440442223 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 198h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
