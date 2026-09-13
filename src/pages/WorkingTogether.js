/* ===================================================
   GLADHAT — Working Together
   The detailed-process page. Home's Approach Spotlight gives
   the short, high-level version of this same journey — this
   page is where it gets specific: what happens first, how
   assumptions get challenged, and what to expect along the way.
   01 Listening   — how I learn about the business
   02 Looking     — how customer perspective enters the work
   03 Challenging — how assumptions get questioned, not people
   04 Connecting  — how insight becomes positioning and messaging
   05 Creating    — what actually gets made, and what to expect
   =================================================== */

import { getPage } from '../services/content-service.js';
import { applyCmsPage } from '../utils/page-compose.js';
import { AudioPrompt } from '../components/AudioPrompt.js';
import { assetUrl } from '../config/env.js';

const INTRO_AUDIO = "I want to understand what you've built, what excites you, what frustrates you, where you feel confident, where you're uncertain, what you've already tried, and what keeps returning to your mind. The more I understand your business, the more likely we are to discover something valuable together.";

export async function WorkingTogetherPage() {
  const html = `
    <section class="hero" id="working-hero" style="min-height: 60vh;">
      <div class="hero__bg"></div>
      <div class="container">
        <div class="hero__content">
          <span class="hero__label">Gladhat</span>
          <h1 class="hero__title">Working <span class="accent">Together</span></h1>
          <p class="hero__subtitle">
            What actually happens once we start working together — and what you can expect along the way.
          </p>
        </div>
      </div>
    </section>

    <section class="section" id="working-intro">
      <div class="container">
        <div class="split reveal" style="align-items: center;">
          <div class="split__text prose" style="max-width: none;">
            ${AudioPrompt(INTRO_AUDIO)}
            <p>I want to understand what you've built, what excites you, what frustrates you, where you feel confident, where you're uncertain, what you've already tried, and what keeps returning to your mind.</p>
            <p class="highlight-text">The more I understand your business, the more likely we are to discover something valuable together.</p>
          </div>
          <div class="split__image reveal reveal--delay-2">
            <img src="${assetUrl('/images/research.png')}" alt="Collaborative Work" loading="lazy" style="border-radius: var(--radius-lg); box-shadow: var(--shadow-glow);">
          </div>
        </div>
      </div>
    </section>

    <section class="statement band--sky">
      <div class="container">
        <p class="statement__text">The more I understand your business, the more likely we are to discover something valuable together.</p>
      </div>
    </section>

    <section class="section" id="working-process">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-header__label">The Process</span>
          <h2 class="section-header__title">What Actually <span class="accent">Happens</span></h2>
          <p class="section-header__text">Five movements, not a fixed script — the order and the pace change depending on what the business needs.</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: var(--space-6xl);">

          <!-- 01 · Listening -->
          <div class="split split--reverse reveal" style="align-items: center;">
            <div class="split__text prose">
              <p class="section-header__label"><span class="scrolly-number">01</span> &middot; Listening</p>
              <h2 style="font-size: var(--fs-2xl); color: var(--color-heading); margin-bottom: var(--space-md);">Listening comes first</h2>
              <p>Every engagement starts the same way: not with a brief, but with a conversation.</p>
              <p>I ask about the business, the customers, the market, and the things that are harder to put into words — what's working, what isn't, and what keeps returning to your mind.</p>
              <p>Sometimes that means sitting with your team. Sometimes it means talking to your customers directly. Sometimes it's simply reading everything you've already written about the business and asking why it's written that way.</p>
              <p class="highlight-text">Only once I understand how you see the business can I start noticing what you might not.</p>
            </div>
            <div class="split__image reveal reveal--delay-2">
              <img src="${assetUrl('/images/essence.png')}" alt="Listening and Essence" loading="lazy" style="border-radius: var(--radius-lg); box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
            </div>
          </div>

          <!-- 02 · Looking -->
          <div class="split reveal" style="align-items: center;">
            <div class="split__text prose">
              <p class="section-header__label"><span class="scrolly-number">02</span> &middot; Looking</p>
              <h2 style="font-size: var(--fs-2xl); color: var(--color-heading); margin-bottom: var(--space-md);">Looking at the business together</h2>
              <p>Once I understand the landscape, the questions start to change.</p>
              <p>What have you stopped noticing because you see it every day? Which decisions rest on assumption rather than evidence? Where do your customers see something you don't yet talk about?</p>
              <p>This is often where customer perspective enters the work directly — through conversations, research, or simply asking the people who already buy from you what actually convinced them.</p>
              <p class="highlight-text">Sometimes the answers confirm the direction you're already taking. Sometimes they change it completely. Both outcomes move the work forward.</p>
            </div>
            <div class="split__image reveal reveal--delay-2">
              <img src="${assetUrl('/images/perspective_prism.png')}" alt="Different Perspective" loading="lazy" style="border-radius: var(--radius-lg); box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
            </div>
          </div>

          <!-- 03 · Challenging -->
          <div class="split split--reverse reveal" style="align-items: center;">
            <div class="split__text prose">
              <p class="section-header__label"><span class="scrolly-number">03</span> &middot; Challenging</p>
              <h2 style="font-size: var(--fs-2xl); color: var(--color-heading); margin-bottom: var(--space-md);">Challenging ideas, not people</h2>
              <p>Founders carry a huge amount of knowledge, experience and instinct. None of that gets replaced.</p>
              <p>What I bring is distance — the ability to ask the question that's difficult from inside the business, and to say the quiet thing that's been assumed rather than tested.</p>
              <p class="highlight-text">Good conversations don't always produce immediate answers. They produce better questions. And better questions often lead to better decisions.</p>
            </div>
            <div class="split__image reveal reveal--delay-2">
              <img src="${assetUrl('/images/conversation.png')}" alt="Conversations" loading="lazy" style="border-radius: var(--radius-lg); box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
            </div>
          </div>

          <!-- 04 · Connecting -->
          <div class="split reveal" style="align-items: center;">
            <div class="split__text prose">
              <p class="section-header__label"><span class="scrolly-number">04</span> &middot; Connecting</p>
              <h2 style="font-size: var(--fs-2xl); color: var(--color-heading); margin-bottom: var(--space-md);">Connecting the dots</h2>
              <p>This is where the thinking starts turning into something usable.</p>
              <p>Customer psychology meets commercial reality. Positioning meets the words you'll actually use. An idea meets the practical next step for making it real.</p>
              <p class="highlight-text">Sometimes the answer is a clearer message, a different audience, or a stronger partnership. Sometimes it's simply a different way of looking at the business.</p>
            </div>
            <div class="split__image reveal reveal--delay-2">
              <img src="${assetUrl('/images/connecting.png')}" alt="Connecting dots" loading="lazy" style="border-radius: var(--radius-lg); box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 05 · Creating what matters -->
    <section class="section section--alt" id="working-creating">
      <div class="container">
        <div class="split reveal" style="align-items: center;">
          <div class="split__text prose">
            <p class="section-header__label"><span class="scrolly-number">05</span> &middot; Creating</p>
            <h2 style="font-size: var(--fs-3xl); margin-bottom: var(--space-lg);">Creating what <span class="accent">matters</span></h2>
            <p>Only after we've developed a clear understanding do we begin creating.</p>
            <p>Sometimes that means a Strategy Sprint.</p>
            <p>Sometimes it's a new website.</p>
            <p>A positioning project.</p>
            <p>A campaign.</p>
            <p>An event concept.</p>
            <p>Or ongoing strategic support.</p>
            <p>The deliverables change from one client to another. The thinking behind them doesn't.</p>
            <p class="highlight-text">Every piece of work should reflect a deeper understanding of the business, the customer and the opportunity.</p>
            <p>Some engagements are a single project. Others continue for months, as new questions surface. Either way, the thinking doesn't stop at the deliverable.</p>

            <div style="margin-top: var(--space-3xl); display: flex; flex-wrap: wrap; gap: var(--space-lg); align-items: center;">
              <a href="/contact" class="btn btn--primary btn--lg" id="working-cta">
                Let's Talk <span class="btn-arrow">→</span>
              </a>
              <a href="/work" class="text-link">Read the True Stories <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <div class="split__image reveal reveal--delay-2">
            <img src="${assetUrl('/images/whatif.png')}" alt="Creating What Matters" loading="lazy" style="border-radius: var(--radius-lg); box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
          </div>
        </div>
      </div>
    </section>
  `;

  return applyCmsPage(await getPage('working-together'), html, {
    id: 'working-hero',
    minHeight: '60vh',
    label: 'Gladhat',
    titleHtml: 'Working <span class="accent">Together</span>',
    subtitle: 'What actually happens once we start working together — and what you can expect along the way.',
  });
}
