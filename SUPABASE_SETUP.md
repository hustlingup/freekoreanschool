# Supabase Setup & News Generation Guide
**Project:** freekoreanschool — `juhkgpgrbueaijgfwoa` (ap-northeast-1)

---

## Overview

This guide covers:
1. Running the database migration in Supabase
2. Creating the storage bucket for images
3. Adding an admin user
4. Getting your API keys and wiring them into the code
5. Testing news generation locally
6. Setting up GitHub secrets for the daily auto-generation workflow

---

## Phase 1 — Run the Database Migration

1. Go to [https://supabase.com/dashboard/project/juhkgpgrbueaijgfvwoa](https://supabase.com/dashboard/project/juhkgpgrbueaijgfvwoa)
2. In the left sidebar click **SQL Editor**
3. Click **New query**
4. Open `supabase/migrations/001_init.sql` in your code editor and copy the entire contents
5. Paste into the SQL Editor and click **Run** (or press `Ctrl+Enter`)

**What this creates:**
- `topics` table — 11 pre-seeded categories (K-Pop, Tech, Food, Sports, K-Culture, Society, Education, Fashion, Travel, Economy, Politics)
- `articles` table — stores AI-generated bilingual news articles
- `daily_summaries` table — stores one summary per day
- `increment_view()` RPC function — safely increments article view counts
- Row Level Security policies — public can only read published articles; authenticated admin has full access

**Verify it worked:**
- Left sidebar → **Table Editor**
- Open `topics` → should show **11 rows**
- Open `articles` → should be empty (populated by the news generator)
- Open `daily_summaries` → should be empty

---

## Phase 2 — Create the Image Storage Bucket

1. Left sidebar → **Storage**
2. Click **New bucket**
3. Name: `news-images`
4. Toggle **Public bucket** to ON
5. Click **Save**

**Add upload policy (so the admin panel can upload images):**
1. Click on the `news-images` bucket
2. Click **Policies** tab
3. Click **New Policy** → **For full customization**
4. Fill in:
   - Policy name: `admin_upload`
   - Allowed operation: `INSERT`
   - Target roles: `authenticated`
   - Policy definition: `true`
5. Click **Review** → **Save policy**
6. Repeat for `DELETE` operation with the same settings

---

## Phase 3 — Create the Admin User

This creates the login credentials for `https://freekoreanschool.com/news/admin`.

1. Left sidebar → **Authentication**
2. Click **Users** tab
3. Click **Add user** → **Create new user**
4. Enter your email and a strong password
5. Click **Create user**

> Keep these credentials safe — this account has full database write access.

---

## Phase 4 — Get Your API Keys

1. Left sidebar → **Settings** (gear icon at the bottom)
2. Click **API**
3. You will see three values — copy each one:

| Key | Where to use |
|-----|-------------|
| **Project URL** | Already correct: `https://juhkgpgrbueaijgfvwoa.supabase.co` |
| **anon public** | Paste into `js/config.js` (see Phase 5) |
| **service_role** | Paste into `scripts/.env` AND add to GitHub secrets (Phase 7) — never put this in frontend code |

---

## Phase 5 — Create Your Local Config Files (gitignored)

API keys are kept out of the codebase in two gitignored files. **Never commit these files.**

### Frontend credentials — `js/config.js`

Copy the example file and fill in your anon key:

```bash
# From the project root:
cp js/config.example.js js/config.js
```

Then open `js/config.js` and replace `YOUR_ANON_KEY` with the **anon public** key from Phase 4:

```js
window.SUPABASE_URL = 'https://juhkgpgrbueaijgfvwoa.supabase.co';
window.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // your actual key
```

`js/config.js` is loaded by the three news pages before `app.js`. It is listed in `.gitignore` and will never be pushed to GitHub.

### Backend credentials — `scripts/.env`

Copy the example file and fill in all three values:

```bash
cd scripts
cp .env.example .env
```

Then open `scripts/.env`:

```env
ANTHROPIC_API_KEY=sk-ant-YOUR_KEY_HERE
SUPABASE_URL=https://juhkgpgrbueaijgfvwoa.supabase.co
SUPABASE_SERVICE_KEY=eyJ_YOUR_SERVICE_ROLE_KEY_HERE
```

`scripts/.env` is listed in `.gitignore` and will never be pushed to GitHub. In GitHub Actions the same values are provided as repository secrets (Phase 7) — the `.env` file is only for local testing.

---

## Phase 6 — Test News Generation Locally

Before setting up automation, verify the generator works on your machine.

**Prerequisites:**
- Node.js 20+ installed
- An Anthropic API key from [console.anthropic.com](https://console.anthropic.com) → API Keys

**Steps:**

```bash
# 1. Install dependencies (includes dotenv)
cd scripts
npm install

# 2. Make sure scripts/.env is filled in (see Phase 5)

# 3. Run a DRY RUN first — prints articles without saving to DB
# Edit scripts/.env and uncomment DRY_RUN=true, then:
node generate-news.js
```

**Expected output:**
```
=== Korean School News Generator ===
Date: 2026-06-04  |  Dry run: true  |  Model: claude-haiku-4-5-20251001

Found 11 active topics: kpop, tech, food, sports, culture, society, education, fashion, travel, economy, politics

Generating article for [kpop]… ✓ DRY RUN — "BTS Announces Surprise Comeback..."
Generating article for [tech]… ✓ DRY RUN — "Samsung Unveils New AI Chip..."
...
Generating daily summary… ✓ DRY RUN — "South Korea's K-Pop..."

=== Results ===
✓ Success: 11/11 articles
Done.
```

**If the dry run looks good, run for real:**

Comment out `DRY_RUN=true` in `scripts/.env`, then:

```bash
node generate-news.js
```

**Verify in Supabase:**
- Table Editor → `articles` → should have 11 new rows
- Table Editor → `daily_summaries` → should have 1 new row for today
- Visit `https://freekoreanschool.com/news` → articles should appear

---

## Phase 7 — Set Up GitHub Secrets

The GitHub Actions workflow at `.github/workflows/generate-news.yml` runs automatically at **23:00 UTC daily (08:00 KST)**. It needs three secrets.

1. Go to `https://github.com/hustlingup/freekoreanschool`
2. Click **Settings** tab
3. Left sidebar → **Secrets and variables** → **Actions**
4. Click **New repository secret** for each:

| Secret name | Value |
|------------|-------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key (`sk-ant-...`) |
| `SUPABASE_URL` | `https://juhkgpgrbueaijgfvwoa.supabase.co` |
| `SUPABASE_SERVICE_KEY` | The **service_role** key from Supabase Settings → API |

> The service_role key bypasses Row Level Security so the generator can write articles. Never expose it in frontend code — it only goes in GitHub secrets and local `.env` files.

---

## Phase 8 — Trigger a Manual Run to Verify

1. Go to `https://github.com/hustlingup/freekoreanschool`
2. Click **Actions** tab
3. Click **Generate Korean News** in the left list
4. Click **Run workflow** (top right) → **Run workflow**
5. Click the running job to watch the logs
6. Expect to see 11 articles + 1 daily summary saved successfully

If the run succeeds:
- Supabase Table Editor → `articles` → new rows with today's date in `published_at`
- `https://freekoreanschool.com/news` → articles visible

---

## Phase 9 — GitHub → Vercel Deployment

`vercel.json` is already configured at the project root. All that remains is connecting your repo and domain.

1. Go to [https://vercel.com/hustlinups-projects](https://vercel.com/hustlinups-projects)
2. Click **Add New Project**
3. Import **hustlingup/freekoreanschool** from GitHub
4. Leave all settings as default (no build command needed — it's a static site)
5. Click **Deploy**

**Add the custom domain:**
1. Vercel project → **Settings** → **Domains**
2. Type `freekoreanschool.com` → **Add**
3. Also add `www.freekoreanschool.com` → **Add**
4. Vercel will show you DNS records to configure

**Configure DNS at your registrar:**
- Add an **A record**: `@` → `76.76.21.21` (Vercel's IP)
- Add a **CNAME record**: `www` → `cname.vercel-dns.com`

SSL is automatic — Vercel provisions a certificate within a few minutes of DNS propagating.

---

## Summary Checklist

- [ ] Phase 1 — Run `001_init.sql` in Supabase SQL Editor
- [ ] Phase 2 — Create `news-images` storage bucket (PUBLIC) + upload policies
- [ ] Phase 3 — Create admin user in Supabase Authentication
- [ ] Phase 4 — Copy anon key and service_role key from Supabase Settings → API
- [ ] Phase 5 — Paste anon key into `js/app.js` line 2450
- [ ] Phase 6 — Test `generate-news.js` locally with `DRY_RUN=true`, then for real
- [ ] Phase 7 — Add 3 GitHub secrets (`ANTHROPIC_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`)
- [ ] Phase 8 — Trigger manual GitHub Actions run, verify articles in DB and on site
- [ ] Phase 9 — Import repo in Vercel, add `freekoreanschool.com` domain, configure DNS

---

## Troubleshooting

**News page shows "Supabase is not configured" message**
→ The anon key in `js/app.js` is still the placeholder. Complete Phase 5.

**`generate-news.js` fails with "Failed to fetch topics"**
→ The SQL migration hasn't been run yet, or the service_role key is wrong. Check Phase 1 and Phase 4.

**GitHub Actions fails with "Missing required environment variables"**
→ One of the three secrets is missing or misspelled. Check Phase 7 — names are case-sensitive.

**Vercel deploy shows 404 on `/news`**
→ `vercel.json` has `cleanUrls: true`, so `/news` maps to `news/index.html`. If 404 persists, check that `news/index.html` exists in the repo.

**DNS not propagating**
→ DNS changes can take up to 48 hours globally, though usually 15–30 minutes. Check propagation at [dnschecker.org](https://dnschecker.org).
