import { renderLegalPage, getLegalMeta } from '../utils/legal-page.js';

export async function TermsPage() {
  return renderLegalPage('terms');
}

export const termsMeta = getLegalMeta('terms');
