# 🗺️ Jigz OS — Portfolio Build Plan

> This plan breaks the full portfolio OS into small, completable sessions.  
> Each phase builds directly on the last — **don't skip ahead.**  
> Reference `portfolio-brief-v2.md` for full design specs on each piece.

---

## Project Overview

| | |
|---|---|
| **Project** | Jigz OS — A desktop operating system portfolio |
| **Stack** | React + Framer Motion + react-draggable + Context API |
| **Phases** | 6 phases — Foundation → Boot/Login → Desktop Shell → Windows → CMS → Widgets |
| **Approach** | Step-by-step vibe-coding — each step is a focused, completable session |

---

## How to Use This Plan

Each phase is broken into small, focused steps. Each step is designed to be **one vibe-coding session** — give the AI the relevant section of the portfolio brief alongside the task for that step, and build it out before moving on.

- Complete each step fully before starting the next one
- Hit every checkpoint before advancing to the next phase
- Reference `portfolio-brief-v2.md` for full design specs on each piece
- Build guest mode first — Jigz/CMS mode is always layered on top afterward
- The widget phase is intentionally last — don't build it early

> ⚠️ **Never one-shot the entire build.** Each step exists to keep things clean, testable, and easy to debug. If something breaks, you'll know exactly where it happened.

---

## PHASE 0 — Foundation
*Set up the project before writing a single pixel of UI.*

This phase has no visible output — but it determines how clean everything else will be. A well-structured foundation means every future session starts from a solid base.

---

### Step 0.1 — Initialise the Project
Create a new React + Vite project. Install all core dependencies upfront so you're not hunting for packages mid-build.

**Install these dependencies:**
- `framer-motion` — all animations, window transitions, dock spring physics
- `react-draggable` — drag-and-drop for windows and widgets
- `phosphor-react` — icon library for the dock and UI
- Font imports — Syne + Outfit (or your chosen pairing from the brief)

**Set up your folder structure:**
```
/src
  /components     → reusable UI (glass panels, buttons, cursor)
  /screens        → Boot, Login, Desktop (top-level screens)
  /windows        → each draggable window as its own component
  /widgets        → widget components (stubbed now, built in Phase 5)
  /context        → AuthContext (Jigz vs Guest), ThemeContext
  /styles         → global CSS, tokens, utility classes
  /assets         → background image placeholder, pfp, icons
```

---

### Step 0.2 — Design System & CSS Tokens
Define all CSS variables for both themes before building any UI. This is the single most important step for making the theme toggle work cleanly later.

**In your global CSS, define `:root` with all tokens:**
- Colors: background, glass panel rgba values, text, accent — for both dark and light
- Blur: `--blur-sm`, `--blur-md`, `--blur-lg` (e.g. 8px, 20px, 40px)
- Border: `--glass-border` (e.g. `1px solid rgba(255,255,255,0.15)`)
- Spacing scale, font sizes, border-radius values
- Transition: `--theme-transition: all 0.3s ease` — applied to body so everything shifts together

**Create reusable glass utility classes:**
- `.glass` — base frosted panel (backdrop-filter + background + border)
- `.glass-dark` / `.glass-light` — theme-specific overrides
- `.sqircle` — border-radius for the pfp icon shape

**Dark mode tokens (reference):**
```css
--bg: #0a0a0f;
--glass-bg: rgba(255, 255, 255, 0.08);
--glass-border: 1px solid rgba(255, 255, 255, 0.15);
--text: #f0f0f0;
--accent: #6c8eff;
```

**Light mode tokens (reference):**
```css
--bg: #f0f2f5;
--glass-bg: rgba(255, 255, 255, 0.45);
--glass-border: 1px solid rgba(255, 255, 255, 0.8);
--text: #0a0a0f;
--accent: #4f6ef7;
```

---

### Step 0.3 — Context Setup
Set up the two global contexts your app needs — before any UI exists.

- **AuthContext** — tracks whether the current user is `"jigz"` or `"guest"`, exposes `login()` / `logout()` functions, stores Jigz mode boolean globally
- **ThemeContext** — tracks dark/light preference, applies a `data-theme` attribute to `<html>` so CSS variables switch automatically
- Wrap both contexts around the app root in `main.jsx`

---

### ✅ Phase 0 Checkpoint
CSS variables switch correctly between dark and light by toggling a class on `<html>`. Both contexts are wired up. Fonts load correctly. No UI yet — just the system bones.

---

## PHASE 1 — Boot Sequence & Login Screen
*The very first thing anyone sees. This is your first impression — make it count.*

Build this entire phase before touching the desktop. The boot → login → desktop flow must work end-to-end before anything else.

---

### Step 1.1 — Boot Sequence Screen
A full-screen black terminal that mimics a real PC booting up. Runs once, then transitions to the login screen.

**Build a `<BootScreen />` component:**
- Full-screen black background, left-aligned monospace text
- Lines appear one by one with a short delay between each:
  ```
  Initializing Jigz OS...
  Loading system files... OK
  Mounting portfolio... OK
  Establishing connection... OK
  Welcome.
  ```
- A thin progress bar fills from 0% to 100% as lines appear
- After the last line, pause 800ms then fade out → transition to Login Screen
- Total boot time: 3–5 seconds. Keep it punchy, not slow.

> ⚠️ Do not skip the boot screen to test faster. Build it properly from day one — the transition timing between boot → login → desktop sets the tone for the whole experience.

---

### Step 1.2 — Login Screen
Two glassmorphism profile cards. Guest enters freely. Jigz is password-gated.

**Build a `<LoginScreen />` component:**
- Full-screen background (use a placeholder solid color for now — real background image comes in Phase 2)
- Two frosted glass profile cards side by side, centered on screen
- Each card: sqircle avatar placeholder + name label (Jigz / Guest) + subtle hover animation (lift + glow)
- **Guest card:** clicking it immediately calls `login("guest")` from AuthContext → navigates to Desktop
- **Jigz card:** clicking it reveals a password input below the card:
  - Correct password → `login("jigz")` → navigates to Desktop
  - Wrong password → input shakes (Framer Motion shake animation)
- Password check: simple client-side hash check (store hashed password in an env variable)
- Glassmorphism on both cards: backdrop-filter blur, semi-transparent background, subtle border

---

### Step 1.3 — Screen Routing
Wire up the three top-level screens so the flow works end-to-end.

- Create an `<App />` that renders one of: `<BootScreen />`, `<LoginScreen />`, or `<Desktop />` based on app state
- No need for react-router — simple state-based conditional rendering is cleaner for an OS feel
- Boot always plays first (on hard refresh). After boot → login. After login → desktop.
- After login, the desktop receives the user type (jigz or guest) from AuthContext

---

### ✅ Phase 1 Checkpoint
Boot sequence plays and transitions to the login screen. Guest card logs in and reaches a blank desktop placeholder. Jigz card prompts for password — correct password logs in as Jigz, wrong password shakes the input. Both modes reach the desktop.

---

## PHASE 2 — Desktop Shell
*The OS environment. Background, top bar, ambient blobs, dock. No windows yet.*

This phase builds the persistent desktop layer — the chrome that's always visible. Windows and content come in Phase 3.

---

### Step 2.1 — Background & Ambient Blobs
The wallpaper and atmosphere. Sets the visual tone for everything that sits on top.

- **Background:** full-screen image (use a placeholder gradient for now — real image uploaded via CMS in Phase 4)
- **Overlay:** subtle gradient scrim (dark in dark mode, light in light mode) so glass elements stay readable
- **Ambient blobs:** 2–3 large radial gradient orbs behind all content:
  - Each blob is an absolutely positioned div with a radial gradient, opacity ~0.3
  - Animate with CSS `@keyframes` — slow drift or pulse (20–30s loop)
  - Colors: cool blue/purple in dark mode, warm white/lavender in light mode
  - `filter: blur(80px)` so they feel atmospheric, not harsh

---

### Step 2.2 — Top Bar (Menu Bar)
The persistent bar at the top of the desktop. Always visible, never moves.

- Fixed to the top of the screen, full width, ~32px tall
- Glassmorphism background (backdrop-filter blur, semi-transparent)
- **Left:** three decorative dots — red `#ff5f57`, yellow `#febc2e`, green `#28c840` (decorative only for now)
- **Center-left:** search icon button — clicking triggers Spotlight (built in Phase 4)
- **Center-right:** theme toggle button — switches dark/light via ThemeContext, CSS variables transition smoothly
- **Right:** live Date & Time — updates every second with `setInterval`, formatted as e.g. `"Sat 7 Mar  21:04"`

---

### Step 2.3 — Dock
The floating icon tray at the bottom. Build the full dock with all 5 icons and hover magnification.

- Centered horizontally, floating ~20px above the bottom edge
- Frosted glass pill container (`border-radius: 9999px`, backdrop-filter, border, shadow)
- **5 icons in order:**
  1. PFP sqircle (your profile photo, sqircle-cropped)
  2. Works / Portfolio icon
  3. X (Twitter) logo
  4. Telegram logo
  5. Discord logo
- **Hover magnification:** use Framer Motion to scale up the hovered icon and its neighbours (macOS dock effect)
- Each icon has a tooltip label on hover (appears above the icon)
- Social icons (X, Telegram, Discord): clicking opens the respective URL in a new tab
- Works and PFP icons: clicking will open windows — stub as `console.log` for now, wired up in Phase 3

---

### Step 2.4 — Typewriter Greeting
A small greeting text that appears on the desktop after login — personalised by user type.

- Appears on the desktop below center after the desktop loads in
- Guest: `"Hello, guest."` — Jigz: `"Welcome back, Jigz."`
- Typewriter animation: characters appear one by one, cursor blinks at the end
- Fades out after ~4 seconds so it doesn't clutter the desktop

---

### Step 2.5 — Custom Cursor
Replace the default browser cursor with a frosted circle that follows the mouse.

- Hide the default cursor globally (`cursor: none` on body)
- Create a `<CustomCursor />` component that tracks `mousemove` position
- Render a small frosted circle (~20px) that follows mouse position with slight lag (lerp smoothing)
- On hover over interactive elements (buttons, icons, links): cursor scales up and shifts color

---

### ✅ Phase 2 Checkpoint
Desktop renders with background, ambient blobs, and gradient scrim. Top bar shows dots, search icon, working theme toggle, and live clock. Dock shows all 5 icons with hover magnification. Custom cursor follows mouse. Typewriter greeting appears and fades. Theme toggle switches the entire page correctly in both modes.

---

## PHASE 3 — Windows
*The three draggable windows — Works, About Me, and Contact. Guest view only.*

Build each window as a standalone component. Perfect the guest-facing experience completely — Jigz edit controls come later in Phase 4.

---

### Step 3.1 — Reusable Window Shell
Build the base window component that all three windows will use. Do this once, use it everywhere.

**Create a `<Window />` component that accepts:** `title`, `children`, `onClose`, `defaultPosition`

- **Anatomy:** frosted glass panel + title bar + content area
- **Title bar:** three dot buttons (close is functional, minimise/maximise decorative for now) + window title text
- **Open/close animation:** Framer Motion scale + opacity transition (300ms ease-out)
- **Draggable:** wrap with `react-draggable`, drag handle is the title bar only
- **Z-index stacking:** clicking anywhere on a window brings it to front (track z-index in parent state)
- Windows should not be draggable off-screen (add bounds constraint)

---

### Step 3.2 — Works / Projects Window
A grid of project cards. The main portfolio showcase.

- Opens when the Works icon in the dock is clicked
- Default size: ~800px wide, ~560px tall
- Content: grid of project cards, 2–3 columns
- Each card: thumbnail image, project title, short description (1 line), tags (Design / Dev badges)
- Card hover state: slight lift (`translateY -4px`), glowing border (`box-shadow` with accent color)
- For now, hardcode 3–4 placeholder project cards — Jigz manages these via CMS in Phase 4

---

### Step 3.3 — About Me Window
macOS System Settings layout — left sidebar navigation, right scrollable content panel.

- Two-panel layout inside the window: ~220px left sidebar + remaining right panel
- **Left sidebar items:** About Me, Skills, Tools, Hobbies, Projects
- Clicking a sidebar item loads that section's content in the right panel — no page reload, instant swap
- Right panel is scrollable if content overflows
- Active sidebar item gets a highlighted background (glass highlight)
- **Sections to build** (placeholder content for now, editable via CMS later):
  - **About Me** — bio paragraph, photo
  - **Skills** — list of design and dev skills with visual indicators
  - **Tools** — software, stack, tools you use
  - **Hobbies** — personal interests in a clean layout
  - **Projects** — links back to / mirrors the Works window

---

### Step 3.4 — Contact Window
Minimal iOS-inspired contact card. Clean, compact, functional.

- Opens when the PFP sqircle dock icon is clicked
- Compact window: ~360px wide, ~420px tall
- Large sqircle profile photo centered at the top
- Name: **Jigz** — Role: **Designer & Developer**, styled cleanly below the photo
- **"Copy Contact"** button — copies a formatted vCard string to clipboard, shows a brief `"Copied!"` confirmation
- Social links below: X, Telegram, Discord — each as a small icon + handle, clicking opens in new tab

---

### ✅ Phase 3 Checkpoint
All three windows open from the dock, drag freely, stack correctly (clicking brings to front), and close cleanly. Works shows project cards with hover states. About Me switches sections without page reload. Contact copies to clipboard. All windows look correct in both dark and light mode.

---

## PHASE 4 — Spotlight Search & Jigz CMS Mode
*Search across the portfolio. Then unlock the admin layer.*

Spotlight and the CMS mode are both in this phase because the CMS is the last piece before the portfolio is truly complete.

---

### Step 4.1 — Spotlight Search
A macOS-style search overlay. Searches across projects and sections.

- Triggered by clicking the search icon in the top bar (or keyboard shortcut `Cmd/Ctrl + K`)
- A dark backdrop fades in (backdrop-filter blur), then a centered frosted glass input appears
- User types → results appear below the input as a vertical list
- Results include: project names, About Me sections (Skills, Tools, Hobbies), and social links
- Clicking a result closes Spotlight and opens the relevant window or section
- Press `Escape` to dismiss — backdrop fades out, input shrinks away

---

### Step 4.2 — Jigz CMS — Works Window
Layer edit controls on top of the Works window for Jigz mode only.

- All CMS controls are conditionally rendered: `{isJigz && <EditControls />}`
- An **"Add Project"** button appears in the Works window header (Jigz only)
- Each project card gets an **Edit** (pencil) and **Delete** (trash) button overlaid on hover
- Edit opens an inline form or modal: thumbnail upload, title, description, tags
- Changes persist via localStorage (or a lightweight backend if you want real persistence)
- Deleted cards animate out (scale + fade)

---

### Step 4.3 — Jigz CMS — About Me Window
Make all About Me content editable inline for Jigz.

- Each text block in the About Me sections gets a subtle edit affordance (pencil icon on hover)
- Clicking switches the text to an editable `input` / `textarea` inline
- A small **"Save"** button confirms the change, **"Cancel"** discards it
- Skills and Tools sections: ability to add/remove items from the list

---

### Step 4.4 — Jigz CMS — Background & Settings
Let Jigz change the desktop background and other global settings.

- A settings option accessible from a right-click context menu on the desktop (Jigz only)
- **Background:** file upload input → replaces the desktop wallpaper immediately
- This is how you'll swap out the placeholder background for your real one

---

### ✅ Phase 4 Checkpoint
Spotlight search opens, filters results as you type, and navigates to the right place on click. In Jigz mode, Works window shows Add/Edit/Delete controls. About Me content is editable inline. Background can be changed from the desktop context menu. In guest mode, none of these controls are visible.

---

## PHASE 5 — Widgets
*The final phase. Add personality to the desktop with live widgets.*

Widgets are intentionally last. By this point the full OS is working and you're just adding flair. Build the widget system properly so new widgets can be added easily in future.

---

### Step 5.1 — Widget System Architecture
Build the container and state system before building any individual widget.

- Create a `<WidgetLayer />` component that sits between the background and the windows in the z-index stack
- Each widget has: a position (x, y), a `pinned` boolean, and a `type`
- Store widget state in a `widgetContext` or in Jigz's CMS state
- **Freely draggable widgets** use `react-draggable` — dragging updates their stored position
- **Pinned widgets** have a fixed position (e.g. top-right corner) and cannot be dragged
- In **guest mode:** widgets are visible but not draggable and not editable
- In **Jigz mode:** a small toolbar appears on hover with Pin/Unpin and Dismiss controls

---

### Step 5.2 — Spotify Now Playing Widget
A compact widget showing the current Spotify track.

- Compact glass card: ~280px wide, ~80px tall
- Shows: album art thumbnail (sqircle), track name, artist name, playback progress bar
- Uses the **Spotify Web API** — requires setting up OAuth in your Spotify Developer dashboard
- Polls current playback state every 5 seconds
- If nothing is playing: shows `"Nothing playing"` state gracefully
- Clicking the widget opens the track in Spotify

---

### Step 5.3 — Notes / To-Do Widget
A sticky-note style widget for reminders and tasks.

- Compact glass card: ~240px wide, variable height based on content
- A simple list of to-do items with checkboxes
- In **Jigz mode:** items can be added (text input at bottom), checked off, and deleted
- In **guest mode:** read-only — guests can see your notes but not edit them
- Checked items get a strikethrough and reduced opacity
- Persists via localStorage or your backend

---

### ✅ Phase 5 Checkpoint
Both widgets render on the desktop. Spotify widget shows current track and updates live. Notes widget shows tasks, and Jigz can add/check/delete items. Both widgets are draggable in Jigz mode and static in guest mode. Pinning locks a widget to its corner.

---

## Full Build Checklist

Use this as your progress tracker across all sessions.

### Phase 0 — Foundation
- [ ] Project initialised with React + Vite
- [ ] All dependencies installed (framer-motion, react-draggable, phosphor-react, fonts)
- [ ] Folder structure created
- [ ] CSS design tokens defined for both dark and light mode
- [ ] Glass utility classes created
- [ ] AuthContext and ThemeContext wired up

### Phase 1 — Boot & Login
- [ ] Boot sequence screen with scrolling terminal text and progress bar
- [ ] Boot → Login transition (fade out)
- [ ] Login screen with two glassmorphism profile cards
- [ ] Guest login (direct entry, no password)
- [ ] Jigz login with password gate and shake on wrong input
- [ ] Screen routing (Boot → Login → Desktop)

### Phase 2 — Desktop Shell
- [ ] Background image + gradient scrim overlay
- [ ] Ambient blur blobs with CSS animation
- [ ] Top bar with dots, search icon, theme toggle, live clock
- [ ] Theme toggle switches CSS variables globally and smoothly
- [ ] Dock with 5 icons and hover magnification
- [ ] Custom cursor with lerp smoothing and hover states
- [ ] Typewriter greeting (personalised by user type, fades out)

### Phase 3 — Windows
- [ ] Reusable Window shell (draggable, z-index stacking, open/close animation)
- [ ] Works window — project grid with card hover states
- [ ] About Me window — two-panel macOS Settings layout, section switching
- [ ] Contact window — minimal card with copy contact button

### Phase 4 — Spotlight & CMS
- [ ] Spotlight search overlay (Cmd+K trigger, live filtering, click navigation)
- [ ] Jigz CMS — Works: add / edit / delete projects
- [ ] Jigz CMS — About Me: inline editing of all sections
- [ ] Jigz CMS — Background: wallpaper upload and swap

### Phase 5 — Widgets
- [ ] Widget layer architecture (draggable, pinnable, Jigz/guest permissions)
- [ ] Spotify Now Playing widget with live API integration
- [ ] Notes / To-Do widget with Jigz-editable tasks

---

## Vibe-Coding Session Tips

- **Always paste the relevant section from `portfolio-brief-v2.md`** at the start of a new session — the AI has no memory between sessions
- **Tell the AI exactly which step you're on:** `"I'm on Step 2.3 — the dock. Here's the brief for this section: [paste]"`
- **Build and test one step at a time** — don't ask the AI to do Steps 2.3, 2.4, and 2.5 in one go
- **If something looks off visually,** describe it specifically: `"the glass blur is too strong on the dock"` is more actionable than `"the dock looks wrong"`
- **Keep your design tokens consistent** — if the AI hardcodes a color, push back and make it use CSS variables
- **Commit to git after every checkpoint** — so you always have a clean rollback point if something breaks
