# Hero & Intro Section Redesign Spec

## Table of Contents
1. [Goal](#goal)
2. [Reference Image Analysis](#reference-image-analysis)
3. [User Decisions](#user-decisions)
4. [Files to Modify](#files-to-modify)
5. [Current State (Before)](#current-state)
6. [Target State (After)](#target-state)
7. [Detailed Change: HeroSection.jsx](#detailed-change-herosectionjsx)
8. [Detailed Change: HeroSection.module.css](#detailed-change-herosectionmodulecss)
9. [Detailed Change: AboutSection.jsx](#detailed-change-aboutsectionjsx)
10. [Detailed Change: AboutSection.module.css](#detailed-change-aboutsectionmodulecss)
11. [DesktopScreen.jsx — Reorder Sections](#desktipscreenjsx--reorder-sections)
12. [Design Token References](#design-token-references)
13. [Animation Strategy](#animation-strategy)
14. [Responsive Breakpoints](#responsive-breakpoints)
15. [Edge Cases & Pitfalls](#edge-cases--pitfalls)
16. [Verification Checklist](#verification-checklist)

---

## Goal

Redesign the hero section and the section immediately below it to match a reference design (dark editorial portfolio style). The reference shows a massive full-viewport-width name overlapping with a portrait image, a role/title on the right, and a dark intro statement section below.

**In plain English:** Replace the current "I'm ui/ux / DESIGNER" centered hero with a bold "Oluwadamilare Ogo-Oluwade" name that spans the viewport and sits behind the portrait image. Add a role label on the right. Remove the bottom notes. Restyle the CTA. Then redesign the about/intro section below to feel like a dark editorial statement block.

---

## Reference Image Analysis

The reference (Alex Graham portfolio) shows these key visual characteristics:

1. **Massive name**: "Alex Graham" spans nearly the full viewport width. The font is extremely large (~10-12vw), bold, white on dark background.
2. **Name-behind-portrait layering**: The portrait image overlaps the name text. The name has a lower z-index than the portrait, creating depth.
3. **Role text**: "// Web Designer / Art Director" positioned on the right side, mid-height, in a smaller muted font with the "//" prefix.
4. **Social links**: Left side, vertical stack with icons (LinkedIn, Twitter, Instagram). **User chose NOT to include these.**
5. **Dark background**: Full dark hero section.
6. **No bottom notes**: No specialization text or tagline at the bottom.
7. **Below-hero intro**: A dark section with "// Intro" label, large statement text with accent-colored words, and a "See my Work" button.

---

## User Decisions

| Question | Answer |
|---|---|
| Hero name | **Oluwadamilare Ogo-Oluwade** |
| Hero role/title | **Web Designer & Developer** |
| Social links in hero | **No** — skip them |
| Portrait position | **Bottom-center** — keep current position |
| Accent color | **Keep current blue** (#2448e8 / #5d7bff) |
| Hero theme behavior | **Always light** — forced light tokens via `.heroScope` wrapper, regardless of global theme toggle |
| CTA button | **Keep but restyle** |
| Bottom notes | **Remove them** |
| Below-hero section | **Yes, redesign it** — match reference's dark intro section |
| Name font | **Bricolage Grotesque 800** |
| Portrait image | **Use current** `/images/portrait.png`, rendered in **grayscale (true B&W)** |

---

## Files to Modify

| File | Action | Purpose |
|---|---|---|
| `src/components/sections/HeroSection.jsx` | **Edit** | Replace headline, add role, remove notes, restyle CTA |
| `src/components/sections/HeroSection.module.css` | **Edit** | Massive name, z-index layering, role positioning, CTA restyle |
| `src/components/sections/AboutSection.jsx` | **Edit** | Redesign as dark intro statement section |
| `src/components/sections/AboutSection.module.css` | **Edit** | Dark intro styling matching reference |
| `src/screens/DesktopScreen.jsx` | **Edit** | Potentially reorder sections (Hero → Intro → Needs → Works → Skills → About) |

---

## Current State

### HeroSection.jsx (current)
```jsx
<section className={styles.hero}>
  <div className={styles.heroInner}>
    <motion.h1 className={styles.headline}>
      <span className={styles.lineOne}>
        <span className={styles.serif}>I'm</span>
        <span className={styles.serif}>ui/ux</span>
      </span>
      <span className={styles.lineTwo}>DESIGNER</span>
    </motion.h1>

    <motion.div className={styles.portrait}>
      <img src="/images/portrait.png" alt="..." />
    </motion.div>

    <p className={styles.noteLeft}>Specialized in web design...</p>
    <p className={styles.noteRight}>{hero.tagline}</p>

    <button className={styles.cta}>{contactCta.label}</button>
  </div>
</section>
```

### HeroSection.module.css (current key rules)
- `.hero`: `min-height: 100dvh`, `background: var(--bg)`
- `.headline`: `position: absolute; top: 17%; z-index: 2`
- `.lineOne`: serif italic, `font-size: clamp(2.6rem, 8vw, 6.6rem)`
- `.lineTwo`: Bricolage 800, blue, `font-size: clamp(3.6rem, 18vw, 15rem)`
- `.portrait`: `position: absolute; bottom: 0; z-index: 1; width: min(62%, 720px, 78dvh)`
- `.noteLeft` / `.noteRight`: `position: absolute; bottom: 28px; z-index: 3`
- `.cta`: pill button, `position: absolute; bottom: 48px; z-index: 3`

### AboutSection.jsx (current)
```jsx
<section id="about" className={styles.section}>
  <div className={styles.inner}>
    <p className={styles.eyebrow}>how I work</p>
    <h2 className={styles.title}>From idea to launch.</h2>
    <p className={styles.statement}>
      I move between <span className={styles.accent}>product thinking</span>,{' '}
      <span className={styles.accent}>interface design</span> and{' '}
      <span className={styles.accent}>code</span> without losing the thread.
    </p>
    <div className={styles.details}>
      <p className={styles.bio}>{about.bio}</p>
      <p className={styles.interests}>{about.interests}</p>
    </div>
    <div className={styles.availability}>...</div>
  </div>
</section>
```

### AboutSection.module.css (current)
- `.section`: `background: var(--blue-deep)`, `padding: 130px 24px`
- `.statement`: Bricolage 600, `clamp(2.4rem, 6vw, 5.4rem)`, `max-width: 18ch`
- `.accent`: `color: var(--pop)` (lime)

### DesktopScreen.jsx (current order)
```
TopBar → HeroSection → NeedsSection → [main: Works → Skills → About] → Contact → Footer
```

---

## Target State

### Hero Layout (after redesign)

```
┌─────────────────────────────────────────────────────┐
│  TopBar (unchanged)                                  │
│                                                      │
│                                                      │
│          Oluwadamilare                                │
│          Ogo-Oluwade                                  │
│                                           // Web     │
│                                           Designer   │
│                              ┌──────────┐ & Developer│
│                              │          │            │
│                              │ Portrait │            │
│                              │  (img)   │            │
│                              │          │            │
│                              └──────────┘            │
│                  [ Start a project ]                  │
└─────────────────────────────────────────────────────┘
```

**Key visual rules:**
1. The name is MASSIVE — `clamp(4rem, 11vw, 11rem)` or similar, spanning nearly full width
2. The name sits at roughly `top: 15-20%` of the viewport
3. The name has `z-index: 1` (behind the portrait)
4. The portrait sits at `bottom: 0`, centered, with `z-index: 2` (in front of name)
5. The role text sits on the right side, roughly vertically centered, with `z-index: 3`
6. The CTA button sits at the bottom center, with `z-index: 3`
7. **No notes** at the bottom — they are removed entirely
8. Background is **forced light** (`#f8f9ff`) regardless of theme — the hero is always light ("always light for now"). The TopBar is wrapped in the same `.heroScope` so its ink-colored links stay dark/readable over the light hero.
9. **Portrait is grayscale** — `filter: grayscale(1)` applied to `.portraitImg`. True B&W, no color.
10. **True overlap** — the name is positioned at `top: 26%` (mid-height) so the bottom-center portrait (`z-index: 2`) overlaps and covers the lower portion of the name (`z-index: 1`).
11. **Name wraps if needed** — `white-space: nowrap` was removed; `overflow-wrap: break-word` + `hyphens: auto` prevent overflow on long names ("Oluwadamilare") at small viewports.

### Intro Section (after redesign)

```
┌─────────────────────────────────────────────────────┐
│  // Intro                                            │
│                                                      │
│  I'm a versatile <blue>designer who                   │
│  partners with <blue>founders to turn <blue>ideas     │
│  into <blue>real products.</blue> I focus on clear    │
│  interfaces, sharp decisions, and fast execution.     │
│                                                      │
│  Bringing your vision to life quickly and             │
│  efficiently—whether it's branding, apps, or          │
│  websites—I've got it covered.                        │
│                                                      │
│               [ See my Work ]                         │
└─────────────────────────────────────────────────────┘
```

**Key visual rules:**
1. Dark background (`var(--blue-deep)` or `#1236bc`)
2. `// Intro` label in small mono font, muted color
3. Large statement text in Bricolage 600-800, `clamp(2.4rem, 5.5vw, 4.8rem)`
4. Accent words in `var(--blue)` — NOT lime (keep current blue accent)
5. Smaller supporting text below in muted white
6. "See my Work" button — pill style, scrolls to works section
7. Content comes from `about.bio` and `about.interests` props
8. `id="about"` must remain on the section for scroll-to to work

---

## Detailed Change: HeroSection.jsx

### What to change

1. **Replace the entire headline `<motion.h1>`**:
   - Remove the two-line "I'm ui/ux / DESIGNER" structure
   - Replace with a single massive name: `Oluwadamilare Ogo-Oluwade`
   - Split into two `<span>` elements for two-line display (first name / last name)

2. **Add role text**:
   - New element: `<p>` or `<span>` with role text `// Web Designer & Developer`
   - Position on the right side via CSS (absolute, right: 0, top: ~45%)

3. **Remove bottom notes**:
   - Delete `<p className={styles.noteLeft}>` entirely
   - Delete `<p className={styles.noteRight}>` entirely

4. **Keep the CTA button but restyle via CSS**:
   - Keep the JSX structure
   - CSS will handle the new look (see CSS section)

5. **Keep the portrait exactly as-is in JSX**:
   - Same `<motion.div>` wrapper, same `<img>` tag
   - Only CSS positioning changes (if any)

### Target JSX structure

```jsx
<section className={styles.hero}>
  <div className={styles.heroInner}>
    <motion.h1
      className={styles.headline}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      <span className={styles.firstName}>Oluwadamilare</span>
      <span className={styles.lastName}>Ogo-Oluwade</span>
    </motion.h1>

    <motion.p
      className={styles.role}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.1 }}
    >
      // Web Designer<br />& Developer
    </motion.p>

    <motion.div
      className={styles.portrait}
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.2 }}
    >
      <img
        className={styles.portraitImg}
        src="/images/portrait.png"
        alt="Oluwadamilare Ogo-Oluwade, designer and developer"
        width="520"
        height="520"
      />
    </motion.div>

    {contactCta && (
      <button
        type="button"
        className={styles.cta}
        onClick={() => scrollTo(contactCta.target)}
      >
        {contactCta.label}
      </button>
    )}
  </div>
</section>
```

### What NOT to change in HeroSection.jsx
- The `scrollTo` helper function — keep as-is
- The `hero` prop destructuring and `contactCta` logic — keep as-is
- The `if (!hero) return null` guard — keep as-is
- The portrait `<motion.div>` animation config (delay 0.2) — keep as-is
- The `export default` — keep as-is

---

## Detailed Change: HeroSection.module.css

### Remove these CSS rules entirely
```css
/* DELETE ALL OF THESE: */
.lineOne
.lineTwo
.serif
.noteLeft
.noteLeft::before
.noteRight
```

### Modify these CSS rules

#### `.hero` — keep as-is
```css
.hero {
  position: relative;
  display: flex;
  min-height: 100dvh;
  overflow: hidden;
  background: var(--bg);
  color: var(--ink);
}
```
**No changes.** The `var(--bg)` already respects the theme toggle.

#### `.heroInner` — keep as-is
```css
.heroInner {
  position: relative;
  width: min(1280px, calc(100% - 48px));
  margin: 0 auto;
}
```
**No changes.**

#### `.headline` — rewrite
```css
.headline {
  position: absolute;
  top: 26%;                     /* MID-HEIGHT for true overlap with portrait */
  left: 0;
  right: 0;
  z-index: 1;                    /* BEHIND portrait (portrait is z-index: 2) */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  text-align: center;
}
```
**Key points:**
- `z-index: 1` — portrait will be `z-index: 2`, so name sits behind
- `top: 26%` — mid-height placement so the portrait (bottom) overlaps the name's lower portion (true overlap)
- `flex-direction: column` — stacks first/last name vertically

#### Add new `.firstName` and `.lastName` rules
```css
.firstName,
.lastName {
  display: block;
  font-family: var(--font-body);       /* Bricolage Grotesque */
  font-weight: 800;
  line-height: 0.88;
  letter-spacing: -0.06em;
  color: var(--ink);
  overflow-wrap: break-word;           /* allow long names to wrap, no overflow */
  hyphens: auto;
}

.firstName {
  font-size: clamp(3.2rem, 11vw, 11rem);
}

.lastName {
  font-size: clamp(3.2rem, 11vw, 11rem);
}
```

**Key points:**
- Uses `var(--font-body)` (Bricolage Grotesque) at weight 800
- `line-height: 0.88` — tight, like the reference
- `letter-spacing: -0.06em` — tight tracking for display size
- `overflow-wrap: break-word` + `hyphens: auto` — long names ("Oluwadamilare") wrap instead of overflowing
- `color: var(--ink)` — uses semantic token, works in both themes
- `clamp(3.2rem, 11vw, 11rem)` — massive but capped at 11rem

#### Add new `.role` rule
```css
.role {
  position: absolute;
  right: 0;
  top: 42%;
  z-index: 3;
  margin: 0;
  color: var(--ink-muted);
  font: 500 clamp(0.9rem, 1.8vw, 1.4rem) / 1.25 var(--font-body);
  letter-spacing: -0.02em;
  text-align: right;
}
```

**Key points:**
- `position: absolute; right: 0; top: 42%` — right side, roughly middle
- `z-index: 3` — above both name and portrait
- `color: var(--ink-muted)` — muted, secondary feel
- `font: 500 ... var(--font-body)` — medium weight, not too large
- The `//` prefix is part of the content in JSX

#### `.portrait` — keep mostly as-is
```css
.portrait {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;              /* IN FRONT of name (name is z-index: 1) */
  width: min(62%, 720px, 78dvh);
  margin: 0 auto;
  pointer-events: none;
}
```
**Change:** Ensure `z-index: 2` (was already 1, but confirm it's higher than name's z-index: 1).

Actually, looking at the current CSS, `.portrait` already has `z-index: 1`. The name currently has `z-index: 2`. We need to **swap** these:
- `.headline` → `z-index: 1`
- `.portrait` → `z-index: 2`

#### `.portraitImg` — keep as-is
```css
.portraitImg {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  filter: grayscale(1) drop-shadow(0 24px 48px rgba(7, 28, 92, .16));
}
```
**No changes.**

#### `.cta` — restyle
```css
.cta {
  position: absolute;
  left: 50%;
  bottom: 48px;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  min-height: 46px;
  padding: 0 26px;
  border: 1px solid var(--hairline);
  border-radius: 999px;
  color: var(--ink);
  background: transparent;
  cursor: pointer;
  font: 500 .74rem var(--font-mono);
  text-transform: uppercase;
  letter-spacing: .06em;
  transition: all 220ms ease;
  transform: translateX(-50%);
}

.cta:hover {
  background: var(--ink);
  color: var(--bg);
  border-color: var(--ink);
}
```

**Key changes from current:**
- `background: transparent` instead of `var(--pop)` (lime)
- `border: 1px solid var(--hairline)` — subtle outline
- `color: var(--ink)` — text color from theme
- `left: 50%; transform: translateX(-50%)` — centered (was `left: 0; right: 0; margin: 0 auto`)
- `font: 500` instead of `600` — lighter weight
- Hover: fills with `var(--ink)` and flips text to `var(--bg)`
- **No more lime/acid-lime** — cleaner, more editorial

### Responsive breakpoints

#### `@media (max-width: 900px)`
```css
@media (max-width: 900px) {
  .headline {
    top: 22%;
  }
  .firstName,
  .lastName {
    font-size: clamp(2.8rem, 12vw, 6rem);
  }
  .role {
    top: 38%;
    font-size: clamp(0.8rem, 2vw, 1.1rem);
  }
  .portrait {
    width: min(76%, 78dvh, 420px);
  }
  .cta {
    bottom: 40px;
  }
}
```

#### `@media (max-width: 700px)`
```css
@media (max-width: 700px) {
  .heroInner {
    width: calc(100% - 32px);
  }
  .firstName,
  .lastName {
    font-size: clamp(2.4rem, 13vw, 4.5rem);
  }
  .role {
    position: relative;
    top: auto;
    right: auto;
    margin-top: 1rem;
    text-align: center;
    font-size: 0.85rem;
  }
  .headline {
    top: 16%;
  }
  .portrait {
    width: min(84%, 78dvh, 400px);
  }
  .cta {
    bottom: 32px;
  }
}
```

**On mobile (≤700px):**
- Role text moves from absolute to relative position (flows below the name)
- Name font scales down
- Portrait grows slightly wider

---

## Detailed Change: AboutSection.jsx

### What to change

Transform the about section into a dark editorial intro statement, matching the reference's "// Intro" section.

### Target JSX structure

```jsx
import { fadeUp } from '../animations/variants'
import Reveal from '../animations/Reveal'
import styles from './AboutSection.module.css'

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 60
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

function AboutSection({ about }) {
  if (!about) return null

  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        <Reveal variant={fadeUp}>
          <p className={styles.eyebrow}>// Intro</p>
        </Reveal>

        <Reveal variant={fadeUp} transition={{ delay: 0.06 }}>
          <h2 className={styles.statement}>
            I&apos;m a versatile <span className={styles.accent}>designer who
            partners with founders to turn ideas into
            real products.</span> I focus on clear interfaces,
            sharp decisions, and fast execution.
          </h2>
        </Reveal>

        {about.bio && (
          <Reveal variant={fadeUp} transition={{ delay: 0.12 }}>
            <p className={styles.body}>{about.bio}</p>
          </Reveal>
        )}

        <Reveal variant={fadeUp} transition={{ delay: 0.18 }}>
          <button
            type="button"
            className={styles.cta}
            onClick={() => scrollTo('works')}
          >
            See my Work
          </button>
        </Reveal>
      </div>
    </section>
  )
}

export default AboutSection
```

### What's different from current

1. **Eyebrow**: Changed from `"how I work"` to `"// Intro"` — matches reference style
2. **Statement text**: Changed from `"From idea to launch."` heading + separate statement to a single large statement block. The accent-colored portion is hardcoded to match the reference's emphasis pattern. The `about.bio` content can be used as the supporting body text below.
3. **Removed**: The `.details` grid (bio + interests), the `.availability` section, and the `.title` heading — all replaced by the simpler statement + body + CTA structure.
4. **Added**: A "See my Work" button that scrolls to the works section.
5. **New `scrollTo` helper**: Added locally (same pattern as HeroSection and NeedsSection).

### Important: Content flexibility

The statement text is **hardcoded** to match the reference's exact wording. If the user wants to customize this later, it could be pulled from the `about` prop or a new `hero.introStatement` field. For now, hardcode it to match the reference.

---

## Detailed Change: AboutSection.module.css

### Rewrite the entire file

```css
.section {
  position: relative;
  overflow: hidden;
  padding: 120px 24px;
  background: var(--blue-deep);
  color: #fff;
}
.section::before {
  content: '';
  position: absolute;
  right: -12%;
  top: -30%;
  width: 44vw;
  height: 44vw;
  background: radial-gradient(circle at 50% 50%, rgba(116, 154, 255, .3), transparent 60%);
  pointer-events: none;
}
.inner {
  position: relative;
  z-index: 2;
  max-width: 900px;
  margin: 0 auto;
}
.eyebrow {
  margin-bottom: 32px;
  color: var(--blue);
  font: 500 .68rem var(--font-mono);
  text-transform: uppercase;
  letter-spacing: .1em;
}
.statement {
  max-width: 22ch;
  margin: 0;
  color: #fff;
  font: 600 clamp(2.4rem, 5.5vw, 4.8rem) / 1.02 var(--font-body);
  letter-spacing: -0.04em;
}
.accent {
  color: var(--blue);
}
.body {
  max-width: 52ch;
  margin-top: 40px;
  color: rgba(255, 255, 255, .72);
  font-size: 1rem;
  line-height: 1.6;
}
.cta {
  display: inline-flex;
  align-items: center;
  min-height: 46px;
  margin-top: 48px;
  padding: 0 22px;
  border: 1px solid rgba(255, 255, 255, .28);
  border-radius: 999px;
  background: transparent;
  color: #fff;
  cursor: pointer;
  font: 500 .72rem var(--font-mono);
  text-transform: uppercase;
  letter-spacing: .06em;
  transition: all 220ms ease;
}
.cta:hover {
  background: #fff;
  color: var(--blue-deep);
  border-color: #fff;
}
@media (max-width: 700px) {
  .section {
    padding: 82px 16px;
  }
  .statement {
    max-width: 100%;
    font-size: 2.4rem;
  }
  .body {
    font-size: 0.92rem;
  }
}
```

### Key design decisions
- **`background: var(--blue-deep)`** — the dark blue used in the current About and Needs sections. This creates a clear visual break from the hero.
- **Accent color is `var(--blue)`** (cobalt), NOT `var(--pop)` (lime) — matches user's decision to keep blue accent.
- **`max-width: 22ch`** on `.statement` — forces line breaks at natural points, creating the editorial multi-line look from the reference.
- **CTA is transparent with white border** — matches the hero's restyled CTA pattern.
- **The radial gradient `::before`** is kept from the current design — adds subtle depth.

---

## DesktopScreen.jsx — Reorder Sections

### Current order
```
TopBar → HeroSection → NeedsSection → [main: Works → Skills → About] → Contact → Footer
```

### New order
```
TopBar → HeroSection → AboutSection → NeedsSection → [main: Works → Skills] → Contact → Footer
```

**Changes:**
1. Move `<AboutSection>` from inside `<main>` to **between HeroSection and NeedsSection**
2. Remove `<AboutSection>` from inside `<main>`
3. The `id="about"` on the AboutSection is used by the TopBar's scroll-to-nav, so it must remain accessible

**Updated DesktopScreen.jsx structure:**

```jsx
<>
  <div className={styles.heroScope}>       {/* forced-light scope: hero is always light */}
    <TopBar />
    <HeroSection hero={hero} />
  </div>
  <AboutSection about={about} />        {/* MOVED: now directly after hero */}
  <NeedsSection skills={skills} />
  <main className={styles.page}>
    <section id="works" className={styles.works}>
      {/* ... works content unchanged ... */}
    </section>
    <SkillsSection skills={skills} />
  </main>
  <ContactSection contact={contact} />
  <Footer />
</>
```

**Why move it:** The reference shows the intro statement section directly below the hero, creating a seamless flow from the name/portrait to the statement text.

**`.heroScope` (NEW — in `DesktopScreen.module.css`):** A `position: relative` wrapper that re-declares light tokens (`--bg`, `--surface`, `--ink`, `--ink-muted`, `--hairline`) so everything inside renders with light values regardless of the global theme. This keeps the hero always light AND keeps the TopBar's ink-colored links readable over the light hero. Without this wrapper, in dark mode the TopBar would inherit light `var(--ink)` and become invisible on the light hero.

---

## Design Token References

| Token | Light Value | Dark Value | Usage in This Design |
|---|---|---|---|
| `--bg` | `#f8f9ff` | `#060912` | Hero background |
| `--ink` | `#092064` | `#eaeefb` | Name text, CTA text |
| `--ink-muted` | `#66719b` | `#98a3c6` | Role text |
| `--blue` | `#2448e8` | `#5d7bff` | Accent words in intro statement |
| `--blue-deep` | `#1236bc` | `#0a1f63` | Intro section background |
| `--hairline` | `#dbe1f7` | `#222b46` | CTA border |
| `--font-body` | Bricolage Grotesque | — | Name font, role font, statement font |
| `--font-mono` | DM Mono | — | Eyebrow, CTA button text |

**Important:** All colors use semantic tokens — no hardcoded hex values. This ensures both light and dark themes work correctly.

---

## Animation Strategy

> **SUPERSEDED by "Adjustments — Round 2" above.** The hero no longer plays a quick 0.2s cascade — it is a staged reveal (name → 2s hold → portrait rises → CTA). See the Round 2 timeline table for the current, implemented timings and the reduced-motion handling. The section below is kept for historical reference only.

### Hero animations (on page load) — ORIGINAL ROUND 1 PLAN
- **Name (`<motion.h1>`)**: Uses `fadeUp` variant — fades in and slides up from 30px below
- **Role (`<motion.p>`)**: Uses `fadeUp` variant with `delay: 0.1` — slightly after the name
- **Portrait (`<motion.div>`)**: Uses `fadeIn` variant with `delay: 0.2` — fades in last
- **CTA button**: No animation — static, always visible

### Intro section animations (on scroll) — UNCHANGED, still current
- Uses `<Reveal>` component with `whileInView` — triggers when section scrolls into view
- Each child has staggered delays: `0`, `0.06`, `0.12`, `0.18`
- All use `fadeUp` variant

### Animation variants — UNCHANGED
- Reuse existing `fadeUp`, `slideFromBottom` from `src/components/animations/variants.js` (`fadeIn` no longer used in the hero)
- Reuse existing `<Reveal>` component from `src/components/animations/Reveal.jsx`

---

## Responsive Breakpoints

### Desktop (>900px)
- Name: `clamp(3.2rem, 11vw, 11rem)`, two lines stacked
- Portrait: `min(62%, 720px, 78dvh)`, centered bottom
- Role: absolute right, top 42%
- CTA: absolute bottom 48px, centered

### Tablet (≤900px)
- Name: `clamp(2.8rem, 12vw, 6rem)`
- Portrait: `min(76%, 78dvh, 420px)`
- Role: absolute right, top 38%, slightly smaller
- CTA: bottom 40px

### Mobile (≤700px)
- Name: `clamp(2.4rem, 13vw, 4.5rem)`
- Portrait: `min(84%, 78dvh, 400px)`
- Role: switches from absolute to **relative** position (flows below name, centered)
- CTA: bottom 32px
- Container padding: 32px instead of 48px

---

## Edge Cases & Pitfalls

1. **Name z-index swap**: The current design has `.headline` at `z-index: 2` and `.portrait` at `z-index: 1`. The redesign **swaps** these: `.headline` at `z-index: 1`, `.portrait` at `z-index: 2`. If you forget this, the portrait will be behind the name instead of overlapping it.

2. **Role text on mobile**: On mobile (≤700px), the role text switches from `position: absolute` to `position: relative`. Make sure to explicitly set `position: relative` in the mobile media query, or it will remain absolutely positioned and overlap incorrectly.

3. **CTA centering (UPDATED in Round 2)**: The CTA is now a `motion.button` animated with `fadeUp` (which animates `y`). Framer Motion owns the element's `transform` — any CSS `transform: translateX(-50%)` centering gets wiped and breaks centering. The CTA is centered with `left: 0; right: 0; width: max-content; margin: 0 auto` instead. Never add CSS transforms to framer-animated elements.

4. **AboutSection id**: The `id="about"` attribute on the AboutSection `<section>` element must remain — the TopBar's navigation links scroll to `#about`. If you remove or change it, navigation breaks.

5. **scrollTo helper**: The AboutSection needs its own `scrollTo` function (same pattern as HeroSection and NeedsSection). This is a local function, not imported.

6. **about prop usage**: The redesigned AboutSection still receives the `about` prop. It uses `about.bio` for the supporting body text. The `about.interests` and `about.availableFor` fields are no longer rendered in the redesigned version — they can be used elsewhere or removed from defaults later.

7. **Statement max-width**: The `max-width: 22ch` on the statement is critical — it forces the text to wrap at specific points, creating the editorial multi-line layout. If you remove this, the text will flow as one long line.

8. **DesktopScreen import order**: After moving AboutSection, make sure the import is still at the top of the file and the component is used in the new position.
9. **`.heroScope` wrapper is load-bearing**: The hero is forced light via token overrides on `.heroScope` in `DesktopScreen.module.css`. If you remove or restructure this wrapper without re-scoping the tokens, the hero stays light but the transparent TopBar inherits global dark-mode `var(--ink)` (light text) and becomes **invisible** on the light hero.
10. **Grayscale is a CSS filter, not an image edit**: `.portraitImg` uses `filter: grayscale(1) ...`. The source file `/images/portrait.png` is unchanged — removing the filter restores full color instantly.

---

## Verification Checklist

After implementing, verify:

- [ ] Hero displays "Oluwadamilare" on line 1, "Ogo-Oluwade" on line 2
- [ ] Name is massive and spans nearly full viewport width
- [ ] Name sits behind the portrait (portrait overlaps the name)
- [ ] Role text "// Web Designer & Developer" appears on the right side
- [ ] Role text is muted (not bright, not accent colored)
- [ ] CTA button is transparent with border, not lime/acid-lime
- [ ] CTA button is centered at bottom of hero
- [ ] No bottom notes ("Specialized in..." and tagline are gone)
- [ ] Portrait image is centered at bottom, overlapping the name
- [ ] Intro section appears directly below the hero (not after NeedsSection)
- [ ] Intro section has dark background (`--blue-deep`)
- [ ] Intro section shows "// Intro" label in blue
- [ ] Intro section has large statement text with blue accent words
- [ ] Intro section has "See my Work" button
- [ ] Scroll-to navigation works (TopBar "about" scrolls to intro section)
- [ ] Light mode: hero background is light (#f8f9ff), text is dark (#092064)
- [ ] Dark mode: hero background is STILL light (#f8f9ff) — forced via `.heroScope`, text dark (#092064), TopBar links remain dark/readable
- [ ] Tablet (≤900px): name scales down, portrait shrinks
- [ ] Mobile (≤700px): role text moves below name, portrait grows wider
- [ ] Framer Motion animations work (fade up on load, reveal on scroll)
- [ ] No console errors
- [ ] Build passes (`npm run build` or equivalent)

---

## Taste-Skill Review (Post-Implementation Corrections)

Applied the `design-taste-frontend` skill lens. Findings and resulting corrections:

1. **Hero theme lock (was: respect toggle → now: always light).** The reference hero is dark, but the user chose "always light for now." A forced-light hero means the transparent TopBar (which uses `var(--ink)`) must also live in the light scope or it becomes invisible in dark mode. Fixed via the `.heroScope` wrapper.
2. **Monotone portrait (was: natural color → now: grayscale).** Per user, `filter: grayscale(1)` replaces the natural-color rule from DESIGN.md. True B&W, no brand tint.
3. **Long-name overflow (was: `white-space: nowrap` → now: wraps).** "Oluwadamilare" is a 12-char single word that overflows at `nowrap` on mobile. Removed `nowrap`, added `overflow-wrap: break-word` + `hyphens: auto`.
4. **True overlap (was: name top 12%, separated → now: name top 26%, overlapped).** Moved the name to mid-height so the bottom-center portrait (`z-index: 2`) actually covers the lower portion of the name (`z-index: 1`), matching the reference's depth layering.
5. **Duplicate CTA intent (OUT OF SCOPE — flagged only).** Hero CTA is "Start a project" (contact intent); `NeedsSection` CTA is "start a project" (same contact intent). The taste skill bans duplicate-intent CTAs on one page. Left as-is for now; recommend renaming the NeedsSection CTA to a different intent (e.g. "See my work" or "Get in touch") in a later pass.
6. **Placeholder copy (flagged).** The AboutSection statement text is verbatim reference copy ("I'm a versatile designer who partners with founders..."). Intentionally mirrors the reference; should be replaced with the user's real bio before launch. The `about.bio` prop already feeds the supporting body paragraph.
7. **Accent color consistency.** Blue (`var(--blue)`) is the single accent across hero role/CTA hover and the intro statement — lock maintained, no competing accents.
8. **Eyebrow restraint.** Only one eyebrow on the page ("// Intro"). Within the max-1-per-3-sections rule. OK.

---

## Adjustments — Round 2 (Staged Reveal, Role Pinning, Nav Restructure)

User-requested adjustments after reviewing the round 1 implementation. All are implemented and build-verified.

### 1. Staged hero animation (the name holds, then the portrait rises over it)

**Motivation:** the portrait ends up covering the name, so the name must be given the stage first — a long solo hold makes it stick in the viewer's memory before it gets covered.

**Timeline (non-reduced motion):**

| t | Element | Animation | Duration |
|---|---|---|---|
| 0.0s | Name block (`.nameBlock` + `.headline`) | `fadeUp` (opacity 0→1, y 30→0) | 0.6s |
| 0.2s | Role text (`.role`) | `fadeUp`, delay 0.2 | 0.6s |
| — | **HOLD: name alone on stage** | ~2.0s of stillness | — |
| 2.6s | Portrait (`.portrait`) | `slideFromBottom` (y 60→0), delay 2.6 | 0.9s |
| 3.6s | CTA button (`.cta`) | `fadeUp`, delay 3.6 | 0.6s |

Total intro: ~4.2s. Constants live at the top of `HeroSection.jsx` (`PORTRAIT_DELAY = 2.6`, `CTA_DELAY = 3.6`) — tune timing there only.

**Reduced motion:** `useReducedMotion()` from framer-motion. When true, every motion element gets `initial={false}` — renders fully visible instantly, no delays, no animation. (The global CSS `prefers-reduced-motion` clamp does NOT affect JS-driven framer animations, so this hook is required.)

**Why rise-from-bottom for the portrait:** it makes the "portrait rises and covers the name" narrative explicit — the animation tells the same story as the final composition.

### 2. Role text pinned to the name's bottom-right corner

The role (`// Web Designer & Developer`) is no longer an independent absolute element at `right: 0; top: 42%` of the hero. It now hangs from the name's own bottom-right corner — positioned with `top: 100%` so it clears the letters and sits just below the name's bottom edge, right-aligned to the name's right edge:

```css
.role {
  position: absolute;   /* inside .nameBlock, which shrink-wraps the name */
  top: 100%;            /* hangs below the name's bottom edge, clear of the glyphs */
  right: 0;             /* flush with the name's right edge */
  margin: 0.3em 0 0;    /* small gap below the name */
  z-index: 3;           /* stays above the portrait (z-index 2) */
}
```

> **History note:** the first pass used `bottom: 0.04em`, which anchored the role *inside* the name block and collided with the letters. `top: 100%` was the fix — it pins the role's top to the name block's bottom edge instead.

**Structure change** — the hero markup is now:

```jsx
<motion.div className={styles.nameBlock}>     {/* shrink-wrapped, centered */}
  <h1 className={styles.headline}>            {/* position: relative; z-index: 1 */}
    <span className={styles.firstName}>Oluwadamilare</span>
    <span className={styles.lastName}>Ogo-Oluwade</span>
  </h1>
  <motion.p className={styles.role}>          {/* absolute, z-index: 3 */}
    // Web Designer<br />& Developer
  </motion.p>
</motion.div>
```

**The stacking trick (critical):** `.nameBlock` deliberately has **NO z-index**. If it had one, it would create a stacking context and trap the role below the portrait (portrait z2 > nameBlock z1). Because nameBlock is z-auto, the inner `.headline` (z1) and `.role` (z3) participate directly in the hero's stacking order alongside `.portrait` (z2) — so the name sits behind the portrait while the role floats above it. This works at rest because framer-motion removes its inline `transform`/sets `opacity: 1` once the intro animation finishes (neither creates a stacking context). During the 0–0.8s intro the wrapper temporarily creates a context, but the portrait is still invisible then, so there is no visual conflict.

**Centering:** `.nameBlock` uses `left: 0; right: 0; width: max-content; max-width: 100%; margin: 0 auto` — shrink-wraps to the widest name line ("Oluwadamilare"), so `right: 0` on the role attaches to the name's actual right edge, not the container's. No CSS `transform` centering (framer owns transforms on this element).

### 3. TopBar restructure

- **Mode toggle removed** from the TopBar entirely (moved to the Footer, see below). The `useTheme`, `Sun`, `Moon` imports are gone from `TopBar.jsx`.
- **Nav links (about / stack / works / contact) render as a horizontal row at the top right on desktop** — `.links` is now `display: flex` by default with a 30px gap; the old always-hidden dropdown is gone.
- **Hamburger only on mobile (≤600px)** — `.hamburger` is `display: none` on desktop and `display: flex` inside the `max-width: 600px` media query. The dropdown (`.links.open`) is scoped inside the same media query.
- `.inner` switched from `grid: 1fr auto 1fr` (brand / toggle / right) to `flex; justify-content: space-between` (brand left / links right).

### 4. Theme toggle relocated to the Footer

- `Footer.jsx` now imports `useTheme` and renders the same toggle pill (Sun/Moon icon + "change the mode" label) between the JIGZ brand and the copyright.
- Styling in `Footer.module.css` uses theme tokens (`--hairline` border, `--ink-muted` text, `--blue` icon) — the footer respects the active theme, so the toggle reads correctly in both modes.
- Theming behavior is unchanged otherwise: the site still defaults to dark; the hero region stays forced-light via `.heroScope` regardless.

### Round 2 edge cases

1. **Never put CSS transforms on framer-animated elements.** The CTA is a `motion.button` — framer's inline `transform` overrides any CSS transform, so centering uses `margin: 0 auto` (see updated pitfall #3 above). The old `.cta:active` transform was removed for the same reason.
2. **The nameBlock no-z-index trick is load-bearing.** Adding `z-index` (or a persistent transform/opacity/filter) to `.nameBlock` pushes the role below the portrait and breaks the corner pin.
3. **Timing constants** live in `HeroSection.jsx` (`PORTRAIT_DELAY`, `CTA_DELAY`). If you change the hold duration, keep the CTA roughly 1s after the portrait delay so it lands after the portrait settles.

### Round 2 verification checklist

- [ ] On load: name fades up, role snaps in at its corner ~0.2s later
- [ ] Name holds alone for ~2s (nothing else moves)
- [ ] Portrait rises from the bottom and settles over the name's lower portion
- [ ] CTA fades in last, after the portrait settles
- [ ] Role text hangs just below the name's bottom-right corner (clear of the letters, right-aligned to the name's edge), and stays visible ABOVE the portrait
- [ ] Name sits BEHIND the portrait (portrait covers its lower portion) — **SUPERSEDED by Round 3: name is now on top with `difference` blend**
- [ ] With `prefers-reduced-motion: reduce`: everything renders instantly, no staged sequence
- [ ] Desktop: nav links (about/stack/works/contact) visible top-right, no hamburger
- [ ] Mobile (≤600px): links hidden, hamburger opens the dropdown
- [ ] No mode toggle in the TopBar
- [ ] Footer shows the "change the mode" toggle; clicking it switches the site theme (hero stays light)

---

## Adjustments — Round 3 (Inversion-Blend Name, #5 text style)

> **SUPERSEDED by Round 4 — the blend was reverted (it didn't read well).** Kept for history. Do not re-apply `mix-blend-mode` to the name.

**Problem:** In Round 2 the name sat at `z-index: 1` (behind) and the portrait at `z-index: 2` and was **opaque over its pixels**, so wherever they overlapped the name was simply hidden — "the name behind the image isn't showing."

**Reference (`inspos/#5.jpg`):** The name is not peeking from behind the photo — it's **on top**, using a color-inversion blend. Dark letters over the light backdrop flip to **white** where they cross the dark subject, then back to dark over the light background. This is `mix-blend-mode: difference` on white text. The name is always visible; it just changes tone as it weaves through the subject.

**Enabler:** `portrait.png` is a transparent-background cutout (`Format32bppArgb`, corner alpha `00`, center opaque). So a difference-blended name reads dark over the transparent/hero-bg areas and light over the dark hair/jacket — exactly #5, no new assets. (The `noir port..webp` is an unrelated blue agency template, not a portrait.)

### Decisions (user)
- Two stacked name lines (not one full-bleed line), both blended.
- Blend technique: **`difference`** (chosen over `exclusion` — punchier, matches #5; exclusion is muddier over mid-tones like skin).
- Name positioned to **cross the face** (lowered from `top: 26%` → `22%`, breakpoints `18%`/`12%`).
- Portrait size: keep current centered cutout.
- Portrait: keep grayscale (cleanest inversion).
- Role text: **solid, readable, NOT blended** (matches #5 where the role is solid dark).

### Implementation
**`HeroSection.jsx`:** the animated wrapper changed so the blend isn't isolated. `.nameBlock` is now a **plain `<div>`** (no motion, no stacking context). The name is a `<motion.h1 className={styles.headline}>` carrying `fadeUp` directly. The role stays a sibling `<motion.p>`.

**`HeroSection.module.css`:**
- `.headline`: `z-index: 2` (was 1) + `mix-blend-mode: difference`. Now painted ON TOP of the portrait and blends against it.
- `.firstName, .lastName`: `color: #fff` (was `var(--ink)`). The blend source MUST be white for `difference` to invert correctly.
- `.portrait`: `z-index: 1` (was 2). Now below the name.
- `.role`: unchanged — `z-index: 3`, solid `var(--ink-muted)`, no blend. Sits above the blended name and (on desktop) to the right of the portrait's edge, over the light bg, so it stays readable.
- `.nameBlock` top lowered to `22%` / `18%` / `12%` across breakpoints so the name crosses the face.

### The stacking-context rule (critical — do not regress)
`mix-blend-mode` blends an element against its backdrop = everything painted below it in the **nearest ancestor stacking context**. If ANY ancestor between the headline and the root creates a stacking context (`z-index`, `transform`, `opacity<1`, `filter`, `will-change`, `isolation`), the blend is trapped and the white name shows as pure white (invisible on the light hero).
- `.hero`, `.heroInner`, `.nameBlock`, and `.heroScope` are all deliberately **context-free** (position without z-index; no transform/opacity/filter). The `fadeUp` animation lives on `.headline` itself (the blend element), whose own transform/opacity do NOT isolate it from the parent backdrop.
- Never re-add `z-index`/`transform`/`opacity` to `.nameBlock` or `.heroScope`, or wrap the headline in another animated div.

### Difference-blend math (verified)
White source (255) blended via `|backdrop − source|`:
- Over hero bg `#f8f9ff` → ~`(7,6,0)` ≈ near-black name on light bg ✓
- Over dark hair (~42) → ~213 light gray ✓
- Over mid skin (~138) → ~117 mid gray (lower contrast, still legible — same as #5) ✓

### Round 3 verification checklist
- [ ] Name is fully visible everywhere — dark over the light hero, inverting to white where it crosses the dark hair/jacket
- [ ] Name crosses the face region (not just the crown)
- [ ] The two name lines read clearly over both the background and the subject
- [ ] Role text stays solid and readable (not inverted), pinned at the name's bottom-right corner
- [ ] Staged reveal intact: name fades up (already blended) → holds → portrait rises → name's inversion region grows as the portrait passes behind it → CTA last
- [ ] Reduced motion: name renders instantly, still blended and visible
- [ ] If the name ever shows as solid white/invisible, an ancestor gained a stacking context — audit per the rule above

---

## Adjustments — Round 4 (Revert blend → click-to-reveal)

**Why:** the Round 3 inversion blend "didn't come out well." Reverted to a solid name and replaced the auto-rise animation with a **user-triggered reveal**: the portrait starts high (covering the name); clicking a down-arrow button sinks the portrait to the bottom and the name becomes visible.

### Revert (Round 3 → solid)
- Removed `mix-blend-mode: difference`; name color back to `var(--ink)`; portrait back above the name in paint order. The `nameBlock` is no longer a blend host.

### New interaction model
- **State:** `const [revealed, setRevealed] = useState(false)` in `HeroSection.jsx`. No Framer Motion in the hero anymore — all motion is CSS transitions (so the global `prefers-reduced-motion` clamp disables them automatically).
- **Covered (initial):** name block `opacity: 0` (fully hidden, but present in the DOM for screen readers/SEO); portrait at `translateY(0)` (bottom-anchored, large, grayscale); a circular **down-arrow button** (`CaretDown` from `@phosphor-icons/react`) sits bottom-center with a subtle `revealBob` hint animation.
- **On click:** `setRevealed(true)` → portrait transitions `translateY(var(--sink))` (slides down & stays), name block fades/slides in (`opacity 0→1`, `translateY 14px→0`, 250ms delay), arrow fades out, CTA "Start a project" fades in.
- **Name in DOM always** (accessibility requirement met — verified the name text is in `body` even when visually hidden).

### Layering (simple now, no blend)
- `.nameBlock` z-index 1 (behind portrait), `.portrait` z-index 2, `.cta` z-index 3, `.revealBtn` z-index 4 (must sit above the portrait to be clickable).

### Geometry is viewport-dependent — tuned via screenshots
The portrait is size-capped (`min(62%,720px,78dvh)` etc.) but the sink is in `dvh`, so the same sink over-removes the portrait on small screens. Two CSS custom properties drive it, overridden per breakpoint:
- Desktop (base): `--name-top: 15%; --sink: 38dvh;` CTA at `top: 55%`.
- ≤900px: `--name-top: 12%; --sink: 22dvh;` portrait `min(80%,80dvh,460px)`, CTA `top: 48%`.
- ≤700px: `--name-top: 9%; --sink: 10dvh;` portrait `min(94%,74dvh,480px)`, CTA `top: 30%` (groups the name+role+CTA into one upper block; portrait owns the bottom).

On small screens the name is hidden by **opacity, not by the portrait** (the capped portrait sits below the name anyway), so the sink can be small — it's motion, not occlusion.

**Desktop sink = 38dvh (tuned via screenshot).** The target is that after the down-sink the portrait shows the **crown AND the glasses** (the glasses were cut off below the fold at the old 46dvh). The window is tight because the CTA is pinned at `top: 55%`: the portrait's crown must stay below the CTA (`sink > ~38dvh`) while the glasses stay above the bottom fold (`sink < ~40dvh`). 38dvh sits in that window. If the CTA is ever moved, re-tune `--sink`.

### Pitfalls
1. **Playwright can't click the bobbing button** (infinite animation → never "stable"). Use `page.evaluate(() => document.querySelector('[aria-label=\"Reveal name\"]').click())` or `{ force: true }` in any capture script.
2. **Phosphor icon name is `CaretDown`, not `ChevronDown`** (Lucide naming). Wrong name = blank page (module graph error).
3. **Don't put the CTA at `bottom`** — it collides with the portrait's face. Anchor it in the gap with `top: %` (per breakpoint).
4. **Keep the name in the DOM** (`opacity`, not `display:none`/unmount) so screen readers and SEO still get it.
5. **Vite binds `127.0.0.1`** — use `http://127.0.0.1:5173` in capture scripts, not `localhost` (IPv6 mismatch).

### Verification method
Screenshotted with Playwright driving the **system Chrome** (`channel: 'chrome'`, no browser download needed) at 1280×900 and 390×844, covered + revealed. All four states confirmed good. (Playwright added as a devDependency; the Chromium binary was never downloaded — it uses the installed Chrome. Remove the devDep if unwanted.)

### Round 4 verification checklist
- [ ] Initial: portrait prominent, name hidden, down-arrow visible as the only hint
- [ ] Click arrow → portrait sinks to bottom & stays, name fades in fully visible, role at its corner, CTA appears
- [ ] Name is in the DOM at all times (screen-reader accessible)
- [ ] Arrow button is clickable (z-index above portrait)
- [ ] Desktop, tablet, mobile all composed cleanly (no CTA-on-face overlap, no dead gaps)
- [ ] Reduced motion: transitions collapse to instant (global CSS clamp)
- [ ] Build + lint clean on touched files
