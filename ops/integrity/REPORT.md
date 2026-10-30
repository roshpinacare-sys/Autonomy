# דוח-שומר-השלמות — 2026-10-30T05:01:45.583Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40993451540 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40998888175 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41000063532 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41005007281 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41003798764 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40900904236 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40900904236 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41004724114 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41002246996 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41002252598 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41005009061 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40998891351 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 229h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
