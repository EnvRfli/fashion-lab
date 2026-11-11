# Realignment Audit — Galeri Seragam

**Date:** 2026-11-11
**Scope:** Existing `site/` application, documentation, assets, and tooling in
`D:\personal_project\fashion-lab`.
**Authoritative sources:** `docs/PROJECT_BRIEF.md`,
`docs/references/primary/galeri-seragam-main.png`,
`docs/DESIGN_ALIGNMENT.md`, `docs/references/REFERENCE_MANIFEST.md`.
**Checkpoint before changes:** `ef09a4f` — `checkpoint: pre-realignment fashion
storefront build (superseded by Galeri Seragam brief)`.

## 1. Executive decision

**Selected approach: partial application-layer rebuild inside the same
repository.**

The repository's bootstrap, skills, verification scripts, browser setup, asset
validator, token generator, and Vite/React/TypeScript/Tailwind foundation are
sound and are preserved. The public product layer is a fashion boutique store
with a cart, prices, and editorial art direction; it must not be incrementally
"re-skinned". The application layer (`site/src`) is therefore rebuilt around a
School Directory + Uniform Gallery + Admin CMS domain. No reinstall, new
repository, or bootstrap reset is justified.

## 2. Evidence: what exists

### 2.1 Routes

| Current route | Implementation | Problem against corrected brief |
| --- | --- | --- |
| `/` | `pages/HomePage.tsx` | Editorial fashion hero, "Shop by layer", prices, stages. No school search, no education levels, no school cards. |
| `/shop` | `pages/ShopPage.tsx` | Product catalogue with prices and fashion categories. Not a school directory. |
| `/shop/:slug` | `pages/ProductPage.tsx` | Product detail, size selection, add-to-bag. Not a school detail gallery. |
| `/cart` | `pages/CartPage.tsx` | Cart and simulated checkout. Explicitly forbidden. |
| `*` | `pages/NotFoundPage.tsx` | Generic fashion 404; copy and layout are reusable only as a shell. |

Missing: `/sekolah`, `/sekolah/:slug`, `/kategori`, `/tentang`, and every
`/admin` route required by the brief.

### 2.2 Components and state

| Existing part | Assessment | Action |
| --- | --- | --- |
| `components/Layout.tsx` | Skip link, scroll manager, header/footer shell | Reuse the pattern; rewrite content and labels in Indonesian. |
| `components/Header.tsx` | Store nav, bag button, mobile dialog | Replace. The mobile dialog pattern is useful. |
| `components/Footer.tsx` | Fashion brand footer, price policy copy | Replace. |
| `components/Logo.tsx` | Initials mark | Replace with a shirt/garment SVG mark permitted for logos. |
| `components/Icons.tsx` | Clean inline SVG icon primitives | Reuse and extend (search, filter, download, edit, delete, menu, close, arrows). |
| `components/ProductCard.tsx` | Price-led product card | Delete; replace with `SchoolCard`. |
| `components/QuantityStepper.tsx` | Cart quantity control | Delete. No commerce. |
| `components/StageRail.tsx` | School-stage navigation for shop | Delete; replaced by `EducationLevelCards`. |
| `components/DemoNotice.tsx` | Top demo strip | Reuse the concept with Galeri Seragam copy. |
| `cart/*` | Local cart state, context, storage | Delete. Cart is forbidden. |
| `catalog/filter-products.ts` | Search/filter/sort logic for products | Delete; replace with school filter/sort module and tests. |
| `data/products.ts` | Six fashion products with prices, sizes | Delete; replace with demo schools, education levels, and gallery photos. |

### 2.3 Assets

Eight verified Pexels photographs exist in `site/public/images/` and in the
machine-readable manifest in `docs/03-asset-manifest.md`. All are local,
non-empty, hashed, dimension-checked, and labelled demonstration imagery.
They are generic garments (shirt, blazer, skirt, trousers, knitwear, loafers,
a flat-lay, and a rail), not verified school uniforms and not client inventory.

Conclusion: the asset set is usable as **clearly labelled reference imagery**
for demo galleries. It is not sufficient for a claim that any photo is a
specific school's official uniform. The UI must say so. No new asset is needed
to implement the required routes and gallery interactions. No SVG/CSS product
imagery may be introduced.

The 30 candidate images under `artifacts/visual-qa/references/` are **not**
approved assets. They have no manifest provenance and some depict a real
school's uniform or identifiable people. They must not ship in `site/`.

### 2.4 Design system and styling

`site/src/styles/tokens.css` is generated from the canonical JSON block in
`docs/04-design-system.md`; the generator and validator work. The token
**values** encode "The Outfitter's Ledger": Fraunces serif display, cream
chalk background, brass accent, editorial luxury spacing. This contradicts the
corrected brief's friendly modern sans-serif, white surfaces, burgundy CTA, and
soft-pink hero direction.

Conclusion: preserve the token pipeline, not the old values. Replace the
canonical token block with a Galeri Seragam system, regenerate the CSS, and
rewrite `site/src/styles/index.css`.

### 2.5 Tooling and tests

| Item | State | Decision |
| --- | --- | --- |
| `scripts/verify-bootstrap.mjs` | Working; 34/35 on 2026-11-11 because the external Chrome-for-Testing CDN was unreachable | Preserve unchanged. Record the network-only failure honestly; browser launch still passes. |
| `scripts/validate-assets.mjs` | Working; manifest-driven, scans `site/src` and `site/public` | Preserve unchanged. |
| `scripts/visual-qa.mjs` | Working; screenshots and measurements only | Preserve unchanged. |
| `scripts/build-tokens.mjs` | Working | Preserve unchanged. |
| `site` React 19 + TypeScript + Vite 8 + Tailwind 4 | Installed and buildable | Preserve. Remove unused Fraunces dependency/import. |
| Vitest + Testing Library | Configured | Preserve and replace tests with school-domain tests. |
| ESLint flat config | Working | Preserve. |

## 3. Incorrect commerce assumptions to eliminate

The following concepts are active in the current application and must not
survive into the corrected build:

1. Cart state, cart provider, cart route, bag icon, quantity stepper, add-to-bag.
2. Prices, "Sample price", currency, checkout, payment, delivery, returns.
3. Product sizes, fit, fabric, care, and "shop by layer/stage" merchandising.
4. Fashion editorial hero copy ("A uniform, considered").
5. Product-catalogue filters and stage taxonomy (Junior/Senior/Sixth).
6. Footer claims about a storefront operator, orders, or payment.
7. Any UI that calls a uniform photo a purchasable product.

## 4. Missing capabilities required by the brief

| Capability | Required routes | Status |
| --- | --- | --- |
| School search by name and level | `/`, `/sekolah` | Missing |
| Education-level cards and counts | `/`, `/kategori` | Missing |
| School directory with filter and sort | `/sekolah` | Missing |
| School detail with Galeri/Informasi tabs | `/sekolah/:slug` | Missing |
| Photo preview, individual download | `/sekolah/:slug` | Missing |
| Bulk download of real bytes as an archive | `/sekolah/:slug` | Missing |
| About the demo/licensing model | `/tentang` | Missing |
| Admin dashboard with summary cards and table | `/admin` | Missing |
| School CRUD with validation and confirmation | `/admin/sekolah*` | Missing |
| Category management preserving TK/SD/SMP/SMA | `/admin/kategori` | Missing |
| Photo management and upload preview | `/admin/foto*` | Missing |
| Honest demo user management | `/admin/pengguna` | Missing |
| Visual demo login entry point, not real auth | `/admin/masuk` | Missing |
| Local persistence and reset | all admin routes | Missing |
| Loading, empty, invalid, missing-image states | all relevant routes | Missing |

## 5. Salvage / replace matrix

### Salvage

- Repository tooling and docs gates.
- `site/package.json` dependency set (add `fflate` for real ZIP archives and a
  modern sans font), Vite/Tailwind/TS/ESLint/Vitest configuration.
- Inline SVG icon technique (icons only, never product imagery).
- Skip link, scroll manager, native `<dialog>` mobile-menu pattern.
- Asset manifest, asset validator, visual-QA runner, token generator.
- The eight verified photographs, with their existing provenance.

### Replace

- `src/App.tsx` route tree.
- `src/main.tsx` providers and font imports.
- `src/styles/index.css` and canonical token values.
- All pages, all commerce components, the product data module and catalogue
  filter module.
- All current tests tied to cart/product behaviour.
- `site/index.html` language, title, description, theme colour.
- `docs/01`, `docs/04`, `docs/05`, `docs/06`, `docs/PHASE_STATUS.md`, and
  `docs/DECISIONS.md` entries that describe the superseded store.

### Do not touch

- `scripts/verify-bootstrap.mjs`, `scripts/validate-assets.mjs`,
  `scripts/visual-qa.mjs`, `scripts/build-tokens.mjs`.
- `.agents/skills/`, `skills-lock.json`, `.opencode/commands/build-site.md`,
  browser installation, provider or credential settings.
- Bootstrap evidence and reference material.
- Unrelated user files. The pre-realignment state is preserved at `ef09a4f`.

## 6. Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Demo photos could be mistaken for a school's real uniform | Global demo notice, per-photo credit/licence, explicit "Foto demonstrasi" copy on detail and about pages, no school logo/insignia claims. |
| Reusing the same stock photo across demo schools implies ownership | Label the gallery as reference imagery; seed counts derive from actual records; no claim of official uniform. |
| Uploaded files exceed localStorage quota | Size limit, JPEG/PNG/WebP validation, compression to a bounded data URL, honest error if persistence fails. |
| Bulk download fails on a missing file | Preflight all photo fetches; on failure show an error and do not present a partial archive as success. |
| Admin demo mistaken for secure CMS | Persistent "Mode demo" banner, no passwords stored, no client guard claimed as security, `/admin/masuk` explicitly non-authenticating. |
| Prior docs revive the store brief | Supersession banner in `docs/01`; new decisions override D-010/D-012–D-014; status handoff updated. |

## 7. Audit conclusion

**Proceed with partial application-layer rebuild.** Preserve the toolchain and
verified assets; remove the commerce layer; implement the corrected public and
admin routes in the same `site/` application. The only genuine external
uncertainty is the bootstrap verifier's CDN reachability check, which does not
prevent browser work and must be reported rather than masked.
