/* Shared legal page layout — Privacy, Terms, Cookies, Disclaimer */

const LEGAL_NAV = [
  { id: 'privacy', label: 'Privacy Policy', path: '/privacy' },
  { id: 'terms', label: 'Terms of Use', path: '/terms' },
  { id: 'cookies', label: 'Cookie Policy', path: '/cookie-policy' },
  { id: 'disclaimer', label: 'Disclaimer', path: '/disclaimer' },
];

const LEGAL_PAGES = {
  privacy: {
    eyebrow: 'Privacy',
    title: 'Your privacy',
    accent: 'matters.',
    intro: 'Gladhat is committed to protecting your personal data and being transparent about how information is collected and used.',
    lastUpdated: 'September 2026',
    sections: [
      {
        id: 'information-we-collect',
        title: '1. Information we collect',
        paragraphs: [
          'We may collect information you provide directly — for example when you contact us by email or through a form on this website. This may include your name, email address, company name and the content of your message.',
          'We may also collect limited technical data when you visit the site, such as browser type, device information and pages viewed, to help us understand how the site is used.',
        ],
        list: [
          'Contact details you choose to share',
          'Correspondence and project-related information',
          'Basic usage and technical log data',
        ],
      },
      {
        id: 'how-we-use-information',
        title: '2. How we use your information',
        paragraphs: [
          'We use personal information to respond to enquiries, provide consulting services, improve the website and meet legal obligations where applicable.',
          'We do not sell your personal data.',
        ],
      },
      {
        id: 'your-rights',
        title: '3. Your rights',
        paragraphs: [
          'Depending on your location, you may have rights to access, correct or delete personal data we hold about you, or to object to certain processing.',
          'To exercise these rights, contact us at m@gladhat.com.',
        ],
      },
    ],
  },
  terms: {
    eyebrow: 'Terms',
    title: 'Terms of',
    accent: 'use.',
    intro: 'These terms govern your use of the Gladhat website. By using this site, you agree to them.',
    lastUpdated: 'September 2026',
    sections: [
      {
        id: 'use-of-website',
        title: '1. Use of this website',
        paragraphs: [
          'Content on this website is provided for general information about Gladhat\'s consulting services. It does not constitute professional advice unless agreed in a separate engagement.',
          'You may not misuse the site, attempt unauthorised access, or use content in a way that infringes intellectual property rights.',
        ],
      },
      {
        id: 'intellectual-property',
        title: '2. Intellectual property',
        paragraphs: [
          'Unless stated otherwise, text, design and materials on this site are owned by Gladhat or used with permission. You may not reproduce them without prior written consent.',
        ],
      },
      {
        id: 'liability',
        title: '3. Limitation of liability',
        paragraphs: [
          'Gladhat aims to keep information accurate and up to date but does not guarantee completeness. Use of the site is at your own risk to the extent permitted by law.',
        ],
      },
    ],
  },
  cookies: {
    eyebrow: 'Cookies',
    title: 'Cookie',
    accent: 'policy.',
    intro: 'This page explains how cookies and similar technologies may be used on the Gladhat website.',
    lastUpdated: 'September 2026',
    sections: [
      {
        id: 'what-are-cookies',
        title: '1. What are cookies?',
        paragraphs: [
          'Cookies are small text files stored on your device when you visit a website. They help sites remember preferences and understand how visitors use pages.',
        ],
      },
      {
        id: 'cookies-we-use',
        title: '2. Cookies we may use',
        paragraphs: [
          'We may use essential cookies required for the site to function, and analytics cookies to understand traffic patterns. Specific tools will be listed here as they are implemented.',
        ],
        list: [
          'Essential cookies — required for basic site operation',
          'Analytics cookies — optional, used to improve the site',
        ],
      },
      {
        id: 'managing-cookies',
        title: '3. Managing cookies',
        paragraphs: [
          'You can control cookies through your browser settings. Blocking some cookies may affect how the site works.',
        ],
      },
    ],
  },
  disclaimer: {
    eyebrow: 'Disclaimer',
    title: 'Website',
    accent: 'disclaimer.',
    intro: 'Please read this disclaimer alongside our Terms of Use and Privacy Policy.',
    lastUpdated: 'September 2026',
    sections: [
      {
        id: 'general',
        title: '1. General information',
        paragraphs: [
          'The information on this website is published by Gladhat for general guidance. It is not a substitute for tailored professional advice.',
          'Case studies and examples describe past work for illustration. Outcomes vary by context and are not guaranteed for future engagements.',
        ],
      },
      {
        id: 'external-links',
        title: '2. External links',
        paragraphs: [
          'This site may link to third-party websites. Gladhat is not responsible for the content or privacy practices of external sites.',
        ],
      },
    ],
  },
};

function renderSection(section) {
  const list = section.list
    ? `<ul class="legal-prose__list">${section.list.map((item) => `<li>${item}</li>`).join('')}</ul>`
    : '';

  return `
    <section class="legal-prose__section" id="${section.id}" data-legal-section>
      <h2 class="legal-prose__heading">${section.title}</h2>
      ${section.paragraphs.map((p) => `<p>${p}</p>`).join('')}
      ${list}
    </section>
  `;
}

export function renderLegalPage(pageId) {
  const page = LEGAL_PAGES[pageId];
  if (!page) return '';

  const nav = LEGAL_NAV.map((item) => `
    <a
      href="${item.path}"
      class="legal-nav__link${item.id === pageId ? ' legal-nav__link--active' : ''}"
      ${item.id === pageId ? 'aria-current="page"' : ''}
    >${item.label}</a>
  `).join('');

  const sectionNav = page.sections.map((s) => `
    <a href="#${s.id}" class="legal-nav__sublink" data-legal-anchor="${s.id}">${s.title}</a>
  `).join('');

  return `
    <section class="legal-hero" id="legal-hero" aria-label="${page.eyebrow}">
      <div class="container">
        <p class="legal-hero__eyebrow">${page.eyebrow}</p>
        <h1 class="legal-hero__title">${page.title} <span class="accent">${page.accent}</span></h1>
        <p class="legal-hero__intro">${page.intro}</p>
      </div>
    </section>

    <section class="section legal-page" id="legal-page" data-legal-page>
      <div class="container legal-page__layout">
        <nav class="legal-nav" aria-label="Legal pages">
          <div class="legal-nav__primary">${nav}</div>
          <div class="legal-nav__sections" aria-label="On this page">
            ${sectionNav}
          </div>
        </nav>
        <article class="legal-prose">
          <p class="legal-prose__updated">Last updated: ${page.lastUpdated}</p>
          ${page.sections.map(renderSection).join('')}
        </article>
      </div>
    </section>
  `;
}

export function getLegalMeta(pageId) {
  const titles = {
    privacy: 'Privacy Policy | Gladhat',
    terms: 'Terms of Use | Gladhat',
    cookies: 'Cookie Policy | Gladhat',
    disclaimer: 'Disclaimer | Gladhat',
  };
  const paths = {
    privacy: '/privacy',
    terms: '/terms',
    cookies: '/cookie-policy',
    disclaimer: '/disclaimer',
  };
  return {
    title: titles[pageId] || 'Legal | Gladhat',
    description: LEGAL_PAGES[pageId]?.intro || '',
    path: paths[pageId] || '/privacy',
  };
}
