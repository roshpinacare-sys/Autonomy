# דוח-שומר-השלמות — 2026-11-03T16:19:41.484Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=41650802031 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=41659840088 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41671615847 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41669214061 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41666898426 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41630975718 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41630975718 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41660914992 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41659975643 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41656368851 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41669226589 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=41671624091 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 336h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
