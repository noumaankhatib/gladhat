<?php
/**
 * Gladhat helpers — URLs, assets, meta fallbacks, static markup.
 */

if (!function_exists('gladhat_asset')) {
  function gladhat_asset($relative) {
    $relative = ltrim($relative, '/');
    return trailingslashit(get_template_directory_uri()) . 'assets/' . $relative;
  }
}

function gladhat_image_url($filename, $post_id = 0) {
  $filename = ltrim($filename, '/');
  $post_id  = $post_id ?: get_queried_object_id();

  if ($post_id) {
    $map = get_post_meta($post_id, '_gladhat_image_map', true);
    if (is_array($map) && !empty($map[$filename])) {
      $url = wp_get_attachment_image_url((int) $map[$filename], 'full');
      if ($url) {
        return $url;
      }
    }
  }

  $global = get_theme_mod('gladhat_image_' . sanitize_key($filename));
  if ($global) {
    $url = wp_get_attachment_image_url((int) $global, 'full');
    if ($url) {
      return $url;
    }
  }

  $theme_file = get_template_directory() . '/assets/images/' . $filename;
  if (file_exists($theme_file)) {
    return gladhat_asset('images/' . $filename);
  }

  $uploads = wp_upload_dir();
  $upload_file = trailingslashit($uploads['basedir']) . 'gladhat/' . $filename;
  if (file_exists($upload_file)) {
    return trailingslashit($uploads['baseurl']) . 'gladhat/' . $filename;
  }

  return gladhat_asset('images/' . $filename);
}

function gladhat_meta($key, $default = '', $post_id = 0) {
  $post_id = $post_id ?: get_queried_object_id();
  if (!$post_id) {
    return $default;
  }
  $value = get_post_meta($post_id, '_gladhat_' . $key, true);
  if ($value === '' || $value === false || $value === null) {
    return $default;
  }
  return $value;
}

function gladhat_allowed_html() {
  return array(
    'span'   => array('class' => true, 'style' => true),
    'br'     => array(),
    'strong' => array(),
    'em'     => array(),
    'a'      => array('href' => true, 'class' => true, 'id' => true, 'target' => true, 'rel' => true),
    'p'      => array('class' => true, 'style' => true),
    'h2'     => array('class' => true, 'style' => true),
    'h3'     => array('class' => true, 'style' => true),
    'ul'     => array('class' => true, 'style' => true),
    'li'     => array('style' => true),
    'div'    => array('class' => true, 'style' => true),
    'hr'     => array('class' => true, 'style' => true),
  );
}

function gladhat_html($key, $default, $post_id = 0) {
  return wp_kses(gladhat_meta($key, $default, $post_id), gladhat_allowed_html());
}

function gladhat_text($key, $default, $post_id = 0) {
  return esc_html(gladhat_meta($key, $default, $post_id));
}

if (!function_exists('gladhat_email')) {
  function gladhat_email() {
    $email = get_theme_mod('gladhat_email', 'm@gladhat.com');
    return sanitize_email($email) ?: 'm@gladhat.com';
  }
}

function gladhat_linkedin() {
  if (function_exists('gladhat_linkedin_url')) {
    $url = gladhat_linkedin_url();
    if ($url) {
      return esc_url($url);
    }
  }
  $url = get_theme_mod('gladhat_linkedin', 'https://linkedin.com');
  return esc_url($url ?: 'https://linkedin.com');
}

function gladhat_logo_url() {
  $id = (int) get_theme_mod('gladhat_logo');
  if ($id) {
    $url = wp_get_attachment_image_url($id, 'full');
    if ($url) {
      return $url;
    }
  }
  return gladhat_image_url('gladhat-logo.png');
}

function gladhat_hero_video_url() {
  $id = (int) get_theme_mod('gladhat_hero_video');
  if ($id) {
    $url = wp_get_attachment_url($id);
    if ($url) {
      return $url;
    }
  }
  $theme_file = get_template_directory() . '/assets/hero-video.mp4';
  if (file_exists($theme_file)) {
    return gladhat_asset('hero-video.mp4');
  }
  $uploads = wp_upload_dir();
  if (file_exists(trailingslashit($uploads['basedir']) . 'gladhat/hero-video.mp4')) {
    return trailingslashit($uploads['baseurl']) . 'gladhat/hero-video.mp4';
  }
  return home_url('/hero-video.mp4');
}

function gladhat_rewrite_markup($html, $post_id = 0) {
  $post_id = $post_id ?: get_queried_object_id();

  $html = preg_replace_callback('#src="/images/([^"]+)"#', function ($m) use ($post_id) {
    return 'src="' . esc_url(gladhat_image_url($m[1], $post_id)) . '"';
  }, $html);

  $html = preg_replace_callback('#src="/hero-video\.mp4"#', function () {
    return 'src="' . esc_url(gladhat_hero_video_url()) . '"';
  }, $html);

  $html = preg_replace_callback('#href="(/(?:[a-z0-9\-_]+(?:/[a-z0-9\-_]+)*)?)"#', function ($m) {
    $path = $m[1] === '/' ? '/' : $m[1];
    return 'href="' . esc_url(home_url($path)) . '"';
  }, $html);

  $email = gladhat_email();
  $html = str_replace('mailto:m@gladhat.com', 'mailto:' . antispambot($email), $html);
  $html = str_replace('>m@gladhat.com<', '>' . esc_html($email) . '<', $html);

  $html = preg_replace_callback('#href="https://linkedin\.com"#', function () {
    return 'href="' . gladhat_linkedin() . '"';
  }, $html);

  return $html;
}

function gladhat_apply_section_overrides($html, $post_id = 0) {
  $post_id = $post_id ?: get_queried_object_id();
  if (!$post_id) {
    return $html;
  }

  $overrides = get_post_meta($post_id, '_gladhat_sections', true);
  if (!is_array($overrides) || empty($overrides)) {
    return $html;
  }

  $previous = libxml_use_internal_errors(true);
  $dom = new DOMDocument();
  $wrapped = '<!DOCTYPE html><html><body>' . $html . '</body></html>';
  $dom->loadHTML('<?xml encoding="utf-8" ?>' . $wrapped, LIBXML_HTML_NOERROR);

  foreach ($overrides as $section_id => $inner_html) {
    if (!is_string($inner_html) || trim($inner_html) === '') {
      continue;
    }
    $xpath = new DOMXPath($dom);
    $nodes = $xpath->query('//*[@id="' . $section_id . '"]//*[contains(concat(" ", normalize-space(@class), " "), " prose ")]');
    if (!$nodes || !$nodes->length) {
      continue;
    }
    $prose = $nodes->item(0);
    while ($prose->firstChild) {
      $prose->removeChild($prose->firstChild);
    }
    $fragment = $dom->createDocumentFragment();
    $safe = wp_kses($inner_html, gladhat_allowed_html());
    @$fragment->appendXML('<div xmlns="http://www.w3.org/1999/xhtml">' . $safe . '</div>');
    if ($fragment->firstChild) {
      foreach (iterator_to_array($fragment->firstChild->childNodes) as $child) {
        $prose->appendChild($dom->importNode($child, true));
      }
    }
  }

  $body = $dom->getElementsByTagName('body')->item(0);
  $out = '';
  if ($body) {
    foreach ($body->childNodes as $child) {
      $out .= $dom->saveHTML($child);
    }
  }
  libxml_use_internal_errors($previous);
  return $out ?: $html;
}

function gladhat_apply_hero_overrides($html, $post_id = 0) {
  $post_id = $post_id ?: get_queried_object_id();
  if (!$post_id) {
    return $html;
  }

  $label = get_post_meta($post_id, '_gladhat_hero_label', true);
  $title = get_post_meta($post_id, '_gladhat_hero_title', true);
  $sub   = get_post_meta($post_id, '_gladhat_hero_subtitle', true);

  if (is_string($label) && $label !== '') {
    $html = preg_replace(
      '#(<span class="hero__label">)(.*?)(</span>)#s',
      '$1' . esc_html($label) . '$3',
      $html,
      1
    );
  }
  if (is_string($title) && $title !== '') {
    $html = preg_replace(
      '#(<h1 class="hero__title">)(.*?)(</h1>)#s',
      '$1' . wp_kses($title, gladhat_allowed_html()) . '$3',
      $html,
      1
    );
  }
  if (is_string($sub) && $sub !== '') {
    $html = preg_replace(
      '#(<p class="hero__subtitle">)(.*?)(</p>)#s',
      '$1' . nl2br(esc_html($sub)) . '$3',
      $html,
      1
    );
  }

  return $html;
}

function gladhat_render_static($name, $post_id = 0) {
  $file = get_template_directory() . '/template-parts/static/' . $name . '.html';
  if (!file_exists($file)) {
    return;
  }
  $html = file_get_contents($file);
  $html = gladhat_rewrite_markup($html, $post_id);
  $html = gladhat_apply_hero_overrides($html, $post_id);
  $html = gladhat_apply_section_overrides($html, $post_id);
  echo $html;
}

function gladhat_default_nav_items() {
  return array(
    array('label' => 'When to Talk', 'path' => '/when-we-should-talk'),
    array('label' => 'How I Work', 'path' => '/working-together'),
    array('label' => 'True Stories', 'path' => '/work'),
    array('label' => 'See Differently', 'path' => '/see-your-business-differently'),
    array('label' => 'About', 'path' => '/about'),
    array('label' => 'Thoughts', 'path' => '/theblog'),
  );
}

function gladhat_nav_items_resolved() {
  $locations = get_nav_menu_locations();
  $items = array();

  if (!empty($locations['primary'])) {
    $menu_items = wp_get_nav_menu_items($locations['primary']);
    if ($menu_items) {
      foreach ($menu_items as $item) {
        if ((int) $item->menu_item_parent !== 0) {
          continue;
        }
        $items[] = array(
          'label' => $item->title,
          'url'   => $item->url,
          'path'  => wp_parse_url($item->url, PHP_URL_PATH) ?: '/',
        );
      }
    }
  }

  if (!$items) {
    foreach (gladhat_default_nav_items() as $item) {
      $items[] = array(
        'label' => $item['label'],
        'url'   => home_url($item['path']),
        'path'  => $item['path'],
      );
    }
  }

  return $items;
}

function gladhat_nav_is_current($path) {
  $path = untrailingslashit($path);
  if ($path === '' || $path === '/') {
    return is_front_page();
  }
  $request = untrailingslashit(wp_parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH) ?: '');
  $home_path = untrailingslashit(wp_parse_url(home_url('/'), PHP_URL_PATH) ?: '');
  if ($home_path && strpos($request, $home_path) === 0) {
    $request = substr($request, strlen($home_path)) ?: '';
  }
  $request = '/' . ltrim($request, '/');
  return untrailingslashit($request) === $path;
}

function gladhat_story_defaults() {
  return array(
    array(
      'slug'     => 'server-factory',
      'number'   => '01',
      'subtitle' => 'Server Factory',
      'title'    => "Seeing Through the Buyer's Eyes",
      'text'     => 'How customer and competitor research helped Server Factory support different buyers, clarify its value and reshape its website and demand generation.',
      'cta'      => 'Read the Server Factory story',
      'img'      => 'logos/server_factory.png',
    ),
    array(
      'slug'     => 'firstlight',
      'number'   => '02',
      'subtitle' => 'First Light',
      'title'    => 'Finding the Right Language',
      'text'     => 'How research and close collaboration translated a vision connecting technology, nature and wellbeing into a clear name, message and brand.',
      'cta'      => 'Read the First Light story',
      'img'      => 'logos/first_light.png',
    ),
    array(
      'slug'     => 'tonbo',
      'number'   => '03',
      'subtitle' => 'Tonbo Ventures',
      'title'    => 'Recognising the Value of Thinking',
      'text'     => 'A candid story about strategic thinking, invisible value and the project that changed how I define, structure and price my work.',
      'cta'      => 'Read the Tonbo story',
      'img'      => 'logos/tonbo.png',
    ),
    array(
      'slug'     => 'ensights',
      'number'   => '04',
      'subtitle' => 'enSights',
      'title'    => 'Connecting Expertise with Understanding',
      'text'     => 'How technical expertise and persistent questioning became clearer thought leadership, customer communication and commercial outreach.',
      'cta'      => 'Read the enSights story',
      'img'      => 'logos/ensights.png',
    ),
    array(
      'slug'     => 'provengo',
      'number'   => '05',
      'subtitle' => 'Provengo',
      'title'    => 'Simplifying Complexity',
      'text'     => 'How a sophisticated systems-engineering platform was translated into a clearer story for investors, product teams and customers.',
      'cta'      => 'Read the Provengo story',
      'img'      => 'logos/provengo.svg',
    ),
  );
}

function gladhat_more_project_defaults() {
  return array(
    array(
      'name'        => 'EMEO',
      'description' => 'Positioning, website and communications for an organisational development consultancy.',
      'tagline'     => 'Helping a consultancy express decades of experience with greater clarity.',
    ),
    array(
      'name'        => 'Ivy and Noa',
      'description' => 'Brand strategy and visual identity for an emerging fashion and lifestyle brand.',
      'tagline'     => 'Translating a creative vision into a cohesive brand experience.',
    ),
    array(
      'name'        => 'Read Theory',
      'description' => 'Communications strategy for an educational technology platform.',
      'tagline'     => 'Connecting learning outcomes with clearer customer communication.',
    ),
  );
}

function gladhat_thought_defaults() {
  return array(
    array(
      'title'   => 'Why "What Do You Do?" Is the Wrong Question',
      'excerpt' => 'Most people answer with their job title. But what if the real answer is about the problems you solve and the perspectives you bring?',
      'date'    => 'Coming soon',
      'tag'     => 'Positioning',
    ),
    array(
      'title'   => 'The Invisible Work That Creates the Most Value',
      'excerpt' => 'The deliverables get the attention. But the conversations, questions and shifts in perspective that happen before them often create the greatest commercial impact.',
      'date'    => 'Coming soon',
      'tag'     => 'Strategy',
    ),
    array(
      'title'   => 'When Clarity Beats Creativity',
      'excerpt' => 'There\'s a time for bold creative ideas. But sometimes what a business needs most is simply a clearer way of explaining what it already does well.',
      'date'    => 'Coming soon',
      'tag'     => 'Communication',
    ),
    array(
      'title'   => 'The Questions Nobody Asks',
      'excerpt' => 'Every business has questions hiding in plain sight. The ones that feel too obvious to ask, or too uncomfortable to answer. Those are usually the ones worth exploring.',
      'date'    => 'Coming soon',
      'tag'     => 'Curiosity',
    ),
    array(
      'title'   => 'Seeing Through Your Customer\'s Eyes',
      'excerpt' => 'You know your business inside out. But when was the last time you experienced it the way your customers do? The gap between the two is where the opportunities hide.',
      'date'    => 'Coming soon',
      'tag'     => 'Customer Insight',
    ),
    array(
      'title'   => 'Why Good Conversations Beat Good Campaigns',
      'excerpt' => 'The best work I\'ve ever done didn\'t start with a brief. It started with a conversation. Here\'s why that matters more than most people realise.',
      'date'    => 'Coming soon',
      'tag'     => 'Process',
    ),
  );
}

/**
 * Listen / read-aloud control with play button (speech synthesis or optional audio file).
 */
function gladhat_audio_prompt($text, $src = '') {
  $text = is_string($text) ? $text : '';
  $src  = is_string($src) ? $src : '';
  $src_attr = $src ? ' data-audio-src="' . esc_url($src) . '"' : '';

  return '<button type="button" class="audio-prompt" data-audio-text="' . esc_attr($text) . '"' . $src_attr . ' aria-pressed="false">'
    . '<span class="audio-prompt__icon" aria-hidden="true">'
    . '<svg class="audio-prompt__svg audio-prompt__svg--play" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>'
    . '<svg class="audio-prompt__svg audio-prompt__svg--pause" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>'
    . '</span>'
    . '<span class="audio-prompt__text"><span class="emoji">🎧</span> Prefer to listen? I\'ll read it to you.</span>'
    . '</button>';
}
