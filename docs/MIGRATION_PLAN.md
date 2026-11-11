# Migration Plan — Fashion Storefront to Galeri Seragam

**Date:** 2026-11-11
**Gate:** Internal mandatory gate. This plan is approved autonomously and is a
precondition for Phase 6 implementation.
**Baseline checkpoint:** `ef09a4f`.

## 1. Route migration

| Old route / component | New route / component | Action |
| --- | --- | --- |
| `/` · `HomePage.tsx` | `/` · `pages/PublicHomePage.tsx` | Rewrite: pink hero, school search, four education cards, school listing, filter/sort, demo notice. |
| `/shop` · `ShopPage.tsx` | `/sekolah` · `pages/SchoolListPage.tsx` | Replace catalogue with directory. URL params `q`, `kategori`, `urut`. |
| `/shop/:slug` · `ProductPage.tsx` | `/sekolah/:slug` · `pages/SchoolDetailPage.tsx` | Replace product detail with identity header, Galeri/Informasi tabs, photo grid, preview, downloads. |
| `/cart` · `CartPage.tsx` | — | Delete. No replacement. |
| — | `/kategori` · `pages/CategoriesPage.tsx` | New level overview with live counts. |
| — | `/tentang` · `pages/AboutPage.tsx` | New demo/licensing explanation. |
| — | `/admin` · `pages/admin/AdminDashboardPage.tsx` | New dashboard. |
| — | `/admin/sekolah` · `pages/admin/AdminSchoolsPage.tsx` | New school table with search and delete confirmation. |
| — | `/admin/sekolah/baru` · `pages/admin/AdminSchoolFormPage.tsx` | New create form. |
| — | `/admin/sekolah/:id/edit` · `pages/admin/AdminSchoolFormPage.tsx` | Same component, edit mode. |
| — | `/admin/kategori` · `pages/admin/AdminCategoriesPage.tsx` | New canonical-category management. |
| — | `/admin/foto` · `pages/admin/AdminPhotosPage.tsx` | New photo table. |
| — | `/admin/foto/baru` · `pages/admin/AdminPhotoFormPage.tsx` | New upload/preview form. |
| — | `/admin/pengguna` · `pages/admin/AdminUsersPage.tsx` | New honest demo-user UI. |
| — | `/admin/masuk` · `pages/admin/AdminLoginPage.tsx` | New visual demo login. No real auth. |
| `*` · `NotFoundPage.tsx` | `*` · `pages/NotFoundPage.tsx` | Rewrite copy; keep route. |

## 2. Component migration

| Old component | New component | Notes |
| --- | --- | --- |
| `Layout.tsx` | `components/PublicLayout.tsx` | Keep skip link + scroll manager; new public header/footer. |
| `Header.tsx` | `components/PublicHeader.tsx` | Brand nav, active underline, Login Admin CTA, mobile dialog. |
| `Footer.tsx` | `components/PublicFooter.tsx` | Directory links, demo/licence notice. |
| `DemoNotice.tsx` | `components/DemoBanner.tsx` | Global demo strip; reusable in admin. |
| `Logo.tsx` | `components/BrandMark.tsx` | Shirt icon + wordmark (SVG logo permitted). |
| `ProductCard.tsx` | `components/SchoolCard.tsx` | Image, name, level badge, photo count, link. |
| `StageRail.tsx` | `components/EducationLevelCards.tsx` | TK/SD/SMP/SMA cards with icon and count. |
| `QuantityStepper.tsx` | `components/PhotoGrid.tsx` | New uniform-photo grid. |
| `—` | `components/PhotoPreviewDialog.tsx` | Accessible preview/download dialog. |
| `—` | `components/SearchField.tsx` | Reusable labelled search. |
| `—` | `components/EmptyState.tsx` | Empty/reset state. |
| `—` | `components/admin/AdminLayout.tsx` | Burgundy sidebar, mobile drawer, demo banner. |
| `—` | `components/admin/AdminPageHeader.tsx` | Title, description, actions. |
| `—` | `components/admin/StatCard.tsx` | Dashboard metrics. |
| `—` | `components/admin/ConfirmDialog.tsx` | Delete confirmation. |
| `—` | `components/admin/ImageDropzone.tsx` | File select, preview, remove, validation. |
| `components/Icons.tsx` | `components/Icons.tsx` | Extend: graduation, book, trophy, teddy, filter, sort, download, edit, trash, user, share, arrow-left, image. |

## 3. Data migration

| Old module | New module | Notes |
| --- | --- | --- |
| `data/products.ts` | `data/schools.ts` | `EDUCATION_LEVELS`, `School`, `GalleryPhoto`, demo seed, asset credit map. |
| `catalog/filter-products.ts` | `lib/schools.ts` | `filterSchools`, `sortSchools`, `countPhotos`, `buildSlug`, `formatCount`. |
| `cart/cart-storage.ts` | `lib/demo-store.ts` | Versioned localStorage repository for schools, photos, categories, users. |
| `cart/CartProvider.tsx` | `data/DemoDataProvider.tsx` | React context with CRUD, reset, hydration status. |
| — | `lib/downloads.ts` | Real single-file download and real ZIP via `fflate`. |
| — | `lib/image-file.ts` | File validation, preview, bounded compression to data URL. |
| `lib/use-page-title.ts` | `lib/use-page-title.ts` | Retitle to Galeri Seragam. |

## 4. Asset migration

- Keep the eight manifest assets and their files unchanged.
- Stop shipping no-longer-used fashion imagery only if it remains unused; keep
  files because they back the manifest and are used by demo galleries.
- Do not copy `artifacts/visual-qa/references/candidate-*.jpg` into `site/`.
- Add no new external asset unless provenance is verified and recorded.
- Map gallery photos to existing asset IDs with per-photo credit fields.
- Reference photo paths remain `/images/<file>.jpg`; validator resolves them
  against `site/public`.

## 5. Design token migration

| Token area | Old | New |
| --- | --- | --- |
| Brand | oxblood `#7A2230` | burgundy `#8E1B2B` / deep `#6E1320` |
| Surfaces | chalk cream `#FBF9F5` | white `#FFFFFF`; page `#FCFAF9` |
| Accent | blush `#F6E5E3`, brass | soft pink `#FBE9EC`, rose `#F6DDE1` |
| Display type | Fraunces serif | Plus Jakarta Sans / Archivo sans |
| Body type | Archivo | Plus Jakarta Sans / system sans |
| Shape | 20px media, 12px fields | 18px cards, 12px fields, pill badges |
| Shadow | deep editorial | soft, low-contrast card shadow |
| Layout | 1240px | 1200px content shell, burgundy admin sidebar |

The canonical block in `docs/04-design-system.md` is replaced and
`npm run tokens:build` regenerates `site/src/styles/tokens.css`. No old token
names may remain in active components (`oxblood`, `brass`, `chalk`, `paper`,
`blush` are retired).

## 6. Documentation migration

| Document | Action |
| --- | --- |
| `docs/01-product-brief.md` | Add supersession banner at top; point to `docs/PROJECT_BRIEF.md`; mark old commerce discovery as historical. |
| `docs/02-visual-references.md` | Keep historical research; add a note that the primary reference for this build is the supplied composite. |
| `docs/03-asset-manifest.md` | Keep machines records; add usage note for Galeri Seragam. |
| `docs/04-design-system.md` | Replace art direction and token block. |
| `docs/05-page-specifications.md` | Replace with Galeri Seragam routes, states, responsive behaviour, test matrix. |
| `docs/06-visual-qa.md` | Replace with real QA evidence after capture and inspection. |
| `docs/DECISIONS.md` | Add D-015 onward: realignment, rebuild approach, tokens, demo data, admin honesty, ZIP, asset reuse. |
| `docs/PHASE_STATUS.md` | Rewrite current phase status and checkpoint trail. |
| `docs/BOOTSTRAP_HANDOFF.md` | Add a realignment note; preserve bootstrap evidence. |

## 7. Implementation order

1. Tokens and global CSS.
2. Domain types, seed data, store, selectors, tests.
3. Public shell and components.
4. Public routes.
5. Admin shell and routes.
6. Downloads, uploads, persistence.
7. Tests, build, lint, typecheck, asset validation.
8. Browser QA at 390/768/1440, visual inspection, fixes, final report.

## 8. Acceptance criteria for migration

- No cart, checkout, price, buy-now, product-size, or boutique hero remains in
  active source or rendered pages.
- Every required public and admin route exists and is reachable.
- Search, filter, sort, tabs, preview, individual download, bulk download,
  create/edit/delete, upload preview, and demo-user management function.
- Local persistence survives reload and can be reset.
- All product imagery is a real raster photo from the manifest or a user-uploaded
  raster file; no SVG/CSS/Canvas garment exists.
- Build, lint, typecheck, tests, asset validation, and browser QA pass; visual
  QA records actual image inspection.
