# דוח-שומר-השלמות — 2026-10-24T09:33:00.416Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40075407548 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40080084496 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40079218758 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40081836716 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40077490492 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40079565133 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40079565133 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40080538830 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40078816875 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40077061744 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40080086635 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40078360329 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 89h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
