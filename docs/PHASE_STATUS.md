# Phase Status

> Living resume file. Read this first in a new session.
> Last updated: 2026-11-13 — **Nafa Collection v2 minimal-change adjustment**.
> No push, deployment, or backend provisioning was performed.

## Status vocabulary

`NOT STARTED` · `IN PROGRESS` · `PASSED` · `FAILED` · `BLOCKED` · `WAIVED`

## Current direction

| Item | Value |
| --- | --- |
| Product | **Galeri Seragam / Nafa Collection** — client portfolio + garment project photos |
| Authoritative brief | `docs/PROJECT_BRIEF.md` v2 section + `nafa-portfolio-adjustment-v2/specs/` |
| Visual baseline | Rendered app before v2 (`artifacts/nafa-v2/before/`) |
| Execution report | `docs/NAFA_V2_EXECUTION_REPORT.md` |
| Baseline audit | `docs/NAFA_V2_BASELINE.md` |
| Change plan | `docs/NAFA_V2_CHANGE_PLAN.md` |
| Frontend | `site/` — React 19 + TypeScript + Vite 8 + Tailwind 4 |
| Data source | `site/src/data/seed.ts` + browser `localStorage` |
| Mode | `autonomous` |
| Restore branch | `nafa-v2-baseline` at `1a98a8a` |
| Current working state | v2 changes uncommitted; no push/deploy |

## V2 gate status

| Gate | Scope | Status | Evidence |
| --- | --- | --- | --- |
| V2-A | Audit, before screenshots, data inventory | **PASSED** | `docs/NAFA_V2_BASELINE.md`; `artifacts/nafa-v2/before/`; baseline JSON 12/62/8 |
| V2-B | Minimal-change plan | **PASSED** | `docs/NAFA_V2_CHANGE_PLAN.md` |
| D01 | All seeded clients remain accessible | **PASSED** | 12 → 12; 0 missing IDs; `artifacts/nafa-v2/data-comparison.json` |
| D02 | Photo associations/image hashes preserved | **PASSED** | 62 → 62; 0 missing photo IDs; 0 hash mismatches |
| D03 | No destructive reseed/truncate | **PASSED** | Additive copy migration only; no reset UI; store test |
| C01 | No prototype/demo labels in UI | **PASSED** | 0 hits across 10 rendered routes; `artifacts/nafa-v2/text-scan.txt` |
| C02 | No public signup/login/profile/user management | **PASSED** | User route redirects; 0 rendered public-user hits |
| C03 | No download buttons/ZIP/links | **PASSED** | 0 download buttons, 0 `a[download]`; module removed |
| C04 | No shop/cart/checkout/pricing | **PASSED** | No commerce routes/UI; regression tests |
| A01 | Create requires only name + 1+ photos | **PASSED** | UI validation test; browser create with 2 photos |
| A02 | Multiple photos in one operation | **PASSED** | Multi-file picker; browser upload + store test |
| A03 | Category/note optional; cover/slug automatic | **PASSED** | Create with no category; first photo cover; slug tests |
| A04 | Edit preserves existing photos | **PASSED** | 6 existing photos shown; add/remove test; browser flow |
| A05 | Delete requires confirmation | **PASSED** | Confirm dialog verified in browser and test |
| V01 | Visual preservation at 390/768/1440 | **PASSED** | Before/after PNGs inspected as images; differences documented |
| B01 | Bootstrap/build/lint/typecheck/tests green | **PASSED** | See command evidence below |
| B02 | Nested routes and image URLs work | **PASSED** | Browser navigation + image loads; asset validation |
| S01 | Anonymous cannot write (server-enforced) | **BLOCKED** | No backend/auth; local login is not secure authorization |
| S02 | Uploads persist across sessions/devices | **BLOCKED** | localStorage only; reload persistence verified, not server/device persistence |

**Production deployment is not approved.** See `docs/NAFA_V2_EXECUTION_REPORT.md`
§9–§12.

## Data preservation evidence

| Metric | Baseline | Final |
| --- | ---: | ---: |
| Clients/portfolios | 12 | 12 |
| Photos | 62 | 62 |
| Distinct image files | 8 | 8 |
| Missing client IDs | — | 0 |
| Missing photo IDs | — | 0 |
| Image hash mismatches | — | 0 |
| Retained user records (UI removed) | 3 | 3 |

Only the 12 seeded description strings changed, via an exact-match migration
that leaves administrator-edited descriptions untouched. IDs, slugs, names,
covers and photo associations are unchanged.

## Routes

**Public:** `/`, `/sekolah`, `/sekolah/:slug`, `/kategori`, `/tentang`, 404.

**Admin:** `/admin/masuk`, `/admin`, `/admin/sekolah`, `/admin/sekolah/baru`,
`/admin/sekolah/:id/edit`.

**Redirected old admin URLs:** `/admin/kategori`, `/admin/foto`,
`/admin/foto/baru`, `/admin/pengguna` → `/admin/sekolah`.

Public `/sekolah` URLs are intentionally preserved despite the public label
change to Portofolio/Klien.

## Commands and results

```powershell
npm run verify:bootstrap
# Summary: 35/35 checks passed.

npm run validate:assets -- --require-assets
# Assets checked: 8; Source files scanned: 47; 0 error(s), 0 warning(s).

npm run tokens:build -- --require
# Generated 91 token(s) -> site/src/styles/tokens.css (status: approved)

cd site
npm run build
# tsc + vite v8.3.8; 62 modules transformed; built successfully

npm run lint
# exit 0, no warnings

npm run typecheck
# exit 0

npm test
# 3 test files passed; 37 tests passed
```

Production preview smoke: `npx vite preview --port 4173 --strictPort`; home,
detail lightbox and admin form loaded, with 0 download controls.

## Visual QA evidence

Before runs: `artifacts/nafa-v2/before/*/2026-11-13T02-12…02-13Z`.

After runs (each has 390/768/1440 PNGs + `report.json`):

- `artifacts/nafa-v2/after/home/2026-11-13T02-40-13-198Z`
- `artifacts/nafa-v2/after/listing/2026-11-13T02-40-24-935Z`
- `artifacts/nafa-v2/after/detail/2026-11-13T02-40-33-673Z`
- `artifacts/nafa-v2/after/admin-dashboard/2026-11-13T02-40-42-403Z`
- `artifacts/nafa-v2/after/admin-list/2026-11-13T02-40-52-340Z`
- `artifacts/nafa-v2/after/admin-create-final/2026-11-13T02-54-58-369Z`
- `artifacts/nafa-v2/after/admin-login-final/2026-11-13T02-57-20-809Z`
- `artifacts/nafa-v2/after/categories/2026-11-13T02-41-18-400Z`
- `artifacts/nafa-v2/after/about/2026-11-13T02-41-28-108Z`

Interactions: `artifacts/nafa-v2/after/interactions/`.

All after runs reported 0 console errors/warnings, 0 axe violations, 0 broken
images, 0 missing alt text, 0 unlabeled controls, and 0 horizontal overflow at
390/768/1440. The PNGs were opened as image content and inspected by
`opencode-go/deepseek-v4.1-flash` on 2026-11-13. Details:
`docs/06-visual-qa.md` §8.

## Admin flow verified in the browser

`Login → Tambah Portofolio → Nama klien → multi-photo picker → Simpan &
Publikasikan`.

- Created "Pesantren Al-Falah" with 2 photos and no category; it appeared in the
  public gallery.
- Edited it to add 1 photo and remove 1 existing photo with confirmation; the
  remaining photo and name stayed.
- Deleted it with confirmation; list returned to 12.
- Created a temporary portfolio, reloaded, confirmed it persisted, then deleted
  it. Final localStorage: 12 clients / 62 photos / 3 retained user records.
- No duplicate submit; save button is disabled while processing/saving. A
  localStorage failure keeps the form open with an honest error and no success
  message.

## Approvals

| Date | Scope | Approver | Decision | Status |
| --- | --- | --- | --- | --- |
| 2026-11-13 | V2 minimal-change scope, design preservation, optional category, local-only persistence honesty, redirects | Agent, autonomous mode | Recorded in change plan and execution report | `[APPROVED]` |

No human approval is claimed for production publication, client identity rights,
or photo rights.

## Production blockers

1. **No server authentication.** Login is a local readiness gate, not a secure
   credential check. S01 remains blocked. Do not expose admin writes publicly.
2. **No durable backend storage.** Uploads are compressed data URLs in
   `localStorage`; they survive reload in one browser but not another device or
   Vercel ephemeral runtime. S02 remains blocked.
3. **Content/permission review.** Seeded client names and Pexels stock photos
   require owner approval before public production use. Hiding demo labels is not
   permission to present illustrative identities as verified paying clients.
4. **No deployment/push.** Intentionally not performed.

## Resume instructions

1. Read `AGENTS.md`, `docs/NAFA_V2_EXECUTION_REPORT.md`, this file.
2. Run `npm run verify:bootstrap`.
3. Run `cd site && npm install && npm run dev` (or build/preview).
4. Re-check with the commands above; capture 390/768/1440 and inspect the PNGs.
5. Do not reintroduce download/ZIP, public user management, demo badges, a
   separate photo master, mandatory category, or destructive reseed.
6. Before production: implement the auth/storage contract in the execution
   report, migrate seed records idempotently, obtain content/photo approval, then
   verify S01/S02 with a real backend. Do not deploy from this state.

## Previous realignment history (retained)

The 2026-11-11 Galeri Seragam realignment remains in Git history and in
`docs/REALIGNMENT_AUDIT.md`, `docs/MIGRATION_PLAN.md`,
`docs/REALIGNMENT_REPORT.md`, and the old QA runs under
`artifacts/visual-qa/realignment/`. Its demo/download/user-management features
are superseded by v2. The earlier e-commerce project is preserved at `ef09a4f`.
