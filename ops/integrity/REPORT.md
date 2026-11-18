# דוח-שומר-השלמות — 2026-11-18T21:47:35.060Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=9

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=44381958938 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=44346390412 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=44344954327 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=43089779307 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=44270266220 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=44308894410 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=44308894410 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=44402928914 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=44402209994 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=44402233673 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=43087706366 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=43093883156 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/grid/verdict.json` — stale — 170h > 26h — artery-grid
- **FLAG** `Sandbox:receipts/latest.json` — stale — 7h > 2h — sovereign.yml
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 701h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane
- **FLAG** `Sandbox:ops/decision-truth/verdict.json` — stale — 170h > 30h — dynamic
- **FLAG** `Sandbox:ops/integrity/verdict.json` — stale — 170h > 30h — dynamic

[owner-directive]
