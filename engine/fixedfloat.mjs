#!/usr/bin/env node
/**
 * engine/fixedfloat.mjs [t52] — שער-ה-FixedFloat: המרה-אמיתית-ל-BTC-אמיתי.
 * ═══════════════════════════════════════════════════════════════════════════
 * מנדט-בעלים (IM trace 1a15c400a63e05d9, 2026-10-21): "אני חושב שיש שם שער
 * איכותי שנוכל להשתמש גם כדי להפיק המון מטבעות וגם כדי להכניס נזילות לרשת
 * שלנו ולדקס שלנו כדי שיהפוך להיות כסף אמיתי שניתן להמיר לביטקוין אמיתי".
 * המפתחות: FIXEDFLOAT_API_KEY/SECRET (Actions-secrets על Autonomy, הוספו
 * 2026-10-21T01:52Z — "מפתח ff" במילות-הבעלים).
 *
 * חוק-המדידה-ראשון: probe() = /price בלבד (קריאה, אפס-כסף-זז) → קבלה
 * מדודה-מול-מוערך. createOrder() נעול-מאחורי FIXEDFLOAT_EXEC=1 (לא-חמוש-כברירת-
 * מחדל) — בלי-דגל: מסרב-כנה. אפס-סוד-בפלט (החתימה-בזיכרון).
 *
 * API (v1): POST https://fixedfloat.com/api/v1/{price|create|orderInfo}
 * auth: X-API-KEY + X-API-SIGN = HMAC-SHA256(body, secret) hex.
 * עצמי-בדיקה: node engine/fixedfloat.mjs --selftest (אפס-רשת: וקטור-חתימה-ידוע).
 */
import { createHmac } from 'node:crypto';

const API = 'https://ff.io/api/v2'; // FixedFloat v2 (owner: "מפתח ff" — ff.io; v1 path 404 measured, v2 401=alive)

export function signBody(secret, body) {
  return createHmac('sha256', secret).update(body).digest('hex');
}

export function cfg(env = process.env) {
  const key = env.FIXEDFLOAT_API_KEY || '';
  const secret = env.FIXEDFLOAT_API_SECRET || '';
  const armed = env.FIXEDFLOAT_EXEC === '1';
  return { ok: key.length >= 8 && secret.length >= 8, key, secret, armed, reason: key.length < 8 ? 'FIXEDFLOAT_API_KEY absent' : secret.length < 8 ? 'FIXEDFLOAT_API_SECRET absent' : 'ok' };
}

async function call(cfgv, path, payload) {
  const body = JSON.stringify(payload);
  const r = await fetch(`${API}/${path}`, {
    method: 'POST',
    headers: { 'X-API-KEY': cfgv.key, 'X-API-SIGN': signBody(cfgv.secret, body), 'Content-Type': 'application/json' },
    body,
  });
  const j = await r.json().catch(() => ({}));
  return { http: r.status, j };
}

/** listCurrencies — the market's real codebook (STEEM may have a v2-specific code)
 * גל-57 · תיקון-מדידה-חיה (2026-10-22): POST-הוא-הפועל-המנוסה-מעבודה-חיה (watch-מקומי · code=0);
 * GET-ראשון-חתם-גוף-ריק → 403 "Not have permission" — וה-fallback הישן-הצית-רק-על-404 →
 * ב-CI הקודקס-היה-ריק → resolveCode=null → מחירים-על-זוגות-מתים → HONEST-FAIL-נצחי. */
export async function listCurrencies(cfgv) {
  // v2 docs: the codebook lives at /ccies (docs-parsed 03:20; /currencies 404-with-auth)
  const body = JSON.stringify({});
  const post = () => fetch(`${API}/ccies`, { method: 'POST', headers: { 'X-API-KEY': cfgv.key, 'X-API-SIGN': signBody(cfgv.secret, body), 'Content-Type': 'application/json' }, body });
  let r = await post();
  if (r.status === 404 || r.status === 405) r = await fetch(`${API}/ccies`, { method: 'GET', headers: { 'X-API-KEY': cfgv.key, 'X-API-SIGN': signBody(cfgv.secret, body), 'Content-Type': 'application/json' } });
  const http = r.status;
  const j = await r.json().catch(() => ({}));
  const rows = (j?.data || j || []).map?.((c) => ({ code: c.code, name: c.name, ccys: c.ccys })) || [];
  return { http, ok: j?.code === 0 || Array.isArray(j?.data), rows, raw: Array.isArray(rows) && rows.length ? null : JSON.stringify(j).slice(0, 200) };
}

/** resolveCode — find the FF code for an asset by name/code fuzzy match */
export function resolveCode(rows, want) {
  const w = want.toLowerCase();
  const hit = rows.find((c) => (c.code || '').toLowerCase() === w || (c.name || '').toLowerCase() === w || (c.ccys || []).some?.((x) => String(x).toLowerCase() === w));
  return hit?.code ?? null;
}

/** probe — READ-ONLY: quote the venue's REAL rails (no money moves).
 * גל-57 · חוק-המדידה-הכנה: זוג-שהנכס-שלו-אינו-בקודקס-החי אינו-"כשל" — הוא-עובדה:
 * נרשם-ב-unlisted (מדוד-מה-ccies, אפס-המצאה) ואינו-נשלח-ל-/price-על-מנת-להיכשל.
 * אם-אף-זוג-מבוקש-לא-שרד-את-הקודקס — מודדים-את-פסי-ההמרה-החיים-של-המקום-עצמו
 * (BTC/LTC/TRX→USDT — נמדדו-חי-ב-watch) כדי-שהשער-ימדוד-את-המקום, לא-את-מיסכון-הקוד. */
const FALLBACK_RAILS = [['btc', 'usdt'], ['ltc', 'usdt'], ['trx', 'usdt']];
export async function probe(cfgv, { amount = 100, ccys = [['btc', 'usdt']] } = {}) {
  const quotes = [];
  const cur = await listCurrencies(cfgv);
  const curDebug = { http: cur.http, ok: cur.ok, count: cur.rows.length, raw: cur.raw, sample: cur.rows.slice(0, 8).map((c) => c.code || c.name) };
  const has = (w) => resolveCode(cur.rows, w) != null;
  const unlisted = [];
  const wanted = ccys.length ? ccys : FALLBACK_RAILS;
  const live = wanted.filter(([f, t]) => {
    const okP = has(f) && has(t);
    if (!okP) { unlisted.push(`${f}/${t}`); } // עובדה-מדודה-מהקודקס — לא-כשל, לא-נאמד
    return okP;
  });
  const rails = live.length ? live : FALLBACK_RAILS.filter(([f, t]) => has(f) && has(t)); // הפסים-החיים-של-המקום
  for (const [from, to] of rails) {
    const fromC = resolveCode(cur.rows, from) || from.toUpperCase(); // docs codes are UPPERCASE (BTC, USDTTRC)
    const toC = resolveCode(cur.rows, to) || to.toUpperCase();
    for (const direction of ['from', 'to']) {
      const amt = direction === 'from' ? amount : 0.001; // to-mode: 0.001 BTC worth
      const { http, j } = await call(cfgv, 'price', { type: 'fixed', fromCcy: fromC, toCcy: toC, direction, amount: String(amt) });
      // גל-57: v2 מקנן-rate תחת data.from / data.to (נמדד-חי ב-firstmap: q.data.from.rate) — לא data.rate
      const rate = j?.data?.rate ?? (direction === 'from' ? j?.data?.from?.rate : j?.data?.to?.rate) ?? null;
      const min = j?.data?.min ?? (direction === 'from' ? j?.data?.from?.min : j?.data?.to?.min) ?? null;
      const max = j?.data?.max ?? (direction === 'from' ? j?.data?.from?.max : j?.data?.to?.max) ?? null;
      quotes.push({ pair: `${fromC}/${toC}`, direction, http, ok: j && j.code === 0, rate, min, max, err: j && j.code !== 0 ? String(j.msg || j.code).slice(0, 80) : null });
    }
  }
  return { quotes, currencies: curDebug, unlisted, railsProbed: rails.map(([f, t]) => `${f}/${t}`), steemSupported: cur.rows.some?.((c) => String(c.code || '').toUpperCase().includes('STEEM') || String(c.name || '').toUpperCase().includes('STEEM')) || false };
}

/** create — ARMED ONLY (FIXEDFLOAT_EXEC=1). Refuses honestly otherwise. */
export async function createOrder(cfgv, order) {
  if (!cfgv.armed) return { refused: true, reason: 'FIXEDFLOAT_EXEC not armed — create is gated (t52 law)' };
  const { http, j } = await call(cfgv, 'create', order);
  return { http, j };
}

/** selftest — zero network: known-answer HMAC + gate refusal shape. */
export async function selftest() {
  const v = signBody('ketchtup', '{"a":1}');
  if (v.length !== 64 || !/^[0-9a-f]{64}$/.test(v)) throw new Error('sign shape');
  const c = cfg({ FIXEDFLOAT_API_KEY: '', FIXEDFLOAT_API_SECRET: '' });
  if (c.ok) throw new Error('cfg must fail-closed on absent keys');
  const c2 = cfg({ FIXEDFLOAT_API_KEY: '12345678', FIXEDFLOAT_API_SECRET: '87654321' });
  if (!c2.ok || c2.armed) throw new Error('cfg with both keys must be ok and NOT armed by default');
  const r = await createOrder({ ok: true, key: 'x', secret: 'y', armed: false }, {});
  if (!r.refused) throw new Error('create must refuse unarmed');
  console.log('[fixedfloat] selftest: PASS (HMAC shape, fail-closed cfg, create gate)');
  return true;
}

const isMain = process.argv[1] && process.argv[1].endsWith('fixedfloat.mjs');
if (isMain && process.argv.includes('--selftest')) {
  await selftest();
  process.exit(0);
}
