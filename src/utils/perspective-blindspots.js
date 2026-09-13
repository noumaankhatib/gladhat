/* ===================================================
   GLADHAT — Section 02 blind spots (client copy)
   Source: key-values item 01 details
   =================================================== */

/** Decorative frost labels — visual metaphor only, not body copy */
import { assetUrl } from '../config/env.js';

export const PERSPECTIVE_FROST_LABELS = [
  'Assumptions',
  'Busy work',
  'Internal view',
  'Old messages',
  'What we know',
  'Familiarity',
  'Blind spots',
];

export const PERSPECTIVE_OBSERVATIONS = [
  {
    id: 'confuses',
    text: 'You stop noticing what confuses potential customers.',
    icon: assetUrl('/images/perspective/icon-confuses.png'),
    iconAlt: 'Metallic lens — when closeness narrows what you notice',
  },
  {
    id: 'strengths',
    text: 'You stop seeing the strengths that make you different.',
    icon: assetUrl('/images/perspective/icon-strengths.png'),
    iconAlt: 'Concrete cube with orange core — hidden strengths',
  },
  {
    id: 'explanations',
    text: 'You become attached to explanations that no longer help.',
    icon: assetUrl('/images/perspective/icon-explanations.png'),
    iconAlt: 'Tangled knot — explanations that no longer help',
  },
  {
    id: 'familiar',
    text: 'You miss opportunities because they feel too familiar to notice.',
    icon: assetUrl('/images/perspective/icon-familiar.png'),
    iconAlt: 'Concrete steps with orange top — opportunities that feel familiar',
  },
];

export const PERSPECTIVE_HERO_IMAGE = assetUrl('/images/perspective/perspective-hero.jpg');
export const PERSPECTIVE_HERO_ALT =
  'Close-up eye looking through frosted glass toward a clear mountain landscape — step back to see more';

export const PERSPECTIVE_HERO_VIDEO = assetUrl('/videos/Too-close.mp4');
export const PERSPECTIVE_HERO_POSTER = PERSPECTIVE_HERO_IMAGE;
