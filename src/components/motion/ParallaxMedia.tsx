import type { ReactNode } from 'react';
import { m, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

export type ParallaxMediaProps = {
  children: ReactNode;
  className?: string;
  /** Parallax intensity 0–1 (default 0.08 = image moves ~8% slower) */
  speed?: number;
};

export function ParallaxMedia({
  children,
  className,
  speed = 0.08,
}: ParallaxMediaProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [`${speed * -100}%`, `${speed * 100}%`]);
  const y = useSpring(rawY, { stiffness: 120, damping: 24, mass: 0.6 });

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <m.div style={{ y, willChange: 'transform' }}>{children}</m.div>
    </div>
  );
}
