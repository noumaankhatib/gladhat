import { Reveal } from '../../components/motion/Reveal';
import type { IslandProps } from '../types';

/**
 * Curiosity first section with scroll-triggered Reveal.
 * Copy matches Home.js / front-page.php exactly.
 */
export function CuriosityReveal({ fallbackHtml: _fallbackHtml }: IslandProps) {
  return (
    <>
      <Reveal as="h2" className="curiosity-band__title" delay={0}>
        Too close to see it <span className="accent">clearly?</span>
      </Reveal>
      <Reveal as="div" className="curiosity-band__body" delay={0.15}>
        <p>
          You know your business better than anyone. That closeness is valuable — it&apos;s also
          exactly what can make certain problems invisible. An experienced outside perspective
          doesn&apos;t understand your business better than you do. It simply sees different
          things.
        </p>
        <a href="/working-together" className="text-link">
          Learn more <span aria-hidden="true">→</span>
        </a>
      </Reveal>
    </>
  );
}
