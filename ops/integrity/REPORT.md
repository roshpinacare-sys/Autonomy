# דוח-שומר-השלמות — 2026-10-20T16:58:55.923Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=11 · טענות-שאומתו=11 · ממצאים=4

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=39444655867 conc=success repo=Autonomy
- ✅ `Sandbox:receipts/wallet/verdict.json` — run=39448716142 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/fleet/verdict.json` — run=39460642466 conc=success repo=Sandbox
- ✅ `Sandbox:receipts/grid/verdict.json` — run=39458708071 conc=success repo=Sandbox
- ✅ `Sandbox:ops/flow/receipt.json` — run=39440439844 conc=success repo=Sandbox
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=39461127538 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=39444652408 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39453982367 conc=success repo=Autonomy
- ✅ `Domain:office/data.json` — run=39445825950 conc=success repo=Autonomy
- ✅ `Sandbox:ops/decision-truth/verdict.json` — run=39456742467 conc=success repo=Sandbox
- ✅ `Sandbox:ops/integrity/verdict.json` — run=39454774487 conc=success repo=Sandbox

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
