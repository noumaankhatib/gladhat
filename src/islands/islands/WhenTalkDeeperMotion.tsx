import { useRef } from 'react';
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Reveal } from '../../components/motion/Reveal';
import { DEEPER_LABEL, DEEPER_TITLE, DEEPER_LEDE, DEEPER_FRONT_LAYERS, DEEPER_BACK_LAYERS } from '../../utils/when-scenarios.js';
import type { IslandProps } from '../types';

export function WhenTalkDeeperMotion(_props: IslandProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.3'],
  });
  const backOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const backY = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const frontShift = useTransform(scrollYProgress, [0, 1], [0, -16]);

  return (
    <div className="container when-talk-deeper__inner">
      <header className="section-header when-talk-deeper__header">
        <Reveal as="span" className="section-header__label" delay={0} y={12}>
          {DEEPER_LABEL}
        </Reveal>
        <h2 className="section-header__title">
          {DEEPER_TITLE.split('\n').map((line, i) => (
            <Reveal as="span" key={line} className="section-header__title-line" delay={0.05 + i * 0.06} y={16}>
              {line}
            </Reveal>
          ))}
        </h2>
        <Reveal as="p" className="when-talk-deeper__lede" delay={0.2} y={12}>
          {DEEPER_LEDE}
        </Reveal>
      </header>

      <div className="when-talk-layers" ref={ref}>
        <div className="when-talk-layers__back" aria-hidden={false}>
          {DEEPER_BACK_LAYERS.map((label, index) => (
            <m.div
              key={label}
              className="when-talk-layers__row when-talk-layers__row--back"
              style={
                reduced
                  ? undefined
                  : { opacity: backOpacity, y: backY, transitionDelay: `${index * 0.05}s` }
              }
            >
              {label}
            </m.div>
          ))}
        </div>
        <m.div
          className="when-talk-layers__front"
          style={reduced ? undefined : { y: frontShift }}
        >
          {DEEPER_FRONT_LAYERS.map((label) => (
            <div key={label} className="when-talk-layers__row when-talk-layers__row--front">
              {label}
            </div>
          ))}
        </m.div>
      </div>
    </div>
  );
}
