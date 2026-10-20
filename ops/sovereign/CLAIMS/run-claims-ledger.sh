#!/usr/bin/env bash
# run-claims-ledger.sh — falsifiable-claims ledger runner (R319 reconstruction)
# Provenance: original was live-only at /home/z/audit/ (died with sandbox wipe —
# the exact wipe-survival gap this reconstruction closes: canonical copy now git-sealed
# at Autonomy:ops/sovereign/CLAIMS/run-claims-ledger.sh; live copy re-provisioned from git).
# Contract (claims-attestor :3045 parseLedger):
#   stdout line 1: "== LEDGER: <pass> MEASURED-TRUE / <fail> REFUTED (of <total>)"
#   stdout line 2: "== refuted: <id> <id> ..."
# Law: R310 — every claim = a live test. No grace, no memory, no lying.
set -u
CLAIMS="${CLAIMS_FILE:-/home/z/audit/repos/autonomy/ops/sovereign/CLAIMS.json}"
[ -r "$CLAIMS" ] || { echo "== LEDGER: 0 MEASURED-TRUE / 0 REFUTED (of 0)"; echo "== refuted:"; exit 0; }
python3 - "$CLAIMS" << 'PYEOF'
import json, subprocess, sys, re
d = json.load(open(sys.argv[1]))
claims = d.get("claims", [])
passed, refuted = [], []
for c in claims:
    cmd, exp = c.get("cmd"), c.get("expect", {})
    ok = True
    try:
        r = subprocess.run(["bash", "-c", cmd], capture_output=True, text=True, timeout=120)
        if exp.get("exit") is not None and r.returncode != exp["exit"]:
            ok = False
        rx = exp.get("regex")
        # lying-by-ruler #10 (R319): regex contract = STDOUT ONLY (stripped) —
        # concatenating stderr adds trailing newlines that break OK$ anchors.
        if rx and not re.search(rx, (r.stdout or "").strip()):
            ok = False
    except Exception:
        ok = False
    (passed if ok else refuted).append(c.get("id", "?"))
print(f"== LEDGER: {len(passed)} MEASURED-TRUE / {len(refuted)} REFUTED (of {len(claims)})")
print("== refuted: " + " ".join(refuted))
PYEOF
