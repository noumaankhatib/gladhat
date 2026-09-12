<?php
$hero_label = gladhat_text('hero_label', 'Gladhat');
$hero_title = gladhat_html('hero_title', '<span class="accent">Thoughts</span>');
$hero_sub   = gladhat_html('hero_subtitle', 'Questions, patterns and observations that shape the way I think about business, communication and the people behind them.');

$posts = get_posts(array(
  'post_type'      => 'post',
  'posts_per_page' => 12,
  'orderby'        => array('menu_order' => 'ASC', 'date' => 'ASC'),
));

$articles = array();
if ($posts) {
  foreach ($posts as $p) {
    $tags = get_the_tags($p->ID);
    $tag  = ($tags && !is_wp_error($tags)) ? $tags[0]->name : '';
    $coming = get_post_meta($p->ID, '_gladhat_coming_soon', true) || !trim($p->post_content);
    $articles[] = array(
      'title'   => get_the_title($p),
      'excerpt' => $p->post_excerpt ?: wp_trim_words(wp_strip_all_tags($p->post_content), 32),
      'date'    => $coming ? 'Coming soon' : get_the_date('', $p),
      'tag'     => $tag,
      'url'     => $coming ? '' : get_permalink($p),
    );
  }
}

if (count($articles) < 6) {
  $articles = gladhat_thought_defaults();
  foreach ($articles as &$a) {
    $a['url'] = '';
  }
  unset($a);
}

$featured = $articles[0];
$rest     = array_slice($articles, 1);
?>
    <section class="hero" id="thoughts-hero" style="min-height: 55vh;">
      <div class="hero__bg"></div>
      <div class="container">
        <div class="hero__content">
          <span class="hero__label"><?php echo $hero_label; ?></span>
          <h1 class="hero__title"><?php echo $hero_title; ?></h1>
          <p class="hero__subtitle">
            <?php echo $hero_sub; ?>
          </p>
        </div>
      </div>
    </section>

    <section class="section" id="thoughts-intro">
      <div class="container">
        <div class="split reveal" style="align-items: center;">
          <div class="split__text prose" style="max-width: none;">
            <p>Some ideas arrive during client conversations.</p>
            <p>Others appear while walking, reading or quietly staring out of the window with a cup of coffee.</p>
            <p>This is where I explore the questions, patterns and observations that shape the way I think about business, communication and the people behind them.</p>
            <p class="highlight-text">If one of these articles starts a conversation or helps you see something a little differently, then it has done its job.</p>
          </div>
          <div class="split__image reveal reveal--delay-2">
            <img src="<?php echo esc_url(gladhat_image_url('silhouette.png')); ?>" alt="Silhouette" loading="lazy" style="border-radius: var(--radius-lg); box-shadow: var(--shadow-glow);">
          </div>
        </div>
      </div>
    </section>

    <section class="section section--alt" id="thoughts-grid">
      <div class="container">

        <div class="section-header reveal">
          <span class="section-header__label">Featured</span>
          <h2 class="section-header__title">Latest <span class="accent">Thinking</span></h2>
        </div>

        <div class="split split--reverse reveal" style="align-items: center; background: rgba(255,255,255,0.02); padding: var(--space-4xl); border-radius: var(--radius-lg); border: 1px solid rgba(255,255,255,0.05); margin-bottom: var(--space-6xl);">
          <div class="split__text prose">
            <div class="card__label" style="margin-bottom: var(--space-sm); font-size: var(--fs-sm);"><?php echo esc_html($featured['tag']); ?></div>
            <h2 style="font-size: var(--fs-2xl); color: var(--color-heading); margin-bottom: var(--space-md);"><?php echo esc_html($featured['title']); ?></h2>
            <p style="font-size: var(--fs-lg); color: var(--color-text-muted); margin-bottom: var(--space-lg); line-height: var(--lh-body);"><?php echo esc_html($featured['excerpt']); ?></p>
            <?php if (!empty($featured['url'])) : ?>
            <a href="<?php echo esc_url($featured['url']); ?>" class="card__link" style="color: var(--color-accent); font-weight: var(--fw-medium); text-transform: uppercase; letter-spacing: var(--ls-wide);">
              <?php echo esc_html($featured['date']); ?> <span class="arrow">→</span>
            </a>
            <?php else : ?>
            <span class="card__link" style="opacity: 0.5; color: var(--color-accent); font-weight: var(--fw-medium); text-transform: uppercase; letter-spacing: var(--ls-wide);">
              <?php echo esc_html($featured['date']); ?> <span class="arrow">→</span>
            </span>
            <?php endif; ?>
          </div>
          <div class="split__image reveal reveal--delay-2">
            <img src="<?php echo esc_url(gladhat_image_url('curiosity.png')); ?>" alt="Featured Article" loading="lazy" style="border-radius: var(--radius-md); box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
          </div>
        </div>

        <div class="grid grid--2">
          <?php foreach ($rest as $i => $a) :
            $delay = ($i % 4) + 1;
          ?>
    <article class="card reveal reveal--delay-<?php echo (int) $delay; ?>" id="thought-<?php echo (int) ($i + 2); ?>">
      <div class="card__label"><?php echo esc_html($a['tag']); ?></div>
      <h3 class="card__title"><?php echo esc_html($a['title']); ?></h3>
      <p class="card__text"><?php echo esc_html($a['excerpt']); ?></p>
      <?php if (!empty($a['url'])) : ?>
      <a href="<?php echo esc_url($a['url']); ?>" class="card__link">
        <?php echo esc_html($a['date']); ?> <span class="arrow">→</span>
      </a>
      <?php else : ?>
      <span class="card__link" style="opacity: 0.5;">
        <?php echo esc_html($a['date']); ?> <span class="arrow">→</span>
      </span>
      <?php endif; ?>
    </article>
          <?php endforeach; ?>
        </div>
      </div>
    </section>
