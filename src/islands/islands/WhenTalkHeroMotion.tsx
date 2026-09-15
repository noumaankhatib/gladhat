import { Enter } from '../../components/motion/Enter';
import { AnimatedLines } from '../../components/motion/AnimatedLines';
import { HERO_LABEL, HERO_TITLE_LINES, HERO_SUBTITLE } from '../../utils/when-scenarios.js';
import type { IslandProps } from '../types';

const TITLE_LINES = HERO_TITLE_LINES.map((text) => ({ text, className: 'hero__title-line' }));

export function WhenTalkHeroMotion(_props: IslandProps) {
  return (
    <>
      <Enter as="span" className="hero__label" delay={0.08}>
        {HERO_LABEL}
      </Enter>
      <AnimatedLines
        as="h1"
        className="hero__title"
        lines={TITLE_LINES}
        maskClassName="hero__title-mask"
        lineClassName="hero__title-line"
      />
      <Enter as="p" className="hero__subtitle" delay={0.42}>
        {HERO_SUBTITLE}
      </Enter>
    </>
  );
}
