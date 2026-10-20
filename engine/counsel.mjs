#!/usr/bin/env node
/**
 * counsel.mjs — איבר-הייעוץ [t44 · NIM_API_KEY זרוע-t43 · חוק-הרווחיות L1③]
 * ═══════════════════════════════════════════════════════════════════════════
 * השכבת-ההחלטות-הריבונית-הראשונה: קורא את הקבלות-המדודות של הרשת (השתתפות-צי,
 * אוצר, אוטובוס-פיקוד), מרכיב תדריך-עובדות-תחום (refs-בלבד — אף-שם-אחוזה לא
 * יוצא-מהמכונה), שואל מודל-NIM חיצוני לשלוש-פעולות-העל-המוערכות-ביותר, ומפרסם
 * קבלה-ציבורית (receipts/counsel/) — הייעוץ עצמו חסום-בגודל, ללא-סודות,
 * scrubbed-בגבולות-מילה. זהו "ראש-שני" להכרעות — לא-מקור-אמת: מקור-האמת הוא
 * המדידה; המודל מדבר רק-על מה-שנמדד.
 *
 * חוקים:
 *  · fail-honest — אין-מפתח/רשת/מודל = {ok:false, reason} יציאה 0 (PENDING, לא-המצאה)
 *  · אפס-תלות — node stdlib בלבד
 *  · קלט-קבלות כבר-refs-only (חוק-ה-scrub של refs.mjs בזמן-כתיבה אצל-המקורות);
 *    חגורה-ורתמות: scrubAll נוסף על-הקבלה-הסופית
 *  · גבולות: פלט-מודל ≤ 1500 תווים בקבלה; אפס-סודות; אפס-גופים-גדולים
 *
 * שימוש:
 *   node engine/counsel.mjs --selftest   (אפס-רשת, חייב ירוק)
 *   node engine/counsel.mjs              (חי: קבלות → NIM → קבלה)
 *   env: NIM_API_KEY · NIM_MODEL (ברירת-מחדל deepseek-v4.1-flash)
 * ═══════════════════════════════════════════════════════════════════════════
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { scrubAll } from "./refs.mjs";

const ROOT = process.env.GITHUB_WORKSPACE || join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "receipts", "counsel");
const RECEIPTS = [
  "receipts/fleet-participation/latest.json",
  "receipts/treasury/latest.json",
  "receipts/chainbus/latest-scan.json",
];
const COUNSEL_CAP = 1500;
const FACTS_CAP = 4200;
const nowIso = () => new Date().toISOString();

/** collect measured facts from the fleet's own receipts (all refs-only upstream) */
export function collectFacts(root = ROOT) {
  const facts = { schema: "counsel.facts/1", at: nowIso(), sources: [], accounts: [], treasury: null, chainbus: null };
  for (const rel of RECEIPTS) {
    const p = join(root, rel);
    if (!existsSync(p)) continue;
    facts.sources.push(rel);
    try {
      const j = JSON.parse(readFileSync(p, "utf8"));
      if (rel.includes("fleet-participation")) {
        for (const a of (j.accounts ?? []).slice(0, 15)) {
          facts.accounts.push({
            ref: a.account,
            sp: a.steem?.sp ?? null,
            sbd: a.steem?.sbd ?? null,
            openOrders: a.steem?.openOrders ?? null,
            market: a.rails?.market ?? null,
          });
        }
      } else if (rel.includes("treasury")) {
        facts.treasury = { treasurySp: j.treasurySp ?? null, healthy: j.healthy ?? null, floor: j.floor ?? null, reason: j.reason ?? null };
      } else if (rel.includes("chainbus")) {
        facts.chainbus = { directivesFound: j.directivesFound ?? null, nodesScanned: (j.nodes ?? []).length ?? null, scannedAt: j.scannedAt ?? j.at ?? null };
      }
    } catch { /* fail-soft per source */ }
  }
  return facts;
}

/** compose the bounded briefing (deterministic; refs-only) */
export function composeBriefing(facts) {
  const head =
    "אתה יועץ-כלכלי של רשת-סוכנים ריבונית. קיבלת תדריך-עובדות מדוד (מזהי-refs בלבד). " +
    "ענה בעברית, עד 900 תווים, במבנה: [מדוד] שורת-מצב אחת · [פעולה-1] הפעולה-המוערכת-ביותר-בעלות-הנמוכה · [פעולה-2] · [פעולה-3] · [סיכון] הסיכון-המרכזי. " +
    "היה קונקרטי ומספרי; אל תמציא נתונים שאינם בתדריך; אל תציע פעולות-מפתח/כספת (מוגבלות-מפעיל).\nתדריך:\n";
  const body = JSON.stringify(facts);
  return head + (body.length > FACTS_CAP ? body.slice(0, FACTS_CAP) + "…[חתוך]" : body);
}

async function nimCall(briefing) {
  const key = process.env.NIM_API_KEY ?? "";
  if (!key) return { ok: false, reason: "nim-key-absent" };
  const model = process.env.NIM_MODEL ?? "deepseek-v4.1-flash";
  const body = {
    model,
    messages: [{ role: "user", content: briefing }],
    max_tokens: 700,
    temperature: 0.2,
  };
  const t0 = Date.now();
  try {
    const res = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(45000),
    });
    const latencyMs = Date.now() - t0;
    if (res.status === 410) return { ok: false, reason: `model-eol:${model}`, latencyMs };
    if (res.status === 404) {
      // NIM entitlement law (measured t44): catalog may list a model while the
      // key's account lacks the function grant — "Not found for account".
      let detail = "";
      try { detail = (await res.json())?.detail ?? ""; } catch { /* body unreadable */ }
      return { ok: false, reason: detail.includes("Not found for account") ? `nim-function-not-entitled:${model}` : `nim-model-unknown:${model}`, latencyMs };
    }
    if (res.status === 401 || res.status === 403) return { ok: false, reason: `nim-auth-${res.status}`, latencyMs };
    if (!res.ok) return { ok: false, reason: `nim-http-${res.status}`, latencyMs };
    const j = await res.json();
    const text = j.choices?.[0]?.message?.content ?? "";
    if (!text) return { ok: false, reason: "nim-empty-content", latencyMs };
    return { ok: true, model, text, latencyMs, done_reason: j.choices?.[0]?.finish_reason ?? null };
  } catch (e) {
    return { ok: false, reason: `nim-unreachable:${String(e?.message ?? e).slice(0, 60)}`, latencyMs: Date.now() - t0 };
  }
}

function publish(receipt) {
  mkdirSync(OUT_DIR, { recursive: true });
  // scrub boundary: belt-and-suspenders over the whole receipt before it touches the public tree
  const scrubbed = JSON.parse(scrubAll(JSON.stringify(receipt)));
  writeFileSync(join(OUT_DIR, "latest.json"), JSON.stringify(scrubbed, null, 2) + "\n");
}

async function live() {
  const facts = collectFacts();
  const briefing = composeBriefing(facts);
  const receipt = { schema: "counsel/1", at: nowIso(), ok: false, task: "counsel" };
  receipt.factsSources = facts.sources;
  receipt.accountsMeasured = facts.accounts.length;
  const r = await nimCall(briefing);
  receipt.latencyMs = r.latencyMs ?? null;
  if (!r.ok) {
    receipt.reason = r.reason;
    publish(receipt);
    console.log(`counsel: PENDING (${r.reason})`);
    return 0;
  }
  receipt.ok = true;
  receipt.model = r.model;
  receipt.counsel = r.text.length > COUNSEL_CAP ? r.text.slice(0, COUNSEL_CAP) + "…[חתוך]" : r.text;
  publish(receipt);
  console.log(`counsel: ok model=${r.model} latency=${r.latencyMs}ms chars=${receipt.counsel.length}`);
  return 0;
}

/** selftest: zero-net — fixtures only, bounded, deterministic */
export function selftest() {
  const facts = collectFacts(join(ROOT, "engine", "tasks", "scripts", "fixtures"));
  const f = facts.sources.length ? facts : { schema: "counsel.facts/1", at: "fixture", sources: ["fixture"], accounts: [{ ref: "acct-00", sp: 4031, sbd: 58.5, openOrders: 2, market: "no-active-key" }], treasury: { treasurySp: 2855, healthy: false, floor: 3000 }, chainbus: { directivesFound: 0, nodesScanned: 3 } };
  const b = composeBriefing(f);
  if (!b.includes("acct-00")) throw new Error("selftest: briefing missing facts");
  if (b.length > FACTS_CAP + 400) throw new Error("selftest: briefing unbounded");
  if (COUNSEL_CAP <= 0) throw new Error("selftest: counsel cap must be positive");
  console.log(`counsel: selftest green (briefing ${b.length} chars, cap ${COUNSEL_CAP})`);
  return 0;
}

const isSelftest = process.argv.includes("--selftest");
if (isSelftest) process.exit(selftest());
process.exit(await live());
