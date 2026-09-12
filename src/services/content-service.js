/**
 * Content service — single place pages/components fetch CMS data.
 */

import { wpGet } from '../api/wordpress.js';
import { getWordpressApiUrl } from '../config/env.js';

const memory = {
  site: undefined,
  pages: {},
  stories: undefined,
  story: {},
  posts: undefined,
};

const SESSION_PREFIX = 'gladhat-cms:';

function readSession(key) {
  try {
    const raw = sessionStorage.getItem(SESSION_PREFIX + key);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return undefined;
    if (Date.now() - (parsed.ts || 0) > 5 * 60 * 1000) return undefined;
    return parsed.data;
  } catch {
    return undefined;
  }
}

function writeSession(key, data) {
  try {
    sessionStorage.setItem(SESSION_PREFIX + key, JSON.stringify({ ts: Date.now(), data }));
  } catch {
    /* quota / private mode */
  }
}

export function peekSite() {
  return memory.site === undefined ? null : memory.site;
}

export async function getSite() {
  if (memory.site !== undefined) return memory.site;
  const cached = readSession('site');
  if (cached !== undefined) {
    memory.site = cached;
    return cached;
  }
  const data = await wpGet('/site');
  memory.site = data;
  if (data) writeSession('site', data);
  return data;
}

export async function getPage(slug) {
  if (memory.pages[slug] !== undefined) return memory.pages[slug];
  const cached = readSession('page:' + slug);
  if (cached !== undefined) {
    memory.pages[slug] = cached;
    return cached;
  }
  const data = await wpGet(`/page/${encodeURIComponent(slug)}`);
  memory.pages[slug] = data;
  if (data) writeSession('page:' + slug, data);
  return data;
}

export async function getStories() {
  if (memory.stories !== undefined) return memory.stories;
  const cached = readSession('stories');
  if (cached !== undefined) {
    memory.stories = cached;
    return cached;
  }
  const data = await wpGet('/stories');
  const items = data?.items || null;
  memory.stories = items;
  if (items) writeSession('stories', items);
  return items;
}

export async function getStory(slug) {
  if (memory.story[slug] !== undefined) return memory.story[slug];
  const cached = readSession('story:' + slug);
  if (cached !== undefined) {
    memory.story[slug] = cached;
    return cached;
  }
  const data = await wpGet(`/story/${encodeURIComponent(slug)}`);
  memory.story[slug] = data;
  if (data) writeSession('story:' + slug, data);
  return data;
}

export async function getPosts() {
  if (memory.posts !== undefined) return memory.posts;
  const cached = readSession('posts');
  if (cached !== undefined) {
    memory.posts = cached;
    return cached;
  }
  const data = await wpGet('/posts');
  const items = data?.items || null;
  memory.posts = items;
  if (items) writeSession('posts', items);
  return items;
}

/** Empty string / empty HTML counts as missing so designed copy remains. */
export function slot(value, fallback) {
  if (value == null) return fallback;
  if (typeof value === 'string' && value.trim() === '') return fallback;
  return value;
}

export function imageUrl(image, fallback) {
  const url = image && typeof image === 'object' ? image.url : '';
  return url || fallback;
}

export function imageAlt(image, fallback) {
  const alt = image && typeof image === 'object' ? image.alt : '';
  return alt || fallback;
}

export function hasHtml(value) {
  return typeof value === 'string' && value.replace(/<[^>]+>/g, '').trim() !== '';
}
