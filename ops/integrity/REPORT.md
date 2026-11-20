# דוח-שומר-השלמות — 2026-11-20T00:29:14.004Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=11

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=44627276907 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=44346390412 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=44344954327 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=43089779307 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=44270266220 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=44528366832 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=44528366832 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=44640745393 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=44635162095 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=44637002555 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=44543820045 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=43093883156 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/wallet/verdict.json` — stale — 32h > 26h — artery-wallet
- **FLAG** `Sandbox:receipts/fleet/verdict.json` — stale — 32h > 26h — artery-fleet
- **FLAG** `Sandbox:receipts/grid/verdict.json` — stale — 197h > 26h — artery-grid
- **FLAG** `Sandbox:receipts/latest.json` — stale — 11h > 2h — sovereign.yml
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:ops/flow/receipt.json` — stale — 40h > 26h — artery-flow
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 728h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane
- **FLAG** `Sandbox:ops/integrity/verdict.json` — stale — 196h > 30h — dynamic

[owner-directive]
