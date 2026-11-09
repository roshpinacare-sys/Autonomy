# דוח-שומר-השלמות — 2026-11-09T11:50:44.924Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42604222239 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42599656145 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42610568445 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42608811562 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42586805397 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=42474811441 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42474811441 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42608283294 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42606282104 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42597340583 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42610566153 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42608810422 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 475h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
