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
    <section class="hero page-hero" id="contact-hero">
      <div class="hero__bg"></div>
      <div class="container">
        <div class="hero__content">
          <span class="hero__label">Contact</span>
          <h1 class="hero__title">Ready for a <span class="accent">chat?</span></h1>
          <p class="hero__subtitle">
            If you've made it this far, thank you. I'd love to hear your story.
          </p>
        </div>
      </div>
    </section>

    <section class="section page-intro contact-lead" id="contact-intro">
      <div class="container">
        <div class="split reveal">
          <div class="split__text prose">
            <p class="page-intro__lead">You've probably realised that I don't see marketing as a collection of tactics.</p>
            <p>I think it begins much earlier, with understanding and curiosity, with asking the right questions before rushing towards answers.</p>
            <p class="highlight-text">If that way of thinking resonates with you, I'll be glad to talk.</p>
          </div>
          <aside class="contact-card reveal reveal--delay-2" id="contact-cta-section" aria-labelledby="contact-card-title">
            <p class="contact-card__eyebrow">Shall we have a chat?</p>
            <h2 class="contact-card__title" id="contact-card-title">A conversation via video call.</h2>
            <p class="contact-card__text">No pressure. No obligation. Just two people exploring whether there's something useful we can create together.</p>
            <a href="mailto:${email}" class="btn btn--primary btn--lg btn--pill contact-card__btn" id="contact-cta-btn">
              Email ${email} <span class="btn-arrow">→</span>
            </a>
            <p class="contact-card__note">I read every email and reply personally.</p>
            <a href="${linkedin}" class="contact-card__secondary" target="_blank" rel="noopener noreferrer" id="contact-card-linkedin">Or connect on LinkedIn <span aria-hidden="true">↗</span></a>
          </aside>
        </div>
      </div>
    </section>

    <section class="section section--alt" id="contact-happens">
      <div class="container">
        <div class="section-header section-header--left reveal">
          <span class="section-header__label">What usually happens</span>
          <h2 class="section-header__title">Most first conversations are <span class="accent">remarkably simple.</span></h2>
        </div>
        <ol class="lesson-grid contact-steps">
          <li class="lesson reveal reveal--delay-1"><span class="lesson__num" aria-hidden="true">01</span><p>You tell me about your business — what's exciting you, what's frustrating you, where things feel stuck.</p></li>
          <li class="lesson reveal reveal--delay-2"><span class="lesson__num" aria-hidden="true">02</span><p>Sometimes the conversation leads to a project. Sometimes to a different way of looking at the problem.</p></li>
          <li class="lesson reveal reveal--delay-3"><span class="lesson__num" aria-hidden="true">03</span><p>Occasionally, I'll suggest that you don't need my help at all. That's perfectly fine too.</p></li>
        </ol>
      </div>
    </section>

    <section class="section page-cta" id="contact-fit">
      <div class="container">
        <div class="page-cta__inner reveal">
          <span class="section-header__label">A good fit</span>
          <h2 class="page-cta__title">Clarity is often more valuable than <span class="accent">speed.</span></h2>
          <p>I tend to work best with founders, business owners and leadership teams who are open to exploring ideas together — people who value thoughtful conversations and don't expect instant answers.</p>
          <div class="page-actions page-actions--center">
            <a href="mailto:${email}" class="btn btn--primary btn--lg btn--pill" id="contact-fit-btn">
              I'd love to hear your story <span class="btn-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  `;

  return applyCmsPage(await getPage('contact'), html, {
    id: 'contact-hero',
    label: 'Contact',
    titleHtml: 'Ready for a <span class="accent">chat?</span>',
    subtitle: "If you've made it this far, thank you. I'd love to hear your story.",
  });
}
