#!/usr/bin/env node
/**
 * floating-builds.mjs — אף-בנייה-לא-מרחפת-בשקט [R41 · ההנחיה: "הבנות מעופפות
 * באוויר לא יודע מה נסגר איתן שם"]
 * ═════════════════════════════════════════════════════════════════════════════
 * מה-הוא-עושה (כל-ריצה, חי-מול-API):
 *   1. סורק את-כל-הריפו (כולל-פרטיים — SBX_FLEET_PAT) לענפים ≠ main.
 *   2. משווה כל-ענף מול-main (compare): ahead_by==0 = תוכן-כבר-ב-main.
 *   3. פסקי-דין:
 *      · MERGED-CONTENT → נסגר-אוטומטית (מחיקת-ref עם-קבלה; אפס-תוכן-ייחודי-אבד)
 *      · UNMERGED(+N)   → נשמר-ומתועד (עבודה-אמת-שלא-נחתה — הכרעה=מסילה/בעלים)
 *      · ORPHAN         → אין-אב-משותף (היסטוריית-ארכיון) — נשמר-ומתועד
 *   4. מפרסם state/floating-builds.json (הספר-החי; היסטוריית-סגירות-מצטברת).
 *
 * כנות: שגיאת-API על-ענף = רישום-ERR כן, לא-מחיקה. אפס-מחיקה-בלי-הוכחת-איחוד.
 * שימוש: node tools/floating-builds.mjs [--dry-run]
 */
import { createHash } from 'node:crypto';

const OWNER = 'roshpinacare-sys';
const REPO = 'Autonomy';
const BRANCH = 'main';
const BOOK = 'state/floating-builds.json';
const API = 'https://api.github.com';
const TOKEN = (process.env.SBX_FLEET_PAT || process.env.GITHUB_TOKEN || '').trim();
const DRY = process.argv.includes('--dry-run');
const UA = { 'User-Agent': 'floating-builds/1', Accept: 'application/vnd.github+json' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function gh(path, opts = {}) {
  for (let a = 0; a < 3; a++) {
    const res = await fetch(`${API}${path}`, { ...opts, headers: { ...UA, Authorization: `Bearer ${TOKEN}`, ...(opts.headers || {}) } });
    if (res.status === 409 || res.status >= 500) { await sleep(1000 * (a + 1)); continue; }
    const j = await res.json().catch(() => null);
    return { status: res.status, ok: res.ok, j };
  }
  return { status: 0, ok: false, j: null };
}

async function main() {
  if (!TOKEN) { console.error('FATAL: אין-אמצעי-קריאה (SBX_FLEET_PAT)'); process.exit(1); }
  const t0 = Date.now();
  // 1. כל-הריפו (ה-PAT של-המשתמש — כולל-פרטיים)
  const rl = await gh('/user/repos?per_page=100&sort=pushed');
  if (!rl.ok || !Array.isArray(rl.j)) { console.error('FATAL: רשימת-ריפו נכשלה HTTP ' + rl.status); process.exit(1); }
  const repos = rl.j.map((r) => r.name);

  // 2. הספר-הקודם (היסטוריית-סגירות-מצטברת)
  const prev = await gh(`/repos/${OWNER}/${REPO}/contents/${BOOK}?ref=${BRANCH}`);
  let book = prev.ok && prev.j && prev.j.content ? JSON.parse(Buffer.from(prev.j.content, 'base64').toString('utf8')) : null;
  const history = (book && book.closedHistory) || [];

  const items = [];
  const closedNow = [];
  for (const r of repos) {
    const bl = await gh(`/repos/${OWNER}/${r}/branches?per_page=100`);
    if (!bl.ok || !Array.isArray(bl.j)) continue;
    for (const b of bl.j) {
      if (b.name === 'main') continue;
      const c = await gh(`/repos/${OWNER}/${r}/compare/main...${encodeURIComponent(b.name)}`);
      await sleep(80);
      if (!c.ok || !c.j || typeof c.j.ahead_by !== 'number') {
        items.push({ repo: r, branch: b.name, verdict: c.status === 404 ? 'ORPHAN' : 'ERR', detail: c.status === 404 ? 'אין-אב-משותף (היסטוריית-ארכיון)' : `HTTP ${c.status}` });
        continue;
      }
      const ahead = c.j.ahead_by;
      if (ahead === 0) {
        if (!DRY) {
          const del = await gh(`/repos/${OWNER}/${r}/git/refs/heads/${b.name}`, { method: 'DELETE' });
          if (del.status === 204) { closedNow.push(`${r}/${b.name}`); continue; }
          items.push({ repo: r, branch: b.name, verdict: 'ERR', detail: `delete-HTTP-${del.status} (תוכן-מאוחד; ינוסה-בריצה-הבאה)` });
        } else { closedNow.push(`${r}/${b.name} (dry-run)`); }
        continue;
      }
      const lc = (c.j.commits || []).slice(-1)[0] || {};
      items.push({
        repo: r, branch: b.name, verdict: 'UNMERGED',
        detail: `+${ahead}/-${c.j.behind_by} — עבודה-אמת-שלא-נחתה`,
        lastMessage: String((lc.commit && lc.commit.message) || '').slice(0, 90),
      });
    }
  }

  // 3. פרסום-הספר
  const body = {
    schema: 'fleet.floating-builds/2',
    measuredAt: new Date().toISOString(),
    durationMs: Date.now() - t0,
    reposScanned: repos.length,
    law: 'אף-בנייה-לא-מרחפת-בשקט: כל-ענף-שאינו-main נמדד ומקבל-פסק-דין. MERGED-CONTENT=סגירה-אוטומטית-עם-קבלה (אפס-תוכן-אבד). UNMERGED/ORPHAN=שימור-ותיעוד.',
    now: { floatingMeasured: items.length, closedThisRun: closedNow.length, closedThisRunList: closedNow },
    floating: items,
    closedHistory: history.concat([{ at: new Date().toISOString(), closed: closedNow }]).slice(-40),
    dryRun: DRY,
  };
  const js = JSON.stringify(body, null, 1) + '\n';
  const sha = prev.ok && prev.j ? prev.j.sha : undefined;
  const putBody = { message: `floating-builds: ${closedNow.length} נסגרו · ${items.length} תלויים-מתועדים [R41]`, content: Buffer.from(js).toString('base64'), branch: BRANCH, ...(sha ? { sha } : {}) };
  const put = await gh(`/repos/${OWNER}/${REPO}/contents/${BOOK}`, { method: 'PUT', body: JSON.stringify(putBody), headers: { 'Content-Type': 'application/json' } });
  if (!put.ok) { console.error('FATAL: פרסום-נכשל HTTP ' + put.status); process.exit(1); }
  console.log(`floating-builds: scanned=${repos.length} repos · closed=${closedNow.length} · floating=${items.filter((i) => i.verdict !== 'ERR').length} · sha ${put.j.commit.sha.slice(0, 10)}`);
  for (const i of items.filter((x) => x.verdict === 'UNMERGED')) console.log(`  KEEP ${i.repo}/${i.branch} ${i.detail}`);
}

main().catch((e) => { console.error('FATAL:', String(e && e.message || e).replace(/[A-Za-z0-9+/=_-]{24,}/g, '<redacted>')); process.exit(1); });
