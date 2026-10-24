# דוח-שומר-השלמות — 2026-10-24T00:20:44.632Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40033207603 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40039725907 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40033949131 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40042147124 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40026211551 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=39982744750 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39982744750 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40034793310 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40039035952 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40038579755 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40042148216 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40036825617 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 80h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
