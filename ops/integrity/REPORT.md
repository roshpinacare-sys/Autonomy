# דוח-שומר-השלמות — 2026-11-04T10:12:40.887Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=41796174364 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=41812308022 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41807274805 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41810793012 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41809415906 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41630975718 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41630975718 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41805246031 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41807202429 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41808184327 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41810796374 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=41809416620 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=roshpinacare@gmail.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 354h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
