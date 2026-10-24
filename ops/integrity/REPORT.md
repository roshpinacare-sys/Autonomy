# דוח-שומר-השלמות — 2026-10-24T14:41:08.257Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40098254759 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40099280839 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40100237492 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40100237395 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40091588034 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40079565133 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40079565133 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40096585740 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40101464332 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40101468931 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40102190883 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40097306252 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 94h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
