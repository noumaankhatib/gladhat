import { Reveal } from '../../components/motion/Reveal';
import { MagneticButton } from '../../components/motion/MagneticButton';
import { FINAL_TITLE, FINAL_LEDE, FINAL_CTA } from '../../utils/when-scenarios.js';
import type { IslandProps } from '../types';

export function WhenTalkCtaMotion(_props: IslandProps) {
  return (
    <>
      <h2 className="when-talk-cta__title">
        {FINAL_TITLE.split('\n').map((line, i) => (
          <Reveal as="span" key={line} className="when-talk-cta__title-line" delay={0.05 + i * 0.06} y={18}>
            {line}
          </Reveal>
        ))}
      </h2>
      <Reveal as="p" className="when-talk-cta__lede" delay={0.22} y={12}>
        {FINAL_LEDE}
      </Reveal>
      <Reveal className="when-talk-cta__actions" delay={0.32} y={14}>
        <MagneticButton href="/contact" className="btn btn--primary btn--lg btn--pill">
          {FINAL_CTA} <span className="btn-arrow">&rarr;</span>
        </MagneticButton>
        <a href="mailto:m@gladhat.com" className="when-talk-cta__email">
          Or email m@gladhat.com
        </a>
      </Reveal>
    </>
  );
}
