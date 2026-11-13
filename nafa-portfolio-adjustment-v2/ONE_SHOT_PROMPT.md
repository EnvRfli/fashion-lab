# OpenCode Build — One-shot Minimal-Change Adjustment (Nafa Collection v2)

> EXECUTE; do not merely summarize. This is a change request for an EXISTING, WORKING website. **Preserve its current appearance and data.** No redesign, no cleanup of seeded content, no bootstrap reinstallation.

## Your role

Senior Frontend Engineer, Product Simplification Lead, Data-Migration Safety Reviewer, Visual Regression QA Lead.

## Mission

Adjust the current Nafa Collection / Galeri Seragam portfolio website so visitors browse **client name + list of garment project photos**, while the **single administrator** can create a portfolio by entering only **client name + multiple images**. Keep the existing website's successful layout/design and EVERY existing dummy/seeded/client record and photo. Remove only prototype-related labels from PUBLIC UI. No public users, no download actions.

## Mandatory source documents

Read in this order:

1. `AGENTS.md` and relevant existing rules/skills.
2. `nafa-portfolio-adjustment-v2/specs/01-CORRECTED_PROJECT_BRIEF.md`
3. `nafa-portfolio-adjustment-v2/specs/02-DESIGN_AND_ROUTE_LOCK.md`
4. `nafa-portfolio-adjustment-v2/specs/03-SIMPLE_ADMIN_UX.md`
5. `nafa-portfolio-adjustment-v2/specs/04-DATA_PRESERVATION.md`
6. `nafa-portfolio-adjustment-v2/specs/05-COPY_AND_FEATURE_POLICY.md`
7. `nafa-portfolio-adjustment-v2/specs/06-PRODUCTION_INTEGRATION.md`
8. `nafa-portfolio-adjustment-v2/specs/07-ACCEPTANCE_AND_QA.md`
9. `nafa-portfolio-adjustment-v2/specs/08-EXECUTION_AND_RECOVERY.md`
10. Existing app code, app data, routing, `docs/PROJECT_BRIEF.md`, `docs/DESIGN_ALIGNMENT.md`, `docs/PHASE_STATUS.md`, current visual screenshots, tests, Vercel configuration.

If this package conflicts with the earlier `nafa-portfolio-realignment` v1 or older project brief, **this v2 package takes priority**. Annotate older docs as superseded where necessary; do not delete history or real data.

## Absolute invariants

- DO NOT change the currently accepted visual direction. Current rendered UI is the design baseline. Minimal local adjustments for removing UI elements / simplifying forms are permitted; keep color, font, hero, grid, card design, spacing and responsiveness.
- DO NOT delete, hide wholesale, discard, truncate, reseed from scratch, or replace ANY existing seeded/dummy/client/portfolio data or photos. Preserve IDs/slugs and image associations where possible. The existing public portfolio gallery MUST remain populated and navigable.
- UI copy must not visibly contain `Demo`, `Test`, `Sample`, `Dummy`, `Mock`, `Prototype`, or equivalent staging badges. This applies to user-facing labels only, not developer tests, fixtures, code identifiers, or logs. Do not mechanically rewrite client names, legal names, photo paths, URLs, or file names that coincidentally contain these words.
- NO gallery/photo download buttons, download-all ZIP, or download links in UI. Lightbox/preview stays. You cannot prevent browser image saving completely; do not claim to.
- NO public sign-up, public login, visitor profile, user management or role management. One authorized admin login is retained.
- Admin must have **only TWO REQUIRED INPUTS** for a new item: `Nama klien` and `Foto hasil pekerjaan` (multiple image upload). `Kategori`, `Keterangan` may be optional and hidden in an expandable section or omitted; derive cover, slug, timestamps, photo count automatically.
- Do NOT change tech stack or rewrite the application merely because another stack is fashionable.
- Do NOT push, deploy, buy services, reset databases, migrate destructive changes, or expose secrets.

## Phase A — Audit + safety baseline

- Detect app root (may be `site/`), routes, data sources (in-memory seeded data, JSON, localStorage, DB), admin auth, upload system, and runtime build. Inspect Git working tree; NEVER overwrite uncommitted work.
- Capture screenshots of EXISTING homepage, listings, portfolio detail and admin pages at 390px/768px/1440px; where browser access is available, save them to `artifacts/nafa-v2/before/`. Inspect actual pixels if the tool/model supports vision.
- Inventory ALL existing seeded/client records and referenced image files; record total counts, IDs/slugs, cover images and a hash/identifier snapshot in `docs/NAFA_V2_BASELINE.md`. Include known omissions, if any. Do not invent successful inspection results.
- Make a safe, recoverable Git checkpoint/branch without discarding user changes. If the repository is dirty, avoid force checkout/reset/clean and document a non-destructive checkpoint.

## Phase B — Minimal change plan (then CONTINUE)

- Produce `docs/NAFA_V2_CHANGE_PLAN.md`: what stays untouched, what changes, and how each change preserves the existing page layout and data.
- Any existing filters/card groupings can remain if they help browsing; make category admin input optional/derived. Do not remove working layout structures just to simplify the data model.
- Keep existing URLs where feasible to preserve bookmarks. If changes are absolutely necessary, include redirects rather than breaking old links.
- Conflicting v1 instructions to remove existing demo data or redesign the website are superseded.
- Continue implementation autonomously. Do not stop after the audit or plan.

## Phase C — Surgical implementation

- Public: retain current homepage/portfolio layouts and all current example entries/images; remove only unwanted demo/staging UI text, any download actions, and visitor-account UI if present. Keep image preview/lightbox and browse/search behavior. Avoid broad visual changes.
- Admin: keep current admin design language but simplify create/edit flow: `Nama klien` + multi-image upload + `Simpan & Publikasikan`; optional fields in `Informasi tambahan`. Cover first photo automatically, allow edit/add/remove and portfolio delete with confirmation. Do not force manual school metadata, category master or photo entries one by one.
- Admin security/storage: reuse existing real backend/auth/storage if present. If absent, implement a safe integration contract and actual adapter as far as possible without inventing credentials, but preserve existing public seeded data and do not fake persistence. Distinguish readiness from visual implementation.
- Do not auto-remove or silently replace historical data. Add compatibility adapters or additive schema migrations if the data model changes. Make deletions opt-in, explicit, and confirmed.

## Phase D — Verification and regression

- Run existing bootstrap verification and tests without weakening them. Test before/after record counts, IDs/slugs and image associations. Run production build, asset validation and relevant tests.
- Run visual comparisons at 390/768/1440. The goal is **visual preservation**, not an aesthetic redesign. Compare layout/spacing/typography/card density before vs after; explain justified small changes.
- Functional checks: browse current seeded items, search, open client gallery, preview photos; no download UI, no visitor login, no demo badge; admin login, simple create + multi-upload + edit/add/remove with honest persistence outcomes.
- Check existing Vercel app/root/build configuration but do not change working deployment configuration unnecessarily.

## Phase E — Documentation/report

- Update `docs/PROJECT_BRIEF.md` and `docs/DESIGN_ALIGNMENT.md` conservatively to match this package, but DO NOT overwrite or delete unrelated history. Store `docs/NAFA_V2_EXECUTION_REPORT.md` and update `docs/PHASE_STATUS.md` with test evidence and blockers.
- Final report MUST include: files changed, original vs final seeded-item count, original vs final image count or verified references, existing routes preserved, screenshots, visual differences, removed public UI labels, admin form fields, auth/storage status, local verification, and any production release blockers.
- Do not say "production ready" without verified authentication, writable persistent storage, image rights/approval, and relevant runtime tests.

## Autonomy and failure handling

Complete as much as possible end-to-end in this session. Solve ordinary code issues. Do not request approval for minor implementation decisions. Stop early only for a genuine external access/credential/authorization blocker; in that case, leave the site and seed data intact, record specific blockers, and clearly separate completed work from incomplete work. Never claim unperformed checks passed.

**Begin now.**
