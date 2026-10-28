# דוח-שומר-השלמות — 2026-10-28T16:21:02.319Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=10 · ממצאים=6

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40702932278 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40720404865 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40708532375 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40724857490 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40695757962 conc=success repo=Sandbox
- ✅ `Domain:office/data.json` — run=40719500517 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40714622093 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40719504770 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40724859570 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40715595869 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 192h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `FleetHQ:receipts/office-ci/verdict.json` — source-unreachable — raw 404 — דגל-כנה, לא-מילוי
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
