import type { ComponentType } from 'react';
import type { IslandProps } from './types';
import { HeaderEffects } from './islands/HeaderEffects';
import { HeroMotion } from './islands/HeroMotion';
import { FeaturedWorkMotion } from './islands/FeaturedWorkMotion';
import { TrueStoriesMotion } from './islands/TrueStoriesMotion';
import { EssenceMotion } from './islands/EssenceMotion';
import { ConnectingDotsMotion } from './islands/ConnectingDotsMotion';
import { BeyondObviousMotion } from './islands/BeyondObviousMotion';
import { PerspectiveMotion } from './islands/PerspectiveMotion';
import { CuriosityFirstMotion } from './islands/CuriosityFirstMotion';
import { CreatingMattersMotion } from './islands/CreatingMattersMotion';
import { ApproachSpotlightMotion } from './islands/ApproachSpotlightMotion';
import { ThinkingDifferenceMotion } from './islands/ThinkingDifferenceMotion';
import { ConversationSpotlightMotion } from './islands/ConversationSpotlightMotion';
import { WhatIfMotion } from './islands/WhatIfMotion';
import { WhenTalkCtaMotion } from './islands/WhenTalkCtaMotion';
import { WhenTalkHeroMotion } from './islands/WhenTalkHeroMotion';
import { WhenTalkRecognitionMotion } from './islands/WhenTalkRecognitionMotion';
import { WhenTalkDeeperMotion } from './islands/WhenTalkDeeperMotion';
import { WhenTalkHelpMotion } from './islands/WhenTalkHelpMotion';
import { WhenTalkNotFitMotion } from './islands/WhenTalkNotFitMotion';
import { WhenTalkConversationMotion } from './islands/WhenTalkConversationMotion';
import { WhenTalkFirstMotion } from './islands/WhenTalkFirstMotion';
import { FooterMotion } from './islands/FooterMotion';

export type IslandComponent = ComponentType<IslandProps>;

export const islandRegistry: Record<string, IslandComponent> = {
  'header-effects': HeaderEffects,
  'hero-motion': HeroMotion,
  'featured-work': FeaturedWorkMotion,
  'true-stories': TrueStoriesMotion,
  essence: EssenceMotion,
  'connecting-dots': ConnectingDotsMotion,
  'beyond-obvious': BeyondObviousMotion,
  perspective: PerspectiveMotion,
  'curiosity-first': CuriosityFirstMotion,
  'creating-matters': CreatingMattersMotion,
  'approach-spotlight': ApproachSpotlightMotion,
  'thinking-difference': ThinkingDifferenceMotion,
  'what-if': WhatIfMotion,
  'conversation-spotlight': ConversationSpotlightMotion,
  'when-talk-hero': WhenTalkHeroMotion,
  'when-talk-recognition': WhenTalkRecognitionMotion,
  'when-talk-deeper': WhenTalkDeeperMotion,
  'when-talk-help': WhenTalkHelpMotion,
  'when-talk-not-fit': WhenTalkNotFitMotion,
  'when-talk-conversation': WhenTalkConversationMotion,
  'when-talk-first': WhenTalkFirstMotion,
  'when-talk-cta': WhenTalkCtaMotion,
  'footer-motion': FooterMotion,
};
