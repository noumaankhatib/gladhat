import { Enter } from '../../components/motion/Enter';
import {
  CURIOSITY_BOOKS,
  CURIOSITY_INTRO,
  CURIOSITY_PHILOSOPHY,
  CURIOSITY_SCULPTURE_ALT,
  CURIOSITY_VISUAL_GIF,
} from '../../utils/curiosity-first-content.js';
import type { IslandProps } from '../types';

export function CuriosityFirstMotion(_props: IslandProps) {
  return (
    <div className="curiosity-first-band__shell">
      <div className="curiosity-first-band__grid">
        <header className="curiosity-first-band__copy">
          <Enter as="p" className="curiosity-first-band__label" delay={0.05}>
            <span className="curiosity-first-band__label-num" aria-hidden="true">
              06
            </span>
            <span className="curiosity-first-band__label-text">Curiosity first</span>
          </Enter>
          <Enter as="h2" className="curiosity-first-band__title" delay={0.12}>
            Curiosity
            <br />
            <span className="accent">first.</span>
          </Enter>
          <Enter as="div" className="curiosity-first-band__body" delay={0.2}>
            {CURIOSITY_INTRO.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Enter>
          <Enter as="p" className="curiosity-first-band__philosophy" delay={0.32}>
            {CURIOSITY_PHILOSOPHY}
          </Enter>
        </header>

        <Enter as="figure" className="curiosity-first-band__visual-wrap" delay={0.18}>
          <img
            className="curiosity-first-band__visual-gif"
            src={CURIOSITY_VISUAL_GIF}
            alt={CURIOSITY_SCULPTURE_ALT}
            loading="lazy"
            decoding="async"
            width={960}
            height={1080}
          />
        </Enter>
      </div>

      <ul className="sr-only" aria-label="Curiosity process">
        {CURIOSITY_BOOKS.map((book) => (
          <li key={book.id}>
            {book.label} — {book.annotation}
          </li>
        ))}
      </ul>
    </div>
  );
}
