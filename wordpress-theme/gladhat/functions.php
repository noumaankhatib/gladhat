<?php
/**
 * Gladhat WordPress theme — preserves the existing frontend.
 * Original Vite site in the project root is not modified.
 */

if (!defined('ABSPATH')) {
  exit;
}

require_once get_template_directory() . '/inc/helpers.php';
require_once get_template_directory() . '/inc/cpt.php';
require_once get_template_directory() . '/inc/setup.php';
require_once get_template_directory() . '/inc/customizer.php';
require_once get_template_directory() . '/inc/admin.php';
require_once get_template_directory() . '/template-parts/logo.php';
require_once get_template_directory() . '/template-parts/conversation-spotlight.php';
require_once get_template_directory() . '/template-parts/approach-spotlight.php';

add_action('after_setup_theme', function () {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script'));
  add_theme_support('custom-logo', array(
    'height'      => 42,
    'width'       => 180,
    'flex-height' => true,
    'flex-width'  => true,
  ));
  register_nav_menus(array(
    'primary' => 'Primary navigation',
  ));
  remove_post_type_support('page', 'editor');
});

add_filter('use_block_editor_for_post_type', function ($use, $type) {
  if ($type === 'page') {
    return false;
  }
  return $use;
}, 10, 2);

add_action('wp_enqueue_scripts', function () {
  wp_dequeue_style('wp-block-library');
  wp_dequeue_style('wp-block-library-theme');
  wp_dequeue_style('global-styles');
  wp_dequeue_style('classic-theme-styles');
  wp_dequeue_style('wp-block-library-css');
}, 100);

add_action('wp_enqueue_scripts', function () {
  $ver = wp_get_theme()->get('Version');
  $dir = get_template_directory_uri();

  wp_enqueue_style('gladhat-fonts', $dir . '/assets/css/fonts.css', array(), $ver);
  wp_enqueue_style('gladhat-variables', $dir . '/assets/css/variables.css', array('gladhat-fonts'), $ver);
  wp_enqueue_style('gladhat-reset', $dir . '/assets/css/reset.css', array('gladhat-variables'), $ver);
  wp_enqueue_style('gladhat-components', $dir . '/assets/css/components.css', array('gladhat-reset'), $ver);
  wp_enqueue_style('gladhat-layout', $dir . '/assets/css/layout.css', array('gladhat-components'), $ver);
  wp_enqueue_style('gladhat-grid', $dir . '/assets/css/grid.css', array('gladhat-layout'), $ver);
  wp_enqueue_style('gladhat-refinement', $dir . '/assets/css/refinement.css', array('gladhat-grid'), $ver);
  wp_enqueue_style('gladhat-editorial', $dir . '/assets/css/editorial.css', array('gladhat-refinement'), $ver);
  wp_enqueue_style('gladhat-when-talk', $dir . '/assets/css/when-talk.css', array('gladhat-editorial'), $ver);
  wp_enqueue_style('gladhat-compat', $dir . '/assets/css/wordpress-compat.css', array('gladhat-when-talk'), $ver);
  wp_enqueue_script('gladhat-theme', $dir . '/assets/js/theme.js', array(), $ver, true);

  $islands = get_template_directory() . '/assets/js/islands.js';
  if (file_exists($islands)) {
    wp_enqueue_script('gladhat-islands', $dir . '/assets/js/islands.js', array(), $ver, true);
  }
});

add_filter('script_loader_tag', function ($html, $handle) {
  if ($handle === 'gladhat-islands') {
    return str_replace('<script ', '<script type="module" ', $html);
  }
  return $html;
}, 10, 2);

add_filter('style_loader_tag', function ($html, $handle) {
  return $html;
}, 10, 2);

add_action('wp_head', function () {
  $font_uri = get_template_directory_uri() . '/assets/fonts/';
  echo '<link rel="preload" href="' . esc_url($font_uri . 'fraunces-latin.woff2') . '" as="font" type="font/woff2" crossorigin>' . "\n";
  echo '<link rel="preload" href="' . esc_url($font_uri . 'manrope-latin-400.woff2') . '" as="font" type="font/woff2" crossorigin>' . "\n";
  $favicon = gladhat_asset('favicon.svg');
  echo '<link rel="icon" type="image/svg+xml" href="' . esc_url($favicon) . '">' . "\n";

  if (function_exists('gladhat_meta_description')) {
    return;
  }

  $post_id = get_queried_object_id();
  $title = $post_id ? get_post_meta($post_id, '_gladhat_seo_title', true) : '';
  $desc  = $post_id ? get_post_meta($post_id, '_gladhat_seo_description', true) : '';
  if (!$title) {
    $title = wp_get_document_title();
  }
  if (!$desc) {
    $desc = get_bloginfo('description');
  }
  $url = get_permalink() ?: home_url('/');
  $image = gladhat_image_url('logo_3d.png');

  echo '<meta name="description" content="' . esc_attr($desc) . '">' . "\n";
  echo '<link rel="canonical" href="' . esc_url($url) . '">' . "\n";
  echo '<meta property="og:type" content="website">' . "\n";
  echo '<meta property="og:url" content="' . esc_url($url) . '">' . "\n";
  echo '<meta property="og:title" content="' . esc_attr($title) . '">' . "\n";
  echo '<meta property="og:description" content="' . esc_attr($desc) . '">' . "\n";
  echo '<meta property="og:image" content="' . esc_url($image) . '">' . "\n";
  echo '<meta property="og:site_name" content="Gladhat">' . "\n";
  echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
  echo '<meta name="twitter:url" content="' . esc_url($url) . '">' . "\n";
  echo '<meta name="twitter:title" content="' . esc_attr($title) . '">' . "\n";
  echo '<meta name="twitter:description" content="' . esc_attr($desc) . '">' . "\n";
  echo '<meta name="twitter:image" content="' . esc_url($image) . '">' . "\n";

  $schema = array(
    '@context' => 'https://schema.org',
    '@type'    => 'ProfessionalService',
    'name'     => 'Gladhat',
    'url'      => home_url('/'),
    'logo'     => $image,
    'image'    => $image,
    'description' => 'Commercial strategy consultancy helping founders use customer insight, positioning and clear messaging to uncover opportunities and make better decisions.',
    'founder'  => array(
      '@type'    => 'Person',
      'name'     => 'Michael Simkin',
      'jobTitle' => 'Commercial Strategy Consultant',
    ),
    'email'    => 'mailto:' . gladhat_email(),
  );
  echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>' . "\n";
}, 1);

if (!function_exists('gladhat_document_title_parts')) {
  add_filter('document_title_parts', function ($parts) {
    $post_id = get_queried_object_id();
    if ($post_id) {
      $custom = get_post_meta($post_id, '_gladhat_seo_title', true);
      if ($custom) {
        return array('title' => $custom);
      }
    }
    return $parts;
  });
}
