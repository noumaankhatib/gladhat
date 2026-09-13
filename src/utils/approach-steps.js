/* ===================================================
   GLADHAT — Approach spotlight (shared data)
   Source: client content doc, "Working Together" page
   =================================================== */

import { assetUrl } from '../config/env.js';
export const APPROACH_INTRO =
  "I want to understand what you've built, what excites you, what frustrates you, where you feel confident, where you're uncertain, what you've already tried, and what keeps returning to your mind.";

export const APPROACH_STEPS = [
  {
    id: '01',
    num: '01',
    title: 'Listening comes first',
    text: 'Understand the real opportunity.',
    quote: 'Only then do patterns begin to emerge.',
    image: assetUrl('/images/epic_essence.png'),
    imageAlt: 'Listening and understanding your business',
    details: `
      <p>The best work begins with curiosity — listening, research, questions. Understanding your customers, your market, and how you see your business.</p>
    `,
  },
  {
    id: '02',
    num: '02',
    title: 'Looking together',
    text: 'See beyond the obvious.',
    quote: 'What have you stopped noticing?',
    image: assetUrl('/images/perspective_prism.png'),
    imageAlt: 'Looking at the business from a different angle',
    details: `
      <p>Once I understand the landscape, I start asking different questions — what assumptions are shaping your decisions, what your customers value most, what's getting in the way, and where the opportunities are hiding in plain sight.</p>
      <p>Sometimes those questions confirm the direction you're already taking. Sometimes they change it completely. Both outcomes are valuable.</p>
    `,
  },
  {
    id: '03',
    num: '03',
    title: 'Challenging ideas',
    text: 'Shape a clearer direction.',
    quote: 'Better questions often lead to better decisions.',
    image: assetUrl('/images/conversation.png'),
    imageAlt: 'Challenging ideas respectfully',
    details: `
      <p>Founders carry a huge amount of knowledge, experience and instinct. They've earned it. My role isn't to replace that — it's to challenge assumptions respectfully, and ask the questions that are difficult to ask when you're living inside the business every day.</p>
    `,
  },
  {
    id: '04',
    num: '04',
    title: 'Connecting the dots',
    text: 'Turn thinking into meaningful impact.',
    quote: 'The deliverable is never the starting point. The thinking is.',
    image: assetUrl('/images/epic_connecting.png'),
    imageAlt: 'Connecting ideas into practical action',
    details: `
      <p>I connect customer psychology with commercial objectives. Positioning with communications. Creative ideas with practical action.</p>
      <p>Sometimes the answer is a clearer message, a different audience, or a stronger partnership — or a completely different way of looking at the business.</p>
    `,
  },
  {
    id: '05',
    num: '05',
    title: 'Creating what matters',
    text: 'Only once the thinking is clear.',
    quote: 'The deliverables change. The thinking behind them doesn’t.',
    image: assetUrl('/images/creating/creating-matters-installation.jpg'),
    imageAlt: 'Creating a piece of work that reflects a deeper understanding',
    details: `
      <p>Only after we've developed a clear understanding do we begin creating — a Strategy Sprint, a new website, a positioning project, a campaign, an event concept, or ongoing strategic support.</p>
      <p>Every piece of work should reflect a deeper understanding of the business, the customer and the opportunity.</p>
    `,
  },
];

export const APPROACH_DEFAULT_IMAGE = assetUrl('/images/research.png');
export const APPROACH_DEFAULT_IMAGE_ALT = 'A clearer perspective on your business';
