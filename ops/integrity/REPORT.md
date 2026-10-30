# דוח-שומר-השלמות — 2026-10-30T21:37:23.311Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=41125755456 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=41126626137 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41119628917 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41126629598 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41110449844 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41043639225 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41043639225 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41122963400 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41129938439 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41129946144 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41126630374 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=41130150115 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 245h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
