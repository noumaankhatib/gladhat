import type { ReactNode } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { staggerParent } from '../../lib/motion';

export type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  /** Use display:contents so children participate in parent grid/flex */
  contents?: boolean;
};

export function StaggerGroup({ children, className, contents = false }: StaggerGroupProps) {
  const reduced = useReducedMotion();

  return (
    <m.div
      className={className}
      style={contents ? { display: 'contents' } : undefined}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-15% 0px' }}
      variants={reduced ? undefined : staggerParent}
    >
      {children}
    </m.div>
  );
}
