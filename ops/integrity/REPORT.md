# דוח-שומר-השלמות — 2026-10-26T16:49:30.364Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=11 · ממצאים=6

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40341456527 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40359580437 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40361780798 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40341026665 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40351666473 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40351666473 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40349525205 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40355337884 conc=failure repo=Autonomy
- ✅ `Domain:office/data.json` — run=40350979294 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40359585745 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40354984960 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/grid/verdict.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: artery-grid
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 144h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
