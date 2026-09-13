import { m, useReducedMotion } from 'framer-motion';
import { AnimatedLines } from '../../components/motion/AnimatedLines';
import { ParallaxMedia } from '../../components/motion/ParallaxMedia';
import { Reveal } from '../../components/motion/Reveal';
import { StaggerGroup } from '../../components/motion/StaggerGroup';
import { StaggerItem } from '../../components/motion/StaggerItem';
import { WHEN_NEXT_PARAGRAPHS } from '../../utils/when-scenarios.js';
import { ease, revealViewport } from '../../lib/motion';
import type { IslandProps } from '../types';
import { assetUrl } from '../../config/env.js';

const TITLE_LINES = [
  { text: 'What happens', className: 'when-talk-next__title-line' },
  {
    text: 'next?',
    className: 'when-talk-next__title-line when-talk-next__title-line--accent',
  },
];

export function WhenTalkNextMotion(_props: IslandProps) {
  const reduced = useReducedMotion();
  const steps = WHEN_NEXT_PARAGRAPHS.filter((p) => p.label && p.title);
  const detail = WHEN_NEXT_PARAGRAPHS.find((p) => p.role === 'outcomes-detail');
  const divider = WHEN_NEXT_PARAGRAPHS.find((p) => p.role === 'divider');
  const goal = WHEN_NEXT_PARAGRAPHS.filter((p) => p.role === 'goal' || p.role === 'goal-detail');

  return (
    <>
      <div className="split__text when-talk-next__copy">
        <AnimatedLines
          as="h2"
          className="when-talk-next__title"
          lines={TITLE_LINES}
          maskClassName="when-talk-next__title-mask"
          lineClassName="when-talk-next__title-line"
        />
        <ol className="when-talk-next-steps">
          <StaggerGroup contents>
            {steps.map((step) => (
              <StaggerItem key={step.label}>
                <m.li
                  className="when-talk-next-step"
                  variants={{
                    hidden: { opacity: 1, x: -14 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease } },
                  }}
                >
                  <span className="when-talk-next-step__num scrolly-number">{step.label}</span>
                  <div className="when-talk-next-step__copy">
                    <h3 className="when-talk-next-step__title">{step.title}</h3>
                    <p dangerouslySetInnerHTML={{ __html: step.html }} />
                  </div>
                </m.li>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </ol>
        {detail ? (
          <Reveal as="p" className="when-talk-next__detail" delay={0.12} y={12}>
            <span dangerouslySetInnerHTML={{ __html: detail.html }} />
          </Reveal>
        ) : null}
        {divider ? (
          <Reveal as="p" className="when-talk-next__divider" delay={0.18} y={10}>
            <span dangerouslySetInnerHTML={{ __html: divider.html }} />
          </Reveal>
        ) : null}
        <Reveal className="when-talk-next__goal-block" delay={0.24} y={12}>
          {goal.map((g) => (
            <p key={g.role} className="highlight-text" dangerouslySetInnerHTML={{ __html: g.html }} />
          ))}
        </Reveal>
      </div>
      <figure className="split__image when-talk-intro__media when-talk-next__media">
        <ParallaxMedia className="when-talk-next__frame" speed={0.08}>
          <m.img
            src={assetUrl('/images/research.png')}
            alt="Research as the starting point for every engagement"
            loading="lazy"
            decoding="async"
            width={800}
            height={800}
            initial={reduced ? false : { scale: 1.05 }}
            whileInView={{ scale: 1 }}
            viewport={revealViewport}
            transition={{ duration: 0.9, ease }}
          />
        </ParallaxMedia>
      </figure>
    </>
  );
}
