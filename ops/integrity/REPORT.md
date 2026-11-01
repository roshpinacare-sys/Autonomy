# דוח-שומר-השלמות — 2026-11-01T06:55:01.968Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=41274925486 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=41277716067 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41273467150 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41281883613 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41281178444 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41192342567 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41192342567 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41280066816 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41278331796 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41280068312 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41282043627 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=41280272218 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 278h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
