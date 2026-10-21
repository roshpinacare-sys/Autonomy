#!/usr/bin/env node
/**
 * floating-builds.mjs — אף-בנייה-לא-מרחפת [R41 · ההנחיה: "הבנות מעופפות
 * באוויר לא יודע מה נסגר איתן שם"] · v3 R54: "הן לא צריכות לרחף"
 * ═════════════════════════════════════════════════════════════════════════════
 * מה-הוא-עושה (כל-ריצה, חי-מול-API):
 *   1. סורק את-כל-הריפו (כולל-פרטיים — SBX_FLEET_PAT) לענפים ≠ main.
 *   2. משווה כל-ענף מול-main (compare): ahead_by==0 = תוכן-כבר-ב-main.
 *   3. פסקי-דין (v3 — חוק-האפס-רחיפה):
 *      · PUBLICATION     → פטור: ענפי-הגשה (pages/gh-pages/office-pages) —
 *                          משטחי-פרסום חיים, לא עבודה-מרחפת. לעולם לא נמחקים.
 *      · ARCHIVE-BASE    → פטור [t53]: ענף-בסיס-שרשרת-ארכיון (שמו מכיל archive) —
 *                          תוכנו תמיד כבר תחת תג archive/<branch> (עותק-האמת);
 *                          הענף-עצמו הוא בסיס-ההמשך לדחיפות-הארכיון-הבאות.
 *                          מדידה שהולידה-זאת: ענף-ארכיון-אחד בצי נמחק ×3 ביממה
 *                          וענפי-אחוזה של-סוכן-אחר בכל-ריצה — לופ-קיפול-שיקום
 *                          אינסופי שאינו רחיפה (התוכן מעולם לא היה רחף).
 *      · MERGED-CONTENT  → נסגר-אוטומטית (מחיקת-ref עם-קבלה; אפס-תוכן-ייחודי-אבד)
 *      · UNMERGED(+N)    → ARCHIVED: תג-ארכיון archive/<branch> בראש-הענף
 *                          (העבודה-נשמרת-מאה%) ואז מחיקת-הענף. שום-דבר-לא-מרחף,
 *                          שום-דבר-לא-אבד; החזרה = ענף-מהתג.
 *                          [t53 תיקון-D2 מדוד]: "422=התג-קיים" לא היה מאמת
 *                          שהתג מכסה את הראש-הנוכחי — ענף-מחודש עם עבודה-חדשה
 *                          היה נמחק והתג-הישן נשאר על ראש-ישן. מעכשיו: אימות
 *                          כיסוי + הזזת-התג-בכוח לראש-החדש לפני מחיקה.
 *      · ORPHAN          → ARCHIVED (אותו-טיפול; היסטוריית-ארכיון-נשמרת-בתג)
 *      · ERR             → רישום-כן, ללא-מחיקה (מיקוד-הריצה-הבאה)
 *   4. מפרסם state/floating-builds.json (הספר-החי; היסטוריית-סגירות-וארכיון).
 *
 * כנות: שגיאת-API על-ענף = רישום-ERR כן, לא-מחיקה. אפס-מחיקה-לפני-שהתג-נחת
 * (או שהתג-כבר-קיים). אפס-מגע ב-main ובענפי-פרסום.
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
const UA = { 'User-Agent': 'floating-builds/3', Accept: 'application/vnd.github+json' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** ענפי-הגשה — משטחי-פרסום חיים (Pages/digest), לא עבודה-מרחפת */
const PUBLICATION = new Set(['pages', 'gh-pages', 'office-pages', 'website', 'site']);

/** ענפי-בסיס-ארכיון [t53] — שמם מכיל archive כרכיב-שלם (agent-N-archive, archive/*,
 *  *.archive). תוכנם תמיד כבר תחת תג archive/<branch> — אינם רחיפה לעולם. */
const ARCHIVE_BASE = /(^|[-_.\/])archive([-_.\/]|$)/i;

async function gh(path, opts = {}) {
  for (let a = 0; a < 3; a++) {
    const res = await fetch(`${API}${path}`, { ...opts, headers: { ...UA, Authorization: `Bearer ${TOKEN}`, ...(opts.headers || {}) } });
    if (res.status === 409 || res.status >= 500) { await sleep(1000 * (a + 1)); continue; }
    const j = await res.json().catch(() => null);
    return { status: res.status, ok: res.ok, j };
  }
  return { status: 0, ok: false, j: null };
}

/** ARCHIVED: תג-ארכיון בראש-הענף ואז מחיקת-הענף. מחזיר פסק-דין סופי. */
async function archiveBranch(repo, branch, sha, extra = {}) {
  const tag = `archive/${branch}`;
  if (!DRY) {
    const mk = await gh(`/repos/${OWNER}/${repo}/git/refs`, {
      method: 'POST',
      body: JSON.stringify({ ref: `refs/tags/${tag}`, sha }),
      headers: { 'Content-Type': 'application/json' },
    });
    // 422 = התג-כבר-קיים (ריצה-קודמת) — לא כשל, אך [t53-D2] חובה לאמת-שהוא
    // מכסה-את-ראש-הענף-הנוכחי; תג-ישן-על-ראש-ישן + עבודה-חדשה-על-הענף = הזזה-בכוח
    // לפני-המחיקה (אחרת-העבודה-החדשה-לא-נשמרת בתג-כלל).
    if (!mk.ok && mk.status !== 422) {
      return { verdict: 'ERR', detail: `tag-HTTP-${mk.status} (לא נמחק — העבודה על הענף)` };
    }
    if (!mk.ok && mk.status === 422) {
      const cur = await gh(`/repos/${OWNER}/${repo}/git/ref/${encodeURIComponent('tags/' + tag)}`);
      const curSha = cur.ok && cur.j && cur.j.object ? cur.j.object.sha : null;
      if (curSha && curSha !== sha) {
        const mv = await gh(`/repos/${OWNER}/${repo}/git/refs/${encodeURIComponent('tags/' + tag)}`, {
          method: 'PATCH',
          body: JSON.stringify({ sha, force: true }),
          headers: { 'Content-Type': 'application/json' },
        });
        if (!mv.ok) {
          return { verdict: 'ERR', detail: `tag-stale@${String(curSha).slice(0, 10)}/move-HTTP-${mv.status} (לא נמחק — העבודה על הענף)` };
        }
      }
    }
    const del = await gh(`/repos/${OWNER}/${repo}/git/refs/heads/${branch}`, { method: 'DELETE' });
    if (del.status === 204) return { verdict: 'ARCHIVED', detail: `תג ${tag} נחת @${String(sha).slice(0, 10)} · הענף נמחק`, tag, sha, ...extra };
    return { verdict: 'ERR', detail: `tag-ok/delete-HTTP-${del.status} (ינוסה-בריצה-הבאה; התג כבר שומר)` };
  }
  return { verdict: 'ARCHIVED', detail: `(dry-run) תג ${tag} @${String(sha).slice(0, 10)} + מחיקת-ענף`, tag, sha, ...extra };
}

async function main() {
  if (!TOKEN) { console.error('FATAL: אין-אמצעי-קריאה (SBX_FLEET_PAT)'); process.exit(1); }
  const t0 = Date.now();
  // 1. כל-הריפו (ה-PAT של-המשתמש — כולל-פרטיים)
  const rl = await gh('/user/repos?per_page=100&sort=pushed');
  if (!rl.ok || !Array.isArray(rl.j)) { console.error('FATAL: רשימת-ריפו נכשלה HTTP ' + rl.status); process.exit(1); }
  const repos = rl.j.map((r) => r.name);

  // 2. הספר-הקודם (היסטוריית-סגירות-וארכיון-מצטברת)
  const prev = await gh(`/repos/${OWNER}/${REPO}/contents/${BOOK}?ref=${BRANCH}`);
  let book = prev.ok && prev.j && prev.j.content ? JSON.parse(Buffer.from(prev.j.content, 'base64').toString('utf8')) : null;
  const history = (book && book.closedHistory) || [];

  const items = [];
  const closedNow = [];
  const archivedNow = [];
  for (const r of repos) {
    const bl = await gh(`/repos/${OWNER}/${r}/branches?per_page=100`);
    if (!bl.ok || !Array.isArray(bl.j)) continue;
    for (const b of bl.j) {
      if (b.name === 'main') continue;
      if (PUBLICATION.has(b.name)) {
        items.push({ repo: r, branch: b.name, verdict: 'PUBLICATION', detail: 'ענף-הגשה חי (Pages/digest) — פטור מחוק-הרחיפה' });
        continue;
      }
      if (ARCHIVE_BASE.test(b.name)) {
        items.push({ repo: r, branch: b.name, verdict: 'ARCHIVE-BASE', detail: 'בסיס-שרשרת-ארכיון (תוכנו תמיד תחת תג archive/<branch>) — פטור מחוק-הרחיפה [t53]' });
        continue;
      }
      const c = await gh(`/repos/${OWNER}/${r}/compare/main...${encodeURIComponent(b.name)}`);
      await sleep(80);
      if (!c.ok || !c.j || typeof c.j.ahead_by !== 'number') {
        if (c.status === 404) {
          const res = await archiveBranch(r, b.name, b.commit.sha, { orphan: true });
          if (res.verdict === 'ARCHIVED') { archivedNow.push(`${r}/${b.name}`); if (!DRY) continue; }
          items.push({ repo: r, branch: b.name, ...res });
        } else {
          items.push({ repo: r, branch: b.name, verdict: 'ERR', detail: `HTTP ${c.status}` });
        }
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
      // UNMERGED — עבודה-אמת: תג-ארכיון (שימור-מלא) ואז מחיקת-הענף
      const lc = (c.j.commits || []).slice(-1)[0] || {};
      const res = await archiveBranch(r, b.name, b.commit.sha, {
        ahead, behind: c.j.behind_by,
        lastMessage: String((lc.commit && lc.commit.message) || '').slice(0, 90),
      });
      if (res.verdict === 'ARCHIVED') { archivedNow.push(`${r}/${b.name}`); if (!DRY) continue; }
      items.push({ repo: r, branch: b.name, ...res });
    }
  }

  // 3. פרסום-הספר
  const body = {
    schema: 'fleet.floating-builds/3',
    measuredAt: new Date().toISOString(),
    durationMs: Date.now() - t0,
    reposScanned: repos.length,
    law: 'אפס-רחיפה (R54): כל-ענף-שאינו-main נמדד ומקבל-פסק-דין. PUBLICATION=ענף-הגשה-פטור. ARCHIVE-BASE=ענף-בסיס-שרשרת-ארכיון-פטור [t53 — תוכנו תמיד תחת תג; לופ-קיפול-שיקום אינו רחיפה]. MERGED-CONTENT=סגירה-עם-קבלה. UNMERGED/ORPHAN=תג-ארכיון archive/<branch> בראש-הענף (עם אימות-כיסוי-והזזה-בכוח לראש-החדש [t53-D2]) ואז מחיקת-הענף. ERR=רישום-כן-בלי-מחיקה.',
    now: { floatingMeasured: items.length, closedThisRun: closedNow.length, archivedThisRun: archivedNow.length, closedThisRunList: closedNow, archivedThisRunList: archivedNow },
    floating: items,
    closedHistory: history.concat([{ at: new Date().toISOString(), closed: closedNow, archived: archivedNow }]).slice(-40),
    dryRun: DRY,
  };
  const js = JSON.stringify(body, null, 1) + '\n';
  const sha = prev.ok && prev.j ? prev.j.sha : undefined;
  const putBody = { message: `floating-builds v3: closed=${closedNow.length} · archived=${archivedNow.length} · residual=${items.length} [R54-אפס-רחיפה]`, content: Buffer.from(js).toString('base64'), branch: BRANCH, ...(sha ? { sha } : {}) };
  const put = await gh(`/repos/${OWNER}/${REPO}/contents/${BOOK}`, { method: 'PUT', body: JSON.stringify(putBody), headers: { 'Content-Type': 'application/json' } });
  if (!put.ok) { console.error('FATAL: פרסום-נכשל HTTP ' + put.status); process.exit(1); }
  console.log(`floating-builds: scanned=${repos.length} repos · closed=${closedNow.length} · archived=${archivedNow.length} · residual=${items.filter((i) => i.verdict !== 'ERR').length} · sha ${put.j.commit.sha.slice(0, 10)}`);
  for (const i of items) console.log(`  ${i.verdict} ${i.repo}/${i.branch} ${i.detail}`);
}

main().catch((e) => { console.error('FATAL:', String(e && e.message || e).replace(/[A-Za-z0-9+/=_-]{24,}/g, '<redacted>')); process.exit(1); });
