/* ===================================================
   GLADHAT — Section 06 curiosity first (client copy)
   =================================================== */

export const CURIOSITY_BOOKS = [
  {
    id: 'listen',
    label: 'LISTEN',
    annotation: 'START WITH ATTENTION',
    settle: { x: 0, y: 0, rotate: -0.6 },
    start: { x: -22, y: 18, rotate: -5.5 },
    threadY: 0.82,
  },
  {
    id: 'explore',
    label: 'EXPLORE',
    annotation: 'FOLLOW THE QUESTION',
    settle: { x: 10, y: 0, rotate: 1.4 },
    start: { x: 26, y: 14, rotate: 4.8 },
    threadY: 0.68,
  },
  {
    id: 'understand',
    label: 'UNDERSTAND',
    annotation: 'LOOK DEEPER',
    settle: { x: -6, y: 0, rotate: -1.2 },
    start: { x: -18, y: 12, rotate: -3.5 },
    threadY: 0.54,
  },
  {
    id: 'challenge',
    label: 'CHALLENGE',
    annotation: 'TEST THE ASSUMPTION',
    settle: { x: 8, y: 0, rotate: 2.2 },
    start: { x: 20, y: 10, rotate: 5.2 },
    threadY: 0.4,
  },
  {
    id: 'clarify',
    label: 'CLARIFY',
    annotation: 'REMOVE THE NOISE',
    settle: { x: -4, y: 0, rotate: -0.8 },
    start: { x: -14, y: 8, rotate: -2.8 },
    threadY: 0.26,
  },
  {
    id: 'build',
    label: 'BUILD',
    annotation: 'TURN INSIGHT INTO ACTION',
    settle: { x: 5, y: 0, rotate: 0.5 },
    start: { x: 16, y: 6, rotate: 3.2 },
    threadY: 0.12,
  },
];

export const CURIOSITY_QUESTIONS = [
  { id: 'what-if', text: 'What if?', x: '8%', y: '18%', rotate: -8, opacity: 0.92 },
  { id: 'missed', text: 'What have we missed?', x: '72%', y: '24%', rotate: 6, opacity: 0.78 },
  { id: 'going-on', text: "What's really going on?", x: '6%', y: '58%', rotate: -12, opacity: 0.65 },
  { id: 'another-way', text: 'Could there be another way?', x: '68%', y: '62%', rotate: 9, opacity: 0.55 },
  { id: 'choose', text: 'Why do customers choose this?', x: '74%', y: '78%', rotate: -5, opacity: 0.48 },
];

export const CURIOSITY_INTRO = [
  'The best ideas rarely arrive because someone tries to be clever.',
  'They emerge from genuine curiosity.',
  'From wondering what might have been overlooked.',
  'From looking at things from different angles.',
  "That's how I like to work.",
];

export const CURIOSITY_PHILOSOPHY =
  'I want to understand before trying to persuade.';

export const CURIOSITY_VISUAL_GIF = '/images/curiosity/books-moving.gif';

export const CURIOSITY_SCULPTURE_ALT =
  'An animated sculptural stack of six books labelled Listen, Explore, Understand, Challenge, Clarify and Build, with an optical lens revealing a new perspective at the top';
