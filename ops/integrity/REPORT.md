# דוח-שומר-השלמות — 2026-11-11T10:15:39.310Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42997877998 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42996771067 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42991161676 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42998623582 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42978937467 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=42816574461 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42816574461 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42998044476 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42999895959 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42996898843 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42996774211 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42993006226 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 522h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
