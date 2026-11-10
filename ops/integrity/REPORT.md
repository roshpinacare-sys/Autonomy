# דוח-שומר-השלמות — 2026-11-10T02:51:13.464Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42732851014 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42740109408 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42740109283 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42744715884 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42743214600 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=42619772366 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42619772366 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42739535103 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42739523404 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42736471609 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42740113093 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42736915649 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 490h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
