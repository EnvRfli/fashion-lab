# Non-regression Acceptance Tests — Nafa v2

**A deployment is NOT a success if it looks nicer but loses prior data or changes the approved layout.**

## Mandatory tests / evidence

| ID | Acceptance condition | Evidence |
|---|---|---|
| V01 | Existing homepage, listing, detail and admin layout remain visually consistent | Before/after screenshots at 390,768,1440; inspected when vision exists |
| D01 | ALL pre-existing seeded/dummy client records remain accessible | baseline vs after count + exact IDs/slugs |
| D02 | ALL existing referenced photos remain associated with correct client | baseline vs after image association/hash/path checks |
| D03 | No mass deletion, truncate, destructive reseed or storage reset | migration/diff review |
| C01 | No prototype/demo labels visible in user-facing UI | text scan + browser snapshots, manual verification; ignore dev/test source code |
| C02 | No public user signup/login/profile or user management | route/navigation checks |
| C03 | No photo/ZIP download buttons or links in gallery UI | DOM/interaction check |
| C04 | No shop/cart/checkout/pricing UI | route/navigation check |
| A01 | Add portfolio requires only `Nama klien` and 1+ photos | form validation/UI test |
| A02 | Admin can select multiple photos in one operation | upload flow test |
| A03 | Category/note optional, cover and slug automatic | form/API test |
| A04 | Existing admin can edit existing portfolios/add photos without losing old ones | regression test |
| A05 | Delete operations require explicit confirmation | UI test |
| S01 | Anonymous cannot write or change admin/portfolio data | backend auth policy test |
| S02 | Uploads persist after refresh/relogin/another session | integration test; BLOCKED if provider credentials unavailable |
| B01 | Existing bootstrap verifier, build/lint/tests remain green | command outputs |
| B02 | Nested routes and image URLs still function | browser navigation/asset integrity |

## Visual quality gate

Capture same pages at 390, 768, 1440 **before and after**. Do not change site typography, visual identity, hero and card composition. Minor differences due to removing download controls/demo labels and simplifying admin fields are acceptable. Do not confuse improvements with permission to redesign.

## Unavailable tests

If browser pixels cannot be inspected, mark visual fidelity UNVERIFIED. If real auth/storage credentials are absent, mark S01/S02 BLOCKED, not PASSED; keep code and existing seeded display intact.

## Final report MUST include

- Baseline records/photos (observed source/count) and after records/photos.
- Broken or redirected URLs and whether clients/photo references were preserved.
- List of user-facing demo labels removed (without dataset deletion).
- Before/after screenshots and visual comparison.
- Add/edit form required vs optional inputs.
- Exact commands run and their results.
- Unresolved production needs and permission/content checks.
