/* ===================================================
   GLADHAT — Logo mark (inline SVG for crisp scaling)
   =================================================== */

/**
 * @param {{ variant?: 'header' | 'footer', className?: string }} props
 */
export function Logo({ variant = 'header', className = '' }) {
  const isFooter = variant === 'footer';
  const rootClass = ['logo__mark', isFooter ? 'logo__mark--footer' : ''].filter(Boolean).join(' ');

  if (isFooter) {
    return `
      <svg class="${rootClass} ${className}" viewBox="0 0 170 54" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
        <text x="0" y="26" class="logo__word">
          <tspan class="logo__glad">glad</tspan><tspan class="logo__hat">hat</tspan>
        </text>
        <path class="logo__smile" d="M 101 17 C 101 28, 121 28, 121 17" />
        <text x="0" y="46" class="logo__tagline">make it meaningful</text>
      </svg>
    `;
  }

  return `
    <svg class="${rootClass} ${className}" viewBox="0 0 132 34" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <text x="0" y="24" class="logo__word">
        <tspan class="logo__glad">glad</tspan><tspan class="logo__hat">hat</tspan>
      </text>
      <path class="logo__smile" d="M 101 16 C 101 27, 121 27, 121 16" />
    </svg>
  `;
}
