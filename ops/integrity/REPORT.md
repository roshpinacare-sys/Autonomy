# דוח-שומר-השלמות — 2026-11-02T12:17:21.142Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=41425226064 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=41431594637 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41431595390 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41442247586 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41433310804 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41329725027 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41329725027 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41438624494 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41439651316 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41436211025 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41442248720 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=41440532081 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 308h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
