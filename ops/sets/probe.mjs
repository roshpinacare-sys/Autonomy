// §㊾ sets-probe — מדידת-חיות-הסטים (NVIDIA/NIM) · אפס-מפתחות-בפלט
import { writeFileSync } from "node:fs";
const keys = { NVIDIA_API_KEY: process.env.NVIDIA_API_KEY || "", NVIDIA_NIM_KEY: process.env.NVIDIA_NIM_KEY || "", NIM_API_KEY: process.env.NIM_API_KEY || "" };
const bases = (process.env.NVIDIA_BASE_URL || "").split(/[\n,;]+/).map(s => s.trim()).filter(Boolean);
const models = (process.env.NVIDIA_MODELS || "").split(/[\n,;]+/).map(s => s.trim()).filter(Boolean);
console.log("מפתחות:", Object.entries(keys).map(([k, v]) => k + "=" + (v ? "[len-" + v.length + "]" : "חסר")).join(" · "));
console.log("base-urls:", bases.length ? bases.join(" · ") : "(default integrate.api.nvidia.com)");
console.log("מודלים:", models.join(" · ") || "(לא-הוגדרו)");
const tryBases = bases.length ? bases : ["https://integrate.api.nvidia.com"];
const alive = [];
for (const [kn, kv] of Object.entries(keys)) {
  if (!kv) continue;
  for (const base of tryBases.slice(0, 3)) {
    const t0 = Date.now();
    try {
      const r = await fetch(base.replace(/\/$/, "") + "/v1/models", { headers: { Authorization: "Bearer " + kv }, signal: AbortSignal.timeout(15000) });
      const ms = Date.now() - t0;
      let n = "?";
      try { const j = await r.json(); n = (j.data || []).length + "-מודלים"; if ((j.data || []).length) console.log("  דוגמאות:", j.data.slice(0, 5).map(m => m.id).join(" · ")); } catch {}
      console.log("  ★ " + kn + " @ " + base + " → HTTP-" + r.status + " · " + ms + "ms · " + n);
      if (r.status === 200) alive.push(kn);
    } catch (e) { console.log("  ✘ " + kn + " @ " + base + " → " + String(e.message).slice(0, 50) + " · " + (Date.now() - t0) + "ms"); }
  }
}
// מיני-השלמה-חיה-אם-יש-מפתח-חי
if (alive.length > 0 && models.length > 0) {
  const kv = keys[alive[0]]; const base = tryBases[0].replace(/\/$/, ""); const model = models[0];
  const t0 = Date.now();
  try {
    const r = await fetch(base + "/v1/chat/completions", { method: "POST", headers: { Authorization: "Bearer " + kv, "Content-Type": "application/json" }, body: JSON.stringify({ model, messages: [{ role: "user", content: "Say OK" }], max_tokens: 4 }), signal: AbortSignal.timeout(25000) });
    let preview = "";
    try { const j = await r.json(); preview = (j.choices?.[0]?.message?.content || "").slice(0, 20); } catch {}
    console.log("  ★★ השלמת-מיני-צ'אט: HTTP-" + r.status + " · " + (Date.now() - t0) + "ms · תצוגה=" + JSON.stringify(preview));
  } catch (e) { console.log("  ✘ השלמה: " + String(e.message).slice(0, 60)); }
}
console.log("סיכום:", alive.length ? "הסטים-חיים: " + [...new Set(alive)].join(" · ") : "אף-מפתח-לא-ענה-200");
writeFileSync("sets-probe-latest.json", JSON.stringify({ at: new Date().toISOString(), aliveKeys: [...new Set(alive)], bases: tryBases.slice(0, 3), models }, null, 1));
