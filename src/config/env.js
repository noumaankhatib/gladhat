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
