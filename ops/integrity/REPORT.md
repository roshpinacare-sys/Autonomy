# דוח-שומר-השלמות — 2026-11-04T06:42:42.441Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=41780507068 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=41779229072 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41783307970 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41784754071 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41783310101 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41630975718 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41630975718 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41779849543 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41784096934 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41779852024 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41784756053 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=41786245610 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 350h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
