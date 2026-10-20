# דוח-שומר-השלמות — 2026-10-20T04:42:15.901Z

**פסק-דין: PASS_WITH_ALERTS** · מקורות=9 · טענות-שאומתו=0 · ממצאים=22

## טענות-שאומתו מול Actions API
- (אין)

## ממצאים (מדורג — כשל-רשת-שלנו לעולם לא מדווח כזיוף)
- **MEDIUM** `self:ops/integrity/verdict.json` — api-unreachable — HTTP לא-אמין עבור run 39356092788 — לא-ניתן-לאימות, לא-זיוף
- **MEDIUM** `Sandbox` — tree-unreachable — HTTP 401 — גילוי-דינמי דולג (לא-זיוף)
- **MEDIUM** `FleetHQ` — tree-unreachable — HTTP 401 — גילוי-דינמי דולג (לא-זיוף)
- **MEDIUM** `Domain` — tree-unreachable — HTTP 401 — גילוי-דינמי דולג (לא-זיוף)
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — api-unreachable — HTTP לא-אמין עבור run 38983667757 — לא-ניתן-לאימות, לא-זיוף
- **MEDIUM** `FleetHQ:receipts/office-ci/verdict.json` — api-unreachable — HTTP לא-אמין עבור run 39330070597 — לא-ניתן-לאימות, לא-זיוף
- **MEDIUM** `Domain:office/data.json` — api-unreachable — HTTP לא-אמין עבור run 39330070597 — לא-ניתן-לאימות, לא-זיוף
- **MEDIUM** `Domain:office/data.json` — api-unreachable — HTTP לא-אמין עבור run 39367505683 — לא-ניתן-לאימות, לא-זיוף
- **MEDIUM** `Domain:office/data.json` — api-unreachable — HTTP לא-אמין עבור run 39369859584 — לא-ניתן-לאימות, לא-זיוף
- **MEDIUM** `Domain:office/data.json` — api-unreachable — HTTP לא-אמין עבור run 39362860446 — לא-ניתן-לאימות, לא-זיוף
- **MEDIUM** `Sandbox:ops/flow/receipt.json` — agent-authored-receipt — committer=326012154+roshpinacare-sys@users.noreply.github.com — קבלה-הטוענת-הרצת-Actions שנכתבה-מחוץ-ל-Actions
- **FLAG** `Sandbox:receipts/wallet/verdict.json` — stale — 157h > 26h — artery-wallet
- **FLAG** `Sandbox:receipts/wallet/verdict.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: artery-wallet
- **FLAG** `Sandbox:receipts/fleet/verdict.json` — stale — 158h > 26h — artery-fleet
- **FLAG** `Sandbox:receipts/fleet/verdict.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: artery-fleet
- **FLAG** `Sandbox:receipts/grid/verdict.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: artery-grid
- **FLAG** `Sandbox:receipts/latest.json` — stale — 4h > 2h — sovereign.yml
- **FLAG** `Sandbox:receipts/latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: sovereign.yml
- **FLAG** `Sandbox:ops/flow/receipt.json` — stale — 77h > 26h — artery-flow
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — stale — 188h > 26h — verifier.yml
- **FLAG** `Sandbox:state/verifier/verdict-latest.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: verifier.yml
- **FLAG** `Domain:agents/office-live.json` — unprovenanced — אין-טענת-run — שדרוג-מתוכנן ל-lane: office lane

[owner-directive]
