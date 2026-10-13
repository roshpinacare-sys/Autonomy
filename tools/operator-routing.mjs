#!/usr/bin/env node
/**
 * operator-routing — הריבונות-היא-המפעיל: טענות-למפעיל מנותבות-לאוטונומיה (T-77)
 * ============================================================================
 * הבעלים: "הריבונות היא המפעיל אז טענות למפעיל צריכות להיות מנותבות
 * לאוטונומיה ולוודא שהיא מספיק אינטליגנטית כדי באמת לקבל החלטות חכמות."
 *
 * מקורות-טענות (שניהם-ציבוריים, keyless):
 *  1. Domain/agents/claims-book.jsonl  — ספר-הטענות שהמסילות כותבות
 *  2. ops-intake/ops/QUEUE.json        — פקודות-סדר-היום (kind=owner-decision)
 *
 * ניתוב-דטרמיניסטי למסילות-ה-artery (repository_dispatch, actions:write):
 *  dex/pool/swap/grid → gridwatch-tick · wallet/steem → wallet-verify-tick
 *  fleet/office/artery → fleet-verify-tick · flow/map → flowmap-tick
 *  default → decision-truth-tick (עורק-ההכרעה: MEASURE→OPTIONS→SCORE→DECIDE)
 *
 * idempotency: routed-state.json (ids) — אף-טענה-לא-נותבת-פעמיים.
 * fail-soft: כשל-תשתית = exit 0 (הרישיון-החסר-הוא-ההתראה; אף-זרם-מיילים).
 */
import fs from "fs";

const OWNER = "roshpinacare-sys";
const RAW = "https://raw.githubusercontent.com";
const OUT_DIR = "ops/sovereign/CLAIMS";
const STATE = `${OUT_DIR}/routed-state.json`;
const OUT = `${OUT_DIR}/routed.json`;
const HISTORY = `${OUT_DIR}/routed-history.jsonl`;

const TOKEN = process.env.GH_TOKEN || "";
async function fetchJson(url) {
  const res = await fetch(url, { headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {} });
  if (!res.ok) return null;
  return res.json();
}

function laneFor(claim) {
  const s = `${claim.subject || ""} ${claim.title || ""} ${claim.note || ""}`.toLowerCase();
  if (/dex|pool|swap|grid|market|order/.test(s)) return "gridwatch-tick";
  if (/wallet|steem|blurt|key/.test(s)) return "wallet-verify-tick";
  if (/fleet|office|artery|beat|starv/.test(s)) return "fleet-verify-tick";
  if (/flow|map/.test(s)) return "flowmap-tick";
  return "decision-truth-tick";
}

async function dispatch(lane, payload) {
  if (!TOKEN) return { fired: false, why: "no-token" };
  try {
    const res = await fetch(`https://api.github.com/repos/${OWNER}/Autonomy/dispatches`, {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}`, Accept: "application/vnd.github+json" },
      body: JSON.stringify({ event_type: lane, client_payload: payload }),
    });
    return { fired: res.status === 204, why: `http-${res.status}` };
  } catch (e) {
    return { fired: false, why: e.message };
  }
}

async function main() {
  const at = new Date().toISOString();
  fs.mkdirSync(OUT_DIR, { recursive: true });

  let state = { routedIds: [], at: null };
  try { state = JSON.parse(fs.readFileSync(STATE, "utf8")); } catch {}

  const claims = [];
  // source 1: claims-book (jsonl, skip protocol header)
  const cb = await fetch(`${RAW}/${OWNER}/Domain/main/agents/claims-book.jsonl`).then((r) => (r.ok ? r.text() : "")).catch(() => "");
  for (const line of cb.split("\n")) {
    const t = line.trim();
    if (!t || !t.startsWith("{")) continue;
    try { const c = JSON.parse(t); if (c.id && c.id !== "protocol") claims.push({ ...c, source: "claims-book" }); } catch {}
  }
  // source 2: intake QUEUE owner-decisions (claims that would dead-end at the operator)
  const q = await fetchJson(`${RAW}/${OWNER}/ops-intake/main/ops/QUEUE.json`);
  for (const o of q?.orders || []) {
    if (o.kind !== "owner-decision") continue;
    claims.push({
      id: `INTAKE-${(o.title || "").slice(0, 40).replace(/\W+/g, "-")}-${o.severity}`,
      at: q.generatedAt,
      from: "ops-intake",
      severity: o.severity,
      subject: o.title,
      note: (o.why || "").slice(0, 200),
      source: "ops-intake",
    });
  }

  const routed = [];
  const skipped = [];
  for (const c of claims) {
    if (state.routedIds.includes(c.id) || c.status === "routed") { skipped.push(c.id); continue; }
    const lane = laneFor(c);
    const d = await dispatch(lane, { claimId: c.id, severity: c.severity, source: c.source, at });
    routed.push({ id: c.id, lane, dispatch: d, severity: c.severity || "P2", at });
    state.routedIds.push(c.id);
    if (state.routedIds.length > 400) state.routedIds = state.routedIds.slice(-400);
  }

  const receipt = {
    protocol: "SAOS-OPERATOR-ROUTING/1",
    at,
    law: "טענה-למפעיל = טענה-לריבונות; ניתוב-דטרמיניסטי + קבלה; אף-טענה-לא-מתה-אצל-הבעלים",
    sources: { claimsBook: "Domain/agents/claims-book.jsonl", intake: "ops-intake/ops/QUEUE.json (owner-decision)" },
    seenClaims: claims.length,
    routedNow: routed,
    skippedAlreadyRouted: skipped.length,
    totalRoutedEver: state.routedIds.length,
  };
  fs.writeFileSync(OUT, JSON.stringify(receipt, null, 1));
  if (routed.length) {
    fs.appendFileSync(HISTORY, routed.map((r) => JSON.stringify(r)).join("\n") + "\n");
  }
  fs.writeFileSync(STATE, JSON.stringify(state, null, 1));
  console.log(`operator-routing: seen=${claims.length} routed=${routed.length} skip=${skipped.length}`);
}

main().catch((e) => {
  console.error(`operator-routing crashed: ${e.message}`);
  process.exit(0); // fail-soft — anti-flood law
});
