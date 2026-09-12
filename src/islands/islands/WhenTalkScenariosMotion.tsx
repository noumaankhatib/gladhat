import type { CSSProperties } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { AnimatedLines } from '../../components/motion/AnimatedLines';
import { ParallaxMedia } from '../../components/motion/ParallaxMedia';
import { Reveal } from '../../components/motion/Reveal';
import { StaggerGroup } from '../../components/motion/StaggerGroup';
import { StaggerItem } from '../../components/motion/StaggerItem';
import { WHEN_SCENARIOS } from '../../utils/when-scenarios.js';
import { ease, revealViewport, scaleIn } from '../../lib/motion';
import type { IslandProps } from '../types';

const HEADER_LINES = [
  { text: 'When to', className: 'section-header__title-line' },
  { text: 'Talk.', className: 'section-header__title-line section-header__title-line--accent' },
];

function ScenarioBlock({
  scenario,
  index,
}: {
  scenario: (typeof WHEN_SCENARIOS)[number];
  index: number;
}) {
  const reduced = useReducedMotion();

  return (
    <StaggerItem>
      <m.article
        id={`scenario-${scenario.id}`}
        data-scenario={scenario.id}
        className={`when-talk-scenario when-talk-scenario--${scenario.id} split${scenario.reverse ? ' split--reverse' : ''}`}
        style={{ '--scenario-index': index } as CSSProperties}
        variants={scaleIn}
      >
        <div className="split__text when-talk-scenario__panel">
          <Reveal as="span" className="when-talk-scenario__index scrolly-number" delay={0} y={8}>
            {scenario.number}
          </Reveal>
          <Reveal as="h2" className="when-talk-scenario__title" delay={0.05} y={16}>
            {scenario.title}
          </Reveal>
          <m.div
            className="when-talk-scenario__body when-talk-prose"
            initial={reduced ? false : { opacity: 1, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            dangerouslySetInnerHTML={{ __html: scenario.body }}
          />
          {scenario.focus ? (
            <Reveal as="blockquote" className="when-talk-scenario__focus" delay={0.18} y={14}>
              {scenario.focus}
            </Reveal>
          ) : null}
        </div>
        <figure className="split__image when-talk-scenario__media" data-when-talk-tilt>
          <ParallaxMedia className="when-talk-scenario__frame" speed={0.1}>
            <div data-when-talk-tilt-inner className="when-talk-scenario__tilt">
              <img
                src={scenario.image}
                alt={scenario.imageAlt}
                loading="lazy"
                decoding="async"
                width={800}
                height={800}
              />
            </div>
          </ParallaxMedia>
          <m.span
            className="when-talk-scenario__reveal"
            aria-hidden="true"
            initial={reduced ? false : { scaleX: 1 }}
            whileInView={{ scaleX: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.8, ease, delay: 0.08 + index * 0.05 }}
          />
        </figure>
      </m.article>
    </StaggerItem>
  );
}

export function WhenTalkScenariosMotion(_props: IslandProps) {
  return (
    <>
      <header className="section-header when-talk-scenarios__header">
        <Reveal as="span" className="section-header__label" delay={0} y={12}>
          The Scenarios
        </Reveal>
        <AnimatedLines
          as="h2"
          className="section-header__title"
          lines={HEADER_LINES}
          maskClassName="section-header__title-mask"
          lineClassName="section-header__title-line"
        />
        <Reveal as="p" className="when-talk-scenarios__lede" delay={0.2} y={12}>
          Five situations founders recognise — often before they can name what&apos;s wrong.
        </Reveal>
      </header>
      <nav className="when-talk-nav" aria-label="Jump to scenario" data-when-talk-nav>
        {WHEN_SCENARIOS.map((scenario) => (
          <a
            key={scenario.id}
            href={`#scenario-${scenario.id}`}
            className="when-talk-nav__chip"
            data-scenario-nav={scenario.id}
          >
            <span className="when-talk-nav__chip-num">{scenario.number}</span>
            {scenario.navLabel}
          </a>
        ))}
      </nav>
      <StaggerGroup className="when-talk-scenarios__list">
        {WHEN_SCENARIOS.map((scenario, index) => (
          <ScenarioBlock key={scenario.id} scenario={scenario} index={index} />
        ))}
      </StaggerGroup>
    </>
  );
}
