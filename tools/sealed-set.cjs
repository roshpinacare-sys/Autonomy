#!/usr/bin/env node
/**
 * sealed-set.cjs — הצבת-סוד-כללי-עצמית [t52 · אח של sealed-rotate t49]
 * ═══════════════════════════════════════════════════════════════════════════
 * sealed-rotate היה ייעודי-ל-PAT (הצפין-את-הטוקן-עצמו). זה-האח-הכללי: הערך
 * נקרא-מקובץ (argv[3], חייב-0600/0700) — לעולם לא מודפס, לעולם לא ב-log,
 * זיכרון-בלבד → crypto_box_seal (ephemeral X25519 + BLAKE2b-24 nonce +
 * XSalsa20-Poly1305 — libsodium-exact) → PUT ל-Actions secret.
 *
 * Usage: node tools/sealed-set.cjs SECRET_NAME VALUE_FILE [OWNER] [REPO]
 *   VALUE_FILE חייב הרשאות 0600/0700 — מסרב אחרת (fail-closed).
 */
const nacl = require('tweetnacl');
const blake2b = require('blake2b');
const fs = require('fs');

// libsodium crypto_box_seal nonce = blake2b(eph_pk || recipient_pk), 24-byte digest
function sealNonce(ephPk, recPk) {
  const h = blake2b(24);
  h.update(Buffer.concat([Buffer.from(ephPk), Buffer.from(recPk)]));
  return Buffer.from(h.digest());
}

const TOK = (() => {
  const m = fs.readFileSync('/home/z/my-project/.vault/pat.env', 'utf8');
  const u = m.match(/https:\/\/[^:]+:([A-Za-z0-9_]+)@/);
  if (!u) throw new Error('no token in pat.env');
  return u[1];
})();

const SECRET = process.argv[2];
const VALUE_FILE = process.argv[3];
const OWNER = process.argv[4] || 'roshpinacare-sys';
const REPO = process.argv[5] || 'Autonomy';
if (!SECRET || !VALUE_FILE) {
  console.error('usage: sealed-set.cjs SECRET_NAME VALUE_FILE [OWNER] [REPO]');
  process.exit(2);
}

// fail-closed: refuse to read a value file that is world/group readable
const st = fs.statSync(VALUE_FILE);
if ((st.mode & 0o077) !== 0) {
  console.error(`sealed-set: REFUSED — ${VALUE_FILE} must be 0600/0700 (is ${(st.mode & 0o777).toString(8)})`);
  process.exit(1);
}
const VALUE = fs.readFileSync(VALUE_FILE, 'utf8').trim();
if (!VALUE || VALUE.length < 8) {
  console.error('sealed-set: REFUSED — value too short/empty (honest abort)');
  process.exit(1);
}

async function api(path, opts = {}) {
  const r = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/${path}`, {
    ...opts,
    headers: { Authorization: `Bearer ${TOK}`, Accept: 'application/vnd.github+json', ...(opts.headers || {}) },
  });
  return r;
}

(async () => {
  const pk = await api('actions/secrets/public-key');
  if (!pk.ok) throw new Error('public-key HTTP ' + pk.status);
  const { key_id, key } = await pk.json();
  const msgBytes = Buffer.from(VALUE, 'utf8');
  const keyBytes = Buffer.from(key, 'base64');
  const eph = nacl.box.keyPair();
  const nonce = sealNonce(eph.publicKey, keyBytes);
  const boxed = nacl.box(msgBytes, nonce, keyBytes, eph.secretKey);
  const sealed = Buffer.concat([eph.publicKey, boxed]);
  const put = await api(`actions/secrets/${SECRET}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ encrypted_value: sealed.toString('base64'), key_id }),
  });
  console.log(`PUT ${OWNER}/${REPO} ${SECRET}: HTTP ${put.status} ${put.status === 204 ? 'OK (value never echoed)' : 'FAIL'}`);
  process.exit(put.status === 204 ? 0 : 1);
})();
