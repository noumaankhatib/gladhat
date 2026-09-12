/* ===================================================
   GLADHAT — Approach spotlight interactions
   Progressive-enhancement fallback for the scroll-linked
   transcript (pre-hydration / no-JS-framework state).
   =================================================== */

export function initApproachSpotlight() {
  const section = document.getElementById('section-approach-spotlight');
  if (!section) return;

  const wrap = section.querySelector('[data-approach-wrap]');
  const threadFill = section.querySelector('[data-approach-thread-fill]');
  const beats = section.querySelectorAll('[data-approach-beat]');
  if (!wrap || !beats.length) return;

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        section.classList.add('approach-spotlight--in-view');
        sectionObserver.disconnect();
      });
    },
    { threshold: 0.15 },
  );
  sectionObserver.observe(section);

  const beatObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        beats.forEach((beat) => {
          beat.classList.toggle('approach-spotlight__beat--active', beat === entry.target);
        });
      });
    },
    { rootMargin: '-42% 0px -42% 0px', threshold: 0 },
  );
  beats.forEach((beat) => beatObserver.observe(beat));

  if (!threadFill) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    threadFill.style.transform = 'scaleY(1)';
    return;
  }

  const updateThread = () => {
    const rect = wrap.getBoundingClientRect();
    const viewportH = window.innerHeight;
    const start = viewportH * 0.7;
    const end = viewportH * 0.4 - rect.height;
    const span = start - end;
    const progress = span > 0 ? Math.min(1, Math.max(0, (start - rect.top) / span)) : 0;
    threadFill.style.transform = `scaleY(${progress})`;
  };

  updateThread();
  window.addEventListener('scroll', updateThread, { passive: true });
  window.addEventListener('resize', updateThread);
}
