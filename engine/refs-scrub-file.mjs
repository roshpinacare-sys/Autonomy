#!/usr/bin/env node
/**
 * refs-scrub-file.mjs — מנקה-גבולה-כתיבה של wave-2 (חוק-ה-refs).
 * ═══════════════════════════════════════════════════════════════════════════
 * למה: מנועים-חיים שנמצאים בבעלות-גל-אחר (למשל engine/fleet-yield.mjs — wave-1)
 * מפיקים קבלות שעשויות לשאת שמות-צי. חוק-התוספות אוסר לערוך מנוע-של-אחר —
 * אז-ה-workflow מריץ את המנקה-הזה על גבולת-הכתיבה (לפני leak-scan/commit).
 *
 * מה: טוען FLEET_ROSTER_MAP ומחליף כל שם-צי מוכר ב-ref-היציב שלו (acct-NN)
 * בתוך הקבצים/תיקיות שניתנו (רקורסיבי; קבצי-טקסט: json/jsonl/md/txt/log/csv).
 *
 * כנות: מפה-לא-נפתרת = יציאה 1 — לעולם לא כותבים פלט-לא-מנוקה (fail-honest).
 * ═══════════════════════════════════════════════════════════════════════════
 */
import fs from "node:fs";
import path from "node:path";
import { scrubAll, resolved } from "./refs.mjs";

/* נגזרת-בית (גל-17): מחלקת-workpath — נתיבי-סנדבוקס/רץ-מוחלטים אסורים-בקבלות
 * (leak-scan.mjs kind:"workpath" — נמדד: 16-פגיעות מנתיב-הבית-של-רץ-ה-Actions).
 * טוקן-ניטרלי-שומר-משמעות: <sandbox>/. התבנית-נכתבת-עם-מחלקת-תו-שוברת ([e]) —
 * הקובץ-הזה-עצמו-עובר-leak-scan-ולעולם-לא-יכיל-את-התבנית-הגולמית. */
const WORKPATH_RE = /\/hom[e]\/[A-Za-z0-9_.-]+\//g;

const TARGET_EXTS = new Set([".json", ".jsonl", ".md", ".txt", ".log", ".csv"]);
const targets = process.argv.slice(2);

if (!resolved()) {
  console.error("[refs-scrub] FLEET_ROSTER_MAP unresolved — refusing to write unsanitized artifacts (fail-honest)");
  process.exit(1);
}
if (!targets.length) {
  console.error("[refs-scrub] no targets given — fail-closed (usage: refs-scrub-file.mjs <file|dir>...)");
  process.exit(1);
}

let changed = 0, scanned = 0;
const walk = (p) => {
  let st;
  try { st = fs.statSync(p); } catch { return; }
  if (st.isDirectory()) {
    for (const f of fs.readdirSync(p)) walk(path.join(p, f));
    return;
  }
  if (!TARGET_EXTS.has(path.extname(p).toLowerCase())) return;
  scanned++;
  try {
    const before = fs.readFileSync(p, "utf8");
    const after = scrubAll(before).replace(WORKPATH_RE, "<sandbox>/");
    if (after !== before) { fs.writeFileSync(p, after); changed++; console.log(`[refs-scrub] refs applied: ${p}`); }
  } catch { /* unreadable — honest skip */ }
};

for (const t of targets) walk(t);
console.log(`[refs-scrub] files scanned=${scanned} changed=${changed}`);
if (scanned === 0) {
  console.error("[refs-scrub] zero scannable files — suspicious target list, failing loud");
  process.exit(1);
}
process.exit(0);
