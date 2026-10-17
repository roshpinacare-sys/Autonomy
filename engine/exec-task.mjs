#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════════════
// EXEC-TASK · מנוע-ביצוע-אמת (agent-9 wave-2, 2026-10-17)
// ───────────────────────────────────────────────────────────────────────────
// הבעיה-שנמדדה: לארגניזם אפס שכבת-ביצוע — הכל נשאר קבצים בגיט. ריפואים
// פרטיים = Actions מתים ממכסה (quota-dead.md), פומביים = דקות חינם ללא מכסה.
// התיקון: ריפו-ציבורי זה מריץ פקודות-פיתוח אמת ב-VM אפמרלי ומחזיר קבלה
// חתומה-זמן ל-receipts/execution/. לא-סימולציה — spawn אמת, exit-codes אמת.
//
// טריגר: repository_dispatch[exec-task] או workflow_dispatch — שניהם דורשים
// actions:write על הריפו (PAT בעלים בלבד). ה-payload עובר בקבלה-פומבית —
// אף-סוד/מפתח לא עובר בו לעולם (מפתחות נשארים בכספות הבעלים).
// אפס-תלות: node:child_process בלבד. fail-closed על payload פגום.
// ═══════════════════════════════════════════════════════════════════════════
import { spawn } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const payloadPath = process.argv[2];
if (!payloadPath) { console.error("usage: exec-task.mjs <payload.json>"); process.exit(2); }

let p;
try { p = JSON.parse(readFileSync(payloadPath, "utf8")); }
catch (e) { console.error("bad payload json:", e.message); process.exit(2); }
if (typeof p.task_json === "string") {  // workflow_dispatch shape wraps the JSON as a string
  try { p = JSON.parse(p.task_json); }
  catch (e) { console.error("bad task_json string:", e.message); process.exit(2); }
}

const id = String(p.id || "").replace(/[^a-zA-Z0-9._-]/g, "").slice(0, 64);
const commands = Array.isArray(p.commands) ? p.commands.map(String).slice(0, 20) : [];
if (!id || commands.length === 0) { console.error("payload needs {id, commands[]}"); process.exit(2); }

const timeoutSec = Math.min(Math.max(parseInt(p.timeoutSec ?? "240", 10) || 240, 10), 540);
const OUT_CAP = 32 * 1024;

const runOne = (cmd, tSec) => new Promise((res) => {
  const t0 = Date.now();
  const child = spawn("bash", ["-lc", cmd], {
    cwd: process.env.GITHUB_WORKSPACE || process.cwd(),
    env: process.env,
  });
  let out = "", err = "", killed = false;
  const timer = setTimeout(() => { killed = true; try { child.kill("SIGKILL"); } catch {} }, tSec * 1000);
  child.stdout.on("data", (d) => { if (out.length < OUT_CAP) out += d; });
  child.stderr.on("data", (d) => { if (err.length < OUT_CAP) err += d; });
  child.on("error", (e) => {
    clearTimeout(timer);
    res({ cmd, exit: 127, killed, ms: Date.now() - t0, out: out.slice(0, OUT_CAP), err: (err + "\n" + String(e)).slice(0, OUT_CAP) });
  });
  child.on("close", (code) => {
    clearTimeout(timer);
    res({ cmd, exit: code, killed, ms: Date.now() - t0, out: out.slice(0, OUT_CAP), err: err.slice(0, OUT_CAP) });
  });
});

const results = [];
for (const [i, cmd] of commands.entries()) {
  const r = await runOne(cmd, timeoutSec);
  results.push({ i, ...r });
  console.log(`\n=== [${i}] exit=${r.exit} killed=${r.killed} ${r.ms}ms ===\n$ ${cmd}\n${r.out}${r.err ? "\n[stderr]\n" + r.err : ""}`);
}
const ok = results.every((r) => r.exit === 0);

const receipt = {
  schema: "exec.receipt/1",
  id, task: String(p.task || id),
  at: new Date().toISOString(),
  runner: "github-actions:ubuntu-latest",
  repo: process.env.GITHUB_REPOSITORY || "local",
  runId: process.env.GITHUB_RUN_ID || null,
  ok, commandCount: commands.length, results,
};
const dir = "receipts/execution";
mkdirSync(dir, { recursive: true });
writeFileSync(`${dir}/${id}.json`, JSON.stringify(receipt, null, 2) + "\n");
writeFileSync(`${dir}/latest.json`, JSON.stringify(
  { schema: "exec.latest/1", id, at: receipt.at, ok, task: receipt.task, runId: receipt.runId }, null, 2) + "\n");
console.log(`\nreceipt: ${dir}/${id}.json ok=${ok}`);
process.exit(ok ? 0 : 1);
