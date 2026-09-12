/** Sticky scenario nav — highlights the active chip while scrolling */
let activeObserver = null;

export function initWhenTalkNav() {
  if (activeObserver) {
    activeObserver.disconnect();
    activeObserver = null;
  }

  const nav = document.querySelector('[data-when-talk-nav]');
  const scenarios = document.querySelectorAll('[data-scenario]');
  if (!nav || !scenarios.length) return;

  const chips = nav.querySelectorAll('[data-scenario-nav]');
  if (!chips.length) return;

  activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('data-scenario');
        chips.forEach((chip) => {
          chip.classList.toggle('is-active', chip.getAttribute('data-scenario-nav') === id);
        });
      });
    },
    { rootMargin: '-42% 0px -42% 0px', threshold: 0 },
  );

  scenarios.forEach((el) => activeObserver.observe(el));
}
