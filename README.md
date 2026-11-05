# Jigz — Developer Portfolio

A personal portfolio for Damilare "JIGZ" Ogo-Oluwade: an off-white editorial site with
cobalt and acid-lime accents, a hero portrait, selected work, case studies, and a
password-gated console for managing content.

Built with React 19 + Vite 7, React Router 7, Framer Motion, and Neon Postgres
(Vercel serverless functions).

## Run Locally

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:5173/`.

The Vite dev server does **not** run the `api/` functions. Without an API, the app
falls back to `src/data/defaults.js` plus whatever is cached in `localStorage`, and
the console saves locally only. To exercise the real API, run the app through the
Vercel CLI:

```bash
npx vercel dev
```

## Environment

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | For deployed API | Neon Postgres connection string used by `api/portfolio.js` and `api/contact.js` |

No other environment variables are used. Create the `portfolio` and
`contact_submissions` tables automatically on first request (the handlers call
`CREATE TABLE IF NOT EXISTS`).

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server on `127.0.0.1:5173` |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint over the repo |
| `npm run test` | Run Vitest once |
| `npm run test:watch` | Run Vitest in watch mode |

## Routes

| Route | Screen | Notes |
|---|---|---|
| `/` | `DesktopScreen` | Hero, about, skills, selected work, contact |
| `/project/:id` | `CaseStudyPage` | 404-style "Case study not found" when an entry has no real case-study copy |
| `/console` | `ConsolePage` | Behind `PasswordGate`; CRUD for entries, hero, about, skills, contact, settings |

`vercel.json` rewrites all non-asset paths to `index.html` so client-side routing
works in production.

## Architecture

- **Content pipeline**: `PortfolioContext` merges `src/data/defaults.js` with the
  `localStorage` cache and then with `GET /api/portfolio`. Writes go through the
  context (optimistic local update + `PUT /api/portfolio`).
- **Sections**: `TopBar`, `HeroSection`, `AboutSection`, `SkillsSection`,
  `SelectedWorksMarquee` + `SelectedWorkCard`, `ContactSection`, `Footer`.
- **Case studies**: `CaseStudyPage` renders only non-placeholder sections and uses
  `hasRealCaseStudy()` (`src/lib/caseStudy.js`) to decide whether a case study
  exists at all.
- **Console**: `PasswordGate` protects `/console`; the gate is a client-side
  convenience, **not a security boundary** — the password hash lives in the
  shipped bundle, so never store secrets behind it.
- **Theme**: CSS variables in `src/index.css`; light/dark switch persisted in
  `localStorage`. The hero region is intentionally always light.
- **Design system**: cobalt `#2448E8`, acid-lime `#EFF45A`, Bricolage Grotesque,
  DM Mono, and Newsreader. See `DESIGN.md` for tokens and type scale.
- **Animations**: Framer Motion reveal helpers; motion is disabled under
  `prefers-reduced-motion`.

## Project Structure

```
api/
├── portfolio.js            # GET/PUT portfolio JSON (Neon)
└── contact.js              # POST contact submissions (Neon)
public/images/              # Portrait + placeholder art
src/
├── App.jsx                 # Router
├── main.jsx                # Entry (ThemeProvider, PortfolioProvider, ToastProvider)
├── screens/
│   ├── DesktopScreen.jsx   # Main portfolio page
│   ├── CaseStudyPage.jsx   # Project detail page
│   └── ConsolePage.jsx     # Admin console
├── components/
│   ├── sections/           # Hero, About, Skills, Contact
│   ├── casestudy/          # Case-study building blocks
│   ├── ui/                 # CutoutCard, IconPicker
│   └── ...                 # TopBar, Footer, Lightbox, PasswordGate, cards
├── context/                # Theme, Portfolio, Toast providers
├── data/defaults.js        # Fallback content (see CONTENT_CHECKLIST.md)
├── hooks/                  # usePortfolioData (re-export), skill icon catalog
├── lib/                    # caseStudy, externalHref, icon catalogs
└── test/                   # Vitest setup + render helper
```

## Testing

Vitest + React Testing Library + jsdom. 46 tests across 9 files cover the app
shell, screens, data hook, icon catalogs, and case-study/link helpers. The global
`testTimeout` is 20s (`vite.config.js`) because full-app renders can be slow on
constrained CI machines.

## CI / Deploy

`.github/workflows/ci.yml` runs `npm ci`, `npm run lint`, `npm run build`, and
`npm test` on pushes and PRs to `main`. Production deploys to Vercel, where `api/`
functions become serverless endpoints.

## Content status

The shipped defaults are scaffolding: placeholder images, example project names, and
`[Placeholder: ...]` case-study copy. Real content is entered through `/console`
and stored in Neon. Missing assets and copy are tracked in
[`CONTENT_CHECKLIST.md`](./CONTENT_CHECKLIST.md).

## Known limitations

- The production bundle is a single ~556 kB chunk (~172 kB gzipped); no route-level
  code splitting yet.
- Fixed console password in `PasswordGate.jsx` — a UX gate only, not authentication.
- Screen-reader behavior has not been audited (tracked in `PRODUCT.md`).
- `projectIds` metadata still references a removed `design-1` entry.
