import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import ClickSpark from './components/reactbits/ClickSpark';
import CountUp from './components/reactbits/CountUp';
import DecryptedText from './components/reactbits/DecryptedText';
import Magnet from './components/reactbits/Magnet';
import ScrollReveal from './components/reactbits/ScrollReveal';
import ScrollVelocity from './components/reactbits/ScrollVelocity';
import ShinyText from './components/reactbits/ShinyText';
import SplitText from './components/reactbits/SplitText';
import SpotlightCard from './components/reactbits/SpotlightCard';
import Orbit from './components/Orbit';
import { InstallButton, TabBar } from './components/AppChrome';
import { scrollTo, startSmoothScroll } from './smooth';
import { CORE, EMAIL, LANGS, MARQUEE, PROJECTS, STACK, STATS, STORE_ACCOUNTS, STORE_APPS, TIMELINE, UI, type Lang, type Project } from './data';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const GLYPHS = 'ΔΣΩЖӨҮ01<>/{}#*+=';
const CARD_SURFACE = {
  '--spotlight-card-surface': 'rgba(16, 22, 62, 0.72)',
  '--spotlight-card-border': 'rgba(140, 165, 255, 0.16)',
} as React.CSSProperties;

function initialLang(): Lang {
  const q = new URLSearchParams(location.search).get('lang');
  if (q === 'en' || q === 'mn') return q;
  try {
    const s = localStorage.getItem('lang');
    if (s === 'en' || s === 'mn') return s;
  } catch { /* storage unavailable */ }
  return navigator.language.toLowerCase().startsWith('mn') ? 'mn' : 'en';
}

export default function App() {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [toast, setToast] = useState('');
  const t = UI[lang];
  const root = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);
  const workTrigger = useRef<ScrollTrigger | null>(null);
  const touch = typeof matchMedia !== 'undefined' && matchMedia('(hover: none)').matches;

  useEffect(() => startSmoothScroll(), []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem('lang', lang); } catch { /* storage unavailable */ }
    // text length changes with language; let pinned sections re-measure
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [lang]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const id = e.currentTarget.getAttribute('href')!.slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    scrollTo(el, id === 'top' ? 0 : -40);
  };

  // Orbit click: jump to that product's card, accounting for the horizontal pin.
  const pick = useCallback((id: string) => {
    const card = document.getElementById(`p-${id}`);
    if (!card) return;
    const st = workTrigger.current;
    if (st) {
      const track = card.parentElement!;
      const max = track.scrollWidth - window.innerWidth;
      const progress = Math.min(1, Math.max(0, (card.offsetLeft - window.innerWidth * 0.25) / max));
      scrollTo(st.start + progress * (st.end - st.start));
    } else {
      // phones: bring the carousel into view, then swipe it to the card
      scrollTo(document.getElementById('work')!, -24);
      const track = trackRef.current!;
      track.scrollTo({ left: card.offsetLeft - track.offsetLeft - (track.clientWidth - card.offsetWidth) / 2, behavior: 'smooth' });
    }
    card.classList.add('flash');
    setTimeout(() => card.classList.remove('flash'), 2200);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        { motion: '(prefers-reduced-motion: no-preference)', wide: '(min-width: 1024px)' },
        ctx => {
          const { motion, wide } = ctx.conditions as { motion: boolean; wide: boolean };
          if (!motion) return;

          // hero intro, then scroll-linked exit
          gsap.from('.hero-reveal', { y: 30, opacity: 0, duration: 1, stagger: 0.12, ease: 'expo.out', delay: 0.5 });
          gsap.from('.nav', { y: -40, opacity: 0, duration: 1, ease: 'expo.out', delay: 0.2 });
          gsap.to('.hero-copy', {
            yPercent: -30, opacity: 0, ease: 'none',
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
          });
          gsap.to('.orbit', {
            scale: 1.35, opacity: 0.25, ease: 'none',
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
          });

          // stats rise in
          gsap.from('.stats li', {
            y: 40, opacity: 0, stagger: 0.08, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: '.stats', start: 'top 85%' },
          });

          // projects: horizontal pinned track on wide screens
          if (wide) {
            const track = document.querySelector<HTMLElement>('.track')!;
            const distance = () => track.scrollWidth - window.innerWidth;
            const tween = gsap.to(track, {
              x: () => -distance(),
              ease: 'none',
              scrollTrigger: {
                trigger: '.work',
                start: 'top top',
                end: () => `+=${distance()}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                anticipatePin: 1,
                onUpdate: self => gsap.set('.work-bar span', { scaleX: self.progress }),
              },
            });
            workTrigger.current = tween.scrollTrigger ?? null;
            // cards tilt into place as they cross the viewport
            gsap.utils.toArray<HTMLElement>('.track .card').forEach(card => {
              gsap.from(card, {
                rotateY: -18, z: -120, opacity: 0.35, ease: 'none',
                scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left 100%', end: 'left 55%', scrub: true },
              });
            });
          } else {
            workTrigger.current = null;
            ScrollTrigger.batch('.track .card', {
              start: 'top 88%',
              onEnter: els => gsap.from(els, { y: 50, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out' }),
              once: true,
            });
          }

          // toolkit
          gsap.from('.core > *', {
            scale: 0.6, opacity: 0, stagger: 0.06, duration: 0.8, ease: 'back.out(1.8)',
            scrollTrigger: { trigger: '.core', start: 'top 85%' },
          });
          ScrollTrigger.batch('.grp', {
            start: 'top 90%',
            onEnter: els => gsap.from(els, { y: 30, opacity: 0, stagger: 0.07, duration: 0.7, ease: 'power2.out' }),
            once: true,
          });

          // timeline line draws with scroll
          gsap.fromTo('.timeline-line', { scaleY: 0 }, {
            scaleY: 1, ease: 'none',
            scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 60%', scrub: true },
          });
          gsap.utils.toArray<HTMLElement>('.timeline .entry').forEach(li => {
            gsap.from(li, { x: -30, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: li, start: 'top 80%' } });
          });

          gsap.from('.channels li', {
            y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.channels', start: 'top 92%' },
          });
        },
      );

      return () => mm.revert();
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true },
  );

  // carousel position for the dots on phones
  const onSwipe = () => {
    const track = trackRef.current;
    if (!track || track.scrollWidth <= track.clientWidth) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    cards.forEach((c, i) => {
      if (Math.abs(c.offsetLeft - track.offsetLeft + c.offsetWidth / 2 - center) <
          Math.abs(cards[best].offsetLeft - track.offsetLeft + cards[best].offsetWidth / 2 - center)) best = i;
    });
    if (best !== slide) setSlide(best);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setToast(t.copied);
    } catch {
      setToast(EMAIL);
    }
    setTimeout(() => setToast(''), 1800);
  };

  return (
    <ClickSpark sparkColor={['#8ff3ff', '#ffb547', '#4c7dff']} sparkCount={10} sparkRadius={26} sparkSize={12} duration={500}>
      <div ref={root}>
        <a className="skip" href="#work" onClick={go}>{t.skip}</a>

        <header className="nav">
          <a className="brand" href="#top" onClick={go} aria-label="Home">
            <svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="5" /><ellipse cx="20" cy="20" rx="17" ry="7" transform="rotate(-24 20 20)" /></svg>
            <span>MD</span>
          </a>
          <nav className="links" aria-label="Sections">
            <a href="#work" onClick={go}>{t.nav.work}</a>
            <a href="#stack" onClick={go}>{t.nav.stack}</a>
            <a href="#path" onClick={go}>{t.nav.path}</a>
            <a href="#contact" onClick={go}>{t.nav.contact}</a>
          </nav>
          <div className="nav-right">
            <InstallButton lang={lang} />
            <div className="lang" role="group" aria-label="Language">
              {(['en', 'mn'] as Lang[]).map(l => (
                <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
              ))}
            </div>
            <Magnet padding={40} magnetStrength={4} wrapperClassName="nav-cta">
              <a className="btn btn-small" href="#contact" onClick={go}>{t.nav.hire}</a>
            </Magnet>
          </div>
        </header>

        <main id="top">
          {/* HERO */}
          <section className="hero" id="home">
            <Orbit lang={lang} onPick={pick} />
            <div className="hero-copy">
              <p className="status hero-reveal">
                <span className="pulse" />
                <ShinyText text={t.status} color="#8f98c2" shineColor="#ffffff" speed={3} />
              </p>
              <h1 className="name" aria-label={t.name.join(' ')}>
                <DecryptedText key={`a-${lang}`} text={t.name[0]} animateOn="view" sequential revealDirection="start" speed={45}
                  characters={GLYPHS} parentClassName="line" encryptedClassName="glyph" aria-hidden="true" />
                <DecryptedText key={`b-${lang}`} text={t.name[1]} animateOn="view" sequential revealDirection="start" speed={55}
                  characters={GLYPHS} parentClassName="line line-2" encryptedClassName="glyph" aria-hidden="true" />
              </h1>
              <p className="role hero-reveal">{t.role}</p>
              <p className="lede hero-reveal">{t.lede}</p>
              <div className="cta hero-reveal">
                <Magnet padding={60} magnetStrength={3}>
                  <a className="btn" href="#work" onClick={go}>{t.cta1}</a>
                </Magnet>
                <Magnet padding={60} magnetStrength={3}>
                  <a className="btn btn-ghost" href={t.cv} download>{t.cta2}</a>
                </Magnet>
              </div>
            </div>
            <p className="orbit-hint">{touch ? t.hintTouch : t.hint}</p>
            <div className="scroll-cue" aria-hidden="true"><span />{t.scroll}</div>
          </section>

          {/* PROFILE */}
          <section className="profile">
            <ScrollReveal key={lang} baseOpacity={0.08} enableBlur blurStrength={6} baseRotation={2}
              containerClassName="profile-reveal" textClassName="profile-text" highlightColor="#8ff3ff"
              wordAnimationEnd="bottom 55%" rotationEnd="bottom 55%">
              {t.profile}
            </ScrollReveal>
          </section>

          {/* STATS */}
          <section className="telemetry" aria-label={t.results}>
            <ul className="stats">
              {STATS.map(s => (
                <li key={s.label.en}>
                  <span className="num"><CountUp to={s.n} duration={2.2} suffix={s.s} /></span>
                  <span className="lbl">{s.label[lang]}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* MARQUEE */}
          <section className="marquee" aria-hidden="true">
            <ScrollVelocity texts={[MARQUEE.join('  ✦  ') + '  ✦  ', 'Web · iOS · Android · ERP · AI  ✦  ']} velocity={60}
              className="marquee-text" outlineAlternate skewWithVelocity={8} numCopies={4} />
          </section>

          {/* WORK */}
          <section className="work" id="work">
            <div className="work-head">
              <SplitText key={`w-${lang}`} text={t.workTitle} tag="h2" textAlign="left" splitType="chars" delay={25} effect="rise" mask />
              <p>{t.workSub}</p>
            </div>
            <div className="track" ref={trackRef} onScroll={onSwipe}>
              {PROJECTS.map(p => <Card key={p.id} p={p} lang={lang} />)}
            </div>
            <div className="work-bar" aria-hidden="true"><span /></div>
            <div className="dots" aria-hidden="true">
              {PROJECTS.map((p, i) => <span key={p.id} className={i === slide ? 'on' : ''} />)}
              <em>{t.swipe}</em>
            </div>
          </section>

          {/* STORES */}
          <section className="section" id="stores">
            <div className="section-head">
              <SplitText key={`st-${lang}`} text={t.storeTitle} tag="h2" textAlign="left" splitType="chars" delay={25} effect="rise" mask />
              <p>{t.storeSub}</p>
            </div>
            <div className="stores">
              {(['ios', 'android'] as const).map(store => {
                const apps = STORE_APPS.filter(a => a.store === store);
                return (
                  <SpotlightCard key={store} className={`store ${store}`} style={CARD_SURFACE}
                    spotlightColor={store === 'ios' ? '#8ff3ff' : '#ffb547'} ambient={false}>
                    <div className="store-head">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        {store === 'ios'
                          ? <path d="M16.4 12.6c0-2.5 2-3.7 2.1-3.8-1.2-1.7-3-1.9-3.6-2-1.5-.2-3 .9-3.8.9s-2-.9-3.3-.9c-1.7 0-3.3 1-4.1 2.5-1.8 3.1-.5 7.6 1.3 10.1.8 1.2 1.8 2.6 3.1 2.5 1.3 0 1.7-.8 3.2-.8s1.9.8 3.2.8c1.4 0 2.2-1.2 3-2.5.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.4-.9-2.4-4zM14 5.1c.7-.8 1.1-1.9 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.4z" />
                          : <path d="M3.6 2.3 13.4 12l-9.8 9.7c-.4-.2-.6-.6-.6-1.1V3.4c0-.5.2-.9.6-1.1zm11 8.5 2.6-2.6 3.3 1.9c.9.5.9 1.8 0 2.3l-3.3 1.9-2.6-2.6L13.4 12zM5 1.6l10.4 6-2.1 2.1zm8.3 12.7 2.1 2.1L5 22.4z" />}
                      </svg>
                      <h3>{store === 'ios' ? 'App Store' : 'Google Play'}</h3>
                    </div>
                    {apps.length > 0 && (
                      <ul className="store-apps">
                        {apps.map(a => (
                          <li key={a.url}>
                            <a href={a.url} target="_blank" rel="noopener">
                              {a.icon ? <img src={a.icon} alt="" width="56" height="56" loading="lazy" /> : <span className="app-ph">{a.name[0]}</span>}
                              <span><b>{a.name}</b>{a.category && <em>{a.category[lang]}</em>}</span>
                              <i>{t.storeGet}</i>
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                    <a className="store-all" href={STORE_ACCOUNTS[store]} target="_blank" rel="noopener">
                      {store === 'ios' ? t.storeIos : t.storeAndroid}
                    </a>
                  </SpotlightCard>
                );
              })}
            </div>
          </section>

          {/* STACK */}
          <section className="section" id="stack">
            <div className="section-head">
              <SplitText key={`s-${lang}`} text={t.stackTitle} tag="h2" textAlign="left" splitType="chars" delay={25} effect="rise" mask />
              <p>{t.stackSub}</p>
            </div>
            <div className="core">
              {CORE.map(c => (
                <Magnet key={c} padding={30} magnetStrength={5}><span className="chip">{c}</span></Magnet>
              ))}
            </div>
            <div className="stack">
              {STACK.map(g => (
                <div className="grp" key={g.title.en}>
                  <h3>{g.title[lang]}</h3>
                  <ul>{g.items.map(i => <li key={i}>{i}</li>)}</ul>
                </div>
              ))}
            </div>
          </section>

          {/* PATH */}
          <section className="section" id="path">
            <div className="section-head">
              <SplitText key={`p-${lang}`} text={t.pathTitle} tag="h2" textAlign="left" splitType="chars" delay={25} effect="rise" mask />
            </div>
            <div className="timeline">
              <span className="timeline-line" aria-hidden="true" />
              <ol>
              {TIMELINE.map(item => (
                <li key={item.when.en} className={`entry${item.now ? ' now' : ''}`}>
                  <div className="when">{item.when[lang]}</div>
                  <div>
                    <h3>{item.title[lang]}</h3>
                    <p className="where">{item.where[lang]}</p>
                    <ul>{item.points[lang].map(x => <li key={x}>{x}</li>)}</ul>
                  </div>
                </li>
              ))}
              </ol>
            </div>
            <div className="facts">
              <SpotlightCard className="fact" style={CARD_SURFACE} spotlightColor="#8ff3ff" ambient={false}>
                <h3>{t.edu}</h3>
                <p>British School of Ulaanbaatar</p>
              </SpotlightCard>
              <SpotlightCard className="fact" style={CARD_SURFACE} spotlightColor="#8ff3ff" ambient={false}>
                <h3>{t.langs}</h3>
                <ul className="langs">
                  {LANGS.map(l => <li key={l.en[0]}>{l[lang][0]}<span>{l[lang][1]}</span></li>)}
                </ul>
              </SpotlightCard>
            </div>
          </section>

          {/* CONTACT */}
          <section className="contact" id="contact">
            <SplitText key={`c-${lang}`} text={t.contactTitle} tag="h2" textAlign="center" splitType="words, chars" delay={18} effect="rise" mask />
            <p>{t.contactSub}</p>
            <div className="contact-main">
              <Magnet padding={80} magnetStrength={6}>
                <a className="mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </Magnet>
              <button className="btn btn-ghost btn-small" type="button" onClick={copy}>{t.copy}</button>
            </div>
            <ul className="channels">
              <li><a href="tel:+97699918122"><span>{t.phone}</span><b>+976 9991 8122</b></a></li>
              <li><a href="https://github.com/mxnkbatr" target="_blank" rel="noopener"><span>GitHub</span><b>mxnkbatr</b></a></li>
              <li><a href="https://www.linkedin.com/in/munkhbaatar-dorjsuren-030a81446" target="_blank" rel="noopener"><span>LinkedIn</span><b>Munkhbaatar Dorjsuren</b></a></li>
            </ul>
          </section>
        </main>

        <footer className="foot">
          <span>© {new Date().getFullYear()} Munkhbaatar Dorjsuren</span>
          <span>{t.footer}</span>
        </footer>

        <TabBar lang={lang} />
        <div className={`toast${toast ? ' show' : ''}`} role="status" aria-live="polite">{toast}</div>
      </div>
    </ClickSpark>
  );
}

function Card({ p, lang }: { p: Project; lang: Lang }) {
  const t = UI[lang];
  return (
    <SpotlightCard id={`p-${p.id}`} className={`card${p.featured ? ' featured' : ''}`} style={CARD_SURFACE}
      spotlightColor={p.kind.includes('mobile') && !p.kind.includes('web') ? '#ffb547' : '#8ff3ff'} spotlightSize={420}>
      <span className={`card-mark ${p.kind.length === 2 ? 'both' : p.kind[0]}`} aria-hidden="true">{p.name[0]}</span>
      <div className="card-top">
        <h3>{p.name}</h3>
        <div className="plat">{p.plat.map(x => <span key={x}>{x}</span>)}</div>
      </div>
      {p.featured ? (
        <>
          <div className="big-figs">
            <div><b><CountUp to={126} suffix="K" duration={2} /></b><span>{t.users}</span></div>
            <div><b><CountUp to={622} suffix="K" duration={2.4} /></b><span>{t.views}</span></div>
          </div>
          <p className="metric">{t.first2}</p>
          <svg className="big-art" viewBox="0 0 200 200" aria-hidden="true" fill="none">
            <g stroke="#8ff3ff" strokeOpacity=".5">
              <ellipse cx="100" cy="100" rx="96" ry="34" transform="rotate(-20 100 100)" />
              <ellipse cx="100" cy="100" rx="70" ry="24" transform="rotate(30 100 100)" />
              <ellipse cx="100" cy="100" rx="40" ry="40" strokeDasharray="2 6" />
            </g>
            <circle cx="100" cy="100" r="12" fill="#ffb547" />
          </svg>
        </>
      ) : (
        <p className="metric">{p.metric[lang]}</p>
      )}
      <p className="desc">{p.desc[lang]}</p>
      {p.url && (
        <a className="visit" href={p.url} target="_blank" rel="noopener">{t.visit} {p.url.replace('https://', '')}</a>
      )}
    </SpotlightCard>
  );
}
