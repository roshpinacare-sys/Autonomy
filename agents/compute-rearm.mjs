#!/usr/bin/env node
// compute-rearm.mjs — טבעת-ההתאוששות-מקיר-החיוב (T-REARM · compute-policy.md)
// ─────────────────────────────────────────────────────────────────────────────
// חוק-הריצה: מדידה-אמיתית בלבד · יציאה-0 תמיד (מסילת-מדידה-לעולם-לא-אדומה) ·
// כל-שינוי-מדינה מתועד ב-agents/compute-journal.jsonl (append בלבד).
// ─────────────────────────────────────────────────────────────────────────────
import fs from "node:fs";
import path from "node:path";

const H = (tok) => ({ Authorization: `Bearer ${tok}`, Accept: "application/vnd.github+json" });
const TOK = process.env.REARM_TOKEN;
const ORG = "roshpinacare-sys";
const AG = path.join(process.cwd(), "agents");
const LEDGER_PATH = path.join(AG, "compute-park-ledger.json");
const JOURNAL = path.join(AG, "compute-journal.jsonl");

if (!TOK) { console.log("compute-rearm: REARM_TOKEN absent — honest no-op"); process.exit(0); }

const ledger = JSON.parse(fs.readFileSync(LEDGER_PATH, "utf8"));
const journal = (event, details) => {
  const line = JSON.stringify({ ts: new Date().toISOString(), event, ...details });
  fs.appendFileSync(JOURNAL, line + "\n");
  console.log("journal:", event, JSON.stringify(details).slice(0, 220));
};
const api = async (p, method = "GET", body) => {
  const r = await fetch(`https://api.github.com${p}`, { method, headers: H(TOK), body: body ? JSON.stringify(body) : undefined });
  return { status: r.status, json: r.headers.get("content-type")?.includes("json") ? await r.json().catch(() => null) : null };
};
const setActions = (repo, enabled) => api(`/repos/${ORG}/${repo}/actions/permissions`, "PUT", { enabled });

async function canaryOnce() {
  // T-REARM-hardening (measured 2026-10-13T22:56Z, journal still-walled http:422):
  // dispatching seconds AFTER enabling the sentinel's Actions races the enable
  // propagation — GitHub answers 422 (workflow not triggerable yet) and the ring
  // mis-recorded a probe that never fired. Law: retry, never infer the wall from
  // a propagation artifact. 3 attempts, 20s apart (measured: enable→triggerable ≲ 60s).
  let d = { status: 0 };
  for (let attempt = 1; attempt <= 3; attempt++) {
    d = await api(`/repos/${ORG}/${ledger.sentinel}/actions/workflows/${ledger.canaryWorkflow}/dispatches`, "POST", { ref: "main" });
    if (d.status === 204) break;
    journal("dispatch-retry", { attempt, http: d.status, repo: ledger.sentinel });
    await new Promise((r) => setTimeout(r, 20_000));
  }
  if (d.status !== 204) return { dispatched: false, http: d.status };
  const t0 = Date.now();
  while (Date.now() - t0 < 200_000) {
    await new Promise((r) => setTimeout(r, 15_000));
    const runs = await api(`/repos/${ORG}/${ledger.sentinel}/actions/workflows/${ledger.canaryWorkflow}/runs?per_page=1`);
    const run = runs.json?.workflow_runs?.[0];
    if (run && Date.parse(run.created_at) > t0 - 5_000) {
      if (run.conclusion) return { dispatched: true, conclusion: run.conclusion, runId: run.id };
    }
  }
  return { dispatched: true, conclusion: "timeout" };
}

const nowH = () => Date.now();
const canaryDue = () => !ledger.lastCanaryAttempt || (nowH() - Date.parse(ledger.lastCanaryAttempt)) / 3_600_000 >= ledger.cooldownHours;

if (!ledger.armed) {
  if (!canaryDue()) {
    console.log(`compute-rearm: canary in cooldown (last attempt ${ledger.lastCanaryAttempt}) — parked, silent`);
  } else {
    ledger.lastCanaryAttempt = new Date().toISOString();
    const per = await api(`/repos/${ORG}/${ledger.sentinel}/actions/permissions`);
    if (per.json?.enabled === false) {
      const en = await setActions(ledger.sentinel, true);
      journal("sentinel-enabled-for-probe", { repo: ledger.sentinel, http: en.status });
    }
    const c = await canaryOnce();
    if (c.conclusion === "success") {
      const results = [];
      for (const repo of ledger.repos) {
        const en = await setActions(repo, true);
        results.push(`${repo}:${en.status}`);
      }
      ledger.armed = true;
      ledger.armedAt = ledger.lastCanaryAttempt;
      journal("RE-ARMED", { canary: c, results });
      console.log("compute-rearm: THE WALL IS OPEN — all parked repos re-armed (staged revival complete)");
    } else {
      // T-REARM-hardening: the park itself must be verified, not assumed — the
      // probe re-enabled the sentinel, so a failed re-park leaves the #1 email
      // source (identity-guard on push) armed against a closed wall.
      const results = [];
      for (const repo of ledger.repos) {
        const en = await setActions(repo, false);
        results.push(`${repo}:${en.status}`);
      }
      const sentinelAfter = await api(`/repos/${ORG}/${ledger.sentinel}/actions/permissions`);
      journal("still-walled", { canary: c, rePark: results, sentinelEnabledAfter: sentinelAfter.json?.enabled ?? null });
      if (sentinelAfter.json?.enabled !== false) {
        journal("park-verification-failed", { repo: ledger.sentinel, http: sentinelAfter.status });
        console.log("compute-rearm: WARNING — sentinel not verifiably re-parked (see journal park-verification-failed)");
      }
      console.log("compute-rearm: billing wall still closed — parked again + verified, cooldown timer armed");
    }
  }
} else {
  // armed → verify the wall is really open: canary is the meter (cheap, one runner-minute)
  if (canaryDue()) {
    ledger.lastCanaryAttempt = new Date().toISOString();
    const c = await canaryOnce();
    if (c.dispatched && c.conclusion && c.conclusion !== "success") {
      const results = [];
      for (const repo of ledger.repos) {
        const en = await setActions(repo, false);
        results.push(`${repo}:${en.status}`);
      }
      ledger.armed = false;
      journal("RE-PARKED", { canary: c, results });
      console.log("compute-rearm: the wall closed again — re-parked all private repos, honest silence");
    } else {
      journal("armed-healthy", { canary: c });
      console.log("compute-rearm: armed and healthy — canary green");
    }
  } else {
    console.log("compute-rearm: armed, canary in cooldown");
  }
}

fs.writeFileSync(LEDGER_PATH, JSON.stringify(ledger, null, 2) + "\n");
process.exit(0);
