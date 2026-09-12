import type { Transition, Variants } from 'framer-motion';

/** Shared easing — matches CSS --ease-out */
export const ease = [0.22, 1, 0.36, 1] as const;

export const springSoft = {
  type: 'spring',
  stiffness: 120,
  damping: 20,
  mass: 0.6,
} as const satisfies Transition;

export const springSnappy = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
} as const satisfies Transition;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease },
  },
};

export const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.08,
    },
  },
};

export const wordReveal: Variants = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

/** Scroll-trigger viewport shared by reveal primitives */
export const revealViewport = {
  once: true,
  margin: '-15% 0px',
} as const;
