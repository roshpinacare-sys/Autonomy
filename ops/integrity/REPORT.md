# דוח-שומר-השלמות — 2026-11-01T08:29:04.928Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=10 · ממצאים=7

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=41282621457 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=41283764121 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41283765129 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41285554308 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41281178444 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41192342567 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41192342567 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41285381452 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41285555417 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=41286413230 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Domain:office/data.json` — time-sanity — 2026-11-01T08:01:58.794Z outside window 2026-11-01T09:01:45Z
- **MEDIUM** `Domain:office/data.json` — time-sanity — 2026-11-01T08:02:06.146Z outside window 2026-11-01T09:01:47Z
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 280h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
