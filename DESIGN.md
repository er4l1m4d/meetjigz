# DESIGN.md — meetjigz

Design documentation for the built site. Ground truth is the CSS in `src/` — tokens in `src/index.css`, per-component rules in CSS Modules.

## Overview
A MILAR-inspired portfolio for Damilare "JIGZ" Ogo-Oluwade: off-white editorial surfaces, full-bleed cobalt capability and manifesto bands, oversized Bricolage display type, a grayscale pixel avatar woven into the hero, and a forced-light hero scope. Acid-lime is reserved for actions and emphasis. DM Mono handles metadata, labels, and technical detail. The design supports a deliberate light/dark mode switch through the shared theme context (hero region excepted — always light).

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

Dark mode overrides the surface, ink, muted ink, border, cobalt, and shadow tokens under `[data-theme="dark"]`. `--pop` remains the shared acid-lime action color and `--navy` remains the dark text color used on lime and white pills.

Hero gradient is hardcoded: `linear-gradient(145deg,#173cce,#2e5bf1,#1740d5)`. `--shadow-soft: 0 24px 70px rgba(18,54,188,.16)`; cards use tighter variants of the same blue shadow.

## Typography
| Role | Face | Size | Tracking |
|---|---|---|---|
| Body | Bricolage Grotesque 400 | 16px / 1.55 | normal |
| Hero headline | Bricolage 800 | `clamp(3rem,5.5vw,5.4rem)` / .91 | -.04em |
| Hero accent | Newsreader italic 400–600 | responsive | restrained |
| Section h2 | Bricolage | `clamp(2.3rem,5vw,5rem)` / ~.92 | -.04em |
| About statement | Bricolage 600 | up to `7rem` | -.055em |
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
- **Tags** — mono uppercase pills, `--blue` on `#edf1ff` (works). Stack skills are tiles: brand glyph (react-icons, monochrome `--blue`, auto-matched by name or overridden in console) + name + `n/10` mono, over a 10-segment proficiency bar (`--blue` filled / `--hairline` empty) that staggers in on reveal.
- **Project cards** — 1.35 aspect media, 16px radius, blue soft shadow; hover lifts -6px with deeper shadow.
- **Nav (TopBar)** — absolute, transparent over hero, white links, lime hover; `.innerPage` flips to navy-on-light for inner routes; mobile hamburger opens navy dropdown.
- **Progress dots** — fixed right rail (case study); 9px ring, active fills cobalt and scales 1.35.
- **Needs section** — cobalt full-bleed capability block with rotated white skill pills and a single project CTA.
- **Project visuals** — designed placeholder compositions (dashboard / brand orbit / mobile) built from layout primitives, no raster required.
- **Theme toggle** — TopBar exposes the existing ThemeContext as a compact “change the mode” pill; all primary surfaces use semantic tokens.
- **Footer** — full-viewport-width deep-cobalt `--blue-deep` band, fixed in both themes: centered container with mono “say hello” eyebrow + mailto with ↗, mono uppercase anchor links (about/stack/works/contact, deep-linking `/#anchor` from inner routes), a hairline meta strip (mono copyright/credit, white-outline social pills, circular back-to-top), and a JIGZ wordmark rendered as an SVG `<text>` in Bricolage Grotesque 800 at 85% white, `textLength` + `lengthAdjust="spacingAndGlyphs"` (viewBox `0 0 1280 620`) so it always spans the section edge-to-edge, flush on the bottom edge, with a gradient mask dissolve (`linear-gradient(to bottom, #000 55%, transparent)`). Entry reveal only (`fadeUp`); no mode toggle lives here. The footer carries the `#contact` anchor — the hero CTA, TopBar, and footer nav “contact” links land on its say-hello block (the standalone ContactSection was removed).

## Imagery Rules
- The hero uses `/images/portrait.png`, sourced from the owner’s supplied upscaled transparent pixel avatar. It renders in grayscale (`filter: grayscale(1)` on `.portraitImg`) per the monotone direction; the underlying file stays untouched in full color. The hero region is forced light via `.heroScope` token overrides in `DesktopScreen.module.css`, regardless of the global theme.
- Until real screenshots exist, `ProjectVisual.jsx` renders dashboard, brand-board, and mobile compositions in tokens (cobalt/lime/navy), 16–20px rounded, soft blue shadows.
- When a project supplies a real image (`heroImage`, card thumbnail), it renders `object-fit: cover` in the same rounded frame — placeholder and real imagery are drop-in interchangeable; never stretch or hard-crop outside the frame.

## Motion
- One authored moment per view: hero content and avatar fade up on load; needs pills reveal on entry; footer card reveals on entry (`fadeUp`).
- Micro-interactions only elsewhere: hover lifts, 200–350ms eases; hamburger bar rotation.
- `prefers-reduced-motion: reduce` — orb animation off; global rule in `index.css` clamps all transitions/animations to 0.01ms.

## Content Gates
`src/lib/caseStudy.js`: `isPlaceholderSection` suppresses empty or `[placeholder…` text; `hasRealCaseStudy` requires at least one real section before a case-study page or link is published. Unfinished CMS content never reaches the UI.

## Do / Don't
**Do** — use CSS variables, not new hex values; DM Mono for all metadata/labels; Newsreader only for intentional editorial accents; lime only for primary actions and emphasis; semantic ink tokens across both themes; 16–20px radii on media; 44px minimum touch targets; keep exactly one motion moment per view.

**Don't** — introduce colors outside the token set (gradients excepted); use Bricolage for small caps metadata or DM Mono for display; add decorative animations beyond the micro-interactions; publish placeholder-tagged content; break the works grid rhythm with symmetric spans.
