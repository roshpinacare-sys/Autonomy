# דוח-שומר-השלמות — 2026-11-06T04:56:02.982Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42151540969 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42162607524 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42151690569 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42163901721 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42163903635 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=42025350436 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42025350436 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42159011125 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42164271307 conc=failure repo=Autonomy
- ✅ `Domain:office/data.json` — run=42159013327 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42165180904 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42159916628 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 396h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
