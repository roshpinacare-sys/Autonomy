# דוח-שומר-השלמות — 2026-11-04T20:07:54.269Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=41887271170 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=41897941309 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41902209854 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41900097706 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41871404911 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41825746796 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41825746796 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41896048110 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41891654908 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41896024375 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41900096897 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=41893494534 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 364h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
