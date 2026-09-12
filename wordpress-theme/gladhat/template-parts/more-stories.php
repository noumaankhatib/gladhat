<?php
$hero_label = gladhat_text('hero_label', 'True Stories');
$hero_title = gladhat_html('hero_title', 'More <span class="accent">Stories</span>');
$hero_sub   = gladhat_html('hero_subtitle', 'Not every project becomes a full story. Sometimes the lesson is smaller. Sometimes the work speaks for itself.');

$query = new WP_Query(array(
  'post_type'      => 'gladhat_project',
  'posts_per_page' => -1,
  'orderby'        => 'menu_order',
  'order'          => 'ASC',
  'post_status'    => 'publish',
));

$projects = array();
if ($query->have_posts()) {
  while ($query->have_posts()) {
    $query->the_post();
    $projects[] = array(
      'name'        => get_the_title(),
      'tagline'     => get_post_meta(get_the_ID(), '_gladhat_tagline', true),
      'description' => get_post_meta(get_the_ID(), '_gladhat_description', true),
    );
  }
  wp_reset_postdata();
}

if (!$projects) {
  $projects = gladhat_more_project_defaults();
}
?>
    <section class="hero" id="more-hero" style="min-height: 50vh;">
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

    <section class="section" id="more-intro">
      <div class="container">
        <div class="prose reveal">
          <p>Here are a few other businesses I've had the pleasure of working with over the years.</p>
        </div>
      </div>
    </section>

    <section class="section section--alt" id="more-grid">
      <div class="container">
        <div class="grid grid--3">
          <?php foreach ($projects as $i => $p) :
            $slug = sanitize_title($p['name']);
            $delay = ($i % 3) + 1;
          ?>
    <div class="card reveal reveal--delay-<?php echo (int) $delay; ?>" id="more-project-<?php echo esc_attr($slug); ?>">
      <div class="card__label"><?php echo esc_html($p['name']); ?></div>
      <h3 class="card__title"><?php echo esc_html($p['tagline']); ?></h3>
      <p class="card__text"><?php echo esc_html($p['description']); ?></p>
    </div>
          <?php endforeach; ?>
        </div>

        <div style="margin-top: var(--space-4xl); text-align: center;">
          <a href="<?php echo esc_url(home_url('/work')); ?>" class="btn btn--outline" id="more-back-btn">
            ← Back to True Stories
          </a>
        </div>
      </div>
    </section>
