<?php
/**
 * Client-facing editors: images, SEO, section copy, story cards, extra projects.
 * Layout, CSS and HTML structure stay in the theme files.
 */

function gladhat_page_image_keys($slug) {
  $map = array(
    'home' => array(
      'logos/server_factory.png' => 'Marquee: Server Factory',
      'logos/first_light.png'    => 'Marquee: First Light',
      'logos/tonbo.png'          => 'Marquee: Tonbo',
      'logos/ensights.png'       => 'Marquee: enSights',
      'logos/provengo.svg'       => 'Marquee: Provengo',
      'epic_founders.png'        => 'Philosophy 01',
      'epic_beyond.png'          => 'Philosophy 02',
      'epic_essence.png'         => 'Philosophy 03',
      'epic_connecting.png'      => 'Philosophy 04',
      'epic_curiosity.png'       => 'Philosophy 05',
      'whatif.png'               => 'What if image',
    ),
    'when-we-should-talk' => array(
      'conversation.png'       => 'Intro',
      'perspective_prism.png'  => 'Too close',
      'essence.png'            => 'Message',
      'whatif.png'             => 'Decisions',
      'beyond.png'             => 'Opportunity',
      'connecting.png'         => 'Thinking partner',
      'research.png'           => 'What happens next',
    ),
    'working-together' => array(
      'research.png'           => 'Intro',
      'essence.png'            => 'Listening',
      'perspective_prism.png'  => 'Looking together',
      'conversation.png'       => 'Challenging ideas',
      'connecting.png'         => 'Connecting the dots',
      'whatif.png'             => 'Creating what matters',
    ),
    'work' => array(
      'stories.png' => 'Intro image',
    ),
    'see-your-business-differently' => array(
      'prism.png'              => 'Intro',
      'conversation.png'       => 'Question 01',
      'perspective_prism.png'  => 'Question 02',
      'essence.png'            => 'Question 03',
      'connecting.png'         => 'Question 04',
      'research.png'           => 'Question 05',
      'beyond.png'             => 'Question 06',
      'whatif.png'             => 'Final thought',
    ),
    'about' => array(
      'silhouette.png' => 'About portrait',
    ),
    'theblog' => array(
      'silhouette.png' => 'Intro',
      'curiosity.png'  => 'Featured article',
    ),
    'server-factory' => array(
      'logos/server_factory.png' => 'Story logo',
    ),
    'firstlight' => array(
      'logos/first_light.png' => 'Story logo',
    ),
    'tonbo' => array(
      'logos/tonbo.png' => 'Story logo',
    ),
    'ensights' => array(
      'logos/ensights.png' => 'Story logo',
    ),
    'provengo' => array(
      'logos/provengo.svg' => 'Story logo',
    ),
  );

  return $map[$slug] ?? array();
}

function gladhat_page_section_ids($slug) {
  $map = array(
    'about' => array('about-intro', 'about-realise', 'about-curiosity', 'about-moments', 'about-learned', 'about-outside', 'about-cta'),
    'contact' => array('contact-intro', 'contact-happens', 'contact-fit', 'contact-cta-section'),
    'when-we-should-talk' => array('when-intro', 'when-next', 'when-cta'),
    'working-together' => array('working-intro', 'working-creating'),
    'work' => array('stories-intro'),
    'more-stories' => array('more-intro'),
    'see-your-business-differently' => array('see-intro', 'see-final'),
    'theblog' => array('thoughts-intro'),
    'server-factory' => array('sf-opening', 'sf-curiosity', 'sf-buyer', 'sf-confidence', 'sf-strategy', 'sf-results', 'sf-lessons'),
    'firstlight' => array('fl-opening', 'fl-beginning', 'fl-beyond', 'fl-language', 'fl-experience', 'fl-lessons'),
    'tonbo' => array('tonbo-opening', 'tonbo-invisible', 'tonbo-lesson', 'tonbo-change', 'tonbo-lessons'),
    'ensights' => array('en-opening', 'en-language', 'en-conversation', 'en-beyond', 'en-lessons'),
    'provengo' => array('pv-opening', 'pv-tech', 'pv-audience', 'pv-essence', 'pv-bridge', 'pv-lessons'),
  );
  return $map[$slug] ?? array();
}

function gladhat_add_metaboxes() {
  add_meta_box('gladhat_seo', 'SEO', 'gladhat_render_seo_box', 'page', 'normal', 'high');
  add_meta_box('gladhat_hero', 'Hero copy', 'gladhat_render_hero_box', 'page', 'normal', 'high');
  add_meta_box('gladhat_images', 'Images (Media Library)', 'gladhat_render_images_box', 'page', 'normal', 'default');
  add_meta_box('gladhat_sections', 'Section copy (optional overrides)', 'gladhat_render_sections_box', 'page', 'normal', 'default');
  add_meta_box('gladhat_story_card', 'Story card (True Stories list)', 'gladhat_render_story_card_box', 'page', 'side', 'default');
  add_meta_box('gladhat_project_fields', 'Project details', 'gladhat_render_project_box', 'gladhat_project', 'normal', 'high');
  add_meta_box('gladhat_post_tag', 'Thoughts card', 'gladhat_render_post_box', 'post', 'side', 'default');
}
add_action('add_meta_boxes', 'gladhat_add_metaboxes');

function gladhat_render_seo_box($post) {
  wp_nonce_field('gladhat_save_meta', 'gladhat_meta_nonce');
  $title = get_post_meta($post->ID, '_gladhat_seo_title', true);
  $desc  = get_post_meta($post->ID, '_gladhat_seo_description', true);
  echo '<p><label>Title<br><input type="text" name="gladhat_seo_title" class="widefat" value="' . esc_attr($title) . '"></label></p>';
  echo '<p><label>Description<br><textarea name="gladhat_seo_description" class="widefat" rows="3">' . esc_textarea($desc) . '</textarea></label></p>';
}

function gladhat_render_hero_box($post) {
  $fields = array(
    'hero_label'    => 'Label',
    'hero_title'    => 'Title HTML (use &lt;span class="accent"&gt; for gold word)',
    'hero_subtitle' => 'Subtitle',
  );
  foreach ($fields as $key => $label) {
    $val = get_post_meta($post->ID, '_gladhat_' . $key, true);
    echo '<p><label>' . esc_html($label) . '<br>';
    if ($key === 'hero_subtitle') {
      echo '<textarea name="gladhat_' . esc_attr($key) . '" class="widefat" rows="3">' . esc_textarea($val) . '</textarea>';
    } else {
      echo '<input type="text" name="gladhat_' . esc_attr($key) . '" class="widefat" value="' . esc_attr($val) . '">';
    }
    echo '</label></p>';
  }
  echo '<p class="description">Leave blank to keep the approved default copy. Title HTML may include &lt;span class="accent"&gt; and &lt;br&gt; only.</p>';
}

function gladhat_render_images_box($post) {
  $keys = gladhat_page_image_keys($post->post_name);
  if (!$keys) {
    echo '<p>This page has no replaceable images, or uses the global logo/video in Appearance → Customize.</p>';
    return;
  }
  $map = get_post_meta($post->ID, '_gladhat_image_map', true);
  if (!is_array($map)) {
    $map = array();
  }
  echo '<p class="description">Replace images without changing size, crop or CSS. Upload to the Media Library, then paste the attachment ID or use the media button.</p>';
  foreach ($keys as $file => $label) {
    $id = isset($map[$file]) ? (int) $map[$file] : 0;
    echo '<p><label><strong>' . esc_html($label) . '</strong> <code>' . esc_html($file) . '</code><br>';
    echo '<input type="number" name="gladhat_image[' . esc_attr($file) . ']" value="' . esc_attr($id ?: '') . '" class="small-text" placeholder="Attachment ID"> ';
    if ($id) {
      echo wp_get_attachment_image($id, array(48, 48));
    }
    echo '</label></p>';
  }
}

function gladhat_render_sections_box($post) {
  $ids = gladhat_page_section_ids($post->post_name);
  if (!$ids) {
    echo '<p>This page uses fixed layout sections. Edit hero copy, images, or related posts instead of HTML.</p>';
    return;
  }
  $overrides = get_post_meta($post->ID, '_gladhat_sections', true);
  if (!is_array($overrides)) {
    $overrides = array();
  }
  echo '<p class="description">Leave a section empty to keep the approved default. Pasting extra wrappers or CSS can break the layout — use paragraphs, headings, emphasis and blockquotes only.</p>';
  foreach ($ids as $id) {
    $val = $overrides[$id] ?? '';
    echo '<p><label><strong>#' . esc_html($id) . '</strong></label></p>';
    wp_editor($val, 'gladhat_section_' . $id, array(
      'textarea_name' => 'gladhat_sections[' . $id . ']',
      'textarea_rows' => 8,
      'media_buttons' => false,
      'teeny'         => true,
      'quicktags'     => true,
    ));
  }
}

function gladhat_render_story_card_box($post) {
  $story_slugs = array('server-factory', 'firstlight', 'tonbo', 'ensights', 'provengo');
  if (!in_array($post->post_name, $story_slugs, true)) {
    echo '<p>Only used on the five featured story pages.</p>';
    return;
  }
  foreach (array('story_number' => 'Number (01)', 'story_subtitle' => 'Client name', 'story_card_title' => 'Card title', 'story_card_text' => 'Card summary', 'story_cta' => 'Card link label') as $key => $label) {
    $val = get_post_meta($post->ID, '_gladhat_' . $key, true);
    echo '<p><label>' . esc_html($label) . '<br>';
    if ($key === 'story_card_text') {
      echo '<textarea name="gladhat_' . esc_attr($key) . '" class="widefat" rows="4">' . esc_textarea($val) . '</textarea>';
    } else {
      echo '<input type="text" name="gladhat_' . esc_attr($key) . '" class="widefat" value="' . esc_attr($val) . '">';
    }
    echo '</label></p>';
  }
}

function gladhat_render_project_box($post) {
  wp_nonce_field('gladhat_save_meta', 'gladhat_meta_nonce');
  $tagline = get_post_meta($post->ID, '_gladhat_tagline', true);
  $desc    = get_post_meta($post->ID, '_gladhat_description', true);
  echo '<p><label>Tagline (card title)<br><input type="text" name="gladhat_tagline" class="widefat" value="' . esc_attr($tagline) . '"></label></p>';
  echo '<p><label>Description<br><textarea name="gladhat_description" class="widefat" rows="4">' . esc_textarea($desc) . '</textarea></label></p>';
}

function gladhat_render_post_box($post) {
  wp_nonce_field('gladhat_save_meta', 'gladhat_meta_nonce');
  $coming = get_post_meta($post->ID, '_gladhat_coming_soon', true);
  echo '<p><label><input type="checkbox" name="gladhat_coming_soon" value="1"' . checked($coming, '1', false) . '> Coming soon (no article link)</label></p>';
}

function gladhat_save_meta($post_id) {
  if (!isset($_POST['gladhat_meta_nonce']) || !wp_verify_nonce($_POST['gladhat_meta_nonce'], 'gladhat_save_meta')) {
    return;
  }
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return;
  }
  if (!current_user_can('edit_post', $post_id)) {
    return;
  }

  $text_keys = array(
    'seo_title', 'seo_description', 'hero_label', 'hero_title', 'hero_subtitle',
    'story_number', 'story_subtitle', 'story_card_title', 'story_card_text', 'story_cta',
    'tagline', 'description',
  );
  foreach ($text_keys as $key) {
    if (isset($_POST['gladhat_' . $key])) {
      $raw = wp_unslash($_POST['gladhat_' . $key]);
      if ($key === 'hero_title') {
        update_post_meta($post_id, '_gladhat_' . $key, wp_kses($raw, gladhat_allowed_html()));
      } else {
        update_post_meta($post_id, '_gladhat_' . $key, sanitize_textarea_field($raw));
      }
    }
  }

  if (isset($_POST['gladhat_image']) && is_array($_POST['gladhat_image'])) {
    $map = array();
    foreach ($_POST['gladhat_image'] as $file => $id) {
      $file = sanitize_text_field($file);
      $id = absint($id);
      if ($file && $id) {
        $map[$file] = $id;
      }
    }
    update_post_meta($post_id, '_gladhat_image_map', $map);
  }

  if (isset($_POST['gladhat_sections']) && is_array($_POST['gladhat_sections'])) {
    $sections = array();
    foreach ($_POST['gladhat_sections'] as $id => $html) {
      $id = sanitize_key($id);
      $html = wp_kses(wp_unslash($html), gladhat_allowed_html());
      if ($id && trim($html) !== '') {
        $sections[$id] = $html;
      }
    }
    update_post_meta($post_id, '_gladhat_sections', $sections);
  }

  if (get_post_type($post_id) === 'post') {
    if (!empty($_POST['gladhat_coming_soon'])) {
      update_post_meta($post_id, '_gladhat_coming_soon', '1');
    } else {
      delete_post_meta($post_id, '_gladhat_coming_soon');
    }
  }
}
add_action('save_post', 'gladhat_save_meta');
