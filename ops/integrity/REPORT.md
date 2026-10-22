# דוח-שומר-השלמות — 2026-10-22T15:51:43.095Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=11 · ממצאים=6

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=39806567978 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=39808426208 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=39794197626 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=39782340630 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=39805328199 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39804500128 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39804543623 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39804532059 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39803083698 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=39806378834 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=39804277373 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/grid/verdict.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: artery-grid
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 47h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
