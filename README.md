# Munkhbaatar Dorjsuren — portfolio

Static, bilingual (EN / MN) portfolio site. No build step.

- `index.html` — page structure
- `styles.css` — styles
- `main.js` — all content (projects, stats, stack, timeline, EN/MN text), the orbit canvas and interactions
- `assets/` — CV PDFs and favicon

## Run locally

```sh
npx serve .
# or: python3 -m http.server
```

## Edit content

Everything you'd want to change lives at the top of `main.js`: `T` (UI text), `STATS`, `PROJECTS`, `STACK`, `TIMELINE`, `LANGS`.
Add `?lang=mn` to the URL to open the site in Mongolian.

## Deploy

Import the repo in Vercel (framework preset: "Other") or enable GitHub Pages on the branch root. No configuration needed.
