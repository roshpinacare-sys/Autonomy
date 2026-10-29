# דוח-שומר-השלמות — 2026-10-29T04:17:15.694Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=40805714534 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=40808393787 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=40814656606 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=40812180294 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=40813425343 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=40763863457 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40763863457 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=40814353119 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40811877847 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=40814355063 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=40814658741 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=40814657749 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 204h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
