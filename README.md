# Munkhbaatar Dorjsuren — portfolio

Bilingual (EN / MN) portfolio built with **Vite + React + TypeScript**, animated with **GSAP** (ScrollTrigger, SplitText), **Lenis** smooth scrolling and components from **[React Bits](https://reactbits.dev)**.

## What's inside

- Hero: canvas orbit of every shipped product (`src/components/Orbit.tsx`), name decoded with React Bits `DecryptedText`, GSAP intro and scroll-linked exit
- Profile paragraph revealed word by word on scroll (`ScrollReveal`)
- Key results counted up (`CountUp`) and a velocity-reactive tech marquee (`ScrollVelocity`)
- Projects in a pinned horizontal track on desktop (GSAP ScrollTrigger), `SpotlightCard` panels
- Magnetic buttons (`Magnet`), click sparks (`ClickSpark`), shiny status text (`ShinyText`), split headings (`SplitText`)
- Installable app (PWA): manifest, icons, offline service worker (`public/sw.js`), an “Install app” button (native prompt on Android, Add to Home Screen steps on iOS)
- Phone layout works like an app: bottom tab bar, swipeable project carousel, safe-area insets
- Respects `prefers-reduced-motion`

React Bits sources live in `src/components/reactbits/` (copied from the TS + CSS variants).

## Develop

```sh
npm install
npm run dev
npm run build   # typecheck + production build into dist/
```

## Edit content

All text, projects, stats, stack and timeline (in both languages) are in `src/data.ts`.
Add `?lang=mn` to the URL to open the site in Mongolian.

## Deploy

Vercel: import the repo, framework preset **Vite** (build `npm run build`, output `dist`).
