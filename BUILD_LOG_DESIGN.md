---
version: v2 — locked
name: build-log (oversized type)
description: A single-column, chronological "build log" portfolio — the page reads as the artifact of the same PRD → build plan → graduation-gate process used to ship the actual projects. Status vocabulary (LIVE / IN PROGRESS / SHADOW MODE) is lifted directly from real project language, not invented for the page. v2 adds exaggerated type hierarchy on top of v1's structure: the content model didn't change, the type scale and one accent color did.
---

## Color

Each color has exactly one job, site-wide. No exceptions — if a new use case comes up, it gets its own color rather than borrowing one.

| Token             | Hex       | Job                                                  |
|--------------------|-----------|-------------------------------------------------------|
| `--bg`             | `#14171C` | Page background. Graphite, not pure black.            |
| `--surface`        | `#1C2027` | Entry card background.                                |
| `--surface-raised` | `#20242C` | Hover / focus state on a card.                         |
| `--ink`            | `#E4E7EC` | Primary text.                                          |
| `--ink-muted`      | `#8B93A1` | Meta text: dates, tags, labels.                        |
| `--hairline`       | `#2A2F38` | Dividers, borders. Never used as a fill.               |
| `--status-live`    | `#3DDC84` | Status dot/badge — means "shipped and live." Nothing else. |
| `--status-progress`| `#F2A93B` | Status dot/badge — means "in progress." Nothing else.  |
| `--status-shadow`  | `#6B7280` | Status dot/badge — means "shadow mode / logging only." Nothing else. |
| `--link`           | `#5B8DEF` | Interactive links and CTAs. Nothing else.              |
| `--pop`            | `#FF3D81` | Emphasis only — the highlighted word in the hero/closing statement, decision-line borders. Nothing else, never a tag, never a link, never a status. |

Deliberately not vermilion-on-graphite — that pairing is the default a lot of AI-assisted design tools reach for, and it's become a tell. Magenta also sits further from the green/blue/gold most trading and crypto sites default to, which keeps it distinctive to Jigz's specific field.

## Type

Reuses the Ciphra type system rather than inventing a new one — the repetition across projects is the personal signature, not a shortcut.

- **Headline**: IBM Plex Mono, 600. Large hero statements set in a data typeface, not a display sans — the page opens in the same voice it logs entries in.
- **Body**: IBM Plex Sans, 400/500. All prose.
- **Meta / tags / status**: IBM Plex Mono, 500, uppercase, `letter-spacing: 0.08em`, small size (~12–13px).

Scale (v2 — exaggerated hierarchy):
- Hero: `clamp(2.75rem, 9vw, 6.5rem)` / weight 700 / line-height 0.98 / letter-spacing -0.02em
- Hero support line: `0.78rem` mono, narrow column (max-width 260px), right-aligned under the headline — the small/quiet counterweight to the huge headline is the point, not an accident
- Entry title: `clamp(2rem, 5.5vw, 3.75rem)` / weight 700 / line-height 1.02
- Body: `1rem` / line-height 1.65 (unchanged — data and prose don't get exaggerated, only the identity type does)
- Meta / entry-id / tags: `0.65–0.68rem` (slightly smaller than v1) — the contrast between huge and tiny is what makes this direction read as designed rather than just "bigger"

New element — **ghost numerals**: each entry's index (`00`, `01`, `02`...) rendered at `clamp(6rem, 16vw, 11rem)`, weight 700, mono, `opacity: 0.045`, positioned behind the entry content. Purely decorative, but the number is always the entry's real position in the log — never an arbitrary decorative digit.

## Layout

Single column, max-width `720px`, centered, generous vertical rhythm (`~96px` between entries). No sidebar, no grid of cards — a log is read top to bottom in order, so the order carries real information (most recent / most significant first).

```
[ sticky header: name · role · small live status dot ]

  HERO
  one-sentence thesis, set in mono, large
  one-line supporting sentence

――――――――――――――――――――――――――――――――
ENTRY_00 — ABOUT
  bio, skills/tools as inline mono tags
――――――――――――――――――――――――――――――――
ENTRY_01 — [PROJECT NAME]         [STATUS BADGE]
  one-line thesis for the project
  small signature graphic (swap for real screenshot later)
  stack tags · one real decision, stated plainly · links
――――――――――――――――――――――――――――――――
ENTRY_02 — [PROJECT NAME]         [STATUS BADGE]
  ...
――――――――――――――――――――――――――――――――
  $ contact block, styled as a terminal command
```

## Signature element

On first load only, entries fade/translate in top-to-bottom, staggered ~80ms apart — the log writing itself once. `prefers-reduced-motion` disables this; content renders immediately, no exceptions.

## Component notes

- **Status badge**: small pill, `1px solid var(--hairline)`, dot + mono label. Dot color is the only color in the badge — label text stays `--ink-muted`. This keeps the badge from becoming another "job" for the status color to do.
- **Entry divider**: a literal hairline (`1px solid var(--hairline)`), not decorative dots or numbered chevrons.
- **Links**: underline on hover only, `--link` color, no button chrome unless it's a real CTA (email/socials in the contact block).
- **Focus states**: visible `2px solid var(--link)` outline on every interactive element — non-negotiable, this direction has no other visual affordance for keyboard users.
