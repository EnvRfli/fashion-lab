# Workflow — Phases 0–8

This is the operating procedure for a frontend project in this repository. It is
deliberately sequential. The process exists to prevent the common failure mode
of polished-looking UI built on invented products, fake imagery, and unverified
claims.

`AGENTS.md` contains binding rules. `docs/QUALITY_GATES.md` defines the gates.
`docs/PHASE_STATUS.md` is the live state. This file defines the work inside each
phase.

## Operating model

1. Read `AGENTS.md`, this file, `docs/QUALITY_GATES.md`, and
   `docs/PHASE_STATUS.md` before acting.
2. Start at the first phase not marked `PASSED`.
3. For each phase: collect inputs → do the work → produce outputs → run the
   gate → update status → commit a checkpoint.
4. A phase is complete only when its gate has evidence. "Looks done" is not a
   gate result.
5. If a phase fails, follow its recovery instructions. If recovery is impossible,
   record a blocker and stop.
6. Never skip ahead to implementation to avoid an asset or design decision.

## Modes

### Autonomous (default)

- The agent selects and records a justified direction when a visual decision is
  required.
- Record the decision, alternatives considered, and rationale in
  `docs/DECISIONS.md` and the relevant design document.
- Continue without waiting for a human, unless a real blocker appears.
- "Autonomous" never means "invent facts". Missing brief details, unavailable
  photos, or unverifiable licenses are still blockers or questions.

### Approval

- Selected by `Mode: approval` in `docs/01-product-brief.md`.
- Stop at the checkpoints listed below.
- Present the decision, evidence, and trade-offs; wait for an explicit human
  response.
- Record the approver, date, and exact approved scope in `docs/PHASE_STATUS.md`
  and `docs/DECISIONS.md`.
- A non-response is not approval. Do not proceed on assumed consent.

## Phase overview

| Phase | Name | Gate | Human approval |
| --- | --- | --- | --- |
| 0 | Environment and project brief | G0 | Brief itself |
| 1 | Product and audience discovery | G1 | No |
| 2 | Visual reference research | G2 | Approval mode only |
| 3 | Real image asset sourcing | G3 | No |
| 4 | Art direction and design system | G4 | Approval mode only |
| 5 | Wireframes and page specifications | G5 | Approval mode only |
| 6 | Frontend implementation | G6 | No |
| 7 | Browser-based visual QA | G7 | No |
| 8 | Refinement and final validation | G8 | Final sign-off in approval mode |

---

## Phase 0 — Environment and project brief

**Purpose:** prove the workspace is operational and establish the actual project
brief. No design or code work happens here.

### Inputs

- A user-supplied brief, or a path to a brief file.
- This repository and the installed tooling.

### Work

1. Run `npm run verify:bootstrap`. Fix setup failures before continuing.
2. Read the brief exactly as supplied. Do not "improve" requirements silently.
3. Record the brief in `docs/01-product-brief.md`, preserving the user's words
   in a quoted block. Add structured interpretation separately and label it
   `[PROPOSED]`.
4. Record: product, audience, primary job, pages/routes requested, content
   requirements, constraints, brand/legal requirements, mode
   (`autonomous` or `approval`), and explicit non-goals.
5. If the brief is missing essential information (what the product is, who it is
   for, or what success means), stop and ask. Do not invent a product.
6. Confirm the frontend location. Default is `site/`; record deviations.
7. Record the exact framework decision criteria, but do not scaffold yet.

### Outputs

- `docs/01-product-brief.md` with status labels.
- `docs/PHASE_STATUS.md` updated with Phase 0 status and the brief source.
- A recorded mode and next action.

### Acceptance criteria

- The brief is present and attributable (pasted text, file path, or user message
  quoted in the document).
- Product, audience, primary job, scope, and mode are unambiguous.
- No invented requirements or design decisions.
- `npm run verify:bootstrap` passes.
- The frontend location is recorded.

### Failure conditions

- No brief.
- Brief is only a visual reference with no product or content requirements.
- Tooling verification fails and cannot be repaired.
- The brief asks for something this workflow forbids (for example, SVG product
  photos or unlicensed imagery) without resolution.

### Recovery

- Ask the user for the missing brief fields, one concise question at a time.
- Re-run verification and document the exact failure.
- If the brief conflicts with the asset policy, explain the conflict and ask for
  a compliant alternative. Do not silently weaken the policy.

### Checkpoint

Commit the populated brief and status update. Do not commit invented content.

---

## Phase 1 — Product and audience discovery

**Purpose:** turn the brief into a usable product definition before looking at
visual references.

### Inputs

- Approved/recorded `docs/01-product-brief.md`.

### Work

1. Define the product in plain language: what it is, what it is not, and what a
   visitor should be able to do.
2. Define primary and secondary audiences, their context, constraints, and
   likely device mix.
3. Define the primary user journeys and the pages/routes needed to support them.
4. Define content requirements per page: headings, body copy, product data,
   categories, filters, forms, states, and calls to action.
5. Define what content is real, what is supplied by the user, and what must be
   sourced or written. Label every item.
6. Define success criteria and non-goals.
7. Identify legal, licensing, privacy, and accessibility constraints.
8. Record open questions. Do not answer them by assumption if they affect
   product truth.

### Outputs

- Completed `docs/01-product-brief.md` with discovery sections.
- Route/page inventory (also feeds `docs/05`).
- Open questions and constraints in `docs/PHASE_STATUS.md`.
- Decisions recorded in `docs/DECISIONS.md`.

### Acceptance criteria

- Primary audience and primary job are explicit.
- Every requested page has a purpose and a content requirement.
- Content provenance is labeled (`[VERIFIED]`, `[PENDING]`, `[BLOCKED]`).
- Non-goals and constraints are explicit.
- No visual direction has been chosen yet.

### Failure conditions

- The product cannot be explained without inventing facts.
- The page list conflicts with the stated audience or job.
- Required content or data has no source.

### Recovery

- Ask focused questions.
- Reduce scope to what is actually defined rather than filling gaps with
  fictional content.
- Record the reduced scope as `[PROPOSED]` and obtain approval if in approval
  mode.

### Checkpoint

Commit the completed discovery. Gate G1 must pass.

---

## Phase 2 — Visual reference research

**Purpose:** ground the visual direction in real, verified references rather
than generic defaults.

### Inputs

- `docs/01-product-brief.md`.
- Access to a browser and the web.

### Work

1. Research at least three relevant references: direct category peers,
   adjacent-category references, and one non-obvious reference that offers a
   useful structural or typographic idea.
2. For each reference record: URL, access date, what is being referenced
   (layout, type, color, imagery, interaction), and what must **not** be copied.
3. Capture full-page screenshots at desktop and mobile widths into
   `docs/references/` or `artifacts/visual-qa/references/`. Verify each image is
   readable.
4. Analyze the references against the brief. Identify conventions worth keeping
   and conventions worth rejecting.
5. Produce two or three distinct direction options with a compact token sketch
   (color names/hex, type roles, layout concept, one-sentence principle). No
   production code.
6. Select a direction in autonomous mode and record the rationale, or present
   the options in approval mode.
7. Explicitly reject generic AI-design tells if they do not serve the brief
   (cream/serif/clay default, acid-green-on-black, identical rounded cards,
   decorative eyebrows, etc.). The brief wins over this list.

### Outputs

- `docs/02-visual-references.md` with verified references, screenshots, and
  analysis.
- A selected direction, or an approval request.
- `docs/DECISIONS.md` entry for the direction decision.

### Acceptance criteria

- At least three real, reachable references with URLs and access dates.
- Screenshots actually captured and viewable.
- Analysis distinguishes what to use from what not to copy.
- Direction options are specific to this brief, not generic mood words.
- The selected direction has a rationale and is labeled appropriately.

### Failure conditions

- References cannot be reached or verified.
- The direction is a copy of a reference rather than an interpretation.
- The selected direction depends on imagery that Phase 3 cannot obtain.
- Approval mode is active and no approval has been recorded.

### Recovery

- Replace unreachable references with verified ones.
- If screenshots cannot be captured, record the limitation and use textual
  analysis only if the brief permits it; do not claim visual verification.
- If the direction depends on unavailable assets, revise the direction before
  Phase 3.

### Approval checkpoint (approval mode)

Stop after presenting the options. Record the chosen direction exactly.

### Checkpoint

Commit references, screenshots, and the decision. Gate G2 must pass.

---

## Phase 3 — Real image asset sourcing

**Purpose:** obtain the actual photographic assets the design will use. This is
the phase that most often gets skipped; it must not be.

### Inputs

- `docs/01-product-brief.md` (product/content requirements).
- `docs/02-visual-references.md` (imagery direction).
- The full asset policy in `AGENTS.md`.

### Work

1. Build an asset list from the page specifications and content requirements:
   product images, category images, hero images, editorial images, logos, icons.
2. For each **physical product** asset, find a real photograph with clear usage
   permissions. Verify the license and the actual asset page.
3. Download the original file. Store source downloads under
   `assets/downloads/` (or a clearly documented equivalent) and optimized
   derivatives under `site/public/images/`.
4. Validate every file: non-zero size, raster format, decodable image, sensible
   dimensions, hash. Reject corrupt or empty files.
5. Record every asset in the manifest inside `docs/03-asset-manifest.md`:
   - `id`, `kind` (`product`, `editorial`, `logo`, `icon`, `decorative`)
   - `localPath`, `sourceUrl`, `provider`, `creator`
   - `license`, `licenseUrl`, `accessedAt`
   - `sha256`, `width`, `height`, `alt`
   - `demonstration` (true for stock/sourced imagery)
   - `notes` (crop, variant, or restrictions)
6. Label sourced photos as demonstration imagery wherever they are credited and
   in the manifest. Never imply they are the client's real inventory.
7. Create only the derivatives needed. Preserve the original download and hash.
8. Run `npm run validate:assets -- --require-assets`.
9. If a required product photo cannot be sourced or licensed, stop and record a
   blocker. Do not use SVG/CSS/Canvas/emoji/AI substitutes.

### Outputs

- Downloaded and validated image files.
- Completed manifest in `docs/03-asset-manifest.md`.
- Asset validation output in `docs/PHASE_STATUS.md`.
- Blockers, if any.

### Acceptance criteria

- Every required product image exists locally and is a valid raster photograph.
- No product image is SVG, an SVG data URL, CSS/HTML art, Canvas, emoji, or a
  procedural placeholder.
- Every product image has a verified source and license record.
- Hashes and dimensions match the files.
- Stock imagery is labeled as demonstration.
- `validate:assets --require-assets` passes.
- No AI-generated imagery unless explicitly authorized in the brief.

### Failure conditions

- A required image is missing, corrupt, or unlicensed.
- A source URL or license cannot be verified.
- A product image is an SVG or placeholder.
- The only available images are copyrighted retail/brand photos without
  permission.
- The user has not authorized AI generation but it is the only proposed source.

### Recovery

- Search alternative licensed sources.
- Ask the user to supply their own photography.
- Reduce the page scope to omit the unavailable product, and record the scope
  change.
- If none of these work, record a blocker. Never substitute a fake product image.

### Checkpoint

Commit the manifest and downloaded assets only after G3 passes. Do not commit
unverified or unlicensed files.

---

## Phase 4 — Art direction and design system

**Purpose:** turn the brief, references, and real assets into a coherent visual
system that can be implemented consistently.

### Inputs

- `docs/01`, `docs/02`, and verified assets from `docs/03`.
- The actual photographs (not placeholders).

### Work

1. Define the art direction in specific terms: the visual idea, what makes it
   appropriate to this subject, and what it deliberately avoids.
2. Define the design tokens in `docs/04-design-system.md`:
   - Color: base palette, text, surfaces, borders, accent, semantic states;
     every text/background pair must have a contrast check.
   - Type: families, roles, scale, weights, line heights, measure.
   - Layout: grid, max widths, spacing scale, breakpoints, alignment.
   - Shape: radii, borders, elevation, imagery treatment.
   - Motion: durations, easing, reduced-motion behavior.
   - Components: buttons, links, inputs, cards, navigation, badges, empty/error
     states.
3. Check the direction against the brief and the real imagery. If the palette or
   layout only works with placeholders, revise it.
4. Generate tokens:

   ```powershell
   npm run tokens:build
   ```

5. Record decisions and rejected alternatives in `docs/DECISIONS.md`.
6. In approval mode, present the system and stop.

### Outputs

- `docs/04-design-system.md` with the canonical token JSON block and component
  rules.
- `site/src/styles/tokens.css` generated from the canonical block (or a
  documented equivalent if the framework has not been scaffolded yet).
- Contrast results and any exceptions.
- Decision log entries.

### Acceptance criteria

- Tokens cover color, type, spacing, layout, shape, and motion.
- Text/background combinations meet WCAG 2.2 AA unless a documented, justified
  exception exists.
- The system is specific to the brief and uses the real asset direction.
- The canonical JSON block parses and `tokens:build` succeeds.
- No component relies on an undefined token.
- Approval mode has a recorded approval.

### Failure conditions

- The system is a generic template unrelated to the subject.
- Contrast fails without remediation.
- The system depends on unavailable fonts/assets.
- Tokens are duplicated or contradictory.
- Approval mode is active without approval.

### Recovery

- Revise the offending tokens and re-run contrast checks.
- Replace unavailable fonts with a documented fallback.
- Reconcile duplicates by choosing one canonical value and updating all docs.
- If the direction fails against real assets, return to Phase 2 rather than
  forcing it.

### Approval checkpoint (approval mode)

Stop after presenting the token system and component direction.

### Checkpoint

Commit the approved design system and generated tokens. Gate G4 must pass.

---

## Phase 5 — Wireframes and page specifications

**Purpose:** specify exactly what will be built, including responsive behavior,
content, states, and interactions, before writing production UI.

### Inputs

- `docs/01`, `docs/02`, `docs/03`, and `docs/04`.

### Work

1. For each route, produce a wireframe: layout regions, content hierarchy,
   image slots, navigation, actions, and responsive reflow.
2. Wireframes may use greyscale blocks labeled `IMAGE: <asset id>`; they must not
   draw fake garments or use product-like SVG illustrations.
3. Write a page specification per route:
   - purpose and primary action
   - content inventory with real copy or a labeled content source
   - asset IDs from the manifest
   - component inventory and token usage
   - responsive behavior at 390/768/1440
   - interaction states (hover, focus, active, disabled, loading, empty, error,
     success)
   - accessibility acceptance criteria
   - analytics/functional requirements, if any
4. Define the route map and navigation model.
5. Define global states: 404, empty search, no results, form errors, loading.
6. Review for real-world functionality: every button and link has a destination
   or action; forms validate and submit to a real handler; filters actually
   filter.
7. In approval mode, present the wireframes and specs and stop.

### Outputs

- `docs/05-page-specifications.md`.
- Wireframe images or ASCII layouts under `docs/references/wireframes/` or
  embedded in the document.
- Route map and state inventory.
- Updated decisions.

### Acceptance criteria

- Every requested route has a spec and a wireframe.
- Every image slot maps to a manifest asset.
- Responsive behavior is specified at all three widths.
- Interaction and error/empty states are specified.
- Every action has real behavior or an explicit, approved non-goal.
- Accessibility criteria are testable.
- Approval mode has a recorded approval.

### Failure conditions

- A route has no purpose or no content.
- A required asset is missing from the manifest.
- The spec relies on a non-existent backend or fabricates data.
- Mobile behavior is unspecified.
- Approval mode is active without approval.

### Recovery

- Return to Phase 3 for missing assets or Phase 4 for missing tokens.
- Reduce scope explicitly rather than inventing content.
- If a backend is unavailable, specify and implement a clearly labeled local
  demonstration mode, recorded in the brief and specs.

### Approval checkpoint (approval mode)

Stop after presenting the wireframes and page specifications.

### Checkpoint

Commit specs and wireframes. Gate G5 must pass.

---

## Phase 6 — Frontend implementation

**Purpose:** build the specified site with real assets, real behavior, and the
approved design system.

### Inputs

- Approved `docs/04-design-system.md` and `docs/05-page-specifications.md`.
- Verified assets and manifest.
- A recorded framework decision.

### Work

1. Scaffold the frontend in `site/` (or the recorded location). Do not change
   the root tooling in a way that breaks bootstrap verification.
2. Generate tokens and wire them into the framework's styling system.
3. Implement routes, layouts, components, and states from the specs.
4. Use semantic HTML, landmark regions, heading order, labels, alt text, and
   keyboard behavior.
5. Implement responsive behavior at 390/768/1440. Test at intermediate widths
   too where layout is likely to break.
6. Implement real interactions. If a backend is not available, implement a
   clearly labeled local demonstration mode; never pretend it is production.
7. Optimize images: correct dimensions, modern formats where appropriate,
   lazy-loading below the fold, and stable aspect ratios.
8. Add framework-native scripts for build, lint, typecheck, and tests. Record
   them in `docs/QUALITY_GATES.md`.
9. Run asset validation and the framework checks. Fix failures before QA.

### Outputs

- `site/` application source.
- Generated token CSS.
- Framework scripts and lockfile.
- Build/lint/typecheck/test output.
- Asset validation output.

### Acceptance criteria

- Build, lint, typecheck, and tests pass (or documented equivalent).
- `validate:assets` passes.
- No broken local image references.
- No placeholder product imagery.
- All specified routes and states exist.
- Interactions work when exercised.
- Tokens are used; no stray hardcoded visual values (except documented
  icon/logo exceptions).
- No secrets or environment values committed.

### Failure conditions

- Build or type errors remain.
- Required routes or states are missing.
- Product images are missing, broken, or replaced with faux imagery.
- Interactions are dead or misleading.
- The implementation diverges from the approved design system without a recorded
  decision.

### Recovery

- Fix forward when possible and re-run the failing gate.
- If the framework choice is wrong, record the decision and migrate before
  building more UI.
- If an asset is missing, return to Phase 3; do not invent one.
- If a spec is wrong, update Phase 5 and record the change before coding around
  it.

### Checkpoint

Commit the working implementation only after G6 passes. Do not commit generated
build output or `node_modules`.

---

## Phase 7 — Browser-based visual QA

**Purpose:** verify what a real browser renders, at the target widths, and
actually look at it.

### Inputs

- A running local site and its URL.
- `docs/05-page-specifications.md` and `docs/04-design-system.md`.
- `agent-browser` and the QA runner.

### Work

1. Start the dev/production-preview server. Record the exact command and URL.
2. Read the current browser instructions:

   ```powershell
   npx --no-install agent-browser skills get core
   ```

3. Run the capture and measurement script:

   ```powershell
   npm run qa:visual -- --url http://127.0.0.1:3000
   ```

4. Capture full-page screenshots at 390, 768, and 1440, plus key interaction
   states (menu open, form focus/error, hover/focus where meaningful).
5. Inspect every screenshot as image content using the `read` tool or a human
   reviewer. Record who/what inspected it and what was observed.
6. Check:
   - layout, alignment, spacing, hierarchy
   - typography, line length, wrapping, truncation
   - color, contrast, focus visibility
   - product image integrity (correct image, not stretched, not broken)
   - broken images and missing assets
   - horizontal overflow at each width
   - responsive navigation and menu behavior
   - interaction states and real functionality
   - browser console errors and uncaught page errors
   - accessibility fundamentals (headings, labels, alt, keyboard, landmarks,
     axe/Lighthouse results)
7. Record findings in `docs/06-visual-qa.md` with evidence paths and severity.
8. Fix issues, re-run the affected checks, and re-inspect.

### Outputs

- Screenshots under `artifacts/visual-qa/`.
- Machine-readable report from the QA runner.
- `docs/06-visual-qa.md` with findings, evidence, and inspection statement.
- Updated `docs/PHASE_STATUS.md`.

### Acceptance criteria

- Screenshots exist at all three target widths and were actually inspected.
- No unresolved critical/major visual or functional defects.
- No horizontal overflow.
- No broken or incorrect product images.
- No console/page errors caused by the implementation.
- Responsive navigation works.
- Accessibility fundamentals pass; remaining limitations are documented.
- The QA document names the inspector and states what was seen.

### Failure conditions

- Screenshots were captured but not inspected.
- Any critical/major defect remains.
- Product images are broken or not the approved assets.
- The page requires horizontal scrolling at a target width.
- Console errors remain.
- Accessibility failures remain without a documented plan.

### Recovery

- Fix the defect, re-capture, re-inspect.
- If visual inspection is unavailable, mark `BLOCKED` and use a human or a
  user-approved vision-capable model. Do not pass on DOM evidence alone.
- If the defect is caused by a spec or asset, return to that phase and correct
  the source of truth first.

### Checkpoint

Commit QA screenshots, the report, and fixes. Gate G7 must pass.

---

## Phase 8 — Refinement and final validation

**Purpose:** close remaining quality gaps, verify the whole product against the
brief, and hand off with evidence.

### Inputs

- Phase 7 evidence and findings.
- All prior design memory.

### Work

1. Triage findings: fix critical and major issues; explicitly accept or defer
   minor issues with rationale.
2. Re-run all automated gates from a clean state.
3. Re-capture and re-inspect final screenshots at all three widths.
4. Verify the final site against the brief and page specs, including content,
   functionality, and states.
5. Verify the asset manifest matches the files actually used.
6. Confirm the design system is still the single source of truth.
7. Write the completion report: what was built, evidence, known limitations,
   blockers, and decisions.
8. In approval mode, present the final result for sign-off.

### Outputs

- Final `docs/06-visual-qa.md`.
- Final `docs/PHASE_STATUS.md` with all gates.
- Completion report (in `docs/PHASE_STATUS.md` or a linked file).
- A clean checkpoint commit.

### Acceptance criteria

- All gates pass or have explicitly accepted, documented exceptions.
- Final screenshots were visually inspected.
- No unresolved critical/major defects.
- The completion report is evidence-based, not aspirational.
- The repository is clean and the site can be started from documented commands.
- Approval mode has final sign-off.

### Failure conditions

- Any gate is unverified.
- Final screenshots were not inspected.
- Known defects are hidden or described as "minor" without criteria.
- The documented commands do not work from a fresh checkout.

### Recovery

- Fix and re-run the specific gate.
- If an issue cannot be fixed, document it as a limitation with impact and
  owner; do not claim completion.
- If the build is not reproducible, fix the setup and update the handoff.

### Checkpoint

Commit the final state. Tag only if the user requested tagging.

---

## Resume procedure after interruption

1. Read `AGENTS.md`, `docs/PHASE_STATUS.md`, and `docs/BOOTSTRAP_HANDOFF.md`.
2. Run `npm run verify:bootstrap`.
3. Identify the first phase whose status is not `PASSED`.
4. Read that phase's inputs and the "next action" recorded in the status file.
5. Inspect the working tree with `git status` and the last checkpoint commit.
6. Continue from the recorded action. Do not redo completed work or overwrite
   uncommitted user changes.
7. After the phase gate passes, update status and commit.

## Completion report format

Use evidence, not adjectives:

```markdown
## Completion report

- Project: <name>
- Brief: docs/01-product-brief.md (source: ...)
- Mode: autonomous | approval
- Frontend: site/ (framework ...)

### Gates
| Gate | Result | Evidence |
| --- | --- | --- |
| G0 | PASSED | ... |
...

### Verified functionality
- <action> — <how verified> — <result>

### Visual QA
- Inspected by: <model/human>
- Viewports: 390 / 768 / 1440
- Screenshots: artifacts/visual-qa/...
- Findings: <none | list with status>

### Assets
- Manifest: docs/03-asset-manifest.md
- Validation: <command and result>
- Demonstration imagery: <list>

### Known limitations
- <limitation> — <impact> — <follow-up>

### Blockers
- <none | problem, evidence, impact, corrective action, owner>
```

A completion report is not a substitute for the underlying evidence.
