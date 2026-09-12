/* Shared portfolio metadata for /work — filters, covers, outcomes */

export const WORK_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'brand', label: 'Brand' },
  { id: 'growth', label: 'Growth' },
  { id: 'leadership', label: 'Leadership' },
];

export const PORTFOLIO_STORIES = [
  {
    slug: 'server-factory',
    number: '01',
    subtitle: 'Server Factory',
    title: "Seeing Through the Buyer's Eyes",
    text: 'How customer and competitor research helped Server Factory support different buyers, clarify its value and reshape its website and demand generation.',
    link: '/server-factory',
    cta: 'Read the Server Factory story',
    img: '/images/logos/server_factory.png',
    cover: '/images/epic_founders.png',
    categories: ['strategy', 'growth'],
    categoryLabel: 'Strategy',
    outcome: 'Reshaped website and demand generation',
  },
  {
    slug: 'firstlight',
    number: '02',
    subtitle: 'First Light',
    title: 'Finding the Right Language',
    text: 'How research and close collaboration translated a vision connecting technology, nature and wellbeing into a clear name, message and brand.',
    link: '/firstlight',
    cta: 'Read the First Light story',
    img: '/images/logos/first_light.png',
    cover: '/images/epic_essence.png',
    categories: ['brand'],
    categoryLabel: 'Brand',
    outcome: 'Clear name, message and brand',
  },
  {
    slug: 'tonbo',
    number: '03',
    subtitle: 'Tonbo Ventures',
    title: 'Recognising the Value of Thinking',
    text: 'A candid story about strategic thinking, invisible value and the project that changed how I define, structure and price my work.',
    link: '/tonbo',
    cta: 'Read the Tonbo story',
    img: '/images/logos/tonbo.png',
    cover: '/images/epic_connecting.png',
    categories: ['leadership', 'strategy'],
    categoryLabel: 'Leadership',
    outcome: 'Strategic thinking recognised and valued',
  },
  {
    slug: 'ensights',
    number: '04',
    subtitle: 'enSights',
    title: 'Connecting Expertise with Understanding',
    text: 'How technical expertise and persistent questioning became clearer thought leadership, customer communication and commercial outreach.',
    link: '/ensights',
    cta: 'Read the enSights story',
    img: '/images/logos/ensights.png',
    cover: '/images/epic_beyond.png',
    categories: ['growth', 'strategy'],
    categoryLabel: 'Growth',
    outcome: 'Clearer thought leadership and outreach',
  },
  {
    slug: 'provengo',
    number: '05',
    subtitle: 'Provengo',
    title: 'Simplifying Complexity',
    text: 'How a sophisticated systems-engineering platform was translated into a clearer story for investors, product teams and customers.',
    link: '/provengo',
    cta: 'Read the Provengo story',
    img: '/images/logos/provengo.svg',
    cover: '/images/epic_curiosity.png',
    categories: ['brand', 'strategy'],
    categoryLabel: 'Brand',
    outcome: 'Clearer story for investors and customers',
  },
];

export function mergePortfolioStories(cmsStories, imageUrl) {
  if (!cmsStories?.length) return PORTFOLIO_STORIES;

  return cmsStories.map((s, i) => {
    const fallback = PORTFOLIO_STORIES.find((d) => d.slug === s.slug)
      || PORTFOLIO_STORIES[i]
      || PORTFOLIO_STORIES[0];
    const excerpt = typeof s.excerpt === 'string' ? s.excerpt.replace(/<[^>]+>/g, '').trim() : '';
    const name = s.client || fallback.subtitle || s.title;

    return {
      ...fallback,
      subtitle: name,
      title: s.title || fallback.title,
      text: excerpt || fallback.text,
      link: `/${s.slug}`,
      cta: `Read the ${name} story`,
      img: imageUrl(s.image, fallback.img),
      cover: imageUrl(s.cover || s.image, fallback.cover),
    };
  });
}
