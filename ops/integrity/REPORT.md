# דוח-שומר-השלמות — 2026-11-03T03:20:19.474Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=41569598099 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=41566829577 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41568202521 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41566831183 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41559266323 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41443344869 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41443344869 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41568795097 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41566111380 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41563268333 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41566832703 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=41563863780 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 323h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
