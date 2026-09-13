/* ===================================================
   GLADHAT — Client-Side Router
   =================================================== */

import { HomePage } from './pages/Home.js';
import { WhenToTalkPage } from './pages/WhenToTalk.js';
import { WorkingTogetherPage } from './pages/WorkingTogether.js';
import { TrueStoriesPage } from './pages/TrueStories.js';
import { ServerFactoryPage } from './pages/ServerFactory.js';
import { FirstLightPage } from './pages/FirstLight.js';
import { TonboPage } from './pages/Tonbo.js';
import { EnSightsPage } from './pages/EnSights.js';
import { ProvengoPage } from './pages/Provengo.js';
import { MoreStoriesPage } from './pages/MoreStories.js';
import { SeeDifferentlyPage } from './pages/SeeDifferently.js';
import { AboutPage } from './pages/About.js';
import { ContactPage } from './pages/Contact.js';
import { ThoughtsPage } from './pages/Thoughts.js';
import { NotFoundPage } from './pages/NotFound.js';
import { PrivacyPage, privacyMeta } from './pages/Privacy.js';
import { TermsPage, termsMeta } from './pages/Terms.js';
import { CookiePolicyPage, cookiePolicyMeta } from './pages/CookiePolicy.js';
import { DisclaimerPage, disclaimerMeta } from './pages/Disclaimer.js';

const NOT_FOUND_META = {
  title: 'Page Not Found | Gladhat',
  description: 'The page you are looking for could not be found on gladhat.com.',
  path: '/404',
  noindex: true,
};

const routes = {
  '/': {
    page: HomePage,
    meta: {
      title: 'Commercial Strategy Consultant for Founders | Gladhat',
      description: 'Commercial strategy consultant helping founders use customer insight, positioning and clear messaging to uncover opportunities and make better decisions.',
      path: '/'
    }
  },
  '/when-we-should-talk': {
    page: WhenToTalkPage,
    meta: {
      title: 'When to Talk to a Commercial Strategy Consultant | Gladhat',
      description: 'Recognise the moments when an outside perspective can clarify your positioning, reveal opportunities and help you decide what to do next.',
      path: '/when-we-should-talk'
    }
  },
  '/working-together': {
    page: WorkingTogetherPage,
    meta: {
      title: 'How I Work with Founders | Gladhat',
      description: 'Explore a collaborative consulting process built on listening, research, respectful challenge and practical commercial thinking.',
      path: '/working-together'
    }
  },
  '/work': {
    page: TrueStoriesPage,
    meta: {
      title: 'Commercial Strategy and Messaging Stories | Gladhat',
      description: 'Stories from real projects where customer research, positioning and clearer communication changed the direction and value of the work.',
      path: '/work'
    }
  },
  '/server-factory': {
    page: ServerFactoryPage,
    meta: {
      title: 'Server Factory: Seeing Through the Buyer\'s Eyes | Gladhat',
      description: 'How customer and competitor research helped Server Factory support different buyers, clarify its value and reshape its website and demand generation.',
      path: '/server-factory'
    }
  },
  '/firstlight': {
    page: FirstLightPage,
    meta: {
      title: 'First Light: Finding the Right Language | Gladhat',
      description: 'How research and close collaboration translated a vision connecting technology, nature and wellbeing into a clear name, message and brand.',
      path: '/firstlight'
    }
  },
  '/tonbo': {
    page: TonboPage,
    meta: {
      title: 'Tonbo: Recognising the Value of Thinking | Gladhat',
      description: 'A candid story about strategic thinking, invisible value and the project that changed how I define, structure and price my work.',
      path: '/tonbo'
    }
  },
  '/ensights': {
    page: EnSightsPage,
    meta: {
      title: 'enSights: Connecting Expertise with Understanding | Gladhat',
      description: 'How technical expertise and persistent questioning became clearer thought leadership, customer communication and commercial outreach for enSights.',
      path: '/ensights'
    }
  },
  '/provengo': {
    page: ProvengoPage,
    meta: {
      title: 'Provengo: Simplifying Complexity | Gladhat',
      description: 'How Provengo\'s sophisticated systems-engineering platform was translated into a clearer story for investors, product teams and customers.',
      path: '/provengo'
    }
  },
  '/more-stories': {
    page: MoreStoriesPage,
    meta: {
      title: 'More Strategy, Messaging and Brand Work | Gladhat',
      description: 'A broader selection of positioning, messaging, website and campaign work across technology, education, wellbeing and professional services.',
      path: '/more-stories'
    }
  },
  '/see-your-business-differently': {
    page: SeeDifferentlyPage,
    meta: {
      title: 'Business Clarity Exercises for Founders | Gladhat',
      description: 'Six reflective business exercises to help founders see their value, messaging, assumptions and hidden commercial opportunities more clearly.',
      path: '/see-your-business-differently'
    }
  },
  '/about': {
    page: AboutPage,
    meta: {
      title: 'Michael Simkin | Commercial Strategy Consultant | Gladhat',
      description: 'Meet Michael Simkin, a commercial strategy consultant combining customer insight, positioning, writing and curiosity to help founders see clearly.',
      path: '/about'
    }
  },
  '/contact': {
    page: ContactPage,
    meta: {
      title: 'Contact Michael Simkin | Gladhat',
      description: 'Tell me about your business, what feels stuck and what you are trying to achieve. Email Michael Simkin directly to start a relaxed introductory conversation.',
      path: '/contact'
    }
  },
  '/theblog': {
    page: ThoughtsPage,
    meta: {
      title: 'Ideas on Business, Positioning and Communication | Gladhat',
      description: 'Ideas, questions and reflections on business clarity, positioning, customer psychology, communication and the human side of commercial decisions.',
      path: '/theblog'
    }
  },
  '/privacy': {
    page: PrivacyPage,
    meta: privacyMeta,
  },
  '/terms': {
    page: TermsPage,
    meta: termsMeta,
  },
  '/cookie-policy': {
    page: CookiePolicyPage,
    meta: cookiePolicyMeta,
  },
  '/disclaimer': {
    page: DisclaimerPage,
    meta: disclaimerMeta,
  },
};

function getBasePath() {
  return (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
}

/** Strips the deploy base path (e.g. "/preview") from a site-root pathname. */
function stripBasePath(pathname) {
  const base = getBasePath();
  if (base && pathname.startsWith(base)) {
    return pathname.slice(base.length) || '/';
  }
  return pathname;
}

export class Router {
  constructor(renderFn) {
    this.render = renderFn;
    this.routes = routes;
  }

  init() {
    window.addEventListener('popstate', () => this.resolve());
    this.resolve();
  }

  navigate(path) {
    window.history.pushState(null, '', getBasePath() + path);
    this.resolve();
  }

  resolve() {
    const path = stripBasePath(window.location.pathname).replace(/\/+$/, '') || '/';
    const route = this.routes[path];

    if (!route) {
      Promise.resolve(NotFoundPage())
        .then((content) => this.render(content, NOT_FOUND_META))
        .catch(() => this.render('', NOT_FOUND_META));
      return;
    }

    Promise.resolve(route.page())
      .then((content) => {
        const meta = { ...route.meta };
        if (content && typeof content === 'object' && content.html) {
          if (content.meta) Object.assign(meta, content.meta);
          this.render(content.html, meta);
          return;
        }
        this.render(content, meta);
      })
      .catch((err) => {
        console.error('[router] failed to render', path, err);
        Promise.resolve(NotFoundPage())
          .then((content) => this.render(content, NOT_FOUND_META));
      });
  }
}
