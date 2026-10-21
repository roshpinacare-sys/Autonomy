# דוח-שומר-השלמות — 2026-10-21T22:29:01.376Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=39675150874 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=39675580247 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=39684434068 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=39686089082 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=39658234284 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=39648091966 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39648091966 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39675797857 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39675792028 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39679462030 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=39681033658 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=39681033048 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent-9@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 30h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
