# דוח-שומר-השלמות — 2026-11-03T00:52:41.766Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=41553387911 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=41544848141 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41551706976 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41554715500 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41531666109 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41443344869 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41443344869 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41548644288 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41548641381 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41552747582 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41554716638 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=41553140496 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 320h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
