# דוח-שומר-השלמות — 2026-11-02T14:28:43.356Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=41443410747 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=41457193701 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41453303469 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41457195017 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41433310804 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41443344869 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41443344869 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41450322022 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41458018098 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41450325174 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41457197738 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=41453307572 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 310h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
