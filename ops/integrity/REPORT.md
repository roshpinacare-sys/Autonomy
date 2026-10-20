# דוח-שומר-השלמות — 2026-10-20T09:59:14.909Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=39388574202 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=39399121526 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=39396393725 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=39400738620 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=39386187185 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=39400266387 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39400266387 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39398591850 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39398902672 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39398595206 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=39399125192 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=39395530915 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 193h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
