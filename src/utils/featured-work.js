/* ===================================================
   GLADHAT — Featured work / True stories animations
   =================================================== */

export function initFeaturedWork() {
  const section = document.getElementById('section-real-businesses');
  if (!section) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      section.classList.add('featured-work--in-view');
      observer.disconnect();
    });
  }, { threshold: 0.22 });

  observer.observe(section);

  if (reducedMotion) return;

  const cards = section.querySelectorAll('.work-card');

  cards.forEach((card) => {
    const media = card.querySelector('.work-card__media img');
    if (!media) return;

    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      media.style.transform = `scale(1.06) translate(${x * 8}px, ${y * 6}px)`;
    });

    card.addEventListener('mouseleave', () => {
      media.style.transform = '';
    });
  });
}
