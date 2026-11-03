# דוח-שומר-השלמות — 2026-11-03T07:45:54.830Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=41584524222 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=41594911691 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41583970244 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41593441013 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41581318032 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41443344869 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41443344869 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41591544159 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41591541845 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41589778087 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41593442592 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=41592079400 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 327h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
