/* ===================================================
   GLADHAT — Header Component
   =================================================== */

import { peekSite, slot } from '../services/content-service.js';
import { Logo } from './Logo.js';

export const NAV_ITEMS = [
  { label: 'When to Talk', path: '/when-we-should-talk' },
  { label: 'How I Work', path: '/working-together' },
  { label: 'True Stories', path: '/work' },
  { label: 'See Differently', path: '/see-your-business-differently' },
  { label: 'About', path: '/about' },
  { label: 'Thoughts', path: '/theblog' },
];

export function Header(currentPath) {
  const site = peekSite();
  const ctaLabel = slot(site?.footer_cta_button, "Let's Talk");
  const navLinks = NAV_ITEMS.map(item => `
    <a href="${item.path}"
       class="nav__link ${currentPath === item.path ? 'nav__link--active' : ''}"
       id="nav-${item.path.replace(/\//g, '').replace(/-/g, '_') || 'home'}">
      ${item.label}
    </a>
  `).join('');

  const mobileLinks = NAV_ITEMS.map(item => `
    <a href="${item.path}"
       class="mobile-nav__link ${currentPath === item.path ? 'mobile-nav__link--active' : ''}">
      ${item.label}
    </a>
  `).join('');

  return `
    <header class="site-header${currentPath === '/' ? ' site-header--over-hero' : ' site-header--solid'}" id="site-header" role="banner">
      <div class="container header-bar">
        <a href="/" class="logo" id="logo-link" aria-label="Gladhat — make it meaningful">
          ${Logo({ variant: 'header' })}
        </a>

        <nav class="nav" id="main-nav" role="navigation" aria-label="Main navigation">
          ${navLinks}
        </nav>

        <div class="header-end">
          <a href="/contact" class="btn btn--primary btn--sm btn--pill nav__cta" id="nav-cta">
            ${ctaLabel} <span class="btn-arrow">→</span>
          </a>
          <button class="menu-toggle" id="menu-toggle" aria-label="Toggle menu" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <nav class="mobile-nav" id="mobile-nav" role="navigation" aria-label="Mobile navigation">
        ${mobileLinks}
        <a href="/contact" class="btn btn--primary mobile-nav__cta">
          ${ctaLabel}
        </a>
      </nav>
      <span
        class="sr-only"
        data-island="header-effects"
        data-is-home="${currentPath === '/' ? 'true' : 'false'}"
        aria-hidden="true"
      ></span>
    </header>
    <!-- Spacer for fixed header -->
    <div style="height: var(--header-height);"></div>
  `;
}
