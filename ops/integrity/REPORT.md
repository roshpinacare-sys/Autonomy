# דוח-שומר-השלמות — 2026-10-25T09:41:39.241Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40174245213 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40178017904 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40176237509 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40181630039 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40181630861 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40179274786 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40079565133 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40175932357 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40177715386 conc=failure repo=Autonomy
- ✅ `Domain:office/data.json` — run=40175933711 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40179793322 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40176238867 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 113h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
