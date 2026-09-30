/* ===================================================
   GLADHAT — Shared case-study framing
   An "at a glance" strip under each story hero and a
   next-story card at the end, driven by PORTFOLIO_STORIES
   so the five story pages read as one connected series.
   =================================================== */

import { PORTFOLIO_STORIES } from './work-portfolio.js';

function findStory(slug) {
  return PORTFOLIO_STORIES.find((story) => story.slug === slug);
}

export function storyGlance(slug) {
  const story = findStory(slug);
  if (!story) return '';

  return `
    <section class="story-glance" aria-label="Story at a glance">
      <div class="container story-glance__grid">
        <figure class="story-glance__cover">
          <img src="${story.cover}" alt="" loading="eager" decoding="async" width="1024" height="1024">
        </figure>
        <dl class="story-glance__facts">
          <div class="story-glance__fact">
            <dt>Client</dt>
            <dd>${story.subtitle}</dd>
          </div>
          <div class="story-glance__fact">
            <dt>Focus</dt>
            <dd>${story.categoryLabel}</dd>
          </div>
          <div class="story-glance__fact story-glance__fact--wide">
            <dt>What changed</dt>
            <dd>${story.outcome}</dd>
          </div>
        </dl>
      </div>
    </section>
  `;
}

export function storyNext(slug) {
  const index = PORTFOLIO_STORIES.findIndex((story) => story.slug === slug);
  const next = index >= 0 ? PORTFOLIO_STORIES[index + 1] : null;

  const nextCard = next
    ? `
      <a class="story-next__card" href="${next.link}">
        <figure class="story-next__media">
          <img src="${next.cover}" alt="" loading="lazy" decoding="async" width="1024" height="1024">
        </figure>
        <span class="story-next__body">
          <span class="story-next__eyebrow">Next story · ${next.number}</span>
          <span class="story-next__client">${next.subtitle}</span>
          <span class="story-next__title">${next.title} <span aria-hidden="true">→</span></span>
        </span>
      </a>`
    : `
      <a class="story-next__card story-next__card--more" href="/more-stories">
        <span class="story-next__body">
          <span class="story-next__eyebrow">Keep reading</span>
          <span class="story-next__client">More stories</span>
          <span class="story-next__title">Other businesses I've worked with <span aria-hidden="true">→</span></span>
        </span>
      </a>`;

  return `
    <div class="story-next">
      <div class="story-next__cta">
        <p class="story-next__prompt">Recognise something of your own business here?</p>
        <div class="page-actions">
          <a href="/contact" class="btn btn--primary btn--lg btn--pill">Let's talk <span class="btn-arrow">→</span></a>
          <a href="/work" class="text-link">← All true stories</a>
        </div>
      </div>
      ${nextCard}
    </div>
  `;
}
