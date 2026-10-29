# דוח-שומר-השלמות — 2026-10-29T23:24:13.780Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40967045116 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40970340071 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40967094433 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40967096031 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40957958381 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40900904236 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40900904236 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40961396449 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40964985514 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40968342836 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40967098997 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40970376349 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 223h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
