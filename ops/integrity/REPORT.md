# דוח-שומר-השלמות — 2026-10-21T10:00:38.606Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=4

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=39564678937 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=39570504126 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=39572168406 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=39580752112 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=39568805569 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=39576013075 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39576013075 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39572445127 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39575867642 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39579303936 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=39575605075 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=39575602967 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
