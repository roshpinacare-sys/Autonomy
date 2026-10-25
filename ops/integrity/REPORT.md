# דוח-שומר-השלמות — 2026-10-25T01:23:12.317Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40147018541 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40148587339 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40146003103 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40147727307 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40140488682 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40079565133 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40079565133 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40143780025 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40148275137 conc=failure repo=Autonomy
- ✅ `Domain:office/data.json` — run=40148278250 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40149477304 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40146860565 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 105h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
