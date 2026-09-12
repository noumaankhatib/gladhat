import type { CSSProperties } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { ease, revealViewport } from '../../lib/motion';

export type AnimatedLine = {
  text: string;
  className?: string;
};

export type AnimatedLinesProps = {
  lines: AnimatedLine[];
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote';
  className?: string;
  maskClassName?: string;
  lineClassName?: string;
  id?: string;
};

export function AnimatedLines({
  lines,
  as: Tag = 'h2',
  className,
  maskClassName = 'title-line-mask',
  lineClassName = 'title-line',
  id,
}: AnimatedLinesProps) {
  const reduced = useReducedMotion();
  const label = lines.map((line) => line.text).join(' ');

  if (reduced) {
    return (
      <Tag className={className} aria-label={label} id={id}>
        {lines.map((line) => (
          <span
            key={line.text}
            className={line.className ?? lineClassName}
          >
            {line.text}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className} aria-label={label} id={id}>
      {lines.map((line, index) => (
        <span
          key={line.text}
          className={maskClassName}
          style={{ '--line-index': index } as CSSProperties}
        >
          <m.span
            className={line.className ?? lineClassName}
            initial={{ y: '115%' }}
            whileInView={{ y: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.8, ease, delay: index * 0.14 }}
          >
            {line.text}
          </m.span>
        </span>
      ))}
    </Tag>
  );
}
