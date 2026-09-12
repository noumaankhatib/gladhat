/* Gladhat frontend behaviour — ported from src/main.js without the SPA router. */

function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  elements.forEach((el) => observer.observe(el));
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

        if (thumb) {
          thumb.style.top = ((stepNum - 1) / (steps.length - 1)) * 100 + '%';
        }

        if (counter) {
          counter.innerText = '0' + stepNum;
        }

        steps.forEach(s => s.classList.remove('active'));
        entry.target.classList.add('active');

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

function bindHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const isHome = header.classList.contains('site-header--over-hero');
  if (!isHome) {
    header.classList.add('site-header--solid');
  }

  if (!document.querySelector('[data-island="header-effects"]')) {
    const toggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const onScroll = () => {
      const scrolled = window.scrollY > 40;
      header.classList.toggle('site-header--scrolled', scrolled);
      if (!isHome) {
        header.classList.add('site-header--solid');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (toggle && mobileNav) {
      toggle.addEventListener('click', () => {
        const open = toggle.classList.toggle('menu-toggle--open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        mobileNav.classList.toggle('mobile-nav--open', open);
        document.body.style.overflow = open ? 'hidden' : '';
      });

      mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          toggle.classList.remove('menu-toggle--open');
          toggle.setAttribute('aria-expanded', 'false');
          mobileNav.classList.remove('mobile-nav--open');
          document.body.style.overflow = '';
        });
      });
    }
  }
}

function bindKeyValues3D() {
  const section = document.getElementById('section-key-values');
  if (!section) return;

  bindKeyValuesToggle(section);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cards = section.querySelectorAll('[data-key-values-card]');
  if (!cards.length) return;

  cards.forEach((card) => {
    const visual = card.querySelector('[data-key-values-visual]');
    if (!visual) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = 0;

    const render = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      visual.style.transform = `rotateX(${currentY}deg) rotateY(${currentX}deg) translateZ(28px)`;
      rafId = requestAnimationFrame(render);
    };

    card.addEventListener('mouseenter', () => {
      if (!rafId) rafId = requestAnimationFrame(render);
    });

    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 22;
      targetY = -y * 18;
    });

    card.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
      window.setTimeout(() => {
        if (Math.abs(targetX) < 0.05 && Math.abs(targetY) < 0.05 && Math.abs(currentX) < 0.05 && Math.abs(currentY) < 0.05) {
          cancelAnimationFrame(rafId);
          rafId = 0;
          visual.style.transform = '';
        }
      }, 400);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('key-values__card--in-view', entry.isIntersecting);
    });
  }, { threshold: 0.35 });

  cards.forEach((card) => observer.observe(card));
}

function bindKeyValuesToggle(section) {
  const cards = section.querySelectorAll('[data-key-values-card]');

  cards.forEach((card) => {
    const trigger = card.querySelector('[data-key-values-trigger]');
    const details = card.querySelector('[data-key-values-details]');
    if (!trigger || !details) return;

    const hintCollapsed = trigger.querySelector('[data-hint-collapsed]');
    const hintExpanded = trigger.querySelector('[data-hint-expanded]');

    trigger.addEventListener('click', () => {
      const isOpen = card.classList.contains('key-values__card--open');

      cards.forEach((other) => {
        if (other === card) return;
        other.classList.remove('key-values__card--open');
        const otherTrigger = other.querySelector('[data-key-values-trigger]');
        const otherDetails = other.querySelector('[data-key-values-details]');
        if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        if (otherDetails) otherDetails.hidden = true;
        const otherCollapsed = other.querySelector('[data-hint-collapsed]');
        const otherExpanded = other.querySelector('[data-hint-expanded]');
        if (otherCollapsed) otherCollapsed.hidden = false;
        if (otherExpanded) otherExpanded.hidden = true;
      });

      if (isOpen) {
        card.classList.remove('key-values__card--open');
        trigger.setAttribute('aria-expanded', 'false');
        details.hidden = true;
        if (hintCollapsed) hintCollapsed.hidden = false;
        if (hintExpanded) hintExpanded.hidden = true;
        return;
      }

      card.classList.add('key-values__card--open');
      trigger.setAttribute('aria-expanded', 'true');
      details.hidden = false;
      if (hintCollapsed) hintCollapsed.hidden = true;
      if (hintExpanded) hintExpanded.hidden = false;
    });
  });
}

function bindInsightTriptych() {
  const section = document.getElementById('section-insight-triptych');
  if (!section) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      section.classList.add('insight-triptych--in-view');
      observer.disconnect();
    });
  }, { threshold: 0.28 });

  observer.observe(section);

  if (reducedMotion) return;

  const visual = section.querySelector('.insight-triptych__visual img');
  if (!visual) return;

  let ticking = false;

  const updateParallax = () => {
    const rect = section.getBoundingClientRect();
    const viewHeight = window.innerHeight;
    if (rect.bottom < 0 || rect.top > viewHeight) {
      ticking = false;
      return;
    }

    const progress = (viewHeight - rect.top) / (viewHeight + rect.height);
    const offset = (progress - 0.5) * 28;
    visual.style.transform = `scale(1.08) translateY(${offset}px)`;
    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateParallax);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  updateParallax();
}

function bindApproachSpotlight() {
  const section = document.getElementById('section-approach-spotlight');
  if (!section) return;

  const steps = section.querySelectorAll('[data-approach-step]');
  const panels = section.querySelectorAll('[data-approach-panel]');
  const visual = section.querySelector('[data-approach-visual]');
  const total = steps.length;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      section.classList.add('approach-spotlight--in-view');
      observer.disconnect();
    });
  }, { threshold: 0.18 });

  observer.observe(section);

  const setApproachImage = (src, alt) => {
    if (!visual || visual.dataset.currentSrc === src) return;

    const apply = () => {
      visual.src = src;
      if (alt) visual.alt = alt;
      visual.dataset.currentSrc = src;
      visual.classList.remove('approach-spotlight__visual-img--changing');
    };

    if (reducedMotion) {
      apply();
      return;
    }

    visual.classList.add('approach-spotlight__visual-img--changing');
    window.setTimeout(apply, 220);
  };

  const updateProgress = (index) => {
    const fill = section.querySelector('[data-approach-progress]');
    if (!fill || total <= 1) return;
    const segment = 100 / total;
    fill.style.top = `${index * segment}%`;
    fill.style.height = `${segment}%`;
  };

  const openStep = (step, index) => {
    const panelId = step.dataset.stepPanel;
    const image = step.dataset.stepImage;
    const imageAlt = step.dataset.stepImageAlt || '';

    steps.forEach((item) => {
      item.classList.toggle('approach-spotlight__step--active', item === step);
      const btn = item.querySelector('[data-approach-trigger]');
      if (btn) btn.setAttribute('aria-expanded', item === step ? 'true' : 'false');
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.approachPanel === panelId;
      panel.hidden = !isActive;
      panel.classList.remove('approach-spotlight__panel--active');
      if (isActive) {
        requestAnimationFrame(() => {
          panel.classList.add('approach-spotlight__panel--active');
        });
      }
    });

    if (image) setApproachImage(image, imageAlt);
    updateProgress(index);
  };

  steps.forEach((step, index) => {
    const btn = step.querySelector('[data-approach-trigger]');
    if (!btn) return;
    btn.addEventListener('click', () => openStep(step, index));
  });

  if (steps.length) {
    openStep(steps[0], 0);
  }
}

function bindFeaturedWork() {
  const section = document.getElementById('section-real-businesses');
  if (!section) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      section.classList.add('featured-work--in-view');
      observer.disconnect();
    });
  }, { threshold: 0.22 });

  observer.observe(section);

  if (reducedMotion) return;

  const cards = section.querySelectorAll('.work-card');

  cards.forEach((card) => {
    const media = card.querySelector('.work-card__media img');
    if (!media) return;

    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      media.style.transform = `scale(1.06) translate(${x * 8}px, ${y * 6}px)`;
    });

    card.addEventListener('mouseleave', () => {
      media.style.transform = '';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  bindHeader();
  bindAudioPrompt();
  bindScrollytelling();
  bindWorkFilters();
  bindLegalNav();
  if (!document.querySelector('[data-island="key-values"]')) {
    bindKeyValues3D();
  }
  bindInsightTriptych();
  if (!document.querySelector('[data-island="approach-spotlight"]')) {
    bindApproachSpotlight();
  }
  if (!document.querySelector('[data-island="featured-work"]')) {
    bindFeaturedWork();
  }
  requestAnimationFrame(() => initScrollReveal());
});

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
