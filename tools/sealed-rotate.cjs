#!/usr/bin/env node
/**
 * sealed-rotate.cjs — רוטציית-סודות-עצמית [t49 · תקדים-t46]
 * ═══════════════════════════════════════════════════════════════════════════
 * THE DISEASE (measured t49): repo PAT secrets rotated 10-13 died exactly 7
 * days later (estate-vault HTTP 401 /user/repos at 07:42). This tool re-seals
 * the LIVE token from the local vault (.vault/pat.env) into any repo secret
 * via GitHub Actions Secrets API (crypto_box_seal: ephemeral X25519 +
 * BLAKE2b-24 nonce + XSalsa20-Poly1305 — libsodium-exact; tweetnacl's SHA-512
 * hash is WRONG for the sealed-box nonce, that 422 was measured).
 * NEVER prints the token. Zero dependencies beyond tweetnacl+blake2b.
 * Usage: node tools/sealed-rotate.cjs SECRET_NAME   (OWNER/REPO constants below)
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
const [OWNER, REPO] = [process.argv[3] || 'roshpinacare-sys', process.argv[4] || 'Autonomy'];
const SECRET = process.argv[2];
if (!SECRET) throw new Error('usage: rotate.cjs SECRET_NAME');

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
  const msgBytes = Buffer.from(TOK, 'utf8');
  const keyBytes = Buffer.from(key, 'base64');
  // sealed box: ephemeral X25519 keypair + box (per libsodium crypto_box_seal)
  const eph = nacl.box.keyPair();
  const nonce = sealNonce(eph.publicKey, keyBytes);
  const boxed = nacl.box(msgBytes, nonce, keyBytes, eph.secretKey);
  const sealed = Buffer.concat([eph.publicKey, boxed]);
  const put = await api(`actions/secrets/${SECRET}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ encrypted_value: sealed.toString('base64'), key_id }),
  });
  console.log(`PUT ${SECRET}: HTTP ${put.status} ${put.status === 204 ? 'OK' : 'FAIL'}`);
})();
