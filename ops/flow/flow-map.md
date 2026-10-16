# FLOW MAP · מפת-הזרימה המדודה של האורגניזם

נמדד: 2026-10-16T11:36:13.521Z
צומת=14 · קשת=7 · רפאים=0 · ישנים=0 · יתומים=7 · פנים-מישורי=6 · משולב-דף=0 · צפיפות-זרימה=0.5

| פיד | ריפו | סוג | גיל | חוק-טריות | מי-מייצר | אינטגרציה |
|---|---|---|---|---|---|---|
| `receipts/wallet/verdict.json` | Autonomy | receipt | 5.2h | <=2h | artery-wallet (hourly) | ORPHAN |
| `receipts/fleet/verdict.json` | Autonomy | receipt | 4.2h | <=3h | artery-fleet (2h) | ORPHAN |
| `receipts/grid/verdict.json` | Autonomy | receipt | 0.5h | <=1h | artery-grid (30min) | ORPHAN |
| `receipts/latest.json` | Autonomy | pulse | 0.3h | <=1h | sovereign.yml (~15min) | PLANE-INTERNAL |
| `ops/lessons/ledger.md` | Autonomy | lesson | 3.6h | <=26h | artery-scribe (daily) | PLANE-INTERNAL |
| `ops/flow/flow-map.json` | Autonomy | flowmap | 3.4h | <=4h | artery-flow (3h) | SELF |
| `receipts/office-ci/verdict.json` | FleetHQ | receipt | 0.1h | <=30h | office-ci (push) | PLANE-INTERNAL |
| `office/state/office-state.json` | FleetHQ | state | 0.9h | <=3h | office-heartbeat (2h) | ORPHAN |
| `digest.json` | FleetHQ | digest | 0.6h | <=26h | unknown (404 measured 2026-10-11) | ORPHAN |
| `office/data.json` | Domain | book | 0.4h | <=1h | office-pulse (20min) | PLANE-INTERNAL |
| `agents/office-live.json` | Domain | book | 0.8h | <=3h | office-artery (2h) | PLANE-INTERNAL |
| `dex/office-feed.json` | Domain | book | 0.7h | <=26h | office-feed (daily) | PLANE-INTERNAL |
| `status.json` | Domain | book | 0.4h | <=30h | pages build | ORPHAN |
| `marketing/adsmarket.json` | Domain | book | 0.4h | <=168h | adsmarket-panel (weekly Mon 05:41 UTC + dispatch) | ORPHAN |

## רפאים (צרכן-חי על מפיק-מת) — flag
- none

## ישנים-מעבר-חוק (flag)
- none

## יתומים (מפיק-שאף-אחד-לא-קורא) — יעדי-זיקוק, flag
- `roshpinacare-sys/Autonomy:receipts/wallet/verdict.json` (artery-wallet (hourly))
- `roshpinacare-sys/Autonomy:receipts/fleet/verdict.json` (artery-fleet (2h))
- `roshpinacare-sys/Autonomy:receipts/grid/verdict.json` (artery-grid (30min))
- `roshpinacare-sys/FleetHQ:office/state/office-state.json` (office-heartbeat (2h))
- `roshpinacare-sys/FleetHQ:digest.json` (unknown (404 measured 2026-10-11))
- `roshpinacare-sys/Domain:status.json` (pages build)
- `roshpinacare-sys/Domain:marketing/adsmarket.json` (adsmarket-panel (weekly Mon 05:41 UTC + dispatch))

## פנים-מישורי (מסתובב-רק-בתוך-האיבר-שמייצר-אותו) — flag
- `roshpinacare-sys/Autonomy:receipts/latest.json` (sovereign.yml (~15min))
- `roshpinacare-sys/Autonomy:ops/lessons/ledger.md` (artery-scribe (daily))
- `roshpinacare-sys/FleetHQ:receipts/office-ci/verdict.json` (office-ci (push))
- `roshpinacare-sys/Domain:office/data.json` (office-pulse (20min))
- `roshpinacare-sys/Domain:agents/office-live.json` (office-artery (2h))
- `roshpinacare-sys/Domain:dex/office-feed.json` (office-feed (daily))

## סטיית-תוכן-מול-קומיט (קומיט-חד-של-תוכן-ישן) — flag
- none
