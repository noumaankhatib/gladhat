import { createRoot } from 'react-dom/client';
import { mountIslands, unmountIslands } from './mount.tsx';
import { MotionProvider } from './MotionProvider';
import { ScrollProgress } from '../components/motion/ScrollProgress';

function hydrateIslands() {
  unmountIslands();
  mountIslands();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', hydrateIslands);
} else {
  hydrateIslands();
}

window.addEventListener('gladhat:route-ready', hydrateIslands);

const portalRoot = document.getElementById('motion-portal');
if (portalRoot) {
  createRoot(portalRoot).render(
    <MotionProvider>
      <ScrollProgress />
    </MotionProvider>,
  );
}
