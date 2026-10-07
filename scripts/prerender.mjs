#!/usr/bin/env node
/**
 * Post-build prerender: writes dist/<route>/index.html for every public route
 * with that page's own <title>, description, canonical and share-image tags,
 * so crawlers and link-preview bots (which don't run JavaScript) see the
 * right metadata. The SPA still boots and replaces #app as before.
 *
 * Route metadata is read from src/router.js and src/utils/legal-page.js, and
 * the share-card map from src/utils/seo.js, so there is one source of truth.
 *
 * Usage: node scripts/prerender.mjs [distDir]
 * Env:   VITE_SITE_URL (default https://gladhat.com), VITE_BASE_PATH (default /)
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(process.argv[2] || join(root, 'dist'));
const origin = (process.env.VITE_SITE_URL || 'https://gladhat.com').replace(/\/$/, '');
const base = (process.env.VITE_BASE_PATH || '/').replace(/\/$/, '');

const STR = String.raw`'((?:[^'\\]|\\.)*)'`;
const unescape = (s) => s.replace(/\\(.)/g, '$1');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const template = readFileSync(join(dist, 'index.html'), 'utf8');

/* ── Collect route metadata ───────────────────────────────── */

const router = readFileSync(join(root, 'src/router.js'), 'utf8');
const routeRe = new RegExp(
  String.raw`'(/[a-z0-9-]*)':\s*\{\s*page:\s*\w+,\s*meta:\s*\{\s*title:\s*${STR},\s*description:\s*${STR}`,
  'g',
);
const routes = new Map();
for (const m of router.matchAll(routeRe)) {
  routes.set(m[1], { title: unescape(m[2]), description: unescape(m[3]) });
}

const { getLegalMeta } = await import(pathToFileURL(join(root, 'src/utils/legal-page.js')).href);
for (const id of ['privacy', 'terms', 'cookies', 'disclaimer']) {
  const meta = getLegalMeta(id);
  routes.set(meta.path, { title: meta.title, description: meta.description });
}

const seo = readFileSync(join(root, 'src/utils/seo.js'), 'utf8');
const ogBlock = seo.match(/const OG_IMAGES = \{([\s\S]*?)\};/)?.[1] || '';
const ogImages = Object.fromEntries(
  [...ogBlock.matchAll(/'(\/[^']*)':\s*'([^']+)'/g)].map((m) => [m[1], m[2]]),
);

if (routes.size < 14) {
  console.error(`[prerender] expected at least 14 routes, found ${routes.size}. Check the regex against src/router.js.`);
  process.exit(1);
}

/* ── Rewrite head tags ────────────────────────────────────── */

function setMeta(html, attr, name, content) {
  const re = new RegExp(`<meta ${attr}="${name}"[^>]*>`);
  const tag = `<meta ${attr}="${name}" content="${esc(content)}" />`;
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `  ${tag}\n</head>`);
}

function build(path, { title, description }) {
  const url = `${origin}${path === '/' ? '/' : path}`;
  const slug = ogImages[path];
  const image = slug ? `${origin}${base}/og/${slug}.jpg` : `${origin}${base}/images/logo_3d.png`;

  let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  html = setMeta(html, 'name', 'description', description);
  html = html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`);
  html = setMeta(html, 'property', 'og:title', title);
  html = setMeta(html, 'property', 'og:description', description);
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'property', 'og:image', image);
  html = setMeta(html, 'name', 'twitter:title', title);
  html = setMeta(html, 'name', 'twitter:description', description);
  html = setMeta(html, 'name', 'twitter:url', url);
  html = setMeta(html, 'name', 'twitter:image', image);

  const heading = title.split('|')[0].trim();
  const fallback = `<noscript><main><h1>${esc(heading)}</h1><p>${esc(description)}</p>`
    + `<p><a href="${base}/">Gladhat</a> &middot; <a href="${base}/work">True stories</a> &middot; `
    + `<a href="${base}/about">About</a> &middot; <a href="${base}/contact">Contact</a></p></main></noscript>`;
  return html.replace('<div id="app"></div>', `<div id="app">${fallback}</div>`);
}

/* ── Write files ──────────────────────────────────────────── */

let count = 0;
for (const [path, meta] of routes) {
  const html = build(path, meta);
  const file = path === '/' ? join(dist, 'index.html') : join(dist, path.slice(1), 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  count += 1;
}
if (!existsSync(join(dist, 'index.html'))) process.exit(1);
console.log(`[prerender] wrote ${count} pages into ${dist}`);
