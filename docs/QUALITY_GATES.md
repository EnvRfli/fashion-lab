# Quality Gates — G0 to G8

A gate is a pass/fail checkpoint, not a checklist of intentions. Each gate must
have evidence recorded in `docs/PHASE_STATUS.md`. If evidence is missing, the
gate is not passed.

## Gate principles

- **Automated where possible.** Builds, type checks, tests, asset validation, and
  browser measurements run as commands.
- **Manual where necessary.** Visual quality, content truth, and design judgment
  require a human or vision-capable reviewer.
- **No inherited passes.** A prior pass does not excuse a regression.
- **Evidence over claims.** Record the command, output summary, screenshot path,
  or reviewer. Do not write "verified" without a source.
- **Blocked is valid.** A blocked gate is safer than a false pass.

## Result vocabulary

| Result | Meaning |
| --- | --- |
| `PASSED` | All criteria met, evidence recorded. |
| `FAILED` | A criterion is not met; fix and re-run. |
| `BLOCKED` | Cannot evaluate or fix because a dependency is missing. |
| `NOT STARTED` | No work or evidence yet. |
| `WAIVED` | A human explicitly accepted a documented exception. Never use without approval. |

---

## Bootstrap gate (setup, before G0)

Run before any project work and after any tooling change.

```powershell
npm run verify:bootstrap
```

Pass criteria:

- `AGENTS.md`, `README.md`, `package.json`, `skills-lock.json`, command file, and
  all required docs exist.
- The three skills exist on disk with non-empty `SKILL.md` files and match the
  lock file.
- `agent-browser --version` works and `doctor` has no failures.
- The `/build-site` command exists.
- The QA/asset scripts exist and are executable.
- No required file is empty.

Evidence: paste the script summary into `docs/PHASE_STATUS.md`.

---

## G0 — Environment and brief

**Phase:** 0

Automated:

```powershell
npm run verify:bootstrap
```

Manual:

- Brief is present and attributable.
- Product, audience, primary job, scope, and mode are explicit.
- Frontend location is recorded.
- No invented requirements.

Pass criteria:

- Bootstrap gate passes.
- `docs/01-product-brief.md` contains the actual brief and a completed intake
  section.
- `Mode` is `autonomous` or `approval`.
- Open questions that block work are listed; non-blocking questions are labeled.

Failure: no brief, ambiguous product, or unverifiable environment.

---

## G1 — Product and audience discovery

**Phase:** 1

Manual review:

- Primary/secondary audiences and context are specific.
- Primary job and success criteria are explicit.
- Every requested route has a purpose and content requirement.
- Content provenance is labeled.
- Non-goals and constraints are recorded.

Automated sanity check (once the frontend exists):

```powershell
npm run validate:assets
```

Pass criteria:

- No placeholders presented as facts.
- No visual direction chosen yet.
- Page inventory is complete enough for reference research.

Failure: product cannot be explained without inventing facts.

---

## G2 — Visual reference research

**Phase:** 2

Manual:

- At least three verified references with URL and access date.
- Screenshots captured and readable.
- Analysis separates usable ideas from material not to copy.
- Two or three distinct direction options, or one selected direction with
  rationale.
- Direction is specific to the brief and compatible with available assets.

Automated evidence checks:

```powershell
# Optional: verify that reference screenshots are non-empty images
node scripts/validate-assets.mjs --check-images artifacts/visual-qa/references
```

Pass criteria:

- No fabricated URLs or screenshots.
- Approval recorded if in approval mode.
- Decision recorded in `docs/DECISIONS.md`.

Failure: generic direction, unreachable references, or unverified screenshots.

---

## G3 — Real image asset sourcing

**Phase:** 3

Automated:

```powershell
npm run validate:assets -- --require-assets
```

This checks:

- Missing local product image files.
- Product images pointing at `.svg`.
- SVG data URLs used as product imagery.
- Invalid manifest entries.
- Unverified/remote placeholder URLs.
- Empty or corrupt images.
- Missing source, creator, license, or license URL.
- Hash and dimension mismatches.

Manual:

- Each source page was actually visited and the license verified.
- Stock photos are labeled demonstration imagery.
- Images are appropriate to the product and visual direction.
- No AI-generated imagery without written authorization.

Pass criteria:

- Script exits 0 with `--require-assets`.
- Every required product image is a local, valid raster file.
- Every entry has complete provenance.
- No prohibited substitutes.

Failure: any missing, unlicensed, corrupt, or faux product image.

---

## G4 — Art direction and design system

**Phase:** 4

Automated:

```powershell
npm run tokens:build -- --require
```

- The canonical token JSON block in `docs/04-design-system.md` parses.
- The generated CSS is written without errors.
- All required token groups exist.

Manual:

- Contrast checks for every text/background pair (WCAG 2.2 AA).
- Type scale, line height, and measure are specified.
- Layout, spacing, shape, and motion are specified.
- Components and states are specified.
- The system uses the real imagery direction, not placeholders.
- Approval recorded if in approval mode.

Pass criteria:

- No undefined tokens.
- No unresolved contrast failures.
- `docs/04` is the single source of truth.
- Decision rationale recorded.

Failure: generic system, contrast failure, unavailable font, or contradictory
tokens.

---

## G5 — Wireframes and page specifications

**Phase:** 5

Manual review:

- Every route has a wireframe and a specification.
- Every image slot maps to a manifest asset.
- Responsive behavior is specified at 390/768/1440.
- Every interaction has a real behavior or approved non-goal.
- Loading, empty, error, success, hover, focus, active, and disabled states are
  specified where relevant.
- Accessibility criteria are testable.
- Approval recorded if in approval mode.

Pass criteria:

- No missing route, asset, state, or action.
- No invented backend behavior.
- Specs are sufficient to implement without guessing.

Failure: unspecified mobile behavior, missing assets, or fabricated data.

---

## G6 — Frontend implementation

**Phase:** 6

Automated (replace placeholders with the chosen framework's commands and record
them here):

```powershell
cd site
npm run build
npm run lint
npm run typecheck
npm test
cd ..
npm run validate:assets
```

Pass criteria:

- Build, lint, typecheck, and tests exit 0.
- Asset validation exits 0.
- No secrets or environment files committed.
- All specified routes and states exist.
- Real interactions work.
- Tokens are used; no unapproved hardcoded visual values.
- No broken image imports.

Manual:

- Spot-check functionality in a browser before formal QA.
- Confirm content is real or clearly labeled.
- Confirm no placeholder product imagery.

Failure: any red command, missing route/state, dead interaction, or faux asset.

---

## G7 — Browser-based visual QA

**Phase:** 7

Automated capture and measurement:

```powershell
npm run qa:visual -- --url http://127.0.0.1:3000
```

The runner captures 390/768/1440 screenshots and records:

- horizontal overflow
- broken images / zero natural dimensions
- missing alt attributes
- console errors and page errors
- basic accessibility audit (axe via agent-browser)
- page title and URL

Manual:

- Open every screenshot with the `read` tool or a human reviewer.
- Inspect layout, alignment, hierarchy, typography, color, contrast, imagery,
  responsive navigation, interaction states, and real functionality.
- Record the inspector and observations in `docs/06-visual-qa.md`.

Pass criteria:

- All three screenshots exist and are non-empty.
- Visual inspection is recorded. **No visual inspection = no pass.**
- No horizontal overflow.
- No broken product images.
- No implementation-caused console/page errors.
- No critical/major visual defects.
- Accessibility fundamentals pass; residuals documented.
- Responsive navigation works at mobile width.

Failure: missing inspection, any critical/major defect, broken assets, overflow,
or console errors.

---

## G8 — Refinement and final validation

**Phase:** 8

Automated:

```powershell
npm run verify:bootstrap
npm run validate:assets -- --require-assets
npm run tokens:build
cd site
npm run build
npm run lint
npm run typecheck
npm test
cd ..
npm run qa:visual -- --url http://127.0.0.1:3000
```

Manual:

- Re-inspect final screenshots at all three widths.
- Verify the implementation against the brief and specs.
- Verify the completion report is evidence-based.
- Confirm all gates are `PASSED` or explicitly `WAIVED`.
- Approval mode: final sign-off recorded.

Pass criteria:

- All gates pass or are explicitly waived with approval.
- Final visual inspection recorded.
- No unresolved critical/major defects.
- Documented startup commands work from a fresh checkout.
- Repository clean; no uncommitted required work.

Failure: any unverified gate, missing final inspection, or hidden defect.

---

## Gate evidence format

Record in `docs/PHASE_STATUS.md`:

```markdown
### G7 — Browser-based visual QA
- Result: PASSED
- Command: `npm run qa:visual -- --url http://127.0.0.1:3000`
- Output: `artifacts/visual-qa/report-<timestamp>.json`
- Screenshots: `artifacts/visual-qa/390-...png`, `768-...png`, `1440-...png`
- Visual inspection: <model/human>, <date> — <observations>
- Findings: none blocking; minor items recorded in docs/06
- Checkpoint: <commit sha>
```

## Waivers

A waiver is allowed only when:

1. A human explicitly approves it.
2. The exact criterion is named.
3. The impact and follow-up are recorded.
4. The waiver is not used for missing product photography, fabricated content,
   unlicensed assets, or un-inspected screenshots.

Asset policy violations and false visual passes cannot be waived.
