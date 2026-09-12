import { renderLegalPage, getLegalMeta } from '../utils/legal-page.js';

export async function PrivacyPage() {
  return renderLegalPage('privacy');
}

export const privacyMeta = getLegalMeta('privacy');
