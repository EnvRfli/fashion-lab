# 05 — Page Specifications — Galeri Seragam

> **Status: PASSED — realigned specification, implemented and validated.**
> Authoritative product source: `docs/PROJECT_BRIEF.md`.
> Visual target: `docs/references/primary/galeri-seragam-main.png`, mapped in
> `docs/DESIGN_ALIGNMENT.md`.
> Tokens: `docs/04-design-system.md` → `site/src/styles/tokens.css`.
> Framework: React 19 + TypeScript + Vite 8 + Tailwind CSS 4, under `site/`.

## 1. Route inventory

| Route | Page | Purpose | Key states |
| --- | --- | --- | --- |
| `/` | Beranda | Brand entry, hero search, four education levels, sample school listing | Default, filtered empty, mobile menu |
| `/sekolah` | Daftar Sekolah | Full directory with live search, level filter, sort | Results, empty, URL-restored filters |
| `/sekolah/:slug` | Detail Sekolah | School identity, Galeri/Informasi tabs, photo preview, downloads | Photos, no photos, tab switch, preview open, download busy/success/error, missing school |
| `/kategori` | Kategori | Four canonical levels with live school/photo counts and descriptions | Default |
| `/tentang` | Tentang | Explain demo, photo licensing, download model, no commerce | Default |
| `/admin/masuk` | Login Admin Demo | Visual demo entry point; explicitly non-authenticating | Default, invalid email, existing demo session |
| `/admin` | Dashboard | Stats, recent schools, quick actions, reset data | Default, no schools, delete confirm, reset confirm |
| `/admin/sekolah` | Data Sekolah | Search and manage schools | Results, empty search, delete confirm, success notice |
| `/admin/sekolah/baru` | Tambah Sekolah | Create demo school with optional cover | Default, validation errors, saved |
| `/admin/sekolah/:id/edit` | Edit Sekolah | Edit demo school | Prefilled, validation, saved, missing ID |
| `/admin/kategori` | Kategori Admin | Edit canonical category descriptions | Default, dirty, saved, restore default |
| `/admin/foto` | Data Foto | Browse/manage gallery photos with school filter | Results, filtered empty, delete confirm, success notice |
| `/admin/foto/baru` | Tambah Foto | Upload a photo or choose a verified demo asset | Default, validation, preview, saved, no schools |
| `/admin/pengguna` | Pengguna | Honest demo-only user list and local add/remove | Default, validation, added, delete confirm |
| `*` | 404 | Recovery route | Default |

## 2. Global layout

### Public shell

- Skip link → `#main-content`.
- Sticky white header: brand, Beranda/Sekolah/Kategori/Tentang, outlined Login
  Admin, mobile menu.
- Active navigation: burgundy text + 2px underline.
- Main content between header and burgundy-deep footer.
- Footer: brand, demo disclaimer, navigation, categories, photo/licence note.
- Global demo labels: hero note, "Data demo" badge near the home listing,
  detail info tab, gallery footnote, footer, admin bar.

### Admin shell

- Desktop: 260px burgundy sidebar, white workspace, 62px topbar, demo bar,
  content max 1320px.
- Mobile: brand + Demo badge + menu button; sidebar becomes a full-screen
  dialog; content padding 16px.
- Demo bar always states localStorage scope and that authentication is absent.
- No route guard is claimed as security. All admin routes are openly reachable
  and labelled demo.

## 3. Component contracts

| Component | Contract |
| --- | --- |
| `PublicHeader` | Nav + active state + Login Admin + accessible mobile dialog. |
| `SearchBar` | Labelled search input, submit button, Enter submits. |
| `EducationLevelCards` | Four links to filtered directory, live counts, icons. |
| `SchoolFilters` | Search (optional), level filter, sort, reset, result count. |
| `SchoolCard` | Photo, name, level badge, accurate photo count, detail link, missing-image state. |
| `PhotoGrid` | Buttons open preview at the correct index; 2/3/4 columns. |
| `PhotoPreviewDialog` | Native dialog, image, title, category, credit/licence, download, prev/next, Escape close, focus return. |
| `DownloadActions` | Real ZIP from fetched bytes; disabled when no photos; busy/success/error text. |
| `AdminSidebar` | Five sections, active indicator, public-site and logout links. |
| `StatCard` | Label + live count + icon. |
| `DataTable` | Responsive wrapper, mobile-hidden secondary columns, action buttons. |
| `SchoolForm` | Name/level required; location/description optional; optional cover upload; validation. |
| `PhotoForm` | School/image/title/alt/credit required; upload preview or demo library; validation. |
| `ConfirmDialog` | Destructive confirmation with visible object name, cancel first. |
| `ImageDropzone` | JPG/PNG/WebP, 2.5MB input, preview, remove, drag/drop, visible label, errors. |

## 4. Page specifications

### 4.1 `/` Beranda

**Content**

- H1 "Koleksi Seragam Sekolah".
- Description: find school uniform references by level, open a gallery,
  download.
- Hero search: "Cari nama sekolah...", button "Cari"; submits to
  `/sekolah?q=<term>` or `/sekolah` when empty.
- Demo note: data and photos are examples.
- Hero photo collage: three real photographs, decorative only.
- "Pilih Kategori Sekolah" + four cards with live counts.
- "Daftar Sekolah" + "Data demo" badge + filter/sort + four newest schools.
- "Lihat semua sekolah" link and "Cara memakai galeri" three-step explainer.

**Responsive**

- ≥900px: two-column pink hero; 4-up level cards; 4-up schools.
- 640–899px: hero stacks/hides collage; 2-up level cards and schools.
- <640px: compact header; stacked search; 2-up level cards; 1-up schools.

**States:** default, filtered empty with reset, no schools (empty state).

### 4.2 `/sekolah`

**Content**

- H1 "Daftar Sekolah", description, demo note, search.
- Controls: search, "Filter Kategori" (Semua/TK/SD/SMP/SMA), "Urutkan"
  (Terbaru, Nama A–Z, Foto Terbanyak), reset when active, live result count.
- URL parameters: `q`, `kategori`, `urut`; refresh/back restore state.
- Cards: cover, name, level, photo count; missing-image state.

**States:** results, zero results with "Tampilkan semua sekolah", live status
announcement.

### 4.3 `/sekolah/:slug`

**Content**

- Back link "Daftar Sekolah" and "Bagikan" (Web Share or clipboard, honest
  fallback text).
- Identity: photo, level badge, level name, "Data demo" badge, H1 school name,
  location, description, "n Foto referensi tersedia".
- Tabs "Galeri" (count) and "Informasi", arrow/Home/End keyboard support.
- Galeri: heading, helper, "Download Semua (n Foto)", photo grid, demo/licence
  footnote.
- Informasi: school fields, last updated, demo data callout, photo credit list.
- Related schools at same level (up to 3).
- Missing school: honest empty state with link back.

**Photo preview**

- Native modal; full image; school, title, category, creator, licence link.
- "Download Foto" fetches the actual file and reports success.
- Previous/next wrap; counter; close button; Escape; backdrop click.
- Focus returns to the triggering tile on close.

**Bulk download**

- Preflight-fetch every photo. If any fetch fails, show an error and do not
  create a misleading archive.
- If all succeed, create a ZIP with real bytes via `fflate`, download as
  `seragam-<slug>.zip`, report the count.
- Disabled when the gallery has zero photos, with an explanation.

**Responsive**

- Desktop: identity 280px media + copy; 4-col photos; 2-col info.
- Tablet: stacked identity; 3-col photos.
- Mobile: stacked identity; 2-col gallery; full-width download.

### 4.4 `/kategori`

- H1 "Kategori Sekolah"; demo note.
- Four category cards: icon, code, full name, description, school count, photo
  count, link to `/sekolah?kategori=<id>`.
- Footer prompt + link to directory.
- Descriptions come from the persisted demo category settings.

### 4.5 `/tentang`

- H1 "Referensi seragam, tanpa alur belanja."
- Explanation: directory, gallery, download, admin demo.
- Explicit statements: demo data, Pexels stock photography, no SVG/CSS/Canvas
  garment substitutes, no real school affiliation, localStorage limitations.
- Four feature cards with distinct icons.
- CTA to directory and demo admin.
- Supporting real photograph with visible credit.

### 4.6 `/admin/masuk`

- Brand + "Panel admin" eyebrow + H1 "Login Admin".
- Visible note: no real authentication; password is not checked or stored.
- Email validation, any non-empty password, submit → demo dashboard.
- Direct "Buka dashboard demo tanpa mengisi form" link.
- If session flag active, show "Sesi demo aktif" and dashboard button.
- No client-side guard is presented as security.

### 4.7 `/admin`

- H1 "Dashboard"; description.
- Actions: "Reset data demo" (confirm) and "Tambah Sekolah".
- Four stats: total schools, total photos, 4 categories, demo admins.
- "Sekolah Terbaru" table: name/location, level, photo count, updated, view,
  edit, delete (confirm).
- "Aksi cepat": add photo, manage categories, demo users.

### 4.8 `/admin/sekolah`

- H1 "Daftar sekolah demo"; add action.
- Search by name/location/level; live count.
- Table: school, level, photo count, updated, view/edit/delete.
- Success notice after create/update.
- Delete confirm names the school and explains photo cascade.

### 4.9 `/admin/sekolah/baru` and `/admin/sekolah/:id/edit`

- Back link; H1 "Tambah Sekolah" / "Edit Sekolah".
- Fields: name (required, 3–80), level (required canonical), location
  (≤100), description (≤500, counter), optional cover image with preview.
- Inline validation, `aria-invalid`, error messages, focus to first invalid.
- Save → school list with notice; cancel → list.
- Edit missing ID → honest not-found panel.

### 4.10 `/admin/kategori`

- Four canonical rows TK/SD/SMP/SMA; counts; description textarea.
- Save per row (disabled when unchanged), "Tersimpan" status.
- "Pulihkan default" restores the seed description.
- Category cores cannot be deleted.
- Public `/kategori` reflects saved descriptions.

### 4.11 `/admin/foto`

- H1 "Galeri foto demo"; add action.
- Filter by school; live count.
- Table: thumbnail/title/creator/licence, school/level, category, added date,
  view gallery, delete.
- Delete confirm; success notice after add.

### 4.12 `/admin/foto/baru`

- Back link; H1 "Tambah Foto".
- Segmented source: "Unggah foto" or "Pustaka demo".
- Upload: validated image, compression, preview, remove; 2.5MB input cap.
- Library: eight manifest assets with title/creator; selecting fills title, alt,
  category, creator, licence, source URL.
- Fields: school (required), category, title (required), alt (required ≥10),
  creator, licence, source URL.
- Save → photo list with notice; no schools → link to create school first.

### 4.13 `/admin/pengguna`

- H1 "Pengguna demo"; prominent note: no accounts, passwords, or auth.
- Local list: name, email, role, added date, delete.
- Add form: name, valid unique email, role; validation.
- Added users are data rows only; they cannot log in.

### 4.14 `*` 404

- H1 "Halaman tidak ditemukan"; links to home and directory.

## 5. Data model and seed

| Entity | Fields |
| --- | --- |
| `School` | `id`, `slug`, `name`, `level`, `location`, `description`, optional `coverImage`, `createdAt`, `updatedAt`, `isDemo` |
| `GalleryPhoto` | `id`, `schoolId`, `imagePath`, `title`, `alt`, `category`, source/creator/licence fields, `demonstration`, `createdAt` |
| `DemoUser` | `id`, `name`, `email`, `role`, `createdAt` (no password) |
| Category settings | canonical level id → description |
| UI state | search, level, sort, active tab, preview index, download status |

- Seed: 12 illustrative schools (3 per level), 62 gallery records, 4 canonical
  categories, 3 demo users.
- School names and profiles are illustrative demo data; no affiliation claim.
- Photo counts are derived from actual `GalleryPhoto` records, never hardcoded.
- Persistence key: `galeri-seragam.demo.v2`; seed version 2.
- Reset clears and reseeds; storage failure is surfaced in the admin demo bar.

## 6. Asset and download rules

- Only the eight manifest Pexels photographs are seeded.
- Every photo displays its real creator and licence in the preview.
- No SVG/CSS/Canvas garment, shoe, or bag is used as product imagery.
- Individual download fetches the actual local file.
- Bulk download zips real photo bytes; no simulated success.
- Uploads are user-selected raster files, compressed, previewed, and stored as
  data URLs with an honest local-only limitation.

## 7. Accessibility acceptance

- WCAG 2.2 AA target; measured text pairs in `docs/04`.
- One H1 per page; ordered headings; landmarks; skip link.
- Visible 2px burgundy focus ring; 44px targets.
- Tabs implement `role=tablist`, `aria-selected`, roving tabindex, arrow keys.
- Dialogs are native, labelled, Escape-closable, focus-managed.
- Form labels visible; errors linked and announced.
- Download status is announced.
- Reduced-motion support; no motion-only meaning.
- axe automated audit returns 0 violations on final captured pages.

## 8. Responsive acceptance

| Width | Public | Admin |
| --- | --- | --- |
| 390px | Compact header/menu; stacked hero; inline search; 2-up levels; 1-up schools; 2-up gallery; stacked detail; full-width download | Mobile topbar/menu; 2-up stats; tables hide secondary columns; stacked forms; full-width actions |
| 768px | Header nav hidden until 900; 2-up cards; 2-up gallery; stacked detail | Mobile menu; 2-up stats; tables with selected columns |
| 1440px | Full nav; 4-up levels/schools; 4-col gallery; two-column hero/detail/info | 260px sidebar; 4-up stats; full tables; 900px forms |

No horizontal page overflow at any target width; wide tables scroll inside their
own wrapper.

## 9. Validation commands

```powershell
npm run verify:bootstrap
npm run validate:assets -- --require-assets
npm run tokens:build -- --require
cd site
npm run build
npm run lint
npm run typecheck
npm test
cd ..
npm run qa:visual -- --url http://127.0.0.1:3000
```

## 10. Explicit non-goals

- Cart, checkout, payment, prices, promotions, buy-now, product sizes, inventory.
- Real authentication, roles, permissions, or multi-user storage.
- Backend API, database, deployment, or remote uploads.
- Claiming stock photos are official uniforms or verified school inventory.
- Reproducing the composite reference as a single collage page.

---

## Nafa v2 addendum (2026-11-13)

This addendum supersedes the demo/download/user-management details above while
keeping the same routes, layout and responsive composition.

### Public behavior

- `/` — portfolio homepage; same hero/nav/category/card composition; no demo
  badge or download badge; search placeholder `Cari nama klien...`.
- `/sekolah` — preserves the URL, now labelled Portofolio Klien; same search,
  category filter and sort; no demo note.
- `/sekolah/:slug` — same identity row, Galeri/Informasi tabs, photo grid,
  lightbox and related clients; no bulk or per-photo download; labels use
  Klien/Kategori.
- `/kategori` — same four level cards; counts read "Klien" and "Foto".
- `/tentang` — same layout; no demo/download/panel-demo feature cards.
- No public signup, visitor login, profile, user management or role management.

### Admin behavior

- `/admin/masuk` — one admin entry point; honest local-only readiness note; no
  demo credentials or bypass link.
- `/admin` — dashboard with client/photo/category stats and recent portfolios;
  no user stat or reset-data action.
- `/admin/sekolah` — portfolio list with cover thumbnail, client name, optional
  category, photo count, updated date, view/add-photo/edit/delete actions.
- `/admin/sekolah/baru` — required `Nama klien` + multi-photo upload; optional
  category/location/description under a collapsed `Informasi tambahan
  (opsional)`; button `Simpan & Publikasikan`.
- `/admin/sekolah/:id/edit` — same two primary inputs; existing photos listed
  with cover marker, confirmation before removal, add-new batch upload; slug
  preserved; button `Simpan Perubahan`.
- `/admin/kategori`, `/admin/foto`, `/admin/foto/baru`, `/admin/pengguna` —
  redirect to `/admin/sekolah`; their former screens are removed.

### Data behavior

- Preserve all 12 seeded clients, 62 photos, 8 image files, IDs, slugs, cover
  paths and associations. Additive description-copy migration only.
- Uploaded photos are compressed data URLs in browser storage; this is a local
  demonstration persistence layer, not production object storage.
- Required test evidence and limitations: `docs/NAFA_V2_EXECUTION_REPORT.md`.
