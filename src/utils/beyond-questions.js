/* ===================================================
   GLADHAT — Section 03 questions (client copy)
   =================================================== */

import { assetUrl } from '../config/env.js';

/** Decorative frame labels — visual metaphor only */
export const BEYOND_FRAME_LABELS = [
  { id: 'assumptions', label: 'Assumptions' },
  { id: 'familiarity', label: 'Familiarity' },
  { id: 'blind-spots', label: 'Blind spots' },
  { id: 'noise', label: 'Noise' },
];

export const BEYOND_QUESTIONS = [
  {
    num: '01',
    id: 'choose',
    text: 'What makes customers choose you?',
    icon: assetUrl('/images/essence/investigation-icon-choose.svg'),
    iconAlt: 'Half grey half orange sphere — what makes customers choose you',
  },
  {
    num: '02',
    id: 'noticing',
    text: 'What have you stopped noticing?',
    icon: assetUrl('/images/essence/investigation-icon-noticing.svg'),
    iconAlt: 'Concrete cube with orange core — what you have stopped noticing',
  },
  {
    num: '03',
    id: 'opportunity',
    text: 'Where is the opportunity?',
    icon: assetUrl('/images/essence/investigation-icon-opportunity.svg'),
    iconAlt: 'Concrete steps with orange top — where the opportunity is',
  },
  {
    num: '04',
    id: 'assumptions',
    text: 'What assumptions are shaping decisions?',
    icon: assetUrl('/images/essence/investigation-icon-assumptions.svg'),
    iconAlt: 'Stone ring with orange inner glow — assumptions shaping decisions',
  },
];

export const BEYOND_HERO_IMAGE = assetUrl('/images/beyond/beyond-frames-hero.jpg');
export const BEYOND_HERO_ALT =
  'Five pillars — Observe, Explore, Connect, Clarify, and Solve — progressing from obscured views to a clear mountain landscape';
