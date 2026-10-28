# דוח-שומר-השלמות — 2026-10-28T19:40:17.186Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40745568311 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40750293444 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40733566502 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40750295643 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40731391298 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40725922738 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40725922738 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40751733759 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40747603794 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40751737158 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40750298751 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40746150623 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 195h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
