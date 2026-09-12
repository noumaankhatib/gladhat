/* ===================================================
   GLADHAT — Contact: Ready for a Chat?
   =================================================== */

import { getPage, peekSite, slot } from '../services/content-service.js';
import { applyCmsPage } from '../utils/page-compose.js';

export async function ContactPage() {
  const site = peekSite();
  const email = slot(site?.email, 'm@gladhat.com');
  const linkedin = slot(site?.linkedin, 'https://linkedin.com');

  const html = `
    <section class="hero" id="contact-hero" style="min-height: 55vh;">
      <div class="hero__bg"></div>
      <div class="container">
        <div class="hero__content">
          <span class="hero__label">Gladhat</span>
          <h1 class="hero__title">Ready for a <span class="accent">chat?</span></h1>
          <p class="hero__subtitle">
            If you've made it this far, thank you. I'd love to hear your story.
          </p>
        </div>
      </div>
    </section>

    <section class="section" id="contact-intro">
      <div class="container">
        <div class="prose reveal">
          <p>If you've made it this far, thank you.</p>
          <p>You've probably realised that I don't see marketing as a collection of tactics.</p>
          <p>I think it begins much earlier, with understanding and curiosity, with asking the right questions before rushing towards answers.</p>
          <p class="highlight-text">If that way of thinking resonates with you, I'll be glad to talk.</p>
        </div>
      </div>
    </section>

    <section class="section section--alt" id="contact-happens">
      <div class="container">
        <div class="prose reveal">
          <h2>What usually happens</h2>
          <p>Most first conversations are remarkably simple.</p>
          <p>You tell me about your business.</p>
          <p>What's exciting you.</p>
          <p>What's frustrating you.</p>
          <p>Where things feel stuck.</p>
          <p>Sometimes the conversation leads to a project.</p>
          <p>Sometimes it leads to a different way of looking at the problem.</p>
          <p class="highlight-text">Occasionally, I'll suggest that you don't need my help at all. That's perfectly fine too.</p>
        </div>
      </div>
    </section>

    <section class="section" id="contact-fit">
      <div class="container">
        <div class="prose reveal">
          <h2>A good fit</h2>
          <p>I tend to work best with founders, business owners and leadership teams who are open to exploring ideas together.</p>
          <p>People who value thoughtful conversations.</p>
          <p>Who don't expect instant answers.</p>
          <p class="highlight-text">Who understand that clarity is often more valuable than speed.</p>
        </div>
      </div>
    </section>

    <section class="section band--sky" id="contact-cta-section">
      <div class="container contact-grid">
        <div class="prose reveal">
          <h2>Shall we have a chat?</h2>
          <p>A conversation via video call.</p>
          <p>No pressure. No obligation.</p>
          <p class="highlight-text">Just two people exploring whether there's something useful we can create together.</p>
          <p style="font-family: var(--font-heading); font-style: italic; font-size: var(--fs-xl); color: var(--color-heading); margin-top: var(--space-xl);">
            I'd love to hear your story.
          </p>
        </div>
        <div class="contact-panel reveal">
          <p class="card__label">Email</p>
          <h3 class="card__title" style="margin-bottom: var(--space-lg);">
            <a href="mailto:${email}" style="color: var(--color-ink);">${email}</a>
          </h3>
          <p class="card__text">Drop me a line. I read every email and reply personally.</p>
          <div style="margin-top: var(--space-2xl);">
            <a href="mailto:${email}" class="btn btn--primary btn--lg" id="contact-cta-btn">
              Email Me <span class="btn-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="contact-info">
      <div class="container">
        <div class="grid grid--2 reveal">
          <div id="contact-card-email">
            <div class="card__label">Email</div>
            <h3 class="card__title">
              <a href="mailto:${email}" style="color: var(--color-heading); text-decoration: none;">${email}</a>
            </h3>
            <p class="card__text">Drop me a line. I read every email and reply personally.</p>
          </div>
          <div id="contact-card-linkedin">
            <div class="card__label">LinkedIn</div>
            <h3 class="card__title">
              <a href="${linkedin}" target="_blank" rel="noopener noreferrer" style="color: var(--color-heading); text-decoration: none;">Connect on LinkedIn</a>
            </h3>
            <p class="card__text">Follow my thinking and connect professionally.</p>
          </div>
        </div>
      </div>
    </section>
  `;

  return applyCmsPage(await getPage('contact'), html, {
    id: 'contact-hero',
    minHeight: '55vh',
    label: 'Gladhat',
    titleHtml: 'Ready for a <span class="accent">chat?</span>',
    subtitle: "If you've made it this far, thank you. I'd love to hear your story.",
  });
}
