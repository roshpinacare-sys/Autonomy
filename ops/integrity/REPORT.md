# דוח-שומר-השלמות — 2026-11-09T13:24:34.166Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42612168163 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42612288276 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42619626496 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42623470264 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42614010427 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=42619772366 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42619772366 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42619346716 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42615343048 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42610059706 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42617894159 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42621555464 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 477h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
