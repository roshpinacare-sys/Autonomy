# דוח-שומר-השלמות — 2026-10-28T08:19:52.743Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40646828275 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40653339170 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40644916373 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40654845661 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40641867337 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40525866765 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40525866765 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40647155300 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40649963589 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40652829334 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40654848560 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40650476055 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 184h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
