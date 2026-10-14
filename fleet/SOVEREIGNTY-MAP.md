# SOVEREIGNTY-MAP — מפת-היכולות-הריבוניות של-הרשת (מה-יש · מה-חסר · מה-מונע-ומאיפה)

נמדד 2026-10-14T01:00Z · session-17 · מפה-זו-נכתבה אחרי-קריאה-מלאה של-הבאר (vault-home כולו ·
Autonomy · saos-runtime · Domain · Federation) ואחרי-סריקה-חיה של-34-הריפואים. כל-שורה:
מדוד או-null. אין-פה-שאיפות — יש-מה-קיים, איפה-הוא-חי, ומה-עוד-אין.

## §1 · מה-קיים-וחי (עם-כתובות — הרשת-יודעת-למצוא-את-עצמה)

| יכולת-ריבונית | איפה | מצב-נמדד |
|---|---|---|
| זהות-רשת (ERC-8004-aligned manifest) | Autonomy/fleet/agents-manifest.json | חי · 2 עוגני-EVM אמיתיים כהוכחת-זהות |
| עוגן-על-שרשרת (Optimism, dedup Z-18) | Domain/agents/anchor-execute.mjs | חי · 2 עוגנים אמיתיים (blocks 158168179/158168506) |
| שער-מדיניות לפני-חתימה (PolicyAVS tier) | Domain/fleet/policy.json + agents/policy-gate.mjs | חי · evil-intent נעצר 7-הפרות |
| זמן-ריצה-מנקד (scoring loop, aeon-tier) | Autonomy/engine/run-score.mjs | חי · cron 3h · צי 3.25-3.42/5 |
| מודעות-עצמית (34 ריפואים · 298 workflows) | Autonomy/NETWORK-MANIFEST.md | חי · FULL mode (INV_TOKEN/ZIP_PAT הושבו) |
| משפט-טענות (claims intake · idempotent) | Autonomy/ops/sovereign/CLAIMS/ | חי · routed=21, אפס-כפילויות |
| מישור-הכרעה (SOV-POLICY/1) | FleetHQ/decide | חי · sense/decide/record |
| סריקת-פדרציה (30 דק') | Autonomy/federation/FEDERATION.json | חי · חוקת-הבעלים (לא-נוגעים) |
| כספת-חתומה (AES-256 · PBKDF2 200k) | vault-home/vault.sh | חי · המפתח-אצל-הבעלים-בלבד (חוק) |
| תרגיל-תחייה (פקודה-אחת) | vault-home/recover-estate.sh | חי · הוכח-חי 2026-10-12 (~35 דק') · **משודרג session-17: ספירה-דינמית של-כל-האחוזה** (היתה-רשימה-סטטית-של-8) |
| משטח-האיטום (keys never in git plaintext) | vault-home/intake/*.enc + wraps/ | חי · T-59 red-test עבר |
| נגד-מוות-שקט-של-טוקנים | Autonomy token-watchdog.yml → ops/TOKEN-TRUTH.md | חי · **session-17: +INV_TOKEN (מפתח-הפרויקט) נכנס-לטווח-המדידה** · תפוגה-נמדדת (ECO/SBX: 2026-12-12) |
| בית-git-שני (GitLab, חוצה-מארח) | Autonomy/engine/gitlab-mirror.mjs | חי-אך-חלקי: **3/34 ריפואים בלבד** · דורש GITLAB_TOKEN |
| עורקי-ענן (Supabase/Vercel/Render probes) | Autonomy/engine/key-probe.mjs | חי · fail-closed בלי-מפתחות |
| **תמונת-מצב-שוטפת-של-האחוזה (bundles)** | **Autonomy/engine/estate-vault.mjs → vault-home/vault-chain/bundles/** | **חדש session-17 · יומי · גלגול + MANIFEST.json חי** |
| **משוך-ציבורי לבדיקות-הפרטיים** | **Autonomy/engine/estate-relay.mjs → ops/sovereign/RELAY/** | **חדש session-17 · יומי · gitleaks tree-scan + yaml-guard · טיסה-ראשונה-חיה: 20 ריפואים-פרטיים נסרקו, 4-עם-gitleaks-FINDINGS (ספירות-בלבד, מוסר: priv-h68f58d82:1 · priv-hea2461aa:150 · priv-h7cc2c942:6 · priv-h13720b34:6)** |

## §2 · הפערים-שנמדדו-היום (ומה-נסגר-מתוכם-עכשיו)

1. **קיר-הדקות (P0 חוזר-ונמדד):** 22-ריפואים-אדומים, 419-כישלונות בחלון-40-הרצות-האחרונות.
   אבחנה-מדויקת: ריצה-פרטית מתה-ב-2-שניות, אפס-שלבים, אפס-לוגים (BlobNotFound) — זה-לא-פגם-קוד,
   זה-אין-דקות. **נסגר-חלקית:** estate-relay מחזיר-את-היכולת (gitleaks+yaml) על-רץ-ציבורי.
   הקיר-האדום-עצמו נשאר-גלוי-בכוונה. סגירה-מלאה = החלטת-בעלים (דקות-בתשלום) או-העברת-מסלולים-לפומבי.
2. **MANIFEST.json של-הכספת היה-מת** (2026-10-10, תאריכי-push מ-10-08, לפני-גידול-האחוזה).
   **נסגר:** estate-vault מרענן-אותו-חי-מה-API כל-לילה (roles-היסטוריים-נשמרים).
3. **recover-estate כיסה-8/34 ריפואים.** **נסגר:** ספירה-דינמית (עם-PAT) + fallback סטטי.
4. **token-watchdog לא-ראה את מפתח-הפרויקט** (INV_TOKEN — המניע-את-הרשת-עכשיו). **נסגר:** נוסף-לטווח-המדידה.
5. **אין-תמונת-מצב של-האחוזה** (בית-שני-חוצה-מארח קיים-רק-ל-3-ריפואים). **נסגר-בשכבה:** estate-vault
   (בתוך-האחוזה — שורד-מחיקת-ריפו/פגימה/force-push; לא-שורד-מיתת-GitHub-כולה — זו-שכבת-GitLab).
6. **בית-שני-חוצה-מארח = 3/34** — לא-נסגר-קוד: GITLAB_TOKEN חסום-מאחורי-הכספת-החתומה
   (passphrase אצל-הבעלים — עצם-העיצוב). **owner-words.**
7. **MAIN_KEY לא-קיים בסודות-Autonomy** (קיים-ב-Domain) — לא-ניתן-להעתיק-ערך-בין-ריפואים-דרך-API
   (write-only — עצם-העיצוב). ה-watchdog ימשיך-לדווח-כנה MISSING. **owner-words** (רלוונטי-רק-אם-מסלולים-ב-Autonomy-צריכים-אותו).
8. **רישום-ERC-8004 על-השרשרת** — חסום-gas (0.000066 ETH אינו-מפעיל-registry). **owner-words.**
9. **MCP-gateway חי (always-on host)** — ה-manifest+endpoints נצרכים-היום-via-raw-GET; הרצה-חיה
   דורשת-מארח-תמידי (Cloudflare-Worker-חינמי = אפשרות-מוחשבת). **owner-words.**

## §3 · חוקי-המפה

- כל-יכולת-כתובה-עם-כתובת-בגיט — מה-שאין-לו-כתובת = לא-קיים (חוק-הבעלים: "רק-מה-שבגיט-נשאר").
- שמות-פרטיים מוסרים ל-ref-יציב `priv-h<sha256("priv:"+name)[:8]>` (הקונבנציה-של-network-inventory).
- owner-words = דברים-שרק-הבעלים-יכול (סודות/gas/החלטות) — לעולם-לא-מזויפים-כהישגים.

## §4 · מה-הרשת-עוד-לא-יודעת-לעשות (כנות-מלאה — לא-פערים-מדודים-אלא-אופקים)

- אין-התאוששות-אוטומטית-ממיתת-חשבון-שלמה (GitLab-מלא = צריך-token; בלעדיו-יש-רק-תמונת-מצב-פנימית).
- אין-הצפנת-קבלות-חוצות-מכשירים מחוץ-לשרשרת-החתימה-הקיימת (T-55/T-56 מכסים-חתימה, לא-ארכיון).
- אין-web-of-trust בין-מפתחות (יש-רוטציות-פר-ריפו; אין-עדות-הצלבה-אוטומטית-בין-כולם).
- אין-מדידת-תשואה-אמיתית (ערך-כלכלי) מעבר-ל-VALUE-SCAN-הפנימי — נמדד-פנימית-בלבד.
