import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { lockScroll } from '../smooth';
import type { Lang } from '../data';

const LINES: Record<Lang, string[]> = {
  en: ['Charging the core', 'Loading 9 delivered products', 'Syncing 36 store listings', 'Plotting orbits'],
  mn: ['Цөмийг цэнэглэж байна', '9 бүтээгдэхүүнийг ачаалж байна', 'Store-ын 36 аппыг холбож байна', 'Тойрог замыг зурж байна'],
};

/**
 * One-time cinematic intro: a 0–100 counter, then the screen splits open
 * along a light seam to reveal the site. Shown once per browser session.
 */
export default function Boot({ lang, onDone }: { lang: Lang; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [line, setLine] = useState(0);

  useLayoutEffect(() => {
    lockScroll(true);
    const q = gsap.utils.selector(root);
    const count = { v: 0 };
    const num = q('.boot-num')[0] as HTMLElement;
    const tl = gsap.timeline({
      onComplete: () => {
        lockScroll(false);
        onDone();
      },
    });

    tl.from(q('.boot-mark'), { scale: 0, rotate: -90, duration: 0.8, ease: 'back.out(1.6)' })
      .to(count, {
        v: 100,
        duration: 1.9,
        ease: 'power2.inOut',
        onUpdate: () => {
          num.textContent = String(Math.round(count.v)).padStart(3, '0');
          setLine(Math.min(LINES.en.length - 1, Math.floor(count.v / 26)));
        },
      }, '<0.1')
      .to(q('.boot-bar span'), { scaleX: 1, duration: 1.9, ease: 'power2.inOut' }, '<')
      // wait for fonts so the reveal lands on final typography
      .add(() => { tl.pause(); document.fonts.ready.then(() => tl.resume()); })
      .to(q('.boot-content'), { scale: 0.92, opacity: 0, duration: 0.45, ease: 'power2.in' })
      .fromTo(q('.boot-seam'), { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: 'expo.out' }, '-=0.1')
      .to(q('.boot-top'), { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '+=0.05')
      .to(q('.boot-bot'), { yPercent: 100, duration: 1, ease: 'expo.inOut' }, '<')
      .to(q('.boot-seam'), { opacity: 0, duration: 0.4 }, '<0.3');

    return () => {
      tl.kill();
      lockScroll(false);
    };
    // the intro runs once; language switches only change the captions
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="boot" ref={root} role="presentation">
      <div className="boot-top" />
      <div className="boot-bot" />
      <div className="boot-seam" />
      <div className="boot-content">
        <svg className="boot-mark" viewBox="0 0 80 80" aria-hidden="true">
          <ellipse cx="40" cy="40" rx="34" ry="13" transform="rotate(-24 40 40)" />
          <ellipse cx="40" cy="40" rx="24" ry="9" transform="rotate(32 40 40)" />
          <circle cx="40" cy="40" r="9" />
        </svg>
        <div className="boot-num">000</div>
        <div className="boot-bar"><span /></div>
        <p className="boot-line">{LINES[lang][line]}</p>
      </div>
    </div>
  );
}
