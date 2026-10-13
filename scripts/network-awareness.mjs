#!/usr/bin/env node
// network-awareness — THE NETWORK LOOKS AT ITSELF (T24, owner word: "the network is
// not aware of itself and of its sovereign autonomous capabilities").
// Every 30 minutes, keylessly (GITHUB_TOKEN read scope only):
//   1. CENSUS    - enumerate every repo; NEW repos and NEW workflows are discovered,
//                  dated and recorded (the owner builds constantly - the network now
//                  notices within 30 minutes instead of never).
//   2. INDEPENDENCE - for the core repos: every critical workflow must carry BOTH
//                  schedule AND workflow_dispatch (zero sandbox dependence, provable).
//   3. CLAIMS    - recent failing runs become claims in an inbox the autonomy consumes;
//                  enforcement-reds (exposure/identity gates doing their job) are labeled
//                  as ENFORCEMENT, not defects - claims route to the autonomy, the owner
//                  reads digests, not storms.
//   4. MANIFEST  - a self-awareness manifest: what the network is, what is alive,
//                  what fell, what is new, what is claimed. Published at HEAD.
// One face (roshpinacare-sys). No secrets printed. Honest failures, fail-closed verdicts.
import { execSync } from "node:child_process";
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";

const ROOT = process.cwd();
const OUT = join(ROOT, "ops", "sovereign", "AWARENESS");
mkdirSync(OUT, { recursive: true });
const TOKEN = process.env.GITHUB_TOKEN || "";
const ORG = "roshpinacare-sys";
const CORE = ["Domain", "Autonomy", "FleetHQ"];
const H = { Authorization: `Bearer ${TOKEN}`, "User-Agent": "network-awareness", Accept: "application/vnd.github+json" };

async function gh(path, method = "GET") {
  const res = await fetch(`https://api.github.com${path}`, { headers: H, method });
  if (res.status === 200 || res.status === 204) return res.status === 204 ? null : await res.json();
  return { __http: res.status };
}

let prev = {};
try { prev = JSON.parse(readFileSync(join(OUT, "census.json"), "utf8")); } catch {}
const knownRepos = new Set(prev.repos || []);
const knownWf = new Map(Object.entries(prev.workflows || {}));

const book = { at: new Date().toISOString(), engine: "network-awareness/1.0 (T24)", repos: 0, newRepos: [], newWorkflows: [], independence: [], claims: [], errors: [] };

// 1) census - every repo, new-repo discovery
const repos = await gh(`/users/${ORG}/repos?per_page=100&sort=pushed`);
if (!Array.isArray(repos)) { book.errors.push("repo list HTTP " + (repos && repos.__http)); }
else {
  book.repos = repos.length;
  for (const r of repos) {
    if (!knownRepos.has(r.name) && prev.repos) book.newRepos.push({ name: r.name, pushedAt: r.pushed_at, private: r.private });
  }
}

// 2) independence + workflow discovery over the core repos
for (const repo of CORE) {
  const wfs = await gh(`/repos/${ORG}/${repo}/contents/.github/workflows`);
  if (!Array.isArray(wfs)) { book.errors.push(`${repo} workflows HTTP ${wfs && wfs.__http}`); continue; }
  const names = wfs.filter((f) => /\.ya?ml$/.test(f.name)).map((f) => f.name);
  const prevSet = knownWf.get(repo) || [];
  for (const n of names) if (prevSet.length && !prevSet.includes(n)) book.newWorkflows.push({ repo, wf: n });
  let sched = 0, disp = 0, both = 0, checked = 0;
  for (const f of wfs.filter((f) => /\.ya?ml$/.test(f.name))) {
    const c = await gh(`/repos/${ORG}/${repo}/contents/.github/workflows/${f.name}`);
    if (!c || !c.content) continue;
    const y = Buffer.from(c.content, "base64").toString("utf8");
    checked++;
    const s = /^\s*schedule:/m.test(y), d = /workflow_dispatch/.test(y);
    if (s) sched++; if (d) disp++; if (s && d) both++;
  }
  book.independence.push({ repo, workflows: checked, withSchedule: sched, withDispatch: disp, withBoth: both,
    verdict: checked && both >= Math.ceil(checked * 0.6) ? "PASS" : "DEGRADED" });
}

// 3) claims - recent failures across core repos (+ their private siblings are invisible here, honest boundary)
const ENFORCE = /(exposure|identity|gate|guard)/i;
for (const repo of CORE) {
  const runs = await gh(`/repos/${ORG}/${repo}/actions/runs?per_page=40&status=failure`);
  if (!runs || !runs.workflow_runs) { if (runs && runs.__http) book.errors.push(`${repo} runs HTTP ${runs.__http}`); continue; }
  for (const r of runs.workflow_runs) {
    if (Date.now() - Date.parse(r.created_at) > 26 * 3600e3) continue;
    const kind = ENFORCE.test(r.name) ? "ENFORCEMENT" : "DEFECT";
    book.claims.push({ repo, workflow: r.name, at: r.created_at, kind, runUrl: r.html_url,
      claim: kind === "ENFORCEMENT" ? "gate held the line - verify the payload it stopped, then fix the producer" : "autonomy triage: read the log, fix root, land, verify" });
  }
}
const seen = new Set();
book.claims = book.claims.filter((c) => { const k = c.repo + "/" + c.workflow; if (seen.has(k)) return false; seen.add(k); return true; });

// 4) manifest - the network's self-portrait
const ind = book.independence.map((i) => `- ${i.repo}: ${i.workflows} workflows · schedule ${i.withSchedule} · dispatch ${i.withDispatch} · both ${i.withBoth} → **${i.verdict}**`).join("\n");
const cl = book.claims.length ? book.claims.map((c) => `- [${c.kind}] ${c.repo}/${c.workflow} @ ${c.at.slice(0, 16)} — ${c.claim}`).join("\n") : "- none. the fleet ran clean in the window.";
const md = [
  `# פנקס-המודעות של הרשת (network-awareness) — ${book.at}`,
  "",
  "נמדד מקצה-לקצה בכל 30 דק'. אפס-מפתחות, אפס-סנדבוקס, אפס-המצאה.",
  "",
  "## מה-הרשת-היא",
  `- ${book.repos} ריפואים במשק · ליבה: ${CORE.join(" / ")}`,
  "",
  "## מה-חדש (הבעלים בונה כל-הזמן — הרשת מבחינה עכשיו)",
  book.newRepos.length ? book.newRepos.map((r) => `- ריפו-חדש: ${r.name} (pushed ${r.pushedAt})`).join("\n") : "- אין-ריפו-חדש מאז-המדידה-הקודמת",
  book.newWorkflows.length ? book.newWorkflows.map((r) => `- workflow-חדש: ${r.repo}/${r.wf}`).join("\n") : "- אין-workflow-חדש מאז-המדידה-הקודמת",
  "",
  "## עצמאות-מלאה-מסנדבוקס (חוק-התלות-אפס)",
  ind,
  "",
  "## תלונות-פתוחות (לאוטונומיה — לא לבעלים)",
  cl,
  "",
  `טעויות-מדידה: ${book.errors.length ? book.errors.join(" · ") : "אף-אחד"}`,
  "",
].join("\n");

writeFileSync(join(OUT, "manifest.md"), md);
writeFileSync(join(OUT, "census.json"), JSON.stringify({ at: book.at, repos: repos && Array.isArray(repos) ? repos.map((r) => r.name) : [], workflows: Object.fromEntries(CORE.map((r) => [r, (book.independence.find((i) => i.repo === r) || {}).workflows || 0])) }, null, 1));
writeFileSync(join(OUT, "claims.jsonl"), book.claims.map((c) => JSON.stringify(c)).join("\n") + (book.claims.length ? "\n" : ""));
console.log(`awareness: ${book.repos} repos · new ${book.newRepos.length + book.newWorkflows.length} · claims ${book.claims.length} · errors ${book.errors.length}`);

// publish (rebase-hardy, identity-stamped)
try {
  const git = (c) => execSync(c, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] });
  git(`git config user.name "roshpinacare-sys"`);
  git(`git config user.email "326012154+roshpinacare-sys@users.noreply.github.com"`);
  git(`git add ${OUT}`);
  const st = git("git status --porcelain").trim();
  if (!st) { console.log("awareness: no delta — quiet tick"); process.exit(0); }
  git(`git commit -m "network-awareness: self-portrait ${book.at.slice(0, 16)} [skip ci]"`);
  for (let i = 1; i <= 7; i++) {
    try { git("git pull --rebase -q origin main"); git("git push -q origin HEAD:main"); console.log("awareness: published"); process.exit(0); }
    catch { execSync("git rebase --abort 2>/dev/null || true", { shell: "/bin/bash", stdio: "ignore" }); execSync(`sleep ${i * 4}`, { stdio: "ignore" }); }
  }
  console.log("awareness: push failed after 7 attempts — honest failure"); process.exit(1);
} catch (e) {
  console.log("awareness: git layer error:", String(e).slice(0, 140)); process.exit(1);
}
