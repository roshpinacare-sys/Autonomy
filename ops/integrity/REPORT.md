# דוח-שומר-השלמות — 2026-10-21T21:00:31.285Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=39655648076 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=39662139309 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=39662140846 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=39671791329 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=39658234284 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=39648091966 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39648091966 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39663129819 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39669163170 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39668128221 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=39673699188 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=39667919199 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 29h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
