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

---

Add new entries above this line, keeping the same fields and a sequential ID.
