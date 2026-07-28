# Rishav Kumar — Portfolio

A premium, dark-mode-first personal portfolio built with **Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion, and Lucide**. Fully responsive (mobile → desktop), with animated live-workflow pipeline diagrams for every project.

**Live:** deployed on Render as a static site.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy (Render)

The site is a **static export** (`next.config.ts` sets `output: "export"`), so it deploys as a free Render Static Site — `render.yaml` is included:

1. Push this repo to GitHub.
2. In the [Render dashboard](https://dashboard.render.com): **New → Blueprint**, pick this repo — it reads `render.yaml` and creates the static site automatically.
   - Or manually: **New → Static Site**, build command `npm ci && npm run build`, publish directory `out`.
3. Every push to `main` auto-deploys.

## Make it yours

**You only need to edit one file:** [`lib/data.ts`](lib/data.ts). Every name, role, project, skill, timeline entry, cert, post, quote, and link is a typed placeholder there. Swap the values and the whole site updates — no component edits required.

- **Re-skin the theme:** change the accent trio (`--accent`, `--accent-2`, `--accent-3`) and base surface colors at the top of [`app/globals.css`](app/globals.css). Light-mode overrides live in the `.light` block just below.
- **Real images:** the Gallery and Blog use gradient/shimmer placeholders. Add a `src` to the gallery/blog items and drop in `<img>` tags where noted in the components.
- **Contact form** is visual-only — wire the `onSubmit` in [`components/sections/Contact.tsx`](components/sections/Contact.tsx) to an API route or email service.

## Structure

```
app/
  layout.tsx        # fonts (Geist), theme provider, metadata
  page.tsx          # the 14-section flow
  globals.css       # design tokens, glass/gradient utilities, keyframes
lib/
  data.ts           # ← ALL your content lives here
  utils.ts          # cn() + shared motion presets
components/
  layout/           # Navbar (scrollspy), Footer
  sections/         # Hero, BentoGrid, Projects, Timeline, ... (14 blocks)
  ui/               # SpotlightCard, MagneticButton, Reveal, CountUp, ...
  backgrounds/      # ParticleField (canvas), AuroraMesh
  providers/        # ThemeProvider (next-themes)
```

## Notes

- Dark mode is the default; a toggle (top-right) switches to light. Preference is remembered.
- All motion respects `prefers-reduced-motion`.
- The particle background is a lightweight canvas that pauses when off-screen.
