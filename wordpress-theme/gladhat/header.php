<?php
if (!defined('ABSPATH')) {
  exit;
}

$nav_items = gladhat_nav_items_resolved();
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="keywords" content="commercial strategy consultant, positioning consultant, B2B messaging strategy, founder advisory, customer insight, commercial narrative, Gladhat, Michael Simkin">
  <meta name="author" content="Michael Simkin">
  <meta name="robots" content="index, follow">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="motion-portal"></div>
<div id="app">
    <header class="site-header<?php echo is_front_page() ? ' site-header--over-hero' : ' site-header--solid'; ?>" id="site-header" role="banner">
      <div class="container header-bar">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="logo" id="logo-link" aria-label="Gladhat — make it meaningful">
          <?php gladhat_render_logo(array('variant' => 'header')); ?>
        </a>

        <nav class="nav" id="main-nav" role="navigation" aria-label="Main navigation">
          <?php foreach ($nav_items as $item) :
            $active = gladhat_nav_is_current($item['path']) ? ' nav__link--active' : '';
            $id = 'nav-' . sanitize_title($item['label']);
          ?>
            <a href="<?php echo esc_url($item['url']); ?>" class="nav__link<?php echo esc_attr($active); ?>" id="<?php echo esc_attr($id); ?>">
              <?php echo esc_html($item['label']); ?>
            </a>
          <?php endforeach; ?>
        </nav>

        <div class="header-end">
          <a href="<?php echo esc_url(home_url('/contact')); ?>" class="btn btn--primary btn--sm btn--pill nav__cta" id="nav-cta">
            <?php echo esc_html(get_theme_mod('gladhat_footer_cta_label', "Let's Talk")); ?> <span class="btn-arrow">→</span>
          </a>
          <button class="menu-toggle" id="menu-toggle" aria-label="Toggle menu" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <nav class="mobile-nav" id="mobile-nav" role="navigation" aria-label="Mobile navigation">
        <?php foreach ($nav_items as $item) :
          $active = gladhat_nav_is_current($item['path']) ? ' mobile-nav__link--active' : '';
        ?>
          <a href="<?php echo esc_url($item['url']); ?>" class="mobile-nav__link<?php echo esc_attr($active); ?>">
            <?php echo esc_html($item['label']); ?>
          </a>
        <?php endforeach; ?>
        <a href="<?php echo esc_url(home_url('/contact')); ?>" class="btn btn--primary mobile-nav__cta">
          <?php echo esc_html(get_theme_mod('gladhat_footer_cta_label', 'Begin the Conversation')); ?>
        </a>
      </nav>
      <span
        class="sr-only"
        data-island="header-effects"
        data-is-home="<?php echo is_front_page() ? 'true' : 'false'; ?>"
        aria-hidden="true"
      ></span>
    </header>
    <div style="height: var(--header-height);"></div>
    <main id="main-content" class="page-transition">
