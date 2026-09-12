import { useEffect, useRef, useState } from 'react';
import { m, useInView, useReducedMotion } from 'framer-motion';
import { Enter } from '../../components/motion/Enter';
import {
  CREATING_CLOSING,
  CREATING_DELIVERABLES,
  CREATING_INSTALLATION_ALT,
  CREATING_INSTALLATION_IMAGE,
  CREATING_INTRO,
  CREATING_OUTPUTS,
  CREATING_PHILOSOPHY_EMPHASIS,
  CREATING_PHILOSOPHY_LEAD,
} from '../../utils/creating-matters-content.js';
import type { IslandProps } from '../types';

const OUTPUT_AUTO_MS = 4500;

function InstallationVisual({ reduced }: { reduced: boolean | null }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(frameRef, { once: true, amount: 0.2 });
  const staticVisual = reduced === true;

  return (
    <div className="creating-matters-band__visual-frame" ref={frameRef}>
      <m.figure
        className="creating-matters-band__installation-wrap"
        initial={staticVisual ? false : { opacity: 0.5, y: 18, scale: 0.97 }}
        animate={
          isInView || staticVisual
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0.5, y: 18, scale: 0.97 }
        }
        transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          className="creating-matters-band__installation-image"
          src={CREATING_INSTALLATION_IMAGE}
          alt={CREATING_INSTALLATION_ALT}
          loading="lazy"
          decoding="async"
          width={1024}
          height={682}
        />
      </m.figure>
    </div>
  );
}

function OutputItem({
  item,
  active,
  onSelect,
}: {
  item: (typeof CREATING_OUTPUTS)[number];
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <li
      className={`creating-matters-band__output-item${active ? ' creating-matters-band__output-item--active' : ''}`}
    >
      <button
        type="button"
        className="creating-matters-band__output-btn"
        onClick={onSelect}
        onFocus={onSelect}
        aria-current={active ? 'true' : undefined}
      >
        <span className="creating-matters-band__output-num" aria-hidden="true">
          {item.num}
        </span>
        <span className="creating-matters-band__output-label">{item.label}</span>
      </button>
    </li>
  );
}

function OutputRow({ reduced }: { reduced: boolean | null }) {
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
            setActiveIndex((prev) => (prev + 1) % CREATING_OUTPUTS.length);
          }, OUTPUT_AUTO_MS);
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
    <div className="creating-matters-band__outputs-panel">
      <ol
        className={`creating-matters-band__outputs${reduced ? ' creating-matters-band__outputs--static' : ''}`}
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
        {CREATING_OUTPUTS.map((item, index) => (
          <OutputItem
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

export function CreatingMattersMotion(_props: IslandProps) {
  const reduced = useReducedMotion();

  return (
    <div className="creating-matters-band__shell">
      <div className="creating-matters-band__grid">
        <header className="creating-matters-band__copy">
          <Enter as="p" className="creating-matters-band__label" delay={0.05}>
            <span className="creating-matters-band__label-num" aria-hidden="true">
              07
            </span>
            <span className="creating-matters-band__label-text">Creating what matters</span>
          </Enter>
          <Enter as="h2" className="creating-matters-band__title" delay={0.12}>
            Creating what <span className="accent">matters</span>
          </Enter>
          <Enter as="div" className="creating-matters-band__body" delay={0.2}>
            <p>{CREATING_INTRO}</p>
            <ul className="creating-matters-band__deliverables">
              {CREATING_DELIVERABLES.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p>{CREATING_CLOSING}</p>
          </Enter>
          <Enter as="p" className="creating-matters-band__philosophy" delay={0.3}>
            {CREATING_PHILOSOPHY_LEAD}{' '}
            <em className="creating-matters-band__philosophy-line">
              {CREATING_PHILOSOPHY_EMPHASIS}
            </em>
          </Enter>
        </header>

        <div className="creating-matters-band__visual-col">
          <Enter as="div" delay={0.18}>
            <InstallationVisual reduced={reduced} />
          </Enter>
        </div>
      </div>

      <OutputRow reduced={reduced} />
    </div>
  );
}
