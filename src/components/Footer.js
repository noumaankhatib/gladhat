/* ===================================================
   GLADHAT — Footer Component
   =================================================== */

import { peekSite, slot } from '../services/content-service.js';
import { Logo } from './Logo.js';
import { NAV_ITEMS } from './Header.js';

export function Footer(currentPath = '/') {
  const site = peekSite();
  const linkedin = slot(site?.linkedin, 'https://linkedin.com');
  const email = slot(site?.email, 'm@gladhat.com');
  const year = 2026;
  const isHome = currentPath === '/';

  const exploreLinks = NAV_ITEMS.map((item) => `
    <a href="${item.path}" class="footer-links__link">${item.label}</a>
  `).join('');

  return `
    <footer class="site-footer" id="site-footer" role="contentinfo">
      ${isHome ? '' : `
      <div class="footer-cta">
        <div class="container footer-cta__content">
          <p class="footer-cta__title">Ready to see your business from another angle?</p>
          <a href="/contact" class="btn btn--primary btn--lg btn--pill" id="footer-cta-btn">
            Begin the Conversation <span class="btn-arrow">→</span>
          </a>
        </div>
      </div>
      `}

      <div class="footer-main">
        <div class="container footer-grid" data-island="footer-motion">
          <div class="footer-brand">
            <a href="/" class="logo footer-brand__logo" aria-label="Gladhat — home">
              ${Logo({ variant: 'header' })}
            </a>
            <p class="footer-brand__tagline">Commercial strategy, positioning and communication for founders who value clear thinking.</p>
          </div>

          <div class="footer-explore">
            <p class="footer-links__title">Explore</p>
            <nav class="footer-links__list" aria-label="Footer navigation">
              ${exploreLinks}
            </nav>
          </div>

          <div class="footer-contact">
            <p class="footer-links__title">Contact</p>
            <a href="mailto:${email}" class="footer-contact__email">${email}</a>
            <a href="${linkedin}" class="footer-contact__social" target="_blank" rel="noopener noreferrer" id="footer-linkedin" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="container">
          <p class="footer-bottom__copy">&copy; ${year} Gladhat</p>
          <nav class="footer-bottom__links" aria-label="Legal">
            <a href="/privacy" id="footer-privacy">Privacy</a>
            <a href="/terms" id="footer-terms">Terms &amp; Conditions</a>
            <a href="/disclaimer" id="footer-disclaimer">Disclaimer</a>
            <a href="/cookie-policy" id="footer-cookie-policy">Cookie Policy</a>
          </nav>
        </div>
      </div>
    </footer>
  `;
}
