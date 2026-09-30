/* ===================================================
   GLADHAT — More Stories
   =================================================== */

import { getPage } from '../services/content-service.js';
import { applyCmsPage } from '../utils/page-compose.js';

export async function MoreStoriesPage() {
  const projects = [
    {
      name: 'EMEO',
      description: 'Positioning, website and communications for an organisational development consultancy.',
      tagline: 'Helping a consultancy express decades of experience with greater clarity.'
    },
    {
      name: 'Ivy and Noa',
      description: 'Brand strategy and visual identity for an emerging fashion and lifestyle brand.',
      tagline: 'Translating a creative vision into a cohesive brand experience.'
    },
    {
      name: 'Read Theory',
      description: 'Communications strategy for an educational technology platform.',
      tagline: 'Connecting learning outcomes with clearer customer communication.'
    }
  ];

  const cards = projects.map((p, i) => `
    <div class="card reveal reveal--delay-${i + 1}" id="more-project-${p.name.toLowerCase().replace(/\s/g, '-')}">
      <div class="card__label">${p.name}</div>
      <h3 class="card__title">${p.tagline}</h3>
      <p class="card__text">${p.description}</p>
    </div>
  `).join('');

  const html = `
    <section class="hero page-hero" id="more-hero">
      <div class="hero__bg"></div>
      <div class="container">
        <div class="hero__content">
          <span class="hero__label">True Stories</span>
          <h1 class="hero__title">More <span class="accent">stories</span></h1>
          <p class="hero__subtitle">
            Not every project becomes a full story. Sometimes the lesson is smaller. Sometimes the work speaks for itself.
          </p>
        </div>
      </div>
    </section>

    <section class="section section--alt" id="more-grid">
      <div class="container">
        <div class="section-header section-header--left reveal">
          <h2 class="section-header__title">Other businesses I've had the pleasure of <span class="accent">working with</span></h2>
        </div>
        <div class="grid grid--3">
          ${cards}
        </div>

        <div style="margin-top: var(--space-4xl); display: flex; flex-direction: column; align-items: center; gap: var(--space-md);">
          <a href="/contact" class="btn btn--primary btn--lg" id="more-cta-btn">
            Let's Talk <span class="btn-arrow">→</span>
          </a>
          <a href="/work" class="text-link" id="more-back-btn">
            ← Back to True Stories
          </a>
        </div>
      </div>
    </section>
  `;

  return applyCmsPage(await getPage('more-stories'), html, {
    id: 'more-hero',
        label: 'True Stories',
    titleHtml: 'More <span class="accent">Stories</span>',
    subtitle: 'Not every project becomes a full story. Sometimes the lesson is smaller. Sometimes the work speaks for itself.',
  });
}
