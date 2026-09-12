/* ===================================================
   GLADHAT — Insight triptych scroll animations
   =================================================== */

export function initInsightTriptych() {
  const section = document.getElementById('section-insight-triptych');
  if (!section) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      section.classList.add('insight-triptych--in-view');
      observer.disconnect();
    });
  }, { threshold: 0.28 });

  observer.observe(section);

  if (reducedMotion) return;

  const visual = section.querySelector('.insight-triptych__visual img');
  if (!visual) return;

  let ticking = false;

  const updateParallax = () => {
    const rect = section.getBoundingClientRect();
    const viewHeight = window.innerHeight;
    if (rect.bottom < 0 || rect.top > viewHeight) {
      ticking = false;
      return;
    }

    const progress = (viewHeight - rect.top) / (viewHeight + rect.height);
    const offset = (progress - 0.5) * 28;
    visual.style.transform = `scale(1.08) translateY(${offset}px)`;
    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateParallax);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  updateParallax();
}
