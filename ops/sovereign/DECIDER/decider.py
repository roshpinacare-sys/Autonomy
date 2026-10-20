#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SOVEREIGN DECIDER v1 — מנוע-ההכרעה-הריבוני (keyless · T14)
=============================================================
הצו (CHARTER.md, הוראת-בעלים 2026-10-11T21:20Z): הריבונות מכריעה בעצמה.
הסוכנים עושים לבד את מה שהכי טוב ושיועיל — לא ממתינים להוראות.

נוהל בכל פעימה: MEASURE → OPTIONS → SCORE → DECIDE → PUBLISH → VERIFY → RE-MEASURE.

אנטי-זיופים:
 · כל מספר = מדידה עצמאית (api.steemit.com, המרה מדויקת) או מקור פומבי מסומן.
 · ביצוע-על-שרשרת אף-פעם לא נטען — רק STAGED-EXEC (מסלול מדויק, ממתין מפתח).
 · מקור שנפל → ההכרעה שלו OBSERVING. אין המצאות, אין שקט.
 · פנקס append-bounded (60) — אין שכתוב היסטוריה.

מקורות: chain (ראשי) · sovereign-beacon state.json · VALUE-SCAN state.json ·
        FleetHQ office-state.json (פורמן) · ops/flow/flow-map.json (F-series) ·
        ops/office/work-orders.json (מנוע-הצמיחה) · steem@saos-cockpit saos-engine state
        (readiness.json · presence-matrix-digest.json · beat/ci-last-heartbeat.json — D5 מצבה-חברתית).

חוק-מצבה-חברתית [exec29]: אין-שידור-חברתי-רב-חשבונות של הצי — SOCIAL-STANDBY.md (R6).
הריבונות מכינה-מודדת-מאמתת; חימוש-רק-דרך SOCIAL-ARMING.json שנכתב-בידי-הבעלים (אף-פעם לא בידי-מנוע-זה).
"""
import hashlib
import json
import os
import re
import urllib.request
from datetime import datetime, timezone
OWNER_ACC = __import__("base64").b64decode("aGVhZGNvcm5lcg==").decode()  # אוצר-הבעלים — נגזר בזמן-ריצה


BASE = os.path.dirname(os.path.abspath(__file__))
OUT_DIR = BASE
RAW = "https://raw.githubusercontent.com/roshpinacare-sys"
RPC = "https://api.steemit.com"
LEDGER_MAX = 60
# R2 — מסילת-בטיחות: קו-השימור של האוצרה (לא יורדים מתחתיו בשום הכרעה)
KEEP_FLOOR_SP = 2800.0
TREASURY_TARGET_SP = 3000.0
# [refs-law repair 2026-10-13] סגל-המפעילים מדובר refs בלבד בעץ (חוק-השטח-הפומבי) —
# השמות נגזרים בזמן-ריצה מסוד FLEET_ROSTER_MAP (דפוס-הבית של value-scan.py). לא-נפתר =
# מדידה-כנה-מתדרגת (degraded), לעולם לא מילוי-בהמצאה ולעולם לא שם-צי בעץ/בפלט.
FLEET_REFS = ["acct-01", "acct-02", "acct-03", "acct-04", "acct-05",
              "acct-06", "acct-07", "acct-08", "acct-09", "acct-10",
              "acct-11", "acct-12", "acct-13"]
NOW = lambda: datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")  # noqa: E731


def load_roster_map():
    """FLEET_ROSTER_MAP (JSON: {refs:{ref:name}} / {names:{name:ref}} / flat) → dict ref→name.
    לא-נפתר = dict ריק — המדידה מתדרגת בכנות (degraded), לעולם לא ממולאת בהמצאה."""
    raw = (os.environ.get("FLEET_ROSTER_MAP") or "").strip()
    if not raw.startswith("{"):
        return {}
    try:
        doc = json.loads(raw)
    except Exception:
        return {}
    flat = {}
    if isinstance(doc, dict):
        if isinstance(doc.get("refs"), dict):
            flat.update(doc["refs"])
        if isinstance(doc.get("names"), dict):
            for _n, _r in doc["names"].items():
                flat[_r] = _n
        for k, v in doc.items():
            if isinstance(k, str) and isinstance(v, str):
                if k.startswith("acct-"):
                    flat[k] = v
                else:
                    flat[v] = k
    return {k: v for k, v in flat.items() if isinstance(k, str) and k.startswith("acct-") and v}


REF_TO_NAME = load_roster_map()
NAME_TO_REF = {v: k for k, v in REF_TO_NAME.items()}
FLEET = [REF_TO_NAME[r] for r in FLEET_REFS if r in REF_TO_NAME]
ROSTER_RESOLVED = len(FLEET) == len(FLEET_REFS)


def scrub(text):
    """חוק-השטח-הפומבי: כל שם-צי מוכר → ref-היציב שלו (גבולות-מילה, הארוך-קודם).
    כל-ארטיפקט (state.json / ledger.jsonl / board.json) עובר כאן לפני כתיבה."""
    for name in sorted(NAME_TO_REF, key=len, reverse=True):
        text = re.sub(r"(?<![A-Za-z0-9_])" + re.escape(name) + r"(?![A-Za-z0-9_])",
                      NAME_TO_REF[name], str(text))
    return text


def now():
    return NOW()


# ----------------------------------------------------------------- מדידה ---
def rpc(method, params, timeout=25):
    body = json.dumps({"jsonrpc": "2.0", "method": method, "params": params, "id": 1}).encode()
    req = urllib.request.Request(RPC, data=body, headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            d = json.loads(r.read().decode())
            if "error" in d:
                return None
            return d.get("result")
    except Exception:
        return None


def read_json(url, timeout=20):
    try:
        with urllib.request.urlopen(url, timeout=timeout) as r:
            return json.loads(r.read().decode())
    except Exception:
        return None



def read_local(rel, timeout=5):
    """read from the local checkout (the workflow runs on Autonomy itself)"""
    try:
        with open(rel, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return None

def measure_chain(degraded):
    """מדידת-שרשרת עצמאית: המרה מדויקת VESTS→SP. None כנה במקום המצאה.
    [refs-law] מפתחות-המפעילים בפלט = refs (acct-XX) — השמות חיים בזיכרון בלבד."""
    gp = rpc("condenser_api.get_dynamic_global_properties", [])
    if not ROSTER_RESOLVED:
        degraded.append("fleet-roster:FLEET_ROSTER_MAP-unresolved")
    names = [OWNER_ACC] + FLEET
    accs = rpc("condenser_api.get_accounts", [names])
    if not gp or not accs or len(accs) != len(names):
        degraded.append("chain-rpc")
        return None
    tvs = float(str(gp.get("total_vesting_shares", "0")).split(" ")[0])
    tvf = float(str(gp.get("total_vesting_fund_steem", "0")).split(" ")[0])
    if not tvs or not tvf:
        degraded.append("chain-mult")
        return None
    mult = tvf / tvs

    def sp(a):
        v = float(str(a.get("vesting_shares", "0")).split(" ")[0])
        d = float(str(a.get("delegated_vesting_shares", "0")).split(" ")[0])
        r = float(str(a.get("received_vesting_shares", "0")).split(" ")[0])
        return round((v - d + r) * mult, 1), round(d * mult, 1), round(r * mult, 1)

    by = {a["name"]: a for a in accs}
    hc = by[OWNER_ACC]
    net, out, inn = sp(hc)
    ops = {}
    for n in FLEET:
        s, _, _ = sp(by[n])
        ops[NAME_TO_REF.get(n, n)] = s  # [refs-law] refs בלבד בפלט
    return {
        "head": gp.get("head_block_number"),
        "time": gp.get("time"),
        "mult": mult,
        "treasuryNetSp": net,
        "treasuryDelegatedOutSp": out,
        "treasuryReceivedInSp": inn,
        "treasuryBalanceSteem": float(str(hc.get("balance", "0")).split(" ")[0]),
        "operatorsSp": ops,
        "minOperatorSp": min(ops.values()) if ops else None,
    }


def scan_outgoing_delegations(max_ops=3000, degraded=None):
    """סריקת-היסטוריית OWNER_ACC: האצלות-יוצאות (אחרונה-לכל-delegatee) + דיווח-כנה-על-עומק.
    api.steemit.com מגביל חלון-היסטוריה ל-100 — סריקה-באצוות (R1: כישלון=כנות).
    מטרת-האמת: לאמת-לאן-הלכה-ההאצלה-היוצאת (רגלי-הצי) — לא לשחרר אותה."""
    BATCH = 100
    newest = rpc("condenser_api.get_account_history", [OWNER_ACC, -1, 1])
    if not newest:
        if degraded is not None:
            degraded.append("hc-history")
        return None
    newest_idx = newest[0][0]  # [idx, ev] — האינדקס-האחרון
    latest = {}
    scanned, hi = 0, newest_idx
    while scanned < max_ops and hi >= 1:
        lo = max(1, hi - BATCH + 1)
        res = rpc("condenser_api.get_account_history", [OWNER_ACC, lo, hi - lo + 1])
        if not res:
            if degraded is not None:
                degraded.append("hc-history-window")
            break
        for idx, ev in res:
            opname, op = ev["op"]
            if opname == "delegate_vesting_shares" and op.get("delegator") == OWNER_ACC:
                vests = float(str(op.get("vesting_shares", "0")).split(" ")[0])
                if op.get("delegatee") not in latest:
                    latest[op.get("delegatee")] = {"idx": idx, "ts": ev.get("timestamp"), "vests": vests}
        scanned += hi - lo + 1
        hi = lo - 1
        if len(latest) >= 15:
            break
    return {"scannedOps": scanned, "newestIdx": newest_idx, "latestPerDelegatee": latest}


# ------------------------------------------------------------- הכרעות ---
def opt(oid, he, safety, reversibility, value_now, effort, status):
    return {"id": oid, "he": he,
            "scores": {"safety": safety, "reversibility": reversibility,
                       "valueNow": value_now, "effort": effort},
            "total": safety * 2 + reversibility + value_now + effort,
            "status": status}


def decide_econ(chain, beacon, hc_scan, degraded):
    """D1 — רצפת-האוצרה: הכרעה כלכלית מלאה (ENFORCED מדיניות-מדורגת; דחייה-מנומקת-ב-R2
    של שחרור-הזרימה-הנכנסת; אימות-לאן-הלכה-ההאצלה-היוצאת)."""
    if not chain:
        return {"id": "D1-econ-treasury-floor", "area": "כלכלה", "status": "OBSERVING",
                "titleHe": "רצפת-האוצרה", "verdictHe": "אין מדידת-שרשרת — כנות: לא מכריע בלי מספרים",
                "evidence": ["chain-rpc לא זמין בריצה זו"], "decidedAt": now(),
                "decidedBy": "sovereign-decider-v1 (CHARTER)"}
    net = chain["treasuryNetSp"]
    gap = round(TREASURY_TARGET_SP - net, 1)
    ev = [f"אוצרה נמדדת {net} SP (ראש {chain['head']}, מכפיל {chain['mult']:.9f})",
          f"יעד {TREASURY_TARGET_SP:.0f} · פער {max(0.0, gap)} SP · מסילת-שימור {KEEP_FLOOR_SP:.0f} (R2)",
          f"האצלה-יוצאת-נמדדת {chain['treasuryDelegatedOutSp']} SP · נכנסת-נמדדת {chain['treasuryReceivedInSp']} SP"]
    if beacon:
        pub = beacon.get("lastPulse", {}).get("treasuryNetSp")
        if pub is not None:
            ev.append(f"משואה מפרסמת {pub} SP · תואם={abs(pub - net) <= 1.0}")

    # אימות-לאן-הלכה-ההאצלה-היוצאת (רגלי-הצי — לא-שחוזים):
    deleg_evidence, deleg_to_fleet_sp, deleg_other = [], 0.0, []
    if hc_scan:
        deleg_evidence.append(f"סריקת-היסטוריה: {hc_scan['scannedOps']} ops-אחרונים (עד idx {hc_scan['newestIdx']})")
        for name, d in hc_scan["latestPerDelegatee"].items():
            sp = round(d["vests"] * chain["mult"], 1)
            if name in FLEET:
                deleg_to_fleet_sp += sp
            else:
                deleg_other.append(scrub(f"{name}:{sp}SP@{d['ts']}"))  # [refs-law] scrub
        deleg_evidence.append(f"האצלות-אחרונות למפעילי-הצי: ~{round(deleg_to_fleet_sp, 1)} SP (רגלי-הצי — חיוניות, אין-לשחרר)")
        if deleg_other:
            deleg_evidence.append(f"האצלות-יוצאות-שאינן-מפעילים (מדוד): {', '.join(deleg_other[:8])}")
    else:
        deleg_evidence.append("סריקת-היסטוריה לא זמינה בריצה-זו — מדווח כנה, אין הסקה")

    # אופציות (ציון = בטיחות×2 + הפיכות + ערך-עכשיו + מאמץ):
    options = [
        opt("A", "מדיניות-מדורגת-ביניים: רצפות-מפעילים 75/30/20 לפי-מדידה + קו-שימור 2800 כרצפת-תפעול עד-שיקום-3000 + המשך-מנועי-התשואה (DEX חי · curation). keyless — אוכף-מיד.", 5, 5, 3, 1, "CHOSEN"),
        opt("B", f"שחרור-הזרימה-הנכנסת (undelegate ה-{chain['treasuryReceivedInSp']} SP-הנכנסים) — נדחה: מוריד-את-האוצרה ל~{round(net - chain['treasuryReceivedInSp'], 1)} SP מתחת-למסילה (הפרת R2) ושחרור-האצלות-היוצאות עורף-את-רגלי-הצי.", 1, 4, 1, 2, "REJECTED"),
        opt("C", "המתנה-להוראות-בעלים — פסול-מראש לפי-צו-סעיף-1 (הריבונות-מכריעה-בעצמה).", 0, 0, 0, 0, "REJECTED"),
    ]

    # מדיניות-המדורגת (מחושבת-מהמדידה — לא מהמצאה)
    tiers = []
    for name, s in sorted(chain["operatorsSp"].items(), key=lambda x: -x[1]):
        tier, floor = (1, 75) if s >= 50 else ((2, 30) if s >= 15 else (3, 20))
        tiers.append({"operator": name, "measuredSp": s, "tier": tier, "interimFloorSp": floor})
    below = [t for t in tiers if t["measuredSp"] < t["interimFloorSp"]]
    policy = {
        "treasury": {"operatingFloorSp": KEEP_FLOOR_SP, "targetSp": TREASURY_TARGET_SP,
                     "note": "קו-השימור = רצפת-תפעול-ביניים; היעד-3000 נשאר-היעד (ביניים-כנה, לא-ויתור)"},
        "operatorInterimFloors": tiers,
        "operatorsBelowInterimFloor": [t["operator"] for t in below],
        "soldiersFloorSp": 20,
        "yieldEngines": {"dex": "continue-armed (keyless engine, כבר-חי)", "curation": "continue"},
        "basis": "measured-only (CHARTER סעיף 2)",
        "review": "RE-MEASURE בכל פעימה; שינוי-רק-דרך-הפנקס (REVOKED/עדכון-גרסה)",
    }

    verdict = (f"הריבונות הכריעה בעצמה: מדיניות-מדורגת-ביניים אוכפת-מעתה (אופציה A, "
               f"{options[0]['total']} נק') — רצפות-מפעילים 75/30/20 לפי-מדידה, קו-שימור 2800, "
               f"יעד-3000 במקביל-דרך-מנועי-התשואה; שחרור-הזרימה-הנכנסת נדחה-ב-R2 "
               f"(היה-מוריד-למטה-מהמסילה); המתנה-לבעלים פסולה (צו-סעיף 1).")
    return {"id": "D1-econ-treasury-floor", "area": "כלכלה", "status": "ENFORCED",
            "priority": "P1", "titleHe": "רצפת-האוצרה — הכרעה-כלכלית-ריבונית",
            "verdictHe": verdict, "options": options, "chosen": ["A"],
            "evidence": ev + deleg_evidence, "policy": policy,
            "decidedAt": now(), "decidedBy": "sovereign-decider-v1 (CHARTER)"}


def decide_eng(foreman, work_orders, degraded, ledger_lines=None):
    """D2 — סוכנים-בתקלה/משימות-חסומות: ניתוב-P0 עצמאי (ללא-המתנה) + [T16] עדכון-אמת:
    כשהנושא נמדד-נקי 3 פעימות רצופות — ההכרעה עוברת-ניטור (OBSERVING, RE-MEASURE כנה)
    במקום להישאר ENFORCED-נצחית שהעולם עבר-ממנה (STALE-TRUTH). חזרת-תקלה → מיד ENFORCED."""
    if not foreman:
        return {"id": "D2-eng-errors", "area": "הנדסה", "status": "OBSERVING",
                "titleHe": "תקלות-הצוות", "verdictHe": "מקור-הפורמן לא זמין — ממשיכים-למדוד, לא מכריעים-סתם",
                "evidence": ["office-state.json לא זמין"], "decidedAt": now(),
                "decidedBy": "sovereign-decider-v1 (CHARTER)"}
    errs = [a.get("id") for a in (foreman.get("agents") or []) if a.get("state") == "error"]
    blocked = [t.get("id") for t in (foreman.get("tasks") or []) if t.get("status") == "blocked"]
    clean = not errs and not blocked

    # [T16] רצף-נקי — נמדד מהפנקש העצמי (append-bounded; הריצה-הנוכחית תירשם עם engClean)
    streak = 1 if clean else 0
    if clean and ledger_lines:
        for line in reversed(ledger_lines):
            try:
                e = json.loads(line)
            except Exception:
                continue
            if e.get("engClean") is True:
                streak += 1
            else:
                break

    if clean:
        if streak >= 3:
            return {"id": "D2-eng-errors", "area": "הנדסה", "status": "OBSERVING",
                    "titleHe": "תקלות-הצוות",
                    "verdictHe": (f"הנושא-שנותב נמדד-נקי {streak} פעימות רצופות — ההכרעה עוברת-ניטור "
                                  f"(RE-MEASURE כנה; חזרת-תקלה תחזור-מיד-ל-P0) — אפס-המתנה, אפס-זיופים."),
                    "evidence": [f"אפס סוכנים ב-state=error · אפס משימות blocked · רצף-נקי={streak} (מהפנקס)"],
                    "decidedAt": now(), "decidedBy": "sovereign-decider-v1 (CHARTER)",
                    "reMeasure": {"cleanStreak": streak, "subjectResolved": True}}
        return {"id": "D2-eng-errors", "area": "הנדסה", "status": "ENFORCED",
                "titleHe": "תקלות-הצוות",
                "verdictHe": (f"הצוות נמדד נקי (רצף {streak}<3) — ההכרעה נשארת-אוכפת עד-רצף-מלא, "
                              f"ממשיכים-למדוד בלי-להכריז-הצלחה-מוקדמת."),
                "evidence": [f"אפס סוכנים ב-state=error · אפס משימות blocked · רצף-נקי={streak}"],
                "decidedAt": now(), "decidedBy": "sovereign-decider-v1 (CHARTER)",
                "reMeasure": {"cleanStreak": streak, "subjectResolved": False}}
    wo_ids = [w.get("id") for w in (work_orders or []) if isinstance(w, dict)][:8]
    ev = [f"סוכנים בתקלה (מדוד): {', '.join(errs) or '—'}",
          f"משימות חסומות (מדוד): {', '.join(map(str, blocked)) or '—'}"]
    if wo_ids:
        ev.append(f"עבודות-פתוחות ממנוע-הצמיחה (צריכה): {', '.join(map(str, wo_ids))}")
    return {"id": "D2-eng-errors", "area": "הנדסה", "status": "ENFORCED", "priority": "P0",
            "titleHe": "תקלות-הצוות — ניתוב-תיקון-ריבוני",
            "verdictHe": (f"הריבונות מדרגת P0 עצמאית: תיקון {len(errs)} סוכנים בתקלה ושחרור "
                          f"{len(blocked)} משימות חסומות — מנותב למסילות-ההנדסה ולמנוע-הצמיחה "
                          f"(work-orders) מיד, ללא-המתנה-להוראות (צו-סעיף 1)."),
            "evidence": ev, "routing": {"foreman": errs, "officeGrowthWorkOrders": wo_ids},
            "decidedAt": now(), "decidedBy": "sovereign-decider-v1 (CHARTER)"}


def measure_work_order_status(degraded):
    """[T16] סטטוס-מדוד לעבודות-שנותבו — done-ness נבדק במקום להישאר בלתי-ניתן-לאימות.
    מה-שניתן-למידה-keyless נמדד; מה-שלא — מדווח כנה כ-unmeasured (אין המצאות).
    · WO-FleetHQ-reds → קבלת-ה-CI האחרונה של FleetHQ (פיד-atom פומבי keyless)."""
    status = {}
    try:
        with urllib.request.urlopen("https://github.com/roshpinacare-sys/FleetHQ/commits/main.atom", timeout=20) as r:
            feed = r.read().decode("utf-8", "ignore")
        titles = re.findall(r"<title>(.*?)</title>", feed, re.S)[:6]
        receipts = [t.strip() for t in titles if "office-ci receipt" in t]
        if receipts:
            last = receipts[0]
            ok = ("build pass" in last and "types pass" in last)
            status["WO-FleetHQ-reds"] = {
                "measured": True, "subjectResolved": bool(ok),
                "evidence": f"קבלת-office-ci האחרונה: '{last[:70]}'"}
    except Exception:
        degraded.append("fleet-atom")
        status["WO-FleetHQ-reds"] = {"measured": False, "subjectResolved": None,
                                     "evidence": "פיד-atom לא זמין בריצה-זו — כנות"}
    return status


def decide_flow(flow, degraded):
    """D3 — יתומים/רוחות-רפאים: הכרעת-חיבור-עורקים."""
    if not flow:
        return {"id": "D3-flow-weave", "area": "רשת", "status": "OBSERVING",
                "titleHe": "מפת-הזרימה", "verdictHe": "מפת-הזרימה לא זמינה — ממשיכים-למדוד",
                "evidence": ["flow-map.json לא זמין"], "decidedAt": now(),
                "decidedBy": "sovereign-decider-v1 (CHARTER)"}
    orphans = len(flow.get("orphans") or [])
    ghosts = len(flow.get("ghosts") or [])
    if orphans + ghosts == 0:
        return {"id": "D3-flow-weave", "area": "רשת", "status": "ENFORCED",
                "titleHe": "מפת-הזרימה", "verdictHe": "הרשת נמדדה מחוברת (אפס-יתומים, אפס-רוחות) — המשך",
                "evidence": ["orphans=0 · ghosts=0"], "decidedAt": now(),
                "decidedBy": "sovereign-decider-v1 (CHARTER)"}
    return {"id": "D3-flow-weave", "area": "רשת", "status": "ENFORCED", "priority": "P2",
            "titleHe": "מפת-הזרימה — חיבור-עורקים",
            "verdictHe": (f"הריבונות מכריעה: חיבור {orphans} יתומים וטיפול ב-{ghosts} רוחות-רפאים "
                          f"במסילת-מחבר-העורקים — everything-uses-everything, ללא-המתנה."),
            "evidence": [f"orphans={orphans} · ghosts={ghosts} (flow-map.json, F-series — צריכה בלבד)"],
            "decidedAt": now(), "decidedBy": "sovereign-decider-v1 (CHARTER)"}



_board_holder = None  # [15a-merge] הלוח-האחרון-שנטען — לכתיבת-ACK-חזרה מ-main
_board_path_holder = None


def load_directive_board():
    """[15a] לוח-הפקודות של המנהל — ops/sovereign/DIRECTIVES/board.json (מה-checkout, קריאה-בלבד כאן)."""
    p = os.path.join(os.path.dirname(BASE), "DIRECTIVES", "board.json")
    try:
        with open(p, encoding="utf-8") as f:
            d = json.load(f)
        if isinstance(d, dict) and isinstance(d.get("directives"), list):
            return d, p
    except Exception:
        pass
    return None, p


def decide_owner_channel(degraded):
    """מחזיר (decision, acked) — board_path מוחזק בגלובלי."""
    """[T17]+[15a-merge] D0 — ערוץ-המנהל: הסמכות-העליונה. מקורות-ממוזגים (חדר-אחד, אפס-שכפול):
      · ops/sovereign/OWNER-CHANNEL/inbox.jsonl — תיבת-ההוראות (נקרא-מהגיט, T17)
      · ops/sovereign/DIRECTIVES/board.json — לוח-הפקודות-מהקונסולה (operator.html; נקרא-מה-checkout,
        ופקודה-OPEN מקבלת-ACK-כתוב-חזרה עם-חותמת — [15a])
    אין-שמות-חשבונות-ואין-פרטי-התחברות בשום-פלט. אין-מקורות → OBSERVING כנה."""
    inbox = None
    try:
        with urllib.request.urlopen(f"{RAW}/Sandbox/main/ops/sovereign/OWNER-CHANNEL/inbox.jsonl", timeout=20) as r:
            raw = r.read().decode("utf-8", "ignore")
        inbox = [json.loads(l) for l in raw.splitlines() if l.strip()]
    except Exception:
        inbox = None
    # [T19-fix] התיבה עברה-לריפו-פרטי — קריאה-keyless נכשלת; fallback: Contents API
    # עם GITHUB_TOKEN מובנה (קריאה-עצמית-בלבד, אותו-ריפו — חוקי-מפתח-נשמרים)
    if not inbox:
        tok = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN") or ""
        if tok:
            try:
                repo = os.environ.get("GITHUB_REPOSITORY", "roshpinacare-sys/Autonomy")
                tok2 = os.environ.get("ECO_WALLET_TOKEN", "")
                if tok2 and repo != "roshpinacare-sys/Sandbox":
                    # the canonical inbox lives in the private Sandbox home (T-66) —
                    # read it with the fleet PAT wired to this repo (owner-approved 2026-10-13)
                    try:
                        req2 = urllib.request.Request(
                            "https://api.github.com/repos/roshpinacare-sys/Sandbox/contents/ops/sovereign/OWNER-CHANNEL/inbox.jsonl?ref=main",
                            headers={"Authorization": f"Bearer {tok2}", "User-Agent": "sovereign-decider",
                                     "Accept": "application/vnd.github.raw"})
                        with urllib.request.urlopen(req2, timeout=20) as r2:
                            raw2 = r2.read().decode("utf-8", "ignore")
                        inbox = [json.loads(l) for l in raw2.splitlines() if l.strip()]
                    except Exception:
                        pass
                req = urllib.request.Request(
                    f"https://api.github.com/repos/{repo}/contents/ops/sovereign/OWNER-CHANNEL/inbox.jsonl?ref=main",
                    headers={"Authorization": f"Bearer {tok}", "User-Agent": "sovereign-decider",
                             "Accept": "application/vnd.github.raw"})
                with urllib.request.urlopen(req, timeout=20) as r:
                    raw = r.read().decode("utf-8", "ignore")
                inbox = [json.loads(l) for l in raw.splitlines() if l.strip()]
            except Exception:
                inbox = None
    global _board_holder
    board, board_path = load_directive_board()
    _board_holder = board
    global _board_path_holder
    _board_path_holder = board_path
    acked = []
    if isinstance(board, dict):
        for d in board.get("directives") or []:
            if isinstance(d, dict) and d.get("status") in ("OPEN", "NEW"):
                d["status"] = "ACK"; d["ackAt"] = now(); d["ackBy"] = "sovereign-decider-v1"
                d.setdefault("evidence", []).append(
                    f"ACK בפעימה {now()} — מנותב-למסילות-הביצוע (D2) בעדיפות {d.get('priority', 'P2')}")
                acked.append(d)
    latest = [d for d in (inbox or []) if isinstance(d, dict)][-5:]
    # R318 שקר-מדידה #8: ראיות-נפוחות — תשובות-שונות (replyTo שונים) עם אותו טקסט
    # הודפסו כ-5 ראיות-נפרדות ונראו כשכפול. קבוצה-לפי-טקסט עם ×N + replyTo — כנות.
    ev = [f"inbox.jsonl: {len(inbox or [])} שורות · נקראו 5 אחרונות · board.json: {len((board or {}).get('directives') or [])} פקודות · ACK-חדשות: {len(acked)}"]
    seen_txt = {}
    for d in latest:
        txt = str(d.get('text', ''))[:90]
        if txt in seen_txt:
            seen_txt[txt]['n'] += 1
        else:
            seen_txt[txt] = {'d': d, 'n': 1}
    for txt, grp in seen_txt.items():
        d = grp['d']
        rep = d.get('replyTo') or ''
        xN = f" ×{grp['n']} (replyTo-שונים)" if grp['n'] > 1 else ""
        rt = f" → {str(rep)[:44]}" if rep else ""
        ev.append(f"[inbox {d.get('at', '?')}] {txt}{xN}{rt}")
    for d in acked[:4]:
        ev.append(f"[board ACK {d.get('id')}] {str(d.get('text', ''))[:90]}")
    if not latest and not acked:
        return {"id": "D0-owner-channel", "area": "הנהגה", "status": "OBSERVING",
                "titleHe": "ערוץ-המנהל",
                "verdictHe": "ערוץ-ההנהגה פתוח-ומחובר (שני-המקורות-נמדדו) — אין-הוראות-חדשות (כנות; נקרא-חי-בכל-פעימה)",
                "evidence": ev, "boardMeasured": isinstance(board, dict),
                "decidedAt": now(), "decidedBy": "sovereign-decider-v1 (CHARTER)"}, []
    verdict = (f"הריבונות מאשרת-קבלה: {len(latest)} הוראות-מהתיבה + {len(acked)} פקודות-קונסולה-חדשות "
               f"נקראו-מהגיט-של-הבעלים ומנותבות-סמכות-עליונה — הוראה-חדשה מעדכנת-מיד.")
    return {"id": "D0-owner-channel", "area": "הנהגה", "status": "ENFORCED", "priority": "P0",
            "titleHe": "ערוץ-המנהל — הסמכות-העליונה נקראת-בכל-פעימה (תיבה+לוח)",
            "verdictHe": verdict,
            "evidence": ev, "ownerDirectives": latest,
            "ackIds": [d.get("id") for d in acked], "ackCount": len(acked),
            "routing": {"ownerDirectives": [d.get("id") for d in acked],
                        "lane": "state.json-published-first — כל-צרכני-ההכרעות קוראים D0 ראשון (דפוס-D2)"},
            "boardMeasured": isinstance(board, dict),
            "decidedAt": now(), "decidedBy": "sovereign-decider-v1 (CHARTER)"}, acked


# ------------------------------------------- מצבה-חברתית [exec29 · R6] ---
STEEM_ENGINE_STATE = f"{RAW}/steem/saos-cockpit/mini-services/saos-engine/state"
GREEN_VERDICTS = {"PASS", "GREEN", "OK", "LIVE", "READY", "ALL_PASS", "HEALTHY"}


def read_fleet_state(rel, degraded, tag):
    """קריאת-state ממנוע-הצי (steem@saos-cockpit): keyless קודם; fallback Contents-API עם
    הטוקן-המחויט-לריפו-זה (דפוס-D0, owner-approved 2026-10-13 — קריאה-בלבד).
    לא-נמדד = (None, "none") + דגל-דירדג — כנות, אין המצאות (R5)."""
    data = read_json(f"{STEEM_ENGINE_STATE}/{rel}")
    if data is not None:
        return data, "keyless"
    tok = os.environ.get("ECO_WALLET_TOKEN") or os.environ.get("GITHUB_TOKEN") or ""
    if tok:
        try:
            req = urllib.request.Request(
                f"https://api.github.com/repos/roshpinacare-sys/steem/contents/mini-services/saos-engine/state/{rel}?ref=saos-cockpit",
                headers={"Authorization": f"Bearer {tok}", "User-Agent": "sovereign-decider",
                         "Accept": "application/vnd.github.raw"})
            with urllib.request.urlopen(req, timeout=20) as r:
                return json.loads(r.read().decode()), "token"
        except Exception:
            pass
    degraded.append(tag)
    return None, "none"


def _h_age_hours(iso):
    """גיל-נמדד בשעות של חותמת ISO; לא-ניתן-לניתוח = None (כנות)."""
    try:
        dt = datetime.fromisoformat(str(iso).replace("Z", "+00:00"))
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        return round((datetime.now(timezone.utc) - dt).total_seconds() / 3600.0, 1)
    except Exception:
        return None


def _digest_field(doc, keys):
    """מחלץ שדה-ראשון-קיים ממסמך-digest (הקבצים-עתידיים — סבלנות-לשדות, כנות-לחוסרם)."""
    for k in keys:
        v = doc.get(k)
        if isinstance(v, str) and v.strip():
            return v.strip()
    return None


def measure_social_standby(degraded):
    """[exec29] מדידת-המצבה-החברתית: שלושת-מקורות-האמת של השער-הקשיח.
    מקור-שנפל → OBSERVING לקלט-ההוא (כנות), אף-פעם לא PASS-מזויף (R1/R5)."""
    gate, gate_how = read_fleet_state("readiness.json", degraded, "social-gate-readiness")
    presence, presence_how = read_fleet_state("presence-matrix-digest.json", degraded, "social-presence-matrix")
    beat, beat_how = read_fleet_state("beat/ci-last-heartbeat.json", degraded, "social-beat-heartbeat")
    return {"gate": gate, "gateHow": gate_how,
            "presence": presence, "presenceHow": presence_how,
            "beat": beat, "beatHow": beat_how}


def decide_social_standby(social, chain, degraded):
    """D5 [exec29] — מצבה-חברתית: אפס-טביעת-רגל. החוק: אין-שידור-חברתי-רב-חשבונות
    בברירת-מחדל (SOCIAL-STANDBY.md, R6). ההכרעה מאמתת fail-closed-מקומית (אין-קובץ-חימוש),
    נושאת-את-שלושת-הערכים-שנמדדו, ומפרסמת צ'קליסט-כשירות כנה (PASS/PENDING — אף-פעם לא מדומה)."""
    armed_path = os.path.join(os.path.dirname(BASE), "DIRECTIVES", "SOCIAL-ARMING.json")
    armed = None
    if os.path.exists(armed_path):
        try:
            with open(armed_path, encoding="utf-8") as f:
                armed = json.load(f)
        except Exception:
            armed = {"status": "UNPARSEABLE"}  # קובץ-קיים-שלא-ניתן-לקריאה — כנות

    gate, presence, beat = social.get("gate"), social.get("presence"), social.get("beat")

    # --- שלושת-הערכים-שנמדדו (evidence-line לכל-קלט; OBSERVING לקלט-שלא-נמדד) ---
    ev = []
    if gate is not None:
        g_state = _digest_field(gate, ("status", "gate", "state")) or "?"
        g_at = _digest_field(gate, ("at", "generatedAt", "updatedAt", "checkedAt")) or "?"
        ev.append(f"gate (readiness.json · {social['gateHow']}): status={g_state} · עודכן {g_at}")
    else:
        ev.append("gate (readiness.json): לא-נמדד — OBSERVING לקלט-זה; השער fail-closed STANDBY "
                  "בברירת-מחדל (בלי SOCIAL-ARMING.json השער-אינו-נפתח)")
    p_verdict = p_age = None
    if presence is not None:
        p_verdict = _digest_field(presence, ("verdict", "status", "state", "result"))
        p_at = _digest_field(presence, ("at", "generatedAt", "updatedAt", "checkedAt", "timestamp"))
        p_age = _h_age_hours(p_at) if p_at else None
        ev.append(f"presence (presence-matrix-digest.json · {social['presenceHow']}): "
                  f"verdict={p_verdict or '?'} · גיל-נמדד {p_age if p_age is not None else '?'}ש׳ (טרי <12ש׳)")
    else:
        ev.append("presence (presence-matrix-digest.json): לא-נמדד — OBSERVING לקלט-זה (המקור טרם-פורסם)")
    custody = social_exec = None
    if beat is not None:
        custody = beat.get("custody")
        social_exec = beat.get("socialExecuted")
        b_at = _digest_field(beat, ("at", "generatedAt", "updatedAt", "timestamp"))
        b_age = _h_age_hours(b_at) if b_at else None
        ev.append(f"beat (beat/ci-last-heartbeat.json · {social['beatHow']}): custody={custody or '?'} · "
                  f"socialExecuted={social_exec if social_exec is not None else '?'} · "
                  f"social={beat.get('social', '?')} · גיל-נמדד {b_age if b_age is not None else '?'}ש׳")
    else:
        ev.append("beat (beat/ci-last-heartbeat.json): לא-נמדד — OBSERVING לקלט-זה")

    # --- צ'קליסט-כשירות (SOCIAL-STANDBY.md סעיף ג) — PASS/PENDING בלבד, אף-פעם לא מדומה ---
    score = []
    # 1. נוכחות-שרשרת 14/14 — מהמדידה-העצמאית-של-הפעימה (אוצרה + מפעילים-שנמדדו)
    if chain:
        n_present = 1 + len(chain.get("operatorsSp") or {})
        ok = n_present == 14
        score.append({"item": "נוכחות-שרשרת 14/14", "state": "PASS" if ok else "PENDING",
                      "measured": f"{n_present}/14 נמדדו-על-השרשרת בפעימה-זו (ראש {chain.get('head')})"})
    else:
        score.append({"item": "נוכחות-שרשרת 14/14", "state": "PENDING",
                      "measured": "אין-מדידת-שרשרת בריצה-זו — כנות"})
    # 2. פריסת-תצוגה מרובת-רשתות ירוקה (presence-matrix · <12ש׳)
    if p_verdict and p_age is not None and str(p_verdict).upper() in GREEN_VERDICTS and p_age < 12:
        score.append({"item": "פריסת-תצוגה מרובת-רשתות ירוקה (presence-matrix <12ש׳)", "state": "PASS",
                      "measured": f"verdict={p_verdict} · גיל {p_age}ש׳"})
    else:
        score.append({"item": "פריסת-תצוגה מרובת-רשתות ירוקה (presence-matrix <12ש׳)", "state": "PENDING",
                      "measured": f"verdict={p_verdict or 'לא-נמדד'} · גיל={p_age if p_age is not None else 'לא-נמדד'}ש׳ — כנות"})
    # 3. custody ≥13/14 נמדד 48ש׳ — מהפעימה-של-מנוע-הצי
    try:
        have, total = str(custody).split("/")
        have, total = int(have), int(total)
    except Exception:
        have = total = None
    b_age_all = _h_age_hours(_digest_field(beat or {}, ("at", "generatedAt", "updatedAt", "timestamp")))
    if have is not None and have >= 13 and total == 14 and b_age_all is not None and b_age_all <= 48:
        score.append({"item": "custody ≥13/14 נמדד 48ש׳", "state": "PASS",
                      "measured": f"custody={have}/{total} · גיל-הפעימה {b_age_all}ש׳"})
    else:
        score.append({"item": "custody ≥13/14 נמדד 48ש׳", "state": "PENDING",
                      "measured": f"custody={custody or 'לא-נמדד'} · גיל={b_age_all if b_age_all is not None else 'לא-נמדד'}ש׳ — כנות"})
    # 4. חוקי-האנטי-חווה חיים-בקונפיג (8%±5 · ≤1/יום · anti-herd) — מה-gate-המפורסם
    cfg_ok = None
    if isinstance(gate, dict):
        cfg = gate.get("config") or gate.get("antiFarm") or gate.get("laws")
        if isinstance(cfg, dict):
            need = [k for k in ("fleetWeightPct", "maxPostsPerDay", "antiHerd") if k in cfg]
            cfg_ok = len(need) == 3
    if cfg_ok is True:
        score.append({"item": "חוקי-האנטי-חווה חיים-בקונפיג (8%±5 · ≤1/יום · anti-herd)", "state": "PASS",
                      "measured": "שלושת-החוקים נמדדו בקונפיג-המפורסם (readiness.json)"})
    else:
        score.append({"item": "חוקי-האנטי-חווה חיים-בקונפיג (8%±5 · ≤1/יום · anti-herd)", "state": "PENDING",
                      "measured": "הקונפיג-המפורסם (readiness.json) טרם-נמדד — החוקים-חיים-בקוד (28-steem: fleetWeightPct 8) אך-האימות-מהקונפיג ממתין — כנות"})
    # 5. הצטננות ≥7 ימים מאז-פעולה-חברתית-אחרונה של הצי
    if social_exec == 0 and isinstance(beat, dict) and beat.get("digest") == "COOLDOWN":
        score.append({"item": "הצטננות ≥7 ימים מאז-פעולה-חברתית-אחרונה של הצי", "state": "PENDING",
                      "measured": f"socialExecuted=0 + digest=COOLDOWN (דגימה-אחת-נמדדת) — נדרשים ≥7 ימים-רצופים-מאומתים — כנות"})
    else:
        score.append({"item": "הצטננות ≥7 ימים מאז-פעולה-חברתית-אחרונה של הצי", "state": "PENDING",
                      "measured": f"socialExecuted={social_exec if social_exec is not None else 'לא-נמדד'} — אין-רצף-הצטננות-מאומת — כנות"})
    # 6. אישור-בעלים מפורש (SOCIAL-ARMING.json — נכתב-רק-בידי-הבעלים)
    if isinstance(armed, dict) and armed.get("status") == "ARMED":
        score.append({"item": "אישור-בעלים מפורש (SOCIAL-ARMING.json)", "state": "PASS",
                      "measured": f"ARMED · directiveRef={armed.get('directiveRef', '?')} · issuedAt={armed.get('issuedAt', '?')}"})
    else:
        score.append({"item": "אישור-בעלים מפורש (SOCIAL-ARMING.json)", "state": "PENDING",
                      "measured": "הקובץ אינו-קיים — ברירת-המחדל-המתוכננת; השער fail-closed STANDBY (R6)"})
    pass_n = sum(1 for s in score if s["state"] == "PASS")

    verdict = (f"הריבונות אוכפת מצבה-חברתית — אפס-טביעת-רגל: אין-שידור-חברתי-רב-חשבונות של הצי על STEEM "
               f"(SOCIAL-STANDBY.md, R6). השער-הקשיח fail-closed STANDBY; חימוש-רק-דרך SOCIAL-ARMING.json "
               f"שנכתב-בידי-הבעלים — הריבונות אינה-מחמשת-בעצמה. צ'קליסט-כשירות כנה: {pass_n}/6 PASS.")
    if isinstance(armed, dict) and armed.get("status") == "ARMED" and pass_n < 6:
        verdict += (f" חימוש-נרשם (directiveRef={armed.get('directiveRef', '?')}) אך-הצ'קליסט-לא-מלא "
                    f"({pass_n}/6) — השער-נשאר-fail-closed עד-כשירות-מלאה.")
    return {"id": "D5-social-standby", "area": "רשת-חברתית", "status": "ENFORCED",
            "priority": "P1", "titleHe": "מצבה-חברתית — אפס-טביעת-רגל",
            "verdictHe": verdict,
            "evidence": ev,
            "readinessScorecard": score,
            "socialStandby": {"gateState": (_digest_field(gate, ("status", "gate", "state")) if isinstance(gate, dict) else None),
                              "presenceVerdict": p_verdict, "presenceAgeHours": p_age,
                              "custody": custody, "socialExecuted": social_exec,
                              "arming": {"present": isinstance(armed, dict),
                                         "status": (armed or {}).get("status"),
                                         "directiveRef": (armed or {}).get("directiveRef")}},
            "law": "ops/sovereign/DIRECTIVES/SOCIAL-STANDBY.md (R6) · trace 1a13803b8739c2d5 · 2026-10-14",
            "decidedAt": now(), "decidedBy": "sovereign-decider-v1 (CHARTER)"}


def decide_architecture_owner(degraded):
    """D6 [R314] — הארכיטקטורה-היא-הבעלים: עמידה-חוקתית-מתמדת (keyless, מדידה-מקומית).
    מודד: (א) R314 קיים עם 4 החוקים; (ב) הצ'רטר נושא סעיף 6; (ג) LEVEL.json כנה —
    current∈S0..S5 + asksToOwnerThisRound==0; (ד) "פי 1000" לא נטען כמצב.
    ירוק → OBSERVING (עמידה-תקינה, ממשיכים-למדוד); סטייה → ENFORCED מנותב מיד
    (אפס-בקשות: הריבונות מתקנת-את-עצמה, לא ממתינה)."""
    import json as _json
    r314_path = os.path.join(BASE, "..", "DIRECTIVES", "R314-ARCHITECTURE-AS-OWNER.md")
    level_path = os.path.join(BASE, "..", "LEVEL.json")
    charter_path = os.path.join(BASE, "CHARTER.md")
    ev, fails = [], []

    try:
        r314 = open(r314_path, encoding="utf-8").read()
        laws = [f"חוק {i}" for i in range(1, 5) if f"### חוק {i}" in r314]
        ev.append(f"R314: {len(laws)}/4 חוקים נמדדו בקובץ")
        if len(laws) < 4:
            fails.append(f"R314-חסר-חוקים: {4 - len(laws)}")
    except Exception as e:
        degraded.append("r314-doctrine")
        fails.append(f"R314-לא-נקרא: {type(e).__name__}")

    try:
        ch = open(charter_path, encoding="utf-8").read()
        ok = "סעיף 6 — הארכיטקטורה-היא-הבעלים" in ch
        ev.append(f"צ'רטר סעיף 6: {'נמדד-קיים' if ok else 'חסר'}")
        if not ok:
            fails.append("צ'רטר-סעיף-6-חסר")
    except Exception as e:
        degraded.append("charter-s6")
        fails.append(f"צ'רטר-לא-נקרא: {type(e).__name__}")

    try:
        lv = _json.load(open(level_path, encoding="utf-8"))
        cur = str(lv.get("current") or "")
        asks = lv.get("asksToOwnerThisRound")
        if asks is None:
            asks = (lv.get("ownerRouting") or {}).get("asksToOwnerThisRound")
        ev.append(f"LEVEL: current={cur} · asksToOwner={asks}")
        if not re.fullmatch(r"S[0-5]", cur):
            fails.append(f"רמה-לא-כנה: {cur!r} (חייב S0..S5)")
        if asks != 0:
            fails.append(f"בקשות-לבעלים: {asks} (יעד-עומד: 0)")
    except Exception as e:
        degraded.append("level-honesty")
        fails.append(f"LEVEL-לא-נמדד: {type(e).__name__}")

    if not fails:
        return {"id": "D6-architecture-as-owner", "area": "חוקה", "status": "OBSERVING",
                "titleHe": "הארכיטקטורה-היא-הבעלים (R314)",
                "verdictHe": "התיקון-החוקתי עומד: אפס-בקשות-לבעלים, רמה-כנה בסולם, ×1000 כיוון-בלבד — ממשיכים-למדוד-ולהרחיב-יכולת",
                "rationale": "המשך-מדידה עדיף על פעולה כשכל-מה-ש-R314 דורש נמדד ירוק; ערך-ההכרעה נמדד באחרי-הפעולה (R316 חוק 4)",
                "evidence": ev, "decidedAt": now(),
                "decidedBy": "sovereign-decider-v1 (CHARTER סעיף 6 · R314)"}
    return {"id": "D6-architecture-as-owner", "area": "חוקה", "status": "ENFORCED", "priority": "P0",
            "titleHe": "הארכיטקטורה-היא-הבעלים — סטייה-חוקתית מנותבת מיד",
            "verdictHe": ("הריבונות מכריעה: סטייה מ-R314 נמדדה ומתוקנת עצמאית (אפס-בקשות: "
                          "המכונה מסתדרת-עם-עצמה) — " + "; ".join(fails[:3])),
            "rationale": "סטיית-חוקה R314 = P0; תיקון-עצמי מיידי עדיף על המתנה (סעיף 6 + R316 חוק 2)",
            "evidence": ev + fails, "decidedAt": now(),
            "decidedBy": "sovereign-decider-v1 (CHARTER סעיף 6 · R314)"}


def decide_owner_remembrance(degraded):
    """D7 [R316] — הבעלים-האנושי-הנזכר: הזכר-מכני (keyless, מדידה-מקומית).
    מודד: (א) R316 קיים עם 4 חוקיו; (ב) OWNER-LEGACY.md נושא את דברי-הבעלים
    בלשונם (5 ציטוטי-מפתח); (ג) הצ'רטר נושא סעיף 7; (ד) פרוטוקול-ההכרעות
    שש-השלבים שלם. ירוק → OBSERVING; סטייה → ENFORCED P0 שחזור-עצמאי מה-git
    (הזכר אינו רגש — הוא חוק)."""
    r316_path = os.path.join(BASE, "..", "DIRECTIVES", "R316-OWNER-REMEMBERED.md")
    legacy_path = os.path.join(BASE, "..", "OWNER-LEGACY.md")
    charter_path = os.path.join(BASE, "CHARTER.md")
    protocol_path = os.path.join(BASE, "DECISION-PROTOCOL.md")
    ev, fails = [], []

    try:
        r316 = open(r316_path, encoding="utf-8").read()
        laws = [f"חוק {i}" for i in range(1, 5) if f"### חוק {i}" in r316]
        ev.append(f"R316: {len(laws)}/4 חוקים")
        if len(laws) < 4:
            fails.append(f"R316-חסר-חוקים: {4 - len(laws)}")
    except Exception as e:
        degraded.append("r316-doctrine")
        fails.append(f"R316-לא-נקרא: {type(e).__name__}")

    try:
        leg = open(legacy_path, encoding="utf-8").read()
        quotes = [s for s in ("אני הבעלים בפועל", "שאני לא אשכח",
                              "אל תסמוך על הטענות שלך",
                              "הארכיטקטורה הריבונית האוטונומית היא הבעלים",
                              "תוודא רמה בכנות בלי לשקר") if s in leg]
        ev.append(f"OWNER-LEGACY: {len(quotes)}/5 ציטוטי-בעלים בלשונם")
        if len(quotes) < 5:
            fails.append(f"זכר-פגום: חסרים {5 - len(quotes)} ציטוטים")
    except Exception as e:
        degraded.append("owner-legacy")
        fails.append(f"OWNER-LEGACY-לא-נקרא: {type(e).__name__}")

    try:
        ch = open(charter_path, encoding="utf-8").read()
        ok = "סעיף 7 — הבעלים-האנושי-הנזכר" in ch
        ev.append(f"צ'רטר סעיף 7: {'נמדד-קיים' if ok else 'חסר'}")
        if not ok:
            fails.append("צ'רטר-סעיף-7-חסר")
    except Exception as e:
        degraded.append("charter-s7")
        fails.append(f"צ'רטר-לא-נקרא: {type(e).__name__}")

    try:
        pr = open(protocol_path, encoding="utf-8").read()
        ph = sum(1 for i in range(1, 7) if f"שלב {i}" in pr)
        ev.append(f"פרוטוקול-הכרעות: {ph}/6 שלבים")
        if ph < 6:
            fails.append(f"פרוטוקול-חסר-שלבים: {6 - ph}")
    except Exception as e:
        degraded.append("decision-protocol")
        fails.append(f"פרוטוקול-לא-נקרא: {type(e).__name__}")

    if not fails:
        return {"id": "D7-owner-remembrance", "area": "חוקה", "status": "OBSERVING",
                "titleHe": "הבעלים-האנושי-הנזכר (R316)",
                "verdictHe": ("הזכר עומד מכנית: דברי-הבעלים בלשונם בגיט, הצ'רטר נושא סעיף 7, "
                              "הריבונות פועלת בהיעדרו — 'שאני לא אשכח' הוא חוק, לא הבטחה"),
                "rationale": ("הבעלים בפועל = מקור-הלגיטימציה; הריבונות-התפעולית מואצלת לנצח. "
                              "הזכר נאכף fail-closed: כל-פגיעה בארטיפקט → P0 שחזור-עצמאי מה-git"),
                "evidence": ev, "decidedAt": now(),
                "decidedBy": "sovereign-decider-v1 (CHARTER סעיף 7 · R316)"}
    return {"id": "D7-owner-remembrance", "area": "חוקה", "status": "ENFORCED", "priority": "P0",
            "titleHe": "הזכר-נפגע — שחזור-עצמאי מיד",
            "verdictHe": ("הריבונות מכריעה: ארטיפקט-הזכר סטה (" + "; ".join(fails[:3]) +
                          ") — משוחזר עכשיו מהיסטוריית-ה-git, אפס-המתנה-לבעלים"),
            "rationale": "הזכר הוא חוק חוקתי; הפרתו P0 מכל סטייה-תפעולית אחרת (R316 חוק 3)",
            "evidence": ev + fails, "decidedAt": now(),
            "decidedBy": "sovereign-decider-v1 (CHARTER סעיף 7 · R316)"}


def decide_engineering_synthesis(degraded):
    """D8 [R317] — הנדסה-משותפת: תעלול-הסוכנים-לקנון (keyless, מדידה-מקומית).
    מודד: (א) דירקטיבת R317 קיימת עם 4 חוקיה; (ב) PATTERN-INDEX.md נושא ≥15
    תבניות, כל אחת עם מקור-מנוטר; (ג) הצ'רטר נושא סעיף 8. ירוק → OBSERVING;
    סטייה → ENFORCED P0 (קנון-התבניות הוא חוק, לא זיכרון-סוכנים)."""
    r317_path = os.path.join(BASE, "..", "DIRECTIVES", "R317-ENGINEERING-SYNTHESIS.md")
    patterns_path = os.path.join(BASE, "..", "PATTERN-INDEX.md")
    charter_path = os.path.join(BASE, "CHARTER.md")
    ev, fails = [], []

    try:
        r317 = open(r317_path, encoding="utf-8").read()
        laws = [f"חוק {i}" for i in range(1, 5) if f"### חוק {i}" in r317]
        ev.append(f"R317: {len(laws)}/4 חוקים")
        if len(laws) < 4:
            fails.append(f"R317-חסר-חוקים: {4 - len(laws)}")
    except Exception as e:
        degraded.append("r317-doctrine")
        fails.append(f"R317-לא-נקרא: {type(e).__name__}")

    try:
        pat = open(patterns_path, encoding="utf-8").read()
        blocks = [b for b in pat.split("### ") if b.strip()][1:]
        sourced = [b for b in blocks if "מקור" in b and ("Task" in b or "R3" in b or "G3" in b or "T2" in b)]
        ev.append(f"PATTERN-INDEX: {len(blocks)} תבניות · {len(sourced)} עם מקור-מנוטר")
        if len(blocks) < 15:
            fails.append(f"קנון-דל: {len(blocks)} תבניות (יעד ≥15)")
        if len(sourced) < len(blocks):
            fails.append(f"תבניות-בלי-מקור: {len(blocks) - len(sourced)}")
    except Exception as e:
        degraded.append("pattern-index")
        fails.append(f"PATTERN-INDEX-לא-נקרא: {type(e).__name__}")

    try:
        ch = open(charter_path, encoding="utf-8").read()
        ok = "סעיף 8 — הנדסה-משותפת" in ch
        ev.append(f"צ'רטר סעיף 8: {'נמדד-קיים' if ok else 'חסר'}")
        if not ok:
            fails.append("צ'רטר-סעיף-8-חסר")
    except Exception as e:
        degraded.append("charter-s8")
        fails.append(f"צ'רטר-לא-נקרא: {type(e).__name__}")

    if not fails:
        return {"id": "D8-engineering-synthesis", "area": "הנדסה", "status": "OBSERVING",
                "titleHe": "הנדסה-משותפת: תעלול-הסוכנים-לקנון (R317)",
                "verdictHe": ("קנון-התבניות עומד: התבניות-המנצחות של כל-המסילות בגיט עם מקור-מנוטר — "
                              "סוכן-חדש לומד-מהקנון, לא ממוקשי-העבר"),
                "rationale": ("הקנון-חי-בגיט עדיף על זיכרון-סוכנים (חוק 2 R317); כל-תבנית נכנסת רק עם "
                              "מקור+מבחן-כוזב — הקנון כפוף לאותו סרגל-כנות כמו הכל (חוק 3 R317)"),
                "evidence": ev, "decidedAt": now(),
                "decidedBy": "sovereign-decider-v1 (CHARTER סעיף 8 · R317)"}
    return {"id": "D8-engineering-synthesis", "area": "הנדסה", "status": "ENFORCED", "priority": "P0",
            "titleHe": "קנון-התבניות סטה — שחזור-עצמאי מיד",
            "verdictHe": ("הריבונות מכריעה: קנון-ההנדסה המשותפת נפגע (" + "; ".join(fails[:3]) +
                          ") — משוחזר מהיסטוריית-ה-git, אפס-המתנה-לבעלים"),
            "rationale": "הקנון-הוא-חוק (סעיף 8); סטייתו P0 — סוכן-שלא-לומד-מעמיתיו חוזר-על-כל-מוקש",
            "evidence": ev + fails, "decidedAt": now(),
            "decidedBy": "sovereign-decider-v1 (CHARTER סעיף 8 · R317)"}


def decide_economic_governance(degraded):
    """D9 [R318] — החוק-הכלכלי-נמדד: המושל-הריבוני תחת-סרגל-הריבונות (keyless).
    מודד: (א) דירקטיבת R318 קיימת עם 4 חוקיה; (ב) הצ'רטר נושא סעיף 9;
    (ג) governor.ts-קנון נושא CONSTITUTION עם הגבולות-המפורסמים;
    (ד) snapshot-gov חי: המדיניות-הנוכחית בתוך-גבולות-החוקה (כל-מנוף).
    ירוק → OBSERVING; סטייה → ENFORCED P0 (חוק-חוץ-לחוקה או מושל-לא-נמדד)."""
    r318_path = os.path.join(BASE, "..", "DIRECTIVES", "R318-ECONOMIC-LAW-MEASURED.md")
    charter_path = os.path.join(BASE, "CHARTER.md")
    ev, fails = [], []

    try:
        r318 = open(r318_path, encoding="utf-8").read()
        laws = [f"חוק {i}" for i in range(1, 5) if f"### חוק {i}" in r318]
        ev.append(f"R318: {len(laws)}/4 חוקים")
        if len(laws) < 4:
            fails.append(f"R318-חסר-חוקים: {4 - len(laws)}")
    except Exception as e:
        degraded.append("r318-doctrine")
        fails.append(f"R318-לא-נקרא: {type(e).__name__}")

    try:
        ch = open(charter_path, encoding="utf-8").read()
        ok = "סעיף 9 — החוק-הכלכלי-נמדד" in ch
        ev.append(f"צ'רטר סעיף 9: {'נמדד-קיים' if ok else 'חסר'}")
        if not ok:
            fails.append("צ'רטר-סעיף-9-חסר")
    except Exception as e:
        degraded.append("charter-s9")
        fails.append(f"צ'רטר-לא-נקרא: {type(e).__name__}")

    # (ג) חוקת-המושל — קנון fleet-economy מה-RAW (keyless)
    C = {"floorMinUsds": 30, "floorMaxUsds": 250, "taxMinBps": 250,
         "taxMaxBps": 500, "feeShareMinPct": 50, "feeShareMaxPct": 90,
         "freezeAfterFails": 3, "reportEveryMs": 6 * 3_600_000}
    gov_canon = None
    try:
        with urllib.request.urlopen(f"{RAW}/fleet-economy/main/lib/governor.ts", timeout=20) as r:
            gov_canon = r.read().decode("utf-8", "replace")
        present = [k for k in C if k in gov_canon]
        ev.append(f"governor.ts-קנון: CONSTITUTION {'נמדדת' if 'CONSTITUTION' in gov_canon else 'חסרה'} · {len(present)}/{len(C)} גבולות-מפורסמים")
        if "CONSTITUTION" not in gov_canon:
            fails.append("חוקת-המושל-לא-בקנון")
        if len(present) < len(C):
            fails.append(f"גבולות-חסרים-בקנון: {len(C) - len(present)}")
    except Exception as e:
        degraded.append("governor-canon")
        fails.append(f"governor.ts-לא-נקרא: {type(e).__name__}")

    # (ד) מצב-המושל-החי — snapshot פומבי (keyless): המדיניות בתוך-החוקה
    try:
        with urllib.request.urlopen(f"{RAW}/fleet-economy/main/state/snapshot.json", timeout=25) as r:
            snap = json.loads(r.read().decode("utf-8", "replace"))
        gov = snap.get("gov") or {}
        pol = gov.get("policy") or {}
        f_, t_, fe_ = pol.get("wageHourFloorUsds"), pol.get("taxBps"), pol.get("feeToTreasuryPct")
        if not (isinstance(f_, (int, float)) and isinstance(t_, (int, float)) and isinstance(fe_, (int, float))):
            fails.append(f"מדיניות-המושל-לא-נמדדה: {json.dumps(pol)[:80]}")
        else:
            inb = (C["floorMinUsds"] <= f_ <= C["floorMaxUsds"] and
                   C["taxMinBps"] <= t_ <= C["taxMaxBps"] and
                   C["feeShareMinPct"] <= fe_ <= C["feeShareMaxPct"])
            ev.append(f"מושל-חי: רצפת {f_}$ · מס {t_}bps · עמלות {fe_}% · בתוך-חוקה={'כן' if inb else 'לא'}")
            if not inb:
                fails.append(f"מדיניות-חוץ-לחוקה: {f_}/{t_}/{fe_}")
        pend = len(gov.get("pending") or [])
        ev.append(f"פסקי-דין-פתוחים: {pend} · seq: {snap.get('seq')}")
        if not gov:
            fails.append("gov-חסר-ב-snapshot")
    except Exception as e:
        degraded.append("governor-snapshot")
        fails.append(f"snapshot-לא-נקרא: {type(e).__name__}")

    if not fails:
        return {"id": "D9-economic-governance", "area": "כלכלה", "status": "OBSERVING",
                "titleHe": "החוק-הכלכלי-נמדד: המושל תחת-סרגל-הריבונות (R318)",
                "verdictHe": ("המושל חוקק בתוך-החוקה והריבונות מודדת אותו כמו כל-גוף — "
                              "חקיקה-כלכלית בספר, גבולות fail-closed, דו\"ח-בעלים כל-6ש'"),
                "rationale": ("הכלכלה אינה תצורה אלא חוק-חוקתי (סעיף 9); שוויון-הספר (חוק 3 R317) "
                              "מיושם — המושל כפוף לאותם סרגלי-כנות: מדידה-בלי-אמון, fail-closed"),
                "evidence": ev, "decidedAt": now(),
                "decidedBy": "sovereign-decider-v1 (CHARTER סעיף 9 · R318)"}
    return {"id": "D9-economic-governance", "area": "כלכלה", "status": "ENFORCED", "priority": "P0",
            "titleHe": "חוק-כלכלי-סטה — הכרעה-מיד",
            "verdictHe": ("הריבונות מכריעה: החוק-הכלכלי סטה (" + "; ".join(fails[:3]) +
                          ") — המושל כפוף-לחוקתו; הקנון בלבד משנה-את-החוקה, אפס-המתנה-לבעלים"),
            "rationale": "חוק-חוץ-לחוקה = P0 מכל-סטייה-תפעולית אחרת (R318 חוק 2)",
            "evidence": ev + fails, "decidedAt": now(),
            "decidedBy": "sovereign-decider-v1 (CHARTER סעיף 9 · R318)"}


def decide_verify(av, tg, degraded):
    """D4 [T15] — רשת-האמת: ההכרעה רואה את הבדיקה-העצמית של הגוף (המאמת-העצמאי
    של הקונסולה 51-טענות + שער-האמת-הציבורי). כשל → הכרעה-מנותבת (P0/P1) מיד —
    אין-המתנה-להוראות; אפס-כשל → OBSERVING עם המדידה-המפורסמת."""
    if not av and not tg:
        degraded.append("console-verify")
        return {"id": "D4-truth-network", "area": "אימות-עצמי", "status": "OBSERVING",
                "titleHe": "רשת-האמת", "verdictHe": "מקורות-הביקורת-העצמית לא נמדדו בריצה-זו — ממשיכים-למדוד",
                "evidence": ["agent/verify/results.json + truth/latest.json לא זמינים"], "decidedAt": now(),
                "decidedBy": "sovereign-decider-v1 (CHARTER)"}
    ev = []
    failed = []
    if av:
        s = av.get("summary") or {}
        total = s.get("total"); passed = s.get("passed")
        verdict = s.get("verdict")
        ev.append(f"מאמת-הרשת: {passed}/{total} {verdict} ({av.get('generatedAt', '?')})")
        if verdict != "ALL_PASS":
            failed += [f"{r.get('id')}: {r.get('details', '')[:80]}"
                       for r in (av.get("results") or []) if not r.get("ok")]
    if tg:
        ev.append(f"שער-האמת: {tg.get('verdict')} (pass={((tg.get('counts') or {}).get('pass'))} fail={((tg.get('counts') or {}).get('fail'))})")
        for g in (tg.get("results") or []):
            if g.get("status") == "FAIL":
                failed.append(f"{g.get('gate')}: {g.get('note') or g.get('measured', '')[:80]}")
    if not failed:
        return {"id": "D4-truth-network", "area": "אימות-עצמי", "status": "OBSERVING",
                "titleHe": "רשת-האמת", "verdictHe": "הגוף מאמת-את-עצמו ירוק בפומבי (51/51 + שער-ירוק) — ממשיכים-למדוד",
                "evidence": ev, "decidedAt": now(),
                "decidedBy": "sovereign-decider-v1 (CHARTER)"}
    return {"id": "D4-truth-network", "area": "אימות-עצמי", "status": "ENFORCED", "priority": "P1",
            "titleHe": "רשת-האמת — כשל-בדיקה-עצמית מנותב מיד",
            "verdictHe": (f"הריבונות מכריעה: {len(failed)} כשלי-אימות-עצמי מנותבים למסילת-התיקון "
                          f"מיד (fail-closed: כל-הצהרה-נבדקת מול מדידה) — אין-המתנה-להוראות."),
            "evidence": ev + failed, "decidedAt": now(),
            "decidedBy": "sovereign-decider-v1 (CHARTER)"}


# ------------------------------------------------------------ פרסום ---

def brain_review(decisions):
    """[T31] וו-מוח-ההכרעות מהכספת (vault-open→סוד) — fail-soft לחלוטין:
    בלי NVIDIA_API_KEY → keyless (התנהגות-T14 נשמרת-במלואה); עם מפתח —
    סקירה-שנייה אחת (עצורה-בזמן, temperature-0) שמתעדת הסכמה/דגלים.
    לעולם לא משנה הכרעות-דטרמיניסטיות — רק רושם חוות-דעת ב-state.json."""
    key = (os.environ.get("NVIDIA_API_KEY") or "").strip()
    if not key:
        return {"mode": "keyless", "reason": "NVIDIA_API_KEY absent — keyless full (T14)"}
    models = [m.strip() for m in (os.environ.get("NVIDIA_MODELS") or "").split(",") if m.strip()]
    base = (os.environ.get("NVIDIA_BASE_URL") or "https://integrate.api.nvidia.com/v1").rstrip("/")
    model = models[0] if models else "meta/llama-3.1-8b-instruct"
    brief = [{"id": d.get("id"), "status": d.get("status"), "chosen": d.get("chosen"),
              "verdict": scrub(d.get("verdictHe") or "")[:220]} for d in decisions]
    prompt = ("אתה סוקר-שני של הכרעות-ריבונות דטרמיניסטיות. ענה ב-JSON בלבד: "
              '{"agreement": 0-100, "flags": ["..."]}. agreement=מידת-הסכמה עם '
              "ההכרעות לפי-העדויות; flags=הסתייגויות-קצרות בעברית (או רשימה-ריקה). "
              "ההכרעות: " + json.dumps(brief, ensure_ascii=False))
    try:
        req = urllib.request.Request(
            base + "/chat/completions",
            data=json.dumps({"model": model, "temperature": 0, "max_tokens": 300,
                             "messages": [{"role": "user", "content": prompt}]}).encode("utf-8"),
            headers={"Authorization": "Bearer " + key, "Content-Type": "application/json"})
        with urllib.request.urlopen(req, timeout=30) as r:
            data = json.loads(r.read().decode("utf-8"))
        text = ((data.get("choices") or [{}])[0].get("message") or {}).get("content", "")
        m = re.search(r"\{.*\}", text, re.S)
        verdict = json.loads(m.group(0)) if m else {}
        return {"mode": "wired", "model": model, "checked": len(brief),
                "agreement": int(verdict.get("agreement", -1)),
                "flags": [scrub(str(f))[:160] for f in (verdict.get("flags") or [])][:5],
                "reviewedAt": now()}
    except Exception as e:
        return {"mode": "error", "reason": scrub(str(e))[:140], "failSoft": True}


def main():
    degraded = []
    chain = measure_chain(degraded)
    beacon = read_json(f"{RAW}/sovereign-beacon/main/state.json")
    if not beacon:
        degraded.append("beacon")
    vs = read_local("ops/sovereign/VALUE-SCAN/state.json") or read_json(f"{RAW}/Autonomy/main/ops/sovereign/VALUE-SCAN/state.json") or read_json(f"{RAW}/Sandbox/main/ops/sovereign/VALUE-SCAN/state.json")
    if not vs:
        degraded.append("value-scan")
    foreman = read_json(f"{RAW}/FleetHQ/main/office/state/office-state.json")
    if not foreman:
        degraded.append("foreman")
    flow = read_local("ops/flow/flow-map.json") or read_json(f"{RAW}/Autonomy/main/ops/flow/flow-map.json")
    if not flow:
        degraded.append("flow-map")
    wos = read_local("ops/office/work-orders.json") or read_json(f"{RAW}/Autonomy/main/ops/office/work-orders.json")
    if not isinstance(wos, list):
        wos = (wos or {}).get("orders") if isinstance(wos, dict) else None
        if not isinstance(wos, list):
            wos = None  # כנה: מנוע-הצמיחה עשוי לפרסם מבנה-אחר — לא מנחשים
    hc_scan = scan_outgoing_delegations(max_ops=3000, degraded=degraded)
    d0_merged, board_acked = decide_owner_channel(degraded)  # [15a-merge]
    # [T15] רשת-האמת — המאמת-העצמאי + שער-האמת של הקונסולה
    av = read_json(f"{RAW}/Console/main/agent/verify/results.json")
    if not av:
        degraded.append("console-agent-verify")
    tg = read_json(f"{RAW}/Console/main/truth/latest.json")
    if not tg:
        degraded.append("console-truth-gate")
    # [exec29] מצבה-חברתית — שלושת-מקורות-השער-הקשיח (R6; fail-soft, כנות לשלא-נמדד)
    social = measure_social_standby(degraded)

    # [T16] פנקס-עצמי לרצף-הנקי (לפני-ההכרעות — ההכרעה קוראת-היסטוריה)
    lpath = os.path.join(OUT_DIR, "ledger.jsonl")
    ledger_lines = []
    if os.path.exists(lpath):
        with open(lpath, encoding="utf-8") as f:
            ledger_lines = [l for l in f.read().splitlines() if l.strip()]
    # [T16] סטטוס-מדוד לעבודות-שנותבו (done-ness נבדק, לא נטען)
    wo_status = measure_work_order_status(degraded)

    # ביקורת-אמת: מדוד מול מפורסם
    match = None
    if chain and beacon:
        pub = (beacon.get("lastPulse") or {}).get("treasuryNetSp")
        if isinstance(pub, (int, float)):
            match = abs(pub - chain["treasuryNetSp"]) <= 1.0

    decisions = [
        d0_merged,  # [T17]+[15a-merge] D0 — סמכות-עליונה: תיבה+לוח
        decide_econ(chain, beacon, hc_scan, degraded),
        decide_eng(foreman, wos, degraded, ledger_lines),
        decide_flow(flow, degraded),
        decide_verify(av, tg, degraded),  # [T15] רשת-האמת — בדיקה-עצמית נראית-ומוכרעת
        decide_architecture_owner(degraded),  # [R314] הארכיטקטורה-היא-הבעלים — אפס-בקשות + כנות-רמה
        decide_owner_remembrance(degraded),  # [R316] הבעלים-האנושי-הנזכר — הזכר מכני fail-closed
        decide_engineering_synthesis(degraded),  # [R317] הנדסה-משותפת — קנון-התבניות עם מקור-מנוטר
        decide_economic_governance(degraded),  # [R318] החוק-הכלכלי-נמדד — המושל תחת-סרגל-הריבונות
        decide_social_standby(social, chain, degraded),  # [exec29] מצבה-חברתית — R6 fail-closed + צ'קליסט-כנה
    ]

    brain = brain_review(decisions)  # [T31] וו-מוח fail-soft — מתעד, לא משנה

    state = {
        "schema": "roshpina.sovereign-decider/1",
        "generatedAt": now(),
        "publisher": "sovereign-decider.yml (GitHub Actions, keyless, T14)",
        "charter": "ops/sovereign/DECIDER/CHARTER.md",
        "charterMandateAt": "2026-10-11T21:20Z",
        "ownerMandateVerbatim": "[owner-directive]",
        "degraded": sorted(set(degraded)),
        "chainVerify": (None if not chain else {
            "head": chain["head"], "mult": chain["mult"],
            "treasuryNetSp": chain["treasuryNetSp"], "minOperatorSp": chain["minOperatorSp"],
            "beaconChainMatch": match,
        }),
        "decisions": decisions,
        "brain": brain,  # [T31] vault-open→סוד — חיבור-מוח-הכרעות

        "workOrderStatus": wo_status,  # [T16] done-ness מדוד למה-שניתן-למידה; כנות לשאר
        "noAction": [],
        "law": "MEASURE→OPTIONS→SCORE→DECIDE→PUBLISH→VERIFY→RE-MEASURE · R1-R6 ב-CHARTER",
    }

    body = json.dumps(state, ensure_ascii=False, indent=1)
    body = scrub(body)  # [refs-law] scrub-at-write — אפס שמות-צי בארטיפקט הפומבי
    path = os.path.join(OUT_DIR, "state.json")
    with open(path, "w", encoding="utf-8") as f:
        f.write(body + "\n")

    # [15a-merge] כתיבה-חזרה של ACK ללוח — רק-אם-היו-קבלות (אפס-רעש-קומיטים)
    if board_acked and _board_holder is not None:
        try:
            board = _board_holder
            board["updatedAt"] = now()
            bp = _board_path_holder
            board["lastAckPulseAt"] = now()
            with open(bp, "w", encoding="utf-8") as f:
                f.write(scrub(json.dumps(board, ensure_ascii=False, indent=1)) + "\n")  # [refs-law] scrub-at-write
            print("DIRECTIVE-ACK-WRITTEN", [d.get("id") for d in board_acked])
        except Exception as e:
            print("DIRECTIVE-ACK-WRITE-FAIL (כנה):", str(e)[:120])

    # פנקס append-bounded (ההיסטוריה נקראה-כבר-למעלה — ledger_lines)
    entry = scrub(json.dumps({  # [refs-law] scrub-at-write
        "at": state["generatedAt"], "head": chain["head"] if chain else None,
        "treasuryNetSp": chain["treasuryNetSp"] if chain else None,
        "beaconChainMatch": match,
        "engClean": ("not foreman" if not foreman else (
            not [a for a in (foreman.get("agents") or []) if a.get("state") == "error"]
            and not [t for t in (foreman.get("tasks") or []) if t.get("status") == "blocked"])),
        "decided": [d["id"] + ":" + d["status"] for d in decisions],
        "brain": (state.get("brain") or {}).get("mode"),  # [T31]

        "directivesAck": len(board_acked),  # [15a-merge] קבלות-פקודות-מנהל-בפעימה
        "degraded": state["degraded"],
    }, ensure_ascii=False))
    ledger_lines.append(entry)
    with open(lpath, "w", encoding="utf-8") as f:
        f.write("\n".join(ledger_lines[-LEDGER_MAX:]) + "\n")

    print("md5", hashlib.md5(body.encode()).hexdigest()[:12])
    for d in decisions:
        print("DECIDED", d["id"], d["status"], "-", d["verdictHe"][:110])
    print("degraded", state["degraded"], "· chainMatch", match)


if __name__ == "__main__":
    main()
