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

  // The trigger lives on the heading, not on each line: a line starts
  // translated below its overflow-hidden mask, so it is clipped out of
  // view and a per-line whileInView would never fire.
  const MotionTag = m[Tag];

  return (
    <MotionTag
      className={className}
      aria-label={label}
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      {lines.map((line, index) => (
        <span
          key={line.text}
          className={maskClassName}
          style={{ '--line-index': index } as CSSProperties}
        >
          <m.span
            className={line.className ?? lineClassName}
            variants={{ hidden: { y: '115%' }, visible: { y: 0 } }}
            transition={{ duration: 0.8, ease, delay: index * 0.14 }}
          >
            {line.text}
          </m.span>
        </span>
      ))}
    </MotionTag>
  );
}
