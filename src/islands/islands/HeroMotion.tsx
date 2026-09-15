import { AnimatedHeading } from '../../components/motion/AnimatedHeading';
import { Enter } from '../../components/motion/Enter';
import { MagneticButton } from '../../components/motion/MagneticButton';
import type { IslandProps } from '../types';

export function HeroMotion({ node }: IslandProps) {
  const heroCta = node.dataset.heroCta ?? 'See how I think';
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
          <span>Commercial Strategy</span>
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
    </>
  );
}
