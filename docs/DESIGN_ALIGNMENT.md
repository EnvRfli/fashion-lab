# DESIGN ALIGNMENT — Galeri Seragam

**Status:** Implemented and visually inspected on 2026-11-11. **V2 minimal
adjustment applied and visually re-inspected on 2026-11-13.**
**Current visual baseline (v2):** the rendered application before the v2 change
(`artifacts/nafa-v2/before/`). The v2 package preserves that design; it does not
target a new aesthetic.
**Primary image:** `docs/references/primary/galeri-seragam-main.png`  
**Source of truth:** `docs/PROJECT_BRIEF.md` (v2 section),
`nafa-portfolio-adjustment-v2/specs/`, and the current rendered app. Older
demo/download/user-management requirements are superseded.

> **V2 delta.** The approved composition is unchanged: same palette, typography,
> navbar, hero, four category cards, portfolio/client grid, detail tabs, photo
> grid, lightbox, admin sidebar and form language. The v2 change removes public
> demo/download/user-management UI and reduces the admin form to two required
> inputs. It does **not** add a phone mockup collage, a commerce layout, or a new
> visual identity. Before/after evidence and observed differences are in
> `docs/NAFA_V2_EXECUTION_REPORT.md` and `docs/06-visual-qa.md`.

## What the reference actually shows

This image is a **multi-screen concept board**, not one webpage to reproduce as a giant collage:

| Visible area in reference | Intended implementation | Major cues |
|---|---|---|
| Top-left wide desktop screen | `/` desktop | White navbar, burgundy accents, pink hero, search, four categories, school cards |
| Top-center phone | `/` mobile | Compact navbar, short hero, search, compact categories, vertical school list |
| Top-right phone | `/sekolah/:slug` mobile | School identity, Galeri/Informasi tabs, two-column uniform image grid, download-all CTA |
| Bottom-left admin panel | `/admin` desktop | Burgundy sidebar, summary stats, recent schools table, add-school action |
| Bottom-middle form | `/admin/sekolah/baru` | Name, education level, image upload, validation, save/cancel |
| Bottom-right form | `/admin/foto/baru` | Image preview/upload area, save action |

## Non-negotiable design characteristics

- **Archetype:** Directory/gallery/admin CMS; **not e-commerce**.
- **Typography:** Practical, modern sans-serif (no oversized luxury editorial serif).
- **Color:** Dark burgundy/red + clean white + subtle soft-pink accents; contrast must remain accessible.
- **Layout:** Moderate information density, efficient search/filter UX, clearly separated sections.
- **Cards:** Rounded, shallow shadows, compact metadata badges, image thumbnails.
- **Desktop:** Navigation row and 4-column school card area (when sufficient width); admin sidebar.
- **Mobile:** Simple compact header, visible search, stacked school listing, 2-column photo gallery.
- **Photos:** Real images with provenance; UI icons may use SVG, garments may not.

## Required main components

`PublicHeader`, `SchoolSearch`, `EducationLevelCards`, `SchoolFilters`, `SchoolCard`, `SchoolDetailHeader`, `GalleryTabs`, `PhotoGrid`, `PhotoPreview`, `DownloadActions`, `AdminSidebar`, `AdminSummaryCards`, `SchoolsTable`, `SchoolForm`, `PhotoUploadForm`.

Component names are suggestions; matching behavior and structure matters more than literal names.

## Content and navigation

Top public navigation (v2): **Beranda**, **Portofolio**, **Kategori**,
**Tentang**, **Login Admin**. Public CTA: search or browse client portfolios,
**not** shop. The four education-level categories remain as optional browsing
groups. Photo preview remains; **no download action** is present.

## Explicitly forbidden visual/product drift

- Boutique editorial hero (“A uniform, considered”, “Shop by layer”, etc.)
- Fashion product cards with prices and shopping CTAs
- Cart, checkout, payment, sale labels or product size selection
- Mockup phones embedded as decorative blocks within the real homepage
- SVG/CSS-drawn uniforms used as photographic content
- Made-up verified school logo/photography or license claims

## Visual QA checklist

- [x] Actual homepage matches structural hierarchy of top-left desktop
  reference. Evidence: `final-home/.../desktop-1440.png`. Difference: real-photo
  collage replaces the cut-out uniform pair.
- [x] Actual mobile homepage matches top-centre phone concept as a responsive
  app, not a fake phone frame. Evidence: `final-home/.../mobile-390.png`.
- [x] School detail matches top-right phone concept. Evidence:
  `final-detail/.../mobile-390.png`. Difference: larger identity photo for
  legibility.
- [x] Admin dashboard matches bottom-left concept. Evidence:
  `final-admin/.../desktop-1440.png`.
- [x] School and photo forms match bottom-middle/right concepts. Evidence:
  `final-admin-school-form/...` and `final-admin-photo-form/...`.
- [x] Responsive layouts work at 390, 768 and 1440 widths; final runs report no
  horizontal page overflow.
- [x] Photos load from real verified files; SVG garments absent.
- [x] No checkout, cart, product pricing or shopping copy in active UI.
- [x] Actual rendered screenshots were inspected with supported visual
  capability (`opencode-go/deepseek-v4.1-flash`).

**V2 note:** The separate `/admin/foto/baru` screen and the demo/download/user
features referenced in the historical checklist are superseded. Multi-photo
upload now lives inside the portfolio form, and the old feature URLs redirect to
the portfolio list. The retained design language and responsive composition are
unchanged; see `docs/NAFA_V2_EXECUTION_REPORT.md`.

**Note:** Checked items reflect the final inspection recorded in
`docs/06-visual-qa.md`, not an assumption from DOM checks. Do not claim
pixel-level cloning; the reference is a multi-screen composite and the
implementation is a responsive application.
