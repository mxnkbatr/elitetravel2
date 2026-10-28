import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/** Lenis smooth scrolling driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function startSmoothScroll() {
  if (lenis || matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, autoRaf: false });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

/** Scroll to an element or y position, smoothly when Lenis is running. */
export function scrollTo(target: HTMLElement | number, offset = 0) {
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.4 });
    return;
  }
  const y = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top: y });
}

/** Freeze page scrolling while an overlay (intro, command palette) is open. */
export function lockScroll(locked: boolean) {
  if (locked) lenis?.stop(); else lenis?.start();
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}
