/** 3D tilt on scenario images — lightweight CSS transform (no WebGL per card) */
export function initWhenTalk3D() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cards = document.querySelectorAll('[data-when-talk-tilt]');
  if (!cards.length) return;

  cards.forEach((card) => {
    const inner = card.querySelector('[data-when-talk-tilt-inner]');
    if (!inner) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = 0;

    const render = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      inner.style.transform = `rotateX(${currentY}deg) rotateY(${currentX}deg) translateZ(12px)`;
      rafId = requestAnimationFrame(render);
    };

    card.addEventListener('mouseenter', () => {
      if (!rafId) rafId = requestAnimationFrame(render);
    });

    card.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
    });

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 10;
      targetY = -y * 10;
    });
  });
}
