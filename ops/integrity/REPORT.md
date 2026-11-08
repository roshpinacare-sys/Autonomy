# דוח-שומר-השלמות — 2026-11-08T18:54:03.050Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42511167699 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42509019176 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42501212738 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42509020126 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42507872916 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=42474811441 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42474811441 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42503921760 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42506483465 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42508739810 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42509022620 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42506775643 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 458h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
