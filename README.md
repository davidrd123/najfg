# North Alabama Japanese Garden Foundation — Website

A static website for the [North Alabama Japanese Garden](https://northalabamajapanesegarden.org), built with [Astro](https://astro.build/) and editable through [Decap CMS](https://decapcms.org/).

## Quick start

```bash
npm install
npm run dev        # Local dev server at localhost:4321
npm run build      # Production build to dist/
npm run preview    # Preview production build locally
```

## Project structure

```
src/
├── content/           # Editable content (markdown files)
│   ├── events/        # Festival and event listings
│   ├── gallery/       # Photo gallery entries
│   └── haiku/         # Haiku path stone transcriptions
├── components/        # Nav, Footer, reusable UI
├── layouts/           # Base page layout
├── pages/             # Site pages (/, /visit, /garden, /events, /support)
└── styles/            # Global CSS with design tokens

public/
├── admin/             # Decap CMS (content editor interface)
│   ├── config.yml     # CMS field definitions
│   └── index.html     # CMS entry point
└── images/            # Photos and assets
```

## How content editing works

**For volunteers (non-developers):** Go to `yoursite.org/admin/` and log in.
You'll see a visual editor where you can:

- Add or edit **events** (title, date, description, details)
- Add **gallery photos** (upload image, tag season, add description)
- Add **haiku stones** (stone number, poet, haiku text, optional photo)

Changes are saved as Git commits. The site rebuilds automatically on deploy.

**For developers:** Content lives in `src/content/` as markdown files with
YAML frontmatter. Edit directly or through the CMS. Content schemas are
defined in `src/content/config.ts`.

## Deployment (Cloudflare Pages)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial site"
gh repo create najgf-site --private --source=. --push
```

### 2. Connect to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → Pages → Create a project
2. Connect your GitHub account and select the `najgf-site` repo
3. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: set environment variable `NODE_VERSION` = `20`
4. Deploy

### 3. Custom domain

In Cloudflare Pages → your project → Custom domains → Add `northalabamajapanesegarden.org`.
If the domain is registered elsewhere, you'll need to update DNS to point to Cloudflare.

### 4. Set up Decap CMS authentication (GitHub OAuth)

Decap CMS needs a small OAuth proxy so editors can log in with GitHub.
The easiest approach for Cloudflare is a Worker:

**Option A: Use `decap-cms-github-oauth-provider` on Cloudflare Workers**

```bash
# Clone the oauth provider
git clone https://github.com/sterlingwes/decap-cms-github-oauth-provider.git
cd decap-cms-github-oauth-provider

# Create a GitHub OAuth App:
# Go to https://github.com/settings/developers → New OAuth App
# - Application name: NAJGF Site CMS
# - Homepage URL: https://northalabamajapanesegarden.org
# - Authorization callback URL: https://najgf-auth.YOURNAME.workers.dev/callback
# Note the Client ID and Client Secret

# Set secrets in Cloudflare Workers
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET

# Deploy
npx wrangler deploy
```

Then update `public/admin/config.yml` with your Worker URL as `base_url`.

**Option B: Use Netlify for auth only (simpler but mixed hosting)**

Keep the site on Cloudflare Pages but create a free Netlify site solely for
the Identity/Git Gateway service. Set `backend.name: git-gateway` in the CMS
config and point it at the Netlify site. This is a shortcut that works but
means you depend on two services.

### 5. Invite editors

Add your sister's GitHub account (and one backup person) as collaborators
on the repo. They log into `/admin/` with their GitHub credentials.

### Local CMS development

For testing the CMS locally without GitHub OAuth:

```bash
# Install the local proxy
npm install -g decap-server

# In one terminal:
npm run dev

# In another terminal:
npx decap-server

# Visit http://localhost:4321/admin/
# The CMS will use the local proxy instead of GitHub
```

## Design decisions

**Typography:** Cormorant Garamond (display) + Source Sans 3 (body).
Cormorant has the organic, slightly calligraphic quality that fits a garden
site without resorting to brush script clichés.

**Colors:** Drawn from the actual garden: stone greys, moss greens, bamboo,
wood tones. Seasonal accents (azalea pink, maple red) can be introduced
through photography rather than UI chrome.

**Spacing:** Generous. The design principle of ma (間), the meaningful space
between things, applies to layout as much as garden design.

**Mobile first:** Most visitors will find this on a phone while planning
a day trip or standing in the Monte Sano parking lot.

## Weekend sprint checklist

- [ ] Create GitHub repo and push
- [ ] Connect to Cloudflare Pages, verify build works
- [ ] Register GitHub OAuth App for Decap CMS
- [ ] Deploy OAuth proxy as Cloudflare Worker
- [ ] Test full CMS flow: login → edit event → save → site rebuilds
- [ ] Confirm domain situation with sister (who owns northalabamajapanesegarden.org?)
- [ ] If domain available: point it at Cloudflare Pages
- [ ] Replace placeholder images with any real garden photos available
- [ ] Embed Google Maps on the Visit page
- [ ] Set up Zeffy donation form on the Support page (pending Foundation decision)
- [ ] Document all 24 haiku stones (pending volunteer outing)
- [ ] Confirm sponsor list with Executive Director
- [ ] Apply for Google for Nonprofits (pending EIN confirmation)
- [ ] Write a 1-page "how to update the site" guide for content editors
- [ ] Get the 2026 Spring Festival date confirmed and update event listing
