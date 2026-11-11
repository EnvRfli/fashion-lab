---
description: Build a frontend site from a project brief with the phased design-first workflow
agent: build
---

You are executing a real frontend project in this repository. The repository is
the workflow system; the website belongs in `site/` unless `docs/01` records a
different location.

## Brief

The project brief is:

$ARGUMENTS

If the brief is empty, stop immediately and ask for the brief. Do not invent a
product, audience, pages, content, or visual direction. If the brief is a path,
read that file before continuing.

## Mandatory startup

1. Read `AGENTS.md` and treat it as binding.
2. Read `docs/WORKFLOW.md`, `docs/QUALITY_GATES.md`, and
   `docs/PHASE_STATUS.md`.
3. Run `npm run verify:bootstrap`. If it fails, fix the setup or report the
   blocker. Do not start project work on a failing toolchain.
4. Load these skills explicitly through the `skill` tool:
   - `frontend-design`
   - `web-design-guidelines`
   - `agent-browser`
5. Before the first browser command, run:
   `npx --no-install agent-browser skills get core`
6. Record the exact brief in `docs/01-product-brief.md`, preserving the user's
   words in the quoted block. Mark interpretations `[PROPOSED]`.

## Execution rules

- Execute Phases 0–8 in order. A phase may start only when the previous phase is
  recorded `PASSED` with evidence.
- Update `docs/PHASE_STATUS.md` after every phase. Record the command, evidence,
  and checkpoint commit.
- Commit after each passing phase. Do not tag unless the user asks.
- The default mode is `autonomous`. If the brief says `Mode: approval`, stop at
  the Phase 2, 4, 5, and final checkpoints and wait for an explicit human
  decision. Never assume approval.
- Persist every design decision and rejected alternative in
  `docs/DECISIONS.md`.
- `docs/04-design-system.md` is the single source of truth. Generate tokens with
  `npm run tokens:build`; do not hardcode visual values in components.
- Real product photographs only. Never use SVG, CSS, HTML shapes, Canvas, emoji,
  procedural placeholders, or unauthorized AI images for physical products.
- Download and validate every photo; record source, creator, license, license
  URL, access date, hash, dimensions, alt text, and demonstration status in
  `docs/03-asset-manifest.md`.
- If suitable photos cannot be obtained, stop and report a blocker. Do not
  substitute a fake product image.
- Do not invent inventory, school names, testimonials, statistics, or licenses.
- Do not deploy, change authentication, or change provider settings.
- Do not overwrite or delete user files outside the task.

## Phase expectations

Follow `docs/WORKFLOW.md` for the full inputs, outputs, acceptance criteria,
failure conditions, and recovery. In summary:

- **Phase 0:** verify environment; record the real brief and mode.
- **Phase 1:** product, audience, journeys, routes, content provenance,
  non-goals.
- **Phase 2:** at least three verified visual references with screenshots and
  analysis; select a justified direction or request approval.
- **Phase 3:** source real photographic assets, download them, validate them,
  and complete the manifest. Run `npm run validate:assets -- --require-assets`.
- **Phase 4:** define the design system and tokens; measure contrast; generate
  tokens.
- **Phase 5:** wireframes and page specifications for every route and state.
- **Phase 6:** implement in `site/` with real assets, tokens, semantic HTML, and
  real interactions. Run build, lint, typecheck, tests, and asset validation.
- **Phase 7:** run `npm run qa:visual -- --url <running-url>`, then inspect every
  screenshot with the `read` tool (or a human reviewer). Check all required
  areas. Fix and re-inspect.
- **Phase 8:** re-run all gates, re-inspect final screenshots, verify against the
  brief, and write an evidence-based completion report.

## Non-negotiable verification

- A screenshot file is not a visual pass. If images cannot be inspected, record
  `BLOCKED — visual inspection unavailable` and use a human or a user-approved
  vision-capable reviewer. Never claim a visual review that did not happen.
- A phase with failing or missing evidence is not complete.
- If a real blocker occurs, record problem, evidence, impact, corrective action,
  and owner in `docs/PHASE_STATUS.md`, then stop and report it.

## Completion

When the work is complete:

1. Update `docs/06-visual-qa.md` with findings and the inspection statement.
2. Update `docs/PHASE_STATUS.md` with every gate result and the final commit.
3. Produce a concise completion report containing:
   - what was built and where
   - gates and evidence
   - verified functionality
   - visual QA inspector and screenshots
   - asset manifest and validation result
   - known limitations
   - blockers, if any
4. Do not deploy. Do not claim success for anything not verified.
