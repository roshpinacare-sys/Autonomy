# דוח-שומר-השלמות — 2026-11-10T04:13:11.786Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42745418239 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42750722976 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42740109283 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42750724535 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42743214600 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=42619772366 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42619772366 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42750556976 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42749070342 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42745876422 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42752197165 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42747784346 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 492h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
