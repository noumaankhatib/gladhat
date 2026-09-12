import { createRoot, type Root } from 'react-dom/client';
import { MotionProvider } from './MotionProvider';
import { islandRegistry } from './registry';
import { initWhenTalkNav } from '../utils/when-talk-nav.js';
import { initWhenTalk3D } from '../utils/when-talk-3d.js';

const roots = new Map<HTMLElement, Root>();

/** Parent section classes unlocked when an island hydrates */
const SECTION_IN_VIEW: Record<string, { id: string; className: string }> = {
  'featured-work': { id: 'section-real-businesses', className: 'featured-work--in-view' },
  'approach-spotlight': { id: 'section-approach-spotlight', className: 'approach-spotlight--in-view' },
};

function activateSectionInView(islandName: string) {
  const target = SECTION_IN_VIEW[islandName];
  if (!target) return;
  const section = document.getElementById(target.id);
  section?.classList.add(target.className);
  if (islandName === 'featured-work') {
    section?.classList.add('featured-work--motion');
  }
  if (islandName === 'approach-spotlight') {
    section?.classList.add('approach-spotlight--motion');
  }
}

export function unmountIslands() {
  roots.forEach((root) => {
    root.unmount();
  });
  roots.clear();
}

/**
 * Hydrate [data-island] regions with React + Framer Motion (LazyMotion).
 * Static HTML inside each island node is the no-JS fallback until this runs.
 */
export function mountIslands() {
  const nodes = document.querySelectorAll('[data-island]');
  if (!nodes.length) return;

  nodes.forEach((node) => {
    if (!(node instanceof HTMLElement)) return;

    const name = node.getAttribute('data-island');
    const Component = name ? islandRegistry[name] : undefined;
    if (!Component) {
      node.setAttribute('data-island-ready', 'true');
      return;
    }

    if (roots.has(node)) return;

    const fallbackHtml = node.innerHTML;
    const root = createRoot(node);
    roots.set(node, root);

    root.render(
      <MotionProvider>
        <Component fallbackHtml={fallbackHtml} node={node} />
      </MotionProvider>,
    );

    if (name) activateSectionInView(name);
    node.setAttribute('data-island-ready', 'true');
  });

  requestAnimationFrame(() => {
    initWhenTalkNav();
    initWhenTalk3D();
  });
}
