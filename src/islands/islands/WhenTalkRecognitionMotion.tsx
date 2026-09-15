import type { CSSProperties } from 'react';
import { Reveal } from '../../components/motion/Reveal';
import { StaggerGroup } from '../../components/motion/StaggerGroup';
import { StaggerItem } from '../../components/motion/StaggerItem';
import { RECOGNITION_LABEL, RECOGNITION_TITLE, RECOGNITION_LEDE, RECOGNITION_PANELS } from '../../utils/when-scenarios.js';
import type { IslandProps } from '../types';

export function WhenTalkRecognitionMotion(_props: IslandProps) {
  const titleLines = RECOGNITION_TITLE.split('\n');

  return (
    <div className="container">
      <header className="section-header when-talk-recognition__header">
        <Reveal as="span" className="section-header__label" delay={0} y={12}>
          {RECOGNITION_LABEL}
        </Reveal>
        <h2 className="section-header__title">
          {titleLines.map((line, i) => (
            <Reveal as="span" key={line} className="section-header__title-line" delay={0.05 + i * 0.06} y={16}>
              {line}
            </Reveal>
          ))}
        </h2>
        <Reveal as="p" className="when-talk-recognition__lede" delay={0.2} y={12}>
          {RECOGNITION_LEDE}
        </Reveal>
      </header>
      <StaggerGroup className="when-talk-recognition__row">
        {RECOGNITION_PANELS.map((text, index) => (
          <StaggerItem key={text}>
            <div className="when-talk-panel" style={{ '--panel-index': index } as CSSProperties}>
              <span className="when-talk-panel__num">{String(index + 1).padStart(2, '0')}</span>
              <p className="when-talk-panel__text">
                {text.split('\n').map((line, i) => (
                  <span key={line} className="when-talk-panel__line">
                    {line}
                  </span>
                ))}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}
