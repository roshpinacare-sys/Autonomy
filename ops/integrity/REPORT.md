# דוח-שומר-השלמות — 2026-10-30T13:48:53.768Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=41055163781 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=41060086550 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41051598875 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41065626503 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41050014733 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41043639225 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41043639225 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41064023701 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41062426681 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41063353302 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41065631303 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=41063775011 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 237h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
