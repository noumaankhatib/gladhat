/* ===================================================
   GLADHAT — Section 05 connecting the dots (client copy)
   Source: key-values item 04 + reference art direction
   =================================================== */

export const CONNECTING_OBJECTS = [
  {
    id: 'psychology',
    label: 'Customer psychology',
    labelLines: ['Customer', 'psychology'],
    phase: { start: 0, end: 0.17 },
  },
  {
    id: 'positioning',
    label: 'Positioning',
    labelLines: ['Positioning'],
    phase: { start: 0.14, end: 0.31 },
  },
  {
    id: 'communication',
    label: 'Communication',
    labelLines: ['Communication'],
    phase: { start: 0.28, end: 0.45 },
  },
  {
    id: 'objectives',
    label: 'Commercial objectives',
    labelLines: ['Commercial', 'objectives'],
    phase: { start: 0.42, end: 0.59 },
  },
  {
    id: 'opportunities',
    label: 'Creative opportunities',
    labelLines: ['Creative', 'opportunities'],
    phase: { start: 0.56, end: 0.73 },
  },
  {
    id: 'partnerships',
    label: 'Partnerships',
    labelLines: ['Partnerships'],
    phase: { start: 0.7, end: 0.87 },
  },
];

export const CONNECTING_RELATIONSHIPS = [
  { from: 'psychology', to: 'positioning', start: 0.1, end: 0.28 },
  { from: 'positioning', to: 'communication', start: 0.22, end: 0.4 },
  { from: 'communication', to: 'opportunities', start: 0.34, end: 0.52 },
  { from: 'objectives', to: 'partnerships', start: 0.46, end: 0.62 },
  { from: 'opportunities', to: 'objectives', start: 0.56, end: 0.74 },
  { from: 'partnerships', to: 'psychology', start: 0.68, end: 0.88 },
];

export const CONNECTING_OUTCOMES = [
  {
    num: '01',
    id: 'understanding',
    title: 'A shared understanding',
    detail: 'See the business more clearly.',
  },
  {
    num: '02',
    id: 'decisions',
    title: 'Sharper decisions',
    detail: 'Focus on what really matters.',
  },
  {
    num: '03',
    id: 'alignment',
    title: 'Stronger alignment',
    detail: 'Bring your team with you.',
  },
  {
    num: '04',
    id: 'progress',
    title: 'Meaningful progress',
    detail: 'Turn clarity into momentum.',
  },
];

export const CONNECTING_INTRO =
  'I help founders and leadership teams look beyond the obvious. I connect customer psychology, commercial objectives, positioning, communication, creative opportunities and partnerships.';

export const CONNECTING_PHILOSOPHY =
  'The deliverable is never the starting point. The thinking is.';

export const CONNECTING_CTA = 'See how it fits together';

export const CONNECTING_VISUAL_IMAGE = '/images/connecting/connecting-dots.png';
export const CONNECTING_FALLBACK_IMAGE = CONNECTING_VISUAL_IMAGE;
export const CONNECTING_FALLBACK_ALT =
  'A connected system of sculptural objects linked by warm orange paths around a luminous central sphere — customer psychology, communication, creative opportunities, positioning, partnerships and execution';
