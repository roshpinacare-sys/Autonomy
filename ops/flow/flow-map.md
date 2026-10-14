# FLOW MAP · מפת-הזרימה המדודה של האורגניזם

נמדד: 2026-10-14T06:46:04.081Z
צומת=37 · קשת=103 · רפאים=0 · ישנים=11 · יתומים=0 · פנים-מישורי=21 · משולב-דף=15 · צפיפות-זרימה=2.78

| פיד | ריפו | סוג | גיל | חוק-טריות | מי-מייצר | אינטגרציה |
|---|---|---|---|---|---|---|
| `receipts/wallet/verdict.json` | Autonomy | receipt | 2.6h | <=2h | artery-wallet (hourly) | INTEGRATED |
| `receipts/fleet/verdict.json` | Autonomy | receipt | 1.6h | <=3h | artery-fleet (2h) | INTEGRATED |
| `receipts/grid/verdict.json` | Autonomy | receipt | 0.1h | <=1h | artery-grid (30min) | INTEGRATED |
| `receipts/latest.json` | Autonomy | pulse | 0.2h | <=1h | sovereign.yml (~15min) | INTEGRATED |
| `ops/lessons/ledger.md` | Autonomy | lesson | 0.0h | <=26h | artery-scribe (daily) | PLANE-INTERNAL |
| `ops/flow/flow-map.json` | Autonomy | flowmap | 3.6h | <=4h | artery-flow (3h) | SELF |
| `receipts/office-ci/verdict.json` | FleetHQ | receipt | 0.4h | <=30h | office-ci (push) | INTEGRATED |
| `office/state/office-state.json` | FleetHQ | state | 2.7h | <=3h | office-heartbeat (2h) | INTEGRATED |
| `digest.json` | FleetHQ | digest | 0.4h | <=26h | unknown (404 measured 2026-10-11) | INTEGRATED |
| `office/data.json` | Domain | book | 0.3h | <=1h | office-pulse (20min) | INTEGRATED |
| `agents/office-live.json` | Domain | book | 0.2h | <=3h | office-artery (2h) | INTEGRATED |
| `dex/office-feed.json` | Domain | book | 19.6h | <=26h | office-feed (daily) | INTEGRATED |
| `status.json` | Domain | book | 0.0h | <=30h | pages build | INTEGRATED |
| `marketing/adsmarket.json` | Domain | book | 41.2h | <=168h | adsmarket-panel (weekly Mon 05:41 UTC + dispatch) | INTEGRATED |
| `dex/agent.json` | Domain | book | 37.6h | <=48h | discovered | PLANE-INTERNAL |
| `dex/bridge.json` | Domain | book | 582.3h | <=48h | discovered | PLANE-INTERNAL |
| `dex/credits.json` | Domain | book | 1.3h | <=48h | discovered | PLANE-INTERNAL |
| `dex/deposits.json` | Domain | book | 4.6h | <=48h | discovered | INTEGRATED |
| `dex/fleet.json` | Domain | book | 582.3h | <=48h | discovered | PLANE-INTERNAL |
| `dex/giants.json` | Domain | book | 6.1h | <=48h | discovered | PLANE-INTERNAL |
| `dex/grid.json` | Domain | book | 1.3h | <=26h | discovered | INTEGRATED |
| `dex/honest-econ.json` | Domain | book | 6.1h | <=48h | discovered | PLANE-INTERNAL |
| `dex/mirror-stub.json` | Domain | book | 582.3h | <=48h | discovered | PLANE-INTERNAL |
| `dex/money.json` | Domain | book | 4.6h | <=48h | discovered | PLANE-INTERNAL |
| `dex/onramp.json` | Domain | book | 1.3h | <=48h | discovered | PLANE-INTERNAL |
| `dex/pegout-queue.json` | Domain | book | 62.5h | <=48h | discovered | PLANE-INTERNAL |
| `dex/pnl-desk.json` | Domain | book | 12.2h | <=48h | discovered | PLANE-INTERNAL |
| `dex/portfolio.json` | Domain | book | 1.3h | <=48h | discovered | PLANE-INTERNAL |
| `dex/redeem-requests.json` | Domain | book | 233.6h | <=48h | discovered | PLANE-INTERNAL |
| `dex/relay.json` | Domain | book | 1.3h | <=48h | discovered | PLANE-INTERNAL |
| `dex/showcase.json` | Domain | book | 1.3h | <=48h | discovered | PLANE-INTERNAL |
| `dex/state.json` | Domain | book | 1.3h | <=48h | discovered | PLANE-INTERNAL |
| `dex/watch.json` | Domain | book | 4.6h | <=26h | discovered | PLANE-INTERNAL |
| `dex/world.json` | Domain | book | 6.1h | <=26h | discovered | INTEGRATED |
| `dex/xc-intents.json` | Domain | book | 6.5h | <=48h | discovered | PLANE-INTERNAL |
| `dex/xc-ops.json` | Domain | book | 62.5h | <=48h | discovered | PLANE-INTERNAL |
| `dex/xc-requests.json` | Domain | book | 62.5h | <=48h | discovered | PLANE-INTERNAL |

## רפאים (צרכן-חי על מפיק-מת) — flag
- none

## ישנים-מעבר-חוק (flag)
- roshpinacare-sys/Domain/agents/office-pulse.cjs (agent) -> `roshpinacare-sys/Autonomy:receipts/wallet/verdict.json` age=2.6h
- roshpinacare-sys/Autonomy/engine/scribe.mjs (learner) -> `roshpinacare-sys/Domain:dex/bridge.json` age=582.3h
- roshpinacare-sys/Autonomy/engine/scribe.mjs (learner) -> `roshpinacare-sys/Domain:dex/fleet.json` age=582.3h
- roshpinacare-sys/Autonomy/engine/scribe.mjs (learner) -> `roshpinacare-sys/Domain:dex/redeem-requests.json` age=233.6h
- roshpinacare-sys/Autonomy/engine/scribe.mjs (learner) -> `roshpinacare-sys/Domain:dex/mirror-stub.json` age=582.3h
- roshpinacare-sys/Domain/.github/workflows/dex-xc-cron.yml (workflow) -> `roshpinacare-sys/Domain:dex/xc-ops.json` age=62.5h
- roshpinacare-sys/Domain/.github/workflows/dex-xc-cron.yml (workflow) -> `roshpinacare-sys/Domain:dex/xc-requests.json` age=62.5h
- roshpinacare-sys/Domain/.github/workflows/dex-xc-cron.yml (workflow) -> `roshpinacare-sys/Domain:dex/pegout-queue.json` age=62.5h
- roshpinacare-sys/Domain/agents/dex-core.cjs (agent) -> `roshpinacare-sys/Domain:dex/pegout-queue.json` age=62.5h
- roshpinacare-sys/Domain/agents/dex-xc.cjs (agent) -> `roshpinacare-sys/Domain:dex/pegout-queue.json` age=62.5h
- roshpinacare-sys/Domain/agents/pegout-hand.cjs (agent) -> `roshpinacare-sys/Domain:dex/pegout-queue.json` age=62.5h

## יתומים (מפיק-שאף-אחד-לא-קורא) — יעדי-זיקוק, flag
- none

## פנים-מישורי (מסתובב-רק-בתוך-האיבר-שמייצר-אותו) — flag
- `roshpinacare-sys/Autonomy:ops/lessons/ledger.md` (artery-scribe (daily))
- `roshpinacare-sys/Domain:dex/agent.json` (discovered)
- `roshpinacare-sys/Domain:dex/bridge.json` (discovered)
- `roshpinacare-sys/Domain:dex/credits.json` (discovered)
- `roshpinacare-sys/Domain:dex/fleet.json` (discovered)
- `roshpinacare-sys/Domain:dex/giants.json` (discovered)
- `roshpinacare-sys/Domain:dex/honest-econ.json` (discovered)
- `roshpinacare-sys/Domain:dex/mirror-stub.json` (discovered)
- `roshpinacare-sys/Domain:dex/money.json` (discovered)
- `roshpinacare-sys/Domain:dex/onramp.json` (discovered)
- `roshpinacare-sys/Domain:dex/pegout-queue.json` (discovered)
- `roshpinacare-sys/Domain:dex/pnl-desk.json` (discovered)
- `roshpinacare-sys/Domain:dex/portfolio.json` (discovered)
- `roshpinacare-sys/Domain:dex/redeem-requests.json` (discovered)
- `roshpinacare-sys/Domain:dex/relay.json` (discovered)
- `roshpinacare-sys/Domain:dex/showcase.json` (discovered)
- `roshpinacare-sys/Domain:dex/state.json` (discovered)
- `roshpinacare-sys/Domain:dex/watch.json` (discovered)
- `roshpinacare-sys/Domain:dex/xc-intents.json` (discovered)
- `roshpinacare-sys/Domain:dex/xc-ops.json` (discovered)
- `roshpinacare-sys/Domain:dex/xc-requests.json` (discovered)

## סטיית-תוכן-מול-קומיט (קומיט-חד-של-תוכן-ישן) — flag
- `roshpinacare-sys/Domain:dex/pegout-queue.json` commit=62.5h content=232.4h
- `roshpinacare-sys/Domain:dex/xc-ops.json` commit=62.5h content=232.3h
- `roshpinacare-sys/Domain:dex/xc-requests.json` commit=62.5h content=232.4h
