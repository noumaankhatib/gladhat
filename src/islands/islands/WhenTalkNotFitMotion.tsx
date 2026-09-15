import { Reveal } from '../../components/motion/Reveal';
import { StaggerGroup } from '../../components/motion/StaggerGroup';
import { StaggerItem } from '../../components/motion/StaggerItem';
import { NOT_FIT_TITLE, NOT_FIT_LEDE, NOT_FIT_ITEMS, NOT_FIT_CLOSER } from '../../utils/when-scenarios.js';
import type { IslandProps } from '../types';

export function WhenTalkNotFitMotion(_props: IslandProps) {
  return (
    <div className="container when-talk-not-fit__inner">
      <h2 className="when-talk-not-fit__title">
        {NOT_FIT_TITLE.split('\n').map((line, i) => (
          <Reveal as="span" key={line} className="when-talk-not-fit__title-line" delay={0.05 + i * 0.06} y={16}>
            {line}
          </Reveal>
        ))}
      </h2>
      <Reveal as="p" className="when-talk-not-fit__lede" delay={0.18} y={12}>
        {NOT_FIT_LEDE}
      </Reveal>
      <StaggerGroup className="when-talk-not-fit__list">
        {NOT_FIT_ITEMS.map((item) => (
          <StaggerItem key={item}>
            <div className="when-talk-not-fit__item">
              <span className="when-talk-not-fit__mark" aria-hidden="true">
                &times;
              </span>
              <span>{item}</span>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
      <Reveal as="p" className="when-talk-not-fit__closer highlight-text" delay={0.4} y={10}>
        {NOT_FIT_CLOSER}
      </Reveal>
    </div>
  );
}
