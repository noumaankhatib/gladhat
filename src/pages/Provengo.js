/* ===================================================
   GLADHAT — Provengo Story
   =================================================== */

import { getStory } from '../services/content-service.js';
import { applyCmsStory } from '../utils/page-compose.js';

export async function ProvengoPage() {
  const html = `
    <section class="hero" id="pv-hero" style="min-height: 55vh;">
      <div class="hero__bg"></div>
      <div class="container">
        <div class="hero__content">
          <span class="hero__label">True Story — Provengo</span>
          <h1 class="hero__title">Simplifying <span class="accent">Complexity</span></h1>
          <p class="hero__subtitle">
            How a sophisticated systems-engineering platform was translated into a clearer story for investors, product teams and customers.
          </p>
        </div>
      </div>
    </section>

    <section class="section" id="pv-opening">
      <div class="container">
        <div class="prose reveal">
          <p>Instead of forcing engineers to describe exactly what a system should do, Provengo allowed companies to specify what they did not want, dramatically simplifying the design of complex systems.</p>
          <p>It sounds simple. It is not. This was one of the most technically sophisticated products I had encountered.</p>
        </div>
      </div>
    </section>

    <section class="section section--alt" id="pv-tech">
      <div class="container">
        <div class="prose reveal">
          <h2>Brilliant technology isn't enough</h2>
          <p>The founders were computer science professors from Ben-Gurion University.</p>
          <p>Their expertise was extraordinary. They also knew something needed sharpening in the way they explained Provengo — the implications were so big for systems engineering, they needed to really get people's attention.</p>
          <p>They had a number of super impressive clients, early adopters, who gave glowing references. Yet in their conversations with investors and potential new customers, they often found themselves struggling with the same problem.</p>
          <p>There were countless ways of explaining their new technology.</p>
          <p>Each member of the team had a slightly different idea about where the story should begin. Every explanation was technically accurate. Few explanations helped people adequately grasp the significance.</p>
          <p class="highlight-text">The real challenge wasn't building the website; it was creating clarity.</p>
        </div>
      </div>
    </section>

    <section class="section" id="pv-audience">
      <div class="container">
        <div class="prose reveal">
          <h2>Looking through the audience's eyes</h2>
          <p>One advantage of not being a systems engineer is that I naturally asked some of the same questions an investor would ask.</p>
          <p>What does that actually mean?</p>
          <p>Why is that important?</p>
          <p>How will this change the way organisations work?</p>
          <p>Instead of trying to explain every aspect of the technology, we focused on helping people understand the problem it solved.</p>
          <p>We reduced the reliance on technical terms. Each sentence carried one clear idea.</p>
          <p>Instead of asking visitors to understand the entire platform, we gave them enough clarity to understand why they should keep reading, or book a demo.</p>
          <p class="highlight-text">That shift influenced everything that followed.</p>
        </div>
      </div>
    </section>

    <section class="section section--alt" id="pv-essence">
      <div class="container">
        <div class="prose reveal">
          <h2>Finding the essence</h2>
          <p>As the messaging became clearer, another piece fell into place.</p>
          <p>The tagline.</p>
          <div class="blockquote">Make Systems Smarter.</div>
          <p>Three simple words.</p>
          <p>They weren't intended to explain the platform. They were intended to express its purpose. Everything else on the website grew naturally from that idea.</p>
          <p>Instead of beginning with technology, the conversation began with people.</p>
          <p>The challenges they faced. The decisions they made. The outcomes they wanted. Only then did the platform itself take centre stage.</p>
          <p class="highlight-text">The website wasn't trying to impress visitors with complexity. It was helping them understand why the technology mattered.</p>
        </div>
      </div>
    </section>

    <section class="section" id="pv-bridge">
      <div class="container">
        <div class="prose reveal">
          <h2>Building the bridge</h2>
          <p>Working on Provengo reminded me that my role isn't to try to become the technical expert.</p>
          <p>The founders already had that covered.</p>
          <p>My role was to stand between deep expertise and the people it needed to reach.</p>
          <p>To ask the questions that a customer might ask.</p>
          <p>To notice where explanations became too complicated.</p>
          <p class="highlight-text">To keep searching for the simplest expression of a sophisticated idea without losing what made it valuable.</p>
          <p>Looking back, I think that's what the project was really about.</p>
          <p>Not reducing complexity.</p>
          <p>Building a bridge across it.</p>
        </div>
      </div>
    </section>

    <section class="section section--alt" id="pv-lessons">
      <div class="container">
        <div class="prose reveal">
          <h2>What this project taught me</h2>
          <p>It's easy to assume that the answer to a complicated product is a more detailed explanation.</p>
          <p>I've found the opposite is often true. People don't need to understand everything before their interest is sparked and they begin to care. They need to understand enough to recognise why something matters. Once that happens, curiosity takes over. The deeper conversations can come later.</p>
          <p class="highlight-text">This project reminded me that clarity isn't about making ideas smaller. It's about making them accessible.</p>
          <p>Sometimes the greatest value isn't explaining more. It's helping people take the first confident step towards understanding.</p>

          <div style="margin-top: var(--space-3xl); display: flex; gap: var(--space-lg); flex-wrap: wrap; align-items: center;">
            <a href="/contact" class="btn btn--primary" id="pv-cta">Let's Talk <span class="btn-arrow">→</span></a>
            <a href="/more-stories" class="btn btn--outline" id="pv-next">More Stories <span class="btn-arrow">→</span></a>
            <a href="/work" class="text-link" id="pv-back">← Back to True Stories</a>
          </div>
        </div>
      </div>
    </section>
  `;

  return applyCmsStory(await getStory('provengo'), html, {
    id: 'pv-hero',
    label: 'True Story — Provengo',
    titleHtml: 'Simplifying <span class="accent">Complexity</span>',
    subtitle: 'How a sophisticated systems-engineering platform was translated into a clearer story for investors, product teams and customers.',
  });
}
