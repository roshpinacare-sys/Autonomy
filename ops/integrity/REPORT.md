# דוח-שומר-השלמות — 2026-10-20T06:40:07.698Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=9 · ממצאים=12

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=39370958110 conc=success repo=Autonomy
- ✅ `Sandbox:ops/flow/receipt.json` — run=38983667757 conc=success repo=GridWatch
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=39380938295 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39378102339 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39375845281 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39378215262 conc=failure repo=Autonomy
- ✅ `Domain:office/data.json` — run=39372771841 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=38239391717 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=39379298712 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=z@container — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/wallet/verdict.json` — stale — 159h > 26h — artery-wallet
- **FLAG** `Sandbox:receipts/wallet/verdict.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: artery-wallet
- **FLAG** `Sandbox:receipts/fleet/verdict.json` — stale — 160h > 26h — artery-fleet
- **FLAG** `Sandbox:receipts/fleet/verdict.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: artery-fleet
- **FLAG** `Sandbox:receipts/grid/verdict.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: artery-grid
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:ops/flow/receipt.json` — stale — 79h > 26h — artery-flow
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 190h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane
- **FLAG** `Sandbox:ops/decision-truth/verdict.json` — stale — 188h > 30h — dynamic

[owner-directive]
