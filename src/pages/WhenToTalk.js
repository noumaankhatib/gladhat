/* ===================================================
   GLADHAT — When We Should Talk
   =================================================== */

import { getPage } from '../services/content-service.js';
import { applyCmsPage } from '../utils/page-compose.js';
import { HERO_IMAGE, HERO_IMAGE_ALT, FIRST_IMAGE, FIRST_IMAGE_ALT, FINAL_IMAGE, FINAL_IMAGE_ALT } from '../utils/when-scenarios.js';

export async function WhenToTalkPage() {
  const html = `
    <div class="when-talk-page">
      <section class="hero when-talk-hero" id="when-hero">
        <figure class="when-talk-hero__media" aria-hidden="true">
          <img src="${HERO_IMAGE}" alt="${HERO_IMAGE_ALT}" loading="eager" fetchpriority="high" decoding="async" width="1400" height="1208">
        </figure>
        <div class="when-talk-hero__scrim" aria-hidden="true"></div>
        <div class="container">
          <div class="hero__content when-talk-hero__content" data-island="when-talk-hero"></div>
        </div>
        <a href="#when-recognition" class="when-talk-hero__scroll" aria-label="Scroll to content">
          <span class="when-talk-hero__scroll-label">See if this sounds familiar</span>
          <span class="when-talk-hero__scroll-icon" aria-hidden="true">↓</span>
        </a>
      </section>

      <section class="section when-talk-recognition" id="when-recognition" data-island="when-talk-recognition"></section>

      <section class="section when-talk-deeper" id="when-deeper" data-island="when-talk-deeper"></section>

      <section class="section when-talk-help" id="when-help" data-island="when-talk-help"></section>

      <section class="section when-talk-not-fit band--ink" id="when-not-fit" data-island="when-talk-not-fit"></section>

      <section class="section when-talk-conversation" id="when-conversation" data-island="when-talk-conversation"></section>

      <section class="section section--alt when-talk-first" id="when-first">
        <div class="container">
          <div class="split when-talk-first__split">
            <div class="split__text when-talk-first__copy" data-island="when-talk-first"></div>
            <figure class="split__image when-talk-first__media">
              <img src="${FIRST_IMAGE}" alt="${FIRST_IMAGE_ALT}" loading="lazy" decoding="async" width="800" height="800">
            </figure>
          </div>
        </div>
      </section>

      <section class="section when-talk-cta band--ink" id="when-cta">
        <figure class="when-talk-cta__media" aria-hidden="true">
          <img src="${FINAL_IMAGE}" alt="${FINAL_IMAGE_ALT}" loading="lazy" decoding="async" width="1400" height="1208">
        </figure>
        <div class="when-talk-cta__scrim" aria-hidden="true"></div>
        <div class="container">
          <div class="when-talk-cta__inner" data-island="when-talk-cta"></div>
        </div>
      </section>
    </div>
  `;

  return applyCmsPage(await getPage('when-we-should-talk'), html, {
    id: 'when-hero',
    minHeight: '80vh',
    label: 'When We Should Talk',
    titleHtml: 'Something isn’t<br>quite clicking.',
    subtitle:
      'You might not need another agency. You might need someone to look at the problem differently.',
  });
}
