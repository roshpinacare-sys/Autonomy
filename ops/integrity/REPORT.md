# דוח-שומר-השלמות — 2026-11-03T23:29:53.430Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=41724367952 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=41736854414 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41721109871 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41736856389 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41735022038 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41630975718 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41630975718 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41730463921 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41737987180 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41734327857 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41736859222 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=41733183011 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 343h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
