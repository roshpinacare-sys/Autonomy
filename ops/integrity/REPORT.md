# דוח-שומר-השלמות — 2026-10-31T09:57:25.344Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=41185087901 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=41188480940 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41188481120 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41187545037 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41187546620 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41043639225 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41043639225 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41183792192 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41189261173 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41187403805 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41188482242 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=41184830802 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent-9@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 257h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
