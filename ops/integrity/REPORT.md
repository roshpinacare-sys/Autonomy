# דוח-שומר-השלמות — 2026-11-12T15:08:43.948Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=6

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=43222656985 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=43083532550 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=43070739670 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=43089779307 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=43075061761 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=43219312890 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=43219312890 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=43223689992 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=43236776873 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=43221265561 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=43087706366 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=43093883156 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent9@fleet.local — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — stale — 12h > 2h — sovereign.yml
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 551h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
