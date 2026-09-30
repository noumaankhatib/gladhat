import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Enter } from '../../components/motion/Enter';
import {
  ESSENCE_INTRO,
  ESSENCE_LAYERS,
  ESSENCE_VIDEO,
  ESSENCE_VIDEO_POSTER,
} from '../../utils/essence-content.js';
import type { IslandProps } from '../types';

function useEssenceVideoPlayback(
  containerRef: RefObject<HTMLDivElement | null>,
  videoRef: RefObject<HTMLVideoElement | null>,
  reduced: boolean | null,
) {
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container || reduced) return;

    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    const restartLoop = () => {
      video.currentTime = 0;
      void video.play().catch(() => undefined);
    };

    video.addEventListener('ended', restartLoop);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.12, rootMargin: '10% 0px' },
    );

    observer.observe(container);
    return () => {
      video.removeEventListener('ended', restartLoop);
      observer.disconnect();
    };
  }, [containerRef, reduced, videoRef]);
}

function HeroVisual({
  reduced,
  visualRef,
  videoRef,
}: {
  reduced: boolean | null;
  visualRef: RefObject<HTMLDivElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
}) {
  useEssenceVideoPlayback(visualRef, videoRef, reduced);

  return (
    <div className="essence-band__visual-col">
      <div className="essence-band__hero-viewport" ref={visualRef} aria-hidden="true">
        <video
          ref={videoRef}
          className="essence-band__hero-video"
          src={ESSENCE_VIDEO}
          poster={ESSENCE_VIDEO_POSTER}
          muted
          playsInline
          loop
          preload="metadata"
        />
      </div>
    </div>
  );
}

export function EssenceMotion(_props: IslandProps) {
  const reduced = useReducedMotion();
  const visualRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="essence-band__shell">
      <div className="essence-band__content">
        <div className="essence-band__hero-grid">
          <header className="essence-band__copy">
            <Enter as="p" className="essence-band__label" delay={0.05}>
              <span className="essence-band__label-num" aria-hidden="true">
                04
              </span>
              <span className="essence-band__label-text">Every business has an essence</span>
            </Enter>
            <Enter as="h2" className="essence-band__title" delay={0.12}>
              There&apos;s a clearer story in your <span className="accent">business.</span>
            </Enter>
            <Enter as="p" className="essence-band__intro" delay={0.22}>
              {ESSENCE_INTRO}
            </Enter>
            <Enter as="div" className="essence-band__actions" delay={0.32}>
              <a href="/working-together" className="text-link essence-band__link">
                How I uncover it <span aria-hidden="true">→</span>
              </a>
            </Enter>
            <Enter as="p" className="essence-band__aside" delay={0.36}>
              Same business. Less noise. A clearer story.
            </Enter>
          </header>
          <HeroVisual reduced={reduced} visualRef={visualRef} videoRef={videoRef} />
        </div>

        <ul className="sr-only" aria-label="Layers surrounding the essence">
          {ESSENCE_LAYERS.map((layer) => (
            <li key={layer.id}>
              {layer.label} — {layer.sublabel}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
