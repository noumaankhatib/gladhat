/* ===================================================
   GLADHAT — Start a conversation (homepage CTA band)
   Section: section-start-conversation
   =================================================== */

const ICONS = {
  email: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  linkedin: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
  location: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>`,
};

export function ConversationSpotlight() {
  const email = 'm@gladhat.com';
  const linkedin = 'https://linkedin.com';

  return `
    <section
      class="conversation-cta section-start-conversation section-conversation-cta"
      id="section-start-conversation"
      aria-labelledby="conversation-cta-title"
    >
      <div class="container conversation-cta__grid" data-island="conversation-spotlight">
        <div class="conversation-cta__main">
          <div class="conversation-cta__copy">
            <p class="conversation-cta__label">
              <span class="conversation-cta__label-num" aria-hidden="true">11</span>
              <span class="conversation-cta__label-text">Let's talk</span>
            </p>
            <h2 class="conversation-cta__title" id="conversation-cta-title">Let's have <span class="accent">a conversation</span>.</h2>
            <p class="conversation-cta__lead">If you're ready to look at your business differently, I'd love to hear what's on your mind.</p>
            <a href="/contact" class="btn btn--primary btn--pill btn--lg conversation-cta__btn" id="home-conversation-cta">Get in touch <span class="btn-arrow">→</span></a>
          </div>
          <aside class="conversation-cta__contact" aria-label="Contact details">
            <div class="conversation-cta__item">
              <span class="conversation-cta__icon">${ICONS.email}</span>
              <div class="conversation-cta__item-body">
                <h3 class="conversation-cta__item-title">Email</h3>
                <a href="mailto:${email}" class="conversation-cta__item-link">${email}</a>
              </div>
            </div>
            <div class="conversation-cta__item">
              <span class="conversation-cta__icon">${ICONS.linkedin}</span>
              <div class="conversation-cta__item-body">
                <h3 class="conversation-cta__item-title">Follow on LinkedIn</h3>
                <a href="${linkedin}" class="conversation-cta__item-link" target="_blank" rel="noopener noreferrer">Stay updated with work and insights.</a>
              </div>
            </div>
            <div class="conversation-cta__item">
              <span class="conversation-cta__icon">${ICONS.location}</span>
              <div class="conversation-cta__item-body">
                <h3 class="conversation-cta__item-title">London, UK</h3>
                <p class="conversation-cta__item-text">Working globally.</p>
              </div>
            </div>
          </aside>
        </div>
        <figure class="conversation-cta__visual">
          <div class="conversation-cta__visual-frame">
            <img
              src="/images/11_section.png"
              alt="Two people in quiet conversation at a stone table on an open terrace at sunset, overlooking mountains and a lake — a moment of shared perspective"
              loading="lazy"
              width="1680"
              height="940"
            >
          </div>
        </figure>
      </div>
    </section>
  `;
}
