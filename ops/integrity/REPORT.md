# דוח-שומר-השלמות — 2026-11-02T07:46:33.447Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=41401751797 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=41407773698 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41394043507 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41407775237 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41406344899 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41329725027 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41329725027 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41401244520 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41401234924 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41404029802 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41407778476 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=41404883135 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 303h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
