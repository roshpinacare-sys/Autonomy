# דוח-שומר-השלמות — 2026-10-27T23:09:02.302Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40586474443 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40594932081 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40596973223 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40593207645 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40598490488 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40525866765 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40525866765 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40588031779 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40588017697 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40592905833 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40593207638 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40591427435 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent-9@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 175h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
