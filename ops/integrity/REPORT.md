# דוח-שומר-השלמות — 2026-10-30T02:44:51.948Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40985069119 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40990026434 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40984810317 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40990027213 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40983449506 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40900904236 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40900904236 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40988340665 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40988336032 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40990924811 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40990028364 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40990027868 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 226h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
