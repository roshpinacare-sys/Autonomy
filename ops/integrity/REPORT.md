# דוח-שומר-השלמות — 2026-10-24T18:15:38.800Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40116887313 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40113310012 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40112243068 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40116422615 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40107141787 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40079565133 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40079565133 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40116885654 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40117825820 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40116567932 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40119657574 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40118579019 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent-9@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 98h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
