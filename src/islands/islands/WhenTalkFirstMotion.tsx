import { Reveal } from '../../components/motion/Reveal';
import { MagneticButton } from '../../components/motion/MagneticButton';
import { FIRST_LABEL, FIRST_NUMBER, FIRST_TITLE, FIRST_LEDE, FIRST_CTA } from '../../utils/when-scenarios.js';
import type { IslandProps } from '../types';

export function WhenTalkFirstMotion(_props: IslandProps) {
  return (
    <>
      <Reveal as="span" className="section-header__label" delay={0} y={12}>
        {FIRST_LABEL}
      </Reveal>
      <Reveal as="span" className="when-talk-first__number" delay={0.05} y={10}>
        {FIRST_NUMBER}
      </Reveal>
      <Reveal as="h2" className="when-talk-first__title" delay={0.1} y={16}>
        {FIRST_TITLE}
      </Reveal>
      <Reveal as="p" className="when-talk-first__lede" delay={0.18} y={12}>
        {FIRST_LEDE}
      </Reveal>
      <Reveal delay={0.26} y={12}>
        <MagneticButton href="/contact" className="btn btn--primary btn--lg btn--pill">
          {FIRST_CTA} <span className="btn-arrow">&rarr;</span>
        </MagneticButton>
      </Reveal>
    </>
  );
}
