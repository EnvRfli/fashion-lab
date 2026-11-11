# Fashion Lab — Design-First Frontend Workflow

This repository is a **development system**, not a finished website. It exists so a
fresh OpenCode session can take a project brief and execute a design-first,
asset-first frontend build without relying on conversation history.

Read this file before doing any project work. Then read:

1. `docs/WORKFLOW.md` — the phase-by-phase operating procedure.
2. `docs/QUALITY_GATES.md` — the gates that must pass before a phase is complete.
3. `docs/PHASE_STATUS.md` — current state, approvals, blockers, and resume point.
4. `docs/BOOTSTRAP_HANDOFF.md` — environment and tooling evidence.

## Status

- Bootstrap: complete; `npm run verify:bootstrap` passes 35/35.
- Project brief: **received and realigned** to Galeri Seragam at
  `docs/PROJECT_BRIEF.md`. The earlier e-commerce brief is superseded.
- Website implementation: **complete** in `site/` — public directory/gallery and
  demo admin CMS. See `docs/PHASE_STATUS.md` and `docs/REALIGNMENT_REPORT.md`.
- Visual QA: **passed** with documented limitations in `docs/06-visual-qa.md`.
- No unresolved blocker; optional future work requires a new brief.

## Repository map

| Path | Purpose |
| --- | --- |
| `AGENTS.md` | Binding project rules for every agent session. |
| `docs/WORKFLOW.md` | Phases 0–8, inputs, outputs, acceptance, recovery, approvals. |
| `docs/QUALITY_GATES.md` | Automated and manual gates G0–G8. |
| `docs/PHASE_STATUS.md` | Living status, evidence, approvals, blockers, resume point. |
| `docs/01-product-brief.md` | Brief, audience, goals, scope, mode. |
| `docs/02-visual-references.md` | Verified visual research and direction options. |
| `docs/03-asset-manifest.md` | Machine-readable asset manifest plus source/license record. |
| `docs/04-design-system.md` | Approved tokens and design decisions (single source of truth). |
| `docs/05-page-specifications.md` | Routes, wireframes, states, content, responsive behavior. |
| `docs/06-visual-qa.md` | Browser QA evidence, findings, and sign-off. |
| `docs/DEPLOY_VERCEL.md` | Vercel deployment settings, SPA rewrites, and checks. |
| `docs/DECISIONS.md` | Durable decision log for design and architecture. |
| `docs/references/` | Saved reference images or screenshots, when supplied. |
| `.opencode/commands/build-site.md` | Project-local `/build-site` command. |
| `.agents/skills/` | Project-local skills installed with the official skills CLI. |
| `scripts/validate-assets.mjs` | Framework-agnostic asset policy validator. |
| `scripts/visual-qa.mjs` | Browser QA capture and measurement runner. |
| `scripts/build-tokens.mjs` | Generates CSS custom properties from `docs/04`. |
| `scripts/verify-bootstrap.mjs` | Reproducible bootstrap verification. |
| `site/` | Galeri Seragam frontend application (React + TypeScript + Vite). |
| `artifacts/visual-qa/` | Committed QA screenshots and reports. |

## Non-negotiable operating rules

1. **Design first.** Do not write production UI before the brief, references,
   real assets, design system, and page specifications exist and pass their gates.
2. **Asset first.** Do not design high-fidelity layouts around placeholder
   product imagery. Obtain and verify the real photographic assets first.
3. **Phase order.** Execute Phases 0–8 in order. A later phase may begin only
   when the previous phase is recorded as `PASSED` with evidence.
4. **Persistent memory.** Every decision, assumption, approval, and blocker goes
   into the repository. Conversation history is not a source of truth.
5. **Single source of truth.** `docs/04-design-system.md` is canonical. The
   generated `site/src/styles/tokens.css` must mirror it. Components must use
   tokens, not ad-hoc colors, spacing, or type values.
6. **Browser verification.** Visual work is not complete until it has been
   rendered in a real browser and inspected at 390px, 768px, and 1440px.
7. **No false pass.** Never mark visual QA as passed when only the DOM,
   console, or screenshot files were checked. Screenshots must be inspected as
   image content by a vision-capable model or a human.
8. **Accessibility and responsiveness are requirements**, not polish.
9. **Real functionality.** Interactions must work and be verified; no dead
   buttons, fake navigation, or decorative forms.
10. **Preserve user work.** Never delete, overwrite, or clean up files outside
    the task without explicit permission. No destructive system commands.
11. **No secrets, no unrelated repositories, no deployment.** Do not change
    provider or authentication settings. Do not deploy.
12. **Honesty.** If something could not be verified, record the failure,
    evidence, impact, and required corrective action.

## Critical asset policy

This policy applies to clothing, uniforms, accessories, and every other physical
product represented as merchandise or inventory.

### Product imagery must be photographic

Real-world products must be represented by **real photographs**. Never create or
substitute product photographs with:

- SVG drawings or SVG data URLs
- CSS drawings or gradients shaped like a garment
- HTML shapes
- Canvas illustrations
- Emoji
- Procedurally generated placeholder images
- AI-generated images, unless the user has explicitly authorized AI generation
  for this project in writing

### SVG is allowed for

- Icons
- Logos
- UI indicators (arrows, status marks, loading spinners)
- Simple decorative graphics that are not product representations

Normal inline SVG icons and logo files are not violations.

### Sourcing photographs

1. Research suitable sources and verify that the actual photo can be used for
   this project. Prefer sources with clear, per-asset licensing such as
   Unsplash, Pexels, Wikimedia Commons (check each file), Openverse, or a
   user-supplied asset.
2. Do not scrape retail sites, brand catalogs, search-engine image results, or
   social media for product photos without permission.
3. Download the actual file; do not hotlink an unverified URL.
4. Validate the file: non-zero size, correct raster format, decodable image,
   reasonable dimensions, and SHA-256 hash.
5. Record in `docs/03-asset-manifest.md`: local path, source page URL, creator,
   license name, license URL, access date, hash, dimensions, alt text, and
   whether it is demonstration imagery.
6. Label stock or sourced photos clearly as **demonstration imagery**. Never
   present them as the client's real inventory, real school uniforms, or
   verified product stock.
7. Never fabricate a URL, photographer, license, or attribution. If a field
   cannot be verified, mark it `[BLOCKED]` and explain.
8. If acceptable photographs cannot be obtained, **stop and report the blocker**.
   Do not generate SVG or CSS substitutes.

### AI image generation

Do not use AI image generation unless the project brief explicitly authorizes it
and records the scope, model, and disclosure requirements. An authorization for
one image does not authorize others.

## Workflow phases

Full details, acceptance criteria, and recovery steps are in
`docs/WORKFLOW.md`. Summary:

| Phase | Name | Primary output | Approval |
| --- | --- | --- | --- |
| 0 | Environment and project brief | `docs/01-product-brief.md`, verified tooling | Brief is the approval |
| 1 | Product and audience discovery | Brief sections completed | No |
| 2 | Visual reference research | `docs/02-visual-references.md`, screenshots | Yes in approval mode |
| 3 | Real image asset sourcing | `docs/03-asset-manifest.md`, downloaded files | No |
| 4 | Art direction and design system | `docs/04-design-system.md`, tokens | Yes in approval mode |
| 5 | Wireframes and page specifications | `docs/05-page-specifications.md` | Yes in approval mode |
| 6 | Frontend implementation | `site/` application | No |
| 7 | Browser-based visual QA | `docs/06-visual-qa.md`, screenshots | No |
| 8 | Refinement and final validation | Final evidence and completion report | Final sign-off in approval mode |

**Approval mode** is selected in `docs/01-product-brief.md`. The default is
**autonomous**: make a justified decision, record it in `docs/DECISIONS.md`, and
continue. When the brief requests approval mode, stop at the checkpoints above
and wait for a human decision. Never invent an approval.

## Design memory and status labels

Use these labels consistently in every design document:

- `[PROPOSED]` — an agent suggestion; not verified or approved.
- `[VERIFIED]` — checked against a URL, file, command output, or screenshot.
- `[APPROVED]` — a human approval, or an autonomous decision recorded with
  rationale and date.
- `[PENDING]` — awaiting information or a decision.
- `[BLOCKED]` — cannot proceed; include the reason, evidence, and required
  corrective action.

Templates are templates. Do not treat an example, empty field, or placeholder as
a decision. Update the document, then update `docs/PHASE_STATUS.md`.

## Quality gates and commands

All gates and pass criteria are in `docs/QUALITY_GATES.md`. Run the applicable
commands; paste the real result into the phase status. Do not claim a command
passed without its output.

```powershell
npm run verify:bootstrap
npm run validate:assets
npm run qa:visual -- --url http://127.0.0.1:3000
npm run tokens:build
```

Add framework-native build, lint, typecheck, and test commands during Phase 6
and record them in `docs/QUALITY_GATES.md` and `docs/05-page-specifications.md`.

## Browser and visual QA rules

- Use `agent-browser` for browser automation. Before the first use in a session,
  read the current core guide:

  ```powershell
  npx --no-install agent-browser skills get core
  ```

- Use a named session per task, for example:

  ```powershell
  npx --no-install agent-browser session id --scope worktree --prefix visual-qa
  ```

- Target viewports: **Mobile 390px**, **Tablet 768px**, **Desktop 1440px**.
- Capture full-page screenshots into `artifacts/visual-qa/`.
- Check: layout/alignment, typography, color/contrast, product image integrity,
  broken images, horizontal overflow, responsive navigation, interaction states,
  console errors, and accessibility fundamentals.
- Inspect every captured screenshot using the `read` tool (image content) or a
  human reviewer. Record who/what inspected it and what was observed.
- If image inspection is unavailable, mark the gate `BLOCKED — visual inspection
  unavailable`, document the fallback, and do not claim a pass.
- `scripts/visual-qa.mjs` captures and measures; it does **not** grant a visual
  pass. The agent must look.

## Implementation rules

- Default frontend location: `site/`. Record any deviation in `docs/05`.
- Choose a maintained framework appropriate to the brief. Record the choice and
  rationale in `docs/DECISIONS.md`; do not hardcode a provider or model.
- Generate CSS custom properties from `docs/04-design-system.md`:

  ```powershell
  npm run tokens:build
  ```

- Use semantic HTML, visible focus states, keyboard support, labels, alt text,
  reduced-motion handling, and accessible contrast.
- Keep product image paths consistent with the manifest. Run
  `npm run validate:assets` after adding or changing assets and before QA.
- Do not use remote placeholder URLs for product imagery.
- Do not invent inventory, testimonials, statistics, school names, or licenses.

## Source control, checkpoints, and resume

- Commit after a phase passes its gate. Suggested message:
  `phase-N: <phase name> — gate passed`.
- Do not tag or mark a phase complete before its gate passes.
- `docs/PHASE_STATUS.md` is the resume file. On a new session, read it first and
  continue from the first non-passed phase.
- If interrupted mid-phase, record the exact next action and evidence already
  collected. Do not restart completed work.
- Use `git status` before and after checkpoints. Do not commit secrets,
  `node_modules`, build output, or unverified downloads.

## Blocker protocol

When a real blocker occurs, stop and record in `docs/PHASE_STATUS.md`:

1. Problem
2. Evidence (command output, URL, file, screenshot)
3. Impact (what cannot proceed)
4. Required corrective action
5. Owner or decision needed

Do not substitute a fake asset, fake approval, or fake verification to get past
a blocker.

## Starting a fresh session

1. Read `AGENTS.md`.
2. Read `docs/PHASE_STATUS.md` and `docs/BOOTSTRAP_HANDOFF.md`.
3. Run `npm run verify:bootstrap`; fix setup failures before project work.
4. If a project brief exists, run `/build-site <brief or brief path>`.
5. If no brief exists, stop and ask for one. Do not invent a project.

## Definition of done

A project is done only when:

- Phases 0–8 are recorded `PASSED` with evidence.
- The approved design system is the only source of visual tokens.
- All product imagery is photographic, local, licensed, recorded, and valid.
- Build, lint, typecheck, tests, and asset validation pass.
- Browser QA at 390/768/1440 was captured **and visually inspected**.
- Accessibility fundamentals pass; known limitations are documented.
- No unresolved blockers remain, or the project is explicitly handed off with
  them documented.
- `docs/06-visual-qa.md` and `docs/PHASE_STATUS.md` contain the final evidence.
