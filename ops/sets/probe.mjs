// §㊾ sets-probe v5 — /chat/completions-נמדד-קיים (410=מודל-מיושן) → מודלים-מהרשימה-החיה
import { writeFileSync } from "node:fs";
const keys = { NVIDIA_API_KEY: process.env.NVIDIA_API_KEY || "", NVIDIA_NIM_KEY: process.env.NVIDIA_NIM_KEY || "", NIM_API_KEY: process.env.NIM_API_KEY || "" };
const bases = (process.env.NVIDIA_BASE_URL || "").split(/[\n,;]+/).map(s => s.trim()).filter(Boolean);
const kv = keys.NVIDIA_API_KEY || Object.values(keys).find(Boolean) || "";
const base = (bases[0] || "").replace(/\/$/, "");
const candidates = ["nvidia/nemotron-3.5-lightning-30b-a3b", "nvidia/nemotron-3-ultra-550b-a55b", "deepseek-ai/deepseek-v4.1-flash", "openai/gpt-oss-20b", "z-ai/glm-5.3-flash", "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning", "meta/muse-glimmer-30b", "minimaxai/minimax-m3.1-flash"];
let alive = "";
for (const model of candidates) {
  const t0 = Date.now();
  try {
    const r = await fetch(base + "/chat/completions", { method: "POST", headers: { Authorization: "Bearer " + kv, "Content-Type": "application/json" }, body: JSON.stringify({ model, messages: [{ role: "user", content: "Reply with exactly: SETS-ALIVE" }], max_tokens: 12 }), signal: AbortSignal.timeout(40000) });
    const ms = Date.now() - t0;
    let n = "";
    try { const j = await r.json(); if (j.choices) { n = "עונה=" + JSON.stringify((j.choices[0]?.message?.content || "").slice(0, 50)); if (j.usage) n += " · tokens=" + (j.usage.total_tokens ?? "?"); } else if (j.detail) n = String(j.detail).slice(0, 70); else n = JSON.stringify(j).slice(0, 90); } catch { n = "(לא-JSON)"; }
    console.log((r.status === 200 ? "★" : "·") + " " + model + " → HTTP-" + r.status + " · " + ms + "ms · " + n);
    if (r.status === 200 && n.includes("עונה")) { alive = model; break; }
  } catch (e) { console.log("✘ " + model + " → " + String(e.message).slice(0, 50)); }
}
console.log("סיכום:", alive ? "★★ הסטים-חיים-ומשלימים: " + alive : "עדיין-אין-השלמה-חיה — נדרש-אבחון-פורמט-נוסף");
writeFileSync("sets-probe-latest.json", JSON.stringify({ at: new Date().toISOString(), chatPath: "/chat/completions", aliveModel: alive, base: new URL(base).host }, null, 1));
