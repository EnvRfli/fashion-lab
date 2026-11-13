# Surgical Execution Playbook / Safe Resume

## Phase 0 — Discovery

Read all v2 specs; inspect current codebase and Git, identify existing deployed application directory and data sources. Do NOT assume a particular framework/route/database from previous discussion.

## Phase 1 — Baseline lock

Capture screenshots and data inventory before changes. Preserve local uncommitted changes. Create safe restore point / backup for any local data or files affected; never reset or drop remote data. Write baseline to `docs/NAFA_V2_BASELINE.md`.

## Phase 2 — Minimal-diff plan

List precise files/components that need changing. Plan should explicitly identify every existing visual component and record/data source to keep. Write `docs/NAFA_V2_CHANGE_PLAN.md`, then proceed.

## Phase 3 — Public UI refinement

Preserve structure and CSS. Remove only the prototype labels, download actions, public-user account elements and unwanted e-commerce actions if present. Keep seeded list/gallery/images, search/filter behavior, routes and visual style.

## Phase 4 — Admin simplification

Preserve visual style. Reduce create/edit flow to name + multiple photos, optional details hidden. Keep ability to edit seeded records. Integrate real persistence safely where possible without altering/erasing seeded data.

## Phase 5 — QA/reconciliation

Verify exact counts/identities/image associations and before/after visual snapshots. Run build, scripts and browser tests. Report readiness honestly.

## Phase 6 — Handoff

Update `docs/PHASE_STATUS.md`, create `docs/NAFA_V2_EXECUTION_REPORT.md`. State what was changed and unchanged, tests with evidence, unresolved dependencies and next steps. Do not push/deploy.

## If execution is interrupted

Do not hide progress in a long transcript. Record current phase, completed files/commits, running server URL, exact unresolved issues and next command in `docs/PHASE_STATUS.md`. Resume from files, never redo bootstrap.

## Rollback

Never issue `git reset --hard`, `git clean -fd`, destructive DB migration or bulk deletion. Prefer revert of isolated local commit or restoration from an explicit verified backup. Preserve user-provided data and working site.
