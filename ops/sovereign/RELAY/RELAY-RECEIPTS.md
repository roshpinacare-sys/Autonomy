# RELAY-RECEIPTS — בדיקות-חסרות-המפתח של-הריפואים-הפרטיים, על-רץ-ציבורי

נמדד 2026-10-14T09:02:55.451Z · estate-relay/1 · קריאה-בלבד של-הריפואים-הפרטיים · אף-כתיבה-חזרה

- הקשר: ריפואים-פרטיים על-תוכנית-חינם = קיר-דקות (run מת-בלי-שלב-ראשון) — זהו-תיקון-היכולת, לא-הסתרת-הקיר.
- סקופ: 19 ריפואים-פרטיים (≤200MB) · oversize דולגו כנה: priv-heda61fc2, priv-h469de745
- gitleaks: v8.18.4 tree-scan (depth-1) — אם-ורק-אם-הריפו-עצמו-מבקש-זאת

| ref | verdict | yaml-guard | gitleaks |
|---|---|---|---|
| priv-h0064bfe1 | PASS | PASS | PASS (tree-scan, depth-1) |
| priv-hb50f794b | PASS | PASS | PASS (tree-scan, depth-1) |
| priv-h54671ac9 | PASS | PASS | PASS (tree-scan, depth-1) |
| priv-he8972163 | PASS | PASS | N/A (repo has no gitleaks lane) |
| priv-hb3fe6cc4 | PASS | PASS | PASS (tree-scan, depth-1) |
| priv-h68f58d82 | FINDINGS | PASS | FINDINGS:3 (tree-scan, depth-1 — see the repo's own lane) |
| priv-hea2461aa | FINDINGS | PASS | FINDINGS:150 (tree-scan, depth-1 — see the repo's own lane) |
| priv-h48bec02c | PASS | PASS | N/A (repo has no gitleaks lane) |
| priv-h4fb715c3 | PASS | PASS | PASS (tree-scan, depth-1) |
| priv-hcd554c54 | PASS | PASS | PASS (tree-scan, depth-1) |
| priv-h483d57f5 | PASS | PASS | PASS (tree-scan, depth-1) |
| priv-h7cc2c942 | FINDINGS | PASS | FINDINGS:6 (tree-scan, depth-1 — see the repo's own lane) |
| priv-h8a4395cb | PASS | PASS | PASS (tree-scan, depth-1) |
| priv-h13720b34 | FINDINGS | PASS | FINDINGS:6 (tree-scan, depth-1 — see the repo's own lane) |
| priv-h1a414e6e | FINDINGS | PASS | FINDINGS:10 (tree-scan, depth-1 — see the repo's own lane) |
| priv-h4d2f452d | PASS | PASS | PASS (tree-scan, depth-1) |
| priv-h5c117460 | PASS | PASS | N/A (repo has no gitleaks lane) |
| priv-ha63e8e09 | PASS | PASS | N/A (repo has no gitleaks lane) |
| priv-h8068b020 | FINDINGS | PASS | FINDINGS:1 (tree-scan, depth-1 — see the repo's own lane) |

- verdict: 6 לא-נקיים (כנה — זה-האלרם, לא-השתקה)
- הקיר-האדום-על-הריפואים-הפרטיים-עצמם נשאר-גלוי ב-manifest (P0 owner-words: דקות-בתשלום או-העברת-מסלולים-לפומבי)
