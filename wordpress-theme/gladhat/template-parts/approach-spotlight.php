<?php
/**
 * Approach spotlight — homepage "A clearer way forward" section.
 */
function gladhat_approach_steps() {
  return array(
    array(
      'id'        => '01',
      'num'       => '01',
      'title'     => 'Listening comes first',
      'text'      => 'Understand the real opportunity.',
      'image'     => 'epic_essence.png',
      'image_alt' => 'Listening and understanding your business',
      'details'   => '<p>The best work begins with curiosity — listening, research, questions, and understanding your customers and market.</p><p>I want to understand what you\'ve built, what excites you, what frustrates you, and what keeps returning to your mind.</p><p><strong>Only then do patterns begin to emerge.</strong></p>',
    ),
    array(
      'id'        => '02',
      'num'       => '02',
      'title'     => 'Looking together',
      'text'      => 'See beyond the obvious.',
      'image'     => 'perspective_prism.png',
      'image_alt' => 'Looking at the business from a different angle',
      'details'   => '<p>Once I understand the landscape, I start asking different questions.</p><ul class="approach-spotlight__list"><li>What have you stopped noticing?</li><li>What assumptions are shaping your decisions?</li><li>What opportunities are hiding in plain sight?</li></ul><p>Sometimes those questions confirm your direction. Sometimes they change it completely. Both outcomes are valuable.</p>',
    ),
    array(
      'id'        => '03',
      'num'       => '03',
      'title'     => 'Challenging ideas',
      'text'      => 'Shape a clearer direction.',
      'image'     => 'conversation.png',
      'image_alt' => 'Challenging ideas respectfully',
      'details'   => '<p>Founders carry a huge amount of knowledge, experience and instinct. They\'ve earned it.</p><p>My role isn\'t to replace that. It\'s to challenge assumptions respectfully — to ask the questions that are difficult when you\'re living inside the business every day.</p><p><strong>Good conversations produce better questions. Better questions lead to better decisions.</strong></p>',
    ),
    array(
      'id'        => '04',
      'num'       => '04',
      'title'     => 'Connecting the dots',
      'text'      => 'Turn thinking into meaningful impact.',
      'image'     => 'epic_connecting.png',
      'image_alt' => 'Connecting ideas into practical action',
      'details'   => '<p>I connect customer psychology with commercial objectives. Positioning with communications. Creative ideas with practical action.</p><p>Sometimes the answer is a clearer message, a different audience, or a stronger partnership — or a completely different way of looking at the business.</p><p><strong>The deliverable is never the starting point. The thinking is.</strong></p><a href="/working-together" class="text-link approach-spotlight__detail-link">How I work <span aria-hidden="true">→</span></a>',
    ),
  );
}

function gladhat_render_approach_spotlight() {
  $steps = gladhat_approach_steps();
  ?>
  <section class="section approach-spotlight section-approach-spotlight" id="section-approach-spotlight" aria-label="Our approach">
    <div class="container" data-island="approach-spotlight">
      <header class="approach-spotlight__header">
        <div class="approach-spotlight__intro">
          <span class="approach-spotlight__label">Our approach</span>
          <h2 class="approach-spotlight__title">
            <span class="approach-spotlight__title-line" style="--line-index: 0">A clearer way</span>
            <span class="approach-spotlight__title-line approach-spotlight__title-line--accent" style="--line-index: 1">forward.</span>
          </h2>
          <p class="approach-spotlight__lead">I help founders see their business more clearly — so they can make better decisions and recognise opportunities they might have missed.</p>
        </div>
        <a href="<?php echo esc_url(home_url('/working-together')); ?>" class="btn btn--primary btn--pill approach-spotlight__cta">Explore our approach <span class="btn-arrow">→</span></a>
      </header>

      <div class="approach-spotlight__split">
        <nav class="approach-spotlight__nav" aria-label="Approach steps">
          <div class="approach-spotlight__progress" aria-hidden="true">
            <span class="approach-spotlight__progress-fill" data-approach-progress></span>
          </div>
          <ol class="approach-spotlight__steps">
            <?php foreach ($steps as $index => $step) : ?>
            <li
              class="approach-spotlight__step"
              data-approach-step
              data-step-panel="<?php echo esc_attr($step['id']); ?>"
              data-step-image="<?php echo esc_url(gladhat_image_url($step['image'])); ?>"
              data-step-image-alt="<?php echo esc_attr($step['image_alt']); ?>"
              style="--step-index: <?php echo (int) $index; ?>"
            >
              <button
                type="button"
                class="approach-spotlight__step-btn"
                data-approach-trigger
                aria-expanded="false"
                aria-controls="approach-panel-<?php echo esc_attr($step['id']); ?>"
              >
                <span class="approach-spotlight__step-num" aria-hidden="true"><?php echo esc_html($step['num']); ?></span>
                <span class="approach-spotlight__step-copy">
                  <span class="approach-spotlight__step-title"><?php echo esc_html($step['title']); ?></span>
                  <span class="approach-spotlight__step-text"><?php echo esc_html($step['text']); ?></span>
                </span>
              </button>
            </li>
            <?php endforeach; ?>
          </ol>
        </nav>

        <div class="approach-spotlight__stage">
          <figure class="approach-spotlight__frame">
            <img
              class="approach-spotlight__visual-img"
              data-approach-visual
              src="<?php echo esc_url(gladhat_image_url($steps[0]['image'])); ?>"
              alt="<?php echo esc_attr($steps[0]['image_alt']); ?>"
              loading="lazy"
              width="900"
              height="900"
            >
          </figure>
          <div class="approach-spotlight__panels">
            <?php foreach ($steps as $index => $step) : ?>
            <div
              class="approach-spotlight__panel<?php echo $index === 0 ? ' approach-spotlight__panel--active' : ''; ?>"
              id="approach-panel-<?php echo esc_attr($step['id']); ?>"
              data-approach-panel="<?php echo esc_attr($step['id']); ?>"
              <?php echo $index === 0 ? '' : 'hidden'; ?>
              role="region"
              aria-label="<?php echo esc_attr($step['title']); ?>"
            >
              <div class="approach-spotlight__panel-inner">
                <?php
                $details = str_replace(
                  'href="/working-together"',
                  'href="' . esc_url(home_url('/working-together')) . '"',
                  $step['details']
                );
                echo wp_kses($details, gladhat_allowed_html()); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                ?>
              </div>
            </div>
            <?php endforeach; ?>
          </div>
        </div>
      </div>
    </div>
  </section>
  <?php
}
