/* ===================================================
   GLADHAT — Section 04 essence (client copy)
   Source: key-values item 03 + investigation questions
   =================================================== */

import { assetUrl } from '../config/env.js';
export const ESSENCE_LAYERS = [
  {
    id: 'familiarity',
    label: 'Familiarity',
    sublabel: "What you've always done",
  },
  {
    id: 'complexity',
    label: 'Complexity',
    sublabel: 'Too many explanations',
  },
  {
    id: 'assumptions',
    label: 'Assumptions',
    sublabel: 'Internal ways of describing it',
  },
  {
    id: 'noise',
    label: 'Noise',
    sublabel: 'What others say',
  },
  {
    id: 'essence',
    label: 'The essence',
    sublabel: 'What truly makes you different',
    accent: true,
  },
];

export const ESSENCE_INVESTIGATION = [
  {
    num: '01',
    id: 'choose',
    text: 'What makes customers choose you?',
    detail: 'The value that truly matters.',
    icon: assetUrl('/images/essence/investigation-icon-choose.svg'),
    iconAlt: 'Half grey half orange sphere — what makes customers choose you',
  },
  {
    num: '02',
    id: 'noticing',
    text: 'What have you stopped noticing?',
    detail: 'The strengths that are easy to miss.',
    icon: assetUrl('/images/essence/investigation-icon-noticing.svg'),
    iconAlt: 'Concrete cube with orange core — what you have stopped noticing',
  },
  {
    num: '03',
    id: 'opportunity',
    text: 'Where is the opportunity?',
    detail: "The potential that's already there.",
    icon: assetUrl('/images/essence/investigation-icon-opportunity.svg'),
    iconAlt: 'Concrete steps with orange top — where the opportunity is',
  },
  {
    num: '04',
    id: 'assumptions',
    text: 'What assumptions are shaping decisions?',
    detail: 'The beliefs worth rethinking.',
    icon: assetUrl('/images/essence/investigation-icon-assumptions.svg'),
    iconAlt: 'Stone ring with orange inner glow — assumptions shaping decisions',
  },
];

export const ESSENCE_VIDEO = assetUrl('/videos/essence-section.mp4');
export const ESSENCE_VIDEO_POSTER = assetUrl('/images/essence/essence-final-composition.jpg');

export const ESSENCE_FINAL_IMAGE = ESSENCE_VIDEO_POSTER;
export const ESSENCE_FINAL_ALT =
  'Layered stone and glass slabs separated to reveal a warm orange core — the essence of the business';

export const ESSENCE_LAYER_ASSETS = {
  top: assetUrl('/images/essence/essence-layer-familiarity.png'),
  bottom: assetUrl('/images/essence/essence-layer-complexity.png'),
  glass: assetUrl('/images/essence/essence-layer-glass.png'),
  core: assetUrl('/images/essence/essence-core.png'),
};

export const ESSENCE_INTRO =
  'I believe every business has a core truth at its centre — the things it does exceptionally well, the things customers value most, and the things competitors cannot easily copy. Sometimes it is obvious. More often, it is hidden beneath familiarity, complexity or habit. The work is not to invent something new. It is to uncover what is already there and express it with clarity.';
