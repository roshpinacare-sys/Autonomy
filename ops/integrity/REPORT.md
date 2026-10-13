# דוח-שומר-השלמות — 2026-10-13T02:14:21.990Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=9 · טענות-שאומתו=3 · ממצאים=8

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=38325068597 conc=failure repo=Autonomy
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=38335819755 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=38335218796 conc=success repo=FleetHQ

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `Sandbox` — tree-unreachable — HTTP 404 — גילוי-דינמי דולג (לא-זיוף)
- **FLAG** `Sandbox:receipts/wallet/verdict.json` — source-unreachable — raw 404 — דגל-כנה, לא-מילוי
- **FLAG** `Sandbox:receipts/fleet/verdict.json` — source-unreachable — raw 404 — דגל-כנה, לא-מילוי
- **FLAG** `Sandbox:receipts/grid/verdict.json` — source-unreachable — raw 404 — דגל-כנה, לא-מילוי
- **FLAG** `Sandbox:receipts/latest.json` — source-unreachable — raw 404 — דגל-כנה, לא-מילוי
- **FLAG** `Sandbox:ops/flow/receipt.json` — source-unreachable — raw 404 — דגל-כנה, לא-מילוי
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — source-unreachable — raw 404 — דגל-כנה, לא-מילוי
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
