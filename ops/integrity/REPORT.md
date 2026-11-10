# דוח-שומר-השלמות — 2026-11-10T20:54:45.794Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42892065563 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42885575272 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42878882345 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42894538768 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42896763391 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=42816574461 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42816574461 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42892060840 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42898494726 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42894170509 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42892296015 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42896766683 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 508h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
