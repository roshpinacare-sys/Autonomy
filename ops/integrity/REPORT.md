# דוח-שומר-השלמות — 2026-11-07T23:33:42.159Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42419768029 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42424527586 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42414015814 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42423488770 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42410582800 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=42383698162 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42383698162 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42421881138 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42419471104 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42418938205 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42424529249 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42422482401 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 439h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
