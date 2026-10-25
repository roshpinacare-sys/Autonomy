# דוח-שומר-השלמות — 2026-10-25T05:33:05.954Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40158670691 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40160403083 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40156966199 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40164647144 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40154631738 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40079565133 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40079565133 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40164935015 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40164207703 conc=failure repo=Autonomy
- ✅ `Domain:office/data.json` — run=40164210151 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40162977375 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40164648589 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 109h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
