# דוח-שומר-השלמות — 2026-10-29T07:52:21.825Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40826985228 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40835487005 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40829935194 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40835490574 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40834068354 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40763863457 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40763863457 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40836761435 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40832314539 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40835122230 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40835490962 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40832631696 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 207h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
