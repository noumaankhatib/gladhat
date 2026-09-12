/* ===================================================
   GLADHAT — When We Should Talk (full client copy)
   =================================================== */

export const WHEN_INTRO_PARAGRAPHS = [
  "Most founders don't wake up thinking they need a new commercial strategy.",
  "They wake up thinking something isn't working.",
  'Growth has slowed.',
  'The message feels unclear.',
  'The website no longer reflects the quality of the business.',
  "Marketing isn't producing the results they expected.",
  "Or there's a feeling that a bigger opportunity exists, but they can't quite see it yet.",
];

export const WHEN_INTRO_INSIGHT =
  'Those are often the moments when an experienced outside perspective becomes valuable.';

export const WHEN_INTRO_SIGNALS = WHEN_INTRO_PARAGRAPHS.slice(2);

export const WHEN_FOCUS_LINES = [
  "An outside perspective isn't about fixing what's broken —",
  "it's about seeing what you've stopped noticing.",
];

export const WHEN_SCENARIOS = [
  {
    id: 'too-close',
    number: '01',
    navLabel: 'Too close',
    reverse: true,
    title: "…when you're too close to see clearly",
    image: '/images/perspective_prism.png',
    imageAlt: 'Looking at a business from a fresh perspective',
    focus:
      "You don't need someone to tell you how to run your business. You need someone who helps you see it with fresh eyes.",
    body: `
      <p class="when-talk-prose__lead">No one knows your business better than you. That's also the challenge.</p>
      <p>The longer you live with something, the harder it becomes to experience it the way your customers do.</p>
      <p>You stop noticing the things that confuse people. You overlook strengths because they feel ordinary.</p>
      <p>You become attached to explanations that no longer resonate.</p>
    `,
  },
  {
    id: 'message',
    number: '02',
    navLabel: 'Message',
    reverse: false,
    title: '…when your message no longer reflects your value',
    image: '/images/essence.png',
    imageAlt: 'Clarifying the essence of your message',
    focus: null,
    body: `
      <p class="when-talk-prose__lead">Many businesses don't have a marketing problem. They have a <strong>clarity problem</strong>.</p>
      <p>Customers don't immediately understand what makes the offering different.</p>
      <p>Key strengths get buried beneath features, technical language or familiar assumptions.</p>
    `,
  },
  {
    id: 'decisions',
    number: '03',
    navLabel: 'Decisions',
    reverse: true,
    title: "…when you're making important decisions",
    image: '/images/whatif.png',
    imageAlt: 'Exploring possibilities before major decisions',
    focus: 'A short conversation can prevent a much larger investment in the wrong solution.',
    body: `
      <ul class="when-talk-list when-talk-list--questions">
        <li>Should you invest in a new website?</li>
        <li>Run a PPC campaign?</li>
        <li>Reposition the business?</li>
        <li>Enter a new market?</li>
        <li>Expand your offering?</li>
      </ul>
      <p class="when-talk-prose__lead">Before making those decisions, it's worth pausing to make sure you're solving the right problem.</p>
    `,
  },
  {
    id: 'opportunity',
    number: '04',
    navLabel: 'Opportunity',
    reverse: false,
    title: "…when you feel there's a bigger opportunity",
    image: '/images/beyond.png',
    imageAlt: 'Seeing opportunity beyond the obvious',
    focus:
      "Those opportunities can't always be discovered by working harder. Sometimes they appear when somebody asks an unusual question.",
    body: `
      <p class="when-talk-prose__lead">This is one of my favourite situations.</p>
      <p>You have a good business. You have capable people. Things are working reasonably well.</p>
      <p class="when-talk-beat">And yet…</p>
      <p>You have a feeling there's another opportunity hiding in plain sight.</p>
      <p class="when-talk-prose__aside">Perhaps it's: a new partnership; a different audience; a stronger positioning; a new commercial idea; or simply another way of looking at what you already have.</p>
    `,
  },
  {
    id: 'partner',
    number: '05',
    navLabel: 'Partner',
    reverse: true,
    title: '…when you want a thinking partner',
    image: '/images/connecting.png',
    imageAlt: 'Connecting ideas as a thinking partner',
    focus: 'Because real commercial growth happens when they work together.',
    body: `
      <ul class="when-talk-beats">
        <li>Sometimes founders don't need another marketing services provider.</li>
        <li>They need someone to think with.</li>
        <li>Someone who enjoys asking difficult questions.</li>
        <li>Someone who challenges assumptions respectfully.</li>
        <li>Someone who naturally connects ideas that don't always seem related.</li>
      </ul>
      <div class="when-talk-tags">
        <span>Customer psychology</span>
        <span>Commercial strategy</span>
        <span>Positioning</span>
        <span>Communications</span>
        <span>Creative thinking</span>
      </div>
      <p>Not because those disciplines are separate.</p>
    `,
  },
];

export const WHEN_NEXT_PARAGRAPHS = [
  {
    html: 'Every engagement starts in the same place: <strong>Research.</strong>',
    role: 'research',
    label: '01',
    title: 'Research',
  },
  {
    html: "We'll explore your business, your customers, your ambitions and the challenges you're facing.",
    role: 'explore',
    label: '02',
    title: 'Explore',
  },
  {
    html: 'Sometimes the outcome is a Strategy Sprint — a focused project that helps us understand your business, uncover opportunities and decide where your time and energy will have the greatest commercial impact.',
    role: 'outcomes',
    label: '03',
    title: 'Outcomes',
  },
  {
    html: "Sometimes it's a new website. Sometimes it's a positioning project, an advertising campaign, an event concept or an opportunity neither of us could have predicted at the start.",
    role: 'outcomes-detail',
  },
  { html: "The deliverables vary. The purpose doesn't.", role: 'divider' },
  { html: 'The goal is always the same:', highlight: true, role: 'goal' },
  {
    html: 'To help you see your business more clearly, discover opportunities you didn\'t know were there, and communicate your value with confidence.',
    highlight: true,
    role: 'goal-detail',
  },
];

export const WHEN_CTA_LINES = [
  { tag: 'eyebrow', text: 'Ready when you are' },
  { tag: 'h2', text: "Let's talk" },
  { tag: 'p', text: "If you've read this page and found yourself thinking," },
  { tag: 'quote', text: '"That\'s exactly where I am."' },
  { tag: 'p', text: "I'd love to hear your story." },
  { tag: 'p', text: 'Not because I already have the answers.' },
  {
    tag: 'p',
    text: 'Because the right questions often lead us somewhere much more interesting than either of us expected.',
  },
];

export function renderIntroStory() {
  const hook = WHEN_INTRO_PARAGRAPHS.slice(0, 2);
  const signals = WHEN_INTRO_SIGNALS.map(
    (text, i) =>
      `<li class="when-talk-signals__item"><span class="when-talk-signals__num scrolly-number">${String(i + 1).padStart(2, '0')}</span><span class="when-talk-signals__text">${text}</span></li>`,
  ).join('');

  return `
    <div class="when-talk-story when-talk-story--intro">
      <p class="when-talk-story__hook">${hook[0]}</p>
      <p class="when-talk-story__hook when-talk-story__hook--accent">${hook[1]}</p>
      <ul class="when-talk-signals" aria-label="Signals something isn't working">${signals}</ul>
      <p class="when-talk-story__bridge highlight-text">${WHEN_INTRO_INSIGHT}</p>
    </div>`;
}

export function renderIntroParagraphs() {
  return renderIntroStory();
}

export function renderNextStory() {
  const steps = WHEN_NEXT_PARAGRAPHS.filter((p) => p.label && p.title);
  const stepsHtml = steps
    .map(
      (step) => `
      <li class="when-talk-next-step">
        <span class="when-talk-next-step__num scrolly-number">${step.label}</span>
        <div class="when-talk-next-step__copy">
          <h3 class="when-talk-next-step__title">${step.title}</h3>
          <p>${step.html}</p>
        </div>
      </li>`,
    )
    .join('');

  const detail = WHEN_NEXT_PARAGRAPHS.find((p) => p.role === 'outcomes-detail');
  const divider = WHEN_NEXT_PARAGRAPHS.find((p) => p.role === 'divider');
  const goal = WHEN_NEXT_PARAGRAPHS.filter((p) => p.role === 'goal' || p.role === 'goal-detail');

  return `
    <ol class="when-talk-next-steps">${stepsHtml}</ol>
    ${detail ? `<p class="when-talk-next__detail">${detail.html}</p>` : ''}
    ${divider ? `<p class="when-talk-next__divider">${divider.html}</p>` : ''}
    <div class="when-talk-next__goal-block">
      ${goal.map((g) => `<p class="highlight-text">${g.html}</p>`).join('')}
    </div>`;
}

export function renderNextParagraphs() {
  return renderNextStory();
}

export function renderWhenScenarioNav() {
  return WHEN_SCENARIOS.map(
    (s) =>
      `<a href="#scenario-${s.id}" class="when-talk-nav__chip" data-scenario-nav="${s.id}"><span class="when-talk-nav__chip-num">${s.number}</span>${s.navLabel}</a>`,
  ).join('');
}

export function renderWhenScenario(scenario, index) {
  const reverseClass = scenario.reverse ? ' split--reverse' : '';
  const focusHtml = scenario.focus
    ? `<blockquote class="when-talk-scenario__focus">${scenario.focus}</blockquote>`
    : '';
  return `
    <article class="when-talk-scenario when-talk-scenario--${scenario.id} split${reverseClass}" id="scenario-${scenario.id}" data-scenario="${scenario.id}" style="--scenario-index: ${index}">
      <div class="split__text when-talk-scenario__panel">
        <span class="when-talk-scenario__index scrolly-number">${scenario.number}</span>
        <h2 class="when-talk-scenario__title">${scenario.title}</h2>
        <div class="when-talk-scenario__body when-talk-prose">${scenario.body}</div>
        ${focusHtml}
      </div>
      <figure class="split__image when-talk-scenario__media" data-when-talk-tilt>
        <div class="when-talk-scenario__frame">
          <div class="when-talk-scenario__tilt" data-when-talk-tilt-inner>
            <img src="${scenario.image}" alt="${scenario.imageAlt}" loading="lazy" decoding="async" width="800" height="800">
          </div>
        </div>
      </figure>
    </article>
  `;
}
