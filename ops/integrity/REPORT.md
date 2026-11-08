# דוח-שומר-השלמות — 2026-11-08T10:36:12.627Z

**פסק-דין: FAIL** · מקורות=11 · טענות-שאומתו=10 · ממצאים=7

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42462370062 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42464013502 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42464014159 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42461171612 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42457562266 conc=success repo=Sandbox
- ✅ `Domain:office/data.json` — run=42462357338 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42468200323 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42466378125 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42470068818 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42469052547 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **CRITICAL** `FleetHQ:receipts/office-ci/verdict.json` — conclusion-contradiction — receipt=BLOCKED run=failure
- **CRITICAL** `Domain:office/data.json` — conclusion-contradiction — receipt=BLOCKED run=failure
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 450h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
