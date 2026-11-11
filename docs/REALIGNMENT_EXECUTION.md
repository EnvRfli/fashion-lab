# Agent Task — Correct Existing Fashion Website to Galeri Seragam

Execute this task **autonomously in the existing repository**. This is a **product-direction correction and reimplementation**, not another bootstrap.

## Mandatory preflight

1. Read `AGENTS.md`, `docs/WORKFLOW.md`, `docs/QUALITY_GATES.md`, `docs/PHASE_STATUS.md`, `docs/BOOTSTRAP_HANDOFF.md` if present.
2. Read **current authoritative sources**: `docs/PROJECT_BRIEF.md`, `docs/DESIGN_ALIGNMENT.md`, `docs/references/REFERENCE_MANIFEST.md`, and `docs/references/primary/galeri-seragam-main.png`.
3. Use installed project-local `frontend-design`, `web-design-guidelines`, and `agent-browser` skills, subject to actual availability. Preserve bootstrap scripts/skills and existing clean setup.
4. Inspect repo status and establish a **recoverable Git checkpoint/branch** before destructive modifications. Do not overwrite uncommitted user work or modify unrelated files.
5. Record that **prior e-commerce brief/design/page decisions are superseded** by corrected product brief; do not revive them through old `/build-site` assumptions. Update status/handoff when appropriate.

## Phase A — Alignment audit (complete automatically)

- Compare current routes/components/data/assets with corrected School Directory + Uniform Gallery + Admin CMS requirements.
- Create `docs/REALIGNMENT_AUDIT.md`: reusable technical parts; incorrect commerce assumptions; to-delete/to-replace parts; missing features; evidence.
- Decide **salvage**, **partial application-layer rebuild**, or **application-layer restart within this same repository**. Prefer least-risk maintainable option; **never reinstall/bootstrap everything merely because UI is wrong**.
- Create `docs/MIGRATION_PLAN.md` mapping old routes/components to new routes/components. This is a mandatory internal gate, not a request for an extra user prompt.
- Read the composite screenshot as **multiple independent screens**, not as one collage page. When pixel inspection is unavailable, rely on the detailed textual specification without inventing visual observations.

## Phase B — Correct product and design

- Treat `docs/PROJECT_BRIEF.md` as authoritative. Eliminate commerce concepts from active brief, route map, copy, CSS/design tokens and components.
- Build the Galeri Seragam public and demo-admin routes described in the brief, preserving suitable framework/routing/testing infrastructure.
- Follow burgundy/white/soft-pink friendly modern application styling, **not** editorial luxury fashion styling.
- Use properly licensed real photos, or honest missing-image states; avoid generated SVG clothing. Record asset provenance and check integrity.
- Implement functional search/filter/sort/tabs/photo views/downloads; usable demo admin forms and local persistence where feasible; no fake secure authentication.

## Phase C — Verifiable QA and finish

- Run existing bootstrap verification as a regression check, plus frontend build, type/lint/test and asset integrity checks as available.
- Start frontend and validate routes/interaction at 390, 768 and 1440 viewport widths.
- Capture and inspect **actual** screenshot images using supported vision path. Compare structures of homepage, school detail, admin dashboard, and forms against their respective regions in `galeri-seragam-main.png`.
- Update `docs/06-visual-qa.md` with results, limitations and remaining mismatches. Do not claim PASS where screenshots were captured but not visually inspected.
- Confirm **zero** active cart, checkout, prices, buy-now or fashion boutique flows; allow no SVG garment/product photos.
- Update `docs/PHASE_STATUS.md` truthfully; provide final report listing preserved/replaced files, routes, tests, screenshot paths, and outstanding blockers.

## Execution boundaries

- Complete audit **and** implementation in the same run when tools and assets are available. Do **not** stop after writing the plan merely to ask for another prompt.
- Only request approval if truly necessary due to irreversible work, security risk, missing essential rights, or material contradiction. Routine styling/code decisions are autonomous.
- Do not deploy or push to remotes; do not change provider credentials; do not purchase assets.
- If image rights/vision access are genuinely blocked, still finish code/structural work where possible and report the precise incomplete criterion rather than inventing success.

**Begin now by reading the documents, checking the actual codebase, and creating a safe checkpoint.**
