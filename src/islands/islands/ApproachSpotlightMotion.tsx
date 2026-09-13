import { useEffect, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { Reveal } from '../../components/motion/Reveal';
import { APPROACH_INTRO, APPROACH_STEPS } from '../../utils/approach-steps.js';
import { ease } from '../../lib/motion';
import type { IslandProps } from '../types';
import { assetUrl } from '../../config/env.js';

function Beat({
  step,
  index,
  active,
  reduced,
  onToggle,
}: {
  step: (typeof APPROACH_STEPS)[number];
  index: number;
  active: boolean;
  reduced: boolean | null;
  onToggle: (index: number) => void;
}) {
  return (
    <li className={`approach-spotlight__beat${active ? ' approach-spotlight__beat--active' : ''}`}>
      <button
        type="button"
        className="approach-spotlight__beat-trigger"
        aria-expanded={active}
        onClick={() => onToggle(index)}
      >
        <span className="approach-spotlight__beat-num">{step.num}</span>
        <span className="approach-spotlight__beat-label">{step.title}</span>
        <span className="approach-spotlight__beat-chevron" aria-hidden="true" />
      </button>
      <AnimatePresence initial={false}>
        {active && (
          <m.div
            className="approach-spotlight__beat-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.4, ease }}
          >
            <div className="approach-spotlight__beat-copy">
              <p className="approach-spotlight__beat-quote">{step.quote}</p>
              <div
                className="approach-spotlight__beat-detail"
                dangerouslySetInnerHTML={{ __html: step.details }}
              />
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function ApproachSpotlightMotion(_props: IslandProps) {
  const reduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleBeat = (index: number) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  useEffect(() => {
    const section = document.getElementById('section-approach-spotlight');
    section?.classList.add('approach-spotlight--in-view', 'approach-spotlight--motion');
  }, []);

  return (
    <>
      <header className="approach-spotlight__header">
        <div className="approach-spotlight__intro">
          <Reveal as="p" className="approach-spotlight__label" delay={0} y={12}>
            <span className="approach-spotlight__label-num" aria-hidden="true">10</span>
            <span className="approach-spotlight__label-text">Our approach</span>
          </Reveal>
          <Reveal as="h2" className="approach-spotlight__title" delay={0.1} y={16}>
            The more I understand your business, the more{' '}
            <span className="accent">we discover together</span>.
          </Reveal>
          <Reveal as="p" className="approach-spotlight__lead" delay={0.28} y={14}>
            {APPROACH_INTRO}
          </Reveal>
        </div>
        <Reveal className="approach-spotlight__cta-wrap" delay={0.38} y={16}>
          <a href="/working-together" className="btn btn--primary btn--pill approach-spotlight__cta">
            See how we work together <span className="btn-arrow">→</span>
          </a>
        </Reveal>
      </header>

      <div className="approach-spotlight__visual">
        <figure className="approach-spotlight__visual-frame">
          <img
            className="approach-spotlight__visual-image"
            src={assetUrl('/images/10_section.png')}
            alt="Five sculptural objects on a stone shelf, each representing a stage of the approach: listening, looking, challenging, connecting and creating."
            loading="lazy"
            width={1680}
            height={940}
          />
        </figure>
      </div>

      <div className="approach-spotlight__body">
        <ol className="approach-spotlight__transcript" aria-label="How we work together, step by step">
          {APPROACH_STEPS.map((step, index) => (
            <Beat
              key={step.id}
              step={step}
              index={index}
              active={index === activeIndex}
              reduced={reduced}
              onToggle={toggleBeat}
            />
          ))}
        </ol>
      </div>
    </>
  );
}
