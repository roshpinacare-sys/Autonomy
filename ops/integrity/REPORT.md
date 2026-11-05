# דוח-שומר-השלמות — 2026-11-05T11:35:41.598Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42017093557 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42017159448 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42012163282 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42015276617 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42013500150 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41825746796 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41825746796 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42019287251 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42012753106 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42007002125 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42015278477 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42013502072 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 379h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
