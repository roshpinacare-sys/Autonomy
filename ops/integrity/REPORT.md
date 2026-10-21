# דוח-שומר-השלמות — 2026-10-21T03:58:00.507Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=11 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=39539166366 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=39541103128 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=39538684232 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=39526138749 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=39541138535 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39537484501 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39536508710 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39536533238 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39536510642 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=39541108019 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=39536226094 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/grid/verdict.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: artery-grid
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
