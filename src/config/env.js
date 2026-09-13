/**
 * Public env for the Vite SPA.
 * VITE_ values are visible in the browser — never put secrets here.
 */

export function getWordpressApiUrl() {
  const raw = import.meta.env.VITE_WORDPRESS_API_URL;
  if (typeof raw === 'string' && raw.trim()) {
    return raw.replace(/\/$/, '');
  }
  return '';
}

export function getSiteOrigin() {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }
  const fromEnv = import.meta.env.VITE_SITE_URL;
  if (typeof fromEnv === 'string' && fromEnv.trim()) {
    return fromEnv.replace(/\/$/, '');
  }
  return 'https://gladhat.com';
}

/**
 * Prefixes a site-root-relative asset path (e.g. "/images/logo.png") with the
 * build's base path (import.meta.env.BASE_URL, e.g. "/" or "/preview/"), so
 * assets resolve correctly whether the build is deployed at a domain root or
 * under a subpath.
 */
export function assetUrl(path) {
  if (typeof path !== 'string' || !path.startsWith('/')) {
    return path;
  }
  const base = import.meta.env.BASE_URL || '/';
  return base.replace(/\/$/, '') + path;
}
