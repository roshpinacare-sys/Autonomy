# דוח-שומר-השלמות — 2026-10-13T00:00:40.686Z

**פסק-דין: FAIL** · מקורות=9 · טענות-שאומתו=3 · ממצאים=10

## טענות-שאומתו מול Actions API
- ✅ `self:ops/integrity/verdict.json` — run=38305759419 conc=success repo=Autonomy
- ✅ `FleetHQ:receipts/office-ci/verdict.json` — run=38324572338 conc=success repo=FleetHQ
- ✅ `Domain:office/data.json` — run=38324572338 conc=success repo=FleetHQ

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **CRITICAL** `Domain:office/data.json` — ghost-run — run 38242234259 אינו-קיים ב-Sandbox (404 מוכח)
- **CRITICAL** `Domain:office/data.json` — ghost-run — run 38226675048 אינו-קיים ב-Sandbox (404 מוכח)
- **MEDIUM** `Sandbox` — tree-unreachable — HTTP 404 — גילוי-דינמי דולג (לא-זיוף)
- **FLAG** `Sandbox:receipts/wallet/verdict.json` — source-unreachable — raw 404 — דגל-כנה, לא-מילוי
- **FLAG** `Sandbox:receipts/fleet/verdict.json` — source-unreachable — raw 404 — דגל-כנה, לא-מילוי
- **FLAG** `Sandbox:receipts/grid/verdict.json` — source-unreachable — raw 404 — דגל-כנה, לא-מילוי
- **FLAG** `Sandbox:receipts/latest.json` — source-unreachable — raw 404 — דגל-כנה, לא-מילוי
- **FLAG** `Sandbox:ops/flow/receipt.json` — source-unreachable — raw 404 — דגל-כנה, לא-מילוי
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — source-unreachable — raw 404 — דגל-כנה, לא-מילוי
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
