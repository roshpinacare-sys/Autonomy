# דוח-שומר-השלמות — 2026-11-05T17:24:53.745Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42060291698 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42060062501 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42060065120 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42073099664 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42044271694 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=42025350436 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42025350436 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42064812311 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42069431729 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42066019620 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42073109300 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42070859486 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 385h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
