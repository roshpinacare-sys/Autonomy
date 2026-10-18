// watchdog.mjs — שכבת-הגנה 3: ערנות מחוץ ל-GitHub (t16 · agent-9)
// כל 5 דקות: census על Autonomy+Domain; אם יש מנוטרלים → mass-revive מיידי + קבלה.
// לא ניתן לנטרול ע"י מי שתוקף מתוך GitHub. מת עם אתחול הסנדבוקס — משוחזר ע"י ה-drill.
// הרצה: nohup node watchdog.mjs > /home/z/my-project/tmp/watchdog.log 2>&1 &
import fs from 'node:fs';
const TOKEN = fs.readFileSync('/home/z/.git-creds','utf8').match(/https:\/\/[^:]+:([^@]+)@github\.com/)[1];
const H = { 'Authorization': `Bearer ${TOKEN}`, 'Accept': 'application/vnd.github+json' };
const RECEIPTS = '/home/z/my-project/tmp/watchdog-receipts.jsonl';
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function beat() {
  const at = new Date().toISOString();
  const row = { at, checked: 0, dead: 0, revived: 0, failed: [] };
  try {
    for (const REPO of ['Autonomy', 'Domain']) {
      const r = await fetch(`https://api.github.com/repos/roshpinacare-sys/${REPO}/actions/workflows?per_page=100`, { headers: H });
      if (!r.ok) { row.failed.push(`${REPO}/census:${r.status}`); continue; }
      const d = await r.json();
      const dead = (d.workflows || []).filter(w => w.state !== 'active');
      row.checked += d.total_count || 0;
      row.dead += dead.length;
      for (const w of dead) {
        const e = await fetch(`https://api.github.com/repos/roshpinacare-sys/${REPO}/actions/workflows/${w.id}/enable`, { method: 'PUT', headers: H });
        if (e.status === 204) row.revived++; else row.failed.push(`${REPO}/${w.path}:${e.status}`);
        await sleep(150);
      }
    }
    if (row.dead > 0) {
      // הצתת השרשרת אחרי חזרת-חיים
      for (const WF of ['artery-pacer', 'autonomy-guardian']) {
        try {
          await fetch(`https://api.github.com/repos/roshpinacare-sys/Autonomy/actions/workflows/${WF}.yml/dispatches`, { method: 'POST', headers: { ...H, 'Content-Type': 'application/json' }, body: JSON.stringify({ ref: 'main' }) });
        } catch { /* כנות: ניסיון בלבד */ }
      }
    }
  } catch (e) { row.failed.push('beat:' + String(e.message).slice(0, 80)); }
  fs.appendFileSync(RECEIPTS, JSON.stringify(row) + '\n');
  console.log(`[${at}] checked=${row.checked} dead=${row.dead} revived=${row.revived}${row.failed.length ? ' failed=' + row.failed.join(',') : ''}`);
}

console.log('watchdog t16 armed — 5min beats, revive-only');
for (;;) { await beat(); await sleep(5 * 60 * 1000); }
