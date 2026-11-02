# דוח-שומר-השלמות — 2026-11-02T18:32:36.772Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=41479878940 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=41487392639 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41478656921 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41500143511 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41497965336 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41443344869 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41443344869 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41488603848 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41496995762 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41492852155 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41500143198 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=41497965865 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 314h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
