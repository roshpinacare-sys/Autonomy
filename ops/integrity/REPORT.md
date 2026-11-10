# דוח-שומר-השלמות — 2026-11-10T15:51:37.908Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42826163977 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42836942053 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42825248494 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42839368306 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42823918391 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=42816574461 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42816574461 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42827723338 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42843885296 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42831767693 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42846649285 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42832345173 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 503h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
