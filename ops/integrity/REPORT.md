# דוח-שומר-השלמות — 2026-11-09T17:46:18.996Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42646081243 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42656097573 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42644803006 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42667011695 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42647028305 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=42619772366 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42619772366 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42663056583 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42663044824 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42665388933 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42660445431 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42667014485 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 481h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
