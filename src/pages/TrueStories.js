/* ===================================================
   GLADHAT — True Stories (index / Work)
   =================================================== */

import { getPage, getStories, imageUrl } from '../services/content-service.js';
import { applyCmsPage } from '../utils/page-compose.js';
import { WORK_FILTERS, mergePortfolioStories } from '../utils/work-portfolio.js';

function renderPortfolioCard(story) {
  return `
    <a
      class="work-portfolio-card"
      href="${story.link}"
      data-categories="${story.categories.join(' ')}"
      data-work-item="story"
    >
      <figure class="work-portfolio-card__media">
        <img src="${story.cover}" alt="${story.subtitle} case study cover" loading="lazy" width="1200" height="800">
      </figure>
      <div class="work-portfolio-card__body">
        <span class="work-portfolio-card__category">${story.categoryLabel}</span>
        <h3 class="work-portfolio-card__client">${story.subtitle}</h3>
        <p class="work-portfolio-card__outcome">${story.outcome}</p>
        <span class="work-portfolio-card__link">${story.title} <span aria-hidden="true">→</span></span>
      </div>
    </a>
  `;
}

export async function TrueStoriesPage() {
  const cms = await getStories();
  const stories = mergePortfolioStories(cms, imageUrl);

  const filterButtons = WORK_FILTERS.map((filter, i) => `
    <button
      type="button"
      class="work-filter${i === 0 ? ' work-filter--active' : ''}"
      data-work-filter="${filter.id}"
      role="tab"
      aria-selected="${i === 0 ? 'true' : 'false'}"
      id="work-filter-${filter.id}"
    >${filter.label}</button>
  `).join('');

  const firstCards = stories.slice(0, 2).map(renderPortfolioCard).join('');
  const remainingCards = stories.slice(2).map(renderPortfolioCard).join('');

  const testimonialCard = `
    <blockquote class="work-testimonial-card" data-work-item="testimonial" aria-label="Philosophy">
      <p class="work-testimonial-card__quote">An experienced outside perspective changes that—not because the outsider knows your business better than you do, but because they see different things.</p>
      <footer class="work-testimonial-card__cite">
        <span class="work-testimonial-card__name">Gladhat philosophy</span>
        <span class="work-testimonial-card__role">The thinking behind every project</span>
      </footer>
    </blockquote>
  `;

  const html = `
    <section class="section work-page-hero" id="work-hero" aria-label="Work">
      <div class="container">
        <div class="work-page-hero__header">
          <div class="work-page-hero__copy">
            <h1 class="work-page-hero__title">
              <span class="work-page-hero__title-line">True stories.</span>
              <span class="work-page-hero__title-line">Real businesses.</span>
              <span class="work-page-hero__title-line">Meaningful change.</span>
            </h1>
            <p class="work-page-hero__subtitle">
              Every project begins with a conversation. Very few follow a perfectly straight line.
            </p>
          </div>
          <a href="/more-stories" class="btn btn--outline btn--pill work-page-hero__cta">More stories <span class="btn-arrow">→</span></a>
        </div>
      </div>
    </section>

    <section class="section work-portfolio" id="work-portfolio" aria-label="Case studies">
      <div class="container">
        <div class="work-filters" role="tablist" aria-label="Filter case studies">
          ${filterButtons}
        </div>

        <div class="work-portfolio-grid" data-work-grid>
          ${firstCards}
          ${testimonialCard}
          ${remainingCards}
        </div>
      </div>
    </section>

    <section class="section section--alt" id="work-proof" aria-label="Client outcomes">
      <div class="container">
        <div class="grid grid--2" style="margin: var(--space-lg) 0;">
          <div class="stat reveal reveal--delay-1">
            <div class="stat__value">$1.3M+</div>
            <div class="stat__label">In sales generated for Server Factory</div>
          </div>
          <div class="stat reveal reveal--delay-2">
            <div class="stat__value">50+</div>
            <div class="stat__label">Qualified leads from a $7,500 pilot</div>
          </div>
        </div>
        <p class="section-header__text" style="margin-top: var(--space-lg);">Real numbers from a real project. <a href="/server-factory" class="text-link">Read the Server Factory story <span aria-hidden="true">→</span></a></p>
      </div>
    </section>

    <section class="section work-intro" id="stories-intro">
      <div class="container">
        <div class="split reveal">
          <div class="split__text prose">
            <p>The useful moments are often the ones in which a question changes the brief, a hidden strength becomes visible or a complicated idea finally becomes clear.</p>
            <p>That is why I do not think of what follows simply as case studies.</p>
            <p class="highlight-text">They are true stories about the thinking behind the work, what changed along the way and what emerged.</p>
            <p>The industries, challenges and outcomes are different. The underlying approach is consistent:</p>
            <ul class="prose-list prose-list--compact">
              <li>✦ Listen carefully &amp; ask pertinent questions</li>
              <li>✦ Challenge assumptions</li>
              <li>✦ Uncover what is already there</li>
              <li>✦ Connect the dots &amp; create something that matches the truth</li>
            </ul>
          </div>
          <div class="split__image reveal reveal--delay-2">
            <img src="/images/stories.png" alt="Open Book" loading="lazy">
          </div>
        </div>
      </div>
    </section>

    <section class="pullquote pullquote--ink" aria-label="Pull quote">
      <p class="pullquote__text">They are true stories about the thinking behind the work, what changed along the way and what emerged.</p>
    </section>

    <section class="section" id="work-cta">
      <div class="container">
        <div class="prose reveal" style="text-align: center;">
          <h2>Interested in a similar story?</h2>
          <p>Every project starts with a conversation, not a brief.</p>
          <div style="margin-top: var(--space-2xl); display: flex; flex-direction: column; align-items: center; gap: var(--space-md);">
            <a href="/contact" class="btn btn--primary btn--lg" id="work-cta-btn">
              Let's Talk <span class="btn-arrow">→</span>
            </a>
            <a href="/working-together" class="text-link">See how we'd work together <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
    </section>
  `;

  return applyCmsPage(await getPage('work'), html, {
    id: 'work-hero',
    label: '',
    titleHtml: 'True <span class="accent">Stories</span>',
    subtitle: 'Every project begins with a conversation. Very few follow a perfectly straight line.',
  });
}
