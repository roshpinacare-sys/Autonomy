# דוח-שומר-השלמות — 2026-11-11T18:32:07.761Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=43057338876 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=43068603202 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=43070739670 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=43072926617 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=43075061761 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=43015053697 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=43015053697 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=43067925774 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=43067871157 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=43073035414 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=43070745314 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=43064187145 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 530h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
