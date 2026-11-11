# DESIGN ALIGNMENT — Galeri Seragam

**Status:** Corrected target specification from user-provided reference; implementation validation pending.  
**Primary image:** `docs/references/primary/galeri-seragam-main.png`  
**Source of truth:** `docs/PROJECT_BRIEF.md` and this primary reference override old e-commerce design direction.

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

Top public navigation: **Beranda**, **Sekolah**, **Kategori**, **Tentang**, **Login Admin**. Public CTA: search or browse schools, **not** shop. School categories: **TK, SD, SMP, SMA**. Download actions apply to photos, not transactions.

## Explicitly forbidden visual/product drift

- Boutique editorial hero (“A uniform, considered”, “Shop by layer”, etc.)
- Fashion product cards with prices and shopping CTAs
- Cart, checkout, payment, sale labels or product size selection
- Mockup phones embedded as decorative blocks within the real homepage
- SVG/CSS-drawn uniforms used as photographic content
- Made-up verified school logo/photography or license claims

## Visual QA checklist

- [ ] Actual homepage matches structural hierarchy of top-left desktop reference.
- [ ] Actual mobile homepage matches top-center phone concept (as responsive app, not fake phone frame).
- [ ] School detail matches top-right phone concept.
- [ ] Admin dashboard matches bottom-left concept.
- [ ] School and photo forms match bottom-middle/right concepts.
- [ ] Responsive layouts work at 390, 768 and 1440 widths.
- [ ] Photos load from real verified files; SVG garments absent.
- [ ] No checkout, cart, product pricing or shopping copy.
- [ ] Actual rendered screenshots were inspected with supported visual capability.

**Note:** Checkbox items are targets, **not claims that they already passed**. Avoid inventing precise pixel measurements from the screenshot. Optimize structural and stylistic fidelity without cloning unsupported third-party assets.
