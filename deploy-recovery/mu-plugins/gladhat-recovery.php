<?php
/**
 * Emergency recovery — drop this file in wp-content/mu-plugins/ to regain admin access.
 * Delete after uploading fixed gladhat-core + gladhat theme zips.
 */

if (!defined('ABSPATH')) {
  exit;
}

add_filter('option_active_plugins', function ($plugins) {
  if (!is_array($plugins)) {
    return $plugins;
  }
  return array_values(array_filter($plugins, function ($plugin) {
    return strpos($plugin, 'gladhat-core') === false;
  }));
});

add_filter('template', function () {
  return 'twentytwentyfour';
});

add_filter('stylesheet', function () {
  return 'twentytwentyfour';
});
