# Jigz OS Portfolio Build To-Do

Use this as your build tracker from first setup to final polish.

## Phase 0 - Foundation
- [x] Initialize React + Vite project
- [x] Install dependencies: `framer-motion`, `react-draggable`, `phosphor-react`, fonts
- [x] Create folder structure: `components`, `screens`, `windows`, `widgets`, `context`, `styles`, `assets`
- [x] Define global CSS tokens for dark/light themes
- [x] Add glass utility classes (`.glass`, `.glass-dark`, `.glass-light`, `.sqircle`)
- [x] Set up `AuthContext` (`guest`/`jigz`, `login`, `logout`)
- [x] Set up `ThemeContext` (theme state + `data-theme` on `<html>`)
- [x] Wrap app root with both contexts in `main.jsx`

## Phase 1 - Boot and Login
- [x] Build `BootScreen` with boot lines and progress bar
- [x] Add timed boot fade-out transition to login
- [x] Build `LoginScreen` with two glass profile cards
- [x] Implement guest login flow (`login("guest")`)
- [x] Implement Jigz password flow (env hash check + shake on wrong input)
- [x] Implement app screen flow: Boot -> Login -> Desktop

## Phase 2 - Desktop Shell
- [x] Build desktop background layer (placeholder wallpaper/gradient + scrim)
- [x] Add ambient animated blur blobs
- [x] Build top bar (dots, search button, theme toggle, live clock)
- [x] Implement global smooth theme switching
- [x] Build dock with 5 icons in required order
- [x] Add dock hover magnification + icon tooltips
- [x] Wire social icons to external links
- [x] Stub PFP and Works dock actions (to connect in Phase 3)
- [x] Add user-based typewriter greeting and fade-out
- [x] Build custom frosted cursor with smoothing + interactive hover states

## Phase 3 - Windows
- [x] Build reusable `Window` shell (title bar, controls, open/close motion)
- [x] Add drag behavior with title-bar handle only
- [x] Add drag bounds so windows stay on-screen
- [x] Add z-index focus stacking (click to bring front)
- [x] Build Works window with project card grid + hover states
- [x] Build About Me window with sidebar + section switching
- [x] Build Contact window with profile, role, copy contact, social links
- [x] Wire dock icons to open corresponding windows
- [x] Validate all windows in dark and light themes

## Phase 4 - Spotlight and CMS
- [x] Build Spotlight overlay UI
- [ ] Add search triggers (top bar button + `Cmd/Ctrl + K`)
- [ ] Add `Escape` close behavior
- [ ] Implement live filtering for projects, sections, and socials
- [ ] Wire Spotlight result click to open target window/section
- [ ] Add Jigz-only Works CMS controls (Add/Edit/Delete)
- [ ] Implement Works add/edit forms and persistence
- [ ] Animate project deletion
- [ ] Add Jigz-only inline editing in About Me sections
- [ ] Add Skills/Tools add-remove controls
- [ ] Add Jigz-only desktop context menu with settings
- [ ] Implement wallpaper upload and immediate swap
- [ ] Verify all CMS controls are hidden in guest mode

## Phase 5 - Widgets
- [ ] Build widget architecture (`WidgetLayer`, widget state model, positioning)
- [ ] Implement Jigz vs guest permissions for drag/edit
- [ ] Add Jigz widget toolbar (Pin/Unpin/Dismiss)
- [ ] Build Spotify Now Playing widget UI
- [ ] Integrate Spotify OAuth + playback API polling (every 5s)
- [ ] Add Spotify fallback state ("Nothing playing")
- [ ] Build Notes/To-Do widget (add/check/delete in Jigz mode)
- [ ] Make Notes widget read-only in guest mode
- [ ] Persist widget and note state
- [ ] Validate pinning and drag behavior across modes

## Final QA and Ship
- [ ] Run full flow QA: Boot -> Login -> Desktop -> Windows -> Spotlight -> CMS -> Widgets
- [ ] Fix regressions (theme, spacing, motion timing, responsiveness)
- [ ] Commit after each phase checkpoint
- [ ] Final stabilization and release commit
















