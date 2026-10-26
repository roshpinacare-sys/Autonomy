# דוח-שומר-השלמות — 2026-10-26T10:43:17.372Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40292742520 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40304569228 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40294453982 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40302824763 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40285587706 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40304242383 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40304242383 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40299680410 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40306886854 conc=failure repo=Autonomy
- ✅ `Domain:office/data.json` — run=40306610454 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40304572012 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40301097173 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 138h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
