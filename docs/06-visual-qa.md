# 06 — Visual QA

> **V2 update — 2026-11-13:** the minimal-change adjustment was captured and
> inspected at 390/768/1440. Visual preservation passed for the v2 scope; see
> section 8. The historical realignment record below is retained.

> **Status: PASSED — final realignment screenshots captured at 390/768/1440
> and inspected as image content by the active vision-capable model
> (`opencode-go/deepseek-v4.1-flash`) on 2026-11-11.**
> Automated screenshots alone do not grant a pass; the observations below are
> from opening the PNGs, not from DOM inspection alone.

## 1. Run metadata

| Field | Value | Status |
| --- | --- | --- |
| Date/time | 2026-11-11, 16:19–16:26 UTC | `[VERIFIED]` |
| Site URL | `http://127.0.0.1:3000` | `[VERIFIED]` |
| Server | Vite preview serving `site/dist` after `npm run build` | `[VERIFIED]` |
| Build | `site` build `vite v8.3.8`, 69 modules, 0 errors | `[VERIFIED]` |
| Runner | `scripts/visual-qa.mjs` | `[VERIFIED]` |
| Browser | agent-browser 0.42.0 / Chrome for Testing 157.0.8103.50 | `[VERIFIED]` |
| Model / inspector | `opencode-go/deepseek-v4.1-flash`, image input enabled; screenshots read as images | `[VERIFIED]` |
| Report format | `report.json` per run directory | `[VERIFIED]` |

The preview server was already listening on port 3000 and served the freshly
built `site/dist`. A second `npm run preview` correctly refused the occupied
port; captures therefore used the existing server. This is recorded rather than
hidden.

## 2. Final screenshot sets

Every set below contains full-page `mobile-390.png`, `tablet-768.png`, and
`desktop-1440.png`, plus `report.json`. Paths are relative to the repository.

| Screen | Run directory | Automated result |
| --- | --- | --- |
| Beranda `/` | `artifacts/visual-qa/realignment/final-home/2026-11-11T16-19-17-157Z` | 0 overflow, 0 broken images, 0 missing alt, 0 console/page errors, 0 axe violations at all three widths |
| Daftar Sekolah `/sekolah` | `artifacts/visual-qa/realignment/final-schools/2026-11-11T16-19-42-370Z` | 0 overflow, 12 images, 0 axe violations |
| Detail `/sekolah/sdn-001-bandung` | `artifacts/visual-qa/realignment/final-detail/2026-11-11T16-20-06-369Z` | 0 overflow, 9 images, 0 axe violations |
| Dashboard `/admin` | `artifacts/visual-qa/realignment/final-admin/2026-11-11T16-20-35-352Z` | 0 overflow, 0 axe violations |
| Tambah Sekolah `/admin/sekolah/baru` | `artifacts/visual-qa/realignment/final-admin-school-form/2026-11-11T16-20-58-412Z` | 0 overflow, 0 axe violations |
| Tambah Foto `/admin/foto/baru` | `artifacts/visual-qa/realignment/final-admin-photo-form/2026-11-11T16-01-31-305Z` | 0 overflow, 0 axe violations |
| Kategori `/kategori` | `artifacts/visual-qa/realignment/final-categories/2026-11-11T16-12-09-062Z` | 0 overflow, 0 axe violations |
| Tentang `/tentang` | `artifacts/visual-qa/realignment/final-about/2026-11-11T16-21-23-098Z` | 0 overflow, 1 image, 0 axe violations |
| Login Admin `/admin/masuk` | `artifacts/visual-qa/realignment/final-admin-login/2026-11-11T16-25-06-930Z` | 0 overflow, 0 axe violations |
| Data Foto `/admin/foto` | `artifacts/visual-qa/realignment/final-admin-photos/2026-11-11T16-14-30-119Z` | 0 overflow, 62 images, 0 axe violations |
| Kategori Admin `/admin/kategori` | `artifacts/visual-qa/realignment/final-admin-categories/2026-11-11T16-15-14-414Z` | 0 overflow, 0 axe violations |
| Pengguna `/admin/pengguna` | `artifacts/visual-qa/realignment/final-admin-users/2026-11-11T16-17-59-609Z` | 0 overflow, 0 axe violations |

### Interaction screenshots

| State | Path | Observation |
| --- | --- | --- |
| Mobile public menu open | `artifacts/visual-qa/realignment/interactions/mobile-menu-390.png` | Full-height white dialog, brand + close, four nav rows, Login Admin CTA, demo note; no clipping |
| Mobile admin menu open | `artifacts/visual-qa/realignment/interactions/admin-mobile-menu-390.png` | Five admin sections with active Dashboard highlight; Lihat situs / Keluar visible |
| Photo preview at 390 | `artifacts/visual-qa/realignment/interactions/photo-preview-390.png` | Full-width photo, close control, school/title/category, credit, licence link, download, 1/6 navigation |
| Login at 1440 | `artifacts/visual-qa/realignment/interactions/admin-login-1440.png` | Brand/eyebrow now stack correctly; warning card, form, demo-only alternative link |

## 3. Visual inspection record

Inspector: **DeepSeek V4.1 Flash (vision-capable model), 2026-11-11**, using the
`read` tool on each PNG. The observations below are from the rendered images.

### 3.1 Homepage

- Desktop 1440: white navbar with burgundy brand mark, active "Beranda"
  underline, outlined "Login Admin"; soft pink two-column hero with display
  heading, description, inline search and photo collage; four level cards;
  filter/sort toolbar; four school cards; explainer band; burgundy footer.
- Mobile 390: compact navbar with hamburger; stacked hero; inline search and
  burgundy Cari button; 2×2 level cards; filter/sort stacked; single-column
  school cards; footer readable.
- Tablet 768: 2×2 level cards and two-column school cards; no clipping.
- Reference relation: hierarchy matches the top-left desktop and top-centre
  mobile regions (nav → pink hero/search → categories → filters → cards).
  The hero uses a real-photo collage instead of the reference's cut-out uniform
  pair, and card cover photos are stock garments rather than identical
  shirt-and-tie thumbnails. This is an honest asset substitution, not a
  structural mismatch.

### 3.2 School directory

- Desktop: page hero with heading, description, demo note and search; filter and
  sort controls; result count; four-column card grid.
- Mobile: inline search, stacked filters, one-column cards; all cards fully
  visible, no horizontal page overflow.
- Search "sukajadi" returned 1 school; SMP filter + Nama A–Z returned SMPN 1
  Lembang, SMPN 2 Cimahi, SMPN 3 Bandung; reset restored 12 cards. Verified in
  the browser, not inferred.
- Empty result state was exercised; the reset action restores the list.

### 3.3 School detail

- Desktop: back link, share, identity row with real photo, level badge, demo
  badge, name, location, description, count; Galeri/Informasi tabs; 4-column
  photo grid; prominent Download Semua; related schools.
- Mobile: back link, identity, tabs, full-width download button, two-column
  photo grid, related cards and footer.
- Photo preview: opens as a native modal with the real image, credit, licence
  link, download action and 1/6 navigation. Escape closes it.
- Single download produced "Foto diunduh."; bulk download produced
  "Arsip 6 foto berhasil dibuat." and a ZIP containing six real JPEGs
  (`01-kemeja-putih.jpg` … `06-rel-seragam.jpg`, 2,647,911 bytes).
- Reference relation: matches the top-right mobile concept's identity → tabs →
  two-column gallery → download CTA. The mobile identity photo is larger than
  the reference's small thumbnail; this improves legibility and is recorded as
  an intentional minor difference.

### 3.4 Admin dashboard

- Desktop: burgundy sidebar with five sections, white workspace, demo bar,
  Dashboard heading, four metric cards, recent-schools table, quick actions.
  Structure closely matches the bottom-left reference region.
- Mobile: compact brand + Demo + menu; two-column stat grid; table hides
  secondary columns and keeps school, level badge, and actions; no clipping.
- Delete and reset confirmations were exercised. School create/edit/delete was
  exercised end to end and reflected on the public directory.

### 3.5 Admin forms

- Tambah Sekolah: labelled name/level/location/description, character count,
  optional cover dropzone, Batal/Simpan. Mobile stacks cleanly. Validation
  produced "Nama sekolah minimal 3 karakter." and focused the field.
- Tambah Foto: segmented upload/library; labelled file input and dropzone;
  school/title/alt/category/credit fields; preview and remove; validation
  messages. Selecting a demo asset auto-fills title, alt, category, creator,
  licence, and source. Uploading a real local JPEG through the browser produced
  a preview, saved successfully, appeared in the public gallery, and was
  deleted afterwards.
- File upload is real: the app compressed a user-selected raster photo; it did
  not draw or synthesize a garment.

### 3.6 Categories, About, Login, Users

- Categories: four large cards with icons, descriptions, live school/photo
  counts, and level links; burgundy footer. Saved description changes appeared
  on the public category page. Restore-default restored the seed text.
- About: clear no-commerce statement, real photo with visible credit, four
  distinct feature icons, data/photo disclosure, demo limitations, CTA.
- Login: warning card clearly states no authentication and no password
  checking; brand/eyebrow overlap found in an earlier capture was fixed and
  re-inspected.
- Users: prominent demo-only warning; local list and add form; email validation
  and duplicate-email guard. No password field exists.

## 4. Defects found and corrected

| # | Finding | Evidence | Fix | Re-verification |
| --- | --- | --- | --- | --- |
| 1 | Heading-order axe violation on `/sekolah` (h1 → h3 cards) | First list run, 1 moderate violation | Added an accessible h2 "Hasil pencarian sekolah" before the grid | Final list run: 0 violations |
| 2 | Hidden file input caused 38px page overflow | Photo-form run, `documentScrollWidth` 428 at 390 | Excluded `.sr-only` from `.form-field input` width rule | Final photo-form run: no overflow |
| 3 | File input had no accessible label | School-form run, 2 critical/serious axe violations | Replaced span with `<label htmlFor>` + `aria-label` | Final school-form run: 0 violations |
| 4 | Admin users table overflowed 390px | Users run, 390 → 438 scroll width | `min-width: 0` on panels/grid children; hide email column on small screens | Final users run: no overflow |
| 5 | Login brand and "Panel admin" eyebrow collided | Earlier login screenshot | Forced block/flex layout in login card | Final login screenshot correct |
| 6 | PowerShell import edit corrupted en/em dashes in six TSX files | "TKâ€“SMA" in first home capture | Replaced mojibake with proper UTF-8 punctuation; re-scanned source | Final home capture shows "TK–SMA" |
| 7 | Identical cover photo on all home cards | First home capture | Added per-school cover asset mapping | Final home shows four distinct covers |
| 8 | Mobile search button wrapped below input | First mobile home capture | Removed the ≤480px wrap rule | Final mobile capture shows inline input + Cari |

## 5. Remaining limitations and mismatches

1. **Stock imagery is generic, not official uniform photography.** The eight
   Pexels assets are real garments, but not verified uniforms of the demo
   schools. Every gallery and footer says so. No school logo or insignia is
   claimed.
2. **Same photograph may appear in more than one demo school.** This is an
   accepted demo-data limitation, disclosed by the global demo labels and
   per-photo credit; it is not an inventory claim.
3. **Hero is a real-photo collage, not the reference's cut-out uniform pair.**
   The available licensed assets do not include an isolated burgundy uniform
   pair, and fabricating one is prohibited. Structure and colour language are
   preserved.
4. **Mobile detail identity photo is larger than the reference thumbnail.**
   Intentional legibility choice; tabs, two-column gallery, and download
   placement match.
5. **Admin authentication is not secure by design.** Login is a visual demo;
   admin routes are openly reachable and say so. No password is stored.
6. **No backend or multi-user persistence.** Changes are browser-local and can
   be reset. The admin demo bar states this.
7. **Pixel-level comparison is qualitative.** The reference is a composite of
   multiple screens at different scales; exact pixel cloning was not attempted
   or claimed.

## 6. Automated checks

- Final runs: **0 horizontal overflow, 0 broken images, 0 missing alt, 0
  unlabeled controls, 0 unnamed interactive elements, 0 console errors, 0 page
  errors, 0 axe violations** across the final captured screens.
- `npm run verify:bootstrap`: **35/35 checks passed** (2026-11-11, after the
  Chrome-for-Testing CDN became reachable again).
- `npm run validate:assets -- --require-assets`: **8 assets, 0 errors, 0
  warnings**.
- `cd site && npm run build && npm run lint && npm run typecheck && npm test`:
  all pass; **36 tests**.
- Functional browser checks: search, filter, sort, reset, tabs, preview,
  single download, ZIP download, menu dialogs, school create/edit/delete,
  photo upload/delete, category description save/restore, demo user add.

### Commerce and SVG zero-check

- Source search for `cart|checkout|price|buy|shop|payment|promo|sale` in
  `site/src` returns only the About page's negative statement ("Tanpa keranjang
  atau checkout") and a test assertion that "Shop by layer" is absent. No `/cart`
  or `/shop` route exists in `site/src/App.tsx`.
- Rendered pages contain no price, currency, buy, or add-to-bag UI.
- `npm run validate:assets -- --require-assets` confirms all eight content
  images are raster photos. A source scan finds `<svg>` only in
  `components/Icons.tsx` for icons and the brand mark; no garment is drawn with
  SVG/CSS/Canvas.

## 7. Gate result

**G7 — Browser-based visual QA: PASSED**, with the minor, documented
asset/content mismatches above. Screenshots were captured at 390/768/1440 and
inspected as images; no critical or major visual defect remains, and no
shopping/cart/checkout/pricing UI is present.

## 8. Nafa v2 minimal-change QA (2026-11-13)

**Scope:** preserve the existing visual design and every seeded record/photo,
remove public demo/download/public-user UI, and reduce admin to client name +
multiple photos.

**Inspector:** `opencode-go/deepseek-v4.1-flash` (vision-capable), 2026-11-13.
PNGs were opened with the `read` tool as image content.

### Capture locations

- Before: `artifacts/nafa-v2/before/{home,listing,detail,admin-dashboard,admin-list,admin-create,admin-login}/`
- After: `artifacts/nafa-v2/after/{home,listing,detail,admin-dashboard,admin-list,admin-create-final,admin-login-final,categories,about}/`
- Interactions: `artifacts/nafa-v2/after/interactions/`

Every after run reported **0 console errors/warnings, 0 axe violations, 0 broken
images, 0 missing alt text, 0 unlabeled controls, and 0 horizontal overflow** at
390�844, 768�1024 and 1440�900. The same was true for the before runs.

### Inspection record

- **Homepage:** same white navbar, burgundy brand, pink two-column hero, photo
  collage, four category cards, filter/sort row, four client cards, explainer
  band and burgundy footer. Copy is now portfolio/client-oriented. The "Data
  demo" badge and download badge are gone; the hero and card geometry are
  unchanged. Mobile retains the stacked composition and readable controls.
- **Listing:** same page hero, search, filter/sort and card grid. "Daftar
  Sekolah" is now "Portofolio Klien"; the demo note is absent. No empty state or
  count regression: 12 clients render.
- **Detail:** same identity row, Galeri/Informasi tabs, four-column desktop photo
  grid, mobile two-column grid and related cards. The bulk download button and
  per-photo download control are gone. The lightbox viewport screenshot shows a
  full-screen photo, close control, category, credit/license links and `1 / 4`
  navigation; no download button.
- **Admin create:** same burgundy sidebar/topbar, panel cards, field controls and
  submit/cancel placement. The large school form is replaced by one required
  name field, one required multi-photo dropzone, and a collapsed "Informasi
  tambahan (opsional)" section. No category is required.
- **Admin edit:** all six existing photos for SDN 001 Bandung remain visible with
  a "Sampul" marker and individual remove controls. The layout holds at 390 and
  1440.
- **Admin list/dashboard:** cover thumbnails, client names, optional category,
  photo counts and actions are legible. No demo badge, user stat, user menu or
  reset-data button remains.
- **Categories/About/Login:** same card/grid/hero composition; copy is
  professional and the login card states the local-only readiness limitation.

### Justified visual differences

All differences are attributable to the v2 requirements: removed demo/download/
user controls, portfolio/client wording, cover thumbnails in the admin table,
and the simplified admin form. No palette, type scale, spacing scale, hero,
navbar, gallery grid, card design or responsive breakpoint was changed.

### Functional checks in the browser

- Search "Sukajadi" returned 1 client.
- Detail lightbox opened, next/previous and Escape worked; 0 download buttons and
  0 `a[download]` anchors.
- Admin create with 2 photos, optional category omitted: published and visible
  publicly.
- Admin edit added 1 photo and removed 1 existing photo with confirmation; the
  other photo and client name remained.
- Delete confirmation appeared; test portfolio deletion returned the list to 12.
- A temporary portfolio survived a browser reload, then was deleted; final
  localStorage counts were 12 clients / 62 photos / 3 retained user records.
- Old `/admin/kategori`, `/admin/foto`, `/admin/foto/baru`, `/admin/pengguna`
  URLs redirect to the portfolio list.

### Text scan

Across 10 rendered routes, `body.innerText` contained **0** matches for
`demo|test|sample|dummy|mock|prototype|staging|contoh|percobaan|uji coba` and
**0** download/unduh wording. Public-user wording scanned on 9 routes returned
**0** matches. Raw output: `artifacts/nafa-v2/text-scan.txt`.

### Gate result

**V2 visual preservation and public-feature/QA gate: PASSED** for the local build
at 390/768/1440. Production auth/storage/content approval remains **BLOCKED** and
is not a visual QA pass.
