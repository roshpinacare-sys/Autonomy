# דוח-שומר-השלמות — 2026-11-02T02:14:05.293Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=41369576581 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=41372592808 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41365300335 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41372594049 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41366477584 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41329725027 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41329725027 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41368305979 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41369572585 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41367182464 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41372594949 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=41370143851 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 298h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
