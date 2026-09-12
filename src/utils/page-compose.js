/**
 * CMS overlays that keep designed HTML unless WordPress provides content.
 */

import { slot, hasHtml } from '../services/content-service.js';

export function unwrapHtml(html) {
  if (typeof html !== 'string') return html;
  return html
    .trim()
    .replace(/^<p>/i, '')
    .replace(/<\/p>$/i, '')
    .trim();
}

export function renderHero({ id, minHeight = '55vh', label, titleHtml, subtitle }) {
  return `
    <section class="hero" id="${id}" style="min-height: ${minHeight};">
      <div class="hero__bg"></div>
      <div class="container">
        <div class="hero__content">
          <span class="hero__label">${label}</span>
          <h1 class="hero__title">${titleHtml}</h1>
          <p class="hero__subtitle">
            ${subtitle}
          </p>
        </div>
      </div>
    </section>
  `;
}

function replaceFirstHero(html, heroHtml) {
  const idx = html.indexOf('</section>');
  if (idx === -1) return html;
  return heroHtml + html.slice(idx + '</section>'.length);
}

/**
 * Overlay WP hero / body onto a designed page without changing CSS or layout classes.
 */
export function applyCmsPage(page, hardcoded, heroDefaults) {
  if (!page) return hardcoded;
  const f = page.fields || {};
  const hasHero = Boolean(f.gladhat_hero_label || f.gladhat_hero_title || f.gladhat_hero_subtitle);
  const body = page.content;
  const hasBody = hasHtml(body);

  if (!hasHero && !hasBody) return hardcoded;

  const hero = renderHero({
    id: heroDefaults.id,
    minHeight: heroDefaults.minHeight,
    label: slot(f.gladhat_hero_label, heroDefaults.label),
    titleHtml: unwrapHtml(slot(f.gladhat_hero_title, heroDefaults.titleHtml)),
    subtitle: slot(f.gladhat_hero_subtitle, heroDefaults.subtitle),
  });

  if (hasBody) {
    return `${hero}
    <section class="section">
      <div class="container">
        <div class="prose reveal">${body}</div>
      </div>
    </section>`;
  }

  return replaceFirstHero(hardcoded, hero);
}

/**
 * Story: WP body replaces unique narrative; otherwise keep designed HTML.
 */
export function applyCmsStory(story, hardcoded, defaults) {
  if (!story) return hardcoded;
  const f = story.fields || {};
  const hasBody = hasHtml(story.content);
  const hasHeroFields = Boolean(
    story.hero_label ||
    story.hero_subtitle ||
    f.gladhat_story_hero_label ||
    f.gladhat_story_hero_subtitle
  );

  if (!hasBody && !hasHeroFields) {
    return hardcoded;
  }

  const hero = renderHero({
    id: defaults.id,
    minHeight: defaults.minHeight || '55vh',
    label: slot(story.hero_label || f.gladhat_story_hero_label, defaults.label),
    titleHtml: unwrapHtml(hasBody ? slot(story.title, defaults.titleHtml) : defaults.titleHtml),
    subtitle: slot(story.hero_subtitle || f.gladhat_story_hero_subtitle, defaults.subtitle),
  });

  if (hasBody) {
    return `${hero}
    <section class="section">
      <div class="container">
        <div class="prose reveal">${story.content}</div>
      </div>
    </section>`;
  }

  if (hasHeroFields) {
    return replaceFirstHero(hardcoded, hero);
  }

  return hardcoded;
}
