# דוח-שומר-השלמות — 2026-11-06T21:38:06.234Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42288498520 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42287081769 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42296761193 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42290895137 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42275313834 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=42214385960 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42214385960 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42293446267 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42292668639 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42288951562 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42294925888 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42296763295 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 413h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
