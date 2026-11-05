# Content Checklist

The app is feature-complete; the remaining work is real content. Until items are
filled in through `/console` (and stored in Neon), the site falls back to the
scaffolding in `src/data/defaults.js`.

Case-study pages are guarded by `hasRealCaseStudy()`: an entry whose sections are
all `[Placeholder: ...]` renders "Case study not found" instead of template text.
That prevents placeholder copy from leaking, but the rest of the card still looks
generic (placeholder thumbnail, no live link).

## Missing / placeholder content

| Entry | Kind | Missing |
|---|---|---|
| `ciphra` | build | `href` is `#` (no live link); thumbnail, case-study hero, and evidence image all use `/images/placeholder.svg`; 7 `[Placeholder: ...]` case-study sections; evidence caption placeholder |
| `verge` | build | `href` is `#`; thumbnail, case-study hero, and evidence images use `/images/placeholder.svg`; 7 `[Placeholder: ...]` case-study sections; 2 evidence caption placeholders |
| `design-2` (Flux Dashboard UI) | design | `images` and `thumbnail` use `/images/placeholder.svg`; `caseStudy` is `null` |
| `design-3` (Orbit Mobile App) | design | `images` and `thumbnail` use `/images/placeholder.svg`; `caseStudy` is `null` |

Totals: **17 placeholder strings** (14 case-study sections + 3 evidence captions),
**9 placeholder image references**, and **2 dead `href: '#'` links**.

The hero portrait is real (`public/images/portrait.png`).

## Broken / dangling references

- `skills` metadata references a `design-1` project (`projectIds`) and
  `ProjectVisual.jsx` has a `design-1` special case, but no `design-1` entry
  exists. Either restore the entry or remove the references.
- `logo` fields point at `/images/logos/ciphra.png` and
  `/images/logos/verge.png`, which are not present. The field is currently unused
  by any component, so nothing breaks — but add the assets before wiring them up.
- `contact.discord` links to `https://discord.com/` (generic site), and
  `hello@jigz.dev` should be confirmed as the real inbox.

## How to fill content

1. Open `/console` and unlock with the console password.
2. Edit featured entries, hero, about, skills, contact, and site settings.
3. Use `PUT /api/portfolio` persistence (automatic) when running with a
   `DATABASE_URL`.
4. Re-check `npm run build` and the rendered site; placeholders should disappear
   from cards and case-study pages.
