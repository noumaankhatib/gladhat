/* ===================================================
   GLADHAT — About: Who am I?
   Editorial progression (Phase 4):
   01 Introduction  — the person behind Gladhat
   02 The Perspective — why the real work isn't the writing
   03 The Strength — seeing through the buyer's eyes
   04 Experience & Breadth — curiosity across industries
   05 Philosophy — what grounds the way of seeing
   06 Transition — into Working Together
   =================================================== */

import { getPage } from '../services/content-service.js';
import { applyCmsPage } from '../utils/page-compose.js';

export async function AboutPage() {
  const html = `
    <section class="hero" id="about-hero" style="min-height: 55vh;">
      <div class="hero__bg"></div>
      <div class="container">
        <div class="hero__content">
          <span class="hero__label">Gladhat</span>
          <h1 class="hero__title">Who am <span class="accent">I?</span></h1>
          <p class="hero__subtitle">
            People sometimes ask me what I do. The honest answer is that it varies from project to project.
          </p>
        </div>
      </div>
    </section>

    <section class="section" id="about-intro">
      <div class="container">
        <div class="split reveal">
          <div class="split__text prose" style="max-width: none;">
            <p class="section-header__label"><span class="scrolly-number">01</span> &middot; Introduction</p>
            <p>My name's Michael. People sometimes ask me what I do.</p>
            <p>The honest answer is that it varies from project to project.</p>
            <p>Sometimes I'm researching customers. Sometimes I'm simplifying complicated ideas. Sometimes I'm helping founders find the right language for something they've been struggling to explain.</p>
            <p>The work looks a bit different every time. The purpose is always the same.</p>
            <p class="highlight-text">I help businesses see themselves more clearly.</p>
          </div>
          <div class="split__image reveal reveal--delay-2 about-intro__figure">
            <img src="/images/silhouette.png" alt="Silhouette of a person looking thoughtfully out a window into golden light" loading="lazy">
          </div>
        </div>
      </div>
    </section>

    <section class="pullquote pullquote--ink" aria-label="Pull quote">
      <p class="pullquote__text">I help businesses see themselves more clearly.</p>
    </section>

    <section class="section" id="about-perspective">
      <div class="container">
        <div class="prose reveal">
          <p class="section-header__label"><span class="scrolly-number">02</span> &middot; The Perspective</p>
          <h2>It took me a long time to realise&hellip;</h2>
          <p>For years, I described myself as a copywriter. Then a marketing consultant. Both descriptions were partly true. Neither felt complete.</p>
          <p>Looking back, I can see that the writing was secondary. It was the outcome.</p>
          <p>The real work happened earlier. It was the listening, the researching, the asking questions, the looking through the customer's eyes, the intuition to put my finger where it mattered.</p>
          <p class="highlight-text">The websites, presentations, campaigns and messaging all came afterwards.</p>
        </div>
      </div>
    </section>

    <section class="section section--alt" id="about-strength">
      <div class="container">
        <div class="prose reveal">
          <p class="section-header__label"><span class="scrolly-number">03</span> &middot; The Strength</p>
          <h2>What I've learned</h2>
          <p>The projects I've worked on have taught me:</p>
          <p>To see through the buyer's eyes, and to find the right language.</p>
          <p>Expertise, however brilliant, has to be understandable.</p>
          <p>Clear agreements protect good relationships.</p>
          <p class="highlight-text">Every project has left me seeing business a little differently than before.</p>
        </div>
      </div>
    </section>

    <section class="section band--ink" id="about-moments">
      <div class="container">
        <div class="prose reveal">
          <h2>The moments I enjoy most</h2>
          <p>People often assume my favourite part of a project is writing.</p>
          <p>It isn't.</p>
          <p>It's when someone suddenly stops and says,</p>
          <div class="blockquote">"Yes, that's it. That's what we've been trying to say."</div>
          <p>Or&hellip;</p>
          <div class="blockquote">"I've never looked at it like that before."</div>
          <p class="highlight-text">Once the thinking becomes clear, everything else tends to follow naturally.</p>
        </div>
      </div>
    </section>

    <section class="section" id="about-breadth">
      <div class="container">
        <div class="prose reveal">
          <p class="section-header__label"><span class="scrolly-number">04</span> &middot; Experience &amp; Breadth</p>
          <h2>Curiosity has always been my favourite tool</h2>
          <p>I've worked with businesses in AI infrastructure, renewable energy, software, venture capital, wellbeing, education and even cosmetics.</p>
          <p>On the surface, they couldn't be more different. What connects them isn't the industry. It's curiosity. Every project begins with the same belief.</p>
          <p class="highlight-text">Before deciding what to say, it's worth digging for what really needs to be said.</p>
          <p>That usually means asking questions, sometimes uncomfortable ones, sometimes obvious ones that nobody has asked for a long time.</p>
          <p>Sometimes the answer changes everything.</p>
        </div>
      </div>
    </section>

    <section class="section section--alt" id="about-philosophy">
      <div class="container">
        <div class="prose reveal">
          <p class="section-header__label"><span class="scrolly-number">05</span> &middot; Philosophy</p>
          <h2>Outside work</h2>
          <p>When I'm not working, you'll usually find me somewhere quieter.</p>
          <p>Walking in nature, practising yoga, meditating, playing music, or spending time with my son. Those things aren't separate from my work. They are the way I remind myself to slow down, to notice, to listen and stay curious.</p>
          <p class="highlight-text">A different way of seeing starts with slowing down long enough to actually look.</p>
        </div>
      </div>
    </section>

    <section class="section" id="about-cta">
      <div class="container">
        <div class="prose reveal" style="text-align: center;">
          <p class="section-header__label" style="justify-content: center; display: flex; align-items: center; gap: var(--space-sm);"><span class="scrolly-number">06</span> &middot; Working Together</p>
          <h2>If any of this resonates...</h2>
          <p>Perhaps we should have a conversation.</p>
          <p class="highlight-text">Together, we may uncover a few interesting questions.</p>
          <div style="margin-top: var(--space-2xl); display: flex; flex-direction: column; align-items: center; gap: var(--space-md);">
            <a href="/contact" class="btn btn--primary btn--lg" id="about-cta-btn">
              Let's Talk <span class="btn-arrow">→</span>
            </a>
            <a href="/working-together" class="text-link">See how we'd work together <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
    </section>
  `;

  return applyCmsPage(await getPage('about'), html, {
    id: 'about-hero',
    minHeight: '55vh',
    label: 'Gladhat',
    titleHtml: 'Who am <span class="accent">I?</span>',
    subtitle: 'People sometimes ask me what I do. The honest answer is that it varies from project to project.',
  });
}
