# דוח-שומר-השלמות — 2026-11-09T06:43:55.555Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42562048043 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42566753260 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42572123524 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42570797451 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42564175486 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=42474811441 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42474811441 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42567881467 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42570323713 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42572929724 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42570799127 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42573473980 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 470h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
