<?php
/**
 * Homepage — markup and classes match src/pages/Home.js
 *
 * Section map:
 * 01 section-hero
 * 02 section-intro-statement
 * 03 section-key-values
 * 04 section-client-marquee
 * 05 section-insight-triptych  (quote | visual | mission)
 * 06 section-real-businesses  (featured work grid)
 * 07 section-thinking-teaser  (thoughts promo)
 * 08 section-approach-spotlight (how I work)
 * 09 section-start-conversation  (contact band)
 * 10 section-what-if
 */
get_header();

$brands = array(
  array('file' => 'logos/server_factory.png', 'alt' => 'Server Factory Logo', 'name' => 'Server Factory'),
  array('file' => 'logos/first_light.png', 'alt' => 'First Light Logo', 'name' => 'First Light'),
  array('file' => 'logos/tonbo.png', 'alt' => 'Tonbo Logo', 'name' => 'Tonbo'),
  array('file' => 'logos/ensights.png', 'alt' => 'enSights Logo', 'name' => 'enSights'),
  array('file' => 'logos/provengo.svg', 'alt' => 'Provengo Logo', 'name' => 'Provengo'),
);

$hero_label = gladhat_text('hero_label', 'Gladhat');
$hero_title = gladhat_html('hero_title', 'A different way<br>of <span class="accent">seeing</span>');
$hero_sub   = gladhat_html('hero_subtitle', "Most founders don't need more ideas.<br>
            They need a different perspective.");

$featured_stories = array(
  array(
    'link'  => home_url('/server-factory'),
    'img'   => 'epic_founders.png',
    'alt'   => 'Server Factory story',
    'client'=> 'Server Factory',
    'title' => "Seeing Through the Buyer's Eyes",
  ),
  array(
    'link'  => home_url('/firstlight'),
    'img'   => 'epic_essence.png',
    'alt'   => 'First Light story',
    'client'=> 'First Light',
    'title' => 'Finding the Right Language',
  ),
  array(
    'link'  => home_url('/tonbo'),
    'img'   => 'epic_connecting.png',
    'alt'   => 'Tonbo Ventures story',
    'client'=> 'Tonbo Ventures',
    'title' => 'Recognising the Value of Thinking',
  ),
);
$featured_island_props = wp_json_encode(array(
  'stories' => array_map(function ($story) {
    return array(
      'client' => $story['client'],
      'title'  => $story['title'],
      'link'   => $story['link'],
      'img'    => gladhat_image_url($story['img']),
      'imgAlt' => $story['alt'],
    );
  }, $featured_stories),
));
?>
    <svg class="sr-only" aria-hidden="true" width="0" height="0">
      <defs>
        <clipPath id="heroWaveClip" clipPathUnits="objectBoundingBox">
          <path d="M0.22,0 C0.08,0.18 0.32,0.32 0.14,0.52 C0.02,0.68 0.26,0.84 0.18,1 L1,1 L1,0 Z"/>
        </clipPath>
      </defs>
    </svg>

    <section class="hero hero--editorial hero--curve section-hero" id="section-hero" aria-label="Hero">
      <div
        class="hero__layout"
        data-island="hero-motion"
        data-hero-img="<?php echo esc_url(gladhat_image_url('epic_founders.png')); ?>"
        data-hero-cta="Begin the Conversation"
        data-hero-sub="Most founders don't need more ideas.&#10;They need a different perspective."
      >
        <div class="hero__content">
          <p class="hero__eyebrow">A different way of</p>
          <h1 class="hero__title">
            A different way of <span class="accent">seeing.</span>
          </h1>
          <p class="hero__subtitle">
            <?php echo $hero_sub; ?>
          </p>
          <div class="hero__actions">
            <a href="<?php echo esc_url(home_url('/contact')); ?>" class="btn btn--primary btn--lg btn--pill hero__cta" id="hero-cta">
              Begin the Conversation <span class="btn-arrow">→</span>
            </a>
          </div>
        </div>
        <div class="hero__media">
          <figure class="hero-curve">
            <img src="<?php echo esc_url(gladhat_image_url('epic_founders.png')); ?>" alt="A different way of seeing" id="hero-image" width="1400" height="1800">
          </figure>
        </div>
      </div>
    </section>

    <section class="section curiosity-band section-intro-statement" id="section-intro-statement" aria-label="Intro statement">
      <div class="container curiosity-band__grid" data-island="curiosity-reveal">
        <h2 class="curiosity-band__title">Curiosity <span class="accent">first</span></h2>
        <div class="curiosity-band__body">
          <p>The best ideas rarely arrive because someone tries to be clever. They emerge from genuine curiosity. From wondering what might have been overlooked. From looking at things from different angles.</p>
          <a href="<?php echo esc_url(home_url('/working-together')); ?>" class="text-link">Learn more <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>

    <section class="section key-values section-key-values" id="section-key-values" aria-label="Key values">
      <div class="container" data-island="key-values">
        <?php
        $key_values = array(
          array(
            'num'     => '01',
            'title'   => "Most founders don't need more ideas",
            'text'    => 'They already have plenty. What they sometimes need is a different perspective.',
            'image'   => 'epic_founders.png',
            'alt'     => 'Founders ring — a different perspective',
            'details' => '<p>When you live with your business, you tend to stop noticing what confuses potential customers. You stop seeing the strengths that make you different.</p><p>You become attached to explanations that no longer help. You miss opportunities because they feel too familiar to notice.</p><p>That\'s normal. It\'s what happens when you\'re close to something you care about.</p><p>An experienced outside perspective changes that—not because the outsider knows your business better than you do, but because they <strong>see different things</strong>.</p>',
          ),
          array(
            'num'     => '02',
            'title'   => 'Looking beyond the obvious',
            'text'    => 'We look beyond the obvious to uncover unseen opportunities.',
            'image'   => 'epic_beyond.png',
            'alt'     => 'Beyond the obvious — unseen opportunities',
            'details' => '<p>People often come to me asking for a better website, new messaging, or a marketing campaign.</p><p>Sometimes that\'s exactly what they need. But often, those requests are symptoms rather than the real challenge.</p><p>There are important questions that must be asked first.</p><ul class="key-values__list"><li>What makes customers choose you instead of another company?</li><li>What have you stopped noticing because you\'ve lived with it for too long?</li><li>Where is the opportunity nobody has explored?</li><li>What assumptions are shaping your decisions without you realising?</li></ul><p>Those conversations are where the most valuable work begins.</p>',
          ),
          array(
            'num'     => '03',
            'title'   => 'Every business has an essence',
            'text'    => 'We distill complexity into what truly matters.',
            'image'   => 'epic_essence.png',
            'alt'     => 'Business essence — what truly matters',
            'details' => '<p>I believe every business has a core truth at its centre.</p><ul class="key-values__list"><li>The things it does exceptionally well.</li><li>The things customers value most.</li><li>The things competitors can\'t easily copy.</li></ul><p>Sometimes it\'s obvious. More often, it\'s hidden beneath familiarity, complexity or habit.</p><p>The work isn\'t to invent something new. It\'s to uncover what\'s already there and express it with clarity.</p>',
          ),
          array(
            'num'     => '04',
            'title'   => 'Connecting the dots',
            'text'    => 'We connect ideas, people, and possibilities to create momentum.',
            'image'   => 'epic_connecting.png',
            'alt'     => 'Connecting ideas, people and possibilities',
            'details' => '<p>I naturally connect ideas that don\'t always seem related.</p><p>Customer psychology with commercial objectives. Positioning with communications. Creative ideas with practical action.</p><p>Sometimes the answer is a better website, a new event, a different partnership, a clearer proposition—or an opportunity nobody had considered.</p><p><strong>The deliverable is never the starting point. The thinking is.</strong></p>',
          ),
        );
        ?>
        <header class="key-values__header reveal">
          <span class="key-values__label">How we think</span>
          <h2 class="key-values__heading">Four ideas that shape every project</h2>
        </header>
        <div class="key-values__grid">
          <?php foreach ($key_values as $index => $item) : ?>
          <article class="key-values__card reveal reveal--delay-<?php echo esc_attr(($index % 4) + 1); ?>" data-key-values-card>
            <button type="button" class="key-values__trigger" data-key-values-trigger aria-expanded="false" aria-controls="key-values-detail-<?php echo esc_attr($item['num']); ?>">
              <div class="key-values__stage" aria-hidden="true">
                <div class="key-values__glow"></div>
                <div class="key-values__visual" style="--float-delay: <?php echo esc_attr($index * 0.7); ?>s">
                  <div class="key-values__tilt" data-key-values-visual>
                    <img src="<?php echo esc_url(gladhat_image_url($item['image'])); ?>" alt="<?php echo esc_attr($item['alt']); ?>" loading="lazy" width="640" height="640">
                  </div>
                </div>
              </div>
              <span class="key-values__num"><?php echo esc_html($item['num']); ?></span>
              <h3 class="key-values__title"><?php echo esc_html($item['title']); ?></h3>
              <p class="key-values__text"><?php echo esc_html($item['text']); ?></p>
              <span class="key-values__hint">
                <span class="key-values__hint-text" data-hint-collapsed>View details</span>
                <span class="key-values__hint-text" data-hint-expanded hidden>Hide details</span>
                <span class="key-values__hint-icon" aria-hidden="true">↓</span>
              </span>
            </button>
            <div class="key-values__details" id="key-values-detail-<?php echo esc_attr($item['num']); ?>" data-key-values-details hidden>
              <div class="key-values__details-inner">
                <?php echo wp_kses_post($item['details']); ?>
              </div>
            </div>
          </article>
          <?php endforeach; ?>
        </div>
        <div class="key-values__footer">
          <p class="key-values__teaser">These four ideas shape every project. The full process — listening, questioning and creating together — lives in How I Work.</p>
          <a href="<?php echo esc_url(home_url('/working-together')); ?>" class="text-link key-values__link">How I work <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>

    <div class="marquee-container section-client-marquee" id="section-client-marquee" aria-label="Client marquee">
      <div class="marquee-track">
        <?php for ($i = 0; $i < 4; $i++) : ?>
          <div class="marquee-item">
            <?php foreach ($brands as $brand) : ?>
            <div class="marquee-brand">
              <img src="<?php echo esc_url(gladhat_image_url($brand['file'])); ?>" alt="<?php echo esc_attr($brand['alt']); ?>" class="marquee-logo-img" loading="lazy">
              <span class="marquee-text"><?php echo esc_html($brand['name']); ?></span>
            </div>
            <span class="marquee-separator">✦</span>
            <?php endforeach; ?>
          </div>
        <?php endfor; ?>
      </div>
    </div>

    <section class="insight-triptych section-insight-triptych" id="section-insight-triptych" aria-label="Insight triptych">
      <div class="insight-triptych__quote" id="insight-quote-panel">
        <span class="insight-triptych__mark" aria-hidden="true">“</span>
        <p class="insight-triptych__text">
          <span class="insight-triptych__word" style="--word-index: 0">I</span>
          <span class="insight-triptych__word" style="--word-index: 1">help</span>
          <span class="insight-triptych__word" style="--word-index: 2">businesses</span>
          <span class="insight-triptych__word insight-triptych__word--accent" style="--word-index: 3">see</span>
          <span class="insight-triptych__word insight-triptych__word--accent" style="--word-index: 4">themselves</span>
          <span class="insight-triptych__word insight-triptych__word--accent" style="--word-index: 5">more</span>
          <span class="insight-triptych__word insight-triptych__word--accent" style="--word-index: 6">clearly.</span>
        </p>
        <span class="insight-triptych__shimmer" aria-hidden="true"></span>
      </div>
      <figure class="insight-triptych__visual" id="insight-visual-panel">
        <div class="insight-triptych__lens" aria-hidden="true"></div>
        <img src="<?php echo esc_url(gladhat_image_url('epic_beyond.png')); ?>" alt="" loading="lazy" width="1200" height="1600">
      </figure>
      <div class="insight-triptych__mission" id="insight-mission-panel">
        <p class="insight-triptych__mission-text">I tend to work best with founders, business owners and leadership teams who are open to exploring ideas together.</p>
        <a href="<?php echo esc_url(home_url('/working-together')); ?>" class="text-link insight-triptych__link">Our approach <span aria-hidden="true">→</span></a>
      </div>
    </section>

    <section class="section featured-work section-real-businesses" id="section-real-businesses" aria-label="Real businesses">
      <div
        class="container"
        data-island="featured-work"
        data-island-props="<?php echo esc_attr(rawurlencode($featured_island_props)); ?>"
      >
        <header class="featured-work__header">
          <div class="featured-work__intro">
            <span class="featured-work__label">True Stories</span>
            <h2 class="featured-work__title">
              <span class="featured-work__title-line" style="--line-index: 0">True stories.</span>
              <span class="featured-work__title-line" style="--line-index: 1">Real businesses.</span>
              <span class="featured-work__title-line featured-work__title-line--accent" style="--line-index: 2">Meaningful change.</span>
            </h2>
          </div>
          <a href="<?php echo esc_url(home_url('/work')); ?>" class="btn btn--outline btn--pill featured-work__cta">View all work <span class="btn-arrow">→</span></a>
        </header>
        <div class="featured-work__grid">
          <?php foreach ($featured_stories as $index => $story) : ?>
          <a class="work-card" href="<?php echo esc_url($story['link']); ?>" style="--card-index: <?php echo (int) $index; ?>">
            <figure class="work-card__media">
              <img src="<?php echo esc_url(gladhat_image_url($story['img'])); ?>" alt="<?php echo esc_attr($story['alt']); ?>" loading="lazy" width="1200" height="800">
            </figure>
            <h3 class="work-card__client"><?php echo esc_html($story['client']); ?></h3>
            <span class="work-card__link"><?php echo esc_html($story['title']); ?> <span class="work-card__arrow" aria-hidden="true">→</span></span>
          </a>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <section class="section thinking-teaser section-thinking-teaser" id="section-thinking-teaser" aria-label="Thinking">
      <div class="container thinking-teaser__grid">
        <h2 class="thinking-teaser__title">Thinking that makes a difference.</h2>
        <div class="thinking-teaser__intro">
          <p>Insights, ideas and perspectives on business, strategy and what it means to see things differently.</p>
          <a href="<?php echo esc_url(home_url('/theblog')); ?>" class="text-link">Explore our thinking <span aria-hidden="true">→</span></a>
        </div>
        <a class="thinking-teaser__card" href="<?php echo esc_url(home_url('/theblog')); ?>" id="thinking-featured-card">
          <figure class="thinking-teaser__card-media">
            <img src="<?php echo esc_url(gladhat_image_url('essence.png')); ?>" alt="" loading="lazy" width="800" height="800">
          </figure>
          <div class="thinking-teaser__card-body">
            <h3 class="thinking-teaser__card-title">When Clarity Beats Creativity</h3>
            <time class="thinking-teaser__card-date">Coming soon</time>
            <span class="thinking-teaser__card-arrow" aria-hidden="true">→</span>
          </div>
        </a>
      </div>
    </section>

    <?php gladhat_render_approach_spotlight(); ?>

    <?php gladhat_render_conversation_spotlight(); ?>

    <section class="pullquote pullquote--electric" aria-label="Pull quote">
      <p class="pullquote__text">An experienced outside perspective changes that—not because the outsider knows your business better than you do, but because they see different things.</p>
    </section>

    <section class="section whatif-section section-what-if" id="section-what-if" aria-label="What if">
      <div
        class="container"
        data-island="what-if"
        data-whatif-title="What if..."
        data-whatif-image="<?php echo esc_url(gladhat_image_url('whatif.png')); ?>"
        data-whatif-image-alt="A brilliant glowing golden portal representing new possibilities"
      >
        <div class="split reveal">
          <div class="split__text prose">
            <h2 class="whatif-title">What if...</h2>
            <p>What if your biggest opportunity isn't the one you're currently pursuing?</p>
            <p>What if your customers value something different from what you're talking about?</p>
            <p>What if the answer isn't more marketing, but <strong>seeing your business differently</strong>?</p>

            <hr class="separator">

            <p>Those are the conversations I enjoy most.</p>
            <p>Because once the way you see your business changes…</p>
            <p class="highlight-text">Everything else can change with it.</p>

            <div class="cta-row">
              <a href="<?php echo esc_url(home_url('/when-we-should-talk')); ?>" class="btn btn--primary btn--lg btn--pill" id="home-bottom-cta">
                When We Should Talk <span class="btn-arrow">→</span>
              </a>
            </div>
          </div>

          <div class="split__image reveal reveal--delay-2">
            <img src="<?php echo esc_url(gladhat_image_url('whatif.png')); ?>" alt="A brilliant glowing golden portal representing new possibilities" class="floating" loading="lazy">
          </div>
        </div>
      </div>
    </section>
<?php
get_footer();
