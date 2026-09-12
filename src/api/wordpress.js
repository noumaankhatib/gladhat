/**
 * Low-level WordPress REST client.
 * Public GET only. No credentials.
 */

import { getWordpressApiUrl } from '../config/env.js';

const inflight = new Map();

export class WordpressApiError extends Error {
  constructor(message, status = 0) {
    super(message);
    this.name = 'WordpressApiError';
    this.status = status;
  }
}

/**
 * @param {string} path e.g. /site or /page/about
 * @returns {Promise<any|null>}
 */
export async function wpGet(path) {
  const base = getWordpressApiUrl();
  if (!base) {
    return null;
  }

  const url = `${base}${path.startsWith('/') ? path : `/${path}`}`;
  if (inflight.has(url)) {
    return inflight.get(url);
  }

  const request = (async () => {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        credentials: 'omit',
      });
      if (!res.ok) {
        return null;
      }
      return await res.json();
    } catch {
      return null;
    } finally {
      inflight.delete(url);
    }
  })();

  inflight.set(url, request);
  return request;
}
