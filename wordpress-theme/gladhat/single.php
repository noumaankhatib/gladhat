<?php
get_header();

if (have_posts()) {
  while (have_posts()) {
    the_post();
    $tags = get_the_tags();
    $tag  = ($tags && !is_wp_error($tags)) ? $tags[0]->name : '';
    ?>
    <section class="hero" style="min-height: 55vh;">
      <div class="hero__bg"></div>
      <div class="container">
        <div class="hero__content">
          <span class="hero__label"><?php echo $tag ? esc_html($tag) : 'Thoughts'; ?></span>
          <h1 class="hero__title"><?php the_title(); ?></h1>
          <p class="hero__subtitle"><?php echo esc_html(get_the_date()); ?></p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="prose reveal">
          <?php the_content(); ?>
          <div style="margin-top: var(--space-3xl);">
            <a href="<?php echo esc_url(home_url('/theblog')); ?>" class="btn btn--outline">← Back to Thoughts</a>
          </div>
        </div>
      </div>
    </section>
    <?php
  }
}

get_footer();
