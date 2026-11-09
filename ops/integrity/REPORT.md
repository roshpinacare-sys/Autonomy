# דוח-שומר-השלמות — 2026-11-09T02:45:04.247Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42551711182 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42549552169 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42542154857 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42550797938 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42544812700 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=42474811441 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42474811441 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42544275247 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42544499752 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42547440934 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42550799381 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42547205061 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 466h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
