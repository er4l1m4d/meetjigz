# Jigz OS Portfolio

A desktop-OS-themed portfolio site built with React + Vite, featuring draggable windows, a dock, spotlight search, boot/login screens, and dark/light theming.

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
├── main.jsx              # Entry point
├── App.jsx               # Root component (Boot → Login → Desktop)
├── index.css             # Global styles + theme variables
├── context/
│   └── AuthContext.jsx    # Auth state (guest/jigz)
├── screens/
│   ├── BootScreen.jsx     # Animated boot sequence
│   ├── LoginScreen.jsx    # Profile card login
│   └── DesktopScreen.jsx  # Main desktop (top bar, dock, windows, ambient)
├── components/
│   ├── TopBar.jsx         # System bar (spotlight trigger, clock, theme toggle)
│   ├── Dock.jsx           # Bottom dock with app icons
│   ├── SpotlightOverlay.jsx # Cmd+K spotlight search
│   └── TypewriterGreeting.jsx # Animated greeting
├── windows/
│   ├── Window.jsx         # Generic draggable/resizable window shell
│   ├── WorksWindow.jsx    # Projects gallery
│   ├── AboutWindow.jsx    # About me
│   └── ContactWindow.jsx  # Social links
├── hooks/
│   ├── usePortfolioData.js   # Centralized data with localStorage persistence
│   └── useWindowManager.js   # useReducer-based window open/close/focus
├── data/
│   └── defaults.js        # Default projects, about, contact data
└── test/
    ├── setup.js           # Vitest setup (jest-dom matchers)
    └── renderWithProviders.jsx # Shared test helper
```

## Architecture

- **Screens**: Boot → Login → Desktop flow managed by `App.jsx` state
- **Window system**: `useWindowManager` reducer tracks open/focused windows; `Window` component provides drag, resize, minimize, maximize
- **Data**: `usePortfolioData` hook loads from localStorage with fallback to defaults; CRUD operations for projects
- **Theme**: CSS variables in `:root` / `[data-theme="dark"]`; components use CSS Modules
- **Spotlight**: Cmd+K / Ctrl+K global keyboard shortcut; click-outside and Escape to close
- **Auth**: Stylized login flow; password hash stored in `.env` (not security-critical)

## Environment

Copy `.env.example` to `.env` and set `VITE_JIGZ_PASSWORD_HASH` (SHA-256 hex) for the Jigz login card.

## Testing

Tests use Vitest + React Testing Library. Run `npm run test` to execute all 47 tests across 10 test files.
