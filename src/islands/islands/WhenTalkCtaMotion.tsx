import { MagneticButton } from '../../components/motion/MagneticButton';
import { Reveal } from '../../components/motion/Reveal';
import { WHEN_CTA_LINES } from '../../utils/when-scenarios.js';
import type { IslandProps } from '../types';

export function WhenTalkCtaMotion(_props: IslandProps) {
  const scriptLines = WHEN_CTA_LINES.filter(
    (line) => line.tag === 'p' || line.tag === 'quote',
  );

  return (
    <>
      <Reveal as="span" className="when-talk-cta__eyebrow" delay={0} y={10}>
        Ready when you are
      </Reveal>
      <Reveal as="h2" delay={0.06} y={16}>
        Let&apos;s talk
      </Reveal>
      <div className="when-talk-script__lines">
        {scriptLines.map((line, index) => {
          const delay = 0.12 + index * 0.07;
          if (line.tag === 'quote') {
            return (
              <Reveal
                key={line.text}
                as="p"
                className="when-talk-script__line when-talk-script__line--quote highlight-text"
                delay={delay}
                y={12}
              >
                &ldquo;That&apos;s exactly where I am.&rdquo;
              </Reveal>
            );
          }
          const isCloser = index === scriptLines.length - 1;
          return (
            <Reveal
              key={line.text}
              as="p"
              className={`when-talk-script__line${isCloser ? ' when-talk-script__line--closer' : ''}`}
              delay={delay}
              y={12}
            >
              {line.text}
            </Reveal>
          );
        })}
      </div>
      <Reveal className="when-talk-cta__actions" delay={0.52} y={14}>
        <MagneticButton href="/contact" className="btn btn--primary btn--lg btn--pill" id="when-cta-btn">
          Begin the Conversation <span className="btn-arrow">→</span>
        </MagneticButton>
        <a href="mailto:m@gladhat.com" className="when-talk-cta__email">
          Or email m@gladhat.com
        </a>
      </Reveal>
    </>
  );
}
