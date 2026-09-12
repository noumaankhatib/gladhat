/* ===================================================
   GLADHAT — Homepage: A Different Way of Seeing
   Section map (Phase 2 — one purpose per section):
   01 section-hero               — A different way of seeing
   05 section-client-marquee     — Real clients (logo proof)
   02 section-perspective        — Too close to see it clearly?
   .. section-beyond             — Looking beyond the obvious
   .. section-essence            — Every business has an essence (video)
   .. section-connecting         — Connecting the dots
   .. section-curiosity-first    — Curiosity first
   .. section-creating-matters   — Creating what matters
   08 section-true-stories       — True Stories (buyer's-eyes story + case studies)
   09 section-thinking-difference — Thinking that makes a difference
   10 section-approach-spotlight — Approach (how I work)
   11 section-start-conversation — Single primary CTA: Let's Talk
   =================================================== */

import { getPage, slot, imageUrl } from '../services/content-service.js';
import { ConversationSpotlight } from '../components/ConversationSpotlight.js';
import { APPROACH_INTRO, APPROACH_STEPS } from '../utils/approach-steps.js';
import {
  TRUE_STORIES_AFTER,
  TRUE_STORIES_BEFORE,
  TRUE_STORIES_CTA,
  TRUE_STORIES_INTRO,
  TRUE_STORIES_JOURNEY,
  TRUE_STORIES_STATS,
  TRUE_STORIES_VIDEO,
  TRUE_STORIES_VIDEO_ALT,
} from '../utils/true-stories-content.js';
import {
  ESSENCE_INTRO,
  ESSENCE_INVESTIGATION,
  ESSENCE_LAYERS,
  ESSENCE_VIDEO,
  ESSENCE_VIDEO_POSTER,
} from '../utils/essence-content.js';
import {
  CONNECTING_CTA,
  CONNECTING_FALLBACK_ALT,
  CONNECTING_INTRO,
  CONNECTING_OBJECTS,
  CONNECTING_OUTCOMES,
  CONNECTING_PHILOSOPHY,
  CONNECTING_VISUAL_IMAGE,
} from '../utils/connecting-content.js';
import { BEYOND_HERO_ALT, BEYOND_HERO_IMAGE, BEYOND_QUESTIONS } from '../utils/beyond-questions.js';
import { PERSPECTIVE_HERO_ALT, PERSPECTIVE_HERO_POSTER, PERSPECTIVE_HERO_VIDEO, PERSPECTIVE_OBSERVATIONS } from '../utils/perspective-blindspots.js';
import {
  CURIOSITY_BOOKS,
  CURIOSITY_INTRO,
  CURIOSITY_PHILOSOPHY,
  CURIOSITY_SCULPTURE_ALT,
  CURIOSITY_VISUAL_GIF,
} from '../utils/curiosity-first-content.js';
import {
  CREATING_CLOSING,
  CREATING_DELIVERABLES,
  CREATING_INSTALLATION_ALT,
  CREATING_INSTALLATION_IMAGE,
  CREATING_INTRO,
  CREATING_OUTPUTS,
  CREATING_PHILOSOPHY_EMPHASIS,
  CREATING_PHILOSOPHY_LEAD,
} from '../utils/creating-matters-content.js';
export async function HomePage() {
  const page = await getPage('home');
  const f = page?.fields || {};
  const heroSub = slot(f.gladhat_home_hero_sub, "Most founders don't need more ideas.<br>\n            They need a different perspective.");
  const heroCta = slot(f.gladhat_home_hero_cta, "Let's Talk");
  const heroVisual = imageUrl(f.gladhat_home_hero_image, '/images/hero-portal-perspective.jpg');
  const scrolly1 = imageUrl(f.gladhat_home_q1_image, '/images/epic_founders.png');
  const scrolly3 = imageUrl(f.gladhat_home_bento1_image, '/images/epic_essence.png');
  const scrolly4 = imageUrl(f.gladhat_home_bento2_image, '/images/epic_connecting.png');

  const featuredWork = [
    {
      client: 'Server Factory',
      title: "Seeing Through the Buyer's Eyes",
      link: '/server-factory',
      img: scrolly1,
      imgAlt: 'Server Factory story',
    },
    {
      client: 'First Light',
      title: 'Finding the Right Language',
      link: '/firstlight',
      img: scrolly3,
      imgAlt: 'First Light story',
    },
    {
      client: 'Tonbo Ventures',
      title: 'Recognising the Value of Thinking',
      link: '/tonbo',
      img: scrolly4,
      imgAlt: 'Tonbo Ventures story',
    },
  ];

  return `
    <svg class="sr-only" aria-hidden="true" width="0" height="0">
      <defs>
        <clipPath id="heroWaveClip" clipPathUnits="objectBoundingBox">
          <path d="M0.22,0 C0.08,0.18 0.32,0.32 0.14,0.52 C0.02,0.68 0.26,0.84 0.18,1 L1,1 L1,0 Z"/>
        </clipPath>
      </defs>
    </svg>

    <!-- 01 · Hero -->
    <section class="hero hero--editorial hero--portal section-hero" id="section-hero" aria-label="Hero">
      <div
        class="hero__layout"
        data-island="hero-motion"
        data-hero-img="${heroVisual}"
        data-hero-cta="${heroCta.replace(/"/g, '&quot;')}"
        data-hero-sub="Most founders don't need more ideas.&#10;They need a different perspective."
      >
        <div class="hero__content">
          <p class="hero__section-label">
            <span class="hero__section-num" aria-hidden="true">01</span>
            <span>A different way of seeing</span>
          </p>
          <h1 class="hero__title">
            A different way of <span class="accent">seeing.</span>
          </h1>
          <p class="hero__subtitle">
            ${heroSub}
          </p>
          <div class="hero__actions">
            <a href="/contact" class="btn btn--primary btn--lg btn--pill hero__cta" id="hero-cta">
              ${heroCta} <span class="btn-arrow">→</span>
            </a>
          </div>
        </div>
        <div class="hero__media">
          <div class="hero-portal">
            <figure class="hero-portal__figure">
              <div class="hero-portal__image-wrap">
                <img src="${heroVisual}" alt="A person stands inside a dark architectural passage, facing a large circular opening that reveals a clear, sunlit mountain and lake landscape beyond" id="hero-image" width="1400" height="1208">
              </div>
              <div class="hero-portal__fade" aria-hidden="true"></div>
              <div class="hero-portal__ring" aria-hidden="true"></div>
              <p class="hero-portal__caption">
                <span>Same business.</span>
                <span class="hero-portal__caption-line--accent">A different perspective.</span>
              </p>
            </figure>
          </div>
        </div>
      </div>
    </section>

    <div class="marquee-container section-client-marquee" id="section-client-marquee" aria-label="Client marquee">
      <div class="marquee-track">
        ${Array(4).fill().map(() => `
          <div class="marquee-item">
            <div class="marquee-brand">
              <img src="/images/logos/server_factory.png" alt="Server Factory Logo" class="marquee-logo-img" loading="lazy">
              <span class="marquee-text">Server Factory</span>
            </div>
            <span class="marquee-separator">✦</span>
            <div class="marquee-brand">
              <img src="/images/logos/first_light.png" alt="First Light Logo" class="marquee-logo-img" loading="lazy">
              <span class="marquee-text">First Light</span>
            </div>
            <span class="marquee-separator">✦</span>
            <div class="marquee-brand">
              <img src="/images/logos/tonbo.png" alt="Tonbo Logo" class="marquee-logo-img" loading="lazy">
              <span class="marquee-text">Tonbo</span>
            </div>
            <span class="marquee-separator">✦</span>
            <div class="marquee-brand">
              <img src="/images/logos/ensights.png" alt="enSights Logo" class="marquee-logo-img" loading="lazy">
              <span class="marquee-text">enSights</span>
            </div>
            <span class="marquee-separator">✦</span>
            <div class="marquee-brand">
              <img src="/images/logos/provengo.svg" alt="Provengo Logo" class="marquee-logo-img" loading="lazy">
              <span class="marquee-text">Provengo</span>
            </div>
            <span class="marquee-separator">✦</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 02 · Perspective (too close to see it clearly) -->
    <section class="perspective-band section-perspective" id="section-perspective" aria-label="Too close to see it clearly">
      <div class="container perspective-band__root" data-island="perspective">
        <div class="perspective-band__shell">
          <div class="perspective-band__top">
            <header class="perspective-band__copy">
              <p class="perspective-band__label">
                <span class="perspective-band__label-num" aria-hidden="true">02</span>
                <span class="perspective-band__label-text">Too close to see it clearly?</span>
              </p>
              <h2 class="perspective-band__title">Too close to<br>see it <span class="accent">clearly?</span></h2>
              <div class="perspective-band__intro">
                <p>When you live with your business, you tend to stop noticing what confuses potential customers.</p>
                <p>That's normal. It's what happens when you're too close.</p>
              </div>
              <div class="perspective-band__actions">
                <a href="/working-together" class="text-link perspective-band__link">Step back <span aria-hidden="true">→</span></a>
              </div>
            </header>
            <div class="perspective-band__visual-col">
              <figure class="perspective-band__visual-wrap">
                <video class="perspective-band__hero-video" src="${PERSPECTIVE_HERO_VIDEO}" poster="${PERSPECTIVE_HERO_POSTER}" aria-label="${PERSPECTIVE_HERO_ALT}" muted playsinline loop autoplay preload="auto"></video>
              </figure>
            </div>
          </div>
          <div class="perspective-band__observations-panel">
            <ol class="perspective-band__observations">
              ${PERSPECTIVE_OBSERVATIONS.map(
                (item, index) => `
              <li class="perspective-band__observation-item${index === 0 ? ' perspective-band__observation-item--active' : ''}">
                <button type="button" class="perspective-band__observation-btn" aria-current="${index === 0 ? 'true' : 'false'}">
                  <span class="perspective-band__observation-body">
                    <span class="perspective-band__observation-num" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
                    <span class="perspective-band__observation-text">${item.text}</span>
                  </span>
                  <span class="perspective-band__observation-icon-wrap">
                    <img class="perspective-band__observation-icon" src="${item.icon}" alt="${item.iconAlt}" loading="lazy" width="64" height="64">
                  </span>
                </button>
              </li>`
              ).join('')}
            </ol>
          </div>
        </div>
      </div>
    </section>

    <!-- .. · Beyond the obvious -->
    <section class="beyond-band section-beyond" id="section-beyond" aria-label="Beyond the obvious">
      <div class="container beyond-band__root" data-island="beyond-obvious">
        <div class="beyond-band__shell">
          <div class="beyond-band__top">
            <header class="beyond-band__copy">
              <p class="beyond-band__label">
                <span class="beyond-band__label-num" aria-hidden="true">03</span>
                <span class="beyond-band__label-text">Looking beyond the obvious</span>
              </p>
              <h2 class="beyond-band__title">Better questions. Clearer <span class="accent">answers.</span></h2>
              <p class="beyond-band__intro">I help founders and leadership teams look beyond the obvious.</p>
              <div class="beyond-band__actions">
                <a href="/working-together" class="text-link beyond-band__link">Explore how <span aria-hidden="true">→</span></a>
              </div>
            </header>
            <div class="beyond-band__visual-col">
              <figure class="beyond-band__visual-wrap">
                <img class="beyond-band__hero-image" src="${BEYOND_HERO_IMAGE}" alt="${BEYOND_HERO_ALT}" loading="lazy" width="1024" height="682">
              </figure>
            </div>
          </div>
          <div class="beyond-band__questions-panel">
            <ol class="beyond-band__questions">
              ${BEYOND_QUESTIONS.map(
                (item, index) => `
              <li class="beyond-band__question-item${index === 0 ? ' beyond-band__question-item--active' : ''}">
                <button type="button" class="beyond-band__question-btn" aria-current="${index === 0 ? 'true' : 'false'}">
                  <span class="beyond-band__question-body">
                    <span class="beyond-band__question-num" aria-hidden="true">${item.num}</span>
                    <span class="beyond-band__question-text">${item.text}</span>
                  </span>
                  <span class="beyond-band__question-icon-wrap">
                    <img class="beyond-band__question-icon" src="${item.icon}" alt="${item.iconAlt}" loading="lazy" width="64" height="64">
                  </span>
                </button>
              </li>`
              ).join('')}
            </ol>
          </div>
        </div>
      </div>
    </section>

    <!-- .. · Essence -->
    <section class="essence-band section-essence" id="section-essence" aria-label="Essence">
      <div class="container essence-band__root" data-island="essence">
        <div class="essence-band__shell">
          <div class="essence-band__content">
            <div class="essence-band__hero-grid">
              <header class="essence-band__copy">
                <p class="essence-band__label">
                  <span class="essence-band__label-num" aria-hidden="true">04</span>
                  <span class="essence-band__label-text">Every business has an essence</span>
                </p>
                <h2 class="essence-band__title">There's a clearer story in your <span class="accent">business.</span></h2>
                <p class="essence-band__intro">${ESSENCE_INTRO}</p>
                <div class="essence-band__actions">
                  <a href="/working-together" class="text-link essence-band__link">Explore how <span aria-hidden="true">→</span></a>
                </div>
                <p class="essence-band__aside">Same business. Less noise. A clearer story.</p>
              </header>
              <div class="essence-band__visual-col">
                <div class="essence-band__hero-viewport">
                  <video class="essence-band__hero-video" src="${ESSENCE_VIDEO}" poster="${ESSENCE_VIDEO_POSTER}" muted playsinline loop autoplay preload="auto"></video>
                </div>
              </div>
            </div>
            <div class="essence-band__investigation-panel">
              <ol class="essence-band__investigation">
                ${ESSENCE_INVESTIGATION.map(
                  (item, index) => `
                <li class="essence-band__investigation-item${index === 0 ? ' essence-band__investigation-item--active' : ''}">
                  <button type="button" class="essence-band__investigation-btn" aria-current="${index === 0 ? 'true' : 'false'}">
                    <span class="essence-band__investigation-body">
                      <span class="essence-band__investigation-num" aria-hidden="true">${item.num}</span>
                      <span class="essence-band__investigation-copy">
                        <span class="essence-band__investigation-text">${item.text}</span>
                        <span class="essence-band__investigation-detail">${item.detail}</span>
                      </span>
                    </span>
                    <span class="essence-band__investigation-icon-wrap">
                      <img class="essence-band__investigation-icon" src="${item.icon}" alt="${item.iconAlt}" loading="lazy" width="64" height="64">
                    </span>
                  </button>
                </li>`
                ).join('')}
              </ol>
            </div>
            <ul class="sr-only" aria-label="Layers surrounding the essence">
              ${ESSENCE_LAYERS.map((layer) => `<li>${layer.label} — ${layer.sublabel}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- .. · Connecting the dots -->
    <section class="connecting-band section-connecting" id="section-connecting" aria-label="Connecting the dots">
      <div class="container connecting-band__root" data-island="connecting-dots">
        <div class="connecting-band__shell">
          <div class="connecting-band__content">
            <div class="connecting-band__hero-grid">
              <header class="connecting-band__copy">
                <p class="connecting-band__label">
                  <span class="connecting-band__label-num" aria-hidden="true">05</span>
                  <span class="connecting-band__label-text">Connecting the dots</span>
                </p>
                <h2 class="connecting-band__title">A more<br>connected<br>way of <span class="accent">thinking.</span></h2>
                <p class="connecting-band__intro">${CONNECTING_INTRO}</p>
                <p class="connecting-band__philosophy">${CONNECTING_PHILOSOPHY}</p>
                <div class="connecting-band__actions">
                  <a href="/working-together" class="text-link connecting-band__link">${CONNECTING_CTA} <span aria-hidden="true">→</span></a>
                </div>
              </header>
              <figure class="connecting-band__visual-wrap">
                <img class="connecting-band__visual-image" src="${CONNECTING_VISUAL_IMAGE}" alt="${CONNECTING_FALLBACK_ALT}" loading="lazy" decoding="async" width="1200" height="900">
              </figure>
            </div>
            <div class="connecting-band__outcomes-panel">
              <ol class="connecting-band__outcomes">
                ${CONNECTING_OUTCOMES.map(
                  (item, index) => `
                <li class="connecting-band__outcome-item${index === 0 ? ' connecting-band__outcome-item--active' : ''}">
                  <button type="button" class="connecting-band__outcome-btn" aria-current="${index === 0 ? 'true' : 'false'}">
                    <span class="connecting-band__outcome-num" aria-hidden="true">${item.num}</span>
                    <span class="connecting-band__outcome-copy">
                      <span class="connecting-band__outcome-title">${item.title}</span>
                      <span class="connecting-band__outcome-detail">${item.detail}</span>
                    </span>
                  </button>
                </li>`
                ).join('')}
              </ol>
            </div>
            <ul class="sr-only" aria-label="Connected concepts">
              ${CONNECTING_OBJECTS.map((object) => `<li>${object.label}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- .. · Curiosity first -->
    <section class="curiosity-first-band section-curiosity-first" id="section-curiosity-first" aria-label="Curiosity first">
      <div class="container curiosity-first-band__root" data-island="curiosity-first">
        <div class="curiosity-first-band__shell">
          <div class="curiosity-first-band__grid">
            <header class="curiosity-first-band__copy">
              <p class="curiosity-first-band__label">
                <span class="curiosity-first-band__label-num" aria-hidden="true">06</span>
                <span class="curiosity-first-band__label-text">Curiosity first</span>
              </p>
              <h2 class="curiosity-first-band__title">Curiosity<br><span class="accent">first.</span></h2>
              <div class="curiosity-first-band__body">
                ${CURIOSITY_INTRO.map((paragraph) => `<p>${paragraph}</p>`).join('')}
              </div>
              <p class="curiosity-first-band__philosophy">${CURIOSITY_PHILOSOPHY}</p>
            </header>
            <figure class="curiosity-first-band__visual-wrap">
              <img class="curiosity-first-band__visual-gif" src="${CURIOSITY_VISUAL_GIF}" alt="${CURIOSITY_SCULPTURE_ALT}" loading="lazy" decoding="async" width="960" height="1080">
            </figure>
          </div>
          <ul class="sr-only" aria-label="Curiosity process">
            ${CURIOSITY_BOOKS.map((book) => `<li>${book.label} — ${book.annotation}</li>`).join('')}
          </ul>
        </div>
      </div>
    </section>

    <!-- .. · Creating what matters -->
    <section class="creating-matters-band section-creating-matters" id="section-creating-matters" aria-label="Creating what matters">
      <div class="container creating-matters-band__root" data-island="creating-matters">
        <div class="creating-matters-band__shell">
          <div class="creating-matters-band__grid">
            <header class="creating-matters-band__copy">
              <p class="creating-matters-band__label">
                <span class="creating-matters-band__label-num" aria-hidden="true">07</span>
                <span class="creating-matters-band__label-text">Creating what matters</span>
              </p>
              <h2 class="creating-matters-band__title">Creating what <span class="accent">matters</span></h2>
              <div class="creating-matters-band__body">
                <p>${CREATING_INTRO}</p>
                <ul class="creating-matters-band__deliverables">
                  ${CREATING_DELIVERABLES.map((line) => `<li>${line}</li>`).join('')}
                </ul>
                <p>${CREATING_CLOSING}</p>
              </div>
              <p class="creating-matters-band__philosophy">${CREATING_PHILOSOPHY_LEAD} <em class="creating-matters-band__philosophy-line">${CREATING_PHILOSOPHY_EMPHASIS}</em></p>
            </header>
            <div class="creating-matters-band__visual-col">
              <div class="creating-matters-band__visual-frame">
                <figure class="creating-matters-band__installation-wrap">
                  <img class="creating-matters-band__installation-image" src="${CREATING_INSTALLATION_IMAGE}" alt="${CREATING_INSTALLATION_ALT}" loading="lazy" decoding="async" width="1024" height="682">
                </figure>
              </div>
            </div>
          </div>
          <div class="creating-matters-band__outputs-panel">
            <ol class="creating-matters-band__outputs">
              ${CREATING_OUTPUTS.map(
                (item, index) => `
              <li class="creating-matters-band__output-item${index === 0 ? ' creating-matters-band__output-item--active' : ''}">
                <button type="button" class="creating-matters-band__output-btn" aria-current="${index === 0 ? 'true' : 'false'}">
                  <span class="creating-matters-band__output-num" aria-hidden="true">${item.num}</span>
                  <span class="creating-matters-band__output-label">${item.label}</span>
                </button>
              </li>`
              ).join('')}
            </ol>
          </div>
        </div>
      </div>
    </section>

    <!-- .. · True Stories -->
    <section class="true-stories-band section-true-stories" id="section-true-stories" aria-label="True Stories">
      <div class="container true-stories-band__root" data-island="true-stories">
        <div class="true-stories-band__shell">
          <div class="true-stories-band__grid">
            <header class="true-stories-band__copy">
              <p class="true-stories-band__label">
                <span class="true-stories-band__label-num" aria-hidden="true">08</span>
                <span class="true-stories-band__label-text">True Stories</span>
              </p>
              <h2 class="true-stories-band__title">Seeing through the <span class="accent">buyer's eyes</span></h2>
              <p class="true-stories-band__intro">${TRUE_STORIES_INTRO}</p>
              <div class="true-stories-band__shift">
                <div class="true-stories-band__shift-item">
                  <span class="true-stories-band__shift-tag">Before</span>
                  <p class="true-stories-band__shift-text">${TRUE_STORIES_BEFORE}</p>
                </div>
                <div class="true-stories-band__shift-item true-stories-band__shift-item--after">
                  <span class="true-stories-band__shift-tag">After</span>
                  <p class="true-stories-band__shift-text">${TRUE_STORIES_AFTER}</p>
                </div>
              </div>
              <div class="true-stories-band__journey">
                <p class="true-stories-band__journey-label">The buyer's journey</p>
                <ol class="true-stories-band__journey-steps">
                  ${TRUE_STORIES_JOURNEY.map((step) => `<li>${step}</li>`).join('')}
                </ol>
              </div>
              <div class="true-stories-band__stats">
                ${TRUE_STORIES_STATS.map(
                  (stat) => `
                <div class="true-stories-band__stat">
                  <span class="true-stories-band__stat-value">${stat.value}</span>
                  <span class="true-stories-band__stat-label">${stat.label}</span>
                  <span class="true-stories-band__stat-detail">${stat.detail}</span>
                </div>`
                ).join('')}
              </div>
              <div class="true-stories-band__actions">
                <a href="${TRUE_STORIES_CTA.href}" class="text-link true-stories-band__link">${TRUE_STORIES_CTA.label} <span aria-hidden="true">→</span></a>
              </div>
            </header>
            <div class="true-stories-band__visual-col">
              <div class="true-stories-visual">
                <video class="true-stories-video" src="${TRUE_STORIES_VIDEO}" muted playsinline loop autoplay preload="metadata" aria-hidden="true"></video>
              </div>
              <p class="sr-only">${TRUE_STORIES_VIDEO_ALT}</p>
            </div>
          </div>

          <div class="true-stories-band__work">
            <header class="true-stories-band__work-header">
              <span class="true-stories-band__work-label">More real businesses</span>
              <a href="/work" class="btn btn--outline btn--pill true-stories-band__work-cta">View all work <span class="btn-arrow">→</span></a>
            </header>
            <div class="true-stories-band__work-grid">
              ${featuredWork.map((story, index) => `
                <a class="work-card work-card--on-dark" href="${story.link}" style="--card-index: ${index}">
                  <figure class="work-card__media">
                    <img src="${story.img}" alt="${story.imgAlt}" loading="lazy" width="1200" height="800">
                  </figure>
                  <h3 class="work-card__client">${story.client}</h3>
                  <span class="work-card__link">${story.title} <span class="work-card__arrow" aria-hidden="true">→</span></span>
                </a>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 09 · Thinking that makes a difference -->
    <section class="section thinking-difference section-thinking-difference" id="section-thinking-difference" aria-label="Thinking that makes a difference">
      <div class="container" data-island="thinking-difference">
        <div class="thinking-difference__grid">
          <div class="thinking-difference__copy">
            <p class="thinking-difference__label reveal">
              <span class="thinking-difference__label-num" aria-hidden="true">09</span>
              <span class="thinking-difference__label-text">Thinking that makes a difference</span>
            </p>
            <h2 class="thinking-difference__title reveal">Thinking that makes <span class="accent">a difference</span>.</h2>
            <p class="thinking-difference__lead reveal">Clearer thinking changes more than the answer. It changes the questions, the priorities and the possibilities you see along the way.</p>
            <p class="thinking-difference__close reveal">That is where meaningful work begins.</p>
            <div class="thinking-difference__cta-wrap reveal">
              <a href="/working-together" class="btn btn--primary btn--pill thinking-difference__cta">See how I think <span class="btn-arrow">→</span></a>
            </div>
          </div>
          <div class="thinking-difference__installation">
            <img
              class="thinking-difference__scene"
              src="/images/09_section.png"
              alt="An architectural installation of glass and stone frames converging toward a single clear opening onto a sunlit landscape, labelled What you notice, What you question, What you prioritise, What you decide, What you create — representing the journey from noticing to creating."
              loading="lazy"
              width="1680"
              height="940"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- 10 · Approach spotlight -->
    <section class="section approach-spotlight section-approach-spotlight" id="section-approach-spotlight" aria-label="Our approach">
      <div class="container" data-island="approach-spotlight">
        <header class="approach-spotlight__header">
          <div class="approach-spotlight__intro">
            <p class="approach-spotlight__label">
              <span class="approach-spotlight__label-num" aria-hidden="true">10</span>
              <span class="approach-spotlight__label-text">Our approach</span>
            </p>
            <h2 class="approach-spotlight__title">The more I understand your business, the more <span class="accent">we discover together</span>.</h2>
            <p class="approach-spotlight__lead">${APPROACH_INTRO}</p>
          </div>
          <a href="/working-together" class="btn btn--primary btn--pill approach-spotlight__cta">See how we work together <span class="btn-arrow">→</span></a>
        </header>

        <div class="approach-spotlight__visual">
          <figure class="approach-spotlight__visual-frame">
            <img
              class="approach-spotlight__visual-image"
              src="/images/10_section.png"
              alt="Five sculptural objects on a stone shelf, each representing a stage of the approach: listening, looking, challenging, connecting and creating."
              loading="lazy"
              width="1680"
              height="940"
            >
          </figure>
        </div>

        <div class="approach-spotlight__body">
          <ol class="approach-spotlight__transcript" aria-label="How we work together, step by step">
            ${APPROACH_STEPS.map((step, index) => `
              <li class="approach-spotlight__beat${index === 0 ? ' approach-spotlight__beat--active' : ''}">
                <button type="button" class="approach-spotlight__beat-trigger" aria-expanded="${index === 0 ? 'true' : 'false'}">
                  <span class="approach-spotlight__beat-num">${step.num}</span>
                  <span class="approach-spotlight__beat-label">${step.title}</span>
                  <span class="approach-spotlight__beat-chevron" aria-hidden="true"></span>
                </button>
                <div class="approach-spotlight__beat-panel">
                  <div class="approach-spotlight__beat-copy">
                    <p class="approach-spotlight__beat-quote">${step.quote}</p>
                    <div class="approach-spotlight__beat-detail">
                      ${step.details}
                    </div>
                  </div>
                </div>
              </li>
            `).join('')}
          </ol>
        </div>
      </div>
    </section>

    <!-- 12 · Conversation — the single primary CTA -->
    ${ConversationSpotlight()}
  `;
}
