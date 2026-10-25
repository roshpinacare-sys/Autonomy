# דוח-שומר-השלמות — 2026-10-25T18:02:07.067Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=11 · ממצאים=6

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40212412488 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40213156565 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40210622778 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40214257020 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40218706733 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40217514140 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40216703225 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40217835964 conc=failure repo=Autonomy
- ✅ `Domain:office/data.json` — run=40217839241 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40215603094 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40218141987 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/grid/verdict.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: artery-grid
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 122h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
