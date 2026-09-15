import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Enter } from '../../components/motion/Enter';
import {
  PERSPECTIVE_HERO_ALT,
  PERSPECTIVE_HERO_POSTER,
  PERSPECTIVE_HERO_VIDEO,
} from '../../utils/perspective-blindspots.js';
import type { IslandProps } from '../types';

/** Scroll-linked close → pull-back → wide → clarity reveal. */
function PerspectiveVisual() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rawScale = useTransform(scrollYProgress, [0, 0.55, 1], [1.34, 1.03, 1]);
  const scale = useSpring(rawScale, { stiffness: 90, damping: 26, mass: 0.7 });

  const rawClarity = useTransform(scrollYProgress, [0.15, 0.65], [0, 1]);
  const clarity = useSpring(rawClarity, { stiffness: 90, damping: 26, mass: 0.7 });

  if (reduced) {
    return (
      <figure className="perspective-band__visual-wrap">
        <video
          className="perspective-band__hero-video"
          src={PERSPECTIVE_HERO_VIDEO}
          poster={PERSPECTIVE_HERO_POSTER}
          aria-label={PERSPECTIVE_HERO_ALT}
          muted
          playsInline
          loop
          autoPlay
          preload="auto"
        />
      </figure>
    );
  }

  return (
    <figure className="perspective-band__visual-wrap" ref={ref}>
      <m.div className="perspective-band__visual-frame" style={{ scale }}>
        <video
          className="perspective-band__hero-video"
          src={PERSPECTIVE_HERO_VIDEO}
          poster={PERSPECTIVE_HERO_POSTER}
          aria-label={PERSPECTIVE_HERO_ALT}
          muted
          playsInline
          loop
          autoPlay
          preload="auto"
        />
      </m.div>
      <m.div className="perspective-band__visual-vignette" style={{ opacity: useTransform(clarity, (v) => 1 - v) }} aria-hidden="true" />
    </figure>
  );
}

export function PerspectiveMotion(_props: IslandProps) {
  return (
    <div className="perspective-band__shell">
      <header className="perspective-band__copy">
        <Enter as="p" className="perspective-band__label" delay={0.05}>
          <span className="perspective-band__label-num" aria-hidden="true">
            02
          </span>
          <span className="perspective-band__label-text">Too close to see it clearly?</span>
        </Enter>
        <Enter as="h2" className="perspective-band__title" delay={0.12}>
          Too close to<br />see it <span className="accent">clearly?</span>
        </Enter>
        <Enter as="div" className="perspective-band__intro" delay={0.22}>
          <p>When you live with your business, you stop seeing what's obvious to everyone else. The bigger picture is there — you're just standing too close to it.</p>
        </Enter>
      </header>

      <div className="perspective-band__visual-col">
        <PerspectiveVisual />
      </div>
    </div>
  );
}
