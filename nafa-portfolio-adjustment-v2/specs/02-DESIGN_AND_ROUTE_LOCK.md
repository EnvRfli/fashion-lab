# Layout Lock / Preserve Existing Approved Design

**Status: DESIGN LOCKED.** The user states that the current layout and visual styling are already correct.

## What must NOT change

- Overall identity: current colors, font families, typography hierarchy and spacing scale.
- Navbar position, logo style/placement, hero layout, section order, portfolio gallery grid and card design.
- Header/hero imagery unless an individual existing asset is broken or unlawful and the issue is documented.
- Breakpoints, widths and responsiveness unless there is a verified bug.
- Existing card ordering and data display as baseline.
- Routes, slugs and inbound links where possible; add redirects if route changes truly required.
- The app shell / styling architecture and verified bootstrap infrastructure.

## Small changes that are allowed

- Remove Demo/Test/Sample badges and wording from PUBLIC visible UI.
- Remove individual/group image download buttons (not image viewing).
- Remove public-user signup/login/account UI (not the single admin login).
- Replace heavy admin forms with the two-input flow without changing the general design language.
- Simplify public navigation labels to fit a konveksi portfolio while preserving their visual presentation.
- Remove shopping features if any remain; do not rebuild the whole layout as a result.
- Keep existing optional filters/category chips if useful, but remove mandatory category data-entry requirements from admin.

## Screenshots and review

1. BEFORE: using existing local app, capture homepage, listing, client detail, and admin create form at 390px, 768px, 1440px where available; store screenshot files and inspect with vision when supported.
2. AFTER: capture the same pages and viewport sizes.
3. Record differences. Changes should be attributable to the explicit functional requests, not unrelated stylistic changes.
4. If comparison cannot be performed, mark visual preservation UNVERIFIED and use structural/diff tests; do not pretend it was verified.

## References priority

1. The user's explicit updated instructions (KEEP current layout, KEEP all dummy data).
2. Current working website, its design tokens and before screenshots (PRIMARY visual baseline).
3. This v2 brief + feature policy.
4. Existing primary screenshot(s) for structural understanding, not a new redesign target.
5. Generic frontend-design skill recommendations (may not override the design lock).

## Routes

Audit actual route map. Preserve existing public URLs where possible. Common intent:

- Current homepage route → homepage.
- Existing school/client listing route → portfolio list (preserve URL if functional).
- Existing detail route → client photo gallery.
- Existing admin route(s) → admin login/list/edit.

Do not rename URLs just to fit the word `portofolio`. For example, if existing links use `/sekolah/:slug`, keeping it temporarily or redirecting safely is better than breaking bookmarks.
