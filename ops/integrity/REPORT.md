# דוח-שומר-השלמות — 2026-11-07T17:53:52.013Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42387955395 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42394036681 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42389000507 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42397409908 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42392949963 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=42383698162 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42383698162 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42392027607 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42396554072 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42391883120 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42398496721 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42391709002 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 433h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
