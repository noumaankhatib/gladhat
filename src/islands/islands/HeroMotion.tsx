import { m, useReducedMotion } from 'framer-motion';
import { ease } from '../../lib/motion';
import { AnimatedHeading } from '../../components/motion/AnimatedHeading';
import { Enter } from '../../components/motion/Enter';
import { MagneticButton } from '../../components/motion/MagneticButton';
import type { IslandProps } from '../types';

export function HeroMotion({ node }: IslandProps) {
  const reduced = useReducedMotion();
  const heroImg = node.dataset.heroImg ?? '/images/hero-portal-perspective.jpg';
  const heroCta = node.dataset.heroCta ?? "Let's Talk";
  const heroSub =
    node.dataset.heroSub ??
    "Most founders don't need more ideas.\nThey need a different perspective.";

  const subLines = heroSub.split('\n').filter(Boolean);

  return (
    <>
      <div className="hero__content">
        <Enter as="p" className="hero__section-label" delay={0.05}>
          <span className="hero__section-num" aria-hidden="true">
            01
          </span>
          <span>A different way of seeing</span>
        </Enter>
        <AnimatedHeading
          as="h1"
          className="hero__title"
          text="A different way of seeing."
          accentWords={{ 4: 'accent' }}
        />
        <Enter as="div" className="hero__subtitle" delay={0.39}>
          {subLines.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </Enter>
        <Enter as="div" className="hero__actions" delay={0.55}>
          <MagneticButton href="/contact" className="btn btn--primary btn--lg btn--pill hero__cta">
            {heroCta} <span className="btn-arrow">→</span>
          </MagneticButton>
        </Enter>
      </div>
      <div className="hero__media">
        <div className="hero-portal">
          <figure className="hero-portal__figure">
            <m.div
              className="hero-portal__image-wrap"
              initial={reduced ? false : { opacity: 0.55, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, ease, delay: 0.1 }}
            >
              <img
                src={heroImg}
                alt="A person stands inside a dark architectural passage, facing a large circular opening that reveals a clear, sunlit mountain and lake landscape beyond"
                id="hero-image"
                width={1400}
                height={1208}
                fetchPriority="high"
              />
            </m.div>
            <div className="hero-portal__fade" aria-hidden="true" />
            <m.div
              className="hero-portal__ring"
              aria-hidden="true"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease, delay: 0.9 }}
            />
            <m.p
              className="hero-portal__caption"
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 1.15 }}
            >
              <span>Same business.</span>
              <span className="hero-portal__caption-line--accent">A different perspective.</span>
            </m.p>
          </figure>
        </div>
      </div>
    </>
  );
}
