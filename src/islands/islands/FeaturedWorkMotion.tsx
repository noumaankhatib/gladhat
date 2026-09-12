import type { CSSProperties } from 'react';
import { useEffect, useMemo, useRef } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { AnimatedLines } from '../../components/motion/AnimatedLines';
import { Reveal } from '../../components/motion/Reveal';
import { StaggerGroup } from '../../components/motion/StaggerGroup';
import { ease, revealViewport, scaleIn, springSoft } from '../../lib/motion';
import { parseIslandProps, type IslandProps } from '../types';

type WorkStory = {
  client: string;
  title: string;
  link: string;
  img: string;
  imgAlt: string;
};

type FeaturedWorkProps = {
  stories?: WorkStory[];
};

const TITLE_LINES = [
  { text: 'True stories.', className: 'featured-work__title-line' },
  { text: 'Real businesses.', className: 'featured-work__title-line' },
  {
    text: 'Meaningful change.',
    className: 'featured-work__title-line featured-work__title-line--accent',
  },
];

function storiesFromFallback(html: string): WorkStory[] {
  const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
  return [...doc.querySelectorAll<HTMLAnchorElement>('.work-card')].map((card) => ({
    client: card.querySelector('.work-card__client')?.textContent?.trim() ?? '',
    title:
      card
        .querySelector('.work-card__link')
        ?.textContent?.replace('→', '')
        .trim() ?? '',
    link: card.getAttribute('href') ?? '#',
    img: card.querySelector('img')?.getAttribute('src') ?? '',
    imgAlt: card.querySelector('img')?.getAttribute('alt') ?? '',
  }));
}

function WorkCard({ story, index }: { story: WorkStory; index: number }) {
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (reduced) return;
    const card = cardRef.current;
    const media = card?.querySelector<HTMLImageElement>('.work-card__media img');
    if (!card || !media) return;

    const onMove = (event: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      media.style.transform = `scale(1.08) translate(${x * 10}px, ${y * 7}px)`;
    };

    const onLeave = () => {
      media.style.transform = '';
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, [reduced]);

  return (
    <m.a
      ref={cardRef}
      className="work-card"
      href={story.link}
      style={{ '--card-index': index } as CSSProperties}
      variants={scaleIn}
      whileHover={reduced ? undefined : { y: -6 }}
      transition={springSoft}
    >
      <figure className="work-card__media">
        <img src={story.img} alt={story.imgAlt} loading="lazy" width={1200} height={800} />
        <m.span
          className="work-card__reveal"
          aria-hidden="true"
          initial={reduced ? false : { scaleX: 1 }}
          whileInView={{ scaleX: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.9, ease, delay: 0.15 + index * 0.12 }}
        />
        <span className="work-card__scrim" aria-hidden="true" />
      </figure>
      <m.h3
        className="work-card__client"
        initial={reduced ? false : { opacity: 1, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={revealViewport}
        transition={{ duration: 0.55, ease, delay: 0.28 + index * 0.1 }}
      >
        {story.client}
      </m.h3>
      <m.span
        className="work-card__link"
        initial={reduced ? false : { opacity: 1, x: -6 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={revealViewport}
        transition={{ duration: 0.5, ease, delay: 0.36 + index * 0.1 }}
      >
        {story.title}{' '}
        <span className="work-card__arrow" aria-hidden="true">
          →
        </span>
      </m.span>
    </m.a>
  );
}

export function FeaturedWorkMotion({ node, fallbackHtml }: IslandProps) {
  const parsed = parseIslandProps<FeaturedWorkProps>(node);
  const stories = useMemo(() => {
    if (parsed.stories?.length) return parsed.stories;
    return storiesFromFallback(fallbackHtml);
  }, [parsed.stories, fallbackHtml]);

  useEffect(() => {
    const section = document.getElementById('section-real-businesses');
    section?.classList.add('featured-work--motion');
  }, []);

  return (
    <>
      <header className="featured-work__header">
        <div className="featured-work__intro">
          <Reveal as="span" className="featured-work__label" delay={0} y={14}>
            True Stories
          </Reveal>
          <AnimatedLines
            as="h2"
            className="featured-work__title"
            lines={TITLE_LINES}
            maskClassName="featured-work__title-line-mask"
            lineClassName="featured-work__title-line"
          />
        </div>
        <Reveal className="featured-work__cta-wrap" delay={0.42} y={18}>
          <a href="/work" className="btn btn--outline btn--pill featured-work__cta">
            View all work <span className="btn-arrow">→</span>
          </a>
        </Reveal>
      </header>

      <StaggerGroup className="featured-work__grid">
        {stories.map((story, index) => (
          <WorkCard key={`${story.link}-${index}`} story={story} index={index} />
        ))}
      </StaggerGroup>
    </>
  );
}
