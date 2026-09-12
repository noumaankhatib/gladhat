import { Enter } from '../../components/motion/Enter';
import { AnimatedHeading } from '../../components/motion/AnimatedHeading';
import type { IslandProps } from '../types';

export function WhenTalkHeroMotion(_props: IslandProps) {
  return (
    <>
      <Enter as="span" className="hero__label" delay={0.08}>
        Gladhat
      </Enter>
      <AnimatedHeading
        as="h1"
        className="hero__title"
        text="When We Should Talk."
        accentWords={{ 3: 'accent' }}
      />
      <Enter as="p" className="hero__subtitle" delay={0.42}>
        Most founders don&apos;t wake up thinking they need a new commercial strategy. They wake
        up thinking something isn&apos;t working.
      </Enter>
    </>
  );
}
