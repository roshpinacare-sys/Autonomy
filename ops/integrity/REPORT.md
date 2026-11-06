# דוח-שומר-השלמות — 2026-11-06T12:10:22.636Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42201030950 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42204780979 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42205649714 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42213163542 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42213165908 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=42214385960 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42025350436 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42200346273 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42205588056 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42208976440 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42214772848 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42213167682 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 404h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
