# דוח-שומר-השלמות — 2026-10-29T13:21:34.815Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40869566429 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40870584091 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40868827155 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40876083846 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40860240474 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40860766158 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40860766158 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40879487049 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40875656928 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40879490828 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40876087001 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40879939078 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 213h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
