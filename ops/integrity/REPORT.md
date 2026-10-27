# דוח-שומר-השלמות — 2026-10-27T01:41:33.277Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40424186752 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40426092713 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40430305724 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40430306303 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40431661156 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40351666473 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40351666473 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40433710747 conc=failure repo=Autonomy
- ✅ `Domain:office/data.json` — run=40432039100 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40433712486 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40432988569 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40432987515 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 153h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
