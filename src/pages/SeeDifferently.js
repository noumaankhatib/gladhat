/* ===================================================
   GLADHAT — See Your Business Differently
   =================================================== */

import { getPage } from '../services/content-service.js';
import { applyCmsPage } from '../utils/page-compose.js';
import { assetUrl } from '../config/env.js';

export async function SeeDifferentlyPage() {
  const exercises = [
    {
      num: '01',
      short: 'What customers would say',
      question: 'What would your best customers say you do better than anyone else?',
      body: `
        <p>Not what you believe. Not what your website says.</p>
        <p>What would <em>they</em> say?</p>
        <p>Write down the first three answers that come to mind. Then ask yourself:</p>`,
      prompt: 'How much of my marketing actually focuses on those strengths?',
    },
    {
      num: '02',
      short: 'Your first day',
      question: 'Imagine today is your first day in the business.',
      body: `
        <p>You know nothing. You've just arrived.</p>
        <p>You visit your website. You read your brochure. You browse your LinkedIn page.</p>`,
      prompt: 'What would confuse you?',
      after: '<p>What assumptions are you expected to understand? What questions remain unanswered?</p>',
    },
    {
      num: '03',
      short: 'If you disappeared',
      question: 'If your business disappeared tomorrow…',
      body: `
        <p>What would your customers genuinely miss?</p>
        <p>Not the products. Not the features.</p>`,
      prompt: 'What difference would disappear from their lives or businesses?',
    },
    {
      num: '04',
      short: 'One thing to say',
      question: 'If you could communicate only one thing…',
      body: `
        <p>Imagine you could leave every visitor with just one clear understanding of your business.</p>
        <p>What would it be?</p>
        <p>Would your website, presentations and sales conversations all communicate that same idea?</p>`,
      prompt: 'If not, why not?',
    },
    {
      num: '05',
      short: 'Unquestioned assumptions',
      question: 'What assumptions have you stopped questioning?',
      body: `
        <p>Every business develops habits.</p>
        <p>Messages become familiar. Processes become fixed. Ideas become accepted simply because they've existed for a long time.</p>
        <p>Ask yourself:</p>`,
      prompt: "What if one of our biggest assumptions isn't true anymore?",
    },
    {
      num: '06',
      short: 'The hidden opportunity',
      question: 'Where might the biggest opportunity be hiding?',
      body: `
        <p>Not the opportunity you're already pursuing. The one you haven't considered.</p>
        <p>A different audience. A new partnership. A simpler offer. A completely different way of explaining what you do.</p>
        <p>Or perhaps something else entirely.</p>`,
      prompt: 'If you gave yourself permission to look beyond the obvious… what might you discover?',
    },
  ];

  const html = `
    <section class="hero page-hero" id="see-hero">
      <div class="hero__bg"></div>
      <div class="container">
        <div class="hero__content">
          <span class="hero__label">Six exercises</span>
          <h1 class="hero__title">See your business <span class="accent">differently</span></h1>
          <p class="hero__subtitle">
            Six reflective exercises to help you step outside your business for a few minutes and see it through fresh eyes.
          </p>
        </div>
      </div>
    </section>

    <section class="section page-intro" id="see-intro">
      <div class="container">
        <div class="split reveal">
          <div class="split__text prose">
            <p class="page-intro__lead">As a founder, you already know your products, industry and customers better than almost anyone.</p>
            <p>What you may need is a different perspective.</p>
            <p>The questions below aren't a test. There are no right answers. They're simply designed to help you step outside your business for a few minutes and see it through fresh eyes.</p>
            <p class="highlight-text">You may discover nothing new. Or you may find yourself asking a completely different question. Either outcome is valuable.</p>
          </div>
          <aside class="note-card reveal reveal--delay-2" aria-labelledby="see-before-title">
            <h2 class="note-card__title" id="see-before-title">Before you begin…</h2>
            <p>I'd like to ask one small favour. <strong>Please grab a notebook and a pen.</strong></p>
            <p>You could type your answers into your phone or laptop. But I think you'll get much more from this if you write them by hand.</p>
            <p>There's no rush. Some questions may take thirty seconds. Others may stay with you for a good while.</p>
            <p class="note-card__sign">Take your time. When you're ready, let's begin.</p>
          </aside>
        </div>
      </div>
    </section>

    <section class="section section--alt workbook" id="see-questions" data-workbook>
      <div class="container workbook__grid">
        <aside class="workbook__rail">
          <div class="workbook__rail-inner">
            <span class="section-header__label">The exercises</span>
            <h2 class="workbook__title">Six <span class="accent">questions</span></h2>
            <p class="workbook__intro">Work through them in order, or jump to the one that pulls at you.</p>

            <div class="workbook__progress" aria-hidden="true">
              <span class="workbook__progress-count"><span data-workbook-current>01</span> / 06</span>
              <span class="workbook__progress-track"><span class="workbook__progress-fill" data-workbook-fill></span></span>
            </div>

            <nav aria-label="Jump to an exercise">
              <ol class="workbook__index">
                ${exercises.map((ex, i) => `
                <li>
                  <a href="#exercise-${ex.num}" class="workbook__index-link${i === 0 ? ' is-active' : ''}" data-workbook-link="${ex.num}">
                    <span class="workbook__index-num">${ex.num}</span>
                    <span class="workbook__index-label">${ex.short}</span>
                  </a>
                </li>`).join('')}
              </ol>
            </nav>
          </div>
        </aside>

        <ol class="workbook__pages">
          ${exercises.map((ex) => `
          <li class="workbook-page reveal" id="exercise-${ex.num}" data-workbook-page="${ex.num}">
            <header class="workbook-page__head">
              <span class="workbook-page__num" aria-hidden="true">${ex.num}</span>
              <span class="workbook-page__of">Exercise ${Number(ex.num)} of 6</span>
            </header>
            <div class="workbook-page__body prose">
              <h3 class="workbook-page__question">${ex.question}</h3>
              ${ex.body}
              <p class="workbook-page__prompt">${ex.prompt}</p>
              ${ex.after || ''}
            </div>
            <div class="workbook-page__notes" aria-hidden="true">
              <span class="workbook-page__notes-label">Your notes</span>
              <span class="workbook-page__line"></span>
              <span class="workbook-page__line"></span>
              <span class="workbook-page__line"></span>
            </div>
          </li>`).join('')}
        </ol>
      </div>
    </section>

    <!-- Final Thought -->
    <section class="section" id="see-final">
      <div class="container">
        <div class="split split--reverse reveal">
          <div class="split__text prose">
            <h2 class="process-finale__title">A final <span class="accent">thought</span></h2>
            <p>These questions aren't designed to give you answers. They're designed to help you <strong>ask better questions</strong>.</p>
            <p>In my experience, that's where the most valuable commercial conversations begin.</p>
            <p class="highlight-text">If one of these exercises has helped you see your business differently, I'd love to hear what you discovered.</p>
            <p class="see-final__close">
              Close your notebook for a moment.<br>
              What's the one thought that's stayed with you?
            </p>
            <div class="page-actions">
              <a href="/contact" class="btn btn--primary btn--lg btn--pill" id="see-cta">
                Begin the conversation <span class="btn-arrow">→</span>
              </a>
            </div>
          </div>
          <div class="split__image reveal reveal--delay-2">
            <img src="${assetUrl('/images/prism.webp')}" alt="A glass prism refracting a beam of light" loading="lazy" width="1024" height="1024">
          </div>
        </div>
      </div>
    </section>
  `;

  return applyCmsPage(await getPage('see-your-business-differently'), html, {
    id: 'see-hero',
    label: 'Six exercises',
    titleHtml: 'See your business <span class="accent">differently</span>',
    subtitle: 'Six reflective exercises to help you step outside your business for a few minutes and see it through fresh eyes.',
  });
}
