import { AnimatedLines } from '../../components/motion/AnimatedLines';
import { Reveal } from '../../components/motion/Reveal';
import { WHEN_FOCUS_LINES } from '../../utils/when-scenarios.js';
import type { IslandProps } from '../types';

const FOCUS_LINES = WHEN_FOCUS_LINES.map((text, index) => ({
  text,
  className:
    index === WHEN_FOCUS_LINES.length - 1
      ? 'when-talk-focus__line when-talk-focus__line--accent'
      : 'when-talk-focus__line',
}));

export function WhenTalkFocusMotion(_props: IslandProps) {
  return (
    <div className="container when-talk-focus__inner">
      <Reveal as="span" className="when-talk-focus__label" delay={0} y={10}>
        The moment it clicks
      </Reveal>
      <AnimatedLines
        as="blockquote"
        className="when-talk-focus__quote"
        lines={FOCUS_LINES}
        maskClassName="when-talk-focus__mask"
        lineClassName="when-talk-focus__line"
      />
    </div>
  );
}
