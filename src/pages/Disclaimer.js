import { renderLegalPage, getLegalMeta } from '../utils/legal-page.js';

export async function DisclaimerPage() {
  return renderLegalPage('disclaimer');
}

export const disclaimerMeta = getLegalMeta('disclaimer');
