/* Main entry — aggregates all stylesheets */
import './styles/variables.css';
import './styles/fonts.css';
import './styles/reset.css';
import './styles/components.css';
import './styles/layout.css';
import './styles/grid.css';
import './styles/refinement.css';
import './styles/editorial.css';
import './styles/when-talk.css';

import { Router } from './router.js';
import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { initScrollReveal } from './utils/animations.js';
import { initInsightTriptych } from './utils/insight-triptych.js';
import { initApproachSpotlight } from './utils/approach-spotlight.js';
import { initFeaturedWork } from './utils/featured-work.js';
import { updateSEO } from './utils/seo.js';
import { getSite } from './services/content-service.js';

/* ── Bootstrap ────────────────────────────── */

const app = document.getElementById('app');

function render(pageContent, meta) {
  updateSEO(meta);

  app.innerHTML = `
    <a href="#main-content" class="skip-link">Skip to content</a>
    ${Header(meta.path)}
    <main id="main-content" class="page-transition">
      ${pageContent}
    </main>
    ${Footer(meta.path)}
  `;

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  // Re-bind header interactions
  bindHeader(meta.path);
  bindAudioPrompt();
  bindScrollytelling();
  bindWorkFilters();
  bindLegalNav();
  initInsightTriptych();
  if (!document.querySelector('[data-island="approach-spotlight"]')) {
    initApproachSpotlight();
  }
  if (!document.querySelector('[data-island="featured-work"]')) {
    initFeaturedWork();
  }
  // Initialise scroll animations
  requestAnimationFrame(() => initScrollReveal());
  window.dispatchEvent(new CustomEvent('gladhat:route-ready'));
  // Scroll to top
  window.scrollTo(0, 0);
}

function bindScrollytelling() {
  const steps = document.querySelectorAll('.scrolly-step');
  const images = document.querySelectorAll('.scrolly-img');
  const thumb = document.getElementById('scrolly-thumb');
  const counter = document.getElementById('scrolly-current');
  
  if (!steps.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stepNum = parseInt(entry.target.getAttribute('data-step'), 10);
        
        // Update thumb
        if (thumb) {
          thumb.style.top = ((stepNum - 1) / (steps.length - 1)) * 100 + '%';
        }
        
        // Update counter
        if (counter) {
          counter.innerText = '0' + stepNum;
        }

        // Update steps
        steps.forEach(s => s.classList.remove('active'));
        entry.target.classList.add('active');
        
        // Update images
        images.forEach(img => {
          if (parseInt(img.getAttribute('data-img'), 10) === stepNum) {
            img.classList.add('active');
          } else {
            img.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-40% 0px -40% 0px',
    threshold: 0
  });

  steps.forEach(step => observer.observe(step));
}

function bindAudioPrompt() {
  let activePrompt = null;
  let activeAudio = null;

  function setPromptState(btn, playing) {
    btn.classList.toggle('audio-prompt--playing', playing);
    btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
    const label = btn.querySelector('.audio-prompt__text');
    if (label) {
      label.innerHTML = playing
        ? '<span class="emoji">⏸️</span> Pause Reading'
        : '<span class="emoji">🎧</span> Prefer to listen? I\'ll read it to you.';
    }
  }

  function stopActive() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (activeAudio) {
      activeAudio.pause();
      activeAudio.currentTime = 0;
      activeAudio = null;
    }
    if (activePrompt) {
      setPromptState(activePrompt, false);
      activePrompt = null;
    }
  }

  const buttons = document.querySelectorAll('.audio-prompt[data-audio-text], .audio-prompt[data-audio-src]');

  buttons.forEach(btn => {
    const text = btn.getAttribute('data-audio-text');
    const src = btn.getAttribute('data-audio-src');
    if (!text && !src) return;

    btn.addEventListener('click', () => {
      const isPlaying = activePrompt === btn
        && ((activeAudio && !activeAudio.paused) || ('speechSynthesis' in window && window.speechSynthesis.speaking));

      if (isPlaying) {
        stopActive();
        return;
      }

      stopActive();

      if (src) {
        const audio = new Audio(src);
        activeAudio = audio;
        activePrompt = btn;
        setPromptState(btn, true);
        audio.addEventListener('ended', stopActive);
        audio.addEventListener('error', stopActive);
        audio.play().catch(() => stopActive());
        return;
      }

      if (!text || !('speechSynthesis' in window)) return;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB';
      utterance.rate = 0.95;
      utterance.pitch = 0.95;

      activePrompt = btn;
      setPromptState(btn, true);

      utterance.onend = stopActive;
      utterance.onerror = stopActive;

      window.speechSynthesis.speak(utterance);
    });
  });
}

function bindHeader(currentPath = '/') {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const isHome = currentPath === '/';
  if (!isHome) {
    header.classList.add('site-header--solid');
  }

  // Internal nav links (scroll + mobile menu handled by header-effects island)
  app.querySelectorAll('a[href^="/"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('//') && !href.startsWith('/mailto') && !link.hasAttribute('target')) {
        e.preventDefault();
        router.navigate(href);
      }
    });
  });
}

function bindWorkFilters() {
  const grid = document.querySelector('[data-work-grid]');
  const filters = document.querySelectorAll('[data-work-filter]');
  if (!grid || !filters.length) return;

  const storyCards = grid.querySelectorAll('[data-work-item="story"]');
  const testimonial = grid.querySelector('[data-work-item="testimonial"]');

  function applyFilter(filterId) {
    filters.forEach((btn) => {
      const active = btn.dataset.workFilter === filterId;
      btn.classList.toggle('work-filter--active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    storyCards.forEach((card) => {
      const categories = (card.dataset.categories || '').split(/\s+/).filter(Boolean);
      const show = filterId === 'all' || categories.includes(filterId);
      card.toggleAttribute('hidden', !show);
    });

    if (testimonial) {
      testimonial.toggleAttribute('hidden', false);
    }
  }

  filters.forEach((btn) => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.workFilter));
  });
}

function bindLegalNav() {
  const page = document.querySelector('[data-legal-page]');
  if (!page) return;

  const sections = page.querySelectorAll('[data-legal-section]');
  const anchors = page.querySelectorAll('[data-legal-anchor]');
  if (!sections.length || !anchors.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      anchors.forEach((link) => {
        link.classList.toggle('legal-nav__sublink--active', link.dataset.legalAnchor === id);
      });
    });
  }, {
    rootMargin: '-30% 0px -55% 0px',
    threshold: 0,
  });

  sections.forEach((section) => observer.observe(section));
}

const router = new Router(render);
getSite().finally(() => {
  router.init();
});
