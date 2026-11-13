# Nafa Collection — Corrected Project Brief v2

## Status & priority

**Authoritative modification brief for the EXISTING working website.** Supersedes any older instruction to delete dummy records, start the site over, or replace the currently accepted design with a new style. Existing UI design/layout is approved. Existing data and images are explicitly to be preserved.

## Business / what this website actually does

- Website for a clothing manufacturer/convection service (Nafa Collection).
- Public visitors see past work organized as **client name + portfolio photos**.
- Clients are frequently schools, but can also be pesantren, companies or other organizations. **Do not force a school-only data model.**
- This is NOT e-commerce and does NOT need carts, checkout, product prices or orders.
- This is NOT a multi-user service. There is no public user account. **Only an administrator** manages content.

## Existing work is valuable — preserve it

- Website already has an accepted visual layout. **Do not redesign it** or replace its visual identity.
- Existing dummy/seeded sample clients/photos are already used to populate the website. **KEEP ALL of them.** They remain visible and navigable. Do not reset the DB, delete seed/fixture records, replace all images, rewrite names or set the public site to an empty state.
- Remove the visible `Demo`, `Test`, `Sample`, `Dummy` and similar prefixes/badges/labels from the **published interface only**. Keep tests, seeded datasets and dev-only identifiers as-is.
- Maintain existing functional routes/search/cards/filters unless a specific feature must be removed per this brief. Avoid unnecessary redirects or restructures.

## Public pages — simplify functionality, preserve composition

1. **Homepage** — same approved hero, navbar, colors, spacing and portfolio cards; public copy should describe clothing production/portfolio without demo wording.
2. **Portfolio / client listing** — existing cards, photos, search and optional browsing controls. Client name and cover photo must be prominent. No product prices or shopping CTAs.
3. **Portfolio detail** — client name and all photos from that client; click image to preview/lightbox; keep photo gallery styling.
4. **About / contact** — keep existing if already present and factual; do not invent phone, address or achievements.
5. **Responsive** — continue to support mobile, tablet and desktop using existing visual system.

**Do not add:** image download / download all ZIP, public account registration or login, visitor profile, shopping/cart/checkout, elaborate school information forms, compulsory school metadata.

## Admin content management — minimum effort

- Single admin login: retain and secure the real authorized admin entrypoint.
- Minimal portfolio list view, keeping current design where possible.
- `Tambah Portofolio` must only require:
  1. **Nama klien** (text)
  2. **Foto hasil pekerjaan** (one or more image files, selected simultaneously)
- One submit action: **Simpan & Publikasikan**.
- `Kategori` and `Keterangan` are OPTIONAL (hide under `Informasi tambahan` if useful), never force them.
- Slug, photo count, timestamps, cover photo are automatic; no separate creation step for photo items.
- Edit current client, add more images, remove specific images, delete portfolio with confirmation. No user-management UI.

## Design rules

- Current site is the baseline: maintain present palette, type, header, cards, hero, page spacing, forms and responsive composition.
- Do not change design merely to make it "more elegant" or to mimic a different reference screenshot.
- Small layout adjustments are allowed only to remove prohibited controls and simplify admin form; keep visual hierarchy and styling consistent.
- Capture before/after screenshots to prove minimal change.

## Existing data and truthful public content

- All existing seeded/demo/sample records and linked photos must remain intact. They can be used to render and regression-test the existing site.
- Hiding the word "Demo" is a UI copy decision, **not permission to claim an invented school is a verified paying client**. Before real production publication, obtain owner approval for portfolio identities, photos and rights where necessary; do not fabricate endorsements, contracts or results.
- Do not automatically replace the current public listing with an empty state due to unconfigured backend.

## Release rules

- Existing site must continue to build and run. Prefer existing stack and hosting config.
- Admin writes in production must be authenticated/authorized and stored durably, not falsely acknowledged via frontend-only state.
- Upload storage must be persistent on a suitable backend, not solely ephemeral filesystem in Vercel.
- If external credentials or content permissions remain unresolved, implement available portions and report readiness honestly. Do not deploy/push without explicit permission.
