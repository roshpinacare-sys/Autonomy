# דוח-שומר-השלמות — 2026-10-29T19:01:45.483Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40918897284 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40929956885 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40919292367 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40936165560 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40925761396 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40900904236 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40900904236 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40923088305 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40935601505 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40931482854 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40936165792 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40925763928 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 219h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
