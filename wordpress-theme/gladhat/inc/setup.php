<?php
/**
 * Create pages, menus and starter posts when the theme is first activated.
 * Does not modify the original Vite site.
 */

function gladhat_pages_manifest() {
  return array(
    array(
      'title'    => 'Home',
      'slug'     => 'home',
      'is_front' => true,
      'meta'     => array(
        'title'       => 'Commercial Strategy Consultant for Founders | Gladhat',
        'description' => 'Commercial strategy consultant helping founders use customer insight, positioning and clear messaging to uncover opportunities and make better decisions.',
      ),
    ),
    array(
      'title' => 'When We Should Talk',
      'slug'  => 'when-we-should-talk',
      'meta'  => array(
        'title'       => 'When to Talk to a Commercial Strategy Consultant | Gladhat',
        'description' => 'Recognise the moments when an outside perspective can clarify your positioning, reveal opportunities and help you decide what to do next.',
      ),
    ),
    array(
      'title' => 'Working Together',
      'slug'  => 'working-together',
      'meta'  => array(
        'title'       => 'How I Work with Founders | Gladhat',
        'description' => 'Explore a collaborative consulting process built on listening, research, respectful challenge and practical commercial thinking.',
      ),
    ),
    array(
      'title' => 'True Stories',
      'slug'  => 'work',
      'meta'  => array(
        'title'       => 'Commercial Strategy and Messaging Stories | Gladhat',
        'description' => 'Stories from real projects where customer research, positioning and clearer communication changed the direction and value of the work.',
      ),
    ),
    array(
      'title' => 'Server Factory',
      'slug'  => 'server-factory',
      'meta'  => array(
        'title'       => 'Server Factory: Seeing Through the Buyer\'s Eyes | Gladhat',
        'description' => 'How customer and competitor research helped Server Factory support different buyers, clarify its value and reshape its website and demand generation.',
      ),
    ),
    array(
      'title' => 'First Light',
      'slug'  => 'firstlight',
      'meta'  => array(
        'title'       => 'First Light: Finding the Right Language | Gladhat',
        'description' => 'How research and close collaboration translated a vision connecting technology, nature and wellbeing into a clear name, message and brand.',
      ),
    ),
    array(
      'title' => 'Tonbo',
      'slug'  => 'tonbo',
      'meta'  => array(
        'title'       => 'Tonbo: Recognising the Value of Thinking | Gladhat',
        'description' => 'A candid story about strategic thinking, invisible value and the project that changed how I define, structure and price my work.',
      ),
    ),
    array(
      'title' => 'enSights',
      'slug'  => 'ensights',
      'meta'  => array(
        'title'       => 'enSights: Connecting Expertise with Understanding | Gladhat',
        'description' => 'How technical expertise and persistent questioning became clearer thought leadership, customer communication and commercial outreach for enSights.',
      ),
    ),
    array(
      'title' => 'Provengo',
      'slug'  => 'provengo',
      'meta'  => array(
        'title'       => 'Provengo: Simplifying a Complex Technology Story | Gladhat',
        'description' => 'How Provengo\'s sophisticated systems-engineering platform was translated into a clearer story for investors, product teams and customers.',
      ),
    ),
    array(
      'title' => 'More Stories',
      'slug'  => 'more-stories',
      'meta'  => array(
        'title'       => 'More Strategy, Messaging and Brand Work | Gladhat',
        'description' => 'A broader selection of positioning, messaging, website and campaign work across technology, education, wellbeing and professional services.',
      ),
    ),
    array(
      'title' => 'See Your Business Differently',
      'slug'  => 'see-your-business-differently',
      'meta'  => array(
        'title'       => 'Business Clarity Exercises for Founders | Gladhat',
        'description' => 'Six reflective business exercises to help founders see their value, messaging, assumptions and hidden commercial opportunities more clearly.',
      ),
    ),
    array(
      'title' => 'Who am I?',
      'slug'  => 'about',
      'meta'  => array(
        'title'       => 'Michael Simkin | Commercial Strategy Consultant | Gladhat',
        'description' => 'Meet Michael Simkin, a commercial strategy consultant combining customer insight, positioning, writing and curiosity to help founders see clearly.',
      ),
    ),
    array(
      'title' => 'Ready for a chat?',
      'slug'  => 'contact',
      'meta'  => array(
        'title'       => 'Contact Michael Simkin | Gladhat',
        'description' => 'Tell me about your business, what feels stuck and what you are trying to achieve. Book a relaxed introductory conversation with Michael Simkin.',
      ),
    ),
    array(
      'title' => 'Thoughts',
      'slug'  => 'theblog',
      'meta'  => array(
        'title'       => 'Ideas on Business, Positioning and Communication | Gladhat',
        'description' => 'Articles and observations on business clarity, positioning, customer psychology, communication and the human side of commercial decisions.',
      ),
    ),
    array(
      'title' => 'Privacy Policy',
      'slug'  => 'privacy',
      'meta'  => array(
        'title'       => 'Privacy Policy | Gladhat',
        'description' => 'How Gladhat collects, uses and protects personal information shared through this website.',
      ),
    ),
    array(
      'title' => 'Terms of Use',
      'slug'  => 'terms',
      'meta'  => array(
        'title'       => 'Terms of Use | Gladhat',
        'description' => 'Terms governing use of the Gladhat website.',
      ),
    ),
    array(
      'title' => 'Cookie Policy',
      'slug'  => 'cookie-policy',
      'meta'  => array(
        'title'       => 'Cookie Policy | Gladhat',
        'description' => 'How cookies and similar technologies may be used on gladhat.com.',
      ),
    ),
    array(
      'title' => 'Disclaimer',
      'slug'  => 'disclaimer',
      'meta'  => array(
        'title'       => 'Disclaimer | Gladhat',
        'description' => 'Website disclaimer for gladhat.com.',
      ),
    ),
  );
}

function gladhat_get_page_id_by_slug($slug) {
  $page = get_page_by_path($slug);
  return $page ? (int) $page->ID : 0;
}

function gladhat_seed_pages() {
  $front_id = 0;

  foreach (gladhat_pages_manifest() as $item) {
    $existing = get_page_by_path($item['slug']);
    if ($existing) {
      if (!empty($item['is_front'])) {
        $front_id = (int) $existing->ID;
      }
      continue;
    }

    $id = wp_insert_post(array(
      'post_title'   => $item['title'],
      'post_name'    => $item['slug'],
      'post_status'  => 'publish',
      'post_type'    => 'page',
      'post_content' => '',
    ), true);

    if (is_wp_error($id) || !$id) {
      continue;
    }

    update_post_meta($id, '_gladhat_seo_title', $item['meta']['title']);
    update_post_meta($id, '_gladhat_seo_description', $item['meta']['description']);

    if (!empty($item['is_front'])) {
      $front_id = (int) $id;
    }
  }

  if ($front_id) {
    update_option('show_on_front', 'page');
    update_option('page_on_front', $front_id);
  }

  $blog = get_page_by_path('theblog');
  if ($blog) {
    update_option('page_for_posts', 0);
  }
}

function gladhat_seed_menu() {
  $menu_name = 'Gladhat Primary';
  $menu = wp_get_nav_menu_object($menu_name);
  if ($menu) {
    $locations = get_theme_mod('nav_menu_locations', array());
    if (empty($locations['primary'])) {
      $locations['primary'] = (int) $menu->term_id;
      set_theme_mod('nav_menu_locations', $locations);
    }
    return;
  }

  $menu_id = wp_create_nav_menu($menu_name);
  if (is_wp_error($menu_id)) {
    return;
  }

  foreach (gladhat_default_nav_items() as $item) {
    $page = get_page_by_path(ltrim($item['path'], '/'));
    wp_update_nav_menu_item($menu_id, 0, array(
      'menu-item-title'     => $item['label'],
      'menu-item-object'    => $page ? 'page' : '',
      'menu-item-object-id' => $page ? $page->ID : 0,
      'menu-item-type'      => $page ? 'post_type' : 'custom',
      'menu-item-url'       => $page ? get_permalink($page) : home_url($item['path']),
      'menu-item-status'    => 'publish',
    ));
  }

  $locations = get_theme_mod('nav_menu_locations', array());
  $locations['primary'] = (int) $menu_id;
  set_theme_mod('nav_menu_locations', $locations);
}

function gladhat_seed_thoughts() {
  if (get_option('gladhat_seeded_thoughts')) {
    return;
  }

  $existing = get_posts(array(
    'post_type'      => 'post',
    'posts_per_page' => 1,
    'post_status'    => 'any',
    'fields'         => 'ids',
  ));
  if ($existing) {
    update_option('gladhat_seeded_thoughts', 1);
    return;
  }

  foreach (gladhat_thought_defaults() as $index => $article) {
    $id = wp_insert_post(array(
      'post_title'   => $article['title'],
      'post_excerpt' => $article['excerpt'],
      'post_status'  => 'publish',
      'post_type'    => 'post',
      'post_content' => '',
      'menu_order'   => $index,
    ));
    if ($id && !is_wp_error($id)) {
      update_post_meta($id, '_gladhat_coming_soon', '1');
      wp_set_post_tags($id, $article['tag'], false);
    }
  }

  update_option('gladhat_seeded_thoughts', 1);
}

function gladhat_seed_projects() {
  if (get_option('gladhat_seeded_projects')) {
    return;
  }

  foreach (gladhat_more_project_defaults() as $index => $project) {
    $id = wp_insert_post(array(
      'post_title'  => $project['name'],
      'post_status' => 'publish',
      'post_type'   => 'gladhat_project',
      'menu_order'  => $index,
    ));
    if ($id && !is_wp_error($id)) {
      update_post_meta($id, '_gladhat_tagline', $project['tagline']);
      update_post_meta($id, '_gladhat_description', $project['description']);
    }
  }

  update_option('gladhat_seeded_projects', 1);
}

function gladhat_on_theme_activation() {
  if (defined('GLADHAT_CORE_VERSION')) {
    flush_rewrite_rules();
    return;
  }

  gladhat_seed_pages();
  gladhat_seed_menu();
  gladhat_seed_thoughts();
  gladhat_seed_projects();

  if (!get_option('permalink_structure')) {
    update_option('permalink_structure', '/%postname%/');
  }
  flush_rewrite_rules();
}
add_action('after_switch_theme', 'gladhat_on_theme_activation');
