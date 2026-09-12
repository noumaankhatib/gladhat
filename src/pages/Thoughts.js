/* ===================================================
   GLADHAT — Thoughts (Blog Index)
   =================================================== */

import { getPage, getPosts, imageUrl } from '../services/content-service.js';
import { applyCmsPage } from '../utils/page-compose.js';

/* Real published articles don't exist yet. These are themes already
   reflected in real work elsewhere on the site (case studies, About,
   Working Together) — presented honestly as work-in-progress, not
   dressed up as articles with fake publish dates. */
const EXPLORING_THEMES = [
  {
    title: 'Why "What Do You Do?" Is the Wrong Question',
    excerpt: 'Most people answer with their job title. But what if the real answer is about the problems you solve and the perspectives you bring?',
    tag: 'Positioning'
  },
  {
    title: 'The Invisible Work That Creates the Most Value',
    excerpt: 'The deliverables get the attention. But the conversations, questions and shifts in perspective that happen before them often create the greatest commercial impact.',
    tag: 'Strategy'
  },
  {
    title: 'When Clarity Beats Creativity',
    excerpt: 'There\'s a time for bold creative ideas. But sometimes what a business needs most is simply a clearer way of explaining what it already does well.',
    tag: 'Communication'
  },
  {
    title: 'The Questions Nobody Asks',
    excerpt: 'Every business has questions hiding in plain sight. The ones that feel too obvious to ask, or too uncomfortable to answer. Those are usually the ones worth exploring.',
    tag: 'Curiosity'
  },
  {
    title: 'Seeing Through Your Customer\'s Eyes',
    excerpt: 'You know your business inside out. But when was the last time you experienced it the way your customers do? The gap between the two is where the opportunities hide.',
    tag: 'Customer Insight'
  },
  {
    title: 'Why Good Conversations Beat Good Campaigns',
    excerpt: 'The best work I\'ve ever done didn\'t start with a brief. It started with a conversation. Here\'s why that matters more than most people realise.',
    tag: 'Process'
  }
];

export async function ThoughtsPage() {
  const cmsPosts = await getPosts();
  const hasRealPosts = Boolean(cmsPosts && cmsPosts.length);

  const articles = hasRealPosts
    ? cmsPosts.map((p) => ({
        title: p.title,
        excerpt: typeof p.excerpt === 'string' ? p.excerpt.replace(/<[^>]+>/g, '').trim() : '',
        date: p.date || '',
        tag: p.tag || 'Thoughts',
        image: imageUrl(p.image, '/images/curiosity.png'),
      }))
    : [];

  const featuredArticle = articles[0];
  const remainingArticles = articles.slice(1);

  const articleCards = remainingArticles.map((a, i) => `
    <article class="card reveal reveal--delay-${(i % 4) + 1}" id="thought-${i + 2}">
      <div class="card__label">${a.tag}</div>
      <h3 class="card__title">${a.title}</h3>
      <p class="card__text">${a.excerpt}</p>
      <span class="card__link">
        ${a.date} <span class="arrow">→</span>
      </span>
    </article>
  `).join('');

  /* When the CMS has real posts, show the full featured + grid treatment.
     Otherwise (current state), don't dress up placeholders as articles —
     point to the one genuinely real piece of thinking content and list
     the rest as themes taking shape, not "Coming soon" posts. */
  const thinkingSection = hasRealPosts ? `
    <section class="section section--alt" id="thoughts-grid">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-header__label">Featured</span>
          <h2 class="section-header__title">Latest <span class="accent">Thinking</span></h2>
        </div>

        <div class="split split--reverse reveal" style="align-items: center; background: rgba(255,255,255,0.02); padding: var(--space-4xl); border-radius: var(--radius-lg); border: 1px solid rgba(255,255,255,0.05); margin-bottom: var(--space-6xl);">
          <div class="split__text prose">
            <div class="card__label" style="margin-bottom: var(--space-sm); font-size: var(--fs-sm);">${featuredArticle.tag}</div>
            <h2 style="font-size: var(--fs-2xl); color: var(--color-heading); margin-bottom: var(--space-md);">${featuredArticle.title}</h2>
            <p style="font-size: var(--fs-lg); color: var(--color-text-muted); margin-bottom: var(--space-lg); line-height: var(--lh-body);">${featuredArticle.excerpt}</p>
            <span class="card__link" style="color: var(--color-accent); font-weight: var(--fw-medium); text-transform: uppercase; letter-spacing: var(--ls-wide);">
              ${featuredArticle.date} <span class="arrow">→</span>
            </span>
          </div>
          <div class="split__image reveal reveal--delay-2">
            <img src="${featuredArticle.image || '/images/curiosity.png'}" alt="${featuredArticle.title}" loading="lazy" style="border-radius: var(--radius-md); box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
          </div>
        </div>

        <div class="grid grid--2">
          ${articleCards}
        </div>
      </div>
    </section>
  ` : `
    <section class="section section--alt" id="thoughts-start-here">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-header__label">Start here</span>
          <h2 class="section-header__title">Real thinking, <span class="accent">right now</span></h2>
        </div>
        <div class="split reveal" style="align-items: center;">
          <div class="split__text prose" style="max-width: none;">
            <p class="highlight-text">Long-form articles are still taking shape. In the meantime, here's something real you can use today.</p>
            <p>Six reflective exercises to help you step outside your business for a few minutes and see it through fresh eyes.</p>
            <a href="/see-your-business-differently" class="btn btn--primary" id="thoughts-see-differently-cta">Try the exercises <span class="btn-arrow">→</span></a>
          </div>
          <div class="split__image reveal reveal--delay-2">
            <img src="/images/prism.png" alt="Prism refracting light" loading="lazy" style="border-radius: var(--radius-lg); box-shadow: var(--shadow-glow);">
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="thoughts-themes">
      <div class="container">
        <div class="section-header reveal" style="margin-bottom: var(--space-2xl);">
          <span class="section-header__label">Taking shape</span>
          <h2 class="section-header__title">Themes I'm <span class="accent">exploring</span></h2>
          <p class="section-header__text">Not yet full articles — but questions I keep returning to in client conversations.</p>
        </div>
        <ul style="max-width: 60ch; margin: 0 auto; list-style: none; padding: 0; display: flex; flex-direction: column; gap: var(--space-lg);">
          ${EXPLORING_THEMES.map((t, i) => `
            <li class="reveal reveal--delay-${(i % 4) + 1}">
              <span class="section-header__label" style="display: block; margin-bottom: var(--space-xs);">${t.tag}</span>
              <strong style="font-family: var(--font-heading); font-size: var(--fs-lg); color: var(--color-heading); display: block; margin-bottom: var(--space-xs);">${t.title}</strong>
              <span style="color: var(--color-text-muted);">${t.excerpt}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    </section>
  `;

  const html = `
    <section class="hero" id="thoughts-hero" style="min-height: 55vh;">
      <div class="hero__bg"></div>
      <div class="container">
        <div class="hero__content">
          <span class="hero__label">Gladhat</span>
          <h1 class="hero__title"><span class="accent">Thoughts</span></h1>
          <p class="hero__subtitle">
            Questions, patterns and observations that shape the way I think about business, communication and the people behind them.
          </p>
        </div>
      </div>
    </section>

    <section class="section" id="thoughts-intro">
      <div class="container">
        <div class="split reveal" style="align-items: center;">
          <div class="split__text prose" style="max-width: none;">
            <p>Some ideas arrive during client conversations.</p>
            <p>Others appear while walking, reading or quietly staring out of the window with a cup of coffee.</p>
            <p>This is where I explore the questions, patterns and observations that shape the way I think about business, communication and the people behind them.</p>
            <p class="highlight-text">If one of these articles starts a conversation or helps you see something a little differently, then it has done its job.</p>
          </div>
          <div class="split__image reveal reveal--delay-2">
            <img src="/images/silhouette.png" alt="Silhouette" loading="lazy" style="border-radius: var(--radius-lg); box-shadow: var(--shadow-glow);">
          </div>
        </div>
      </div>
    </section>

    ${thinkingSection}

    <section class="section section--alt" id="thoughts-cta">
      <div class="container">
        <div class="prose reveal" style="text-align: center;">
          <h2>Have a question worth exploring?</h2>
          <p>Sometimes the best ideas start as a conversation, not an article.</p>
          <div style="margin-top: var(--space-2xl); display: flex; flex-direction: column; align-items: center; gap: var(--space-md);">
            <a href="/contact" class="btn btn--primary btn--lg" id="thoughts-cta-btn">
              Let's Talk <span class="btn-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  `;

  return applyCmsPage(await getPage('theblog'), html, {
    id: 'thoughts-hero',
    minHeight: '55vh',
    label: 'Gladhat',
    titleHtml: '<span class="accent">Thoughts</span>',
    subtitle: 'Questions, patterns and observations that shape the way I think about business, communication and the people behind them.',
  });
}
