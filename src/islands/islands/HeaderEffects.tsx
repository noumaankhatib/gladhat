import { useEffect, useRef, useCallback } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import type { IslandProps } from '../types';

const SCROLL_THRESHOLD = 80;

export function HeaderEffects({ node }: IslandProps) {
  const headerRef = useRef<HTMLElement | null>(null);
  const isHome = node.dataset.isHome === 'true';

  useEffect(() => {
    headerRef.current = node.closest('#site-header') as HTMLElement | null;
    if (!headerRef.current && node.id === 'site-header') {
      headerRef.current = node;
    }
  }, [node]);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const header = headerRef.current;
    if (!header) return;
    header.classList.toggle('site-header--scrolled', latest > SCROLL_THRESHOLD);
    if (!isHome) {
      header.classList.add('site-header--solid');
    }
  });

  const trapFocus = useCallback((container: HTMLElement) => {
    const focusable = container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
        return;
      }
      if (event.key !== 'Tab' || focusable.length === 0) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    const closeMenu = () => {
      const toggle = document.getElementById('menu-toggle');
      const mobileNav = document.getElementById('mobile-nav');
      toggle?.classList.remove('menu-toggle--open');
      mobileNav?.classList.remove('mobile-nav--open');
      toggle?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      container.removeEventListener('keydown', onKeyDown);
      toggle?.focus();
    };

    container.addEventListener('keydown', onKeyDown);
    first?.focus();
    return closeMenu;
  }, []);

  useEffect(() => {
    const toggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    if (!toggle || !mobileNav) return;

    let cleanupFocus: (() => void) | undefined;

    const onToggle = () => {
      const open = toggle.classList.toggle('menu-toggle--open');
      mobileNav.classList.toggle('mobile-nav--open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';

      if (open) {
        cleanupFocus?.();
        cleanupFocus = trapFocus(mobileNav);
        mobileNav.querySelectorAll('.mobile-nav__link').forEach((link, index) => {
          link.classList.toggle('mobile-nav__link--visible', true);
          (link as HTMLElement).style.setProperty('--link-index', String(index));
        });
      } else {
        cleanupFocus?.();
        cleanupFocus = undefined;
      }
    };

    toggle.addEventListener('click', onToggle);

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toggle.classList.remove('menu-toggle--open');
        mobileNav.classList.remove('mobile-nav--open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        cleanupFocus?.();
        cleanupFocus = undefined;
      });
    });

    return () => {
      toggle.removeEventListener('click', onToggle);
      cleanupFocus?.();
    };
  }, [trapFocus]);

  return null;
}
