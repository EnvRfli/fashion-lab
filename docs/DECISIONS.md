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

Add entries here during the build. Suggested format:

### D-0XX — _title_

- **Date:**
- **Decision:**
- **Rationale:**
- **Alternatives rejected:**
- **Approval:** human name/date or autonomous decision reference
- **Status:** `[APPROVED]`
