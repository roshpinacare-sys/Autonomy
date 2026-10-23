# דוח-שומר-השלמות — 2026-10-23T13:37:34.745Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=39951825410 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=39952227345 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=39948897597 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=39957334302 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=39939567557 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=39930897821 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39930897821 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39949918971 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39956687123 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39949921203 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=39959116920 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=39960928943 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 69h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
