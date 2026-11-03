# דוח-שומר-השלמות — 2026-11-03T20:14:46.283Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=41688867706 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=41707997222 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41697020985 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41703626297 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41701404857 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41630975718 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41630975718 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41706505603 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41707016941 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41705273335 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41703634611 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=41703631098 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent-9@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 340h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
