# 04 — Design System

> **Status: REALIGNED — canonical Galeri Seragam system. This document is the
> single source of truth for visual values.**
> Generated CSS: `site/src/styles/tokens.css` (do not hand-edit).
> Supersedes the fashion-storefront direction recorded in earlier revisions.

## Status legend

- `[PROPOSED]` — agent suggestion; not verified or approved.
- `[VERIFIED]` — checked against a source or measurement.
- `[APPROVED]` — human approval, or a recorded autonomous decision.
- `[PENDING]` — awaiting information or a decision.
- `[BLOCKED]` — cannot proceed; reason and corrective action required.

## Art direction

| Field | Value | Status |
| --- | --- | --- |
| Direction name | Galeri Seragam — Friendly Directory | `[APPROVED]` |
| One-sentence principle | A warm, practical school-uniform reference library: burgundy confidence, soft blush hospitality, white working surfaces, and clear directory navigation. | `[APPROVED]` |
| Why it fits this subject | Parents and school staff arrive with a lookup task, not a shopping mood. The system prioritises search, level recognition, photo browsing, and admin efficiency while keeping the brand friendly. | `[VERIFIED]` |
| Why it is not generic | The hierarchy follows the supplied reference: pink two-column hero, four illustrated level cards, compact school cards with level badges and photo counts, a burgundy admin rail, and a photo-first detail page. Decoration stays subordinate to lookup. | `[VERIFIED]` |
| Relationship to references | Matches the primary composite's burgundy/white/soft-pink language and its directory + gallery + CMS structure. It does not copy the composite as a page, its mockup frames, or its embedded photographs. | `[VERIFIED]` |
| Relationship to real assets | The eight verified photographs are presented in consistent rounded media frames with descriptive alt text and demo credit. No cut-out garment, SVG, or CSS drawing substitutes for a photograph. | `[VERIFIED]` |
| Approval | Autonomous decision D-017, 2026-11-11. | `[APPROVED]` |

## Typography

**Plus Jakarta Sans Variable** for display and body (SIL Open Font License 1.1,
self-hosted through Fontsource). Fallback: `Segoe UI`, `system-ui`, `Arial`,
sans-serif. No serif display face. Headings use 700–800 weight with tight
tracking; body copy uses 400–500 with a comfortable measure.

| Role | Size | Weight | Line height | Use |
| --- | --- | --- | --- | --- |
| Display | `clamp(2.25rem, 4.4vw, 3.5rem)` | 800 | 1.08 | Homepage hero |
| H1 | 2.25rem / 36px | 800 | 1.15 | Page titles |
| H2 | 1.875rem / 30px | 700 | 1.2 | Section headings |
| H3 | 1.375rem / 22px | 700 | 1.3 | Card/dialog titles |
| Body | 1rem / 16px | 400 | 1.6 | Paragraphs |
| Small | 0.875rem / 14px | 500 | 1.5 | Metadata, helper text |
| Micro | 0.75rem / 12px | 600 | 1.4 | Badges, labels |

Body measure: 42rem. Hero description: 30rem. Admin table text: 0.875rem.

## Colour

| Token | Value | Role |
| --- | --- | --- |
| `burgundy` | `#8E1B2B` | Primary CTA, active nav, logo, admin rail |
| `burgundyDeep` | `#6E1320` | Hover/pressed CTA, dark accents |
| `burgundySoft` | `#F7E3E6` | Level badge, soft emphasis |
| `blush` | `#FBE9EC` | Hero gradient start, category tints |
| `blushSoft` | `#FFF6F7` | Hero gradient end, quiet sections |
| `page` | `#FCFAF9` | Page background outside white cards |
| `surface` | `#FFFFFF` | Cards, panels, forms |
| `surfaceMuted` | `#F7F2F3` | Table header, disabled fields |
| `ink` | `#2B2227` | Primary text |
| `inkMuted` | `#6B5A62` | Secondary text, helper copy |
| `border` | `#EADDE1` | Card and field borders |
| `borderStrong` | `#C9B4BA` | Input boundary, stronger dividers |

Level accents (badge background / text): TK `#F7EDE2` / `#6E4A26`;
SD `#FBE4E8` / `#8E1B2B`; SMP `#E8F0FB` / `#245A96`;
SMA `#FBF0D5` / `#74510F`. These are used only for level identification,
never as the sole carrier of meaning.

### Measured contrast (WCAG 2.2 relative luminance)

| Pair | Ratio | Requirement | Result |
| --- | --- | --- | --- |
| Primary text `#2B2227` on white | 15.43:1 | 4.5:1 normal text | Pass AAA |
| Secondary `#6B5A62` on white | 6.43:1 | 4.5:1 | Pass AA |
| Burgundy `#8E1B2B` on white | 8.97:1 | 4.5:1 | Pass AAA |
| White on burgundy | 8.97:1 | 4.5:1 | Pass AAA |
| Secondary on blush `#FBE9EC` | 5.51:1 | 4.5:1 | Pass AA |
| SD badge text on SD tint | 7.41:1 | 4.5:1 | Pass AAA |
| SMP badge text on SMP tint | 6.14:1 | 4.5:1 | Pass AA |
| SMA badge text on SMA tint | 6.33:1 | 4.5:1 | Pass AA |
| TK badge text on TK tint | 6.80:1 | 4.5:1 | Pass AA |
| Error `#B3261E` on white | 6.54:1 | 4.5:1 | Pass AA |
| White on deep burgundy | 11.82:1 | 4.5:1 | Pass AAA |
| Secondary `#5F4E56` on page `#FCFAF9` | 7.44:1 | 4.5:1 | Pass AAA |

Non-text UI boundaries (`borderStrong` `#C9B4BA` on white, 2.14:1) are
supplemented by labels, icons, and focus rings; inputs also use a filled
surface and 2px focus outline, so no control relies on the border alone.

## Shape, surface, and spacing

- Content shell: `1200px` maximum, `24px` desktop gutter, `16px` mobile gutter.
- Cards: `18px` radius, 1px `border`, soft shadow
  `0 18px 40px -30px rgba(76, 23, 35, 0.28)`.
- Fields: `12px` radius, 1px `borderStrong`, white surface.
- Badges: pill radius, 12px semibold label.
- Buttons: `12px` radius, minimum 44px height; primary burgundy, secondary
  white with border, ghost transparent.
- Photo media: `14px` radius; consistent 4:3 or 3:2 crop; `object-fit: cover`.
- Vertical rhythm: 8px base; section spacing 48–72px desktop, 32–48px mobile.
- Maximum information density: 4 school cards per row at ≥1024px, 2 at
  640–1023px, 1 below 640px. Photo grids: 4 columns desktop, 3 tablet,
  2 mobile.

## Components

| Component | Rules |
| --- | --- |
| `PublicHeader` | White, 1px bottom border. Logo left, nav centre/right, outlined Login Admin CTA. Active link burgundy with 2px underline. Mobile: 44px menu button opens a full-height dialog. |
| `Hero` | Soft pink gradient, two columns at ≥900px. Title, description, search field with burgundy submit. Right: real-photo collage in rounded frames. Mobile stacks title/search first, collage below. |
| `EducationLevelCards` | 4-up desktop, 2-up mobile. Soft tinted icon tile, level code, count, chevron. Entire card is a link; visible focus ring. |
| `SchoolCard` | Media 3:2, school name, level badge, photo count. Hover raises shadow slightly; focus ring. No price. |
| `SchoolFilters` | Search input, level select, sort select. Labels visible above fields on desktop; compact stacked layout on mobile. |
| `GalleryTabs` | Two tabs with `role=tablist`, roving focus, underlined active state. URL-independent local state. |
| `PhotoGrid` | Buttons (not links) open the preview dialog. Each tile has a caption and alt text. 2-col mobile, 3-col tablet, 4-col desktop. |
| `PhotoPreviewDialog` | Native `<dialog>`, max 960px, image left / metadata right on desktop, stacked mobile. Close, previous, next, download. Focus returns to the triggering tile. |
| `DownloadActions` | Primary burgundy "Download Semua (n Foto)" with download icon. Disabled state + explanation when no photos. Busy state while zipping. Error state if bytes fail. |
| `AdminSidebar` | Burgundy panel, white text, active item lighter burgundy with white left indicator. Mobile: slide-in dialog triggered by a top bar. |
| `StatCard` | White card, tinted icon tile, large number, label. Four-up desktop, two-up mobile. |
| `DataTable` | Header on `surfaceMuted`, 1px row dividers, actions at row end. Horizontal scroll wrapper on narrow screens; non-essential columns hidden below 768px. |
| `Forms` | Visible labels, required marker, inline error text, 44px controls, save/cancel pair. Invalid fields get `aria-invalid` and error description. |
| `ImageDropzone` | Dashed border, upload icon, accepted types and size, preview thumbnail with remove button, inline error. |

## Motion

- Durations: 140ms fast, 220ms base, 420ms slow.
- Standard easing: `cubic-bezier(0.2, 0.7, 0.3, 1)`.
- All transitions are limited to colour, shadow, and transform.
- `prefers-reduced-motion: reduce` removes smooth scrolling and reduces
  transitions to near-zero duration. No essential information is carried by
  motion.

## Accessibility rules

- Semantic landmarks, one H1 per page, logical heading order.
- Skip link to main content.
- Visible 2px burgundy focus ring with 2px offset on every interactive element.
- Minimum 44×44px targets.
- All images have meaningful alt text; decorative marks use `aria-hidden`.
- Native dialog focus trapping and Escape close.
- Form errors announced with `role="alert"` and linked by `aria-describedby`.
- Status changes (download busy/success/error) use `role="status"` or
  `role="alert"`.
- Colour is never the only indicator: level badges include the level code,
  active nav includes an underline, errors include text.
- Text zoom to 200% must not clip; layouts use reflowing grids.

## Canonical design tokens

> The block between the markers is the machine source of truth.
> `npm run tokens:build` generates CSS custom properties from it.
> Do not hand-edit the generated CSS.

<!-- BEGIN DESIGN TOKENS JSON -->
{
  "version": 2,
  "meta": {
    "name": "Galeri Seragam — Friendly Directory",
    "status": "approved"
  },
  "color": {
    "base": {
      "burgundy": "#8E1B2B",
      "burgundyDeep": "#6E1320",
      "burgundySoft": "#F7E3E6",
      "blush": "#FBE9EC",
      "blushSoft": "#FFF6F7",
      "page": "#FCFAF9",
      "surface": "#FFFFFF",
      "surfaceMuted": "#F7F2F3",
      "ink": "#2B2227",
      "inkMuted": "#6B5A62",
      "border": "#EADDE1",
      "borderStrong": "#C9B4BA"
    },
    "text": {
      "primary": "#2B2227",
      "secondary": "#5F4E56",
      "muted": "#6B5A62",
      "inverse": "#FFFFFF",
      "accent": "#8E1B2B",
      "error": "#B3261E",
      "success": "#1F6B45"
    },
    "semantic": {
      "success": "#1F6B45",
      "error": "#B3261E",
      "warning": "#74510F",
      "info": "#245A96",
      "focus": "#8E1B2B"
    },
    "level": {
      "tk": "#F7EDE2",
      "tkText": "#6E4A26",
      "sd": "#FBE4E8",
      "sdText": "#8E1B2B",
      "smp": "#E8F0FB",
      "smpText": "#245A96",
      "sma": "#FBF0D5",
      "smaText": "#74510F"
    }
  },
  "typography": {
    "family": {
      "display": "Plus Jakarta Sans Variable, Segoe UI, system-ui, Arial, sans-serif",
      "body": "Plus Jakarta Sans Variable, Segoe UI, system-ui, Arial, sans-serif"
    },
    "size": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "display": "clamp(2.25rem, 4.4vw, 3.5rem)"
    },
    "weight": {
      "regular": "400",
      "medium": "500",
      "semibold": "600",
      "bold": "700",
      "extrabold": "800"
    },
    "lineHeight": {
      "tight": "1.08",
      "snug": "1.25",
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
    "sm": "8px",
    "md": "12px",
    "lg": "18px",
    "pill": "999px"
  },
  "border": {
    "hair": "1px",
    "strong": "2px"
  },
  "shadow": {
    "card": "0 18px 40px -30px rgba(76, 23, 35, 0.28)",
    "menu": "0 24px 60px -32px rgba(76, 23, 35, 0.35)"
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
    "maxWidth": "1200px",
    "gutter": "1.5rem",
    "gutterMobile": "1rem",
    "gridColumns": "12",
    "headerHeight": "72px",
    "sidebarWidth": "260px"
  }
}
<!-- END DESIGN TOKENS JSON -->
