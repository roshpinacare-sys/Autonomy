# דוח-שומר-השלמות — 2026-10-29T22:35:48.347Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40950753518 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40957955109 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40944280903 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40959804489 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40957958381 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40900904236 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40900904236 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40961396449 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40957708935 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40961399366 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40959805782 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40954076120 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 222h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
