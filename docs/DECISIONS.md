# Decisions

Durable decision log. Each entry records what was decided, why, and what was
rejected. Project-specific visual and technical decisions are added during
Phases 0–8. Do not rewrite history; supersede with a new entry.

## Status

- `[PROPOSED]` — suggestion, not binding.
- `[APPROVED]` — human approval, or an autonomous decision recorded with
  rationale.
- `[SUPERSEDED]` — replaced by a later entry; keep for history.

---

## Bootstrap decisions

### D-001 — Workflow tooling at the repository root; website in `site/`

- **Date:** 2026-11-11
- **Decision:** Keep the workflow, scripts, skills, and documentation at the
  repository root. The future frontend application lives in `site/`.
- **Rationale:** Isolates agent tooling from the application, allows the site to
  have its own framework and lockfile, and keeps bootstrap verification stable.
- **Alternatives rejected:** Scaffolding the website at the root now (would mix
  tooling and app dependencies and prejudge the framework).
- **Status:** `[APPROVED]` (autonomous bootstrap decision)

### D-002 — Install skills with the official CLI into `.agents/skills`

- **Date:** 2026-11-11
- **Decision:** Use `npx skills add` with `-a opencode --copy` for the three
  required skills. Commit the copied skill files and `skills-lock.json`.
- **Rationale:** Official path supported by OpenCode; copy mode avoids Windows
  symlink problems and makes the repository self-contained.
- **Alternatives rejected:** Global installation (not project-local); manual
  copying (loses lock-file provenance and update tracking).
- **Status:** `[APPROVED]` (autonomous bootstrap decision)

### D-003 — Project-scoped `agent-browser` with Chrome for Testing

- **Date:** 2026-11-11
- **Decision:** Install `agent-browser` as a project dev dependency and install
  Chrome for Testing through `agent-browser install`.
- **Rationale:** Reproducible browser tooling without a global dependency; the
  system Chrome remains available as a fallback.
- **Alternatives rejected:** Global install; Playwright/Puppeteer (not required
  by the selected skill).
- **Status:** `[APPROVED]` (autonomous bootstrap decision)

### D-004 — Machine-readable manifest embedded in `docs/03-asset-manifest.md`

- **Date:** 2026-11-11
- **Decision:** Keep the asset manifest as a JSON block between explicit markers
  inside the Markdown document. The validator reads only that block; the rest of
  the document is the human record.
- **Rationale:** Single source of truth for assets without duplicating data
  between a Markdown table and a separate JSON file.
- **Alternatives rejected:** Separate `assets/manifest.json` (risk of drift);
  parsing the Markdown table (brittle).
- **Status:** `[APPROVED]` (autonomous bootstrap decision)

### D-005 — Design tokens generated from `docs/04-design-system.md`

- **Date:** 2026-11-11
- **Decision:** The canonical token JSON block lives in the design-system
  document. `scripts/build-tokens.mjs` generates CSS custom properties.
- **Rationale:** The approved design system remains the single source of truth;
  generated CSS cannot silently diverge.
- **Alternatives rejected:** Hand-maintained CSS variables (drift); tokens only
  in code (design memory lost).
- **Status:** `[APPROVED]` (autonomous bootstrap decision)

### D-006 — QA runner captures and measures but cannot grant a visual pass

- **Date:** 2026-11-11
- **Decision:** `scripts/visual-qa.mjs` always records
  `visualInspection: "PENDING"`. A pass requires a human or vision-capable model
  to inspect the screenshots.
- **Rationale:** Automated DOM/console checks cannot judge layout, typography,
  imagery quality, or visual regressions.
- **Alternatives rejected:** Treating zero automated findings as a visual pass
  (false confidence).
- **Status:** `[APPROVED]` (autonomous bootstrap decision)

### D-007 — Do not change provider, model, or authentication settings

- **Date:** 2026-11-11
- **Decision:** The workflow inherits the active OpenCode provider/model. The
  `/build-site` command sets no model and the repository adds no provider
  configuration.
- **Rationale:** The user required the existing setup to be used and not changed.
- **Alternatives rejected:** Pinning a model in the command (violates the brief
  and reduces portability).
- **Status:** `[APPROVED]` (user requirement)

### D-008 — Attached mockup is not an approved brief

- **Date:** 2026-11-11
- **Decision:** The school-uniform mockup attached to the bootstrap conversation
  is not stored or treated as an approved project brief. If the user supplies it
  as a file under `docs/references/`, it may be used as a visual reference in
  Phase 2, but Phase 0 still requires a real brief.
- **Rationale:** A mockup shows possible UI, not product truth, audience,
  content, licensing, or scope. The next session has no access to the chat.
- **Alternatives rejected:** Reconstructing the mockup or treating it as
  requirements (would fabricate a project).
- **Status:** `[APPROVED]` (bootstrap decision; user may supersede by supplying
  a brief and reference file)

---

## Project decisions

### D-009 — Provisional brand: Fairholt Schoolwear

- **Date:** 2026-11-11
- **Decision:** Use **Fairholt Schoolwear** as the working brand name, with a
  simple "F" monogram/wordmark rendered as SVG (logo, permitted). The brand is
  fictional and the site states that products and prices are illustrative.
- **Rationale:** The brief explicitly permits a proposed provisional identity.
  "Fairholt" reads as an established English outfitter without borrowing a real
  school or retailer identity. It is a composite word, not a verified trademark
  clearance.
- **Alternatives rejected:** Copying the reference's "Galeri Seragam" identity
  (prohibited brand copying); a literal school name (would imply a partnership);
  an abstract tech-style name (wrong category language).
- **Approval:** autonomous, recorded 2026-11-11.
- **Status:** `[APPROVED]`

### D-010 — Demonstration commerce model with persistent labelling

- **Date:** 2026-11-11
- **Decision:** The storefront is explicitly a demonstration. A slim global
  notice and per-product "Sample price" labels identify illustrative content.
  Checkout ends in a demonstration explanation, never a payment form. The cart
  is local-only via `localStorage`; no backend calls.
- **Rationale:** The brief requires sample product content to be identified and
  forbids real order processing. Labelling at the point of use keeps the site
  honest even when a screenshot is shared out of context.
- **Alternatives rejected:** A single line buried in the footer (easy to miss);
  simulating a checkout form (misleading); inventing stock availability.
- **Approval:** autonomous, recorded 2026-11-11.
- **Status:** `[APPROVED]`

### D-011 — Catalogue sized to verified photography

- **Date:** 2026-11-11
- **Decision:** Target eight products across at least four garment categories,
  but treat the verified photo set as the constraint. Product records are
  defined after Phase 3, not before.
- **Rationale:** The workflow requires real photographs before high-fidelity
  design. Fixing a twelve-product catalogue first would pressure the project
  into unsuitable or unlicensed imagery.
- **Alternatives rejected:** Designing a fixed catalogue and finding images
  afterwards; using a single photo for multiple products (misrepresentation).
- **Approval:** autonomous, recorded 2026-11-11.
- **Status:** `[APPROVED]`

### D-012 — Visual direction: The Outfitter's Ledger

- **Date:** 2026-11-11
- **Decision:** Select Option A from `docs/02-visual-references.md`: oxblood and
  blush brand fields, cool chalk product surfaces, Fraunces display + Archivo
  text, hairline "ledger" rules, a timetable-like stage rail, and 20px-radius
  product media. Reject the term-list and playground colour-block directions.
- **Rationale:** It is the only option that carries the supplied mockup's warm
  crimson identity while remaining credible for parents and school staff, and
  its ledger structure comes from the subject (uniform requirement lists) rather
  than from a generic e-commerce template. It also works with garment-focused
  stock photography rather than requiring cut-outs.
- **Alternatives rejected:** Option B (form-like; invites invented uniform
  requirements); Option C (loud, less trustworthy, requires cut-out photography
  we may not have).
- **Approval:** autonomous, recorded 2026-11-11.
- **Status:** `[APPROVED]`

### D-013 — Design system: The Outfitter's Ledger tokens

- **Date:** 2026-11-11
- **Decision:** Adopt the palette, type, layout, shape, motion, and component
  rules in `docs/04-design-system.md`. Key values: oxblood `#7A2230`, deep
  oxblood `#521720`, blush `#F6E5E3`, chalk `#FBF9F5`, ink `#1E2430`; Fraunces
  Variable display + Archivo Variable text; 1240px shell; 20px product media;
  flat bordered cards; oxblood focus rings; reduced-motion support.
- **Rationale:** The palette carries the supplied mockup's crimson/blush
  identity without copying it, while the ledger structure and flat card system
  avoid generic AI/SaaS patterns and suit the mixed stock photography. All
  measured text pairs pass WCAG AA.
- **Alternatives rejected:** Navy/white direct-reference palette (too close to
  Stevensons); forest/orange and cobalt mosaic (rejected in Phase 2); identical
  soft-shadow cards (generic; weak hierarchy).
- **Approval:** autonomous, recorded 2026-11-11. Tokens generated with
  `npm run tokens:build -- --require` (78 tokens).
- **Status:** `[APPROVED]`

### D-014 — URL-driven catalogue state and local-only bag

- **Date:** 2026-11-11
- **Decision:** Category, stage, search, and sort live in URL search params;
  the bag lives only in `localStorage` under `fairholt.bag.v1`. There are no
  network calls, accounts, or server state.
- **Rationale:** Shareable, back-button-correct filtering with no backend; the
  brief requires a functional local demonstration cart and excludes real order
  processing.
- **Alternatives rejected:** React-only filter state (not shareable, breaks on
  refresh); session storage (lost between visits); mocked API (implies a
  backend that does not exist).
- **Approval:** autonomous, recorded 2026-11-11.
- **Status:** `[APPROVED]`

### D-015 — Supersede the e-commerce brief with Galeri Seragam

- **Date:** 2026-11-11
- **Decision:** The corrected `docs/PROJECT_BRIEF.md` is the only active product
  brief. The former Fairholt storefront brief, routes, cart, prices, and design
  direction are historical and must not drive active work.
- **Rationale:** The user supplied a corrected product direction and a primary
  composite reference: School Directory + Uniform Gallery + Admin CMS. Keeping
  the old brief active would preserve forbidden commerce behavior.
- **Alternatives rejected:** Re-skinning the storefront while retaining cart or
  prices; creating a new repository and losing the verified bootstrap.
- **Approval:** autonomous, recorded 2026-11-11.
- **Status:** `[APPROVED]`

### D-016 — Partial application-layer rebuild

- **Date:** 2026-11-11
- **Decision:** Keep the repository, bootstrap scripts, skills, browser setup,
  Vite/React/TypeScript/Tailwind foundation, and asset validator. Replace the
  application layer: routes, pages, commerce state, product data, and visual
  CSS.
- **Rationale:** The technical foundation is healthy and verified; only the
  product direction and application code are wrong. A full restart would
  discard working tooling without benefit.
- **Alternatives rejected:** Incremental re-skin (would leave commerce logic and
  editorial assumptions); complete bootstrap restart (unnecessary risk).
- **Evidence:** `docs/REALIGNMENT_AUDIT.md`, `docs/MIGRATION_PLAN.md`,
  checkpoint `ef09a4f`.
- **Approval:** autonomous, recorded 2026-11-11.
- **Status:** `[APPROVED]`

### D-017 — Galeri Seragam visual system

- **Date:** 2026-11-11
- **Decision:** Use burgundy `#8E1B2B`, white surfaces, soft pink gradients,
  Plus Jakarta Sans, compact level cards, a directory toolbar, 2-column mobile
  galleries, and a burgundy admin rail.
- **Rationale:** The primary reference shows a friendly, functional education
  directory, not a luxury fashion store. The new system preserves its
  burgundy/white/pink hierarchy while remaining accessible.
- **Alternatives rejected:** The old editorial serif/cream/brass system;
  neutral SaaS blue; a direct pixel clone of the composite.
- **Evidence:** `docs/04-design-system.md`; generated 91 tokens; measured WCAG
  contrast table.
- **Approval:** autonomous, recorded 2026-11-11.
- **Status:** `[APPROVED]`

### D-018 — Demo data labels and stock-photo reuse

- **Date:** 2026-11-11
- **Decision:** Seed 12 illustrative schools, 62 photo records, 4 canonical
  categories, and 3 demo users. Reuse the eight verified Pexels photos across
  demo galleries, always labelled as demonstration imagery with creator,
  source, and licence. Derive every count from records.
- **Rationale:** The brief requires a working demo dataset but forbids inventing
  official school uniforms or inventory. Labelling and per-photo credit keep
  the demo honest.
- **Alternatives rejected:** Fabricating official uniforms; using unlicensed
  candidate images; SVG/CSS substitutes.
- **Approval:** autonomous, recorded 2026-11-11.
- **Status:** `[APPROVED]`

### D-019 — Admin is a demo, not secure authentication

- **Date:** 2026-11-11
- **Decision:** Provide `/admin/masuk` as a visual demo with no password
  checking, no stored credentials, no route guard claimed as security, and a
  persistent demo bar. Persist demo data in `localStorage` under
  `galeri-seragam.demo.v2`; expose a reset action.
- **Rationale:** The brief forbids fake secure authentication and unsupported
  multi-user claims. Honest demo behavior is more useful than a misleading
  login.
- **Alternatives rejected:** Client-only route guards presented as protection;
  hardcoded credentials; a mock backend.
- **Approval:** autonomous, recorded 2026-11-11.
- **Status:** `[APPROVED]`

### D-020 — Real downloads and real ZIP archives

- **Date:** 2026-11-11
- **Decision:** Fetch actual local photo bytes for individual downloads and
  build bulk archives with `fflate`. Preflight every file; if any fetch fails,
  show an error and do not produce a misleading partial archive. Disable the
  action when no photos exist.
- **Rationale:** The brief requires real bytes or an honest disabled state, not
  a simulated success.
- **Evidence:** Browser test produced a 6-file ZIP (2,647,911 bytes);
  `01-kemeja-putih.jpg` … `06-rel-seragam.jpg`.
- **Approval:** autonomous, recorded 2026-11-11.
- **Status:** `[APPROVED]`

### D-021 — Upload handling is photographic and bounded

- **Date:** 2026-11-11
- **Decision:** Accept only JPG/PNG/WebP raster files up to 2.5MB, preview them,
  and resize/compress real photos only to fit browser storage. Store as data
  URLs. No generated or drawn product imagery.
- **Rationale:** Makes the admin demo genuinely usable while respecting the
  photographic asset policy and localStorage limits.
- **Alternatives rejected:** Storing unlimited originals (quota failure);
  accepting SVG (policy violation); sending files to a non-existent backend.
- **Approval:** autonomous, recorded 2026-11-11.
- **Status:** `[APPROVED]`

### D-022 — URL-driven public discovery state

- **Date:** 2026-11-11
- **Decision:** Keep `q`, `kategori`, and `urut` in URL search params for the
  directory; keep the active tab and preview dialog in local UI state. Remove
  the old cart/catalogue state entirely.
- **Rationale:** Shareable, refresh-safe filters with no backend; simpler than
  persisting transient discovery state.
- **Approval:** autonomous, recorded 2026-11-11.
- **Status:** `[APPROVED]`

### D-023 — Visual QA findings and final disposition

- **Date:** 2026-11-11
- **Decision:** Accept the realignment as passing G7 with documented minor
  mismatches: generic stock imagery instead of official uniforms, a photo
  collage instead of cut-out hero garments, and a larger mobile identity photo
  than the reference thumbnail. Fix all automated accessibility/overflow
  findings before sign-off.
- **Rationale:** Structural, colour, and interaction fidelity are strong; the
  remaining differences are asset- or legibility-driven, not commerce drift.
- **Evidence:** `docs/06-visual-qa.md`; final runs at 390/768/1440 with 0 axe
  violations, 0 overflow, 0 console errors.
- **Approval:** autonomous, recorded 2026-11-11.
- **Status:** `[APPROVED]`

### D-024 — Nafa v2 supersedes demo/download/user-model instructions

- **Date:** 2026-11-13
- **Decision:** Treat `nafa-portfolio-adjustment-v2/` as authoritative over the
  earlier demo/download/user-management brief and the commercial baseline. Keep
  the existing visual design and all seeded records/photos; remove only
  prototype labels, download actions and public-user features.
- **Rationale:** The owner explicitly approved the current layout and data
  continuity; v1's destructive/reset direction is superseded.
- **Evidence:** `docs/NAFA_V2_BASELINE.md`, `docs/NAFA_V2_CHANGE_PLAN.md`.
- **Approval:** autonomous, recorded 2026-11-13.
- **Status:** `[APPROVED]`

### D-025 — Optional category and stable public identity

- **Date:** 2026-11-13
- **Decision:** Make category optional on create/edit, keep the existing
  TK/SD/SMP/SMA grouping for browsing, preserve slugs on edit, and derive cover,
  photo count and timestamps automatically. Keep `/sekolah` URLs.
- **Rationale:** Keeps working filters and bookmarks while removing the forced
  school-only form and URL churn.
- **Evidence:** `site/src/data/types.ts`, `demo-store.ts`,
  `AdminSchoolFormPage.tsx`, `App.tsx`; tests for optional category, stable slug
  and cover recalculation.
- **Approval:** autonomous, recorded 2026-11-13.
- **Status:** `[APPROVED]`

### D-026 — Non-destructive copy migration, no reseed/reset

- **Date:** 2026-11-13
- **Decision:** Migrate only exact known seeded description strings from demo
  wording to professional copy; increment seed version but never truncate,
  reseed, reset storage or overwrite administrator-edited descriptions. Remove
  the reset-data UI.
- **Rationale:** Removes prototype labels without losing data or user work.
- **Evidence:** `demo-store.ts` migration, migration unit tests, 12/62/8
  baseline-vs-after comparison with 0 missing IDs/hashes.
- **Approval:** autonomous, recorded 2026-11-13.
- **Status:** `[APPROVED]`

### D-027 — Local-only admin persistence, production backend blocked

- **Date:** 2026-11-13
- **Decision:** Keep the single admin entry point and browser-local persistence
  for this build, but state plainly that it is not server authentication or
  durable object storage. Do not invent provider credentials or claim production
  write readiness. Record S01/S02 as blocked and document the integration
  contract for a future backend.
- **Rationale:** The repository has no backend; faking secure auth or durable
  storage would violate the honesty rules.
- **Evidence:** `AdminLoginPage.tsx`, admin status bar, `docs/NAFA_V2_EXECUTION_REPORT.md`
  §9–§10.
- **Approval:** autonomous, recorded 2026-11-13.
- **Status:** `[APPROVED]` with production blocker

### D-028 — Browser dialog effect cleanup

- **Date:** 2026-11-13
- **Decision:** Do not call `dialog.close()` in the unmount cleanup of
  `PhotoPreviewDialog` or `ConfirmDialog`. Removing the dialog from the DOM is
  sufficient. This avoids a late `close` event during React StrictMode's effect
  replay that dismissed the preview/confirmation immediately in development.
- **Rationale:** Browser verification found the regression; the fix is minimal
  and applies to dev and production.
- **Evidence:** `PhotoPreviewDialog.tsx`, `ConfirmDialog.tsx`; browser lightbox
  and delete-confirmation checks.
- **Approval:** autonomous, recorded 2026-11-13.
- **Status:** `[APPROVED]`

---

Add new entries above this line, keeping the same fields and a sequential ID.
