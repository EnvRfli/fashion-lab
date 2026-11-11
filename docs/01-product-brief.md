# 01 — Product Brief

> **Status: PHASE 0 RECORDED — brief received 2026-11-11.**
> Interpretations are labeled `[PROPOSED]`. The brief itself is quoted verbatim
> below and is the authority for product truth.

## Status legend

- `[PROPOSED]` — agent suggestion; not verified or approved.
- `[VERIFIED]` — checked against a source.
- `[APPROVED]` — human approval, or a recorded autonomous decision.
- `[PENDING]` — awaiting information or a decision.
- `[BLOCKED]` — cannot proceed; reason and corrective action required.

## Brief intake

| Field | Value | Status |
| --- | --- | --- |
| Project name | Fairholt Schoolwear (provisional brand name; brief permits the agent to propose one) | `[PROPOSED]` |
| Brief source | `docs/PROJECT_BRIEF.md`; SHA-256 `4dffb2aee46457bcfe8f34201c85d5083f17e74487825e18eeab020ced4db972`; supplied by the project owner | `[VERIFIED]` |
| Date received | 2026-11-11 | `[VERIFIED]` |
| Product | A demonstration school-uniform e-commerce storefront: browsing, product detail, and a local demonstration cart. It is not a production retailer, payment system, or inventory system. | `[VERIFIED]` |
| Primary audience | Parents and carers shopping for school uniforms. | `[VERIFIED]` |
| Secondary audience | Students choosing or checking uniform pieces, and school staff evaluating an outfitter. | `[VERIFIED]` |
| Primary job | Find the right uniform pieces by category and school stage, inspect product detail, and build a cart. | `[VERIFIED]` |
| Requested routes/pages | `/`, `/shop`, `/shop/:slug`, `/cart` | `[VERIFIED]` |
| Content supplied | Written brief and one reference screenshot (`docs/references/WhatsApp Image 2026-11-11 at 15.12.56.jpeg`). No product catalogue, inventory, prices, reviews, or school partnerships were supplied. | `[VERIFIED]` |
| Brand requirements | Provisional identity allowed. Reference characteristics are design guidance; protected brand assets, names, and copy must not be copied. | `[VERIFIED]` |
| Technical constraints | React, TypeScript, Vite, Tailwind CSS. No backend, payment gateway, order processing, or inventory synchronisation. | `[VERIFIED]` |
| Accessibility target | WCAG 2.2 AA | `[PROPOSED]` |
| Frontend location | `site/` | `[APPROVED]` (default recorded by workflow) |
| Mode | `autonomous` | `[VERIFIED]` |
| AI image generation | Prohibited: the brief says "Do not generate product photography." | `[VERIFIED]` |
| Deployment | Out of scope per brief. | `[VERIFIED]` |

## Original brief

> Source file: `docs/PROJECT_BRIEF.md`. Quoted verbatim, including line breaks.

```text
# PROJECT BRIEF

## Product
A professional school-uniform e-commerce website.

## Audience
Parents, students, and schools looking for
school uniforms and related apparel.

## Primary Goal
Create a visually distinctive, trustworthy,
responsive e-commerce storefront.

## Required Routes
- / — Homepage
- /shop — Product catalog
- /shop/:slug — Product detail
- /cart — Shopping cart

## Non-Goals
- No production payment gateway
- No real order processing
- No backend inventory synchronization
- No deployment

## Content Provenance
This is a demonstration storefront.

Product names, prices, and descriptions
must be identified as sample content
unless supplied by the user.

Do not invent business credentials,
reviews, testimonials, or sales metrics.

## Brand Inputs
Use a provisional brand identity.
The agent may propose a suitable name.

## Visual References
Read all available screenshots in:
docs/references/

Extract their visual characteristics:
- Layout and composition
- Typography
- Spacing
- Color relationships
- Product photography placement
- Desktop and mobile presentation

Use them as strong design guidance.
Do not copy protected brand assets.

## Photography Policy
Use real licensed photographs from
suitable online sources.

Do not generate product photography.
Do not create SVG clothing illustrations.

Download and verify the selected images.
Record source and license information.

Treat stock photos as demonstration content,
not genuine inventory photography.

If suitable photos are unavailable,
report the blocker without fabricating assets.

## Execution Mode
autonomous

## Technology
React, TypeScript, Vite, Tailwind CSS.

## Quality Requirements
- Professional editorial design
- Strong visual hierarchy
- Responsive desktop/mobile layouts
- Functional product browsing
- Functional local demonstration cart
- Accessible interactive elements
- No broken images
- Browser-based visual QA
- Compliance with all bootstrap quality gates

## Reference-Based Visual Acceptance

The final website must be visually reviewed
against the supplied reference screenshots.

Do not evaluate visual quality only by
successful builds or browser audits.

Inspect screenshot pixels and identify:
- Major composition differences
- Incorrect visual hierarchy
- Inconsistent spacing and typography
- Unintended generic AI design patterns
- Product imagery that violates the asset policy

Refine the website to address these issues.

Record remaining differences and the
reasons for any intentional deviations.

Do not claim pixel-perfect matching.
The goal is professional visual fidelity
with responsive and functional implementation.
```

## Structured interpretation

> Everything in this section is an interpretation and is labeled `[PROPOSED]`
> until verified or approved. The brief itself remains authoritative.

### Product statement

- `[PROPOSED]` Fairholt Schoolwear is a demonstration storefront for a fictional
  specialist school-uniform outfitter. It presents uniform pieces by garment
  category and school stage, supports product discovery and comparison, and lets
  a visitor assemble a cart. Product names, prices, and descriptions are sample
  content and are labeled as such in the interface.

### Primary job

- `[PROPOSED]` Let a parent or carer move from "what does my child need?" to a
  confident shortlist and a populated cart in a few minutes, without needing to
  know the retailer's internal catalogue structure.

### Success criteria

- `[PROPOSED]` A first-time visitor can identify the shop's purpose within the
  first viewport, browse by garment category and stage, open a product, choose a
  size, add it to the cart, change quantity, and see the subtotal update.
- `[PROPOSED]` All four required routes render and are reachable from persistent
  navigation; the cart persists across reloads in local storage.
- `[PROPOSED]` The site is responsive at 390, 768, and 1440 CSS pixels with no
  horizontal overflow, works by keyboard, and passes automated accessibility
  checks with no serious or critical violations.
- `[PROPOSED]` Every product image is a real, locally stored, licensed
  photograph recorded in the manifest; sample content is visibly identified.

### Audiences and context

- `[PROPOSED]` **Primary — parents and carers.** Time-poor, often shopping on a
  phone in the evening, comparing sizes and prices, and checking whether a piece
  is suitable for a school stage. They need plain categories, visible prices,
  clear sizing help, and a low-friction cart.
- `[PROPOSED]` **Secondary — students.** Confident with mobile commerce, focused
  on fit and appearance, likely to share links or check the cart on the same
  device.
- `[PROPOSED]` **Secondary — school staff.** Evaluating whether an outfitter
  looks organised and credible. They will read service and quality information,
  not just product cards. No real school names or partnerships may be implied.
- `[PROPOSED]` Device mix: mobile-first. All key journeys must be complete at
  390px, comfortable at 768px, and editorial at 1440px.

### Requested scope

- `[VERIFIED]` Routes: `/` homepage, `/shop` catalogue, `/shop/:slug` product
  detail, `/cart` cart.
- `[PROPOSED]` Catalogue features: category filter, school-stage filter, text
  search, sort by price/name, result count, empty state, and clear-all.
- `[PROPOSED]` Product detail: image, sample price, description, size selection,
  quantity, add-to-cart, size guidance, fabric/care detail, and related items.
- `[PROPOSED]` Cart: line items, quantity changes, removal, subtotal, sample
  checkout notice, empty state, and persisted state.
- `[PROPOSED]` Global: responsive header with mobile menu, footer, 404 page,
  skip link, focus states, and demonstration-content labelling.

### Explicit non-goals

- `[VERIFIED]` No production payment gateway, real order processing, or backend
  inventory synchronisation.
- `[VERIFIED]` No deployment.
- `[PROPOSED]` No accounts, authentication, wishlists, reviews, loyalty scheme,
  live chat, or real stock availability.
- `[PROPOSED]` No invented school names, partnerships, testimonials, ratings,
  sales figures, or business credentials.
- `[PROPOSED]` No AI-generated or illustrated product imagery.

### Constraints

- `[VERIFIED]` Photography must be real, licensed, downloaded, verified, and
  recorded. Stock imagery is demonstration content only.
- `[VERIFIED]` Product names, prices, and descriptions are sample content and
  must be identified as such.
- `[PROPOSED]` WCAG 2.2 AA: semantic landmarks, one `h1` per page, labelled
  controls, visible focus, 44px touch targets, reduced-motion handling, and
  AA contrast.
- `[PROPOSED]` No backend: cart state is a clearly labeled local demonstration
  using `localStorage`; no network calls.
- `[VERIFIED]` Framework: React, TypeScript, Vite, Tailwind CSS.
- `[PROPOSED]` Performance: local optimised images, explicit dimensions,
  lazy-loading below the fold, and no third-party runtime dependencies beyond
  the framework and icons.

### Content provenance

| Content item | Source | Status |
| --- | --- | --- |
| Product names | Agent-written sample content, clearly labelled | `[PROPOSED]` |
| Product prices | Agent-written sample values (GBP), clearly labelled | `[PROPOSED]` |
| Product descriptions and fabric notes | Agent-written sample content, clearly labelled | `[PROPOSED]` |
| Brand name and wordmark | Agent-proposed provisional identity ("Fairholt Schoolwear") | `[PROPOSED]` |
| Product photographs | Licensed stock photography, downloaded and recorded as demonstration imagery | `[PENDING]` Phase 3 |
| Editorial/lifestyle photographs | Licensed stock photography, recorded as demonstration imagery | `[PENDING]` Phase 3 |
| School names, partnerships, reviews, ratings, sales metrics | Not supplied; must not be invented | `[VERIFIED]` out of scope |
| Service, delivery, and returns claims | Not supplied; must not be presented as real policy | `[VERIFIED]` out of scope |

## Open questions

| Question | Why it matters | Blocking? | Status |
| --- | --- | --- | --- |
| Final brand name? | The brief permits a provisional identity, so the agent may proceed with a working name. | No | `[PROPOSED]` Fairholt Schoolwear |
| Real catalogue, prices, and stock? | Not supplied; the brief explicitly frames this as a demonstration storefront with sample content. | No | `[VERIFIED]` sample content |
| School partnerships or real uniform lists? | Not supplied and must not be invented. | No | `[VERIFIED]` out of scope |
| Photography source? | Brief requires real licensed photos; Phase 3 must verify and record each one. | Yes, for Phase 3 | `[PENDING]` |
| Approval mode? | Brief records `autonomous`. | No | `[VERIFIED]` |

## Approval record

| Decision | Approved by | Date | Scope |
| --- | --- | --- | --- |
| Project brief accepted for execution | Project owner (brief supplied in `docs/PROJECT_BRIEF.md`) | 2026-11-11 | Brief and autonomous mode as written |
| Frontend location `site/` | Workflow default (autonomous) | 2026-11-11 | Application location |

## Phase 0 checklist

- [x] Brief received and quoted verbatim.
- [x] Product, audience, primary job, scope, and mode are explicit.
- [x] Content sources identified or marked pending.
- [x] Frontend location recorded (`site/`).
- [x] `npm run verify:bootstrap` passes (35/35, 2026-11-11).
- [x] No invented requirements.
- [x] Status updated in `docs/PHASE_STATUS.md`.
