# PROJECT BRIEF — Galeri Seragam

**Status:** Baseline realignment brief (2026-09) — **superseded in part by the
Nafa Collection v2 adjustment (2026-11-13)**. The v2 package is authoritative
where the two conflict.
**Current product archetype (v2):** Client portfolio — client name + garment
project photos — with one administrator and a local demo data layer.
**Current visual baseline:** the rendered Galeri Seragam application, not a new
redesign.
**Primary visual reference:** `docs/references/primary/galeri-seragam-main.png`  
**Execution mode:** Autonomous development with verifiable quality gates  
**Language for user-facing UI:** Bahasa Indonesia  
**Supersedes:** Any previous fashion e-commerce / premium fashion / shopping-store brief

> **V2 adjustment — 2026-11-13.** The Nafa v2 package
> (`nafa-portfolio-adjustment-v2/`) supersedes the earlier instructions in this
> file to require downloads, demo labels, a separate photo master screen,
> category master screen, user management, or a large school-only form. The
> current implementation preserves all seeded client/photo data, removes
> download and public-user features, and reduces admin to `Nama klien` +
> multiple photos. See `docs/NAFA_V2_EXECUTION_REPORT.md`,
> `docs/NAFA_V2_BASELINE.md`, and `docs/NAFA_V2_CHANGE_PLAN.md`.

## V2 current requirements (read this first)

- Public navigation labels use **Portofolio/Klien**, while the existing
  `/sekolah` URLs are preserved for bookmarks.
- Visitors browse a client list and open a client gallery. Photo preview and
  lightbox remain; there are **no download controls**.
- The four education-level category cards and filters remain as useful browsing
  controls. Category is optional for an administrator.
- One administrator entry point remains. There is **no public signup, visitor
  login, profile, user management, or role management**.
- Admin create/edit requires only **Nama klien** and at least one photo in a
  multi-file picker. Category, location and description are optional under
  "Informasi tambahan".
- All existing 12 seeded clients and 62 photos remain. IDs, slugs, cover paths
  and image bytes are preserved. See the execution report for the comparison.
- Demo/prototype words are removed from rendered public/admin copy. Internal
  identifiers and fixtures may keep technical names.
- No real backend/auth/storage is present. Local browser persistence is honest
  and tested; production write readiness remains blocked.

The sections below are retained as the historical baseline brief. Where they
mention downloads, demo labels, user management, mandatory school forms, or a
different data model, the v2 section above and the execution report win.

---

## Historical baseline brief (retained for context)

## 1. Product definition

Build **Galeri Seragam**, a responsive web application that lets visitors find schools by educational level and name, view school-uniform photo galleries, inspect school information, and download available reference photos. A separate admin-facing interface manages demo school, category, and photo records.

**This is not an e-commerce platform.** Do not create shopping carts, product pricing, checkout, promotions, clothing purchase flows, catalog shopping, or fashion editorial landing pages.

The attached visual reference is a **composition of multiple application screens** (desktop public page, mobile public page, mobile school detail, admin dashboard, and admin forms). Recreate these as **separate responsive application routes and screens**. **Do not place a collage of phone mockups and admin UI inside the homepage.**

## 2. Audiences and primary journeys

- **Public visitors:** Parents, students, teachers, and school communities looking for uniform references.
- **Demo admin:** Staff who enter and organize school and gallery data. Do not claim this demo provides production-level authentication or permission control.

Core journeys:

1. Open homepage → search for a school or choose TK/SD/SMP/SMA → view matching schools.
2. Open a school → see school information and photo gallery → view and download an available photo.
3. Choose **Download Semua** → download an archive of actually available photo files; if assets are missing, show a truthful disabled state.
4. Open demo admin → review statistics and school list → create/edit/delete demo school and photo records → verify changes appear in public views where persistence is supported.

## 3. Required public routes

| Route | Page | Required behavior |
|---|---|---|
| `/` | Beranda | Brand navigation; hero "Koleksi Seragam Sekolah"; short description; school search; four level cards; school listing; filter and sort; footer. |
| `/sekolah` | Daftar Sekolah | Search; TK/SD/SMP/SMA filters; sorting; responsive school cards; result/empty states. |
| `/sekolah/:slug` | Detail Sekolah | School image/name/level; photo count; **Galeri** and **Informasi** tabs; photo grid; preview; individual and bulk download actions. |
| `/kategori` | Kategori | Four education levels and their school counts; navigation to filtered school list. |
| `/tentang` | Tentang | Explain the gallery as a reference/demo and how to browse/download images. |

User-facing labels should be Indonesian; examples: **Beranda**, **Sekolah**, **Kategori**, **Tentang**, **Login Admin**, **Cari nama sekolah...**, **Pilih Kategori Sekolah**, **Daftar Sekolah**, **Filter Kategori**, **Urutkan**, **Galeri**, **Informasi**, **Download Semua**.

## 4. Required admin routes (demo)

| Route | Screen | Required behavior |
|---|---|---|
| `/admin` | Dashboard | Sidebar/top responsive admin navigation; cards for total schools, total photos, categories, demo admins; recent schools table. |
| `/admin/sekolah` | Data Sekolah | Search/list schools, add/edit/delete demos, confirmation when deleting. |
| `/admin/sekolah/baru` | Tambah Sekolah | School name, education level, school image/photo metadata, validation, save/cancel. |
| `/admin/sekolah/:id/edit` | Edit Sekolah | Edit existing demo school fields and save changes. |
| `/admin/kategori` | Kategori | Display/manage demo categories as appropriate, preserving canonical TK/SD/SMP/SMA levels. |
| `/admin/foto` | Data Foto | Manage demo gallery photos associated with schools. |
| `/admin/foto/baru` | Tambah Foto | Choose school, select image file, preview/remove, validate, save. |
| `/admin/pengguna` | Pengguna | Show clearly labeled demo-only user-management UI or an honest nonfunctional placeholder; do not imply secure real accounts exist. |

Include a visual **Login Admin** entry point. If there is no backend authentication, make demo access explicitly marked as a demo; **do not create a fake secure authentication system** or present client-only guards as protection of real data.

## 5. Data and behavior

Model at least: `EducationLevel` (TK, SD, SMP, SMA), `School` (id, slug, name, level, photo collection, optional description / location), `GalleryPhoto` (id, schoolId, local asset URL, alt text, credited source), and demo admin UI state.

- Start with a small **clearly labeled demo dataset**. Example names shown in the reference are illustrative, not verified real school entities.
- Search, filters, sort, tabs, image preview, forms, add/edit/delete, and local download interactions must work.
- If no backend exists, use reliable client-side persistence (e.g., localStorage/IndexedDB where sensible), describe its limitations, and never claim real multi-user storage.
- Display accurate photo counts derived from actual demo records.
- Bulk download must use **real locally available photo bytes** and make a valid archive, or be disabled with an explanation; do not simulate a successful download.
- Create loading, empty, invalid-form, and missing-image states.

## 6. Visual target

**Primary reference:** `docs/references/primary/galeri-seragam-main.png` (single composite reference image showing multiple independent screens).

The visual direction is a **friendly, polished, functional modern web application**, not an editorial fashion store. Match the reference's overall product language:

- Burgundy/dark red brand color on CTA, active navigation, badges, and admin sidebar.
- White surfaces with soft blush/pink hero backgrounds and subtle borders/shadows.
- Modern **sans-serif** typography, medium visual density, concise readable headings.
- Rounded but restrained cards and image corners; clean 4-category desktop row and compact mobile arrangement.
- Public desktop layout: top navbar → two-column pink hero with title/search and uniform imagery → category selection → filters/sort and school cards.
- Public mobile layout: compact navbar with menu → stacked hero and prominent search → compact level cards → vertical school results.
- School detail mobile layout: back header, school identity, Galeri/Informasi tabs, two-column image grid, accessible bulk-download action.
- Admin desktop: burgundy sidebar and neutral workspace with summary cards, table and actions.
- Admin forms: clean accessible fields, upload dropzone, preview, save/cancel buttons.

**Do not reproduce the composite screenshot itself as the website.** Implement each sub-screen in its proper route and adaptive layout.

## 7. Image and asset policy

- The reference screenshot is **visual guidance**, not a source of reusable product photographs or verification of school identities.
- Prefer user-provided images. For demo content, use actual locally stored, appropriately licensed school-uniform photos or suitable generic educational clothing photos where permitted. Document the source page and license for every external asset.
- **No SVG/CSS/Canvas-drawn shirts, uniforms, shoes, or other product imagery.** SVG icons and logos remain allowed.
- Do not generate clothing images with AI unless explicitly requested.
- Do not invent image URLs, school insignias, school uniforms, photography licenses, or inventory data.
- If authentic source images are unavailable, record an asset blocker and use a clearly labeled non-photographic missing-image state instead of fabricating a product photo.
- Maintain the existing asset integrity validator and its manifest requirements.

## 8. Technical expectations

- Preserve the verified OpenCode bootstrap/harness, `.agents/skills/`, validation scripts, and browser setup.
- Audit the existing fashion e-commerce application and **reuse technical foundations and generic UI primitives where efficient**. Remove commerce-specific behavior and replace inappropriate visuals.
- React + TypeScript + Vite + Tailwind is an acceptable default when consistent with existing code. Do not reinstall the stack without need.
- Responsive target viewports: 390px, 768px, 1440px; ensure practical intermediate widths.
- Semantic navigation, keyboard focus, accessible forms, appropriate alt text, dialog usability, adequate contrast, and reduced-motion compatibility.
- No production deployment, payment, real secure authentication, or backend service integration in this scope.

## 9. Required validation

1. Read this brief and primary reference before coding.
2. Produce `docs/DESIGN_ALIGNMENT.md` mapping each sub-screen of the composite reference to routes/components.
3. Audit the existing code and decide **salvage / partial frontend rebuild / application-layer restart**. Keep bootstrap intact.
4. Run build/type/lint/tests and asset validator.
5. Inspect screenshots with the actual vision-capable tool path if available at 390/768/1440. DOM checks alone do not verify visual similarity.
6. Compare navigation, page composition, colors, card density, hero, gallery and admin layout against the reference; record mismatches and fixes in `docs/06-visual-qa.md`.
7. Verify **no cart, price, checkout, buy-now or boutique-fashion hero** remains.
8. Report which images are actual licensed demos and which targets could not be reproduced.

## 10. Completion criteria

The result must be immediately recognizable as **Galeri Seragam — School Directory + Uniform Gallery + Admin CMS**, consistent with the provided composite reference. Required routes and interactions should work as a **clearly labeled demo**. No shopping features. No SVG clothing. No unsupported claims of authentication, backends, photo rights or completed visual review.
