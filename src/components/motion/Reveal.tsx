import type { ElementType, ReactNode } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { ease, revealViewport } from '../../lib/motion';

type MotionTag = keyof typeof m;

export type RevealProps<T extends ElementType = 'div'> = {
  as?: T;
  delay?: number;
  y?: number;
  children: ReactNode;
  className?: string;
  id?: string;
};

export function Reveal<T extends ElementType = 'div'>({
  as,
  delay = 0,
  y = 24,
  children,
  className,
  id,
}: RevealProps<T>) {
  const reduced = useReducedMotion();
  const tag = (as ?? 'div') as MotionTag;
  const MotionEl = m[tag] ?? m.div;

  return (
    <MotionEl
      id={id}
      className={className}
      initial={reduced ? false : { opacity: 1, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{
        duration: reduced ? 0.4 : 0.7,
        ease,
        delay,
      }}
    >
      {children}
    </MotionEl>
  );
}
