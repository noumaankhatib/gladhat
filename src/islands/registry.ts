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
import { WhenTalkFocusMotion } from './islands/WhenTalkFocusMotion';
import { WhenTalkHeroMotion } from './islands/WhenTalkHeroMotion';
import { WhenTalkHeroSceneIsland } from './islands/WhenTalkHeroScene';
import { WhenTalkIntroMotion } from './islands/WhenTalkIntroMotion';
import { WhenTalkNextMotion } from './islands/WhenTalkNextMotion';
import { WhenTalkScenariosMotion } from './islands/WhenTalkScenariosMotion';
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
  'when-talk-scene': WhenTalkHeroSceneIsland,
  'when-talk-intro': WhenTalkIntroMotion,
  'when-talk-focus': WhenTalkFocusMotion,
  'when-talk-scenarios': WhenTalkScenariosMotion,
  'when-talk-next': WhenTalkNextMotion,
  'when-talk-cta': WhenTalkCtaMotion,
  'footer-motion': FooterMotion,
};
