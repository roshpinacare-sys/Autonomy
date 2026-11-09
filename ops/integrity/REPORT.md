# דוח-שומר-השלמות — 2026-11-09T15:35:25.945Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42625155443 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42640125494 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42644803006 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42640126378 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42614010427 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=42619772366 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42619772366 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42631258399 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42637945271 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42633553591 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42642416659 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42635790550 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 479h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
