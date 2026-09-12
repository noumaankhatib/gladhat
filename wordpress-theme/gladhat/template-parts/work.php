<?php
/**
 * True Stories index — structure matches src/pages/TrueStories.js
 */
$hero_sub = gladhat_html('hero_subtitle', 'Every project begins with a conversation. Very few follow a perfectly straight line.');

$portfolio_meta = array(
  'server-factory' => array(
    'cover'          => 'epic_founders.png',
    'categories'     => 'strategy growth',
    'category_label' => 'Strategy',
    'outcome'        => 'Reshaped website and demand generation',
  ),
  'firstlight' => array(
    'cover'          => 'epic_essence.png',
    'categories'     => 'brand',
    'category_label' => 'Brand',
    'outcome'        => 'Clear name, message and brand',
  ),
  'tonbo' => array(
    'cover'          => 'epic_connecting.png',
    'categories'     => 'leadership strategy',
    'category_label' => 'Leadership',
    'outcome'        => 'Strategic thinking recognised and valued',
  ),
  'ensights' => array(
    'cover'          => 'epic_beyond.png',
    'categories'     => 'growth strategy',
    'category_label' => 'Growth',
    'outcome'        => 'Clearer thought leadership and outreach',
  ),
  'provengo' => array(
    'cover'          => 'epic_curiosity.png',
    'categories'     => 'brand strategy',
    'category_label' => 'Brand',
    'outcome'        => 'Clearer story for investors and customers',
  ),
);

$filters = array(
  array('id' => 'all', 'label' => 'All'),
  array('id' => 'strategy', 'label' => 'Strategy'),
  array('id' => 'brand', 'label' => 'Brand'),
  array('id' => 'growth', 'label' => 'Growth'),
  array('id' => 'leadership', 'label' => 'Leadership'),
);

$stories = array();
foreach (gladhat_story_defaults() as $index => $default) {
  $page = get_page_by_path($default['slug']);
  $id   = $page ? (int) $page->ID : 0;
  $meta = $portfolio_meta[$default['slug']] ?? array();
  $stories[] = array(
    'subtitle'       => $id ? (gladhat_meta('story_subtitle', $default['subtitle'], $id) ?: $default['subtitle']) : $default['subtitle'],
    'title'          => $id ? (gladhat_meta('story_card_title', $default['title'], $id) ?: $default['title']) : $default['title'],
    'url'            => $id ? get_permalink($id) : home_url('/' . $default['slug']),
    'cover'          => gladhat_image_url($meta['cover'] ?? $default['img'], $id ?: get_queried_object_id()),
    'categories'     => $meta['categories'] ?? 'strategy',
    'category_label' => $meta['category_label'] ?? 'Strategy',
    'outcome'        => $meta['outcome'] ?? '',
  );
}
?>
    <section class="section work-page-hero" id="work-hero" aria-label="Work">
      <div class="container">
        <div class="work-page-hero__header">
          <div class="work-page-hero__copy">
            <h1 class="work-page-hero__title">
              <span class="work-page-hero__title-line">True stories.</span>
              <span class="work-page-hero__title-line">Real businesses.</span>
              <span class="work-page-hero__title-line">Meaningful change.</span>
            </h1>
            <p class="work-page-hero__subtitle"><?php echo $hero_sub; ?></p>
          </div>
          <a href="<?php echo esc_url(home_url('/more-stories')); ?>" class="btn btn--outline btn--pill work-page-hero__cta">More stories <span class="btn-arrow">→</span></a>
        </div>
      </div>
    </section>

    <section class="section work-portfolio" id="work-portfolio" aria-label="Case studies">
      <div class="container">
        <div class="work-filters" role="tablist" aria-label="Filter case studies">
          <?php foreach ($filters as $i => $filter) : ?>
            <button
              type="button"
              class="work-filter<?php echo $i === 0 ? ' work-filter--active' : ''; ?>"
              data-work-filter="<?php echo esc_attr($filter['id']); ?>"
              role="tab"
              aria-selected="<?php echo $i === 0 ? 'true' : 'false'; ?>"
              id="work-filter-<?php echo esc_attr($filter['id']); ?>"
            ><?php echo esc_html($filter['label']); ?></button>
          <?php endforeach; ?>
        </div>

        <div class="work-portfolio-grid" data-work-grid>
          <?php
          $card_index = 0;
          foreach ($stories as $s) :
            if ($card_index === 2) :
          ?>
          <blockquote class="work-testimonial-card" data-work-item="testimonial" aria-label="Client perspective">
            <p class="work-testimonial-card__quote">An experienced outside perspective changes that—not because the outsider knows your business better than you do, but because they see different things.</p>
            <footer class="work-testimonial-card__cite">
              <span class="work-testimonial-card__name">Gladhat philosophy</span>
              <span class="work-testimonial-card__role">The thinking behind every project</span>
            </footer>
          </blockquote>
          <?php
            endif;
          ?>
          <a
            class="work-portfolio-card"
            href="<?php echo esc_url($s['url']); ?>"
            data-categories="<?php echo esc_attr($s['categories']); ?>"
            data-work-item="story"
          >
            <figure class="work-portfolio-card__media">
              <img src="<?php echo esc_url($s['cover']); ?>" alt="" loading="lazy" width="1200" height="800">
            </figure>
            <div class="work-portfolio-card__body">
              <span class="work-portfolio-card__category"><?php echo esc_html($s['category_label']); ?></span>
              <h3 class="work-portfolio-card__client"><?php echo esc_html($s['subtitle']); ?></h3>
              <p class="work-portfolio-card__outcome"><?php echo esc_html($s['outcome']); ?></p>
              <span class="work-portfolio-card__link"><?php echo esc_html($s['title']); ?> <span aria-hidden="true">→</span></span>
            </div>
          </a>
          <?php
            $card_index++;
          endforeach;
          ?>
        </div>
      </div>
    </section>

    <section class="section work-intro" id="stories-intro">
      <div class="container">
        <div class="split reveal">
          <div class="split__text prose">
            <p>The useful moments are often the ones in which a question changes the brief, a hidden strength becomes visible or a complicated idea finally becomes clear.</p>
            <p>That is why I do not think of what follows simply as case studies.</p>
            <p class="highlight-text">They are true stories about the thinking behind the work, what changed along the way and what emerged.</p>
            <p>The industries, challenges and outcomes are different. The underlying approach is consistent:</p>
            <ul class="prose-list prose-list--compact">
              <li>✦ Listen carefully &amp; ask pertinent questions</li>
              <li>✦ Challenge assumptions</li>
              <li>✦ Uncover what is already there</li>
              <li>✦ Connect the dots &amp; create something that matches the truth</li>
            </ul>
          </div>
          <div class="split__image reveal reveal--delay-2">
            <img src="<?php echo esc_url(gladhat_image_url('stories.png')); ?>" alt="Open Book" loading="lazy">
          </div>
        </div>
      </div>
    </section>

    <section class="pullquote pullquote--ink" aria-label="Pull quote">
      <p class="pullquote__text">They are true stories about the thinking behind the work, what changed along the way and what emerged.</p>
    </section>
