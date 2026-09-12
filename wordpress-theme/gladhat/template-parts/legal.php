<?php
/**
 * Legal page shell — matches src/utils/legal-page.js
 *
 * @var array $args Template args with `page` key.
 */
$page_key = $args['page'] ?? 'privacy';
if ($page_key === 'cookie-policy') {
  $page_key = 'cookies';
}

$nav = array(
  array('id' => 'privacy', 'label' => 'Privacy Policy', 'path' => '/privacy'),
  array('id' => 'terms', 'label' => 'Terms of Use', 'path' => '/terms'),
  array('id' => 'cookies', 'label' => 'Cookie Policy', 'path' => '/cookie-policy'),
  array('id' => 'disclaimer', 'label' => 'Disclaimer', 'path' => '/disclaimer'),
);

$pages = array(
  'privacy' => array(
    'eyebrow' => 'Privacy',
    'title' => 'Your privacy',
    'accent' => 'matters.',
    'intro' => 'Gladhat is committed to protecting your personal data and being transparent about how information is collected and used.',
    'sections' => array(
      array(
        'id' => 'information-we-collect',
        'title' => '1. Information we collect',
        'paragraphs' => array(
          'We may collect information you provide directly — for example when you contact us by email or through a form on this website. This may include your name, email address, company name and the content of your message.',
          'We may also collect limited technical data when you visit the site, such as browser type, device information and pages viewed, to help us understand how the site is used.',
        ),
        'list' => array(
          'Contact details you choose to share',
          'Correspondence and project-related information',
          'Basic usage and technical log data',
        ),
      ),
      array(
        'id' => 'how-we-use-information',
        'title' => '2. How we use your information',
        'paragraphs' => array(
          'We use personal information to respond to enquiries, provide consulting services, improve the website and meet legal obligations where applicable.',
          'We do not sell your personal data.',
        ),
      ),
      array(
        'id' => 'your-rights',
        'title' => '3. Your rights',
        'paragraphs' => array(
          'Depending on your location, you may have rights to access, correct or delete personal data we hold about you, or to object to certain processing.',
          'To exercise these rights, contact us at m@gladhat.com.',
        ),
      ),
    ),
  ),
  'terms' => array(
    'eyebrow' => 'Terms',
    'title' => 'Terms of',
    'accent' => 'use.',
    'intro' => 'These terms govern your use of the Gladhat website. By using this site, you agree to them.',
    'sections' => array(
      array(
        'id' => 'use-of-website',
        'title' => '1. Use of this website',
        'paragraphs' => array(
          'Content on this website is provided for general information about Gladhat\'s consulting services. It does not constitute professional advice unless agreed in a separate engagement.',
          'You may not misuse the site, attempt unauthorised access, or use content in a way that infringes intellectual property rights.',
        ),
      ),
      array(
        'id' => 'intellectual-property',
        'title' => '2. Intellectual property',
        'paragraphs' => array(
          'Unless stated otherwise, text, design and materials on this site are owned by Gladhat or used with permission. You may not reproduce them without prior written consent.',
        ),
      ),
      array(
        'id' => 'liability',
        'title' => '3. Limitation of liability',
        'paragraphs' => array(
          'Gladhat aims to keep information accurate and up to date but does not guarantee completeness. Use of the site is at your own risk to the extent permitted by law.',
        ),
      ),
    ),
  ),
  'cookies' => array(
    'eyebrow' => 'Cookies',
    'title' => 'Cookie',
    'accent' => 'policy.',
    'intro' => 'This page explains how cookies and similar technologies may be used on the Gladhat website.',
    'sections' => array(
      array(
        'id' => 'what-are-cookies',
        'title' => '1. What are cookies?',
        'paragraphs' => array(
          'Cookies are small text files stored on your device when you visit a website. They help sites remember preferences and understand how visitors use pages.',
        ),
      ),
      array(
        'id' => 'cookies-we-use',
        'title' => '2. Cookies we may use',
        'paragraphs' => array(
          'We may use essential cookies required for the site to function, and analytics cookies to understand traffic patterns. Specific tools will be listed here as they are implemented.',
        ),
        'list' => array(
          'Essential cookies — required for basic site operation',
          'Analytics cookies — optional, used to improve the site',
        ),
      ),
      array(
        'id' => 'managing-cookies',
        'title' => '3. Managing cookies',
        'paragraphs' => array(
          'You can control cookies through your browser settings. Blocking some cookies may affect how the site works.',
        ),
      ),
    ),
  ),
  'disclaimer' => array(
    'eyebrow' => 'Disclaimer',
    'title' => 'Website',
    'accent' => 'disclaimer.',
    'intro' => 'Please read this disclaimer alongside our Terms of Use and Privacy Policy.',
    'sections' => array(
      array(
        'id' => 'general',
        'title' => '1. General information',
        'paragraphs' => array(
          'The information on this website is published by Gladhat for general guidance. It is not a substitute for tailored professional advice.',
          'Case studies and examples describe past work for illustration. Outcomes vary by context and are not guaranteed for future engagements.',
        ),
      ),
      array(
        'id' => 'external-links',
        'title' => '2. External links',
        'paragraphs' => array(
          'This site may link to third-party websites. Gladhat is not responsible for the content or privacy practices of external sites.',
        ),
      ),
    ),
  ),
);

$page = $pages[$page_key] ?? $pages['privacy'];
?>
    <section class="legal-hero" id="legal-hero" aria-label="<?php echo esc_attr($page['eyebrow']); ?>">
      <div class="container">
        <p class="legal-hero__eyebrow"><?php echo esc_html($page['eyebrow']); ?></p>
        <h1 class="legal-hero__title"><?php echo esc_html($page['title']); ?> <span class="accent"><?php echo esc_html($page['accent']); ?></span></h1>
        <p class="legal-hero__intro"><?php echo esc_html($page['intro']); ?></p>
      </div>
    </section>

    <section class="section legal-page" id="legal-page" data-legal-page>
      <div class="container legal-page__layout">
        <nav class="legal-nav" aria-label="Legal pages">
          <div class="legal-nav__primary">
            <?php foreach ($nav as $item) : ?>
              <a
                href="<?php echo esc_url(home_url($item['path'])); ?>"
                class="legal-nav__link<?php echo $item['id'] === $page_key ? ' legal-nav__link--active' : ''; ?>"
                <?php echo $item['id'] === $page_key ? 'aria-current="page"' : ''; ?>
              ><?php echo esc_html($item['label']); ?></a>
            <?php endforeach; ?>
          </div>
          <div class="legal-nav__sections" aria-label="On this page">
            <?php foreach ($page['sections'] as $section) : ?>
              <a href="#<?php echo esc_attr($section['id']); ?>" class="legal-nav__sublink" data-legal-anchor="<?php echo esc_attr($section['id']); ?>"><?php echo esc_html($section['title']); ?></a>
            <?php endforeach; ?>
          </div>
        </nav>
        <article class="legal-prose">
          <p class="legal-prose__updated">Last updated: September 2026</p>
          <?php foreach ($page['sections'] as $section) : ?>
            <section class="legal-prose__section" id="<?php echo esc_attr($section['id']); ?>" data-legal-section>
              <h2 class="legal-prose__heading"><?php echo esc_html($section['title']); ?></h2>
              <?php foreach ($section['paragraphs'] as $paragraph) : ?>
                <p><?php echo esc_html($paragraph); ?></p>
              <?php endforeach; ?>
              <?php if (!empty($section['list'])) : ?>
                <ul class="legal-prose__list">
                  <?php foreach ($section['list'] as $item) : ?>
                    <li><?php echo esc_html($item); ?></li>
                  <?php endforeach; ?>
                </ul>
              <?php endif; ?>
            </section>
          <?php endforeach; ?>
        </article>
      </div>
    </section>
