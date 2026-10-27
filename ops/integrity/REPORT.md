# דוח-שומר-השלמות — 2026-10-27T20:40:57.983Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40564456313 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40567966066 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40571967489 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40578004076 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40567967085 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40525866765 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40525866765 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40576353433 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40572712766 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40574121575 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40578008447 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40578009222 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 172h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
