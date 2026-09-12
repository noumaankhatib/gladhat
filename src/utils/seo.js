/* ===================================================
   GLADHAT — Dynamic SEO Utility
   =================================================== */

import { getSiteOrigin } from '../config/env.js';
import { peekSite } from '../services/content-service.js';

function siteOrigin() {
  return getSiteOrigin();
}

function setMetaTag(selector, attrName, attrVal, content) {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrVal);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setLinkTag(rel, href) {
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

export function updateSEO({ title, description, path = '/', noindex = false }) {
  const fullTitle = title || 'Commercial Strategy Consultant for Founders | Gladhat';
  const fullDesc = description || 'Commercial strategy consultant helping founders use customer insight, positioning and clear messaging to uncover opportunities and make better decisions.';
  const origin = siteOrigin();
  const fullUrl = `${origin}${path}`;
  const site = peekSite();
  const imageUrl = (site && site.seo_image && site.seo_image.url) || `${origin}/images/logo_3d.png`;

  // 1. Basic Meta
  document.title = fullTitle;
  setMetaTag('meta[name="description"]', 'name', 'description', fullDesc);
  setMetaTag('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
  setLinkTag('canonical', fullUrl);

  // 2. Open Graph Tags
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', fullDesc);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', fullUrl);
  setMetaTag('meta[property="og:image"]', 'property', 'og:image', imageUrl);
  setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');
  setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'Gladhat');

  // 3. Twitter Card Tags
  setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', fullDesc);
  setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl);
  setMetaTag('meta[name="twitter:url"]', 'name', 'twitter:url', fullUrl);
}
