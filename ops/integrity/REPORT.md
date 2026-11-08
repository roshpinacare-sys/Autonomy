# דוח-שומר-השלמות — 2026-11-08T11:02:40.903Z

**פסק-דין: FAIL** · מקורות=11 · טענות-שאומתו=10 · ממצאים=7

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=42472003231 conc=failure repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=42464013502 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=42464014159 conc=failure repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=42473027507 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=42473027738 conc=success repo=Sandbox
- ✅ `Domain:office/data.json` — run=42472737648 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42471982974 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=42472130456 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=42470068818 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=42469052547 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **CRITICAL** `FleetHQ:receipts/office-ci/verdict.json` — conclusion-contradiction — receipt=BLOCKED run=failure
- **CRITICAL** `Domain:office/data.json` — conclusion-contradiction — receipt=BLOCKED run=failure
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 451h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
