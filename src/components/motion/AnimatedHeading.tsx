import { m, useReducedMotion } from 'framer-motion';
import { ease, revealViewport, wordReveal } from '../../lib/motion';

export type AnimatedHeadingProps = {
  /** Full heading text for aria-label and SEO */
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
  /** Optional map of word index → className (e.g. accent spans) */
  accentWords?: Record<number, string>;
};

const WORD_STAGGER = 0.06;

export function AnimatedHeading({
  text,
  as: Tag = 'h2',
  className,
  accentWords = {},
}: AnimatedHeadingProps) {
  const reduced = useReducedMotion();
  const words = text.split(/\s+/).filter(Boolean);
  const MotionTag = m[Tag];

  if (reduced) {
    return (
      <Tag className={className} aria-label={text}>
        {words.map((word, index) => {
          const accentClass = accentWords[index];
          return accentClass ? (
            <span key={`${word}-${index}`} className={accentClass}>
              {word}{' '}
            </span>
          ) : (
            <span key={`${word}-${index}`}>{word} </span>
          );
        })}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      transition={{ staggerChildren: WORD_STAGGER, delayChildren: 0.05 }}
    >
      {words.map((word, index) => {
        const accentClass = accentWords[index];
        return (
          <span
            key={`${word}-${index}`}
            style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}
          >
            <m.span
              style={{ display: 'inline-block' }}
              variants={wordReveal}
              transition={{ duration: 0.7, ease }}
            >
              {accentClass ? (
                <span className={accentClass}>{word}</span>
              ) : (
                word
              )}
              {index < words.length - 1 ? '\u00A0' : ''}
            </m.span>
          </span>
        );
      })}
    </MotionTag>
  );
}
