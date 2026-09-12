import type { ElementType, ReactNode } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { ease } from '../../lib/motion';

type MotionTag = keyof typeof m;

export type EnterProps<T extends ElementType = 'div'> = {
  as?: T;
  delay?: number;
  y?: number;
  children: ReactNode;
  className?: string;
};

/** Mount-time entrance — opacity stays 1 so content is never hidden behind JS */
export function Enter<T extends ElementType = 'div'>({
  as,
  delay = 0,
  y = 16,
  children,
  className,
}: EnterProps<T>) {
  const reduced = useReducedMotion();
  const tag = (as ?? 'div') as MotionTag;
  const MotionEl = m[tag] ?? m.div;

  if (reduced) {
    const Tag = (as ?? 'div') as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionEl
      className={className}
      initial={{ opacity: 1, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </MotionEl>
  );
}
