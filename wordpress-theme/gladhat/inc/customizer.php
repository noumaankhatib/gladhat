<?php
/**
 * Theme Customizer — identity, footer, and email.
 * Contact extras (booking, LinkedIn, etc.) live in the Gladhat Core plugin when active.
 */

function gladhat_theme_customize_register($wp_customize) {
  $wp_customize->add_section('gladhat_identity', array(
    'title'    => 'Gladhat Identity',
    'priority' => 30,
  ));

  $wp_customize->add_setting('gladhat_logo', array('sanitize_callback' => 'absint'));
  $wp_customize->add_control(new WP_Customize_Media_Control($wp_customize, 'gladhat_logo', array(
    'label'     => 'Header / footer logo',
    'section'   => 'gladhat_identity',
    'mime_type' => 'image',
  )));

  $wp_customize->add_setting('gladhat_hero_video', array('sanitize_callback' => 'absint'));
  $wp_customize->add_control(new WP_Customize_Media_Control($wp_customize, 'gladhat_hero_video', array(
    'label'     => 'Homepage hero video (mp4)',
    'section'   => 'gladhat_identity',
    'mime_type' => 'video',
  )));

  $contact_section = function_exists('gladhat_booking_url') ? 'gladhat_contact' : 'gladhat_theme_contact';

  if (!function_exists('gladhat_booking_url')) {
    $wp_customize->add_section('gladhat_theme_contact', array(
      'title'    => 'Gladhat Contact',
      'priority' => 31,
    ));
    $contact_section = 'gladhat_theme_contact';
  }

  if ($contact_section === 'gladhat_theme_contact') {
    $wp_customize->add_setting('gladhat_email', array(
      'default'           => 'm@gladhat.com',
      'sanitize_callback' => 'sanitize_email',
    ));
    $wp_customize->add_control('gladhat_email', array(
      'label'   => 'Email address',
      'section' => $contact_section,
      'type'    => 'email',
    ));

    $wp_customize->add_setting('gladhat_linkedin', array(
      'default'           => 'https://linkedin.com',
      'sanitize_callback' => 'esc_url_raw',
    ));
    $wp_customize->add_control('gladhat_linkedin', array(
      'label'   => 'LinkedIn URL',
      'section' => $contact_section,
      'type'    => 'url',
    ));
  }

  $wp_customize->add_section('gladhat_footer', array(
    'title'    => 'Gladhat Footer',
    'priority' => 32,
  ));

  $wp_customize->add_setting('gladhat_footer_cta_title', array(
    'default'           => 'Ready to see your business from another angle?',
    'sanitize_callback' => 'sanitize_text_field',
  ));
  $wp_customize->add_control('gladhat_footer_cta_title', array(
    'label'   => 'Footer CTA heading',
    'section' => 'gladhat_footer',
    'type'    => 'text',
  ));

  $wp_customize->add_setting('gladhat_footer_cta_label', array(
    'default'           => 'Begin the Conversation',
    'sanitize_callback' => 'sanitize_text_field',
  ));
  $wp_customize->add_control('gladhat_footer_cta_label', array(
    'label'   => 'Footer CTA button',
    'section' => 'gladhat_footer',
    'type'    => 'text',
  ));

  $wp_customize->add_setting('gladhat_footer_tagline', array(
    'default'           => 'Commercial strategy, positioning and communication for founders who value clear thinking.',
    'sanitize_callback' => 'sanitize_textarea_field',
  ));
  $wp_customize->add_control('gladhat_footer_tagline', array(
    'label'   => 'Footer tagline',
    'section' => 'gladhat_footer',
    'type'    => 'textarea',
  ));

  $wp_customize->add_setting('gladhat_copyright', array(
    'default'           => '© 2026 Gladhat',
    'sanitize_callback' => 'sanitize_text_field',
  ));
  $wp_customize->add_control('gladhat_copyright', array(
    'label'   => 'Copyright line',
    'section' => 'gladhat_footer',
    'type'    => 'text',
  ));

  foreach (array(
    'privacy'    => 'Privacy URL',
    'terms'      => 'Terms URL',
    'disclaimer' => 'Disclaimer URL',
    'cookies'    => 'Cookie Policy URL',
  ) as $key => $label) {
    $wp_customize->add_setting('gladhat_legal_' . $key, array(
      'default'           => '#',
      'sanitize_callback' => 'esc_url_raw',
    ));
    $wp_customize->add_control('gladhat_legal_' . $key, array(
      'label'   => $label,
      'section' => 'gladhat_footer',
      'type'    => 'url',
    ));
  }
}
add_action('customize_register', 'gladhat_theme_customize_register', 20);
