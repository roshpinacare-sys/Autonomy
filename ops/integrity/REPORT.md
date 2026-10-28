# דוח-שומר-השלמות — 2026-10-28T05:34:29.569Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40632640232 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40634098301 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40630342455 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40637964186 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40621524167 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40525866765 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40525866765 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40632638250 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40631775760 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40632623750 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40637966387 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40631617534 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 181h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
