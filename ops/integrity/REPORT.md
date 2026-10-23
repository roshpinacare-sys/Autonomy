# דוח-שומר-השלמות — 2026-10-23T17:49:51.593Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=39982772222 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=39992315072 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=39992325655 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=39995973960 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=39997812958 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=39982744750 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39982744750 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39986983825 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39988827848 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39986986620 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=39995977612 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=39988597225 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 73h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
