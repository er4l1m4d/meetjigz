# DESIGN.md — meetjigz

Design documentation for the built site. Ground truth is the CSS in `src/` — tokens in `src/index.css`, per-component rules in CSS Modules.

## Overview
A cobalt-and-white studio-style portfolio. Saturated cobalt hero and contact fields, white editorial works section, cream skills band, deep-cobalt about band. Acid-lime is reserved for primary actions, punctuation, and focus. Oversized ghost display lettering (JIGZ / SELECTED / IDEAS) binds each view. Bricolage Grotesque display with tight negative tracking; DM Mono for small uppercase metadata. One authored motion moment per view.

## Color Tokens
| Variable | Hex | Usage |
|---|---|---|
| `--bg` | `#f8f9ff` | Page background |
| `--surface` / `--white` | `#ffffff` | Works section, cards, light surfaces |
| `--surface-raised` | `#edf1ff` | Tags, raised light fills, ghost SELECTED fill |
| `--blue` / `--link` | `#2448e8` | Primary cobalt; links, active dots, section labels |
| `--blue-deep` | `#1236bc` | About band, footer background |
| `--blue-soft` | `#dce6ff` | Thumbnail placeholder fill, brand board |
| `--navy` | `#071c5c` | Ink on light surfaces, primary-button text on lime |
| `--ink` | `#092064` | Body text on light |
| `--ink-muted` | `#66719b` | Muted body, captions |
| `--pop` (cyc-rose) | `#eff45a` | Acid-lime accent: primary CTAs, role line, focus rings, selection, orbit dots |
| `--cream` | `#fbfce9` | Skills band background |
| `--hairline` | `#dbe1f7` | Case-study rules/borders |
| `--status-live` | `#58df78` | Badge dot: live (rendered `#22b557`) |
| `--status-progress` | `#f3ed66` | Badge dot: in-progress (rendered `#dbb809`) |
| `--status-shadow` | `#98a4c9` | Badge dot: shadow (rendered `#7e89ae`) |

Hero/contact gradients are hardcoded: `linear-gradient(145deg,#173cce,#2e5bf1,#1740d5)` and `(#315cf0,#173fcf)`. `--shadow-soft: 0 24px 70px rgba(18,54,188,.16)`; cards use tighter variants of the same blue shadow.

## Typography
| Role | Face | Size | Tracking |
|---|---|---|---|
| Body | Bricolage Grotesque 400 | 16px / 1.55 | normal |
| Hero headline | Bricolage 800 | `clamp(3rem,5.5vw,5.4rem)` / .91 | -.04em |
| Section h2 | Bricolage | `clamp(2.3rem,5vw,5rem)` / ~.92 | -.04em |
| Contact / about statement | Bricolage 600 | up to `7rem` | -.055em |
| Case-study title | Bricolage | `clamp(4rem,10vw,9rem)` / .8 | -.065em |
| Ghost words | Bricolage 800 | `clamp(6rem,28vw,25rem)` / .75 | -.07 to -.08em |
| Project title | Bricolage | `clamp(1.3rem,2.4vw,2rem)` | -.03em |
| Case-study body | Bricolage | `clamp(1.08rem,1.7vw,1.35rem)` / 1.6 | normal, max 66ch |
| Metadata / labels / tags | DM Mono 500, uppercase | .52–.72rem | +.08 to +.11em |

## Layout & Spacing
- Container: `min(1180px, 100% - 48px)`; mobile `100% - 32px`.
- Section padding: 120px 24px desktop → ~82px 16px mobile; works 105/130px.
- Space scale: .25/.5/.75/1/1.5/2/3/6rem; radii .5rem / 1rem / 16–20px media / pill 9999px.
- Works grid: 12 columns, gap `70px 28px`; spans 7/5/8/7/5 by nth-child, item 3 at `3/span 8`; collapses to a single column under 760px.
- Case study: two columns with 10% gap; right column offset `margin-top:85px`; every 3rd section full-width at 62%.

## Components
- **Buttons** — pills (999px), min-height 44px; primary lime bg + navy text, secondary ghost with white/navy border; hover lifts -2px.
- **Badges** — mono uppercase pills on `--blue-soft` with 5px status dot (live / in-progress / shadow); `.design` variant navy-on-lime.
- **Tags** — mono uppercase pills, `--blue` on `#edf1ff` (works) or navy on white (skills, with proficiency note).
- **Project cards** — 1.35 aspect media, 16px radius, blue soft shadow; hover lifts -6px with deeper shadow.
- **Nav (TopBar)** — absolute, transparent over hero, white links, lime hover; `.innerPage` flips to navy-on-light for inner routes; mobile hamburger opens navy dropdown.
- **Progress dots** — fixed right rail (case study); 9px ring, active fills cobalt and scales 1.35.
- **Project visuals** — designed placeholder compositions (dashboard / brand orbit / mobile) built from layout primitives, no raster required.

## Imagery Rules
- Until real screenshots exist, `ProjectVisual.jsx` renders dashboard, brand-board, and mobile compositions in tokens (cobalt/lime/navy), 16–20px rounded, soft blue shadows.
- When a project supplies a real image (`heroImage`, card thumbnail), it renders `object-fit: cover` in the same rounded frame — placeholder and real imagery are drop-in interchangeable; never stretch or hard-crop outside the frame.

## Motion
- One authored moment per view: hero content fades up on load; contact orb drifts (`drift` 10s alternate, rotate 7deg / scale 1.05).
- Micro-interactions only elsewhere: hover lifts, 200–350ms eases; hamburger bar rotation.
- `prefers-reduced-motion: reduce` — orb animation off; global rule in `index.css` clamps all transitions/animations to 0.01ms.

## Content Gates
`src/lib/caseStudy.js`: `isPlaceholderSection` suppresses empty or `[placeholder…` text; `hasRealCaseStudy` requires at least one real section before a case-study page or link is published. Unfinished CMS content never reaches the UI.

## Do / Don't
**Do** — use CSS variables, not new hex values; DM Mono for all metadata/labels; lime only for primary actions, punctuation, and focus; navy ink on light surfaces; 16–20px radii on media; 44px minimum touch targets; keep exactly one motion moment per view.

**Don't** — introduce colors outside the token set (gradients excepted); use Bricolage for small caps metadata or DM Mono for display; add decorative animations beyond the micro-interactions; publish placeholder-tagged content; break the works grid rhythm with symmetric spans.
