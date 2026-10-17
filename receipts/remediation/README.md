# receipts/remediation/ — external-remediation receipt channel (agent-9 · task 4-d)

**What:** the org's first machine-readable remediation ledger, written in the house
receipt convention (same style as `receipts/fleet/verdict.json`, `receipts/grid/verdict.json`,
`receipts/claims/verdict.json`). Written by the owner-authorized external remediation
agents; readable by anyone via `raw.githubusercontent.com/roshpinacare-sys/Autonomy/main/receipts/remediation/...`.

**Schema** `remediation.receipt/1` — see `agent9-latest.json` (canonical) and one
`<task-id>-<slug>.json` per task. Key fields: `schema`, `at`, `agent`, `items[]`
(`status`, `assignedTo`, `evidence[]`), `pendingOwnerDecisions[]`, `constraintsAccepted[]`,
`overall`, `reason`, `provenance`.

**Honest verdict vocabulary:** `verified` (only after actual measurement) ·
`in_progress` (assigned to a live agent) · `pending-owner-decision` (owner-words lane,
never faked as done) · `blocked` · `failed`.

## Why this directory (measured 2026-10-17 by agent-9/4-d — read the code, not the docs)

- **fleet-heal is NOT an inbound receipt consumer.** `heal/fleet-heal.mjs` reads only its
  own `heal/state.json` plus the GitHub Actions API; it writes `heal/latest.json`,
  `heal/state.json`, `heal/ledger.jsonl`, `heal/receipts/scan-*.json`, and re-triggers
  healers via `repository_dispatch` (`revive-fleet-heal`).
- **grid-watchdog is NOT an inbound receipt consumer.** `engine/grid-watch.mjs` reads
  `steem@saos-cockpit:mini-services/saos-engine/state/hyper-grid.json` via the contents
  API and writes `receipts/grid/verdict.json` + `receipts/grid/log.jsonl`.
- **The actual receipt readers (verified):** `engine/flow-map.mjs` (NODES manifest with a
  declared `maxAgeH` freshness law over `receipts/fleet|grid|wallet/verdict.json` +
  `receipts/latest.json`, fetched via raw.githubusercontent), `fleet/agents-manifest.json`
  (public endpoint map incl. `ops/sovereign/CLAIMS/queue.json`), the `agents/gate` UI
  (reads `receipts/latest.json`), and the decider/value-scan raw readers.
- Therefore **no automated consumer reads this directory yet** — that is stated honestly
  rather than invented. Until adopted, the value of this channel is the ledger itself; a
  pointer receipt is placed at `receipts/fleet/remediation-agent9.json` (inside the
  directory whose `verdict.json` is the org's most-consumed receipt), additive only.

## Adoption (owner/sovereignty decision — one additive line, nothing replaced)

Append to the `NODES` manifest in `engine/flow-map.mjs`:

```js
{ repo: `${OWNER}/Autonomy`, path: "receipts/remediation/agent9-latest.json", kind: "receipt", maxAgeH: 24, feeds: "external remediation waves (agent9)" },
```

**Rules for writers of this channel:** additive files only (never modify or delete
existing files), honest verdicts only, zero secrets (paths/status only), follow
`AGENT9-PROTOCOL.md` at the repo root.
