# Jigz — Build Log Portfolio

A single-column, chronological "build log" portfolio built with React + Vite. The page reads as the artifact of the same PRD → build plan → graduation-gate process used to ship the actual projects. Entries interleave code projects and design work, proving "designer and developer" through the content itself.

## Run Locally

1. Install dependencies:
   `npm install`
2. Start local dev server:
   `npm run dev`
3. Open:
   `http://127.0.0.1:5173/`

Use `Ctrl + C` in the terminal to stop the server.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest (single run) |
| `npm run test:watch` | Run Vitest in watch mode |

## Project Structure

```
src/
├── main.jsx                    # Entry point (StrictMode + ThemeProvider)
├── App.jsx                     # Root: boot → router (BrowserRouter)
├── index.css                   # Build Log design tokens
├── context/
│   └── ThemeContext.jsx         # Dark/light theme with localStorage
├── data/
│   └── defaults.js             # FEATURED_ENTRIES, ARCHIVE_ENTRIES, DEFAULT_CONTACT, DEFAULT_HERO
├── hooks/
│   └── usePortfolioData.js     # Data layer with localStorage persistence
├── screens/
│   ├── BootScreen.jsx          # Animated loading bar (2s)
│   ├── DesktopScreen.jsx       # Main page: hero + entries + contact
│   └── ArchivePage.jsx         # Archive page: remaining entries
├── components/
│   ├── Entry.jsx               # Shared shell: ghost numeral, divider, title, badge
│   ├── Lightbox.jsx            # Full-screen image overlay
│   ├── TopBar.jsx              # Sticky header: brand + role + nav + theme toggle
│   ├── Footer.jsx              # Brand + social links + copyright
│   ├── sections/
│   │   ├── HeroSection.jsx     # Oversized type + pop highlight
│   │   └── ContactSection.jsx  # Terminal-style contact block
│   ├── graphics/
│   │   ├── CiphraChip.jsx      # SVG chip graphic (build entries)
│   │   └── VergeGate.jsx       # SVG gate bar graphic (build entries)
│   └── animations/
│       ├── Reveal.jsx          # Scroll-triggered reveal
│       └── variants.js         # Framer Motion variants
└── test/
    ├── setup.js                # Vitest setup + localStorage polyfill
    └── renderWithProviders.jsx # Test helper (ThemeProvider + BrowserRouter)
```

## Architecture

- **Two pages**: `/` (main Build Log) and `/archive` (remaining entries), connected via React Router
- **Entry system**: Single `<Entry>` component renders about, build, and design entries via `kind` field. Ghost numerals auto-index from array position.
- **Data model**: `FEATURED_ENTRIES` and `ARCHIVE_ENTRIES` arrays in `defaults.js`. Each entry has `kind` ('about' | 'build' | 'design') with type-specific fields.
- **Build entries**: `status`, `description`, `tags`, `href`, `graphic` (resolves to SVG component)
- **Design entries**: `brief`, `images`, `tools`, `caseStudy`. Images open in Lightbox.
- **Design tokens**: IBM Plex Mono/Sans fonts, graphite palette (#14171C), magenta accent (#FF3D81)
- **Animation**: Stagger-in on first load (disabled under prefers-reduced-motion)
- **Theme**: CSS variables in `:root`. Dark/light toggle with localStorage persistence.

## Environment

No environment variables required. Deploy directly to Vercel.

## Testing

Tests use Vitest + React Testing Library. Run `npm run test` to execute all tests.
