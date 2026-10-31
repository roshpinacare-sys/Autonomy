# דוח-שומר-השלמות — 2026-10-31T07:45:39.623Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=41173481802 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=41175835053 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41177656636 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41180419154 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41173185506 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41043639225 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41043639225 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41178374483 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41179319803 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41180288693 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41181297607 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=41178533328 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 255h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
