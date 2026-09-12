import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Enter } from '../../components/motion/Enter';
import {
  TRUE_STORIES_AFTER,
  TRUE_STORIES_BEFORE,
  TRUE_STORIES_CTA,
  TRUE_STORIES_INTRO,
  TRUE_STORIES_JOURNEY,
  TRUE_STORIES_STATS,
  TRUE_STORIES_VIDEO,
  TRUE_STORIES_VIDEO_ALT,
} from '../../utils/true-stories-content.js';
import type { IslandProps } from '../types';

const FINAL_FRAME_RATIO = 0.92;

function useTrueStoriesVideoPlayback(
  containerRef: RefObject<HTMLDivElement | null>,
  videoRef: RefObject<HTMLVideoElement | null>,
  reduced: boolean | null,
) {
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    video.muted = true;
    video.playsInline = true;
    video.loop = !reduced;
    video.preload = 'metadata';

    const showFinalFrame = () => {
      if (video.duration && Number.isFinite(video.duration)) {
        video.currentTime = video.duration * FINAL_FRAME_RATIO;
      }
      video.pause();
    };

    if (reduced) {
      if (video.readyState >= 1) {
        showFinalFrame();
      } else {
        video.addEventListener('loadedmetadata', showFinalFrame, { once: true });
      }
      return () => video.removeEventListener('loadedmetadata', showFinalFrame);
    }

    video.loop = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.15, rootMargin: '8% 0px' },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [containerRef, reduced, videoRef]);
}

function StoryVisual({
  reduced,
  visualRef,
  videoRef,
}: {
  reduced: boolean | null;
  visualRef: RefObject<HTMLDivElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
}) {
  useTrueStoriesVideoPlayback(visualRef, videoRef, reduced);

  return (
    <div className="true-stories-visual" ref={visualRef}>
      <video
        ref={videoRef}
        className="true-stories-video"
        src={TRUE_STORIES_VIDEO}
        muted
        playsInline
        loop={!reduced}
        autoPlay={!reduced}
        preload="metadata"
        aria-hidden="true"
      />
    </div>
  );
}

export function TrueStoriesMotion(_props: IslandProps) {
  const reduced = useReducedMotion();
  const visualRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="true-stories-band__shell">
      <div className="true-stories-band__grid">
        <header className="true-stories-band__copy">
          <Enter as="p" className="true-stories-band__label" delay={0.05}>
            <span className="true-stories-band__label-num" aria-hidden="true">
              08
            </span>
            <span className="true-stories-band__label-text">True Stories</span>
          </Enter>
          <Enter as="h2" className="true-stories-band__title" delay={0.12}>
            Seeing through the <span className="accent">buyer&apos;s eyes</span>
          </Enter>
          <Enter as="p" className="true-stories-band__intro" delay={0.2}>
            {TRUE_STORIES_INTRO}
          </Enter>

          <Enter as="div" className="true-stories-band__shift" delay={0.28}>
            <div className="true-stories-band__shift-item">
              <span className="true-stories-band__shift-tag">Before</span>
              <p className="true-stories-band__shift-text">{TRUE_STORIES_BEFORE}</p>
            </div>
            <div className="true-stories-band__shift-item true-stories-band__shift-item--after">
              <span className="true-stories-band__shift-tag">After</span>
              <p className="true-stories-band__shift-text">{TRUE_STORIES_AFTER}</p>
            </div>
          </Enter>

          <Enter as="div" className="true-stories-band__journey" delay={0.34}>
            <p className="true-stories-band__journey-label">The buyer&apos;s journey</p>
            <ol className="true-stories-band__journey-steps">
              {TRUE_STORIES_JOURNEY.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </Enter>

          <Enter as="div" className="true-stories-band__stats" delay={0.4}>
            {TRUE_STORIES_STATS.map((stat) => (
              <div key={stat.id} className="true-stories-band__stat">
                <span className="true-stories-band__stat-value">{stat.value}</span>
                <span className="true-stories-band__stat-label">{stat.label}</span>
                <span className="true-stories-band__stat-detail">{stat.detail}</span>
              </div>
            ))}
          </Enter>

          <Enter as="div" className="true-stories-band__actions" delay={0.48}>
            <a href={TRUE_STORIES_CTA.href} className="text-link true-stories-band__link">
              {TRUE_STORIES_CTA.label} <span aria-hidden="true">→</span>
            </a>
          </Enter>
        </header>

        <div className="true-stories-band__visual-col">
          <Enter as="div" delay={0.18}>
            <StoryVisual reduced={reduced} visualRef={visualRef} videoRef={videoRef} />
          </Enter>
          <p className="sr-only">{TRUE_STORIES_VIDEO_ALT}</p>
        </div>
      </div>
    </div>
  );
}
