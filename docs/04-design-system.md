# 04 — Design System

> **Status: PHASE 4 COMPLETE — direction and canonical tokens approved
> autonomously. This document is the single source of truth for visual values.**
> Generated CSS: `site/src/styles/tokens.css` (do not hand-edit).

## Status legend

- `[PROPOSED]` — agent suggestion; not verified or approved.
- `[VERIFIED]` — checked against a source or measurement.
- `[APPROVED]` — human approval, or a recorded autonomous decision.
- `[PENDING]` — awaiting information or a decision.
- `[BLOCKED]` — cannot proceed; reason and corrective action required.

## Art direction

| Field | Value | Status |
| --- | --- | --- |
| Direction name | The Outfitter's Ledger | `[APPROVED]` |
| One-sentence principle | A calm, precise schoolwear catalogue set like a well-kept outfitter's ledger: oxblood masthead, blush paper, hairline rules, and garments photographed flat and true. | `[APPROVED]` |
| Why it fits this subject | School uniform shopping starts with a list: stages, garments, sizes, quantities. The ledger structure turns that reality into navigation and gives the store a credible, organised voice for parents and school staff. | `[VERIFIED]` |
| Why it is not generic | The structure comes from the subject, not a DTC template: a timetable-like stage rail, tabular prices, hairline rules, a 7/5 editorial split, and a solid oxblood footer. It avoids cream/terracotta, acid-green-on-black, all-caps eyebrows, decorative numbering, and identical shadowed cards. | `[VERIFIED]` |
| Relationship to references | Takes the supplied mockup's crimson/blush warmth and rounded product media; Stevensons' calm role/service structure; Folk's image-led merchandising; Daunt Books' curated rows and plain labels. None of their assets, copy, or layouts are copied. | `[VERIFIED]` |
| Relationship to real assets | The checked flat-lay hero carries the ledger idea literally — garments laid out as a kit. Product photos use a consistent 4:5 chalk frame and 20px radius so mixed stock backgrounds read as one catalogue. | `[VERIFIED]` |
| Approval | Autonomous decision D-013, 2026-11-11 | `[APPROVED]` |

## Canonical design tokens

> The block between the markers is the machine source of truth.
> `npm run tokens:build` generates CSS custom properties from it.
> Do not hand-edit the generated CSS.

<!-- BEGIN DESIGN TOKENS JSON -->
{
  "version": 1,
  "meta": {
    "name": "Fairholt Schoolwear — The Outfitter's Ledger",
    "status": "approved"
  },
  "color": {
    "base": {
      "oxblood": "#7A2230",
      "oxbloodDeep": "#521720",
      "blush": "#F6E5E3",
      "chalk": "#FBF9F5",
      "paper": "#FFFFFF",
      "ink": "#1E2430",
      "inkMuted": "#5A6070",
      "brass": "#B08A4F",
      "border": "#E2D8D2",
      "borderStrong": "#8C7C74"
    },
    "text": {
      "primary": "#1E2430",
      "secondary": "#5A6070",
      "inverse": "#FBF9F5",
      "accent": "#7A2230",
      "error": "#A33131",
      "success": "#2E6B4F"
    },
    "semantic": {
      "success": "#2E6B4F",
      "error": "#A33131",
      "warning": "#8A5A12",
      "info": "#2A4A6B",
      "focus": "#7A2230"
    }
  },
  "typography": {
    "family": {
      "display": "Fraunces Variable, Georgia, serif",
      "body": "Archivo Variable, Arial, sans-serif"
    },
    "size": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.375rem",
      "2xl": "1.75rem",
      "3xl": "2.25rem",
      "4xl": "3rem",
      "5xl": "3.75rem",
      "display": "clamp(2.75rem, 5.2vw, 4.5rem)"
    },
    "weight": {
      "regular": "400",
      "medium": "500",
      "semibold": "600",
      "bold": "700"
    },
    "lineHeight": {
      "tight": "1.02",
      "snug": "1.18",
      "normal": "1.5",
      "relaxed": "1.65"
    },
    "measure": {
      "narrow": "30rem",
      "body": "42rem",
      "wide": "56rem"
    },
    "tracking": {
      "tight": "-0.02em",
      "normal": "0",
      "wide": "0.04em"
    }
  },
  "space": {
    "3xs": "0.25rem",
    "2xs": "0.5rem",
    "xs": "0.75rem",
    "sm": "1rem",
    "md": "1.5rem",
    "lg": "2rem",
    "xl": "3rem",
    "2xl": "4rem",
    "3xl": "6rem",
    "4xl": "8rem"
  },
  "radius": {
    "sm": "6px",
    "md": "12px",
    "lg": "20px",
    "pill": "999px"
  },
  "border": {
    "hair": "1px",
    "strong": "2px"
  },
  "shadow": {
    "card": "0 18px 40px -30px rgba(30, 36, 48, 0.35)",
    "menu": "0 24px 60px -32px rgba(30, 36, 48, 0.45)"
  },
  "motion": {
    "duration": {
      "fast": "140ms",
      "base": "220ms",
      "slow": "420ms"
    },
    "easing": {
      "standard": "cubic-bezier(0.2, 0.7, 0.3, 1)",
      "out": "cubic-bezier(0.16, 1, 0.3, 1)"
    }
  },
  "breakpoint": {
    "mobile": "390px",
    "tablet": "768px",
    "desktop": "1440px"
  },
  "layout": {
    "maxWidth": "1240px",
    "gutter": "1.5rem",
    "gutterMobile": "1rem",
    "gridColumns": "12",
    "headerHeight": "76px"
  }
}
<!-- END DESIGN TOKENS JSON -->

## Color

| Token | Value | Use | Contrast pair | Ratio | WCAG AA | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `--color-base-oxblood` | `#7A2230` | Primary brand, masthead rule, primary buttons, footer | `--color-text-inverse` #FBF9F5 on it | 9.51:1 | Pass (normal text) | `[VERIFIED]` |
| `--color-base-oxblood-deep` | `#521720` | Footer and button hover | `--color-text-inverse` on it | 13.29:1 | Pass | `[VERIFIED]` |
| `--color-base-blush` | `#F6E5E3` | Hero field, quiet callout surfaces | `--color-text-primary` #1E2430 on it | 12.76:1 | Pass | `[VERIFIED]` |
| `--color-base-chalk` | `#FBF9F5` | Page background | `--color-text-primary` on it | 14.79:1 | Pass | `[VERIFIED]` |
| `--color-base-paper` | `#FFFFFF` | Product media and cards | `--color-text-primary` on it | 15.55:1 | Pass | `[VERIFIED]` |
| `--color-base-ink` | `#1E2430` | Primary text | on chalk | 14.79:1 | Pass | `[VERIFIED]` |
| `--color-base-ink-muted` | `#5A6070` | Secondary text | on chalk | 5.98:1 | Pass | `[VERIFIED]` |
| `--color-text-secondary` | `#5A6070` | Metadata, helper text | on paper | 6.28:1 | Pass | `[VERIFIED]` |
| `--color-text-accent` | `#7A2230` | Links and accent text | on chalk | 9.51:1 | Pass | `[VERIFIED]` |
| `--color-text-error` | `#A33131` | Field errors and error state | on chalk | 6.57:1 | Pass | `[VERIFIED]` |
| `--color-text-success` | `#2E6B4F` | Confirmation state | on chalk | 5.99:1 | Pass | `[VERIFIED]` |
| `--color-semantic-warning` | `#8A5A12` | Sample-content notice | on chalk | 5.62:1 | Pass | `[VERIFIED]` |
| `--color-base-border-strong` | `#8C7C74` | Input borders (non-text UI) | on paper | 4.00:1 | Pass (3:1 UI) | `[VERIFIED]` |
| `--color-base-brass` | `#B08A4F` | Decorative rules and focus companion | on chalk | 3.03:1 | Pass (3:1 UI) only; never body text | `[VERIFIED]` |
| `--color-base-border` | `#E2D8D2` | Decorative hairline dividers only | on chalk | 1.33:1 | Decorative only; not an input boundary | `[VERIFIED]` |

Rules:

- Text meets WCAG 2.2 AA: 4.5:1 normal, 3:1 large text and UI boundaries.
- Ratios above were calculated from the hex values with the WCAG relative
  luminance formula; they are measured, not guessed.
- `--color-base-brass` is never used for body text. It is a 1px rule and
  companion accent; focus rings use oxblood at 3:1 or better.
- `--color-base-border` is decorative only. Interactive boundaries use
  `--color-base-border-strong`.
- State is never conveyed by colour alone; icons and text accompany it.

## Typography

| Role | Family | Size token | Weight | Line height | Measure | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Display | Fraunces Variable | `--font-size-display` (clamp 44–72px) | 500 | `--line-height-tight` 1.02 | 12ch headline | `[VERIFIED]` |
| Page heading | Fraunces Variable | `--font-size-4xl` 48px → mobile 36px | 500 | `--line-height-snug` 1.18 | 20ch | `[VERIFIED]` |
| Section heading | Fraunces Variable | `--font-size-2xl` 28px | 500 | `--line-height-snug` | 28ch | `[VERIFIED]` |
| Product name | Fraunces Variable | `--font-size-xl` 22px | 500 | `--line-height-snug` | 24ch | `[VERIFIED]` |
| Body | Archivo Variable | `--font-size-base` 16px | 400 | `--line-height-relaxed` 1.65 | 68ch / 42rem | `[VERIFIED]` |
| UI label / button | Archivo Variable | `--font-size-sm` 14px | 500 | `--line-height-normal` | 24ch | `[VERIFIED]` |
| Price | Archivo Variable | `--font-size-base`/`lg` | 500 | `--line-height-normal` | tabular numerals | `[VERIFIED]` |
| Caption / legal | Archivo Variable | `--font-size-xs` 12px | 400 | `--line-height-normal` | 60ch | `[VERIFIED]` |

Rules:

- Fonts: **Fraunces** (SIL Open Font License 1.1, via `@fontsource-variable/fraunces`)
  and **Archivo** (SIL Open Font License 1.1, via
  `@fontsource-variable/archivo`). Both are self-hosted through npm packages, so
  there is no third-party font request at runtime.
- Fallbacks: `Georgia, serif` for display; `Arial, sans-serif` for body.
- Body measure stays under 80 characters; long-form copy is capped at
  `--type-measure-body`.
- No all-caps labels, decorative eyebrows, or single-word colour accents in
  headlines. Fraunces' optical sizing and a tight display leading provide the
  character instead.
- Numerals in prices, quantities, and totals use `font-variant-numeric: tabular-nums`.

## Layout and spacing

| Token | Value | Use | Status |
| --- | --- | --- | --- |
| `--layout-max-width` | 1240px | Content shell | `[VERIFIED]` |
| `--layout-gutter` | 24px | Desktop/tablet page gutters | `[VERIFIED]` |
| `--layout-gutter-mobile` | 16px | Mobile page gutters | `[VERIFIED]` |
| `--space-3xs`…`--space-4xl` | 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px | All margins and padding | `[VERIFIED]` |
| Grid | 12 columns, 24px gap | Editorial splits and product rows | `[PROPOSED]` |
| Breakpoints | 390 / 768 / 1440 target; 640 / 1024 intermediate | Layout reflow | `[VERIFIED]` |

Responsive behaviour:

- **390px:** single column; 16px gutters; hero stacks image above copy or below
  a compact headline; stage rail scrolls horizontally with visible overflow
  affordance; product grid 1 column with 4:5 media; header uses a menu button.
- **768px:** 8-column grid; product grid 2 columns; hero split 1:1; filters wrap
  into two rows; header retains menu until 1024px.
- **1440px:** 12-column grid capped at 1240px; product grid 3 columns; hero 7/5
  split; filters in one row; generous 96–128px section rhythm.

Alignment: left-aligned editorial content, centred only for short notices and
empty states. Prices and quantities are right-aligned within their columns.

## Shape, border, and elevation

| Token | Value | Use | Status |
| --- | --- | --- | --- |
| `--radius-lg` | 20px | Product media, category tiles, hero image | `[VERIFIED]` |
| `--radius-md` | 12px | Inputs, notices, size buttons | `[VERIFIED]` |
| `--radius-sm` | 6px | Small badges | `[VERIFIED]` |
| `--radius-pill` | 999px | Primary/secondary buttons, filter chips | `[VERIFIED]` |
| `--border-hair` | 1px | Ledger rules and card outlines | `[VERIFIED]` |
| `--shadow-card` | `0 18px 40px -30px rgba(30,36,48,.35)` | Mobile menu and floating summary only | `[VERIFIED]` |

Product cards use a 1px border and a flat chalk/paper field, not a drop shadow.
Only the sticky cart summary and mobile menu use elevation.

## Motion

| Token | Value | Use | Status |
| --- | --- | --- | --- |
| `--motion-duration-fast` | 140ms | Hover, focus, colour changes | `[VERIFIED]` |
| `--motion-duration-base` | 220ms | Menu, accordion, size selection | `[VERIFIED]` |
| `--motion-duration-slow` | 420ms | Cart line removal (with reduced-motion fallback) | `[VERIFIED]` |
| `--motion-easing-standard` | `cubic-bezier(.2,.7,.3,1)` | State changes | `[VERIFIED]` |
| `--motion-easing-out` | `cubic-bezier(.16,1,.3,1)` | Overlays | `[VERIFIED]` |

Rules:

- No page-load entrance animations and no scroll-triggered reveals.
- Motion answers an action: menu opens, size is chosen, cart line is removed.
- `prefers-reduced-motion: reduce` sets all durations to 0.01ms and disables
  transform-based hover movement.

## Components

| Component | Variants | States | Tokens used | Accessibility notes | Status |
| --- | --- | --- | --- | --- | --- |
| Primary button | Oxblood pill, inverse text | default, hover (deep oxblood), focus-visible (2px oxblood ring + 2px offset), active, disabled, loading | oxblood, oxblood-deep, text-inverse, radius-pill, space | Native `<button>`; loading keeps width and announces via `aria-live` | `[VERIFIED]` |
| Secondary button | Outline on chalk | default, hover (blush fill), focus, active, disabled | ink, border-strong, blush | Visible boundary 3:1; 44px min height | `[VERIFIED]` |
| Text link | Oxblood underline | default, hover, focus-visible, visited | text-accent | Underline persists; no colour-only meaning | `[VERIFIED]` |
| Header | Masthead + nav + cart | default, scrolled, menu open | chalk, oxblood, border | `<header>` + `<nav aria-label="Primary">`; menu button has `aria-expanded`/`aria-controls` | `[VERIFIED]` |
| Mobile menu | Full-width panel | closed, open, focus trap, Escape | paper, border, shadow-menu | Focus moves in, Escape closes, focus returns to trigger; body scroll locked | `[VERIFIED]` |
| Stage rail | Junior / Senior / Sixth links | default, hover, focus, current | blush, oxblood, ink | Real links with `aria-current="page"` where filtered | `[VERIFIED]` |
| Category tile | Image + label + count | default, hover, focus | radius-lg, chalk, ink | Whole tile is one link; image alt describes the photograph | `[VERIFIED]` |
| Product card | Image, name, stage, sample price | default, hover, focus-within, unavailable | paper, border, radius-lg | One primary link; equal card heights; image has fixed ratio | `[VERIFIED]` |
| Filter chip | Category / stage | default, selected, focus, disabled | border, blush, oxblood | `aria-pressed`; 44px target | `[VERIFIED]` |
| Text input / search | Search field | default, focus, error, disabled | border-strong, paper, radius-md | Visible `<label>`; error `aria-describedby`; clear button labelled | `[VERIFIED]` |
| Select | Sort, size guide | default, focus, disabled | border-strong, paper | Native `<select>` with visible label | `[VERIFIED]` |
| Size selector | Radio group | default, selected, focus, disabled, error | border, oxblood, blush | `<fieldset>` + `<legend>`; real radios visually styled | `[VERIFIED]` |
| Quantity stepper | − / value / + | default, focus, disabled at min | border, paper, ink | Labelled buttons ("Decrease quantity"); value announced | `[VERIFIED]` |
| Notice | Demo, info, error, success | static | blush, warning, error, success | `role="status"` for dynamic messages; icon + text | `[VERIFIED]` |
| Cart line | Thumbnail, details, qty, remove | default, removing | paper, border | Remove button names the product; totals update live | `[VERIFIED]` |
| Empty state | Shop, cart, 404 | static | chalk, blush, oxblood | One clear action; no dead ends | `[VERIFIED]` |
| Footer | Oxblood solid | static | oxblood-deep, text-inverse | Landmark `<footer>`; credit links open source/licence in new tab | `[VERIFIED]` |

Required state coverage where relevant: default, hover, focus-visible, active,
disabled, loading, empty, error, success. Every control is at least 44×44 CSS
pixels where practical.

## Imagery direction

| Field | Value | Status |
| --- | --- | --- |
| Product photo treatment | 4:5 media, `object-fit: cover`, chalk/paper frame, 20px radius, 1px border; no colour overlays; no stretch | `[VERIFIED]` |
| Product crop guidance | Shirt: focus below collar; blazer: jacket body; knit: full folded garment; skirt: full skirt; trousers: left two-thirds; loafer: shoes | `[VERIFIED]` |
| Editorial treatment | Full-bleed within the content shell, 20px radius, no text overlay on faces; captions below, not on image | `[VERIFIED]` |
| Category treatment | Reuse the product photograph with a plain label beneath; category is navigation, not a separate product claim | `[VERIFIED]` |
| Icon/logo treatment | 1.5px stroke SVG icons; "F" monogram and wordmark as vector logo; no product illustration | `[VERIFIED]` |
| Demonstration label | Global notice bar + "Sample price" on product cards + footer credit + product detail note | `[VERIFIED]` |

## Generated token output

```powershell
npm run tokens:build -- --require
```

- Source: `docs/04-design-system.md` marker block.
- Output: `site/src/styles/tokens.css`.
- Status: generated 2026-11-11; do not hand-edit.
- Tailwind v4 consumes the variables through `@theme inline`; components must not
  introduce raw hex values, arbitrary spacing, or font stacks outside the token
  file (documented exceptions: SVG icon strokes and the logo).

## Decisions

| Decision | Alternatives considered | Rationale | Date | Status |
| --- | --- | --- | --- | --- |
| Oxblood/blush/chalk palette | Navy/white (Stevensons-like); forest/orange (Option B); cobalt mosaic (Option C) | Carries the supplied mockup's warm crimson identity while staying credible for school staff; navy was rejected as a direct copy of the direct reference | 2026-11-11 | `[APPROVED]` |
| Fraunces + Archivo | All-sans (Inter/Manrope); Bodoni + grotesque; system serif | Fraunces gives editorial character without the "default serif" look; Archivo keeps utility text sturdy and legible at small sizes | 2026-11-11 | `[APPROVED]` |
| 20px product media, flat cards | Identical shadowed cards; square corners; 8px radius | Rounding echoes the supplied mockup and softens stock photography; flat bordered cards avoid the generic SaaS kit | 2026-11-11 | `[APPROVED]` |
| Ledger structure | Generic hero + grid; checklist-first | Specific to uniform shopping and differentiates from the references | 2026-11-11 | `[APPROVED]` |

## Phase 4 checklist

- [x] Direction is specific to the brief and real assets.
- [x] Color, type, layout, shape, and motion tokens are complete.
- [x] Contrast pairs measured and pass AA, or exceptions documented.
- [x] Component states specified.
- [x] `npm run tokens:build -- --require` succeeds.
- [x] Approval recorded (autonomous D-013).
- [x] Status updated in `docs/PHASE_STATUS.md`.
