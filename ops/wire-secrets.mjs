import sodium from "libsodium-wrappers";
const PAT = process.env.GH;
const TARGET_PAT = process.env.GH; // the same operator PAT, wired as the estate's cross-repo fleet credential
const H = { Authorization: `Bearer ${PAT}`, Accept: "application/vnd.github+json" };
await sodium.ready;
const REPO = "Autonomy";
for (const [name, value] of [["SBX_FLEET_PAT", TARGET_PAT]]) {
  const pkr = await fetch(`https://api.github.com/repos/roshpinacare-sys/${REPO}/actions/secrets/public-key`, { headers: H });
  if (!pkr.ok) { console.error(`${REPO}: public-key HTTP ${pkr.status}`); process.exit(1); }
  const pk = await pkr.json();
  const sealed = sodium.crypto_box_seal(Buffer.from(value, "utf8"), Buffer.from(pk.key, "base64"));
  const r = await fetch(`https://api.github.com/repos/roshpinacare-sys/${REPO}/actions/secrets/${name}`, {
    method: "PUT", headers: { ...H, "Content-Type": "application/json" },
    body: JSON.stringify({ encrypted_value: Buffer.from(sealed).toString("base64"), key_id: pk.key_id }),
  });
  console.log(`${REPO}/${name}: PUT HTTP ${r.status} ${r.status === 201 || r.status === 204 ? "OK" : "FAIL"}`);
}
