# Gladhat WordPress theme

The original Vite site (`src/`, `index.html`, `public/`) is unchanged. This theme is a content-managed copy of the same frontend.

## What is preserved

- Existing CSS files (copied, not rewritten): `assets/css/variables.css`, `reset.css`, `components.css`, `layout.css`
- Existing class names, spacing, typography, breakpoints (1024 / 960 / 900 / 768 / 480)
- Existing motion: scroll reveal, marquee, floating image, header scroll, mobile menu, listen buttons
- Existing URL slugs (`/when-we-should-talk`, `/work`, `/theblog`, story pages, etc.)

WordPress default block styles are dequeued so they cannot override the approved UI. Page Gutenberg editing is disabled; clients edit labelled fields, not layout.

## Required plugins

**Gladhat Core** (recommended companion plugin) — handles booking URL, LinkedIn, SEO meta, contact form, story CPT, and content seeding. The theme detects when it is active and avoids duplicate Customizer/SEO hooks.

If you use **only** the theme without the plugin, no other plugins are required.

Optional (not required for the design):

- An SEO plugin only if you want extra schema beyond the theme’s JSON-LD
- A cache plugin on Hostinger after go-live (LiteSpeed / Hostinger cache)

## Install on Hostinger WordPress

1. In hPanel, create or open the WordPress site (PHP 8.1+).
2. Zip the `gladhat` folder (the folder that contains `style.css`, not the parent `wordpress-theme` folder).
3. **Appearance → Themes → Add New → Upload Theme** and activate **Gladhat**.
4. On activation the theme creates the pages, primary menu, More Stories projects, and placeholder Thoughts posts, and sets the homepage.
5. **Settings → Permalinks** → Post name → Save (required so slugs match the current site).

## Copy images and video (required for a visual match)

These files are referenced by the live design but are not all in git. Copy them into:

`wp-content/themes/gladhat/assets/images/`

and

`wp-content/themes/gladhat/assets/images/logos/`

From the existing site / `public/` / Media Library:

- `logo_3d_header.png`, `logo_3d.png`
- `epic_founders.png`, `epic_beyond.png`, `epic_essence.png`, `epic_connecting.png`, `epic_curiosity.png`
- `whatif.png`, `conversation.png`, `perspective_prism.png`, `essence.png`, `beyond.png`, `connecting.png`, `research.png`, `stories.png`, `silhouette.png`, `curiosity.png`, `prism.png`
- `logos/server_factory.png`, `logos/first_light.png`, `logos/tonbo.png`, `logos/ensights.png`, `logos/provengo.svg` (SVG is already in the theme)
- Homepage video: `assets/hero-video.mp4` **or** upload the mp4 under **Appearance → Customize → Gladhat Identity**

Alternatively upload the same filenames into `wp-content/uploads/gladhat/` (including `hero-video.mp4`).

Then replace any asset from **the page editor → Images (Media Library)** by pasting the attachment ID.

## Client editing (content only)

| What | Where |
|---|---|
| Logo, hero video, email, LinkedIn, footer CTA, legal URLs | Appearance → Customize |
| Navigation labels/order | Appearance → Menus (Primary navigation) |
| Page hero copy, SEO title/description, images, optional section copy | Pages → (each page) |
| Featured story card text | The five story pages → Story card box |
| Extra project cards | More Stories (admin menu) |
| Articles | Posts. Leave content empty and check “Coming soon” to keep the current card behaviour |

Do not use the block editor to rebuild sections. Layout lives in the theme.

## URLs

| Path | WordPress |
|---|---|
| `/` | Front page (Home) |
| `/when-we-should-talk` | Page |
| `/working-together` | Page |
| `/work` | Page |
| `/server-factory` `/firstlight` `/tonbo` `/ensights` `/provengo` | Pages |
| `/more-stories` | Page |
| `/see-your-business-differently` | Page |
| `/about` `/contact` `/theblog` | Pages |
| `/theblog/{slug}` | Single post (when an article is published with body copy) |

## Performance

- Original CSS is enqueued as four small files (same as the Vite source).
- No page builder, no extra design CSS.
- After deploy, purge Hostinger / LiteSpeed cache if styles look stale.

## Visual check

Compare against the Vite preview (`npm run dev` in the original project):

- Desktop: header, hero video, marquee, philosophy splits, footer CTA
- ~768px: stacked splits, mobile menu, type sizes
- Listen buttons on When to Talk / How I Work
- Story cards and Thoughts “Coming soon” cards
