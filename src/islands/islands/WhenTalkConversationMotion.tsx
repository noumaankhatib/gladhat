import { Reveal } from '../../components/motion/Reveal';
import { StaggerGroup } from '../../components/motion/StaggerGroup';
import { StaggerItem } from '../../components/motion/StaggerItem';
import { CONVERSATION_LABEL, CONVERSATION_TITLE, CONVERSATION_LEDE, CONVERSATION_QUESTIONS, CONVERSATION_RESOLUTION } from '../../utils/when-scenarios.js';
import type { IslandProps } from '../types';

export function WhenTalkConversationMotion(_props: IslandProps) {
  return (
    <div className="container when-talk-conversation__inner">
      <header className="section-header when-talk-conversation__header">
        <Reveal as="span" className="section-header__label" delay={0} y={12}>
          {CONVERSATION_LABEL}
        </Reveal>
        <h2 className="section-header__title">
          {CONVERSATION_TITLE.split('\n').map((line, i) => (
            <Reveal as="span" key={line} className="section-header__title-line" delay={0.05 + i * 0.06} y={16}>
              {line}
            </Reveal>
          ))}
        </h2>
        <Reveal as="p" className="when-talk-conversation__lede" delay={0.2} y={12}>
          {CONVERSATION_LEDE}
        </Reveal>
      </header>

      <div className="when-talk-conversation__stage">
        <div className="when-talk-figure when-talk-figure--left" aria-hidden="true" />
        <StaggerGroup className="when-talk-conversation__questions">
          {CONVERSATION_QUESTIONS.map((q) => (
            <StaggerItem key={q}>
              <p className="when-talk-conversation__question">{q}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <div className="when-talk-figure when-talk-figure--right" aria-hidden="true" />
      </div>

      <Reveal as="div" className="when-talk-conversation__resolve" delay={0.3} y={14}>
        <span className="when-talk-conversation__you-me">
          YOU <span className="when-talk-conversation__arrow">&rarr;</span> ME
        </span>
        <p className="when-talk-conversation__line highlight-text">{CONVERSATION_RESOLUTION}</p>
      </Reveal>
    </div>
  );
}
