# דוח-שומר-השלמות — 2026-10-24T06:01:49.998Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40064132855 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40067790421 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40058694607 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40067791249 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40063254361 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=39982744750 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39982744750 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40064964925 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40064131594 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40063999530 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40066063283 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40066062851 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 86h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
