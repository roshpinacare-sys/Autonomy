# דוח-שומר-השלמות — 2026-10-21T11:42:41.230Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=4

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=39581320446 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=39582506684 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=39592316508 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=39587401676 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=39568805569 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=39576013075 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39576013075 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39585609061 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39582706254 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39579303936 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=39589029005 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=39587403037 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
