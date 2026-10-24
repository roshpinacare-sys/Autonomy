# דוח-שומר-השלמות — 2026-10-24T17:45:53.645Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40110754340 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40113310012 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40112243068 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40116422615 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40107141787 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40079565133 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40079565133 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40110605583 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40114127054 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40110020836 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40115205339 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40111219721 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 97h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
