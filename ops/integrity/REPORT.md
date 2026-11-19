# דוח-שומר-השלמות — 2026-11-19T20:41:33.110Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=11

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=44590165377 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=44346390412 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=44344954327 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=43089779307 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=44270266220 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=44528366832 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=44528366832 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=44602176898 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=44602168314 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=44602182367 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=44543820045 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=43093883156 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/wallet/verdict.json` — stale — 28h > 26h — artery-wallet
- **FLAG** `Sandbox:receipts/fleet/verdict.json` — stale — 28h > 26h — artery-fleet
- **FLAG** `Sandbox:receipts/grid/verdict.json` — stale — 193h > 26h — artery-grid
- **FLAG** `Sandbox:receipts/latest.json` — stale — 7h > 2h — sovereign.yml
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:ops/flow/receipt.json` — stale — 36h > 26h — artery-flow
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 724h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane
- **FLAG** `Sandbox:ops/integrity/verdict.json` — stale — 193h > 30h — dynamic

[owner-directive]
