# Fashion Lab — Design-First Frontend Workflow

A reusable, project-local workflow for building frontend sites from a brief with
real assets, a persistent design system, browser-based QA, and explicit quality
gates.

This repository contains the workflow **and** the current project:
**Galeri Seragam** — a school directory, uniform photo gallery, and demo admin
CMS in `site/`. The previous e-commerce implementation is superseded and
preserved at Git checkpoint `ef09a4f`.

## Current project quick start

```powershell
cd site
npm install
npm run dev          # http://127.0.0.1:5173
# or
npm run build
npm run preview      # http://127.0.0.1:3000
```

Quality commands:

```powershell
cd site
npm run build
npm run lint
npm run typecheck
npm test
cd ..
npm run validate:assets -- --require-assets
npm run verify:bootstrap
```

Project status, routes, evidence, and limitations: `docs/PHASE_STATUS.md` and
`docs/06-visual-qa.md`.

## Deploy to Vercel

The Vercel project root is `site`. Full step-by-step instructions, settings,
SPA rewrite explanation, and post-deploy checks: `docs/DEPLOY_VERCEL.md`.

Quick settings:

| Setting | Value |
| --- | --- |
| Root Directory | `site` |
| Framework Preset | `Vite` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |
| Environment Variables | none |

## Workflow quick start

```powershell
npm install
npm run verify:bootstrap
npx --no-install agent-browser skills get core
```

Then, in OpenCode:

```text
/build-site <paste the project brief, or a path to it>
```

If no brief exists yet, the command must stop and ask for one.

## What is installed

- `frontend-design` — distinctive visual direction and typography guidance.
- `web-design-guidelines` — Vercel Web Interface Guidelines review workflow.
- `agent-browser` — browser automation, screenshots, snapshots, console/error
  inspection, accessibility audits, and visual QA.
- `image-size` — asset integrity checks used by `scripts/validate-assets.mjs`.

Skills live in `.agents/skills/` and are tracked by `skills-lock.json`.

## Key documents

| File | Purpose |
| --- | --- |
| `AGENTS.md` | Binding rules for every session. |
| `docs/WORKFLOW.md` | Phases 0–8 and recovery procedure. |
| `docs/QUALITY_GATES.md` | Gates G0–G8 and pass criteria. |
| `docs/PHASE_STATUS.md` | Current status and resume point. |
| `docs/BOOTSTRAP_HANDOFF.md` | Environment, capabilities, limitations, next steps. |
| `docs/01-product-brief.md` … `06-visual-qa.md` | Persistent project memory templates. |

## Commands

```powershell
npm run verify:bootstrap     # verify files, skills, browser tooling, command
npm run validate:assets      # asset policy and manifest validation
npm run qa:visual -- --url http://127.0.0.1:3000
npm run tokens:build         # generate CSS tokens from docs/04
npm run serve:fixture        # local test fixture on port 4173
```

## Asset policy in one sentence

Physical products must use real, verified, locally stored photographs with
recorded source and license information; SVG, CSS, HTML, Canvas, emoji, and
procedural placeholders must never stand in for product photos, and AI image
generation requires explicit written authorization.

See `AGENTS.md` for the full policy and `docs/WORKFLOW.md` for the phase gates.

## Visual review rule

Screenshots are evidence only after they are inspected as image content. If the
active model cannot inspect images, the QA gate is `BLOCKED`, not `PASSED`.
