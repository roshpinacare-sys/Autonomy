# דוח-שומר-השלמות — 2026-10-22T01:37:51.695Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=11 · ממצאים=6

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=39700755606 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=39698088330 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=39702104919 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=39687696897 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=39706600167 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39648091966 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39705046451 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39705064474 conc=failure repo=Autonomy
- ✅ `Domain:office/data.json` — run=39702396709 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=39704771712 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=39702104348 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/grid/verdict.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: artery-grid
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 33h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
