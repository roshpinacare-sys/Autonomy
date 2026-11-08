# דוח-שומר-השלמות — 2026-11-08T20:47:15.929Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42521614949 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42516960492 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42514743735 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42518065494 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42507872916 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=42474811441 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42474811441 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42517836725 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42517832816 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42515641087 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42518066980 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42514746318 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 460h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
