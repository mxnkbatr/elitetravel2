import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { lockScroll } from '../smooth';
import { EMAIL, PROJECTS, UI, type Lang } from '../data';

export interface Command {
  id: string;
  group: string;
  label: string;
  hint?: string;
  run: () => void;
}

interface Props {
  lang: Lang;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goTo: (id: string) => void;
  pickProject: (id: string) => void;
  setLang: (l: Lang) => void;
  copyEmail: () => void;
}

const TEXT = {
  en: {
    placeholder: 'Type a command or search…',
    nav: 'Go to', projects: 'Projects', actions: 'Actions', links: 'Links',
    lang: 'Switch to Mongolian', copy: 'Copy email', cv: 'Download CV', mail: 'Write an email',
    empty: 'Nothing matches. Try “work” or “contact”.',
    hints: ['↑↓ move', '↵ open', 'esc close'],
  },
  mn: {
    placeholder: 'Команд бичих эсвэл хайх…',
    nav: 'Очих', projects: 'Төслүүд', actions: 'Үйлдэл', links: 'Холбоос',
    lang: 'Англи хэл рүү шилжих', copy: 'Имэйл хуулах', cv: 'CV татах', mail: 'Имэйл бичих',
    empty: 'Олдсонгүй. “work” эсвэл “холбоо” гэж оролдоорой.',
    hints: ['↑↓ сонгох', '↵ нээх', 'esc хаах'],
  },
} as const;

/** ⌘K / Ctrl+K / "/" command palette for jumping around the site. */
export default function CommandPalette({ lang, open, onOpenChange, goTo, pickProject, setLang, copyEmail }: Props) {
  const t = UI[lang];
  const x = TEXT[lang];
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);

  const commands = useMemo<Command[]>(() => {
    // run after the palette unmounts and scrolling is unlocked
    const close = (fn: () => void) => () => { onOpenChange(false); setTimeout(fn, 30); };
    return [
      { id: 'home', group: x.nav, label: t.home, run: close(() => goTo('home')) },
      { id: 'work', group: x.nav, label: t.nav.work, run: close(() => goTo('work')) },
      { id: 'stores', group: x.nav, label: t.storeTitle, run: close(() => goTo('stores')) },
      { id: 'stack', group: x.nav, label: t.nav.stack, run: close(() => goTo('stack')) },
      { id: 'path', group: x.nav, label: t.nav.path, run: close(() => goTo('path')) },
      { id: 'contact', group: x.nav, label: t.nav.contact, run: close(() => goTo('contact')) },
      ...PROJECTS.map(p => ({
        id: `p-${p.id}`, group: x.projects, label: p.name, hint: p.plat.join(' · '),
        run: close(() => pickProject(p.id)),
      })),
      { id: 'lang', group: x.actions, label: lang === 'en' ? 'Монгол хэл рүү шилжих' : x.lang, hint: lang === 'en' ? 'MN' : 'EN', run: close(() => setLang(lang === 'en' ? 'mn' : 'en')) },
      { id: 'copy', group: x.actions, label: x.copy, hint: EMAIL, run: close(copyEmail) },
      { id: 'cv', group: x.actions, label: x.cv, hint: 'PDF', run: close(() => { const a = document.createElement('a'); a.href = t.cv; a.download = ''; a.click(); }) },
      { id: 'mail', group: x.links, label: x.mail, run: close(() => { location.href = `mailto:${EMAIL}`; }) },
      { id: 'github', group: x.links, label: 'GitHub', hint: 'mxnkbatr', run: close(() => window.open('https://github.com/mxnkbatr', '_blank', 'noopener')) },
      { id: 'linkedin', group: x.links, label: 'LinkedIn', run: close(() => window.open('https://www.linkedin.com/in/munkhbaatar-dorjsuren-030a81446', '_blank', 'noopener')) },
    ];
  }, [lang, t, x, goTo, pickProject, setLang, copyEmail, onOpenChange]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(c => `${c.label} ${c.group} ${c.hint ?? ''} ${c.id}`.toLowerCase().includes(q));
  }, [commands, query]);

  // global shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement).closest('input, textarea, [contenteditable]');
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setIndex(0);
    lockScroll(true);
    requestAnimationFrame(() => input.current?.focus());
    return () => lockScroll(false);
  }, [open]);

  useEffect(() => setIndex(0), [query]);

  useEffect(() => {
    list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [index]);

  if (!open) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIndex(i => Math.min(results.length - 1, i + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setIndex(i => Math.max(0, i - 1)); }
    else if (e.key === 'Enter') { e.preventDefault(); results[index]?.run(); }
    else if (e.key === 'Escape') { e.preventDefault(); onOpenChange(false); }
  };

  let lastGroup = '';
  return createPortal(
    <div className="cmdk-backdrop" onClick={() => onOpenChange(false)}>
      <div className="cmdk" role="dialog" aria-modal="true" aria-label="Command palette" onClick={e => e.stopPropagation()}>
        <div className="cmdk-input">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <input
            ref={input}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={x.placeholder}
            role="combobox"
            aria-expanded="true"
            aria-controls="cmdk-list"
            aria-activedescendant={results[index] ? `cmd-${results[index].id}` : undefined}
          />
          <kbd>esc</kbd>
        </div>
        <ul className="cmdk-list" id="cmdk-list" role="listbox" ref={list}>
          {results.length === 0 && <li className="cmdk-empty">{x.empty}</li>}
          {results.map((c, i) => {
            const heading = c.group !== lastGroup ? c.group : null;
            lastGroup = c.group;
            return (
              <li key={c.id} role="presentation">
                {heading && <div className="cmdk-group">{heading}</div>}
                <div
                  id={`cmd-${c.id}`}
                  role="option"
                  aria-selected={i === index}
                  className="cmdk-item"
                  onMouseMove={() => setIndex(i)}
                  onClick={c.run}
                >
                  <span>{c.label}</span>
                  {c.hint && <em>{c.hint}</em>}
                </div>
              </li>
            );
          })}
        </ul>
        <div className="cmdk-foot">{x.hints.map(h => <span key={h}>{h}</span>)}</div>
      </div>
    </div>,
    document.body,
  );
}
