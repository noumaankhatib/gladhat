import type { ReactNode } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { fadeUp } from '../../lib/motion';

export type StaggerItemProps = {
  children: ReactNode;
  className?: string;
};

export function StaggerItem({ children, className }: StaggerItemProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={className} style={{ display: 'contents' }}>
        {children}
      </div>
    );
  }

  return (
    <m.div className={className} style={{ display: 'contents' }} variants={fadeUp}>
      {children}
    </m.div>
  );
}
