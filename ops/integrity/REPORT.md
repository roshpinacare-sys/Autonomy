# דוח-שומר-השלמות — 2026-11-11T06:24:12.476Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42960400124 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42962220754 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42970991263 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42970974910 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42955064006 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=42816574461 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42816574461 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42966124382 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42968997271 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42969003962 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42969445841 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42969445222 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 518h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
