import { Logo } from '../../components/Logo.js';
import { peekSite, slot } from '../../services/content-service.js';
import { StaggerGroup } from '../../components/motion/StaggerGroup';
import { StaggerItem } from '../../components/motion/StaggerItem';
import { NAV_ITEMS } from '../../components/Header.js';
import type { IslandProps } from '../types';

export function FooterMotion(_props: IslandProps) {
  const site = peekSite();
  const linkedin = slot(site?.linkedin, 'https://linkedin.com');
  const email = slot(site?.email, 'm@gladhat.com');

  return (
    <StaggerGroup contents>
      <StaggerItem>
        <div className="footer-brand">
          <a href="/" className="logo footer-brand__logo" aria-label="Gladhat — home">
            <span dangerouslySetInnerHTML={{ __html: Logo({ variant: 'header' }) }} />
          </a>
          <p className="footer-brand__tagline">
            Commercial strategy, positioning and communication for founders who value clear thinking.
          </p>
        </div>
      </StaggerItem>
      <StaggerItem>
        <div className="footer-explore">
          <p className="footer-links__title">Explore</p>
          <nav className="footer-links__list" aria-label="Footer navigation">
            {NAV_ITEMS.map((item) => (
              <a key={item.path} href={item.path} className="footer-links__link">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </StaggerItem>
      <StaggerItem>
        <div className="footer-contact">
          <p className="footer-links__title">Contact</p>
          <a href={`mailto:${email}`} className="footer-contact__email">{email}</a>
          <a
            href={linkedin}
            className="footer-contact__social"
            target="_blank"
            rel="noopener noreferrer"
            id="footer-linkedin"
            aria-label="LinkedIn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </StaggerItem>
    </StaggerGroup>
  );
}
