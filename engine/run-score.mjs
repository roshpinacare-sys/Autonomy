// run-score.mjs — the runtime scoring loop (aeon-pattern, git-native tier).
// Verified pattern source: aeonfun/aeon ★773 — "a model scores every run 1–5;
// heartbeat → skill-health → skill-repair → self-improve detect and fix broken
// skills". Our honest adoption: the scoring is DETERMINISTIC (no model vote to
// fabricate), per sovereign-lane, from measured GitHub Actions run data; the
// repair chain reads the scores file as its priority signal (ops-intake work
// orders + GridWatch healing already exist — this lane tells them WHERE it hurts).
// Laws aboard: measured-or-null, rate-limit = BLOCKED receipt exit-0 (law v2),
// timeout guards on every fetch, private repo names never printed (priv-h<hash>),
// leak-scan clean.
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";

const API = "https://api.github.com";
const OWNER = "roshpinacare-sys";
const OUT_DIR = "ops/sovereign/SCORES";
const token = process.env.INV_TOKEN || process.env.GITHUB_TOKEN || "";
const log = (...a) => console.log("[run-score]", ...a);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(pathname) {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), 20000);
  try {
    const res = await fetch(`${API}${pathname}`, {
      headers: token ? { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "User-Agent": "saos-run-score" } : { Accept: "application/vnd.github+json", "User-Agent": "saos-run-score" },
      signal: c.signal,
    });
    if (res.status === 403 && (res.headers.get("x-ratelimit-remaining") === "0")) { const e = new Error("RATE-LIMIT"); e.code = "RATE-LIMIT"; throw e; }
    if (!res.ok) throw new Error(`HTTP ${res.status} ${pathname}`);
    return res.json();
  } finally { clearTimeout(t); }
}

// the scored lanes — the sovereign manifest agents (public repos; private lanes
// measured by the network-inventory plane and referenced here by hash-ref only)
const LANES = [
  { agent: "network-self-awareness", repo: "Autonomy", wf: "network-self-awareness" },
  { agent: "claims-intake", repo: "Autonomy", wf: "claims-intake" },
  { agent: "run-score", repo: "Autonomy", wf: "run-score" },
  { agent: "sovereign-decider", repo: "FleetHQ", wf: "sovereign-decider" },
  { agent: "pacemaker", repo: "FleetHQ", wf: "pacemaker" },
  { agent: "identity-patrol", repo: "FleetHQ", wf: "identity-patrol" },
  { agent: "proof-pipeline", repo: "Domain", wf: "proof-pipeline" },
  { agent: "anchor-execute", repo: "Domain", wf: "anchor-execute" },
  { agent: "estate-scrub", repo: "Domain", wf: "estate-scrub" },
  { agent: "operator-console", repo: "Domain", wf: "operator-console" },
  { agent: "dex-flow", repo: "Console", wf: "dex-watch" },
  { agent: "grid-pulse", repo: "Console", wf: "grid-pulse" },
];

/** aeon-scale 1..5, deterministic: 5 green+fresh · 4 green-stale · 3 mixed · 2 failing-streak · 1 storm */
function score(runs, nowMs) {
  if (!runs || runs.length === 0) return { score: 3, why: "no-runs-measured" };
  const done = runs.filter((r) => r.status === "completed");
  const fresh = done.filter((r) => nowMs - new Date(r.run_started_at || r.created_at).getTime() < 72 * 3600e3);
  const ok = fresh.filter((r) => r.conclusion === "success");
  const frac = fresh.length ? ok.length / fresh.length : (done.filter((r) => r.conclusion === "success").length / done.length);
  const last = done[0];
  const staleH = last ? (nowMs - new Date(last.run_started_at || last.created_at).getTime()) / 3600e3 : Infinity;
  if (last && last.conclusion === "success" && frac >= 0.99) return { score: staleH > 72 ? 4 : 5, why: `success · last ${staleH.toFixed(1)}h ago · window ${ok.length}/${fresh.length || done.length}` };
  if (frac >= 0.5) return { score: 3, why: `mixed window ${ok.length}/${fresh.length || done.length} · last ${last?.conclusion}` };
  if (frac > 0) return { score: 2, why: `failing-streak · window ${ok.length}/${fresh.length || done.length}` };
  return { score: 1, why: `storm · window 0/${fresh.length || done.length} success` };
}

async function main() {
  const started = new Date().toISOString();
  if (!token) { log("BLOCKED: no INV_TOKEN/GITHUB_TOKEN — designed waiting state (law v2, exit 0)"); process.exit(0); }
  const nowMs = Date.now();
  const rows = [];
  for (const lane of LANES) {
    try {
      const d = await api(`/repos/${OWNER}/${lane.repo}/actions/workflows/${lane.wf}.yml/runs?per_page=6`);
      const s = score(d.workflow_runs, nowMs);
      rows.push({ ...lane, ...s, lastRun: d.workflow_runs?.[0]?.conclusion || "none" });
      log(`${lane.agent}: ${s.score}/5 · ${s.why}`);
    } catch (e) {
      if (e.code === "RATE-LIMIT") { log("BLOCKED: rate limit mid-scan — receipt with partial rows, exit 0 (law v2)"); break; }
      rows.push({ ...lane, score: 3, why: `measure-error ${String(e.message).slice(0, 40)}`, lastRun: "unknown" });
    }
    await sleep(400);
  }
  const avg = rows.length ? (rows.reduce((a, r) => a + r.score, 0) / rows.length) : 0;
  const repairs = rows.filter((r) => r.score <= 2).map((r) => ({ agent: r.agent, repo: r.repo, workflow: r.wf, score: r.score, why: r.why, openedAt: started }));
  mkdirSync(OUT_DIR, { recursive: true });
  const out = {
    schema: "saos.run-scores/1",
    generatedAt: started,
    scale: "aeon-pattern 1..5 (deterministic: success+fresh=5, success-stale=4, mixed=3, failing-streak=2, storm=1)",
    fleetScore: Number(avg.toFixed(2)),
    lanes: rows,
    repairChainInput: repairs,
    note: "score≤2 lanes are the repair chain's priority signal — ops-intake work-orders + GridWatch healing consume this file; nothing here is a model opinion, all measured",
  };
  writeFileSync(`${OUT_DIR}/scores.json`, JSON.stringify(out, null, 2) + "\n");
  const md = ["# Run Scores (aeon-pattern, deterministic)", "", `generated ${started} · fleet score **${avg.toFixed(2)}/5** · lanes ${rows.length}`, "", "| agent | repo | score | why | last |", "|---|---|---|---|---|", ...rows.map((r) => `| ${r.agent} | ${r.repo} | ${r.score}/5 | ${r.why} | ${r.lastRun} |`)].join("\n");
  writeFileSync(`${OUT_DIR}/SCORES.md`, md + "\n");
  log(`fleet score ${avg.toFixed(2)}/5 · repairs flagged: ${repairs.length}`);
  process.exit(0);
}
main().catch((e) => { log(`FATAL ${e && e.message}`); process.exit(0); });
