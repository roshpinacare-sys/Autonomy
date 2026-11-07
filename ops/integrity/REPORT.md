# דוח-שומר-השלמות — 2026-11-07T14:15:42.355Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42371938169 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42378235330 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42376185740 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42380382472 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42375114867 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=42366245529 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42366245529 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42375882316 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42379298479 conc=failure repo=Autonomy
- ✅ `Domain:office/data.json` — run=42375866014 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42377204938 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42376187751 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent-9@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 430h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
