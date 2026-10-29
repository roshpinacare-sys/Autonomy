# דוח-שומר-השלמות — 2026-10-29T20:38:48.552Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40936255461 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40944274116 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40944280903 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40944281942 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40925761396 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40900904236 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40900904236 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40944032533 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40943737887 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40948266148 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40944287350 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40940287284 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 220h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
