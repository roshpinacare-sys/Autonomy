# דוח-שומר-השלמות — 2026-10-25T13:55:29.696Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40190345311 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40197846751 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40198883906 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40196803639 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40196804623 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40179274786 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40179274786 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40196452172 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40198458215 conc=failure repo=Autonomy
- ✅ `Domain:office/data.json` — run=40196447610 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40198884552 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40195766772 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 117h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
