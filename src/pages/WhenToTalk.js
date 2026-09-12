/* ===================================================
   GLADHAT — When We Should Talk
   =================================================== */

import { getPage } from '../services/content-service.js';
import { applyCmsPage } from '../utils/page-compose.js';
import { AudioPrompt } from '../components/AudioPrompt.js';
import {
  WHEN_INTRO_INSIGHT,
  WHEN_SCENARIOS,
  renderIntroParagraphs,
  renderNextParagraphs,
  renderWhenScenario,
  renderWhenScenarioNav,
} from '../utils/when-scenarios.js';

const INTRO_AUDIO =
  "Most founders don't wake up thinking they need a new commercial strategy. They wake up thinking something isn't working. Growth has slowed. The message feels unclear. The website no longer reflects the quality of the business. Marketing isn't producing the results they expected. Or there's a feeling that a bigger opportunity exists, but they can't quite see it yet. Those are often the moments when an experienced outside perspective becomes valuable.";

export async function WhenToTalkPage() {
  const html = `
    <div class="when-talk-page">
      <section class="hero when-talk-hero" id="when-hero">
        <div class="when-talk-hero__scene" data-island="when-talk-scene"></div>
        <div class="hero__bg when-talk-hero__bg" aria-hidden="true"></div>
        <div class="container">
          <div class="hero__content" data-island="when-talk-hero">
            <span class="hero__label">Gladhat</span>
            <h1 class="hero__title">When We Should <span class="accent">Talk</span></h1>
            <p class="hero__subtitle">
              Most founders don't wake up thinking they need a new commercial strategy. They wake up thinking something isn't working.
            </p>
          </div>
        </div>
        <a href="#when-intro" class="when-talk-hero__scroll" aria-label="Scroll to content">
          <span class="when-talk-hero__scroll-label">Recognise yourself?</span>
          <span class="when-talk-hero__scroll-icon" aria-hidden="true">↓</span>
        </a>
      </section>

      <section class="section when-talk-intro" id="when-intro">
        <div class="container">
          <div class="split when-talk-intro__split">
            <div class="split__text when-talk-intro__text">
              ${AudioPrompt(INTRO_AUDIO)}
              <div data-island="when-talk-intro">
                ${renderIntroParagraphs()}
              </div>
            </div>
            <figure class="split__image when-talk-intro__media">
              <img src="/images/conversation.png" alt="A thoughtful conversation about your business" loading="eager" fetchpriority="high" decoding="async" width="800" height="800">
            </figure>
          </div>
        </div>
      </section>

      <section class="pullquote pullquote--sky when-talk-pullquote" aria-label="Pull quote">
        <p class="pullquote__text">${WHEN_INTRO_INSIGHT}</p>
      </section>

      <section class="when-talk-focus" id="when-focus" aria-label="Key insight" data-island="when-talk-focus"></section>

      <section class="section when-talk-scenarios" id="when-scenarios">
        <div class="container" data-island="when-talk-scenarios">
          <header class="section-header when-talk-scenarios__header">
            <span class="section-header__label">The Scenarios</span>
            <h2 class="section-header__title">When to <span class="accent">Talk</span></h2>
            <p class="when-talk-scenarios__lede">Five situations founders recognise — often before they can name what's wrong.</p>
          </header>
          <nav class="when-talk-nav" aria-label="Jump to scenario" data-when-talk-nav>
            ${renderWhenScenarioNav()}
          </nav>
          <div class="when-talk-scenarios__list">
            ${WHEN_SCENARIOS.map(renderWhenScenario).join('')}
          </div>
        </div>
      </section>

      <section class="section section--alt when-talk-next" id="when-next">
        <div class="container">
          <div class="split when-talk-next__split" data-island="when-talk-next">
            <div class="split__text when-talk-next__copy">
              <h2 class="when-talk-next__title">What happens <span class="accent">next?</span></h2>
              ${renderNextParagraphs()}
            </div>
            <figure class="split__image when-talk-intro__media when-talk-next__media">
              <img src="/images/research.png" alt="Research as the starting point for every engagement" loading="lazy" decoding="async" width="800" height="800">
            </figure>
          </div>
        </div>
      </section>

      <section class="section when-talk-cta band--ink" id="when-cta">
        <div class="container">
          <div class="prose when-talk-cta when-talk-script" data-island="when-talk-cta">
            <span class="when-talk-cta__eyebrow">Ready when you are</span>
            <h2>Let's talk</h2>
            <div class="when-talk-script__lines">
              <p class="when-talk-script__stage">If you've read this page and found yourself thinking,</p>
              <p class="when-talk-script__line when-talk-script__line--quote highlight-text">&ldquo;That's exactly where I am.&rdquo;</p>
              <p class="when-talk-script__line">I'd love to hear your story.</p>
              <p class="when-talk-script__line">Not because I already have the answers.</p>
              <p class="when-talk-script__line when-talk-script__line--closer">Because the right questions often lead us somewhere much more interesting than either of us expected.</p>
            </div>
            <div class="when-talk-cta__actions">
              <a href="/contact" class="btn btn--primary btn--lg btn--pill" id="when-cta-btn">
                Begin the Conversation <span class="btn-arrow">→</span>
              </a>
              <a href="mailto:m@gladhat.com" class="when-talk-cta__email">Or email m@gladhat.com</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;

  return applyCmsPage(await getPage('when-we-should-talk'), html, {
    id: 'when-hero',
    minHeight: '55vh',
    label: 'Gladhat',
    titleHtml: 'When We Should <span class="accent">Talk</span>',
    subtitle:
      "Most founders don't wake up thinking they need a new commercial strategy. They wake up thinking something isn't working.",
  });
}
