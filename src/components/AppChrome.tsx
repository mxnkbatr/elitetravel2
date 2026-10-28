import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { scrollTo } from '../smooth';
import { UI, type Lang } from '../data';

const TABS = [
  { id: 'home', icon: 'M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z' },
  { id: 'work', icon: 'M4 7h16v12H4zM9 7V5h6v2M4 12h16' },
  { id: 'stack', icon: 'm12 3 9 5-9 5-9-5zm-9 9 9 5 9-5M3 16l9 5 9-5' },
  { id: 'path', icon: 'M6 3v18M6 7h9l-2 3 2 3H6' },
  { id: 'contact', icon: 'M4 6h16v12H4zm0 0 8 7 8-7' },
] as const;

type TabId = (typeof TABS)[number]['id'];

function label(t: (typeof UI)[Lang], id: TabId) {
  if (id === 'home') return t.home;
  if (id === 'contact') return t.tabContact;
  return t.nav[id];
}

/** Bottom tab bar shown on phones, highlighting the section in view. */
export function TabBar({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const [active, setActive] = useState<TabId>('home');

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(en => en.isIntersecting && setActive(en.target.id as TabId)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    TABS.forEach(tab => {
      const el = document.getElementById(tab.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const go = (id: TabId) => {
    navigator.vibrate?.(8);
    setActive(id);
    const el = document.getElementById(id);
    if (el) scrollTo(id === 'home' ? 0 : el, id === 'home' ? 0 : -24);
  };

  return (
    <nav className="tabbar" aria-label="Sections">
      {TABS.map(tab => (
        <button key={tab.id} type="button" className="tab" aria-current={active === tab.id ? 'true' : undefined} onClick={() => go(tab.id)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d={tab.icon} /></svg>
          <span>{label(t, tab.id)}</span>
        </button>
      ))}
    </nav>
  );
}

interface InstallEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const standalone = () =>
  matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone === true;

/**
 * "Install app" button: uses the native prompt on Android/Chrome and shows
 * Add to Home Screen steps on iOS Safari. Hidden once installed.
 */
export function InstallButton({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const [deferred, setDeferred] = useState<InstallEvent | null>(null);
  const [sheet, setSheet] = useState(false);
  const [installed, setInstalled] = useState(standalone);
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) && !/crios|fxios/i.test(navigator.userAgent);

  useEffect(() => {
    const onPrompt = (e: Event) => { e.preventDefault(); setDeferred(e as InstallEvent); };
    const onInstalled = () => { setInstalled(true); setDeferred(null); };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  useEffect(() => {
    if (!sheet) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSheet(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sheet]);

  if (installed || (!deferred && !ios)) return null;

  const install = async () => {
    if (deferred) {
      await deferred.prompt();
      const { outcome } = await deferred.userChoice;
      if (outcome === 'accepted') setInstalled(true);
      setDeferred(null);
    } else {
      setSheet(true);
    }
  };

  return (
    <>
      <button type="button" className="install" onClick={install} aria-label={t.install}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" /></svg>
        <span>{t.install}</span>
      </button>
      {sheet && createPortal(
        <div className="sheet-backdrop" onClick={() => setSheet(false)}>
          <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title" onClick={e => e.stopPropagation()}>
            <span className="sheet-grip" aria-hidden="true" />
            <img src="/icon-192.png" alt="" width="64" height="64" />
            <h2 id="sheet-title">{t.installTitle}</h2>
            <ol>
              {t.installIos.map(step => <li key={step}>{step}</li>)}
            </ol>
            <button type="button" className="btn" onClick={() => setSheet(false)}>{t.close}</button>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
