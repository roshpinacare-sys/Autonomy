# דוח-שומר-השלמות — 2026-10-23T22:23:49.420Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40032086173 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40029521054 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40014276941 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40031013706 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40026211551 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=39982744750 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39982744750 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40028275586 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40029836299 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40024932752 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40031016965 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40026212249 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 78h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
