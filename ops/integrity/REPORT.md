# דוח-שומר-השלמות — 2026-11-01T11:38:58.422Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=12 · ממצאים=5

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=41293039236 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=41301721813 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=41294848912 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=41300736187 conc=failure repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=41295781157 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=41300907087 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41300907087 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=41296582075 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41302419155 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=41302423982 conc=failure repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=41300737748 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=41299681149 conc=failure repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 283h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
