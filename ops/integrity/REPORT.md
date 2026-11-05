# דוח-שומר-השלמות — 2026-11-05T08:13:06.265Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=41978151942 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=41991876069 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41985620883 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41987194565 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41985621996 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41825746796 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41825746796 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41986536694 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41986533725 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41984581834 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41987199666 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=41988750054 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 376h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
