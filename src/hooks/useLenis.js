import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Custom hook for silky-smooth 60fps scrolling using Lenis.
 * Automatically manages animation frames, garbage collection, and global navigation scroll.
 */
export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Only enable in browser environment
    if (typeof window === 'undefined') return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return lenisRef;
}

/**
 * Utility helper to smoothly scroll to any element or coordinate
 */
export function smoothScrollTo(target, options = {}) {
  if (window.__lenis) {
    window.__lenis.scrollTo(target, { offset: -80, duration: 1.2, ...options });
  } else {
    if (typeof target === 'string') {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  }
}
