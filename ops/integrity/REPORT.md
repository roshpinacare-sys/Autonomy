# דוח-שומר-השלמות — 2026-11-09T20:28:13.306Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42690285625 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42686129938 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42644803006 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42692628563 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42681865000 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=42619772366 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42619772366 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42680900267 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42684582559 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42678016384 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42686132700 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42681868056 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 484h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
