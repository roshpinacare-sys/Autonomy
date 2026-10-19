# FLOW MAP · מפת-הזרימה המדודה של האורגניזם

נמדד: 2026-10-19T13:31:32.369Z
צומת=14 · קשת=43 · רפאים=0 · ישנים=0 · יתומים=0 · פנים-מישורי=4 · משולב-דף=9 · צפיפות-זרימה=3.07

| פיד | ריפו | סוג | גיל | חוק-טריות | מי-מייצר | אינטגרציה |
|---|---|---|---|---|---|---|
| `receipts/wallet/verdict.json` | Autonomy | receipt | 0.8h | <=2h | artery-wallet (hourly) | INTEGRATED |
| `receipts/fleet/verdict.json` | Autonomy | receipt | 1.2h | <=3h | artery-fleet (2h) | INTEGRATED |
| `receipts/grid/verdict.json` | Autonomy | receipt | 0.8h | <=1h | artery-grid (30min) | INTEGRATED |
| `receipts/latest.json` | Autonomy | pulse | 0.4h | <=1h | sovereign.yml (~15min) | INTEGRATED |
| `ops/lessons/ledger.md` | Autonomy | lesson | 2.7h | <=26h | artery-scribe (daily) | PLANE-INTERNAL |
| `ops/flow/flow-map.json` | Autonomy | flowmap | 3.4h | <=4h | artery-flow (3h) | SELF |
| `receipts/office-ci/verdict.json` | FleetHQ | receipt | 0.6h | <=30h | office-ci (push) | INTEGRATED |
| `office/state/office-state.json` | FleetHQ | state | 0.3h | <=3h | office-heartbeat (2h) | INTEGRATED |
| `digest.json` | FleetHQ | digest | 0.2h | <=26h | unknown (404 measured 2026-10-11) | PLANE-INTERNAL |
| `office/data.json` | Domain | book | 0.0h | <=1h | office-pulse (20min) | INTEGRATED |
| `agents/office-live.json` | Domain | book | ? | <=3h | office-artery (2h) | PLANE-INTERNAL |
| `dex/office-feed.json` | Domain | book | ? | <=26h | office-feed (daily) | PLANE-INTERNAL |
| `status.json` | Domain | book | ? | <=30h | pages build | INTEGRATED |
| `marketing/adsmarket.json` | Domain | book | ? | <=168h | adsmarket-panel (weekly Mon 05:41 UTC + dispatch) | INTEGRATED |

## רפאים (צרכן-חי על מפיק-מת) — flag
- none

## ישנים-מעבר-חוק (flag)
- none

## יתומים (מפיק-שאף-אחד-לא-קורא) — יעדי-זיקוק, flag
- none

## פנים-מישורי (מסתובב-רק-בתוך-האיבר-שמייצר-אותו) — flag
- `roshpinacare-sys/Autonomy:ops/lessons/ledger.md` (artery-scribe (daily))
- `roshpinacare-sys/FleetHQ:digest.json` (unknown (404 measured 2026-10-11))
- `roshpinacare-sys/Domain:agents/office-live.json` (office-artery (2h))
- `roshpinacare-sys/Domain:dex/office-feed.json` (office-feed (daily))

## סטיית-תוכן-מול-קומיט (קומיט-חד-של-תוכן-ישן) — flag
- none
