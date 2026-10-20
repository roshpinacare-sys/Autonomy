# דוח-שומר-השלמות — 2026-10-20T20:04:45.823Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=11 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=39475629910 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=39476018228 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=39483753087 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=39472099272 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=39461127538 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39461127538 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39477323570 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39481425086 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39477326847 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=39487517638 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=39481842966 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/grid/verdict.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: artery-grid
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
