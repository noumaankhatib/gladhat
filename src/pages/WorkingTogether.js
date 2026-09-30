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
  const steps = [
    {
      num: '01',
      label: 'Listening',
      title: 'Listening comes first',
      image: '/images/essence.webp',
      alt: 'A brass compass resting on dark slate',
      body: `
        <p>Every engagement starts the same way: not with a brief, but with a conversation.</p>
        <p>I ask about the business, the customers, the market, and the things that are harder to put into words — what's working, what isn't, and what keeps returning to your mind.</p>
        <p>Sometimes that means sitting with your team. Sometimes it means talking to your customers directly. Sometimes it's simply reading everything you've already written about the business and asking why it's written that way.</p>
        <p class="highlight-text">Only once I understand how you see the business can I start noticing what you might not.</p>`,
    },
    {
      num: '02',
      label: 'Looking',
      title: 'Looking at the business together',
      image: '/images/perspective_prism.webp',
      alt: 'A crystal prism splitting a beam of light',
      body: `
        <p>Once I understand the landscape, the questions start to change.</p>
        <p>What have you stopped noticing because you see it every day? Which decisions rest on assumption rather than evidence? Where do your customers see something you don't yet talk about?</p>
        <p>This is often where customer perspective enters the work directly — through conversations, research, or simply asking the people who already buy from you what actually convinced them.</p>
        <p class="highlight-text">Sometimes the answers confirm the direction you're already taking. Sometimes they change it completely. Both outcomes move the work forward.</p>`,
    },
    {
      num: '03',
      label: 'Challenging',
      title: 'Challenging ideas, not people',
      image: '/images/conversation.webp',
      alt: 'Two leather armchairs facing each other in a quiet library',
      body: `
        <p>Founders carry a huge amount of knowledge, experience and instinct. None of that gets replaced.</p>
        <p>What I bring is distance — the ability to ask the question that's difficult from inside the business, and to say the quiet thing that's been assumed rather than tested.</p>
        <p class="highlight-text">Good conversations don't always produce immediate answers. They produce better questions. And better questions often lead to better decisions.</p>`,
    },
    {
      num: '04',
      label: 'Connecting',
      title: 'Connecting the dots',
      image: '/images/connecting.webp',
      alt: 'Gold threads connecting points across a dark surface',
      body: `
        <p>This is where the thinking starts turning into something usable.</p>
        <p>Customer psychology meets commercial reality. Positioning meets the words you'll actually use. An idea meets the practical next step for making it real.</p>
        <p class="highlight-text">Sometimes the answer is a clearer message, a different audience, or a stronger partnership. Sometimes it's simply a different way of looking at the business.</p>`,
    },
  ];

  const deliverables = ['A Strategy Sprint', 'A new website', 'A positioning project', 'A campaign', 'An event concept', 'Ongoing strategic support'];

  const html = `
    <section class="hero page-hero" id="working-hero">
      <div class="hero__bg"></div>
      <div class="container">
        <div class="hero__content">
          <span class="hero__label">How I work</span>
          <h1 class="hero__title">Working <span class="accent">together</span></h1>
          <p class="hero__subtitle">
            What actually happens once we start working together — and what you can expect along the way.
          </p>
        </div>
      </div>
    </section>

    <section class="section page-intro" id="working-intro">
      <div class="container">
        <div class="split reveal">
          <div class="split__text prose">
            ${AudioPrompt(INTRO_AUDIO)}
            <p class="page-intro__lead">I want to understand what you've built, what excites you, what frustrates you, where you feel confident, where you're uncertain, what you've already tried, and what keeps returning to your mind.</p>
            <p class="highlight-text">The more I understand your business, the more likely we are to discover something valuable together.</p>
          </div>
          <div class="split__image reveal reveal--delay-2">
            <img src="${assetUrl('/images/research.webp')}" alt="A desk covered in notes, maps and an open notebook under a lamp" loading="lazy" width="1024" height="1024">
          </div>
        </div>
      </div>
    </section>

    <section class="section section--alt process" id="working-process">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-header__label">The process</span>
          <h2 class="section-header__title">What actually <span class="accent">happens</span></h2>
          <p class="section-header__text">Five movements, not a fixed script — the order and the pace change depending on what the business needs.</p>
        </div>

        <ol class="process__steps">
          ${steps.map((step) => `
          <li class="process-step reveal">
            <div class="process-step__marker" aria-hidden="true">
              <span class="process-step__num">${step.num}</span>
            </div>
            <div class="process-step__copy prose">
              <p class="process-step__label">${step.label}</p>
              <h3 class="process-step__title">${step.title}</h3>
              ${step.body}
            </div>
            <figure class="process-step__media">
              <img src="${assetUrl(step.image)}" alt="${step.alt}" loading="lazy" width="1024" height="1024">
            </figure>
          </li>`).join('')}
        </ol>
      </div>
    </section>

    <!-- 05 · Creating what matters -->
    <section class="section process-finale" id="working-creating">
      <div class="container">
        <div class="split reveal">
          <div class="split__text prose">
            <p class="process-step__label"><span class="process-step__label-num">05</span> Creating</p>
            <h2 class="process-finale__title">Creating what <span class="accent">matters</span></h2>
            <p>Only after we've developed a clear understanding do we begin creating. Sometimes that means:</p>
            <ul class="chip-list" aria-label="Types of work">
              ${deliverables.map((d) => `<li>${d}</li>`).join('')}
            </ul>
            <p>The deliverables change from one client to another. The thinking behind them doesn't.</p>
            <p class="highlight-text">Every piece of work should reflect a deeper understanding of the business, the customer and the opportunity.</p>
            <p>Some engagements are a single project. Others continue for months, as new questions surface. Either way, the thinking doesn't stop at the deliverable.</p>

            <div class="page-actions">
              <a href="/contact" class="btn btn--primary btn--lg btn--pill" id="working-cta">
                Let's talk <span class="btn-arrow">→</span>
              </a>
              <a href="/work" class="text-link">Read the true stories <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <div class="split__image reveal reveal--delay-2">
            <img src="${assetUrl('/images/whatif.webp')}" alt="A ring of light drawn in the air inside a dark room" loading="lazy" width="1024" height="1024">
          </div>
        </div>
      </div>
    </section>
  `;

  return applyCmsPage(await getPage('working-together'), html, {
    id: 'working-hero',
    label: 'How I work',
    titleHtml: 'Working <span class="accent">together</span>',
    subtitle: 'What actually happens once we start working together — and what you can expect along the way.',
  });
}
