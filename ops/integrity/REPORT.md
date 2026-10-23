# דוח-שומר-השלמות — 2026-10-23T07:22:43.615Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=39907057111 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=39909044757 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=39911674169 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=39913055392 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=39914433699 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=39805328199 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39805328199 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39909059332 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39910744045 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39911681152 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=39914435345 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=39915856821 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 63h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
