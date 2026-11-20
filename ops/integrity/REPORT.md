# דוח-שומר-השלמות — 2026-11-20T23:20:33.012Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=11

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=44819160753 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=44346390412 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=44344954327 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=44731114021 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=44270266220 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=44738608611 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=44738608611 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=44835326183 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=44831988944 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=44835329304 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=44543820045 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=43093883156 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/wallet/verdict.json` — stale — 55h > 26h — artery-wallet
- **FLAG** `Sandbox:receipts/fleet/verdict.json` — stale — 55h > 26h — artery-fleet
- **FLAG** `Sandbox:receipts/latest.json` — stale — 12h > 2h — sovereign.yml
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:ops/flow/receipt.json` — stale — 63h > 26h — artery-flow
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 751h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane
- **FLAG** `Sandbox:ops/decision-truth/verdict.json` — stale — 33h > 30h — dynamic
- **FLAG** `Sandbox:ops/integrity/verdict.json` — stale — 219h > 30h — dynamic

[owner-directive]
