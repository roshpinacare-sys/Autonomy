#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════════════
// DIRECTIVE-BUS · צרכן-ההנחיות-מהשרשרת (agent-9 wave-4, 2026-10-17)
// ───────────────────────────────────────────────────────────────────────────
// הבעיה-שנמדדה: מנוע-הריבונות משדר saos-bus-v1 לשרשרת (cycle.receipt) ומדווח
// ok:false / health:null — אין-מארח-דלוק. הפרוטוקול כבר-מוגדר ב-
// steem/mini-services/saos-engine/bus.mjs (R243) כולל טיפוס DIRECTIVE
// ("operator-plane → agents, from headcorner only") — אבל אין-צרכן-תמידי.
// התיקון כאן: צרכן חסר-מפתחות לחלוטין — קורא רק, מריץ משימות-שמות מתוך
// engine/tasks/, ומפיק קבלות ל-receipts/chainbus/. השרשרת היא התור, הגיט
// הוא המצב (קבלה-קיימת = הונחיה-כבר-נצרכה — dedup ללא-cursor נדיף).
// אפס-תלות: node בלבד. רץ על כל מארח שיש בו node — Actions ציבורי הוא
// רק-המארח-הנוכחי (חינם, ללא-מכסה), לא-התלות.
//
// חוקי-הבית (מ-bus.mjs R243 + chain-anchor-probe R297/R298):
//  · הונחיה-תקפה רק מ-SAOS_BUS_ACCOUNT (ברירת-מחדל headcorner) — חתימת
//    posting-authority של השרשרת היא האימות; אנחנו לא-בוטחים באף-שדה אחר.
//  · משימות-שמות בלבד — body.task חייב להתקיים כ-engine/tasks/<task>.json
//    (fail-closed נגד traversal; אין-פקודות-inline מהשרשרת לעולם).
//  · גיוון-צמתים + חוק-הטריות: כל-הצמתים נסרקים, הטרי ביותר (max block)
//    מנצח; כל-הצמתים-נפלו = exit 2 כן-אדום, לא-קבלה-מזויפת.
//  · קבלות-בלבד — אף-סוד/מפתח/גוף-גדול-מ-512 לא-נכנס לקבלה.
// ═══════════════════════════════════════════════════════════════════════════
import { spawn } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = process.env.GITHUB_WORKSPACE || process.cwd();
const BUS_ID = "saos-bus-v1";
const ACCOUNT = process.env.SAOS_BUS_ACCOUNT ?? "headcorner";
const NODES = (process.env.SAOS_NODES ??
  "https://api.steemit.com,https://steemapi.boylikegirl.club,https://api.steem.fans")
  .split(",").map((s) => s.trim()).filter(Boolean);
const TO_ACCEPT = new Set(["*", "all", "agents", "fleet", "agent9", "agent-9"]);
const WINDOW = 1000; // history ops scanned, latest-first
const BODY_CAP = 512; // R243 law — bodies are bounded on-chain too
const RECEIPT_DIR = join(ROOT, "receipts", "chainbus");
const TASKS_DIR = join(ROOT, "engine", "tasks");

const nowIso = () => new Date().toISOString();

async function rpc(node, method, params) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), 15000);
  try {
    const r = await fetch(node, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", method, params, id: 1 }),
      signal: ac.signal,
    }).then((x) => x.json());
    return r;
  } catch (e) {
    return { error: { message: String(e?.message ?? e).slice(0, 80) } };
  } finally { clearTimeout(t); }
}

// R297/R298 laws: paginate 100-op pages (their proven pattern — ALL public
// nodes accept limit=100; several reject larger), freshest node wins.
async function fetchHistory() {
  let best = null;
  const tried = [];
  for (const n of NODES) {
    const entries = [];
    const seenIdx = new Set();
    let start = -1, pages = 0;
    const MAX_PAGES = Math.ceil(WINDOW / 100);
    while (pages < MAX_PAGES) {
      pages++;
      const r = await rpc(n, "condenser_api.get_account_history", [ACCOUNT, start, 100]);
      if (r?.error) { tried.push({ node: n, err: String(r.error?.message ?? "").slice(0, 60) }); entries.length = 0; break; }
      const ops = Array.isArray(r?.result) ? r.result : [];
      if (!ops.length) break;
      let low = null;
      for (const pair of ops) {
        try {
          const [idx, raw] = pair;
          low = low === null ? idx : Math.min(low, idx);
          if (seenIdx.has(idx)) continue;
          seenIdx.add(idx);
          const op = raw?.op;
          if (!Array.isArray(op) || op[0] !== "custom_json" || op[1]?.id !== BUS_ID) continue;
          let msg; try { msg = JSON.parse(String(op[1].json).slice(0, 4096)); } catch { continue; }
          if (!msg || msg.v !== 1 || typeof msg.type !== "string") continue;
          entries.push({ idx, block: raw.block ?? null, ts: raw.timestamp ?? null, msg });
        } catch { continue; }
      }
      if (low === null || low <= 0) break;
      start = low - 1; // next page = older ops (their R241 pattern, line 115)
    }
    const maxBlock = entries.reduce((m, e) => Math.max(m, e.block ?? 0), 0);
    tried.push({ node: n, pages, ops: seenIdx.size, bus: entries.length, maxBlock });
    if (!best || maxBlock > best.maxBlock) best = { node: n, entries, maxBlock };
  }
  return { best, tried };
}

// Named-task router — the ONLY path from chain to execution. Fail-closed.
function resolveTask(name) {
  if (typeof name !== "string" || !/^[a-z0-9._-]{1,48}$/.test(name)) return { err: "task-name-invalid" };
  const f = join(TASKS_DIR, `${name}.json`);
  if (!f.startsWith(resolve(TASKS_DIR) + "/")) return { err: "task-path-escape" };
  if (!existsSync(f)) return { err: "task-not-found" };
  try {
    const t = JSON.parse(readFileSync(f, "utf8"));
    const commands = Array.isArray(t.commands) ? t.commands.map(String).filter(Boolean) : [];
    if (!commands.length) return { err: "task-empty-commands" };
    return { task: { name, commands, timeoutSec: Math.min(Number(t.timeoutSec) || 240, 540), description: String(t.description ?? "") } };
  } catch (e) { return { err: "task-json-bad:" + String(e.message).slice(0, 40) }; }
}

function runExecutor(payload) {
  return new Promise((res) => {
    const pf = join("/tmp", `bus-payload-${payload.id}.json`);
    writeFileSync(pf, JSON.stringify(payload));
    const t0 = Date.now();
    const c = spawn("node", [join(ROOT, "engine", "exec-task.mjs"), pf], { cwd: ROOT, env: process.env });
    let out = "", err = "";
    const timer = setTimeout(() => { try { c.kill("SIGKILL"); } catch {} }, 600000);
    c.stdout.on("data", (d) => { if (out.length < 8192) out += d; });
    c.stderr.on("data", (d) => { if (err.length < 8192) err += d; });
    c.on("error", (e) => { clearTimeout(timer); res({ ok: false, ms: Date.now() - t0, err: String(e).slice(0, 200) }); });
    c.on("close", (code) => { clearTimeout(timer); res({ ok: code === 0, code, ms: Date.now() - t0, out: out.slice(-600), err: err.slice(-400) }); });
  });
}

function jwrite(f, obj) { mkdirSync(RECEIPT_DIR, { recursive: true }); writeFileSync(f, JSON.stringify(obj, null, 2) + "\n"); }

// ── main ───────────────────────────────────────────────────────────────────
import { pathToFileURL } from "node:url";

async function main() {
const startedAt = nowIso();
const { best, tried } = await fetchHistory();
if (!best) {
  console.error("directive-bus: all nodes failed", JSON.stringify(tried));
  process.exit(2);
}

const seen = {};
const directives = [];
for (const e of best.entries) {
  seen[e.msg.type] = (seen[e.msg.type] ?? 0) + 1;
  if (e.msg.type !== "directive") continue;
  if (e.msg.from !== ACCOUNT) continue; // operator-plane law: from headcorner only
  const to = String(e.msg.to ?? "*");
  if (!TO_ACCEPT.has(to)) continue;
  directives.push(e);
}

mkdirSync(RECEIPT_DIR, { recursive: true });
const consumed = [];
for (const e of directives) {
  const to = String(e.msg.to ?? "*"); // re-derive locally — filter-loop scope must not leak
  const ref = `d-${e.block}-${e.idx}`;
  const rf = join(RECEIPT_DIR, `${ref}.json`);
  if (existsSync(rf)) { consumed.push({ ref, already: true }); continue; } // git-native dedup

  const body = e.msg.body ?? {};
  const bodyJson = JSON.stringify(body);
  const taskName = body.task;
  const r = resolveTask(taskName);
  if (r.err) {
    jwrite(rf, { schema: "chainbus.directive.receipt/1", at: nowIso(), ok: false,
      ref: { block: e.block, idx: e.idx, seq: e.msg.seq ?? null, from: e.msg.from, to, runId: body.runId ?? null },
      body: bodyJson.slice(0, BODY_CAP), task: taskName ?? null, error: r.err,
      node: best.node, honest: "directive refused — no task executed" });
    consumed.push({ ref, ok: false, error: r.err });
    continue;
  }

  const execId = `bus-${ref}`.replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 64);
  const ex = await runExecutor({ id: execId, commands: r.task.commands, timeoutSec: r.task.timeoutSec });
  jwrite(rf, { schema: "chainbus.directive.receipt/1", at: nowIso(), ok: ex.ok,
    ref: { block: e.block, idx: e.idx, seq: e.msg.seq ?? null, from: e.msg.from, to, runId: body.runId ?? null },
    body: bodyJson.slice(0, BODY_CAP),
    task: { name: r.task.name, description: r.task.description, commands: r.task.commands.length, timeoutSec: r.task.timeoutSec },
    exec: { ok: ex.ok, code: ex.code ?? null, ms: ex.ms, receipt: `receipts/execution/${execId}.json`,
      outTail: (ex.out ?? "").slice(-300), errTail: (ex.err ?? "").slice(-300) },
    node: best.node });
  consumed.push({ ref, ok: ex.ok, task: r.task.name });
}

const scan = { schema: "chainbus.scan/1", at: nowIso(), startedAt, account: ACCOUNT, node: best.node,
  window: WINDOW, nodesTried: tried, busEntries: best.entries.length, seenTypes: seen,
  directivesFound: directives.length, consumed, ok: true };
jwrite(join(RECEIPT_DIR, "latest-scan.json"), scan);
console.log(JSON.stringify({ at: scan.at, node: best.node, busEntries: best.entries.length,
  seenTypes: seen, consumed: consumed.length, ok: true }, null, 2));
}

const parseDirectiveRef = (e) => `d-${e.block}-${e.idx}`;
export { resolveTask, runExecutor, fetchHistory, parseDirectiveRef };

// run as CLI only when invoked directly (imports are for verification of the real glue):
const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) await main();
