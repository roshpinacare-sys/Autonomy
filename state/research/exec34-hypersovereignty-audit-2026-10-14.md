# exec34 / lane 34-b — Hyper-Sovereignty menu: trading-OS security audit + pattern harvest (RESEARCH + REGISTRATION)

- Date: 2026-10-14T13:36:09Z · Lane: 34-b (hypersov-audit-lane) · Mode: READ-ONLY, zero code execution, zero installs, zero keys, depth-2 clones.
- Clone heads (evidence anchor): `E2B 62a17dfc` (2026-10-13) · `guardrails 06d0ff2c` (2026-08-26) · `QuantDinger ba8cd667` (2026-10-07) · `Vibe-Trading 54f43595` (2026-10-14). All cloned to `work/research/hypersov/<name>` — all file:line refs are at these heads.
- Standing doctrine honored: NO-ARMING-SELF-SUFFICIENCY (owner directive, Autonomy `ops/sovereign/DIRECTIVES/NO-ARMING-SELF-SUFFICIENCY.md` 15ecb0b), R330 (value moves owner-armed only), R333 (allowance-bounded custody = recorded shape, NOT activated).

## 1. Existence table — 4/4 REAL

| repo | head | last push | license (verified) | verdict |
|---|---|---|---|---|
| e2b-dev/E2B | 62a17dfc | 2026-10-13 | Apache-2.0 (LICENSE text verified) | REAL — pattern source only (SaaS rejected) |
| guardrails-ai/guardrails | 06d0ff2c | 2026-08-26 | Apache-2.0 (README badge + repo) | REAL — rail taxonomy source |
| OpenByteInc/QuantDinger | ba8cd667 | 2026-10-07 | Apache-2.0 (LICENSE text verified; TRADEMARKS/SECURITY present) | REAL — **CLASS-C RESEARCH-ONLY** |
| HKUDS/Vibe-Trading | 54f43595 | 2026-10-14 | MIT (LICENSE "Copyright (c) 2026 Vibe-Trading Contributors") | REAL — **CLASS-C RESEARCH-ONLY** |

Star counts quoted from the owner's menu (E2B ★14346 · guardrails ★7518 · QuantDinger ★12773 · Vibe-Trading ★35464); not re-verified this lane. Both trading licenses are genuine, not decorative.

## 2. Security audit — QuantDinger (EXTREME prejudice)

### 2.1 Where broker/exchange API keys live
- Exchange/broker credentials are encrypted-at-rest in PostgreSQL (`encrypted_config` blob) via Fernet: `backend_api_python/app/utils/credential_crypto.py:48-53`; master key = `CREDENTIAL_ENCRYPTION_KEY` else falls back to the JWT/session `SECRET_KEY` (`credential_crypto.py:39-45`), derived as `sha256(secret)→urlsafe_b64` with **no KDF stretching** (`:34-36`).
- The master key lives in the project-root `.env` (chmod 600, `install.sh:414`) — which is **mounted into every backend container** (`./.env:/app/.env` at docker-compose.yml:223, 247, 285, 393, 429, 463, 533, 566, 597) and is **admin-updatable from the web Settings page** (compose comment "Mount .env for runtime config and admin-panel updates", `docker-compose.yml:284-285`). One compromised admin session or one container = every broker key.
- **Admin password stored PLAINTEXT in .env**: `install.sh:405` (`env_set_quoted "$ENV_FILE" ADMIN_PASSWORD ...`); backend env default fallback `'123456'` at `app/config/settings.py:55` (installer refuses 123456 at `install.sh:357-360`, but non-installer deployments inherit the weak default).
- SECRET_KEY itself is fail-closed on insecure defaults (`settings.py:36-45` `_INSECURE_SECRET_KEYS`, ≥10 bytes; compose refuses boot on default key, `docker-compose.yml:17-18`). Good control.
- Postgres password fallback `quantdinger123` when unset in raw compose runs (`docker-compose.yml:55, 103, 249, 291`); installer generates `random_hex 18` (`install.sh:378`); DB loopback-bound (`:118`).

### 2.2 Install / first-run execution
- **curl|bash installer**: `install.sh:6-9` (`curl -fsSL .../install.sh | bash`); downloads compose + `.env.example` from `raw.githubusercontent.com` at runtime with a user-overridable ref `QUANTDINGER_INSTALL_REF` (`install.sh:35, 36, 299-304`) — the install path itself trusts a mutable remote ref.
- **Prebuilt-image supply chain**: GHCR images pulled with `latest` and `pull_policy: always` (`docker-compose.yml:625-626` frontend, `:653-654` mobile); zero-repo deploy path pulls backend+frontend+mobile from GHCR (`docker-compose.ghcr.yml:1-17`); default python base image is a **third-party mirror** `docker.1ms.run/library/python:3.12-slim-bookworm` (`docker-compose.yml:35`) unless overridden. No digest pinning, no cosign.
- First-run runs `python -m app.commands.sync_env` (env-sync container, `:87`), migrations, kafka-init, then backend+workers. No npm postinstall hooks in the deployment path.

### 2.3 Telemetry / phoning-home
- **None found.** greps for sentry/posthog/mixpanel/telemetry across backend + mcp_server → the only hit is internal wording (`app/routes/ai_chat.py:4425` "bounded context telemetry" = session-memory feature text).

### 2.4 Hardcoded credentials
- None found: `sk-…/AKIA…/PRIVATE KEY/mnemonic` greps = 0 in `backend_api_python/app` + `mcp_server/src`.

### 2.5 MCP gate — what the model can do
- Optional `mcp` compose profile, loopback bind default, two tokens (inbound `QUANTDINGER_MCP_AUTH_TOKEN` static verifier `server.py:141-151`; upstream `QUANTDINGER_AGENT_TOKEN`); error responses secret-redacted (`security.py:15-16`; `tool_contract.py:47-53`).
- Tool surface (server.py): `whoami`, markets/klines/price, strategies CRUD, jobs, indicators, **`place_quick_order` (server.py:385)**, `stop_strategy` (361), **`emergency_stop_trading` (452)** — i.e. live order placement is exposed to the model.
- **The "gate" is MCP ToolAnnotations hints ONLY**: `WRITE_TOOLS` map → `readOnlyHint=false`/`destructiveHint=true` (`tool_contract.py:11-31, 34-42`) — client-side advisory metadata, NOT enforcement. Writes carry an idempotency header (`server.py:193`) but there is **no pre-trade mandate/allowance/notional machinery at the MCP layer** (contrast Vibe-Trading §3.3). Backend-side, `app/services/quick_trade/` + `app/services/live_trading/` place real orders; `strategy_live_guard.py` is a strategy-level guard, not an order gate.
- **Withdrawal/transfer capability: NONE at the exchange layer.** All `withdraw` hits are (a) balance field names `withdraw_available` (`live_trading/htx_v5.py:57,72,103,113`; `quick_trade/balances.py:252-270`) or (b) internal referral-credit ledger withdrawals (`routes/billing.py:231-265`; `REFERRAL_MIN_WITHDRAWAL_USD` `routes/settings.py:2065-2069`). No exchange withdraw-endpoint client exists.
- **IBKR**: `app/services/ibkr_trading/{client,symbols}.py` via LOCAL TWS/IB Gateway socket only; policy flag `ALLOW_LOCAL_DESKTOP_BROKERS` (`app/utils/local_brokers.py:8-26`) is **fail-open (default true)** — `require_local_desktop_brokers_allowed()` raises only when an operator remembers to set it false on cloud (`docker-compose.yml:327-328` comment expects exactly that).
- **Israeli market**: grep TASE/ILS/israel across backend+docs = **0 hits**. No TASE connector exists; Israeli-market reach is IBKR-general through the user's own Gateway.

### 2.6 Verdict
**CLASS-C RESEARCH-ONLY.** Why this must never be connected to anything real in this fleet: a web-panel trading OS whose single `.env` holds the admin password in plaintext and the Fernet master key that unlocks every broker credential, mounted into six containers and editable from the admin UI, fronted by an MCP "gate" that is annotations-only (`place_quick_order` one token away), with a fail-open local-broker flag and mutable `latest` image pulls — one phished admin session or one poisoned image = real-money orders on Interactive Brokers, which the owner's no-arming directive forbids.

## 3. Security audit — Vibe-Trading (EXTREME prejudice)

### 3.1 Where broker/exchange API keys live
- Broker credentials are **not** in the repo or DB: connection profiles (`~/.vibe-trading/trading-connections.json`) hold config only; secrets go to the **OS keyring** (`src/trading/onboarding.py:38` `"secret_storage": "os_keyring"`, per-connector `pip install keyring` hints `:57-92`); source literal `CredentialSource = environment | runtime_file | keyring` (`src/trading/connectors/longbridge/credentials.py:17`).
- Onboarding hardens key scope: Binance hint "Create a read-only Spot API key; do not enable withdrawals" (`src/trading/onboarding.py:83`).
- LLM keys in `agent/.env` (schema-driven `src/config/env_schema.py`); default path is **local Ollama** (`docker-compose.yml` `OLLAMA_BASE_URL=http://host.docker.internal:11434`) — keys optional by design.

### 3.2 Install / first-run execution
- Docker compose build; **read_only rootfs, cap_drop ALL (+SETUID/SETGID for dropping to the unprivileged `vibe-sandbox` user for LLM-generated-code subprocesses), no-new-privileges, mem_limit 4g, cpus 2, pids_limit 512** (docker-compose.yml "VT-007" block); frontend image **digest-pinned** (`node:22@sha256:5647be70…`); all ports loopback-bound (8899/5899 on 127.0.0.1).
- Honest surface: the optional `frontend` profile runs `npm install && npm run dev` at container start (install-time code execution by design, profile-gated, mounts the checkout).

### 3.3 Telemetry / phoning-home
- None: grep hits for telemetry are internal event-taxonomy comments only (`src/openbb_bridge/event_mapper.py:27`, `src/swarm/store.py:536`). No analytics endpoints.

### 3.4 Hardcoded credentials
- None found (`sk-…/AKIA…/PRIVATE KEY/mnemonic` = 0 in `agent/src` + `api_server.py`).

### 3.5 MCP gate — a REAL mechanical pre-trade gate (not prompt-enforced)
- **Registry ladder: annotations → curated map → default-deny; UNKNOWN treated as WRITE**; every order-placing (WRITE or UNKNOWN) tool is re-wrapped in `LiveOrderGuardTool` (`src/live/registry.py:5-9, 50-51`); halt-tripped WRITE tools are **not even handed to the model** (`registry.py:231-239`).
- Gate sequence, all fail-closed before any broker call (`src/live/order_guard.py` module docstring + imports; direct-SDK mirror `src/live/sdk_order_gate.py:1-33` for tiger/alpaca/okx/binance/futu):
  1. `load_mandate` (schema-version checked) — no mandate → DENY;
  2. consent expiry → DENY/PAUSE_FOR_REAUTH;
  3. `halt_flag_set` kill switch → DENY with NO remote call (`src/live/halt.py`);
  4. account binding (mandate↔account stamping);
  5. `extract_order_intent` — unparseable → DENY;
  6. notional normalization via live quote — enforces the **LARGER** of explicit notional and `quantity×price`, fail-closed DENY when unpriceable;
  7. `check_mandate` → ALLOW / DENY (structural) / PAUSE_FOR_REAUTH (quantitative).
- Daily trade counter with UTC rollover + `daily_order_lock`, consumed **only** on confirmed ALLOW with a non-error broker result; every decision writes a redacted `live_action` audit event; `repeatable=False` — a live order is never silently re-issued (`order_guard.py` docstring; `src/live/daily_count.py`). Advisory layer `AdvisoryOrchestrator` (`src/live/advisory/__init__.py:175`), pending-action registry (`src/live/pending_action.py`), governance ledger/manifest (`src/governance/`). **This is code-enforced, not prompt-enforced.**
- MCP tool surface (`agent/mcp_server.py`): research/backtest/market-data heavy (~70 tools, lines 511-3225: list/load_skills, research-goal store, backtest, factor_analysis, alpha_zoo/bench, options, pattern_recognition, web_search/read_url, strategy store query/adapt/evidence, swarm run/status, journal + shadow tools). Trading MCP tools are READ-only — `trading_check` explicitly "never places orders" (`:1499-1530`); account/positions/orders/quote/history reads only. Order placement enters via connector paths that the guard wraps.
- Escalation surfaces (honest flags): `write_file` MCP tool accepts "relative to workspace or absolute" paths (`mcp_server.py:1192-1200`) — final confinement lives in the tool-registry impl (not traced to line level this lane; flag for any future deeper audit); shell tools exist behind **double opt-in** (env flag AND cli flag, `mcp_server.py:107-114`); eToro **copy-trading** ops exist (`etoro_copy_start/poll/precheck/close`, `src/tools/trading_connector_tool.py` imports).
- **Withdrawal/transfer capability: NONE.** Adapter scaffold explicitly forbids it: "…transfer, withdrawal, or credential logging code to this adapter" is banned (`src/trading/plugin_scaffold.py:22`); futu capital-management reads are review-only (`connectors/futu/sdk.py:619`). No withdraw endpoint clients anywhere.

### 3.6 Brokers incl. IBKR / Israeli market
- **19 connector families** (`src/trading/profiles.py:5-23` imports): IBKR, Robinhood, Tiger, Longbridge, Alpaca, OKX, Binance, Dhan, Futu, KIS, mstock, MT5, Scalable, Shoonya, eToro, Toss, Trading212, Upbit, Zerodha. **`DEFAULT_PROFILE_ID = "ibkr-paper-local"`** (`profiles.py:31`) — paper-first default.
- IBKR connector = local TWS/Gateway (`connectors/ibkr/{local,mcp,profiles}.py`; host/port/clientId overrides `trading_connector_tool.py:158-166`, IBKR duration/bar-size `:426-427`).
- **Israeli market**: grep TASE/Shekel/israeli across `agent/` + `wiki/` = **0 hits**. Same finding as QuantDinger: no TASE-specific integration in-repo; TASE reachability would ride IBKR's general market coverage through the user's own Gateway.

### 3.7 Verdict
**CLASS-C RESEARCH-ONLY.** Why this must never be connected to anything real in this fleet: it is the most connector-complete live-trading agent OS this fleet has audited — 19 brokers, IBKR through the user's own TWS/Gateway, real order placement behind (excellent) mandate gates — and precisely because the gates are good, wiring any live profile would make the FLEET the principal of real-money orders; the owner's standing directive allows no such principal. Its own default (`ibkr-paper-local`) is the only state it may ever occupy here.

## 4. Pattern harvest (lawful, code-reading only)

### 4.1 E2B isolation API shape → confirms 34-a's native kernel sandbox
- Shape (python-sdk @ 62a17dfc): `Sandbox(... timeout=<seconds>)` with hard caps — **24h Pro / 1h Hobby** (`packages/python-sdk/e2b/sandbox_sync/main.py:191`); lifecycle `on_timeout: {"action": "pause"|"kill", "mode": "full"|"filesystem"}` (`:199`); `is_running(request_timeout)` (`:132`); per-request timeout errors (`:152-164`); **`kill()`** (`:514`). Ephemeral-by-default: create → use → kill; persistence is opt-in pause, not state.
- What 34-a implements natively (confirmed equivalent): ephemeral workspace + hard timeout + kill-on-exit + output caps — the API contract matches our tmp-stateDir isolation.
- What E2B adds that we do NOT get locally: a **real VM boundary** (their cloud runs agent code inside microVM infrastructure — `packages/python-sdk/e2b/envd/` agent-in-sandbox architecture) vs our process/kernel-level confinement on a shared host.
- Why the SaaS is OUT for us — three independent grounds: (1) **third-party code egress** — our agent-generated code would execute on E2B's cloud, leaving the sovereign boundary; (2) **API key** — E2B requires an E2B API key (README "Get your API key" steps) = a new live credential surface outside git-as-memory, violating the keys-never-leave law; (3) **external dependency** — third-party outage/ToS/price becomes a sovereignty dependency (R338/R339 hygiene + non-blocking-ops would flag it). Verdict: **pattern adopted, service rejected.**

### 4.2 Guardrails rail taxonomy → cross-check vs planned 34-a module
- Taxonomy: **Input Guards / Output Guards** wrapped around the app (README "What is Guardrails": detect/quantify/mitigate risk + structured-data generation); per-validator **on_fail actions: REASK / FIX / FILTER / REFRAIN / NOOP / EXCEPTION / FIX_REASK / CUSTOM** (`guardrails/types/on_fail.py:24-31`); Guard composes validators each with explicit on_fail (`guard.py:57, 260-266, 820`) — i.e., **bounded repair with an explicit escalation ladder** whose terminal is fail-closed (EXCEPTION/REFRAIN), never silent NOOP by default.
- Adoption caveats: built-in OpenTelemetry tracing (`guardrails/telemetry/__init__.py` — `default_otlp_tracer`, `trace_guard_execution`, …) with a `disable_tracing` setting (`guardrails/settings.py:14-19`) — we adopt the taxonomy and pin tracing OFF; hosted remote inferencing is discontinued (2026-08-25 cutoff per README news) so validators are now local pip packages (no SaaS dependency — good).
- Cross-check vs 34-a: input screens ≈ Input Guards; output validators ≈ Output Guards; bounded repair ≈ REASK/FIX with REFRAIN/EXCEPTION as fail-closed terminals. Vocabulary + "on_fail is per-validator and explicit" discipline to carry into the 34-a module.

### 4.3 Trading-OS pipeline SHAPE → exact R330 mapping (zero broker connectivity)

| Trading OS stage | Evidence (QuantDinger / Vibe-Trading) | R330 lawful equivalent (ours) |
|---|---|---|
| strategy | QD `app/services/strategy*.py` (70+ services) / VT `strategy_store/` + `strategy_discovery/` + MCP strategy query/adapt | signed intents — `grids/policy.mjs` SAOS-INTENT/1 (DECISIONS #17) |
| backtest | QD `app/services/backtest/` + `backtest_limits.py` / VT `backtest/` + `shadow_account/backtester.py` + MCP `backtest` tool | **paper-economy backtests against OUR OWN saos-dex ledger** — `steem@saos-cockpit` `mini-services/saos-dex/state/grids.json` + `ledger.json` (verified present, with deposits/pools/opportunities/settlement-queue) |
| risk-cap | VT mandate notional/exposure caps + daily count + halt (`order_guard.py`) / QD spot buffers (`SPOT_OPEN_QUOTE_BUFFER` `docker-compose.yml:331`) + `strategy_live_guard.py` | R330 value-gate shape + #17 policy layers (maxNotionalPerOpSbd / rateMode / ownerGate) — already coded in `grids/policy.mjs` |
| execute | QD `exchange_execution.py` + `live_trading/*` + trading-worker / VT gated connector `place_order` | idempotency (R332 lifecycle) → approval (owner gate — R330 armed-only) → sign; executed ONLY against our own ledger/DEX (R328 economic inversion), NEVER a broker API |

The fleet's lawful pipeline = **strategy → paper-backtest (own ledger) → policy-cap → ledger-execute**, zero broker connectivity. Everything the trading OSes add beyond our engine is the unlawful stage (broker execution), which stays dead-code-at-best until the owner ever arms.

## 5. Doctrine note (registration text)

Connecting QuantDinger or Vibe-Trading to brokers — or running them on E2B's SaaS — contradicts the owner's own standing directives: NO-ARMING-SELF-SUFFICIENCY ("There is NO owner arming…"), R330 (value moves owner-armed only), R333 (allowance-bounded custody = recorded shape, never activated). Hyper-Sovereignty's economic self-sufficiency is achieved through the sovereignty's **OWN ledger** — saos-dex (R328 economic-inversion; DECISIONS #12 working sovereign DEX + #17 money-layer policy engine) — not through broker APIs. Both trading repos: read, learn, never run against anything real; if 34-a's sandbox executes them at all, it is sandboxed paper/static analysis only, paper-mode only, zero credentials in scope.

## 6. Honesty annex
- Depth-2 shallow clones; findings are at the pinned heads; greps are reasonable-effort, not exhaustive (e.g., VT `write_file` confinement not traced to its registry impl line; QD 897-line `.env.example` not fully enumerated).
- Star counts from the owner's menu, not re-verified. QuantDinger's last push 2026-10-07 (head ba8cd667 = "fix: update vulnerable python dependencies"; prior "fix: harden live strategy order recovery" — upstream actively patching trading-path security, positive signal).
- Registry state noted at audit time: Pulse DECISIONS row #30 already taken by T-92 (`fb37869`, R344 saos-desk sovereign trading boardroom) → this lane registers #31; law numbers R338-R342 (exec33) and R344 (T-92) taken; R343/R345+ next free.
- Zero code executed, zero installs, zero keys touched, zero value moved, zero broadcasts. Token used via shell var only, never echoed.
