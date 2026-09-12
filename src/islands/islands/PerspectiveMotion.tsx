import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Enter } from '../../components/motion/Enter';
import {
  PERSPECTIVE_HERO_ALT,
  PERSPECTIVE_HERO_POSTER,
  PERSPECTIVE_HERO_VIDEO,
  PERSPECTIVE_OBSERVATIONS,
} from '../../utils/perspective-blindspots.js';
import type { IslandProps } from '../types';

const OBSERVATION_AUTO_MS = 4500;
const OBSERVATION_NUMS = ['01', '02', '03', '04'];

function PerspectiveVisual() {
  return (
    <figure className="perspective-band__visual-wrap">
      <video
        className="perspective-band__hero-video"
        src={PERSPECTIVE_HERO_VIDEO}
        poster={PERSPECTIVE_HERO_POSTER}
        aria-label={PERSPECTIVE_HERO_ALT}
        muted
        playsInline
        loop
        autoPlay
        preload="auto"
      />
    </figure>
  );
}

function ObservationItem({
  item,
  num,
  active,
  onSelect,
}: {
  item: (typeof PERSPECTIVE_OBSERVATIONS)[number];
  num: string;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <li className={`perspective-band__observation-item${active ? ' perspective-band__observation-item--active' : ''}`}>
      <button
        type="button"
        className="perspective-band__observation-btn"
        onClick={onSelect}
        onFocus={onSelect}
        aria-current={active ? 'true' : undefined}
      >
        <span className="perspective-band__observation-body">
          <span className="perspective-band__observation-num" aria-hidden="true">
            {num}
          </span>
          <span className="perspective-band__observation-text">{item.text}</span>
        </span>
        <span className="perspective-band__observation-icon-wrap">
          <img
            className="perspective-band__observation-icon"
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

function ObservationRow({ reduced }: { reduced: boolean | null }) {
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
            setActiveIndex((prev) => (prev + 1) % PERSPECTIVE_OBSERVATIONS.length);
          }, OBSERVATION_AUTO_MS);
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
    <div className="perspective-band__observations-panel">
      <ol
        className={`perspective-band__observations${reduced ? ' perspective-band__observations--static' : ''}`}
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
        {PERSPECTIVE_OBSERVATIONS.map((item, index) => (
          <ObservationItem
            key={item.id}
            item={item}
            num={OBSERVATION_NUMS[index]}
            active={!reduced && index === activeIndex}
            onSelect={() => setActiveIndex(index)}
          />
        ))}
      </ol>
    </div>
  );
}

export function PerspectiveMotion(_props: IslandProps) {
  const reduced = useReducedMotion();

  return (
    <div className="perspective-band__shell">
      <div className="perspective-band__top">
        <header className="perspective-band__copy">
          <Enter as="p" className="perspective-band__label" delay={0.05}>
            <span className="perspective-band__label-num" aria-hidden="true">
              02
            </span>
            <span className="perspective-band__label-text">Too close to see it clearly?</span>
          </Enter>
          <Enter as="h2" className="perspective-band__title" delay={0.12}>
            Too close to<br />see it <span className="accent">clearly?</span>
          </Enter>
          <Enter as="div" className="perspective-band__intro" delay={0.22}>
            <p>When you live with your business, you tend to stop noticing what confuses potential customers.</p>
            <p>That's normal. It's what happens when you're too close.</p>
          </Enter>
          <Enter as="div" className="perspective-band__actions" delay={0.32}>
            <a href="/working-together" className="text-link perspective-band__link">
              Step back <span aria-hidden="true">→</span>
            </a>
          </Enter>
        </header>

        <div className="perspective-band__visual-col">
          <Enter as="div" delay={0.18}>
            <PerspectiveVisual />
          </Enter>
        </div>
      </div>

      <ObservationRow reduced={reduced} />
    </div>
  );
}
