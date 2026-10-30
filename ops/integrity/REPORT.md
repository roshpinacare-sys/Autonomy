# דוח-שומר-השלמות — 2026-10-30T16:44:51.216Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=41083844795 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=41087532383 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41073158080 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41089568246 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41079373817 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41043639225 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41043639225 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41089129917 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41089169041 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41085049326 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41089571470 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=41091599322 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 240h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
