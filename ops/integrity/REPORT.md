# דוח-שומר-השלמות — 2026-11-08T01:10:49.358Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42426453011 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42431829851 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42426534418 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42431831083 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42427726324 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=42383698162 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42383698162 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42428869170 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42431617872 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42430931945 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42432824658 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42429796229 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 441h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
