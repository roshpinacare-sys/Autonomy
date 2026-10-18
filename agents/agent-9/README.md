# agent-9 — sandbox-deletion insurance

Owner order (2026-10-18): "ודא דחיפה והכל שלא יעלם לנו עם הסנדבוקס שימחק"
— verify everything is pushed so nothing is lost if the sandbox is deleted.

Everything an agent-9 session needs to reconstruct itself after sandbox loss:

| file | purpose |
|---|---|
| `worklog.md` | full coordination memory — tasks 7→14, laws learned, all measurements |
| `sandbox-tools/*.mjs` | operational CLI tools (org search, workflow enable/wait/log/dispatch, owner commits, treasury/log forensics) |

**Security:** every tool reads its token at RUNTIME from `/home/z/.git-creds`
(regex on the creds file) — zero embedded secrets (verified by scan before commit).
This directory must never receive raw credential material.

**Recovery law:** a fresh sandbox clone of this repo restores
(a) the worklog — what was done and why, (b) the tools — how to operate
the org from scratch. The organs themselves (builder, pacer, growth-watch,
scout, treasury, self-heal) live in `engine/` + `.github/workflows/` and run
on GitHub's VMs — they survive sandbox deletion by design.
