# דוח-שומר-השלמות — 2026-11-13T14:03:12.688Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=12

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=43420856081 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=43083532550 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=43070739670 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=43089779307 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=43075061761 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=43422374863 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=43422374863 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=43431267526 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=43431221149 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=43427525703 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=43087706366 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=43093883156 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/wallet/verdict.json` — stale — 43h > 26h — artery-wallet
- **FLAG** `Sandbox:receipts/fleet/verdict.json` — stale — 44h > 26h — artery-fleet
- **FLAG** `Sandbox:receipts/grid/verdict.json` — stale — 42h > 26h — artery-grid
- **FLAG** `Sandbox:receipts/latest.json` — stale — 7h > 2h — sovereign.yml
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:ops/flow/receipt.json` — stale — 44h > 26h — artery-flow
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 574h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane
- **FLAG** `Sandbox:ops/decision-truth/verdict.json` — stale — 43h > 30h — dynamic
- **FLAG** `Sandbox:ops/integrity/verdict.json` — stale — 42h > 30h — dynamic

[owner-directive]
