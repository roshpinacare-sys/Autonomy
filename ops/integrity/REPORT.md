# דוח-שומר-השלמות — 2026-11-10T13:05:16.809Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42819149259 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42808614329 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42819923236 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42814145376 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42793741332 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=42816574461 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42816574461 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42813521228 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42817321669 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42819037384 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42819924886 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42818024428 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 501h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
