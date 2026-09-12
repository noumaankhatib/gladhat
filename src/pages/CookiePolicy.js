import { renderLegalPage, getLegalMeta } from '../utils/legal-page.js';

export async function CookiePolicyPage() {
  return renderLegalPage('cookies');
}

export const cookiePolicyMeta = getLegalMeta('cookies');
