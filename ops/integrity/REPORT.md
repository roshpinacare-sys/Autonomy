# דוח-שומר-השלמות — 2026-11-05T18:51:23.740Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42074065755 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42075308162 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42085961767 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42081691391 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42079596002 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=42025350436 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42025350436 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=42082615180 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42082516388 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42078272050 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42081692732 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42085965456 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=agent-9@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 386h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
