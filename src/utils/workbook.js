/* ===================================================
   GLADHAT — See Differently workbook
   Highlights the exercise currently in view in the sticky
   index and advances the progress bar. Content is static
   HTML; this only adds the "where am I" layer.
   =================================================== */

let observer = null;

export function initWorkbook() {
  observer?.disconnect();
  observer = null;

  const root = document.querySelector('[data-workbook]');
  if (!root) return;

  const pages = [...root.querySelectorAll('[data-workbook-page]')];
  const links = [...root.querySelectorAll('[data-workbook-link]')];
  const current = root.querySelector('[data-workbook-current]');
  const fill = root.querySelector('[data-workbook-fill]');
  if (!pages.length) return;

  const setActive = (num) => {
    const index = pages.findIndex((page) => page.dataset.workbookPage === num);
    links.forEach((link) => {
      const active = link.dataset.workbookLink === num;
      link.classList.toggle('is-active', active);
      link.classList.toggle('is-done', Number(link.dataset.workbookLink) < Number(num));
      if (active) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    });
    pages.forEach((page) => page.classList.toggle('is-active', page.dataset.workbookPage === num));
    if (current) current.textContent = num;
    if (fill) fill.style.transform = `scaleX(${(index + 1) / pages.length})`;
  };

  // A page counts as "current" once it crosses the upper-middle band of the viewport.
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.dataset.workbookPage);
      });
    },
    { rootMargin: '-35% 0px -55% 0px' },
  );

  pages.forEach((page) => observer.observe(page));
  setActive(pages[0].dataset.workbookPage);
}
