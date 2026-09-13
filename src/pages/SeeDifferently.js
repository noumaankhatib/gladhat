/* ===================================================
   GLADHAT — See Your Business Differently
   =================================================== */

import { getPage } from '../services/content-service.js';
import { applyCmsPage } from '../utils/page-compose.js';
import { assetUrl } from '../config/env.js';

export async function SeeDifferentlyPage() {
  const html = `
    <section class="hero" id="see-hero" style="min-height: 55vh;">
      <div class="hero__bg"></div>
      <div class="container">
        <div class="hero__content">
          <span class="hero__label">Gladhat</span>
          <h1 class="hero__title">See Your Business <span class="accent">Differently</span></h1>
          <p class="hero__subtitle">
            Six reflective exercises to help you step outside your business for a few minutes and see it through fresh eyes.
          </p>
        </div>
      </div>
    </section>

    <section class="section" id="see-intro">
      <div class="container">
        <div class="split reveal" style="align-items: center;">
          <div class="split__text prose" style="max-width: none;">
            <p>As a founder, you already know your products, industry and customers better than almost anyone.</p>
            <p>What you may need is a different perspective.</p>
            <p>The questions below aren't a test. There are no right answers. They're simply designed to help you step outside your business for a few minutes and see it through fresh eyes.</p>
            <p class="highlight-text">You may discover nothing new. Or you may find yourself asking a completely different question. Either outcome is valuable.</p>
            
            <hr class="separator" style="margin: var(--space-xl) 0;">
            
            <h3 style="font-family: var(--font-heading); color: var(--color-heading); font-size: var(--fs-xl);">Before you begin...</h3>
            <p>I'd like to ask one small favour. <strong>Please grab a notebook and a pen.</strong></p>
            <p>You could type your answers into your phone or laptop. But I think you'll get much more from this if you write them by hand.</p>
            <p>There's no rush. Some questions may take thirty seconds. Others may stay with you for a good while.</p>
            <p class="highlight-text">Take your time. When you're ready, let's begin.</p>
          </div>
          <div class="split__image reveal reveal--delay-2">
            <img src="${assetUrl('/images/prism.png')}" alt="Prism refracting light" loading="lazy" style="border-radius: var(--radius-lg); box-shadow: var(--shadow-glow);">
          </div>
        </div>
      </div>
    </section>

    <section class="section section--alt" id="see-questions">
      <div class="container">
        
        <div class="section-header reveal">
          <span class="section-header__label">The Exercises</span>
          <h2 class="section-header__title">Six <span class="accent">Questions</span></h2>
        </div>

        <div style="display: flex; flex-direction: column; gap: var(--space-6xl);">

          <!-- Question 1 -->
          <div class="split split--reverse reveal" style="align-items: center;">
            <div class="split__text prose">
              <div class="story-card__number" style="color: var(--color-accent); font-size: var(--fs-2xl); font-family: var(--font-heading); margin-bottom: var(--space-xs); opacity: 0.5;">01</div>
              <h2 style="font-size: var(--fs-2xl); color: var(--color-heading); margin-bottom: var(--space-md);">What would your best customers say you do better than anyone else?</h2>
              <p>Not what you believe. Not what your website says.</p>
              <p>What would <em>they</em> say?</p>
              <p>Write down the first three answers that come to mind. Then ask yourself:</p>
              <p class="highlight-text">How much of my marketing actually focuses on those strengths?</p>
            </div>
            <div class="split__image reveal reveal--delay-2">
              <img src="${assetUrl('/images/conversation.png')}" alt="Conversation" loading="lazy" style="border-radius: var(--radius-lg); box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
            </div>
          </div>

          <!-- Question 2 -->
          <div class="split reveal" style="align-items: center;">
            <div class="split__text prose">
              <div class="story-card__number" style="color: var(--color-accent); font-size: var(--fs-2xl); font-family: var(--font-heading); margin-bottom: var(--space-xs); opacity: 0.5;">02</div>
              <h2 style="font-size: var(--fs-2xl); color: var(--color-heading); margin-bottom: var(--space-md);">Imagine today is your first day in the business.</h2>
              <p>You know nothing. You've just arrived.</p>
              <p>You visit your website. You read your brochure. You browse your LinkedIn page.</p>
              <p class="highlight-text">What would confuse you?</p>
              <p>What assumptions are you expected to understand? What questions remain unanswered?</p>
            </div>
            <div class="split__image reveal reveal--delay-2">
              <img src="${assetUrl('/images/perspective_prism.png')}" alt="Perspective" loading="lazy" style="border-radius: var(--radius-lg); box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
            </div>
          </div>

          <!-- Question 3 -->
          <div class="split split--reverse reveal" style="align-items: center;">
            <div class="split__text prose">
              <div class="story-card__number" style="color: var(--color-accent); font-size: var(--fs-2xl); font-family: var(--font-heading); margin-bottom: var(--space-xs); opacity: 0.5;">03</div>
              <h2 style="font-size: var(--fs-2xl); color: var(--color-heading); margin-bottom: var(--space-md);">If your business disappeared tomorrow...</h2>
              <p>What would your customers genuinely miss?</p>
              <p>Not the products. Not the features.</p>
              <p class="highlight-text">What difference would disappear from their lives or businesses?</p>
            </div>
            <div class="split__image reveal reveal--delay-2">
              <img src="${assetUrl('/images/essence.png')}" alt="Essence" loading="lazy" style="border-radius: var(--radius-lg); box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
            </div>
          </div>

          <!-- Question 4 -->
          <div class="split reveal" style="align-items: center;">
            <div class="split__text prose">
              <div class="story-card__number" style="color: var(--color-accent); font-size: var(--fs-2xl); font-family: var(--font-heading); margin-bottom: var(--space-xs); opacity: 0.5;">04</div>
              <h2 style="font-size: var(--fs-2xl); color: var(--color-heading); margin-bottom: var(--space-md);">If you could communicate only one thing...</h2>
              <p>Imagine you could leave every visitor with just one clear understanding of your business.</p>
              <p>What would it be?</p>
              <p>Would your website, presentations and sales conversations all communicate that same idea?</p>
              <p class="highlight-text">If not, why not?</p>
            </div>
            <div class="split__image reveal reveal--delay-2">
              <img src="${assetUrl('/images/connecting.png')}" alt="Connecting" loading="lazy" style="border-radius: var(--radius-lg); box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
            </div>
          </div>

          <!-- Question 5 -->
          <div class="split split--reverse reveal" style="align-items: center;">
            <div class="split__text prose">
              <div class="story-card__number" style="color: var(--color-accent); font-size: var(--fs-2xl); font-family: var(--font-heading); margin-bottom: var(--space-xs); opacity: 0.5;">05</div>
              <h2 style="font-size: var(--fs-2xl); color: var(--color-heading); margin-bottom: var(--space-md);">What assumptions have you stopped questioning?</h2>
              <p>Every business develops habits.</p>
              <p>Messages become familiar. Processes become fixed. Ideas become accepted simply because they've existed for a long time.</p>
              <p>Ask yourself:</p>
              <p class="highlight-text">What if one of our biggest assumptions isn't true anymore?</p>
            </div>
            <div class="split__image reveal reveal--delay-2">
              <img src="${assetUrl('/images/research.png')}" alt="Research" loading="lazy" style="border-radius: var(--radius-lg); box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
            </div>
          </div>

          <!-- Question 6 -->
          <div class="split reveal" style="align-items: center;">
            <div class="split__text prose">
              <div class="story-card__number" style="color: var(--color-accent); font-size: var(--fs-2xl); font-family: var(--font-heading); margin-bottom: var(--space-xs); opacity: 0.5;">06</div>
              <h2 style="font-size: var(--fs-2xl); color: var(--color-heading); margin-bottom: var(--space-md);">Where might the biggest opportunity be hiding?</h2>
              <p>Not the opportunity you're already pursuing. The one you haven't considered.</p>
              <p>A different audience. A new partnership. A simpler offer. A completely different way of explaining what you do.</p>
              <p>Or perhaps something else entirely.</p>
              <p class="highlight-text">If you gave yourself permission to look beyond the obvious… what might you discover?</p>
            </div>
            <div class="split__image reveal reveal--delay-2">
              <img src="${assetUrl('/images/beyond.png')}" alt="Beyond" loading="lazy" style="border-radius: var(--radius-lg); box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Final Thought -->
    <section class="section" id="see-final">
      <div class="container">
        <div class="split split--reverse reveal" style="align-items: center;">
          <div class="split__text prose">
            <h2 style="font-size: var(--fs-3xl); margin-bottom: var(--space-lg);">A final <span class="accent">thought</span></h2>
            <p>These questions aren't designed to give you answers. They're designed to help you <strong>ask better questions</strong>.</p>
            <p>In my experience, that's where the most valuable commercial conversations begin.</p>
            <p class="highlight-text">If one of these exercises has helped you see your business differently, I'd love to hear what you discovered.</p>
            <p style="font-family: var(--font-heading); font-style: italic; font-size: var(--fs-lg); color: var(--color-heading); margin-top: var(--space-xl);">
              Close your notebook for a moment.<br>
              What's the one thought that's stayed with you?
            </p>
            <div style="margin-top: var(--space-2xl);">
              <a href="/contact" class="btn btn--primary btn--lg" id="see-cta">
                Begin the Conversation <span class="btn-arrow">→</span>
              </a>
            </div>
          </div>
          <div class="split__image reveal reveal--delay-2">
            <img src="${assetUrl('/images/whatif.png')}" alt="What If" loading="lazy" style="border-radius: var(--radius-lg); box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
          </div>
        </div>
      </div>
    </section>
  `;

  return applyCmsPage(await getPage('see-your-business-differently'), html, {
    id: 'see-hero',
    minHeight: '55vh',
    label: 'Gladhat',
    titleHtml: 'See Your Business <span class="accent">Differently</span>',
    subtitle: 'Six reflective exercises to help you step outside your business for a few minutes and see it through fresh eyes.',
  });
}
