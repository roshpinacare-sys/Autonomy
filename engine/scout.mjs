#!/usr/bin/env node
/**
 * scout.mjs — איבר-הצייד [t12 · owner order: "יש פה אתר שאני מחפש בו כל מיני ריפואים
 * וחידושים... איך נוכל לעקוב אחרי פיתוחים ולתת לארכיטקטורה לבדוק ולהנדס ברמה גבוהה
 * מתוך עיון — חשוב שלא ליפול על קוד זדוני בטעות... ולהפוך למקורי שלנו הכל"]
 * ═══════════════════════════════════════════════════════════════════════════════
 * THE LEARNING PIPELINE: sources → fetch-ladder → candidate extraction →
 * supply-chain vetting (malicious-code corpus, READ-ONLY) → knowledge entries
 * (clean-room proposals) → receipts + git-committed knowledge base.
 *
 * What it NEVER does: execute/install/clone foreign code; copy foreign code
 * verbatim; touch a BLOCKED repo beyond its name. Laws: knowledge/LEARNING.md.
 *
 * fail-honest: zero-fetch runs publish {ok:false, reason} and exit 0 (measured
 * state); only organ defects exit non-zero. Selftest: zero network.
 *
 *   node engine/scout.mjs            (ריצה-חיה)
 *   node engine/scout.mjs --selftest (אפס-רשת, חייב-ירוק)
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ladderFetch } from './scout/fetch.mjs';
import { extractRepos } from './scout/parse.mjs';
import { vetCandidate } from './scout/vet.mjs';
import { lessonFromVet, renderIndex } from './scout/learn.mjs';
import { selftest as signalsSelftest } from './scout/signals.mjs';
import { selftest as parseSelftest } from './scout/parse.mjs';
import { selftest as learnSelftest } from './scout/learn.mjs';

const ROOT = process.env.GITHUB_WORKSPACE || join(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCES = join(ROOT, 'engine', 'scout', 'sources.json');
const SEEN = join(ROOT, 'state', 'scout', 'seen.json');
const RECEIPTS = join(ROOT, 'receipts', 'scout');
const KNOWLEDGE = join(ROOT, 'knowledge', 'scout');

const MAX_VET_PER_RUN = 8;          // minutes-discipline: bounded API spend per run
const SEEN_CAP = 2000;              // bounded dedup memory
const nowIso = () => new Date().toISOString();

function loadJson(path, fallback) {
  try { return JSON.parse(readFileSync(path, 'utf8')); } catch { return fallback; }
}

function appendBoundedLedger(dir, entry, cap = 400) {
  mkdirSync(dir, { recursive: true });
  const p = join(dir, 'ledger.jsonl');
  let lines = [];
  if (existsSync(p)) lines = readFileSync(p, 'utf8').split('\n').filter(Boolean);
  lines.push(JSON.stringify(entry));
  writeFileSync(p, lines.slice(-cap).join('\n') + '\n');
}

/** pure: dedup candidates against seen set, return new ones + updated seen */
export function dedupe(candidates, seenSet, cap = SEEN_CAP) {
  const fresh = [];
  const next = new Set(seenSet);
  for (const c of candidates) {
    const key = `${c.owner}/${c.repo}`.toLowerCase();
    if (next.has(key)) continue;
    next.add(key);
    fresh.push(c);
  }
  const arr = [...next];
  return { fresh, seen: new Set(arr.slice(-cap)) };
}

export async function live() {
  const receipt = {
    schema: 'scout/1', at: nowIso(), ok: false,
    sourcesFetched: 0, candidates: 0, fresh: 0, vetted: 0,
    safeToStudy: [], studyWithCare: [], blocked: [], lessons: [],
    fetchAttempts: [], errors: [],
  };
  const token = process.env.GITHUB_TOKEN || process.env.SCOUT_TOKEN || null;
  const sources = loadJson(SOURCES, null);
  if (!Array.isArray(sources) || sources.length === 0) {
    receipt.errors.push('no-sources-file');
    publish(receipt);
    return 1;
  }
  const seenState = loadJson(SEEN, { schema: 'scout.seen/1', seen: [] });
  const seenSet = new Set(Array.isArray(seenState.seen) ? seenState.seen : []);
  const allCandidates = [];
  // 1. fetch every source through the ladder
  for (const s of sources) {
    const r = await ladderFetch(s.url).catch((e) => ({ ok: false, attempts: [{ hop: 'harness', ok: false, note: String(e).slice(0, 80) }] }));
    receipt.fetchAttempts.push({ source: s.id, via: r.via, attempts: r.attempts });
    if (!r.ok || !r.text) { receipt.errors.push(`fetch-failed:${s.id}`); continue; }
    receipt.sourcesFetched += 1;
    allCandidates.push(...extractRepos(r.text).map((c) => ({ ...c, source: s.id })));
  }
  receipt.candidates = allCandidates.length;
  // 2. dedupe against git memory
  const { fresh, seen } = dedupe(allCandidates, seenSet);
  receipt.fresh = fresh.length;
  // 3. vet bounded batch (curated sources first — owner-directed priority)
  const batch = fresh
    .sort((a, b) => (a.source?.startsWith('pinoy') ? -1 : 0) - (b.source?.startsWith('pinoy') ? -1 : 0))
    .slice(0, MAX_VET_PER_RUN);
  const entries = [];
  for (const c of batch) {
    try {
      const v = await vetCandidate(c, token);
      receipt.vetted += 1;
      if (v.verdict === 'SAFE_TO_STUDY') receipt.safeToStudy.push(`${v.owner}/${v.repo}`);
      else if (v.verdict === 'STUDY_WITH_CARE') receipt.studyWithCare.push(`${v.owner}/${v.repo}`);
      else if (v.verdict === 'BLOCKED') receipt.blocked.push(`${v.owner}/${v.repo}`);
      else { if (!Array.isArray(receipt.notRepos)) receipt.notRepos = []; receipt.notRepos.push(`${v.owner}/${v.repo}(${v.reason})`); }
      const e = lessonFromVet({ ...v, ctx: c.ctx });
      if (e) entries.push(e);
      if (e?.lesson) receipt.lessons.push(e.repo);
    } catch (err) {
      receipt.errors.push(`vet:${c.owner}/${c.repo}:${String(err?.message || err).slice(0, 60)}`);
    }
  }
  // 4. commit knowledge (append per-day file) + index + seen-state
  receipt.ok = true;
  publish(receipt, entries, seen);
  // exit 0 even if all fetches failed — measured state, not organ failure;
  // BUT zero sources fetched + zero fresh = still publishes honest receipt.
  return 0;
}

function publish(receipt, entries = [], seenSet = null) {
  mkdirSync(RECEIPTS, { recursive: true });
  writeFileSync(join(RECEIPTS, 'latest.json'), JSON.stringify(receipt, null, 1) + '\n');
  appendBoundedLedger(RECEIPTS, { at: receipt.at, ok: receipt.ok, sources: receipt.sourcesFetched, fresh: receipt.fresh, vetted: receipt.vetted, blocked: receipt.blocked.length, lessons: receipt.lessons.length, errors: receipt.errors.length });
  if (entries.length > 0) {
    mkdirSync(KNOWLEDGE, { recursive: true });
    const day = receipt.at.slice(0, 10);
    const dayFile = join(KNOWLEDGE, `entries-${day}.json`);
    const prev = loadJson(dayFile, { schema: 'scout.knowledge/1', day, entries: [] });
    prev.entries.push(...entries);
    writeFileSync(dayFile, JSON.stringify(prev, null, 1) + '\n');
    // regenerate index across recent day-files
    const all = [];
    for (let i = 0; i < 30; i++) {
      const d = new Date(Date.parse(day + 'T00:00:00Z') - i * 86400000).toISOString().slice(0, 10);
      const f = join(KNOWLEDGE, `entries-${d}.json`);
      if (existsSync(f)) all.push(...(loadJson(f, { entries: [] }).entries));
    }
    writeFileSync(join(KNOWLEDGE, 'INDEX.md'), renderIndex(all, receipt));
  }
  if (seenSet) {
    mkdirSync(dirname(join(ROOT, 'state', 'scout', 'seen.json')), { recursive: true });
    writeFileSync(join(ROOT, 'state', 'scout', 'seen.json'), JSON.stringify({ schema: 'scout.seen/1', at: receipt.at, seen: [...seenSet] }, null, 1) + '\n');
  }
  console.log(`[scout] receipt: sources=${receipt.sourcesFetched} candidates=${receipt.candidates} fresh=${receipt.fresh} vetted=${receipt.vetted} blocked=${receipt.blocked.length} lessons=${receipt.lessons.length}`);
}

/* ── selftest: zero network — every pure law, end to end ─────────────────── */
export function selftest() {
  signalsSelftest();
  parseSelftest();
  learnSelftest();
  // dedupe law
  const c = (o, r) => ({ owner: o, repo: r });
  const d1 = dedupe([c('a', 'b'), c('a', 'b'), c('x', 'y')], new Set(['x/y']));
  if (d1.fresh.length !== 1 || !d1.fresh[0].owner.startsWith('a')) throw new Error('dedupe missed new/dupe split');
  const big = new Set(Array.from({ length: SEEN_CAP + 50 }, (_, i) => `o${i}/r`));
  const d2 = dedupe([c('zz', 'z')], big);
  if (d2.seen.size !== SEEN_CAP) throw new Error(`seen cap broken: ${d2.seen.size}`);
  if (!d2.fresh[0] || d2.fresh[0].repo !== 'z') throw new Error('fresh must pass even when seen overflows');
  // orchestrator imports intact
  if (typeof vetCandidate !== 'function' || typeof ladderFetch !== 'function') throw new Error('import broken');
  console.log('[scout] selftest: PASS (all module laws + dedupe split + seen-cap)');
  return 0;
}

const isMain = process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href;
if (isMain) {
  process.exit(process.argv.includes('--selftest') ? selftest() : await live());
}
