#!/usr/bin/env node
/**
 * vault-census.mjs — סקר-הכספת-החי [R41 · ההנחיה: "יש מלא מפתחות בכספת... המערכת
 * דורשת מפתחות בלי לבדוק שיש לה הכל"]
 * ═════════════════════════════════════════════════════════════════════════════
 * הבעיה שנמדדה: מנוע-המודעות עד-היום בדק רק שמות-סודות-ענן ואף-פעם לא פתח את
 * הכספת עצמה (keys.env.enc — 25 סלוטים מלאים). תוצאה: הרשת טענה MISSING-OWNER
 * על מפתחות שכבר-ישנם אצלה. החוק החדש: אף-טענת-"חסר" בלי קבלת-סקר.
 *
 * מה-הוא-עושה:
 *   · מושך מ-vault-home (פרטי): wraps/*.enc + keys.env.enc
 *   · פותח wrap דרך הטוקן-המקומי (sha256(C)-keyed, אותו-חוק-vaultlib) → P
 *   · פותח keys.env.enc → סופר-סלוטים · שמות-בלבד · מחלקות-מילוי
 *   · מפרסם state/keys/VAULT-CENSUS.json (שמות+מחלקות; אפס-ערכים, אפס-משתנים)
 *
 * חוק-השטח: לארטיפקט נכתבים רק שמות-סלוטים (שמות-גנריים: NVIDIA_API_KEY…),
 * מחלקת-מילוי (EMPTY/SHORT/FILLED), גודל-מנופח לרוחב-קבוע, וזמנים.
 * ערך, קידומת-ערך, אורך-מדויק-של-ערך-פרטי — לעולם לא יוצאים מהמנוע.
 * fail-closed: כישלון-פתיחה = פרסום-{opened:false,reason} + יציאה 1 (כנות).
 *
 * שימוש: node engine/vault-census.mjs           (ריצה-חיה: פתיחה+פרסום)
 *         node engine/vault-census.mjs --selftest (אפס-רשת, חייב-ירוק)
 */
import { createHash, pbkdf2Sync, createDecipheriv, createCipheriv, randomBytes } from 'node:crypto';

const OWNER = 'roshpinacare-sys';
const VAULT_REPO = 'vault-home';
const BRANCH = 'main';
const API = 'https://api.github.com';
const OUT_PATH = 'state/keys/VAULT-CENSUS.json';
const ITER = 200000;
const SALT_MAGIC = Buffer.from('Salted__', 'utf8');

const redact = (s) => String(s ?? '').replace(/[A-Za-z0-9+/=_-]{24,}/g, '<redacted>');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ── openssl-enc תאימות (aes-256-cbc · pbkdf2 · salted) ─────────────────── */
function deriveKeyIv(pass, salt) {
  const dk = pbkdf2Sync(String(pass), salt, ITER, 32 + 16, 'sha256');
  return { key: dk.subarray(0, 32), iv: dk.subarray(32, 48) };
}
function openSeal(buf, pass) {
  if (!buf || buf.length < 16 + SALT_MAGIC.length || !buf.subarray(0, 8).equals(SALT_MAGIC)) return null;
  const salt = buf.subarray(8, 16);
  const { key, iv } = deriveKeyIv(pass, salt);
  try {
    const d = createDecipheriv('aes-256-cbc', key, iv);
    return Buffer.concat([d.update(buf.subarray(16)), d.final()]);
  } catch { return null; }
}
function sealPlain(plain, pass) { /* לבדיקה-עצמית בלבד */
  const salt = randomBytes(8);
  const { key, iv } = deriveKeyIv(pass, salt);
  const c = createCipheriv('aes-256-cbc', key, iv);
  return Buffer.concat([SALT_MAGIC, salt, c.update(plain), c.final()]);
}

/* ── ניתוח-סלוטים: שמות-בלבד ─────────────────────────────────────────────── */
export function parseSlots(text) {
  const slots = [];
  for (const line of String(text ?? '').split(/\r?\n/)) {
    const m = /^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.exec(line);
    if (!m) continue;
    const [, name, value] = m;
    const len = value.length;
    slots.push({
      name,
      state: len === 0 ? 'EMPTY' : len < 8 ? 'SHORT' : 'FILLED',
      // רוחב-מנופח (קבוע): לא-חושף-אורך-מדויק של ערך
      lenClass: len === 0 ? 0 : len <= 32 ? 32 : len <= 64 ? 64 : len <= 128 ? 128 : 256,
    });
  }
  return slots;
}
export const FAMILIES = [
  { family: 'llm-brain', test: /^NVIDIA_(API_KEY|MODELS|BASE_URL)$/ },
  { family: 'research', test: /^(TAVILY_[A-Z_0-9]*|JINA_API_KEY|IPAI_API_KEY)$/ },
  { family: 'cloud-infra', test: /^(GITLAB|SUPABASE|VERCEL|RENDER)_TOKEN$/ },
  { family: 'steem-custody', test: /^STEEM_[A-Z_0-9]*$/ },
  { family: 'owner-anchor', test: /^HEAD_CORNER_[A-Z_0-9]*$/ },
  { family: 'infra-pat', test: /^GITHUB_PAT$/ },
  { family: 'shards', test: /SHARD/ },
];
export function familyOf(name) {
  const f = FAMILIES.find((f) => f.test.test(name));
  return f ? f.family : 'other';
}
export function censusFromSlots(slots, opened, reason = null) {
  return {
    schema: 'keys.vault-census/1',
    opened,
    ...(reason ? { reason: redact(reason) } : {}),
    slotsTotal: slots.length,
    filled: slots.filter((s) => s.state === 'FILLED').length,
    families: FAMILIES.map((f) => ({
      family: f.family,
      slots: slots.filter((s) => f.test.test(s.name) && s.state !== 'EMPTY').map((s) => s.name),
    })).filter((f) => f.slots.length),
    slots,
  };
}

/* ── גיט-API ────────────────────────────────────────────────────────────── */
const PAT = (process.env.SBX_FLEET_PAT || process.env.GITHUB_TOKEN || '').trim();
const UA = { 'User-Agent': 'vault-census/1', Accept: 'application/vnd.github+json' };
/** [R41 מדידה-חיה] contents-API משחית בינארי (raw: 96B→141B; גם-base64-JSON
 *  עובר-צינור-טקסט-UTF8). ה-git-blobs-API בייט-מדויק (sha256 זהה-למקומי, 96B,
 *  ה-wrap-נפתח). חוק: ארטיפקטים-אטומים נמשכים דרך-blobs בלבד. */
async function ghRaw(repo, path) {
  if (!PAT) return null;
  for (let a = 0; a < 3; a++) {
    const meta = await ghJson(`/repos/${OWNER}/${repo}/contents/${path}?ref=${BRANCH}`);
    if (!meta || !meta.sha) return null;
    const res = await fetch(`${API}/repos/${OWNER}/${repo}/git/blobs/${meta.sha}`, {
      headers: { ...UA, Authorization: `Bearer ${PAT}` },
    });
    if (res.status === 409 || res.status >= 500) { await sleep(1200 * (a + 1)); continue; }
    if (!res.ok) return null;
    const j = await res.json().catch(() => null);
    if (!j || typeof j.content !== 'string') return null;
    return Buffer.from(j.content, 'base64');
  }
  return null;
}
async function ghJson(path) {
  if (!PAT) return null;
  for (let a = 0; a < 3; a++) {
    const res = await fetch(`${API}${path}`, { headers: { ...UA, Authorization: `Bearer ${PAT}` } });
    if (res.status === 409 || res.status >= 500) { await sleep(1200 * (a + 1)); continue; }
    const j = await res.json().catch(() => null);
    return res.ok ? j : null;
  }
  return null;
}
async function putVerified(path, content, message) {
  const head = await ghJson(`/repos/${OWNER}/Autonomy/contents/${path}?ref=${BRANCH}`);
  const sha = head && head.sha ? head.sha : undefined;
  for (let a = 0; a < 3; a++) {
    const body = { message, content: content.toString('base64'), branch: BRANCH, ...(sha ? { sha } : {}) };
    const res = await fetch(`${API}/repos/${OWNER}/Autonomy/contents/${path}`, {
      method: 'PUT', headers: { ...UA, Authorization: `Bearer ${PAT}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const j = await res.json().catch(() => null);
    if (res.ok && j && j.content && j.content.sha) {
      const back = await ghRaw('Autonomy', path);
      return { ok: !!back && back.equals(content), sha: j.content.sha };
    }
    if (res.status === 409) await sleep(1500);
    await sleep(800 * (a + 1));
  }
  return { ok: false, sha: null };
}

/* ── הפתיחה-הריבונית (אותו-חוק-כמו-vaultlib.sh) ─────────────────────────── */
export function openVaultFromBuffers({ wraps, keysEnc, candidates }) {
  const seen = new Set();
  for (const c of candidates) {
    if (!c) continue;
    const p = createHash('sha256').update(String(c)).digest('hex');
    if (seen.has(p)) continue; seen.add(p);
    const w = wraps.find((x) => x.name === `${p}.enc`);
    if (!w) continue;
    const P = openSeal(w.buf, p);
    if (P) {
      const plain = openSeal(keysEnc, P.toString('utf8'));
      if (plain) return { opened: true, slots: parseSlots(plain.toString('utf8')) };
    }
  }
  return { opened: false, slots: [] };
}

/* ── selftest: אפס-רשת ──────────────────────────────────────────────────── */
async function selftest() {
  const assert = (cond, msg) => { if (!cond) { console.error(`SELFTEST-FAIL: ${msg}`); process.exit(1); } };
  const sample = [
    'NVIDIA_API_KEY=nvapi-TESTTESTTESTTEST', 'NVIDIA_MODELS=meta/llama-a,meta/llama-b',
    'GITLAB_TOKEN=glpat-TESTTESTTEST', 'EMPTY_SLOT=', 'SHORT=x',
    'STEEM_ACCOUNT=acct-00', 'HEAD_CORNER_MASTER=HC-TESTTESTTESTTEST',
  ].join('\n');
  const pass = 'test-master-P';
  const sealed = sealPlain(Buffer.from(sample, 'utf8'), pass);
  const open1 = openSeal(sealed, pass);
  assert(open1 && open1.toString('utf8') === sample, 'openSeal round-trip');
  assert(openSeal(sealed, 'wrong-pass') === null, 'wrong pass fail-closed');
  const slots = parseSlots(sample);
  assert(slots.length === 7, `slots parsed (${slots.length})`);
  const cen = censusFromSlots(slots, true);
  assert(cen.filled === 4 && cen.slotsTotal === 7, `census counts (${cen.filled}/${cen.slotsTotal})`);
  assert(slots.find((s) => s.name === 'STEEM_ACCOUNT').state === 'SHORT', 'SHORT bucket');
  const fam = cen.families.map((f) => f.family);
  assert(fam.includes('llm-brain') && fam.includes('steem-custody') && fam.includes('owner-anchor') && fam.includes('cloud-infra'), `families (${fam.join(',')})`);
  const js = JSON.stringify(cen);
  assert(!js.includes('nvapi-TESTTESTTEST') && !js.includes('acct-00') && !js.includes('HC-TESTTESTTESTTEST'), 'zero-value law (values never published)');
  assert(!js.includes('glpat-TESTTESTTEST'), 'zero-value law (token never published)');
  const wrapName = createHash('sha256').update('tok').digest('hex') + '.enc';
  assert(/^[0-9a-f]{64}\.enc$/.test(wrapName), 'wrap naming law');
  const opened = openVaultFromBuffers({
    wraps: [{ name: wrapName, buf: sealPlain(Buffer.from(pass, 'utf8'), createHash('sha256').update('tok').digest('hex')) }],
    keysEnc: sealed, candidates: ['tok', 'other'],
  });
  assert(opened.opened && opened.slots.length === 7, 'openVaultFromBuffers wrap-path');
  console.log(`vault-census selftest: OK (7/7 vectors, zero-value law enforced)`);
}

/* ── ריצה-חיה ───────────────────────────────────────────────────────────── */
async function live() {
  if (!PAT) { console.error('FATAL: אין-אמצעי-פתיחה (SBX_FLEET_PAT/GITHUB_TOKEN)'); process.exit(1); }
  const t0 = Date.now();
  const wrapsDir = await ghJson(`/repos/${OWNER}/${VAULT_REPO}/contents/wraps?ref=${BRANCH}`);
  const wrapNames = Array.isArray(wrapsDir) ? wrapsDir.filter((f) => f.name.endsWith('.enc')).map((f) => f.name) : [];
  const keysEnc = await ghRaw(VAULT_REPO, 'keys.env.enc');
  let census;
  if (!keysEnc || !wrapNames.length) {
    census = censusFromSlots([], false, `vault artifacts unreadable (wraps:${wrapNames.length}, keysEnc:${keysEnc ? 'ok' : 'null'})`);
    console.error('vault-census: HONEST-FAIL — לא-ניתן-למשוך-את-ארטיפקטי-הכספת');
  } else {
    const wraps = [];
    for (const n of wrapNames) {
      const buf = await ghRaw(VAULT_REPO, `wraps/${n}`);
      if (buf) wraps.push({ name: n, buf });
    }
    const cand = [PAT, process.env.ZIP_PAT, process.env.INV_TOKEN].filter(Boolean);
    const r = openVaultFromBuffers({ wraps, keysEnc, candidates: cand });
    census = censusFromSlots(r.slots, r.opened, r.opened ? null : 'no candidate unwraps any registered wrap (vault stays sealed)');
    if (!r.opened) console.error('vault-census: HONEST-FAIL — אף-מועמד-לא-פתח-wrap (הכספת-נשארת-אטומה)');
  }
  const body = { ...census, measuredAt: new Date().toISOString(), durationMs: Date.now() - t0, source: `${VAULT_REPO}@${BRANCH}` };
  const js = Buffer.from(JSON.stringify(body, null, 1) + '\n', 'utf8');
  const put = await putVerified(OUT_PATH, js, 'vault-census: סקר-כספת-חי — שמות-סלוטים-בלבד, אפס-ערכים [R41]');
  if (!put.ok) { console.error('FATAL: פרסום-נכשל'); process.exit(1); }
  console.log(`vault-census: opened=${body.opened} slots=${body.slotsTotal} filled=${body.filled} families=[${(body.families || []).map((f) => f.family).join(',')}] sha ${String(put.sha).slice(0, 10)} readback ${put.ok ? 'MATCH' : 'LAG'}`);
  process.exit(body.opened ? 0 : 1);
}

const IS_MAIN = process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href;
if (IS_MAIN || process.argv[1]?.endsWith('vault-census.mjs')) {
  if (process.argv.includes('--selftest')) await selftest();
  else await live();
}
