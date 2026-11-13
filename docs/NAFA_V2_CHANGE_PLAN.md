# NAFA V2 — Minimal Change Plan

**Status:** `[APPROVED]` autonomous plan, 2026-11-13.
**Baseline:** `docs/NAFA_V2_BASELINE.md`, branch `nafa-v2-baseline`.
**Priority:** the v2 package supersedes the earlier v1 instruction to remove
seeded records or redesign the site. No v1 instruction is executed here.

## 1. Non-negotiable preservation list

These stay visually and structurally unchanged unless a line below explicitly
says otherwise.

| Area | Preserved |
| --- | --- |
| Design tokens | `site/src/styles/tokens.css`, palette, type scale, radii, shadows, motion, breakpoints |
| Public shell | `PublicHeader`, brand mark placement, desktop nav, mobile menu, `PublicFooter` |
| Homepage | Hero two-column composition, photo collage, inline search, four category cards, filter/sort row, client card grid, explainer band |
| Listing | Page hero, search, filters, sort, client cards, result/empty states |
| Detail | Identity row, Galeri/Informasi tabs, photo grid, category labels, lightbox, related clients |
| Categories | Four education-level cards, counts, links |
| Admin shell | Burgundy sidebar, topbar, mobile menu, panel/card language, table styling, form controls |
| Data | All 12 seeded clients, 62 photos, IDs, slugs, cover paths, timestamps, client names, photo-to-client relations |
| Images | All 8 local JPEGs and their bytes; no replacement, no generated substitute |
| Routes | `/`, `/sekolah`, `/sekolah/:slug`, `/kategori`, `/tentang`, `/admin`, `/admin/sekolah`, `/admin/sekolah/baru`, `/admin/sekolah/:id/edit`, `/admin/masuk` |
| Infrastructure | Vite/React/TS/Tailwind, bootstrap scripts, skills, asset validator, token generator, visual QA runner, Vercel SPA rewrite |

## 2. Changes and why they are safe

### 2.1 Public copy and labels

| Change | Reason | Preservation |
| --- | --- | --- |
| Remove "Data demo", "Mode demo", "Situs demonstrasi", "demonstrasi", "contoh" from rendered UI and seed descriptions | C01 | Same layout slots; text length stays close. No record, slug, name, photo or timestamp removed. |
| Rename public "Sekolah" DNA to "Klien"/"Portofolio" where it is a label | Brief: visitors browse client + photos | URLs stay `/sekolah`; cards, grid, filters and detail layout unchanged. |
| Keep four education-level category cards and filters | Existing useful grouping; spec allows filters | No new category master; admin category becomes optional. |
| Replace download/unduh copy with preview/browse copy | C03 | Same heading/toolbar structure; download controls removed. |
| Remove public user references; keep only "Login Admin" | C02 | Header/footer layout retained. |

### 2.2 Public features

| Change | Files | Data impact |
| --- | --- | --- |
| Remove bulk download button and state from detail page | `SchoolDetailPage.tsx` | None |
| Remove per-photo download button/state from lightbox | `PhotoPreviewDialog.tsx` | None |
| Remove download lib and tests | `lib/downloads.ts`, `lib/downloads.test.ts` | None; image files stay |
| Remove download icon/badge and related home/about copy | `HomePage.tsx`, `AboutPage.tsx`, `Icons.tsx` | None |
| Keep lightbox, prev/next, Escape, credits, license links | `PhotoPreviewDialog.tsx` | None |
| Keep search, filters, sort, tabs, sharing | Existing components | None |

### 2.3 Admin simplification

Target flow: **Login → Tambah Portofolio → Nama klien → pilih banyak foto →
Simpan & Publikasikan**.

| Area | Current | Target |
| --- | --- | --- |
| Nav | Dashboard, Data Sekolah, Kategori, Data Foto, Pengguna | Dashboard, Portofolio |
| Dashboard | Counts incl. demo users; reset-data action | Counts of clients/photos; recent portfolios; quick action to add |
| Create | Name + level required, location, description, single cover upload | `Nama klien` required + multi-photo upload required; optional category/description/location inside `<details>` |
| Photos | Separate `/admin/foto/baru` one-photo form with title/alt/credit | Multi-file picker in the portfolio form; previews, remove, progress; auto title/alt/credit for client uploads |
| Edit | Multi-field form; photos managed elsewhere | Name, add photos, remove photo with confirmation, optional fields; existing photos preserved |
| Cover | Manual cover upload | First selected photo by default; auto-fill if none; existing cover preserved |
| Slug | Recalculated on every edit | Kept stable on edit; unique on create |
| Delete | Client delete with confirmation | Same, explicit confirmation; no bulk delete |
| User management | `/admin/pengguna` | Removed from UI; old URL redirects; `users` data stays in store |
| Category master | `/admin/kategori` | Removed from UI; old URL redirects; descriptions remain in data |
| Photo master | `/admin/foto` | Removed from UI; old URL redirects; `photos` data stays |
| Reset data | Dashboard button | Removed; no destructive reseed |
| Login | Any email/password; "demo" copy | Single admin entry, real form, honest local-only readiness note |

### 2.4 Data model and persistence

Additive and compatibility-safe:

1. Keep `School`, `GalleryPhoto`, `DemoUser`, `DemoData` field names and the
   `galeri-seragam.demo.v2` storage key so existing browser data is readable.
2. Make `School.level` optional and `SchoolInput.level` optional. Existing
   records keep their level; new clients may omit category.
3. Keep `School.coverImage`; add automatic cover fallback to first photo.
4. Never truncate `schools`, `photos`, `users`, or `categoryDescriptions`.
5. Store uploads as compressed data URLs exactly as today (localStorage
   limitation remains; not claimed as durable production storage).
6. On edit, preserve the existing slug and all existing photo IDs/paths unless
   the administrator explicitly removes a photo.
7. Add one migration that rewrites only the known seeded demo descriptions to
   professional copy; it matches exact old strings, so user edits are untouched.
8. Use a single transactional store write per save (name + photos + optional
   fields) and only show success when `localStorage` accepted the write.

### 2.5 Routes and redirects

- Keep all public and core admin URLs.
- `/admin/kategori`, `/admin/foto`, `/admin/foto/baru`, `/admin/pengguna` become
  `<Navigate to="/admin/sekolah" replace />` so old links do not 404.
- No new public routes; no rename of `/sekolah`.

### 2.6 Authentication and production readiness

- Keep one admin login entry point and the existing local session behavior for
  continuity.
- Remove demo labels and state plainly that this build stores data in the
  browser and has no server-verified credentials.
- Do **not** invent credentials, provider configuration, or a fake secure login.
- Record S01/S02 and ADMIN WRITE READY as blocked until a real auth/storage
  backend is configured. This is a truthful limitation, not a UI failure.

## 3. File-level change map

| File | Action |
| --- | --- |
| `site/src/data/types.ts` | Optional level; input types for portfolio save |
| `site/src/data/seed.ts` | Professional descriptions; keep IDs/slugs/photos/timestamps; bump seed version |
| `site/src/data/demo-store.ts` | Safe migration, transactional portfolio create/update, stable slug, multi-photo helpers; keep user/category data functions |
| `site/src/data/demo-context.ts`, `DemoDataProvider.tsx` | New portfolio API, admin session naming, no reset action, persistence result |
| `site/src/data/useDemoData.ts` | Name kept for compatibility |
| `site/src/App.tsx` | Remove feature routes; add redirects; keep core routes |
| `site/src/pages/HomePage.tsx` | Copy, remove download badge/step, keep layout |
| `site/src/pages/SchoolListPage.tsx` | Copy to client/portfolio, remove demo note, keep search/filter/sort |
| `site/src/pages/SchoolDetailPage.tsx` | Remove downloads/demo labels; rename info labels; keep tabs/grid/lightbox |
| `site/src/pages/CategoriesPage.tsx` | Client wording; keep four cards |
| `site/src/pages/AboutPage.tsx` | Professional copy; remove download/panel demo feature |
| `site/src/pages/NotFoundPage.tsx` | Verify wording only |
| `site/src/components/DemoNote.tsx` | Remove usage; component may be deleted |
| `site/src/components/PublicHeader.tsx`, `PublicFooter.tsx` | Nav/footer copy; keep structure |
| `site/src/components/SchoolCard.tsx`, `LevelBadge.tsx` | Optional level rendering |
| `site/src/components/PhotoPreviewDialog.tsx` | Remove download; keep preview/credits/nav |
| `site/src/components/SearchBar.tsx`, `SchoolFilters.tsx` | Client wording; keep controls |
| `site/src/components/admin/AdminLayout.tsx` | Two nav items, admin status copy, no demo bar wording |
| `site/src/components/admin/MultiImageDropzone.tsx` | New multi-file uploader with previews/progress/errors |
| `site/src/pages/admin/AdminSchoolFormPage.tsx` | Two required inputs + optional details + existing photo management |
| `site/src/pages/admin/AdminSchoolsPage.tsx` | Portfolio list with cover thumb, name, photo count, actions |
| `site/src/pages/admin/AdminDashboardPage.tsx` | Portfolio summary; remove users/reset |
| `site/src/pages/admin/AdminLoginPage.tsx` | Single admin copy; no demo wording; keep form design |
| `site/src/pages/admin/AdminUsersPage.tsx`, `AdminPhotosPage.tsx`, `AdminPhotoFormPage.tsx`, `AdminCategoriesPage.tsx` | Remove from routes; delete dead UI files after reference check |
| `site/src/components/Icons.tsx` | Remove unused DownloadIcon; add any needed icon only if already styled |
| `site/src/styles/index.css` | Add minimal styles for multi-photo grid; keep tokens and existing classes |
| Tests | Replace removed-feature assertions with preservation, multi-photo, optional-field, slug-stability, no-download and no-user-route tests |
| Docs | Baseline, plan, report, status, brief/alignment notes |

## 4. Acceptance mapping

| ID | How this plan satisfies it |
| --- | --- |
| V01 | Before/after screenshots at 390/768/1440; layout classes untouched except targeted removal |
| D01 | Baseline/after JSON compare of 12 clients and IDs/slugs |
| D02 | 62 photo associations and 8 image hashes compared |
| D03 | Additive migration only; no truncate/reset |
| C01 | Text scan + browser snapshots; prototype words removed from rendered UI |
| C02 | User route redirected; users array retained but no UI |
| C03 | Download controls and module removed; lightbox retained |
| C04 | No commerce UI exists; regression check |
| A01 | Form validation requires name + at least one photo on create |
| A02 | Multi-file picker; batch save |
| A03 | Optional category/note under details; auto cover/slug/timestamps |
| A04 | Existing photo list shown on edit; add/remove without replacing all |
| A05 | Delete portfolio/photo confirmations |
| S01/S02 | Blocked: no backend/credentials; documented, not faked |
| B01 | Bootstrap, build, lint, typecheck, tests re-run |
| B02 | Nested routes and image URLs checked in browser |

## 5. Risks and rollback

| Risk | Mitigation |
| --- | --- |
| Existing localStorage contains old descriptions | Exact-match migration for known seed strings only; user edits untouched |
| Large multi-image upload exceeds localStorage quota | Validate/compress per file; transactional save; honest error and no success message |
| Removing routes breaks old bookmarks | Redirects instead of 404 |
| Visual drift from form simplification | Reuse existing admin panels, fields and buttons; only remove fields/controls |
| Seed photo associations lost | No edits to seed assets array except descriptions; after-run hash comparison |
| No real auth/storage | Explicit blocker; no production-ready claim |

Rollback: `git diff` review, then revert the isolated v2 commit or check out
files from `nafa-v2-baseline`. No destructive reset is required.
