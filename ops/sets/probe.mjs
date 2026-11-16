// §㊾ sets-probe v3 — סריקת-נתיבים (404-על-/v1/models-נמדד → השרת-חי-הנתיב-שגוי)
import { writeFileSync } from "node:fs";
const keys = { NVIDIA_API_KEY: process.env.NVIDIA_API_KEY || "", NVIDIA_NIM_KEY: process.env.NVIDIA_NIM_KEY || "", NIM_API_KEY: process.env.NIM_API_KEY || "" };
const bases = (process.env.NVIDIA_BASE_URL || "").split(/[\n,;]+/).map(s => s.trim()).filter(Boolean);
const models = (process.env.NVIDIA_MODELS || "").split(/[\n,;]+/).map(s => s.trim()).filter(Boolean);
console.log("מפתחות:", Object.entries(keys).map(([k, v]) => k + "=" + (v ? "[len-" + v.length + "]" : "חסר")).join(" · "));
console.log("base-urls-ספירה:", bases.length, "· סיומות-מאובחנות:", bases.map(b => { try { return new URL(b).host.replace(/[a-z0-9]/g, "x"); } catch { return "?"; } }).join(" · "));
console.log("מודלים:", models.join(" · "));
const tryBases = bases.length ? bases : ["https://integrate.api.nvidia.com"];
const paths = ["/v1/models", "/models", "/openai/v1/models", "/v1/chat/completions", "/", "/health", "/v1"];
const firstKey = Object.entries(keys).find(([, v]) => v)?.[0] ?? "";
const kv = keys[firstKey] || "";
const found = [];
for (const base of tryBases.slice(0, 2)) {
  const b = base.replace(/\/$/, "");
  for (const p of paths) {
    const t0 = Date.now();
    try {
      const isPost = p.endsWith("completions");
      const r = await fetch(b + p, isPost ? { method: "POST", headers: { Authorization: "Bearer " + kv, "Content-Type": "application/json" }, body: JSON.stringify({ model: models[0] || "x", messages: [{ role: "user", content: "OK?" }], max_tokens: 4 }), signal: AbortSignal.timeout(20000) } : { headers: { Authorization: "Bearer " + kv }, signal: AbortSignal.timeout(15000) });
      const ms = Date.now() - t0;
      const ct = r.headers.get("content-type") || "";
      let n = "";
      if (ct.includes("json")) { try { const j = await r.json(); const arr = j.data || j.models || []; n = arr.length ? arr.length + "-מודלים" : (j.object || j.detail || "").toString().slice(0, 40); if (arr.length) console.log("  רשימה:", arr.slice(0, 6).map(m => m.id || m.name).join(" · ")); if (isPost && j.choices) n = "השלמה=" + JSON.stringify((j.choices[0]?.message?.content || "").slice(0, 30)); } catch { n = "?"; } }
      console.log("  " + (r.status === 200 ? "★" : "·") + " " + p + " → HTTP-" + r.status + " · " + ms + "ms · " + ct.split(";")[0] + " · " + n);
      if (r.status === 200) found.push(p);
    } catch (e) { console.log("  ✘ " + p + " → " + String(e.message).slice(0, 40)); }
  }
}
// אם-נמצא-נתיב-מודלים — נסה-השלמה-חיה-עם-כל-מפתח
const modelsPath = found.find(p => p.includes("models")) || "";
let alive = [];
if (modelsPath) {
  for (const [kn, k2] of Object.entries(keys)) {
    if (!k2) continue;
    const base = tryBases[0].replace(/\/$/, "");
    try { const r = await fetch(base + modelsPath, { headers: { Authorization: "Bearer " + k2 }, signal: AbortSignal.timeout(15000) }); if (r.status === 200) alive.push(kn + "@" + modelsPath); } catch {}
  }
}
console.log("סיכום:", found.length ? "נתיבים-חיים: " + found.join(" · ") + (alive.length ? " · מפתחות-חיים: " + alive.join(" · ") : "") : "אף-נתיב-לא-ענה-200 — base-שגוי-או-מחייב-פורמט-אחר");
writeFileSync("sets-probe-latest.json", JSON.stringify({ at: new Date().toISOString(), alivePaths: found, aliveKeys: alive, bases: tryBases.slice(0, 2).map(b => { try { return new URL(b).host; } catch { return b; } }), models }, null, 1));
