/* ===================================================
   GLADHAT — Process storytelling (How I Work)
   Drives the scroll-linked thread, the active step and a light
   image parallax. CSS does the rest; this only sets state/vars.
   =================================================== */

let teardown = null;

export function initProcessStory() {
  teardown?.();
  teardown = null;

  const list = document.querySelector('.process__steps');
  if (!list) return;

  const steps = [...list.querySelectorAll('.process-step')];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ticking = false;

  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    const focus = vh * 0.5;
    const rect = list.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (focus - rect.top) / rect.height));
    list.style.setProperty('--p', progress.toFixed(4));

    let active = -1;
    let best = Infinity;
    steps.forEach((step, i) => {
      const r = step.getBoundingClientRect();
      const mid = r.top + r.height / 2;
      const dist = Math.abs(mid - focus);
      if (r.top < focus && r.bottom > focus * 0.6 && dist < best) {
        best = dist;
        active = i;
      }
      step.classList.toggle('is-passed', r.top < focus);
      if (!reduced) {
        const media = step.querySelector('.process-step__media img');
        if (media) {
          const offset = Math.max(-1, Math.min(1, (mid - focus) / vh));
          media.style.setProperty('--py', `${(offset * -22).toFixed(1)}px`);
        }
      }
    });
    steps.forEach((step, i) => step.classList.toggle('is-active', i === active));
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();

  teardown = () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  };
}
