import { useReducedMotion } from 'framer-motion';
import { Reveal } from '../../components/motion/Reveal';
import { StaggerGroup } from '../../components/motion/StaggerGroup';
import { StaggerItem } from '../../components/motion/StaggerItem';
import { HELP_LABEL, HELP_TITLE, HELP_LEDE, HELP_CENTER, HELP_ORBIT } from '../../utils/when-scenarios.js';
import type { IslandProps } from '../types';

const RADIUS = 42;

function orbitPosition(index: number, total: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  const x = 50 + RADIUS * Math.cos(angle);
  const y = 50 + RADIUS * Math.sin(angle) * 0.72;
  return { left: `${x}%`, top: `${y}%` };
}

export function WhenTalkHelpMotion(_props: IslandProps) {
  const reduced = useReducedMotion();

  return (
    <div className="container">
      <header className="section-header when-talk-help__header">
        <Reveal as="span" className="section-header__label" delay={0} y={12}>
          {HELP_LABEL}
        </Reveal>
        <h2 className="section-header__title">
          {HELP_TITLE.split('\n').map((line, i) => (
            <Reveal as="span" key={line} className="section-header__title-line" delay={0.05 + i * 0.06} y={16}>
              {line}
            </Reveal>
          ))}
        </h2>
        <Reveal as="p" className="when-talk-help__lede" delay={0.2} y={12}>
          {HELP_LEDE}
        </Reveal>
      </header>

      <Reveal as="div" className={`when-talk-orbit${reduced ? ' when-talk-orbit--static' : ''}`} delay={0.15} y={20}>
        <svg className="when-talk-orbit__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {HELP_ORBIT.map((label, index) => {
            const pos = orbitPosition(index, HELP_ORBIT.length);
            return (
              <line
                key={label}
                x1="50"
                y1="50"
                x2={parseFloat(pos.left)}
                y2={parseFloat(pos.top)}
                className="when-talk-orbit__line"
              />
            );
          })}
        </svg>
        <div className="when-talk-orbit__center">{HELP_CENTER}</div>
        <StaggerGroup contents>
          {HELP_ORBIT.map((label, index) => (
            <StaggerItem key={label}>
              <div className="when-talk-orbit__node" style={orbitPosition(index, HELP_ORBIT.length)}>
                {label}
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Reveal>
    </div>
  );
}
