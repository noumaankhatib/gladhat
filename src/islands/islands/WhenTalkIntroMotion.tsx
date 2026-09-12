import { Reveal } from '../../components/motion/Reveal';
import { StaggerGroup } from '../../components/motion/StaggerGroup';
import { StaggerItem } from '../../components/motion/StaggerItem';
import { m } from 'framer-motion';
import {
  WHEN_INTRO_INSIGHT,
  WHEN_INTRO_PARAGRAPHS,
  WHEN_INTRO_SIGNALS,
} from '../../utils/when-scenarios.js';
import { ease } from '../../lib/motion';
import type { IslandProps } from '../types';

export function WhenTalkIntroMotion(_props: IslandProps) {
  const hooks = WHEN_INTRO_PARAGRAPHS.slice(0, 2);

  return (
    <div className="when-talk-story when-talk-story--intro">
      <Reveal as="p" className="when-talk-story__hook" delay={0} y={16}>
        {hooks[0]}
      </Reveal>
      <Reveal as="p" className="when-talk-story__hook when-talk-story__hook--accent" delay={0.08} y={16}>
        {hooks[1]}
      </Reveal>
      <ul className="when-talk-signals" aria-label="Signals something isn't working">
        <StaggerGroup contents>
          {WHEN_INTRO_SIGNALS.map((text, index) => (
            <StaggerItem key={text}>
              <m.li
                className="when-talk-signals__item"
                variants={{
                  hidden: { opacity: 1, x: -12 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
                }}
              >
                <span className="when-talk-signals__num scrolly-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="when-talk-signals__text">{text}</span>
              </m.li>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </ul>
      <Reveal as="p" className="when-talk-story__bridge highlight-text" delay={0.2} y={14}>
        {WHEN_INTRO_INSIGHT}
      </Reveal>
    </div>
  );
}
