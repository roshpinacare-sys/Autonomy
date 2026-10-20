# דוח-שומר-השלמות — 2026-10-20T13:41:33.862Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=11 · ממצאים=6

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=39420254413 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=39421480834 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=39414992730 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=39411825067 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=39432281501 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39430116385 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39429845051 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39429841512 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39418129562 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=39432410424 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=39426715243 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/grid/verdict.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: artery-grid
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 197h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
