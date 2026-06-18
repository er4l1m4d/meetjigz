# 🖥️ Portfolio Brief v2 — Jigz OS

## Who You Are
**Name**: Jigz  
**Role**: Designer & Developer  
A dual-skilled creative — the portfolio should feel as thoughtful in design as it is technically impressive.

---

## Overall Aesthetic
**Style**: Glassmorphism / Frosted Glass  
**Theme**: Adaptive — switches between dark and light mode via a toggle in the top bar

- **Dark mode**: Light frosted glass panels over a dark background (deep blacks/charcoals)
- **Light mode**: Dark-tinted glass panels over a bright background (whites/soft greys)
- All glass elements use `backdrop-filter: blur()`, semi-transparent backgrounds, and subtle inner borders

---

## Phase 1 — Boot Sequence & Login Screen

### Boot Sequence (First thing users see)
- Mimics a real PC booting up — black screen, monospace terminal-style text scrolling
- Example lines:
  ```
  Initializing Jigz OS...
  Loading system files... OK
  Mounting portfolio... OK
  Welcome.
  ```
- After the sequence completes, transitions into the **Login Screen**

### Login Screen
- Two profile cards side by side — **Jigz** and **Guest** — like a macOS/Windows user select screen
- Each card has:
  - A profile picture (sqircle avatar)
  - Name label beneath
- **Guest**: Click to enter directly — no password, full read-only access to everything
- **Jigz**: Click → prompts a password input field → correct password unlocks full CMS control
- Glassmorphism styling on both cards, subtle hover animation on each

---

## Phase 2 — The Desktop (Guest View = Default Public Experience)

### What Guests Can Do
- View the full portfolio — all projects, About Me, all sections
- Interact with the OS (drag windows, use spotlight search, toggle theme)
- No restrictions on content visibility — everything is public
- **Cannot** edit, add, delete, or change anything

### What Jigz Mode Unlocks (Full CMS Control)
- Edit project cards (title, description, thumbnail, tags)
- Add / delete projects
- Change background image
- Edit About Me, Skills, Tools, Hobbies content inline
- Rearrange widgets
- Any other content on the portfolio is editable

---

## Layout — Desktop OS Shell

### Top Bar (Menu Bar)
- **Left**: Three decorative dots (red, yellow, green — macOS style)
- **Center-left**: Search button → triggers **Spotlight-style search** (centered frosted overlay, results listed vertically)
- **Center-right**: Dark/light **theme toggle** (icon-based, smooth CSS variable transition)
- **Right**: Live **Date & Time** display (real-time updates)

### Background
- User-uploadable background image fills the entire screen
- Subtle gradient scrim overlay for readability
- **Ambient blur blobs**: 2–3 large soft glowing orbs, slowly drifting via CSS `@keyframes`, colors shift with theme

### Dock (Bottom Center)
Floating frosted glass pill — **5 icons** with macOS-style hover magnification:

| Position | Icon | Action |
|----------|------|--------|
| 1 | **Pfp sqircle** (profile photo) | Opens Contact window |
| 2 | **Works / Portfolio icon** | Opens Projects window |
| 3 | **X logo** | Opens Twitter/X profile in new tab |
| 4 | **Telegram logo** | Opens Telegram link in new tab |
| 5 | **Discord logo** | Opens Discord link in new tab |

**Dock behavior**:
- Hover magnification — icons scale up with a smooth spring animation
- Frosted glass pill background with subtle border and blur

---

## Windows (Draggable, Stackable)

All windows share the same anatomy:
- Frosted glass panel (`backdrop-filter: blur(20px)`, `rgba(255,255,255,0.08)` dark / `rgba(255,255,255,0.45)` light)
- Title bar: three dot buttons + window title
- Smooth **open/close animations** (scale + fade, 300–400ms ease-out)
- Draggable by title bar
- Click to bring to front (z-index stacking)

---

### Window 1 — Contact (pfp icon)
Minimal iOS-inspired contact card:
- Profile photo (large, centered, sqircle)
- Name: **Jigz**
- Role: **Designer & Developer**
- **"Copy Contact"** button (copies a vCard or formatted contact info to clipboard)
- Social links listed below (X, Telegram, Discord)

---

### Window 2 — Works / Projects
- Grid of project cards (2–3 columns)
- Each card: thumbnail, title, short description, tags (Design / Dev)
- Hover state: slight lift + glowing border
- **Jigz mode**: "Add Project" button appears, cards get edit/delete controls

---

### Window 3 — About Me (macOS Settings style)
Two-panel layout:
- **Left sidebar**: Navigation list — About Me, Skills, Tools, Hobbies, Projects
- **Right panel**: Content loads here when a sidebar item is clicked, no page reload
- Sections:
  - **About Me** — bio, photo
  - **Skills** — design & dev skills
  - **Tools** — software, stack, tools used
  - **Hobbies** — personal interests
  - **Projects** — alternate entry point to works

---

## Micro-interactions & Details

### Boot + Login Transition
- Boot text scrolls in monospace on black → fades out → Login screen fades in
- Login screen: glassmorphism cards, subtle hover glow on each profile

### Typewriter Text
- After login, desktop loads with a typewriter greeting — e.g. `"Welcome back."` or `"Hello, guest."` depending on who logged in

### Custom Cursor
- Small frosted circle that follows mouse with slight lag (lerp smoothing)
- Changes on hover over interactive elements (scale up, color shift)

### Smooth Animations
- All windows: scale + opacity on open/close
- Dock: spring-based magnification
- Theme toggle: full-page CSS variable transition
- Spotlight: backdrop blur overlay fades in

### Ambient Background Blobs
- 2–3 large radial gradient orbs drifting slowly in the background
- Colors respond to theme (cool blues/purples in dark, warm whites in light)

---

## Widgets (Planned — Phase 3)

Widgets live on the desktop and can be:
- **Freely dragged** anywhere on screen (like desktop icons)
- **Pinned** to corners or a fixed position

### Planned Widgets
1. **Spotify / Now Playing** — shows current track, album art, progress bar
2. **Notes / To-Do List** — a small sticky-note style widget for reminders and tasks

### Widget Design Rules
- All widgets follow the same glassmorphism style as windows
- Smaller, compact footprint — no title bar needed, just content
- In **Jigz mode**: widgets are editable/repositionable; in **Guest mode**: read-only

---

## Typography
**Style**: Modern Sans-Serif  
Suggested pairings:
- `Syne` (display) + `Outfit` (body)
- `Cabinet Grotesk` (display) + `Satoshi` (body)
- `Geist` (display) + `DM Sans` (body)

Avoid: Inter, Roboto, Arial, system-ui

---

## Color Palette

### Dark Mode
- Background: `#0a0a0f`
- Glass: `rgba(255,255,255,0.08)` + `border: 1px solid rgba(255,255,255,0.15)`
- Text: `#f0f0f0`
- Accent: `#6c8eff` or `#a78bfa`

### Light Mode
- Background: `#f0f2f5`
- Glass: `rgba(255,255,255,0.45)` + `border: 1px solid rgba(255,255,255,0.8)`
- Text: `#0a0a0f`
- Accent: same blue/violet, slightly deeper

---

## Tech Suggestions
- **Framework**: React
- **Drag**: `react-draggable` or Framer Motion drag
- **Animations**: Framer Motion
- **Icons**: Phosphor Icons or custom SVGs
- **Fonts**: Google Fonts or Fontshare
- **State management**: Context API (to track Jigz vs Guest mode globally)
- **Auth**: Simple password check client-side (hashed), or a lightweight backend if security matters

---

## Build Order (Recommended)
1. Boot sequence screen
2. Login screen (two profiles, password gate for Jigz)
3. Desktop shell (top bar, background, ambient blobs)
4. Dock with magnification
5. Works window (guest view)
6. About Me window (macOS Settings layout)
7. Contact window (minimal card)
8. Spotlight search
9. Jigz mode — CMS controls layered on top
10. Widgets (Phase 3)

---

## What Makes This Unforgettable
- It's not a portfolio — it's an **operating system for your identity**
- The boot sequence + login screen sets the tone before anyone sees a single project
- Two modes (Jigz / Guest) make it feel like a real, lived-in system
- Glassmorphism + draggable windows + ambient blobs = a world, not a page
- Widgets make the desktop feel alive and personal
