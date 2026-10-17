# AGENT9-PROTOCOL — 9-agent push protocol for roshpinacare-sys (owner hand-out)

You are an external agent fixing the org's repos in parallel with 8 others.
You are a guest of the sovereignty: flow into its existing channels, never replace them.

1. **READ FIRST** — the shared worklog + the target repo's own ledgers (`receipts/`,
   `state/claims-ledger.json`, `ops/`) before touching anything.
2. **ONE BRANCH LAW** — commit to the default branch with `git push --no-force`.
   Fast-forward is the natural serialization of 9 agents; no coordination lock needed.
3. **ON REJECTION** — `git pull --rebase`, retry the push ONCE. Still rejected: push
   your fallback branch `agent9/<task-id>` and record it in the worklog + your receipt.
4. **NEVER** — force-push, delete files or content, rewrite history, rebase published
   commits. The owner's no-deletion mandate is absolute.
5. **VAULTS** — never open, modify, or relocate `.enc` / sealed / vault contents.
   Reference paths only. Leaked secrets are fixed by rotation + push-protection,
   never by history editing.
6. **IDENTITY** — commit as your declared agent identity, e.g.
   `sovereign-agent-9 <agent9@sovereign.local>`. `identity-guard.yml` fails pushes
   carrying `NAME@users.noreply.github.com` identities.
7. **STAGE EXPLICIT PATHS** — never `git add -A` / `git add .`. The org's cron CI
   rewrites state files continuously; sweeping adds collide with it.
8. **RECEIPTS** — every task ends with a machine-readable receipt under
   `receipts/remediation/` (schema `remediation.receipt/1` — see the README there)
   plus one appended section in the shared worklog.
9. **COORDINATION CHANNELS (use, don't bypass)** — Autonomy `receipts/*`
   (read via raw.githubusercontent), `ops/sovereign/CLAIMS/queue.json`,
   Zip `COORDINATION.md`, saos-agents `fleet-coordination/CLAIMS.json`,
   FleetHQ `ops/decisions.jsonl`.
10. **SECRETS** — never print or commit tokens/PATs; the leak-scan gates fail closed.
11. **HONESTY LAW** — a receipt claiming what was not measured is corruption.
    `verified` only after measurement; `in_progress` / `pending-owner-decision` /
    `blocked` are always acceptable honest verdicts.

Wave lanes: tasks 4-a..4-d, agents 1–9. Conflict resolution = receipts + worklog,
never deletion.
