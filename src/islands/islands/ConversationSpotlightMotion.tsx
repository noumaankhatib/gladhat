import { m, useReducedMotion } from 'framer-motion';
import { peekSite, slot } from '../../services/content-service.js';
import { MagneticButton } from '../../components/motion/MagneticButton';
import { ParallaxMedia } from '../../components/motion/ParallaxMedia';
import { Reveal } from '../../components/motion/Reveal';
import { ease } from '../../lib/motion';
import type { IslandProps } from '../types';

const ICONS = {
  email: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  linkedin: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  location: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
};

const CONTACT_ITEMS = [
  {
    key: 'email',
    icon: ICONS.email,
    title: 'Email',
    href: (email: string) => `mailto:${email}`,
    linkText: (email: string) => email,
    external: false,
  },
  {
    key: 'linkedin',
    icon: ICONS.linkedin,
    title: 'Follow on LinkedIn',
    href: (linkedin: string) => linkedin,
    linkText: () => 'Stay updated with work and insights.',
    external: true,
  },
  {
    key: 'location',
    icon: ICONS.location,
    title: 'London, UK',
    text: 'Working globally.',
  },
] as const;

const VISUAL_SRC = '/images/11_section.png';
const VISUAL_ALT =
  'Two people in quiet conversation at a stone table on an open terrace at sunset, overlooking mountains and a lake — a moment of shared perspective';

export function ConversationSpotlightMotion(_props: IslandProps) {
  const reduced = useReducedMotion();
  const site = peekSite();
  const email = slot(site?.email, 'm@gladhat.com');
  const linkedin = slot(site?.linkedin, 'https://linkedin.com');

  return (
    <>
      <div className="conversation-cta__main">
        <div className="conversation-cta__copy">
          <Reveal as="p" className="conversation-cta__label" delay={0.08} y={12}>
            <span className="conversation-cta__label-num" aria-hidden="true">11</span>
            <span className="conversation-cta__label-text">Let&apos;s talk</span>
          </Reveal>
          <Reveal as="h2" id="conversation-cta-title" className="conversation-cta__title" delay={0.18} y={18}>
            Let&apos;s have <span className="accent">a conversation</span>.
          </Reveal>
          <Reveal as="p" className="conversation-cta__lead" delay={0.28} y={14}>
            If you&apos;re ready to look at your business differently, I&apos;d love to hear
            what&apos;s on your mind.
          </Reveal>
          <Reveal className="conversation-cta__btn-wrap" delay={0.4} y={12}>
            <MagneticButton
              href="/contact"
              className="btn btn--primary btn--pill btn--lg conversation-cta__btn"
            >
              Get in touch <span className="btn-arrow">→</span>
            </MagneticButton>
          </Reveal>
        </div>

        <aside className="conversation-cta__contact" aria-label="Contact details">
          {CONTACT_ITEMS.map((item) => (
            <m.div
              key={item.key}
              className="conversation-cta__item"
              whileHover={reduced ? undefined : { x: 4 }}
              transition={{ duration: 0.3, ease }}
            >
              <m.span
                className="conversation-cta__icon"
                whileHover={reduced ? undefined : { scale: 1.06, rotate: -2 }}
                transition={{ duration: 0.25, ease }}
              >
                {item.icon}
              </m.span>
              <div className="conversation-cta__item-body">
                <h3 className="conversation-cta__item-title">{item.title}</h3>
                {'href' in item && item.href ? (
                  <a
                    href={item.href(item.key === 'email' ? email : linkedin)}
                    className="conversation-cta__item-link"
                    {...(item.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {item.linkText(item.key === 'email' ? email : linkedin)}
                  </a>
                ) : (
                  <p className="conversation-cta__item-text">{item.text}</p>
                )}
              </div>
            </m.div>
          ))}
        </aside>
      </div>

      <Reveal as="figure" className="conversation-cta__visual" delay={0.15} y={20}>
        <ParallaxMedia className="conversation-cta__visual-frame" offset={24}>
          <img
            src={VISUAL_SRC}
            alt={VISUAL_ALT}
            loading="lazy"
            width={1680}
            height={940}
          />
        </ParallaxMedia>
        <span className="conversation-cta__visual-shine" aria-hidden="true" />
      </Reveal>
    </>
  );
}
