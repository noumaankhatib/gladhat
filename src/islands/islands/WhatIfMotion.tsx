import { m, useReducedMotion } from 'framer-motion';
import { ParallaxMedia } from '../../components/motion/ParallaxMedia';
import { Reveal } from '../../components/motion/Reveal';
import { ease } from '../../lib/motion';
import { parseIslandProps, type IslandProps } from '../types';
import { assetUrl } from '../../config/env.js';

type WhatIfProps = {
  title?: string;
  image?: string;
  imageAlt?: string;
};

const BODY_LINES = [
  "What if your biggest opportunity isn't the one you're currently pursuing?",
  "What if your customers value something different from what you're talking about?",
  'What if the answer isn\'t more marketing, but seeing your business differently?',
];

const CLOSING_LINES = [
  'Those are the conversations I enjoy most.',
  'Because once the way you see your business changes…',
];

export function WhatIfMotion({ node }: IslandProps) {
  const reduced = useReducedMotion();
  const props = parseIslandProps<WhatIfProps>(node);
  const title = props.title || node.dataset.whatifTitle || 'What if...';
  const image = props.image || node.dataset.whatifImage || assetUrl('/images/whatif.png');
  const imageAlt =
    props.imageAlt ||
    node.dataset.whatifImageAlt ||
    'A brilliant glowing golden portal representing new possibilities';

  const lineVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease, delay: index * 0.12 },
    }),
  };

  return (
    <div className="split">
      <div className="split__text prose">
        <Reveal as="h2" className="whatif-title" delay={0}>
          {title}
        </Reveal>
        {BODY_LINES.map((line, index) => (
          <m.p
            key={line}
            custom={index + 1}
            initial={reduced ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-15% 0px' }}
            variants={lineVariants}
          >
            {line.includes('seeing your business') ? (
              <>
                What if the answer isn&apos;t more marketing, but{' '}
                <strong>seeing your business differently</strong>?
              </>
            ) : (
              line
            )}
          </m.p>
        ))}
        <hr className="separator" />
        {CLOSING_LINES.map((line, index) => (
          <m.p
            key={line}
            custom={index + 4}
            initial={reduced ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-15% 0px' }}
            variants={lineVariants}
          >
            {line}
          </m.p>
        ))}
        <m.p
          className="highlight-text"
          custom={6}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-15% 0px' }}
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.85, ease, delay: 0.72 },
            },
          }}
        >
          Everything else can change with it.
        </m.p>
      </div>
      <ParallaxMedia className="split__image">
        <img src={image} alt={imageAlt} className="floating" loading="lazy" />
      </ParallaxMedia>
    </div>
  );
}
