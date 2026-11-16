// §㊾ sets-probe v4 — נתיב-ההשלמה: /models-נמדד-200-בלי-קידומת → נסה-בלי-/v1 + רשימת-33-מלאה
import { writeFileSync } from "node:fs";
const keys = { NVIDIA_API_KEY: process.env.NVIDIA_API_KEY || "", NVIDIA_NIM_KEY: process.env.NVIDIA_NIM_KEY || "", NIM_API_KEY: process.env.NIM_API_KEY || "" };
const bases = (process.env.NVIDIA_BASE_URL || "").split(/[\n,;]+/).map(s => s.trim()).filter(Boolean);
const models = (process.env.NVIDIA_MODELS || "").split(/[\n,;]+/).map(s => s.trim()).filter(Boolean);
const kv = keys.NVIDIA_API_KEY || Object.values(keys).find(Boolean) || "";
const base = (bases[0] || "https://integrate.api.nvidia.com").replace(/\/$/, "");
// רשימה-מלאה
try { const r = await fetch(base + "/models", { headers: { Authorization: "Bearer " + kv }, signal: AbortSignal.timeout(15000) }); const j = await r.json(); const arr = j.data || j.models || []; console.log("הרשימה-המלאה (" + arr.length + "):"); for (const m of arr) console.log("  · " + (m.id || m.name)); } catch (e) { console.log("רשימה-נכשלה: " + String(e.message).slice(0, 50)); }
// נתיבי-השלמה-מועמדים
const chatPaths = ["/chat/completions", "/v1/chat/completions", "/completions", "/infer", "/generate", "/api/chat/completions", "/v1/infer"];
const model = models[0] || "deepseek-ai/deepseek-v4.1-flash";
console.log("מודל-הבדיקה:", model);
let chatOk = "";
for (const p of chatPaths) {
  const t0 = Date.now();
  try {
    const r = await fetch(base + p, { method: "POST", headers: { Authorization: "Bearer " + kv, "Content-Type": "application/json" }, body: JSON.stringify({ model, messages: [{ role: "user", content: "Reply with exactly: SETS-ALIVE" }], max_tokens: 12 }), signal: AbortSignal.timeout(30000) });
    const ms = Date.now() - t0;
    let n = "";
    try { const j = await r.json(); if (j.choices) n = "עונה=" + JSON.stringify((j.choices[0]?.message?.content || "").slice(0, 40)); else if (j.error) n = "err=" + String(j.error.message || j.error).slice(0, 60); else n = JSON.stringify(j).slice(0, 80); } catch { n = "(לא-JSON)"; }
    console.log((r.status === 200 ? "★ " : "· ") + p + " → HTTP-" + r.status + " · " + ms + "ms · " + n);
    if (r.status === 200 && n.includes("עונה")) chatOk = p;
  } catch (e) { console.log("✘ " + p + " → " + String(e.message).slice(0, 45)); }
}
console.log("סיכום:", chatOk ? "נתיב-ההשלמה-החי: " + chatOk + " — הסטים-מוכנים-לעבודה" : "נתיב-ההשלמה-עדיין-לא-נמצא (אולי-דורש-פורמט-שונה)");
writeFileSync("sets-probe-latest.json", JSON.stringify({ at: new Date().toISOString(), modelsPath: "/models", chatPath: chatOk, base: new URL(base).host, models }, null, 1));
