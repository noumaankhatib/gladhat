/* ===================================================
   GLADHAT — Tonbo Story
   =================================================== */

import { getStory } from '../services/content-service.js';
import { applyCmsStory } from '../utils/page-compose.js';

export async function TonboPage() {
  const html = `
    <section class="hero" id="tonbo-hero" style="min-height: 55vh;">
      <div class="hero__bg"></div>
      <div class="container">
        <div class="hero__content">
          <span class="hero__label">True Story — Tonbo Ventures</span>
          <h1 class="hero__title">Recognising the Value of <span class="accent">Thinking</span></h1>
          <p class="hero__subtitle">
            A candid story about strategic thinking, invisible value and the project that changed how I define, structure and price my work.
          </p>
        </div>
      </div>
    </section>

    <section class="section" id="tonbo-opening">
      <div class="container">
        <div class="prose reveal">
          <p>Tonbo Ventures initially asked for help communicating its venture studio on LinkedIn.</p>
          <p>The brief covered positioning, messaging, copywriting and design.</p>
          <p>But the content immediately raised broader questions.</p>
          <p>How did founders view investors?</p>
          <p>How did LPs understand venture studios in comparison with venture capital funds?</p>
          <p>How could Tonbo distinguish itself in the climate-tech investment market?</p>
          <p class="highlight-text">The conversations needed to answer those questions became part of the work.</p>
        </div>
      </div>
    </section>

    <section class="section section--alt" id="tonbo-invisible">
      <div class="container">
        <div class="prose reveal">
          <h2>The invisible part of the project</h2>
          <p>Like many people working in communications, I had fallen into a common trap.</p>
          <p>I had been hired to produce deliverables.</p>
          <p>The copy. The messaging. A deck upgrade. The Naming of a Venture Studio Program.</p>
          <p>All these were visible outputs, but they weren't the most important work.</p>
          <p>That occurred during conversations. When assumptions were questioned. When ideas connected. When a different way of looking at the business began to emerge.</p>
          <p class="highlight-text">The marketing materials were the visible results of deeper thinking. My value lay in the thinking. I hadn't fully recognised that yet.</p>
        </div>
      </div>
    </section>

    <section class="section" id="tonbo-lesson">
      <div class="container">
        <div class="prose reveal">
          <h2>An uncomfortable lesson</h2>
          <p>As the project came to an end, we disagreed about the value of the work that had evolved throughout the engagement.</p>
          <p>At the time, it was frustrating.</p>
          <p>Looking back, I no longer see it simply as a disagreement over payment.</p>
          <p class="highlight-text">I see it as evidence that I hadn't yet become clear about the nature and real value of my own work.</p>
          <p>I had helped define the value of another business.</p>
          <p>I hadn't yet defined the value of my own.</p>
          <p>That realisation stayed with me long after the project had finished.</p>
        </div>
      </div>
    </section>

    <section class="section section--alt" id="tonbo-change">
      <div class="container">
        <div class="prose reveal">
          <h2>Changing how I work</h2>
          <p>The experience prompted me to start rethinking how I describe what I do.</p>
          <p>I had realised clients weren't only asking me to write.</p>
          <p>They were asking me to envisage, to filter, to challenge assumptions, connect ideas, notice opportunities that weren't immediately obvious, and help them see their business from a different perspective.</p>
          <p>The writing mattered.</p>
          <p>But it was only one expression of the thinking behind it.</p>
          <p class="highlight-text">That understanding has led me to change the way I structure projects, the conversations I have with clients, and the way I value strategic work.</p>
        </div>
      </div>
    </section>

    <section class="section" id="tonbo-lessons">
      <div class="container">
        <div class="prose reveal">
          <h2>What this project taught me</h2>
          <p>Some valuable work leaves little behind. A conversation, a question, a shift in perspective, a decision made with greater clarity. Those moments don't always appear in proposals or a list of deliverables.</p>
          <p>They're difficult to measure, and even more difficult to price.</p>
          <p>But they often create the greatest commercial value.</p>
          <p class="highlight-text">This project reminded me that thinking isn't something that happens before my work begins. Sometimes it <em>is</em> my work.</p>
          <p>Recognising that has made me a better consultant, a clearer communicator and, I hope, a better partner for the founders I work with today.</p>

          <div style="margin-top: var(--space-3xl); display: flex; gap: var(--space-lg); flex-wrap: wrap; align-items: center;">
            <a href="/contact" class="btn btn--primary" id="tonbo-cta">Let's Talk <span class="btn-arrow">→</span></a>
            <a href="/ensights" class="btn btn--outline" id="tonbo-next">Read the enSights story <span class="btn-arrow">→</span></a>
            <a href="/work" class="text-link" id="tonbo-back">← Back to True Stories</a>
          </div>
        </div>
      </div>
    </section>
  `;

  return applyCmsStory(await getStory('tonbo'), html, {
    id: 'tonbo-hero',
    label: 'True Story — Tonbo',
    titleHtml: 'Recognising the Value of <span class="accent">Thinking</span>',
    subtitle: 'A candid story about strategic thinking, invisible value and the project that changed how I define, structure and price my work.',
  });
}
