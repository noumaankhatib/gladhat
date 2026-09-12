<?php
/**
 * Gladhat logo mark — inline SVG for crisp scaling.
 *
 * @param array $args {
 *   @type string $variant 'header'|'footer'
 *   @type string $class   Extra class names.
 * }
 */
function gladhat_render_logo($args = array()) {
  $variant = isset($args['variant']) ? $args['variant'] : 'header';
  $class   = isset($args['class']) ? $args['class'] : '';
  $is_footer = $variant === 'footer';
  $mark_class = trim('logo__mark' . ($is_footer ? ' logo__mark--footer' : '') . ' ' . $class);

  if ($is_footer) {
    ?>
    <svg class="<?php echo esc_attr($mark_class); ?>" viewBox="0 0 170 54" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <text x="0" y="26" class="logo__word">
        <tspan class="logo__glad">glad</tspan><tspan class="logo__hat">hat</tspan>
      </text>
      <path class="logo__smile" d="M 101 17 C 101 28, 121 28, 121 17" />
      <text x="0" y="46" class="logo__tagline">make it meaningful</text>
    </svg>
    <?php
    return;
  }
  ?>
  <svg class="<?php echo esc_attr($mark_class); ?>" viewBox="0 0 132 34" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
    <text x="0" y="24" class="logo__word">
      <tspan class="logo__glad">glad</tspan><tspan class="logo__hat">hat</tspan>
    </text>
    <path class="logo__smile" d="M 101 16 C 101 27, 121 27, 121 16" />
  </svg>
  <?php
}
