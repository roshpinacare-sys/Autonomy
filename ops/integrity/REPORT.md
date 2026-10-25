# דוח-שומר-השלמות — 2026-10-25T07:50:04.754Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40168738790 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40172016741 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40166343422 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40171191943 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40167927264 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40079565133 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40079565133 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40169246803 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40172545205 conc=failure repo=Autonomy
- ✅ `Domain:office/data.json` — run=40172546542 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40172839344 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40170369294 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 111h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
