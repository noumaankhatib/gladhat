import { m, useReducedMotion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4,
  });

  if (reduced) {
    return null;
  }

  return (
    <m.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        transformOrigin: '0% 50%',
        scaleX,
        background: 'var(--accent)',
        zIndex: 'var(--z-overlay)',
        pointerEvents: 'none',
      }}
    />
  );
}
