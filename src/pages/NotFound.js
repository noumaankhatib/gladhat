/* ===================================================
   GLADHAT — 404 Not Found
   =================================================== */

export function NotFoundPage() {
  return `
    <section class="error-page section-error-404" id="error-404" aria-label="Page not found">
      <div class="container">
        <div class="error-page__layout">
          <div class="error-page__content">
            <p class="error-page__code" aria-hidden="true">4<span>0</span>4</p>
            <h1 class="error-page__title">Let's look somewhere <span class="accent">else.</span></h1>
            <p class="error-page__text">That address doesn't match a page on this site. Try one of the links below, or head back to the homepage.</p>
            <div class="error-page__actions">
              <a href="/" class="btn btn--primary btn--lg btn--pill">Go to homepage <span class="btn-arrow">→</span></a>
            </div>
            <nav class="error-page__shortcuts" aria-label="Helpful links">
              <a href="/work" class="error-page__shortcut">True Stories</a>
              <a href="/working-together" class="error-page__shortcut">How I Work</a>
              <a href="/contact" class="error-page__shortcut">Contact</a>
            </nav>
          </div>
          <figure class="error-page__visual">
            <img src="/images/prism.png" alt="" loading="lazy" width="1000" height="1000">
          </figure>
        </div>
      </div>
    </section>
  `;
}
