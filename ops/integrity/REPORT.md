# דוח-שומר-השלמות — 2026-10-24T10:53:45.703Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40082359012 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40086271276 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40079218758 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40085383241 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40077490492 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40079565133 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40079565133 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40085797929 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40085821908 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40082301456 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40087143620 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40084504233 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 90h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
