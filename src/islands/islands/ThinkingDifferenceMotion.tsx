import { useEffect } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { Reveal } from '../../components/motion/Reveal';
import { THINKING_DIFFERENCE_LEAD, THINKING_DIFFERENCE_CLOSE } from '../../utils/thinking-difference-content.js';
import { ease, revealViewport } from '../../lib/motion';
import type { IslandProps } from '../types';

function Installation({ reduced }: { reduced: boolean | null }) {
  return (
    <div className="thinking-difference__installation">
      <m.img
        className="thinking-difference__scene"
        src="/images/09_section.png"
        alt="An architectural installation of glass and stone frames converging toward a single clear opening onto a sunlit landscape, labelled What you notice, What you question, What you prioritise, What you decide, What you create — representing the journey from noticing to creating."
        loading="lazy"
        width={1680}
        height={940}
        initial={reduced ? false : { opacity: 0, scale: 1.08 }}
        whileInView={
          reduced
            ? { opacity: 1, scale: 1 }
            : { opacity: 1, scale: [1.08, 1.14, 1.08] }
        }
        viewport={revealViewport}
        transition={
          reduced
            ? { duration: 0.4 }
            : {
                opacity: { duration: 1.4, ease },
                scale: { duration: 16, ease: 'easeInOut', repeat: Infinity },
              }
        }
      />
    </div>
  );
}

export function ThinkingDifferenceMotion(_props: IslandProps) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const section = document.getElementById('section-thinking-difference');
    section?.classList.add('thinking-difference--in-view', 'thinking-difference--motion');
  }, []);

  return (
    <div className="thinking-difference__grid">
      <div className="thinking-difference__copy">
        <Reveal as="p" className="thinking-difference__label" delay={0} y={10}>
          <span className="thinking-difference__label-num" aria-hidden="true">09</span>
          <span className="thinking-difference__label-text">Thinking that makes a difference</span>
        </Reveal>
        <Reveal as="h2" className="thinking-difference__title" delay={0.1} y={16}>
          Thinking that makes <span className="accent">a difference</span>.
        </Reveal>
        <Reveal as="p" className="thinking-difference__lead" delay={0.3} y={14}>
          {THINKING_DIFFERENCE_LEAD}
        </Reveal>
        <Reveal as="p" className="thinking-difference__close" delay={0.38} y={14}>
          {THINKING_DIFFERENCE_CLOSE}
        </Reveal>
        <Reveal className="thinking-difference__cta-wrap" delay={0.46} y={16}>
          <a href="/working-together" className="btn btn--primary btn--pill thinking-difference__cta">
            See how I think <span className="btn-arrow">→</span>
          </a>
        </Reveal>
      </div>

      <Installation reduced={reduced} />
    </div>
  );
}
