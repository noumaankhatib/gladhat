import type { ReactNode, MouseEvent } from 'react';
import { useCallback, useRef } from 'react';
import { m, useReducedMotion, useSpring, useMotionValue } from 'framer-motion';
import { springSnappy } from '../../lib/motion';

export type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
};

const MAGNET_RANGE = 6;

export function MagneticButton({
  children,
  className,
  href,
  onClick,
}: MagneticButtonProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springSnappy);
  const springY = useSpring(y, springSnappy);

  const canMagnetize =
    !reduced &&
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine)').matches;

  const handleMove = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (!canMagnetize || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const offsetX = event.clientX - (rect.left + rect.width / 2);
      const offsetY = event.clientY - (rect.top + rect.height / 2);
      const clamp = (value: number) =>
        Math.max(-MAGNET_RANGE, Math.min(MAGNET_RANGE, value * 0.35));
      x.set(clamp(offsetX));
      y.set(clamp(offsetY));
    },
    [canMagnetize, x, y],
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <m.a
      ref={ref}
      href={href}
      className={className}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={canMagnetize ? { x: springX, y: springY } : undefined}
    >
      {children}
    </m.a>
  );
}
