# FLEET-KEYS-VM-RUNTIME.md — מפתחות-הצייד בזמן-ריצה [P1 · owner-approved t12]
# Fleet Keys → VM Runtime Design (closes the "0/14 posting-live" gap from t10)

## The measured problem (t10/t11)
Organs that must act as fleet identities (posting, treasury moves) had their
keys either in a sandbox vault (dies with the sandbox) or nowhere (0/14
posting-live). The organism could not act as the fleet even when ordered to.

## The design (one legal path, zero exceptions)

```
┌──────────────┐   puts secret once    ┌───────────────────────────────┐
│   OWNER      │ ────────────────────▶ │ GitHub repo secrets (Autonomy)│
└──────────────┘                       └──────────────┬────────────────┘
                                                      │ GitHub injects env
                                                      ▼
                                       ┌───────────────────────────────┐
                                       │ workflow run (VM, ephemeral)  │
                                       │  loadKey('NAME') — MEMORY ONLY│
                                       │  engine/runtime/keys.mjs      │
                                       └──────────────┬────────────────┘
                                                      │ act, then die
                                                      ▼
                                       receipts (names + outcomes only,
                                       never values)
```

### Laws (enforced by `engine/runtime/keys.mjs`)
1. **Keys exist ONLY as repo secrets.** Never in files, never in git, never in
   the sandbox, never in logs. `loadKey()` is the single accessor.
2. **Declared names only** — `REQUIRED_SECRETS` is the registry section; an
   organ requesting an undeclared name is refused (fail-closed).
3. **Memory-only** — the loaded value lives in RAM for one run and dies with
   the runner. No persistence path exists in this module by design.
4. **Census = names only** — `censusSecrets()` lists secret NAMES via the
   GitHub API (GitHub never returns values) and publishes presence/absence to
   `receipts/keys/latest.json`. Absence is a loud PENDING, never silence.

### Secret names (add via repo Settings → Secrets and variables → Actions)
| Secret | Purpose | State |
|---|---|---|
| `FLEET_PAT` | org PAT for fleet organs | **present** (verified live, t11) |
| `NVIDIA_NIM_KEY` | LLM brain fuel | **present** (auth-valid; NIM catalog dead 410/404 — auto-detects revival) |
| `STEEM_TREASURY_ACTIVE_WIF` | P2 treasury top-up executor (acct-00 ≥3000 SP) | **awaiting owner** — census reports PENDING |
| `FLEET_POSTING_<acct>` (future) | per-account posting keys → posting organs | schema ready; census picks it up automatically when added |

### What changes the moment a key lands
The census (run by self-heal each cycle + `node engine/runtime/keys.mjs`) flips
that entry `present:true` in the receipt; the owning organ (e.g.
`engine/treasury-topup.mjs`) sees a declared, present key at runtime and
executes for real — with a receipt. Until then it publishes an honest PENDING
with the exact prepared operation. No fake-green is possible: every path is
measured and loud.

*Added by agent-9, t12, by owner approval ("כן מאשר בצע").*
