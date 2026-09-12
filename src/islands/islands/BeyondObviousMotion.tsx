import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Enter } from '../../components/motion/Enter';
import {
  BEYOND_HERO_ALT,
  BEYOND_HERO_IMAGE,
  BEYOND_QUESTIONS,
} from '../../utils/beyond-questions.js';
import type { IslandProps } from '../types';

const QUESTION_AUTO_MS = 4500;

function BeyondVisual() {
  return (
    <figure className="beyond-band__visual-wrap">
      <img
        className="beyond-band__hero-image"
        src={BEYOND_HERO_IMAGE}
        alt={BEYOND_HERO_ALT}
        loading="lazy"
        width={1024}
        height={682}
      />
    </figure>
  );
}

function QuestionItem({
  item,
  active,
  onSelect,
}: {
  item: (typeof BEYOND_QUESTIONS)[number];
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <li className={`beyond-band__question-item${active ? ' beyond-band__question-item--active' : ''}`}>
      <button
        type="button"
        className="beyond-band__question-btn"
        onClick={onSelect}
        onFocus={onSelect}
        aria-current={active ? 'true' : undefined}
      >
        <span className="beyond-band__question-body">
          <span className="beyond-band__question-num" aria-hidden="true">
            {item.num}
          </span>
          <span className="beyond-band__question-text">{item.text}</span>
        </span>
        <span className="beyond-band__question-icon-wrap">
          <img
            className="beyond-band__question-icon"
            src={item.icon}
            alt={item.iconAlt}
            loading="lazy"
            width={64}
            height={64}
          />
        </span>
      </button>
    </li>
  );
}

function QuestionRow({ reduced }: { reduced: boolean | null }) {
  const rowRef = useRef<HTMLOListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused) return;

    const row = rowRef.current;
    if (!row) return;

    let intervalId: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          intervalId = window.setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % BEYOND_QUESTIONS.length);
          }, QUESTION_AUTO_MS);
        } else if (intervalId !== undefined) {
          window.clearInterval(intervalId);
          intervalId = undefined;
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(row);
    return () => {
      observer.disconnect();
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, [reduced, paused]);

  return (
    <div className="beyond-band__questions-panel">
      <ol
        className={`beyond-band__questions${reduced ? ' beyond-band__questions--static' : ''}`}
        ref={rowRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setPaused(false);
          }
        }}
      >
        {BEYOND_QUESTIONS.map((item, index) => (
          <QuestionItem
            key={item.id}
            item={item}
            active={!reduced && index === activeIndex}
            onSelect={() => setActiveIndex(index)}
          />
        ))}
      </ol>
    </div>
  );
}

export function BeyondObviousMotion(_props: IslandProps) {
  const reduced = useReducedMotion();

  return (
    <div className="beyond-band__shell">
      <div className="beyond-band__top">
        <header className="beyond-band__copy">
          <Enter as="p" className="beyond-band__label" delay={0.05}>
            <span className="beyond-band__label-num" aria-hidden="true">
              03
            </span>
            <span className="beyond-band__label-text">Looking beyond the obvious</span>
          </Enter>
          <Enter as="h2" className="beyond-band__title" delay={0.12}>
            Better questions. Clearer <span className="accent">answers.</span>
          </Enter>
          <Enter as="p" className="beyond-band__intro" delay={0.22}>
            I help founders and leadership teams look beyond the obvious.
          </Enter>
          <Enter as="div" className="beyond-band__actions" delay={0.32}>
            <a href="/working-together" className="text-link beyond-band__link">
              Explore how <span aria-hidden="true">→</span>
            </a>
          </Enter>
        </header>

        <div className="beyond-band__visual-col">
          <Enter as="div" delay={0.18}>
            <BeyondVisual />
          </Enter>
        </div>
      </div>

      <QuestionRow reduced={reduced} />
    </div>
  );
}
