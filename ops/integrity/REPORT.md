# דוח-שומר-השלמות — 2026-11-07T04:55:01.539Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42334451071 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42337650261 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42330376669 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42336642015 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42328133875 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=42214385960 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42214385960 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42335508735 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42337480081 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42334433649 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42338666015 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42335695261 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 420h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
