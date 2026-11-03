# דוח-שומר-השלמות — 2026-11-03T05:32:56.695Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=41571522638 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=41576204457 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41583970244 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41582651258 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41581318032 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41443344869 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41443344869 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41581850368 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41579355415 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41581852474 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41582653893 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=41582652570 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 325h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
