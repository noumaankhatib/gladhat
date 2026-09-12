import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Enter } from '../../components/motion/Enter';
import {
  CONNECTING_CTA,
  CONNECTING_FALLBACK_ALT,
  CONNECTING_INTRO,
  CONNECTING_OBJECTS,
  CONNECTING_OUTCOMES,
  CONNECTING_PHILOSOPHY,
  CONNECTING_VISUAL_IMAGE,
} from '../../utils/connecting-content.js';
import type { IslandProps } from '../types';

const OUTCOME_AUTO_MS = 4500;

function OutcomeItem({
  item,
  active,
  onSelect,
}: {
  item: (typeof CONNECTING_OUTCOMES)[number];
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <li
      className={`connecting-band__outcome-item${active ? ' connecting-band__outcome-item--active' : ''}`}
    >
      <button
        type="button"
        className="connecting-band__outcome-btn"
        onClick={onSelect}
        onFocus={onSelect}
        aria-current={active ? 'true' : undefined}
      >
        <span className="connecting-band__outcome-num" aria-hidden="true">
          {item.num}
        </span>
        <span className="connecting-band__outcome-copy">
          <span className="connecting-band__outcome-title">{item.title}</span>
          <span className="connecting-band__outcome-detail">{item.detail}</span>
        </span>
      </button>
    </li>
  );
}

function OutcomeRow({ reduced }: { reduced: boolean | null }) {
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
            setActiveIndex((prev) => (prev + 1) % CONNECTING_OUTCOMES.length);
          }, OUTCOME_AUTO_MS);
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
    <div className="connecting-band__outcomes-panel">
      <ol
        className={`connecting-band__outcomes${reduced ? ' connecting-band__outcomes--static' : ''}`}
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
        {CONNECTING_OUTCOMES.map((item, index) => (
          <OutcomeItem
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

export function ConnectingDotsMotion(_props: IslandProps) {
  const reduced = useReducedMotion();

  return (
    <div className="connecting-band__shell">
      <div className="connecting-band__content">
        <div className="connecting-band__hero-grid">
          <header className="connecting-band__copy">
            <Enter as="p" className="connecting-band__label" delay={0.05}>
              <span className="connecting-band__label-num" aria-hidden="true">
                05
              </span>
              <span className="connecting-band__label-text">Connecting the dots</span>
            </Enter>
            <Enter as="h2" className="connecting-band__title" delay={0.12}>
              A more
              <br />
              connected
              <br />
              way of <span className="accent">thinking.</span>
            </Enter>
            <Enter as="p" className="connecting-band__intro" delay={0.22}>
              {CONNECTING_INTRO}
            </Enter>
            <Enter as="p" className="connecting-band__philosophy" delay={0.28}>
              {CONNECTING_PHILOSOPHY}
            </Enter>
            <Enter as="div" className="connecting-band__actions" delay={0.32}>
              <a href="/working-together" className="text-link connecting-band__link">
                {CONNECTING_CTA} <span aria-hidden="true">→</span>
              </a>
            </Enter>
          </header>
          <Enter as="figure" className="connecting-band__visual-wrap" delay={0.18}>
            <img
              className="connecting-band__visual-image"
              src={CONNECTING_VISUAL_IMAGE}
              alt={CONNECTING_FALLBACK_ALT}
              loading="lazy"
              decoding="async"
              width={1200}
              height={900}
            />
          </Enter>
        </div>

        <OutcomeRow reduced={reduced} />

        <ul className="sr-only" aria-label="Connected concepts">
          {CONNECTING_OBJECTS.map((object) => (
            <li key={object.id}>{object.label}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
