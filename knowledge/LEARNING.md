# LEARNING.md — חוקת-הלמידה של-הארכיטקטורה-הריבונית [t12]
# The Learning Constitution — how the organism studies the outside world

> Owner order (t12): "יש פה אתר שאני מחפש בו כל מיני ריפואים וחידושים שאני יוכל
> לבחון ולשלב לפי צורך — איך נוכל לעקוב אחרי פיתוחים, ולתת לארכיטקטורה לבדוק ולהנדס
> ברמה גבוהה מתוך עיון. **חשוב שלא ליפול על קוד זדוני בטעות.** יש הרבה מה ללמוד
> ולקחת משם — צריך להבין איך לשלב כדי לקבל כמה שיותר, נכון, מתקדם, מקצועי —
> **ולהפוך למקורי שלנו הכל**."

The scout organ (`engine/scout.mjs` + `engine/scout/*`) is the single doorway
through which the outside world enters our architecture. These laws are absolute.

## L1 — NEVER EXECUTE FOREIGN CODE
No foreign repo is ever cloned-and-run, installed (`npm i`), built, or executed —
not in CI, not locally, not anywhere. Study = **read-only text over the GitHub
API** (metadata, README head, small source-file heads). A repo that must run to
be understood is a repo we do not understand.

## L2 — EVERY CANDIDATE PASSES THE SHIELD FIRST
Before any deep reading, every candidate crosses `engine/scout/signals.mjs`
(exfil endpoints · obfuscated execution · credential harvest · install-time
bait · typosquat distance · red-flag naming). Any **critical** signal ⇒
`BLOCKED` — quarantined **by name** in the receipt so no other organ or agent
ever touches it. Warn signals ⇒ `STUDY_WITH_CARE` (allowed, but flagged in
every receipt and in `knowledge/scout/INDEX.md`).

## L3 — CLEAN-ROOM ORIGINALS ONLY ("ולהפוך למקורי שלנו הכל")
We never copy foreign code verbatim. We study the **approach**, then
re-implement from scratch inside our own repos, in our own style, zero-dep.
Every knowledge entry carries the clean-room clause. License respected:
MIT/Apache/BSD ideas may be re-implemented with attribution in
`knowledge/scout/`; GPL-style code inspires architecture notes only, never
line-level ports. Attribution is recorded, never hidden.

## L4 — INTEGRATION = PROPOSAL → REVIEW → ORIGINAL CODE
A lesson becomes value only as a concrete engineering proposal mapped to our
organs (`lesson.appliesTo`). The proposal is either implemented as original
code in one of our repos (with receipts) or it is not implemented at all.
"Studied" alone is not value; shipped original code is.

## L5 — ALL KNOWLEDGE IS GIT MEMORY
Fetch failures, quarantines, verdicts, lessons — everything is committed
(`knowledge/scout/`, `receipts/scout/`). Sandbox death costs zero learning.
The index `knowledge/scout/INDEX.md` is regenerated every run.

## L6 — RESILIENCE OVER OPTIMISM
Curated sources sit behind Cloudflare and will sometimes block us. The fetch
ladder (direct → Wayback → reader-proxy) degrades gracefully; an always-on
fallback source (github trending) keeps the pipeline alive. A run that fetched
nothing publishes an honest `{ok:false, reason}` — silence and fake-green are
the only forbidden outcomes.

---
*Amended by agent-9, t13: L7 growth covenant (owner order). Amended only by the owner.*

## L7 — GROWTH, NEVER CLOSURE ("לוודא התפתחות וגדילה ולא סגירה")
The owner left the system to run alone — multidisciplinary, at state level.
The covenant `growth-watch` enforces daily: arteries active (GitHub silently
disables idle crons — we count), product surfaces fresh (the site must VISIBLY
improve, not just pass checks), LIVE URL serving the pulse, receipts flowing,
backlog alive (a system with nothing to build has stopped looking). Any closure
signal is LOUD (exit 2 + receipt), never absorbed, never explained away.
Shrinkage is not a strategy; if a capability cannot be exercised it is grown,
not hidden.
