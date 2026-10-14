#!/usr/bin/env node
/**
 * keys-awareness.mjs — מודעות-מפתחות בכל-מחזור-selfhood. [T24]
 * ---------------------------------------------------------------------------
 * החוק שהבעלים דרש: המערכת לא דורשת מפתח בלי לבדוק את המלאי.
 * · קורא את המלאי-הקנוני state/keys/REGISTRY.json מהגיט-החי (לא מה-checkout).
 * · מודד כל-דרישה; סודות נבדקים בשמות-בלבד (אפס-ערכים-בפלטים; redact בקוד).
 * · מפרסם state/selfhood/keys.json עם אימות-blob-sha (אותו-חוק-כמו-ה-selfhood).
 * · כשל-תשתית = ריצה-אדומה כנה. אין-הצלחות-מזויפות.
 */
import { createHash } from 'node:crypto';
import { pubScrubObj } from '../engine/pub-scrub.mjs';

const OWNER = 'roshpinacare-sys';
const REPO = 'Autonomy';
const BRANCH = 'main';
const API = 'https://api.github.com';
const PAT = (process.env.SBX_FLEET_PAT || process.env.GITHUB_TOKEN || '').trim();
const UA = { 'User-Agent': 'keys-awareness/1', Accept: 'application/vnd.github+json' };

const redact = (s) => String(s ?? '').replace(/[A-Za-z0-9+/=_-]{30,}/g, '<len-redacted>');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const tryJson = (t) => { try { return JSON.parse(t); } catch { return null; } };

function gitBlobSha(content) {
  const buf = Buffer.concat([Buffer.from(`blob ${Buffer.byteLength(content)}\0`, 'utf8'), Buffer.from(content, 'utf8')]);
  return createHash('sha1').update(buf).digest('hex');
}

async function gh(path, opts = {}) {
  const res = await fetch(`${API}${path}`, { ...opts, headers: { ...UA, Authorization: `Bearer ${PAT}`, ...(opts.headers || {}) } });
  if (res.status === 409 || res.status >= 500) { await sleep(1500); return gh(path, opts); }
  const txt = await res.text();
  const j = txt ? tryJson(txt) : null;
  if (!res.ok) return { __err: res.status, ...(j ? { j } : {}) };
  return j;
}

async function rawRead(repo, path, ref = BRANCH) {
  const res = await fetch(`${API}/repos/${OWNER}/${repo}/contents/${path}?ref=${ref}`, {
    headers: { ...UA, Authorization: `Bearer ${PAT}`, Accept: 'application/vnd.github.raw' },
  });
  if (!res.ok) return null;
  return res.text();
}

async function putVerified(repo, path, content, message) {
  let head = await gh(`/repos/${OWNER}/${repo}/contents/${path}?ref=${BRANCH}`);
  let sha = head && !head.__err ? head.sha : undefined;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const body = { message, content: Buffer.from(content, 'utf8').toString('base64'), branch: BRANCH, ...(sha ? { sha } : {}) };
    const r = await gh(`/repos/${OWNER}/${repo}/contents/${path}`, { method: 'PUT', body: JSON.stringify(body) });
    if (r && r.content && r.content.sha) {
      if (r.content.sha === gitBlobSha(content)) {
        const back = await rawRead(repo, path);
        return { ok: true, sha: r.content.sha, readback: back !== null && redact(back) === redact(content) };
      }
    }
    if (r && r.__err === 409) {
      head = await gh(`/repos/${OWNER}/${repo}/contents/${path}?ref=${BRANCH}`);
      sha = head && !head.__err ? head.sha : undefined;
    }
    await sleep(1500 * attempt);
  }
  return { ok: false, path };
}

/** שמות-סודות בלבד (אפס-ערכים). מחזיר null אם אין-הרשאה/כשל — כנות. */
async function secretNames(repo) {
  const r = await gh(`/repos/${OWNER}/${repo}/actions/secrets?per_page=100`);
  if (r && r.secrets) return r.secrets.map((s) => s.name);
  return null;
}

/* ═══ [R41] גשר-הכספת: החוק-החדש של-הבעלים ═══════════════════════════════
 * "נמאס לי שכל-פעם המערכת דורשת מפתחות בלי לבדוק שיש לה הכל".
 * מעתה: כל-דרישה נשפטת מול סקר-הכספת-החי (state/keys/VAULT-CENSUS.json —
 * נכתב-בכל-מחזור-על-ידי engine/vault-census.mjs). טענת-MISSING-* בלי קבלת-סקר
 * = הפרה. סלוט-מתאים-בכספת = SATISFIABLE-VIA-VAULT (לא-דרישה-מהבעלים!). */
const VAULT_DEMAND_MAP = {
  D1: { family: 'owner-anchor', note: 'HEAD_CORNER_MASTER/KEY_B64 בכספת' },
  D2: { family: 'infra-pat', note: 'GITHUB_PAT בכספת' },
  D3: { family: 'infra-pat', note: 'GITHUB_PAT בכספת' },
  D4: { family: 'steem-custody', note: 'STEEM_ACTIVE_WIF_A/B בכספת (chain-judged: rotated-out — קבלה-בקובץ-MANIFEST-T57)' },
  D5: { family: null, note: 'אין-סלוטי-blurt בכספת (סקר-שלילי-כן)' },
  D6: { family: 'llm-brain', note: 'NVIDIA_API_KEY+NVIDIA_MODELS מלאים-בכספת — מוח-LLM אפשרי-מהכספת-עצמה', recipe: 'vault-open→NVIDIA_API_KEY→סוד-ענן/סביבה-ריצה (אפס-הדפסות)' },
  D7: { family: null, note: 'אין-סלוטי-hive בכספת (סקר-שלילי-כן)' },
  D8: { family: null, note: 'אין-סלוטי-CEX בכספת (סקר-שלילי-כן)' },
  D9: { family: 'shards', note: 'GEN3_SHARD_B64 קיים-בכספת — רסק-דור-3 נמצא; ידע-דורות-ישנים עדיין-חלקי', recipe: 'שילוב-רסק+החלטת-רוטציה' },
  D10: { family: null, note: 'דלק-גז אינו-מפתח — מחוץ-לכספת (מדוד)' },
  D11: { family: null, note: 'config-מוח-סנדבוקס אינו-בכספת (SBX_AI_CONFIG סוד-ענן)' },
};

function vaultCensusEvidence(census, demandId) {
  if (!census) return { measured: false, note: 'סקר-הכספת לא-נמדד-במחזור-זה (census חסר)' };
  const map = VAULT_DEMAND_MAP[demandId] || { family: null, note: 'אין-מיפוי-משפחה לדרישה-זו' };
  const fam = map.family ? (census.families || []).find((f) => f.family === map.family) : null;
  return {
    measured: true,
    opened: !!census.opened,
    slotsTotal: census.slotsTotal,
    filled: census.filled,
    censusAt: census.measuredAt,
    family: map.family,
    match: fam ? fam.slots : [],
    note: map.note,
    ...(map.recipe ? { recipe: map.recipe } : {}),
  };
}

async function main() {
  if (!PAT) { console.error('FATAL: אין-אמצעי-קריאה (SBX_FLEET_PAT/GITHUB_TOKEN)'); process.exit(1); }
  const t0 = Date.now();

  // 1. המלאי מהגיט-החי
  const regTxt = await rawRead(REPO, 'state/keys/REGISTRY.json');
  if (!regTxt) { console.error('FATAL: state/keys/REGISTRY.json לא-קיים ב-main — האימוץ קדם-למדידה'); process.exit(1); }
  let reg;
  try { reg = JSON.parse(regTxt); } catch { console.error('FATAL: מלאי-לא-תקני'); process.exit(1); }

  // 2. [R41] סקר-הכספת מהגיט-החי (קבלה-חובה לכל-פסק-דין)
  const censusTxt = await rawRead(REPO, 'state/keys/VAULT-CENSUS.json');
  const census = censusTxt ? tryJson(censusTxt) : null;
  const censusSummary = census ? { opened: !!census.opened, slotsTotal: census.slotsTotal, filled: census.filled, measuredAt: census.measuredAt } : null;
  if (!census || !census.opened) {
    console.error('keys-awareness: אזהרה-כנה — סקר-כספת-חי לא-זמין; פסקי-דין נושאים קבלת-חוסר-סקר (לא טענות-חסר)');
  }

  // 3. מדידת-דרישות (עתה-מול-שלושה-מקורות: רישום · שמות-סודות · סקר-כספת)
  const autSecrets = await secretNames(REPO); // שמות-בלבד
  const checks = [];
  const upgrades = [];
  for (const d of reg.demands ?? []) {
    let state = d.state;
    let evidence = d.how;
    const vaultEv = vaultCensusEvidence(census, d.id);
    if (d.id === 'D6') {
      const found = autSecrets ? autSecrets.filter((n) => /GROQ|GEMINI/i.test(n)) : [];
      if (found.length) {
        state = 'SATISFIED-CLOUD';
        evidence = `סוד-מוח נמצא בשמות-הסודות (${found.join(',')}) — המוח-המלא ידבר-מהענן במחזור-הבא`;
        upgrades.push(d.id);
      } else if (vaultEv.measured && vaultEv.match.length) {
        // [R41] החוק-החדש: לא MISSING-OWNER כשלכספת יש סלוט-מוח חי — אלא ניתן-לקיום-דרך-הכספת
        state = 'SATISFIABLE-VIA-VAULT';
        evidence = `הכספת מחזיקה מוח-LLM חי (${vaultEv.match.join(',')}) — דורש-חיבור-ריצה, לא-אספקת-בעלים; ${vaultEv.recipe}`;
        upgrades.push(d.id);
      } else if (autSecrets) {
        evidence = 'אין-סוד-מוח בשמות-הסודות (נמדד); המנוע-הדטרמיניסטי-v1 מכריע-בכנות';
      } else {
        evidence = 'רשימת-שמות-סודות לא-נמדדה (הרשאה/כשל) — פסק-הדין נשאר מהרישום';
      }
    }
    if (String(state).startsWith('SATISFIED')) {
      const key = (reg.keys ?? []).find((k) => k.id === d.needs);
      evidence += ' · קבלת-רישום: ' + (key ? redact(key.receipt) : 'רישום-הדרישה');
    }
    // [R41] חוק-איסור-דרישה-עיוורת נאכף: כל-פסק-דין נושא קבלת-סקר-כספת
    checks.push({ id: d.id, component: d.component, needs: d.needs, state, evidence: redact(evidence), ok: String(state).startsWith('SATISFIED'), vault: vaultEv });
  }

  // 4. פרסום עם קריאה-חוזרת
  const body = {
    schema: 'selfhood.keys/2',
    measuredAt: new Date().toISOString(),
    durationMs: Date.now() - t0,
    registryGeneratedAt: reg.generatedAt,
    demandsChecked: checks.length,
    satisfied: checks.filter((c) => c.ok).length,
    satisfiableViaVault: checks.filter((c) => c.state === 'SATISFIABLE-VIA-VAULT').map((c) => ({ id: c.id, slots: c.vault.match, recipe: c.vault.recipe })),
    checks,
    unsatisfied: checks.filter((c) => !c.ok).map((c) => ({ id: c.id, needs: c.needs, state: c.state })),
    vaultCensus: censusSummary,
    ownerGaps: reg.ownerGaps ?? [],
    upgrades,
    secretNamesMeasured: autSecrets ? true : false,
    sources: [`state/keys/REGISTRY.json@${BRANCH}`, `state/keys/VAULT-CENSUS.json@${BRANCH} (R41: חוק-איסור-דרישה-עיוורת)`, 'actions/secrets (שמות-בלבד)'],
  };
  // חוק-השטח-הפומבי (נמדד 2026-10-14): הספר נגזר-מהרישום — כל-המחרוזות עוברות
  // טיהור-refs לפני-פרסום (ids, needs, receipts — אותו-חוק-כמו-כל-ספר-פומבי).
  const js = JSON.stringify(pubScrubObj(body), null, 1) + '\n';
  const put = await putVerified(REPO, 'state/selfhood/keys.json', js, 'keys-awareness: מדידת-דרישות-מול-מלאי-המפתחות (T24)');
  if (!put.ok) { console.error('FATAL: פרסום-נכשל', put.path ?? ''); process.exit(1); }
  console.log(`keys-awareness: ${body.satisfied}/${body.demandsChecked} satisfied · upgrades: ${upgrades.join(',') || '—'} · sha ${put.sha.slice(0, 10)} · readback ${put.readback ? 'MATCH' : 'lag'}`);
}

main().catch((e) => { console.error('FATAL:', redact(e && e.message || e)); process.exit(1); });
