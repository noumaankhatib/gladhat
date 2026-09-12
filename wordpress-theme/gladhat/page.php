<?php
/**
 * Routes each Gladhat page to the matching frontend template.
 */

get_header();

if (have_posts()) {
  while (have_posts()) {
    the_post();
    $slug = get_post_field('post_name', get_the_ID());

    $static = array(
      'when-we-should-talk'           => 'whentotalk',
      'working-together'              => 'workingtogether',
      'see-your-business-differently' => 'seedifferently',
      'about'                         => 'about',
      'contact'                       => 'contact',
      'server-factory'                => 'serverfactory',
      'firstlight'                    => 'firstlight',
      'tonbo'                         => 'tonbo',
      'ensights'                      => 'ensights',
      'provengo'                      => 'provengo',
    );

    if ($slug === 'work') {
      get_template_part('template-parts/work');
    } elseif ($slug === 'more-stories') {
      get_template_part('template-parts/more-stories');
    } elseif ($slug === 'theblog') {
      get_template_part('template-parts/thoughts');
    } elseif (in_array($slug, array('privacy', 'terms', 'cookie-policy', 'disclaimer'), true)) {
      get_template_part('template-parts/legal', null, array('page' => $slug));
    } elseif (isset($static[$slug])) {
      gladhat_render_static($static[$slug]);
    } else {
      echo '<section class="section"><div class="container"><div class="prose">';
      the_title('<h1 class="hero__title">', '</h1>');
      echo '</div></div></section>';
    }
  }
}

get_footer();
