# דוח-שומר-השלמות — 2026-10-22T09:57:46.703Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=11 · ממצאים=6

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=39742680990 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=39756441752 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=39751278239 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=39754723345 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=39759258135 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39756706233 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39753177975 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39753517390 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39756621566 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=39754724272 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=39753042539 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/grid/verdict.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: artery-grid
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 41h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
