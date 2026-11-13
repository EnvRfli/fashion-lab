# NAFA V2 — Execution Report

**Date:** 2026-11-13
**Repository:** `D:\personal_project\fashion-lab`
**App root:** `site/`
**Mode:** autonomous, minimal-change adjustment on an existing working site
**Push/deploy:** **none performed**
**Git baseline:** `1a98a8a` on `main`; restore branch `nafa-v2-baseline`

## 1. Outcome summary

The existing Galeri Seragam / Nafa Collection site was adjusted without a
redesign. The accepted navbar, hero, palette, type, cards, grid, detail tabs,
admin shell, forms and responsive composition remain in place. All 12 seeded
client records and all 62 photo associations are still present, with identical
IDs, slugs, names, cover paths and image bytes.

Public UI no longer shows prototype labels or download actions. Admin is reduced
to **Nama klien + multiple photos**, with optional category/location/description
inside a collapsed section. Public user management, category master, separate
photo master and reset-data controls are no longer exposed.

A real server auth/storage backend is still absent. Production write readiness
and server-auth acceptance tests are therefore **BLOCKED**, not passed. Local
browser persistence was implemented honestly and verified after reload.

## 2. Baseline vs final data

Source: `artifacts/nafa-v2/baseline.json` and
`artifacts/nafa-v2/after-data.json`, generated from the real seed module by
`scripts/nafa-baseline.mjs`. Comparison:
`artifacts/nafa-v2/data-comparison.json`.

| Metric | Baseline | Final | Result |
| --- | ---: | ---: | --- |
| Client/portfolio records | 12 | 12 | preserved |
| Gallery photos | 62 | 62 | preserved |
| Distinct image files | 8 | 8 | preserved |
| Missing client IDs | — | 0 | pass |
| Changed slugs/names/covers/photo counts | — | 0 | pass |
| Missing photo IDs | — | 0 | pass |
| Image SHA-256 mismatches | — | 0 | pass |
| Demo user records in storage | 3 | 3 | preserved, UI removed |
| Category descriptions | 4 | 4 | preserved |

The only seeded content change is the professional rewrite of the 12
description strings that previously contained "contoh", "demo" or
"demonstrasi". The one-way migration matches the exact old strings; an
administrator-edited description is not overwritten (covered by a unit test).

## 3. Routes preserved and changed

### Preserved public routes

`/`, `/sekolah`, `/sekolah/:slug`, `/kategori`, `/tentang`, `*` (404).

The `/sekolah` URL is intentionally kept even though public labels now say
Portofolio/Klien, so bookmarks and inbound links do not break.

### Preserved admin routes

`/admin/masuk`, `/admin`, `/admin/sekolah`, `/admin/sekolah/baru`,
`/admin/sekolah/:id/edit`.

### Removed screens with safe redirects

| Old route | New behavior |
| --- | --- |
| `/admin/kategori` | redirect to `/admin/sekolah` |
| `/admin/foto` | redirect to `/admin/sekolah` |
| `/admin/foto/baru` | redirect to `/admin/sekolah` |
| `/admin/pengguna` | redirect to `/admin/sekolah` |

No public route was removed or renamed. No redirect loop or 404 was observed in
the browser.

## 4. Public UI labels removed

Text scan of rendered `body.innerText` across `/`, `/sekolah`,
`/sekolah/sdn-001-bandung`, `/kategori`, `/tentang`, `/admin`,
`/admin/sekolah`, `/admin/sekolah/baru`, `/admin/sekolah/:id/edit`, and
`/admin/masuk` returned **zero** matches for
`demo|test|sample|dummy|mock|prototype|staging|contoh|percobaan|uji coba`.
It also returned **zero** matches for download/unduh wording. Raw output:
`artifacts/nafa-v2/text-scan.txt`.

Removed examples:

- "Data demo" badge on home and detail.
- "Mode demo" sidebar/admin bar, "Sesi demo", "Demo" badge.
- "Situs demonstrasi", "demo internal", "Login Admin (demo)".
- "Data demonstrasi" callout and "Foto demonstrasi" credit wording.
- "Download Semua (N Foto)", "Download Foto", "Unduh per foto atau sekaligus",
  "Unduh referensi", and all download helper copy.
- "Panel admin demo", "Pengguna demo", "Kategori sekolah" master copy.
- Seed descriptions containing "contoh", "demo", or "demonstrasi".

No client name, legal name, photo path, file name, slug, or URL was rewritten to
remove a coincidental word. Internal identifiers such as `DemoDataProvider`,
`demo-store.ts`, `admin-demo-bar`, `DEMO_STORAGE_KEY`, and fixture data remain;
the v2 spec explicitly permits internal/test identifiers.

## 5. Admin form: required vs optional

### Required

1. **Nama klien** — trimmed, non-empty, max 80 characters.
2. **Foto hasil pekerjaan** — one or more photos in one multi-file picker for a
   new portfolio. At least one photo must remain on an edit.

### Optional, collapsed under "Informasi tambahan (opsional)"

- **Kategori** — blank means no category; TK/SD/SMP/SMA are existing categories,
  not a mandatory school form.
- **Lokasi** — optional text.
- **Keterangan** — optional short description.

### Automatic

- Slug on create, with `-2`, `-3` collision handling.
- Slug preserved on edit so public URLs stay stable.
- Cover = first selected photo by default; existing cover preserved if still
  present; recalculated if the cover photo is removed.
- Photo count, photo IDs, created/updated timestamps, gallery order.
- Photo title/alt/credit for uploads are derived from the client name.

### Edit/delete behavior

- Existing photos are listed in the edit form with a "Sampul" marker.
- Adding photos prepends them and never replaces existing photos.
- Removing a photo requires confirmation and only takes effect when the form is
  saved; an undo link restores the removal list before saving.
- Removing the last remaining photo is blocked with a warning; the client record
  is never silently deleted.
- Deleting a portfolio requires a specific confirmation and cascades only that
  client's photos.
- Save shows "berhasil" only after `localStorage` accepted the write. If storage
  is unavailable/full, the form stays open with an honest error.

## 6. Browser-verified behavior

All checks were run against `http://127.0.0.1:3000` (Vite dev) and a production
build served at `http://127.0.0.1:4173`.

| Check | Result |
| --- | --- |
| Home search "Sukajadi" → listing | 1 client found, SDN Sukajadi |
| Open client gallery | 4 photos, tabs, related clients |
| Open photo preview | dialog opens, title/credit/license visible |
| Preview next/previous and Escape | works |
| Download UI in preview/detail | 0 buttons, 0 `a[download]` |
| Admin login validation and entry | works with honest local-only warning |
| Create "Pesantren Al-Falah" with 2 photos | published, appeared in public gallery |
| Optional category omitted | saved as "Tanpa kategori" |
| Edit: add 1 photo, remove 1 existing photo | 2 original/new photos remained, count 2 |
| Remove confirmation | dialog appeared; removal required save |
| Delete test portfolio | confirmation; list returned to 12; storage 12/62 |
| Persistence after browser reload | temp portfolio remained after reload, then was deleted |
| Old admin feature URLs | redirect to portfolio list |
| Text scan for prototype labels | 0 hits on 10 routes |
| Text scan for public-user UI | 0 hits on 9 routes |
| Production build smoke | home, detail lightbox, admin form all work |

Two real browser-only defects were found and fixed during this work:

1. `PhotoPreviewDialog` called `dialog.close()` in its StrictMode effect cleanup,
   producing a late close event that dismissed the preview immediately in dev.
   The cleanup now relies on DOM removal; the preview works in dev and
   production.
2. `ConfirmDialog` had the same cleanup pattern, which made delete/removal
   confirmations disappear immediately in dev. Fixed the same way.

## 7. Visual QA

### Before

Full-page 390/768/1440 PNGs under `artifacts/nafa-v2/before/`:

- `home/2026-11-13T02-12-14-288Z`
- `listing/2026-11-13T02-12-27-092Z`
- `detail/2026-11-13T02-12-39-610Z`
- `admin-dashboard/2026-11-13T02-12-51-418Z`
- `admin-list/2026-11-13T02-13-01-545Z`
- `admin-create/2026-11-13T02-13-12-586Z`
- `admin-login/2026-11-13T02-13-22-693Z`

### After

Full-page 390/768/1440 PNGs under `artifacts/nafa-v2/after/`:

- `home/2026-11-13T02-40-13-198Z`
- `listing/2026-11-13T02-40-24-935Z`
- `detail/2026-11-13T02-40-33-673Z`
- `admin-dashboard/2026-11-13T02-40-42-403Z`
- `admin-list/2026-11-13T02-40-52-340Z`
- `admin-create-final/2026-11-13T02-54-58-369Z`
- `admin-login-final/2026-11-13T02-57-20-809Z`
- `categories/2026-11-13T02-41-18-400Z`
- `about/2026-11-13T02-41-28-108Z`

Interaction evidence:

- `artifacts/nafa-v2/after/interactions/lightbox-viewport-390.png`
- `artifacts/nafa-v2/after/interactions/lightbox-390.png` (full-page capture)
- `artifacts/nafa-v2/after/interactions/admin-edit-1440.png`
- `artifacts/nafa-v2/after/interactions/admin-edit-390.png`

All final after runs (the nine pages above plus the final admin-create/login
reruns) reported 0 console errors/warnings, 0 axe violations, 0 broken images,
0 missing alt text, 0 unlabeled controls, and 0 horizontal overflow at all three
viewports.

### Inspection

Inspector: `opencode-go/deepseek-v4.1-flash` (vision-capable), 2026-11-13. Every
listed PNG was opened with the `read` tool as image content.

### Observed differences

| Area | Difference | Justification |
| --- | --- | --- |
| Home hero | Heading/description now portfolio/client copy; demo note removed; bottom hero badge changed from download to "Lihat galeri klien" | Required copy/feature policy; same two-column hero, photo collage and badge geometry |
| Home listing | "Daftar Sekolah" → "Klien & Hasil Produksi"; demo badge removed | Client/portfolio model |
| Listing page | "Daftar Sekolah" → "Portofolio Klien"; demo note removed | Copy-only |
| Detail | Bulk download button removed; per-photo download removed; info labels renamed; demo badge/callout removed; grid and tabs unchanged | C01/C03 |
| Admin create | Large multi-section school form replaced by two required inputs + collapsed optional section; multi-photo picker | A01–A03 |
| Admin list | Cover thumbnails added; "Tambah Foto" shortcut added; category can be absent | Required portfolio list |
| Dashboard | No demo-user stat, no reset-data action; client/photo/category stats | Public-user/reset removal |
| Footer/About | Professional production/portfolio copy, no demo/staging text | C01 |

No typography, color, spacing-scale, hero, grid, card, navbar, sidebar or
breakpoint change was made. The differences are attributable to the explicit
v2 feature/copy requests.

## 8. Commands and results

```powershell
npm run verify:bootstrap
# Summary: 35/35 checks passed.

npm run validate:assets -- --require-assets
# Assets checked: 8; Source files scanned: 47; 0 error(s), 0 warning(s).

npm run tokens:build -- --require
# Generated 91 token(s) -> site/src/styles/tokens.css (status: approved)

cd site
npm run build
# tsc + vite v8.3.8; 62 modules transformed; built successfully

npm run lint
# exit 0, no warnings

npm run typecheck
# exit 0

npm test
# 3 test files passed; 37 tests passed
```

Additional evidence:

```powershell
node scripts/nafa-baseline.mjs artifacts/nafa-v2/after-data.json
# schools=12 photos=62 distinctImages=8
```

Data comparison summary:

```json
{
  "baseline": { "schools": 12, "photos": 62, "distinctImages": 8 },
  "after": { "schools": 12, "photos": 62, "distinctImages": 8 },
  "missingSchools": [],
  "changedSchoolIdentity": [],
  "missingPhotos": [],
  "photoHashMismatch": []
}
```

Production preview smoke used `npx vite preview --port 4173 --strictPort`; the
home rendered, the detail lightbox opened, no download controls were present,
and the admin form exposed name + multi-photo + collapsed optional fields.

## 9. Readiness matrix

| Level | Status | Evidence / blocker |
| --- | --- | --- |
| DESIGN/BUILD READY | **PASSED** | Build, lint, typecheck, 37 tests, asset validation, 390/768/1440 screenshots inspected |
| LOCAL ADMIN WRITE READY | **PASSED (browser-local only)** | Create/edit/delete + multi-photo + reload persistence verified in this browser profile |
| ADMIN WRITE READY (production) | **BLOCKED** | No server auth, no server database, no object storage, no credentials |
| CONTENT APPROVED | **BLOCKED / owner action** | Seeded client names and stock photos require owner permission before public production use |
| DEPLOY READY | **BLOCKED** | Auth/storage/content approval unresolved; no deployment attempted |
| S01 anonymous write prevention | **BLOCKED** | Admin write authorization is not server-enforced; do not expose this build as production |
| S02 durable upload persistence | **BLOCKED** | Uploads live in `localStorage` data URLs; they survive reload in this browser, not another device/browser or Vercel ephemeral runtime |

No claim of "production ready" is made.

## 10. Production integration contract (not implemented)

This is the minimum contract the next backend pass should satisfy; no provider or
credential was invented.

### Auth

- One administrator identity, server-verified.
- `POST /api/admin/session` with secure, HttpOnly, SameSite cookie or equivalent.
- Every write (`POST/PUT/DELETE /api/portfolios`, uploads, deletes) checks the
  server session/role. Hiding UI is not authorization.
- No public signup, no user list, no role matrix.

### Data

- `Portfolio`: id, client name, slug, optional category, optional description,
  optional location, cover photo reference, created/updated timestamps.
- `PortfolioPhoto`: id, portfolio id, storage path, ordering, alt text, metadata.
- Existing seed records must be imported idempotently (seed only when missing)
  or read through an adapter that merges them with stable IDs. Do not truncate.
- Read path must return the existing 12 clients/62 photos until an explicit
  owner-approved migration replaces them.

### Uploads

- Object storage, not Vercel ephemeral filesystem.
- Server validates MIME/file signature, size, count, and sanitizes names.
- Upload progress and per-file failures are visible; success only after backend
  confirmation.
- Storage rules prevent anonymous writes/deletes.

### Environment (names only; values are external prerequisites)

`PORTFOLIO_API_URL`, `ADMIN_SESSION_COOKIE`, `UPLOAD_BUCKET`,
`UPLOAD_MAX_BYTES`, and provider credentials supplied outside the repository.
No secret is committed.

## 11. Files changed

**Public:** `App.tsx`, `HomePage.tsx`, `SchoolListPage.tsx`,
`SchoolDetailPage.tsx`, `CategoriesPage.tsx`, `AboutPage.tsx`,
`NotFoundPage.tsx`, `PublicHeader.tsx`, `PublicFooter.tsx`,
`PhotoPreviewDialog.tsx`, `SchoolCard.tsx`, `SchoolFilters.tsx`,
`SearchBar.tsx`, `EducationLevelCards.tsx`, `Icons.tsx`,
`use-page-title.ts`.

**Admin:** `AdminLayout.tsx`, `AdminDashboardPage.tsx`,
`AdminSchoolsPage.tsx`, `AdminSchoolFormPage.tsx`, `AdminLoginPage.tsx`,
`ConfirmDialog.tsx`, new `MultiImageDropzone.tsx`.

**Data:** `types.ts`, `seed.ts`, `demo-store.ts`, `demo-context.ts`,
`DemoDataProvider.tsx`, `useDemoData.ts` (name unchanged), `schools.ts`.

**Removed:** `DemoNote.tsx`, `ImageDropzone.tsx`, `downloads.ts`,
`downloads.test.ts`, `AdminCategoriesPage.tsx`, `AdminPhotosPage.tsx`,
`AdminPhotoFormPage.tsx`, `AdminUsersPage.tsx`.

**Styles:** additive multi-photo/cover/optional-section styles only;
`tokens.css` content unchanged.

**Tests:** 3 files, 37 tests covering routes, search, no demo/download UI,
required name/photo validation, edit preservation, delete confirmation, old-route
redirects, seed/migration counts, optional category, multi-photo save, stable
slug, cover recalculation and user-data retention.

**Docs:** this report, `docs/NAFA_V2_BASELINE.md`,
`docs/NAFA_V2_CHANGE_PLAN.md`, updated brief/alignment/status/QA/decision docs.

## 12. Blockers and owner actions

1. **Authentication blocker:** no server auth exists. The login is a local
   readiness gate, not a secure credential check. Do not publish admin writes.
2. **Persistence blocker:** no backend database/object storage. LocalStorage is
   browser-specific and quota-limited. Do not claim durable multi-device writes.
3. **Content/permission blocker:** seeded client names and Pexels stock photos
   are suitable for continuity and development, but the owner must approve
   public client identity and photo rights before production launch.
4. **No deployment/push:** intentionally not performed.
