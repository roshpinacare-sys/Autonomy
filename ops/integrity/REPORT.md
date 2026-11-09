# דוח-שומר-השלמות — 2026-11-09T22:49:48.687Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42712684662 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42701327979 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42696906192 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42709851365 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42681865000 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=42619772366 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42619772366 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42709000043 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42704641150 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42708902042 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42711913818 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42711912511 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 486h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
