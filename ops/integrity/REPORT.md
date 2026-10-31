# דוח-שומר-השלמות — 2026-10-31T17:29:11.067Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=41214683842 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=41223185882 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41224283812 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41223187087 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41218905058 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41192342567 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41192342567 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41222964129 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41220829347 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41222965894 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41224284998 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=41218905741 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 265h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
