# דוח-שומר-השלמות — 2026-10-27T18:58:14.357Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40543855842 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40553091789 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40546729222 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40561673338 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40533433329 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40525866765 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40525866765 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40553338153 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40557562413 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40557566058 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40561676683 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40563741839 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 170h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
