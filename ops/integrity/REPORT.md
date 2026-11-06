# דוח-שומר-השלמות — 2026-11-06T14:26:17.809Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42215567143 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42228839958 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42225139234 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42227048935 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42213165908 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=42214385960 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42214385960 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42229880284 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42225946786 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42229578334 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42228845706 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42225143513 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 406h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
