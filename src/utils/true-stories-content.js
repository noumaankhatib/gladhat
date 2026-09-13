/* ===================================================
   GLADHAT — Section 08 True Stories (Server Factory)
   Source: ServerFactory.js + section-proof stats
   =================================================== */

import { assetUrl } from '../config/env.js';
export const TRUE_STORIES_VIDEO = assetUrl('/videos/true-success.mp4');

export const TRUE_STORIES_VIDEO_ALT =
  'Server Factory story — from selling more servers to understanding how organisations choose a supplier, through a clearer perspective, buyer journey and qualified leads';

export const TRUE_STORIES_INTRO =
  'How customer and competitor research helped Server Factory support different buyers, clarify its value and reshape its website and demand generation.';

export const TRUE_STORIES_BEFORE =
  'How do we sell more servers?';

export const TRUE_STORIES_AFTER =
  'How do organisations actually choose a server supplier?';

export const TRUE_STORIES_JOURNEY = [
  'Understand',
  'Compare',
  'Evaluate',
  'Build trust',
  'Choose',
];

export const TRUE_STORIES_STATS = [
  {
    id: 'leads',
    value: '50+',
    label: 'Qualified leads',
    detail: 'From a $7,500 pilot',
  },
  {
    id: 'sales',
    value: '$1.3M+',
    label: 'Sales',
    detail: 'Generated for Server Factory',
  },
];

export const TRUE_STORIES_CTA = {
  href: '/server-factory',
  label: 'Read the Server Factory story',
};
