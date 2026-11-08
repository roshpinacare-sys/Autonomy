# דוח-שומר-השלמות — 2026-11-08T02:39:04.803Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42433049202 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42438560264 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42438560901 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42435716890 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42427726324 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=42383698162 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42383698162 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42434983436 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42438419839 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42434915074 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42436621421 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42436620654 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 442h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
