<?php
/**
 * Start a conversation — homepage CTA band markup.
 * Section: section-start-conversation
 */
function gladhat_render_conversation_spotlight() {
  $email = gladhat_email();
  $linkedin = gladhat_linkedin();
  ?>
  <section
    class="conversation-cta section-start-conversation section-conversation-cta"
    id="section-start-conversation"
    aria-labelledby="conversation-cta-title"
  >
    <div class="conversation-cta__grid" data-island="conversation-spotlight">
      <figure class="conversation-cta__visual">
        <div class="conversation-cta__visual-frame">
          <img
            src="<?php echo esc_url(gladhat_image_url('contact-spotlight-visual.jpg')); ?>"
            alt="Warm sunlight across a plant and workspace — a quiet moment before a conversation"
            loading="lazy"
            width="320"
            height="480"
          >
        </div>
      </figure>
      <div class="conversation-cta__copy">
        <span class="conversation-cta__label">Start a conversation</span>
        <h2 class="conversation-cta__title" id="conversation-cta-title">
          <span class="conversation-cta__title-line">Let's have a</span>
          <span class="conversation-cta__title-line conversation-cta__title-line--accent">conversation.</span>
        </h2>
        <p class="conversation-cta__lead">If you're ready to look at your business differently, I'd love to hear from you.</p>
        <a href="<?php echo esc_url(home_url('/contact')); ?>" class="btn btn--primary btn--pill btn--lg conversation-cta__btn" id="home-conversation-cta">Get in touch <span class="btn-arrow">→</span></a>
      </div>
      <aside class="conversation-cta__contact" aria-label="Contact details">
        <div class="conversation-cta__item">
          <span class="conversation-cta__icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </span>
          <div class="conversation-cta__item-body">
            <h3 class="conversation-cta__item-title">Email</h3>
            <a href="mailto:<?php echo esc_attr(antispambot($email)); ?>" class="conversation-cta__item-link"><?php echo esc_html($email); ?></a>
          </div>
        </div>
        <div class="conversation-cta__item">
          <span class="conversation-cta__icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </span>
          <div class="conversation-cta__item-body">
            <h3 class="conversation-cta__item-title">Follow on LinkedIn</h3>
            <a href="<?php echo esc_url($linkedin); ?>" class="conversation-cta__item-link" target="_blank" rel="noopener noreferrer">Stay updated with work and insights.</a>
          </div>
        </div>
        <div class="conversation-cta__item">
          <span class="conversation-cta__icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>
          </span>
          <div class="conversation-cta__item-body">
            <h3 class="conversation-cta__item-title">London, UK</h3>
            <p class="conversation-cta__item-text">Working globally.</p>
          </div>
        </div>
      </aside>
    </div>
  </section>
  <?php
}
