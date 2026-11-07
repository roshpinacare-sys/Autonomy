# דוח-שומר-השלמות — 2026-11-07T07:09:28.536Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42340461781 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42344517349 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42341719413 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42348390778 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42344519633 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=42214385960 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42214385960 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42342362237 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42348140912 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42342363730 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42346434661 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42349295968 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=roshpinacare@gmail.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 423h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
