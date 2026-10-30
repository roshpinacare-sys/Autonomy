# דוח-שומר-השלמות — 2026-10-30T15:47:02.692Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=41066342953 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=41073154392 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41073158080 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41081432578 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41079373817 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41043639225 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41043639225 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41076863088 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41076856913 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41076866080 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41081438642 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=41077281811 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 239h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
