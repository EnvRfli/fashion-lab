# 05 — Page Specifications

> **Status: PHASE 5 COMPLETE — every route, state, asset slot, and interaction
> is specified. Implementation follows this document.**
> Product names, prices, sizes, fabric notes, and copy are **sample content**
> and must be labelled as such in the interface.

## Status legend

- `[PROPOSED]` — agent suggestion; not verified or approved.
- `[VERIFIED]` — checked against the brief, assets, or design system.
- `[APPROVED]` — human approval, or a recorded autonomous decision.
- `[PENDING]` — awaiting information or a decision.
- `[BLOCKED]` — cannot proceed; reason and corrective action required.

## Global specification

| Field | Value | Status |
| --- | --- | --- |
| Frontend location | `site/` | `[APPROVED]` |
| Framework | React + TypeScript + Vite + Tailwind CSS v4 (decision recorded in Phase 6) | `[PROPOSED]` |
| Routes | `/`, `/shop`, `/shop/:slug`, `/cart`, `*` (404) | `[VERIFIED]` |
| Navigation model | Masthead with Shop, Junior, Senior, Sixth, Fit & care, and Cart. Stage links deep-link to filtered shop results. Mobile menu under 1024px. | `[PROPOSED]` |
| Breakpoints | 390 / 768 / 1440 target; 640 / 1024 intermediate | `[VERIFIED]` |
| Accessibility target | WCAG 2.2 AA | `[VERIFIED]` |
| Content source | `docs/01-product-brief.md`; sample copy defined here | `[VERIFIED]` |
| Asset source | `docs/03-asset-manifest.md` (8 assets) | `[VERIFIED]` |
| Design source | `docs/04-design-system.md` (78 tokens) | `[VERIFIED]` |
| Cart persistence | `localStorage` key `fairholt.bag.v1`; local demonstration only | `[PROPOSED]` |
| Analytics / tracking | None | `[VERIFIED]` |

### Route map

| Route | Purpose | Primary action | Assets | Status |
| --- | --- | --- | --- | --- |
| `/` | Explain the fictional outfitter, show the range's character, route into the catalogue | Shop the collection | `hero-uniform-flatlay`, `editorial-atelier-rail`, five product images | `[VERIFIED]` |
| `/shop` | Browse, search, filter, and sort six sample pieces | Open a product | Six product images | `[VERIFIED]` |
| `/shop/:slug` | Evaluate one product and add it to the bag | Add to bag | One product image; three related product images | `[VERIFIED]` |
| `/cart` | Review and adjust the demonstration bag | Adjust quantity or review demo checkout | Product thumbnails | `[VERIFIED]` |
| `*` | Recover from unknown URLs | Return to shop | None | `[VERIFIED]` |

### Catalogue (sample content)

All fields below are `[PROPOSED]` sample content. Names, prices, descriptions,
sizes, and fabric details are illustrative and must be labelled "Sample" or
"Sample price" at the point of use.

| Slug | Name | Category | Stages | Sample price | Sizes | Image |
| --- | --- | --- | --- | --- | --- | --- |
| `the-poplin-shirt` | The Poplin Shirt | Shirts | Junior, Senior | £26 | 3–4Y to 15–16Y | `product-poplin-shirt` |
| `the-wool-blazer` | The Wool Blazer | Blazers | Senior, Sixth | £78 | 11–12Y to 17–18Y | `product-wool-blazer` |
| `the-striped-knit` | The Striped Knit | Knitwear | Junior, Senior | £34 | 5–6Y to 13–14Y | `product-striped-knit` |
| `the-cotton-skirt` | The Cotton Skirt | Skirts & Trousers | Junior, Senior | £30 | 5–6Y to 13–14Y | `product-cotton-skirt` |
| `the-twill-trouser` | The Twill Trouser | Skirts & Trousers | Senior | £38 | 11–12Y to 15–16Y | `product-twill-trouser` |
| `the-leather-loafer` | The Leather Loafer | Accessories | Senior, Sixth | £52 | UK 3–8 | `product-leather-loafer` |

Category counts: Blazers 1, Shirts 1, Knitwear 1, Skirts & Trousers 2,
Accessories 1. The homepage category row uses these real counts.

---

## `/` — Homepage

### Purpose

- **Primary job:** Establish the outfitter's character and route a visitor into
  the catalogue by garment layer or school stage.
- **Audience:** Parents and carers (primary); students and school staff
  (secondary).
- **Success looks like:** A visitor understands this is a demonstration
  schoolwear shop, sees real garment photography, and reaches `/shop` with or
  without a filter.

### Wireframe

```text
┌───────────────────────────────────────────────────────────────────────┐
│ DEMO NOTICE: sample products, prices, no real checkout                │
├───────────────────────────────────────────────────────────────────────┤
│ FAIRHOLT [F]        Shop  Junior  Senior  Sixth  Fit & care   Bag (0) │
│ ───────────────────────────────────────────────────────────────────── │
├───────────────────────────────────────────────────────────────────────┤
│  A uniform,                            ┌───────────────────────────┐   │
│  considered.                           │ IMAGE: hero-uniform-      │   │
│                                        │ flatlay (4:5, 20px)       │   │
│  Schoolwear essentials laid out        │                           │   │
│  plainly: six sample pieces, real      │                           │   │
│  photographs, a cart you can try.      │                           │   │
│                                        │                           │   │
│  [ Shop the collection ] [ Fit & care ]└───────────────────────────┘   │
│  ─────────────────────────────────────────────────────────────────     │
│  JUNIOR 4–11   │   SENIOR 11–16   │   SIXTH 16–18                     │
├───────────────────────────────────────────────────────────────────────┤
│  Shop by layer                                            All pieces   │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐              │
│  │ IMAGE  │ │ IMAGE  │ │ IMAGE  │ │ IMAGE  │ │ IMAGE  │              │
│  │ Blazers│ │ Shirts │ │ Knit   │ │ Lower  │ │ Acc.   │              │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘              │
├───────────────────────────────────────────────────────────────────────┤
│  Term essentials                                      See all six     │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐                           │
│  │ IMAGE     │ │ IMAGE     │ │ IMAGE     │                           │
│  │ name      │ │ name      │ │ name      │                           │
│  │ stage £—  │ │ stage £—  │ │ stage £—  │                           │
│  └───────────┘ └───────────┘ └───────────┘                           │
├───────────────────────────────────────────────────────────────────────┤
│  ┌────────────────────────┐   Fit, care, and the school gate          │
│  │ IMAGE: editorial-      │   Short practical copy.                   │
│  │ atelier-rail (3:2)     │   Three short points, no invented policy. │
│  └────────────────────────┘                                           │
├───────────────────────────────────────────────────────────────────────┤
│  OXBLOOD FOOTER: nav · credits · Pexels licence · demo note           │
└───────────────────────────────────────────────────────────────────────┘
```

- Wireframe status: `[VERIFIED]` (implementation reference, not a pixel spec)

### Content inventory

| Item | Copy/content | Source | Status |
| --- | --- | --- | --- |
| Demo notice | "Demonstration storefront — products, prices, and checkout are illustrative." | D-010 | `[APPROVED]` |
| Brand | Fairholt Schoolwear; "F" monogram + wordmark | D-009 | `[PROPOSED]` |
| Headline | "A uniform, considered." | Agent copy | `[PROPOSED]` |
| Intro | "Schoolwear essentials laid out plainly: six sample pieces, real photographs, and a cart you can try." | Agent copy | `[PROPOSED]` |
| Primary CTA | "Shop the collection" → `/shop` | Agent copy | `[PROPOSED]` |
| Secondary CTA | "Fit and care" → `#fit-and-care` | Agent copy | `[PROPOSED]` |
| Stage rail | "Junior 4–11", "Senior 11–16", "Sixth 16–18" | Sample navigation labels, not uniform rules | `[PROPOSED]` |
| Category heading | "Shop by layer" | Agent copy | `[PROPOSED]` |
| Category labels | Blazers, Shirts, Knitwear, Skirts & Trousers, Accessories | Catalogue | `[PROPOSED]` |
| Essentials heading | "Term essentials" | Agent copy | `[PROPOSED]` |
| Product cards | Four of the six catalogue products: shirt, blazer, knit, skirt | Catalogue | `[PROPOSED]` |
| Fit section heading | "Fit, care, and the school gate" | Agent copy | `[PROPOSED]` |
| Fit copy | Three short practical points: start from the school's list; measure now and leave a little room; follow the care label and keep a spare shirt. No delivery/returns promises. | Agent copy | `[PROPOSED]` |
| Footer | Navigation, demo statement, photography credit, Pexels licence link | Assets + D-010 | `[PROPOSED]` |

### Asset slots

| Slot | Manifest ID | Aspect ratio | Treatment | Status |
| --- | --- | --- | --- | --- |
| Hero | `hero-uniform-flatlay` | 4:5 | 20px radius; full image; no text overlay | `[VERIFIED]` |
| Category: Blazers | `product-wool-blazer` | 4:5 | Cover crop to jacket body | `[VERIFIED]` |
| Category: Shirts | `product-poplin-shirt` | 4:5 | Cover crop below collar | `[VERIFIED]` |
| Category: Knitwear | `product-striped-knit` | 4:5 | Cover crop, full folded knit | `[VERIFIED]` |
| Category: Skirts & Trousers | `product-cotton-skirt` | 4:5 | Cover crop, full skirt | `[VERIFIED]` |
| Category: Accessories | `product-leather-loafer` | 4:5 | Cover crop, shoes | `[VERIFIED]` |
| Essentials cards | `product-poplin-shirt`, `product-wool-blazer`, `product-striped-knit`, `product-cotton-skirt` | 4:5 | Product card | `[VERIFIED]` |
| Fit editorial | `editorial-atelier-rail` | 3:2 | Full image, 20px radius | `[VERIFIED]` |

### Layout and responsive behavior

| Width | Layout | Navigation | Notes | Status |
| --- | --- | --- | --- | --- |
| 390 | Single column; hero copy first, image second; stage rail horizontal scroll; categories 1 column or 2-up compact; essentials 1 column; editorial stacked | Menu button opens full-width panel; bag count visible | 16px gutters; display type ~44px; no horizontal page overflow | `[PROPOSED]` |
| 768 | Hero 1:1 or image-first; categories 2 columns; essentials 2 columns; editorial 1:1 | Menu button until 1024px | 24px gutters; stage rail fits | `[PROPOSED]` |
| 1440 | 7/5 hero; categories 5 columns; essentials 3 columns with fourth wrapping; editorial split 5/7 | Full inline nav; bag count | 1240px shell; 96px section rhythm | `[PROPOSED]` |

### Components and tokens

| Component | Variant | Tokens | Status |
| --- | --- | --- | --- |
| Demo notice | Warning bar | `--color-base-blush`, `--color-semantic-warning`, `--space-xs` | `[PROPOSED]` |
| Header | Masthead | `--color-base-chalk`, `--color-base-oxblood`, `--layout-header-height` | `[PROPOSED]` |
| Hero | Blush field | `--color-base-blush`, `--color-base-oxblood`, `--radius-lg` | `[PROPOSED]` |
| Stage rail | Three links | `--color-base-ink`, `--color-base-border`, `--space-md` | `[PROPOSED]` |
| Category tile | Image + label | `--radius-lg`, `--color-base-paper`, `--font-size-lg` | `[PROPOSED]` |
| Product card | Image + meta | `--radius-lg`, `--color-base-border`, `--font-size-sm` | `[PROPOSED]` |
| Editorial split | Image + copy | `--color-base-chalk`, `--typography-measure-body` | `[PROPOSED]` |
| Footer | Solid | `--color-base-oxblood-deep`, `--color-text-inverse` | `[PROPOSED]` |

### Interaction and state matrix

| Element | Default | Hover | Focus-visible | Active | Disabled | Loading | Error | Empty | Success |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Primary CTA | Oxblood pill | Deep oxblood | 2px oxblood ring, 2px offset | Slight scale 0.99 | n/a | n/a | n/a | n/a | n/a |
| Stage link | Ink text, rule below | Oxblood | Ring | n/a | n/a | n/a | n/a | n/a | n/a |
| Category tile | Image + label | Image scale 1.02; label underline | Ring on tile | n/a | n/a | n/a | n/a | n/a | n/a |
| Product card | Flat card | Image scale 1.02; title underline | Ring | n/a | n/a | n/a | n/a | n/a | n/a |
| Menu button | Icon + "Menu" | Blush fill | Ring | n/a | n/a | n/a | n/a | n/a | n/a |

### Real functionality

| Action | Behavior | Data source | Verified? |
| --- | --- | --- | --- |
| Shop CTAs and stage links | Navigate to `/shop` with optional `stage` query | Router | `[PENDING]` Phase 6/7 |
| Category tiles | Navigate to `/shop?category=<slug>` | Router | `[PENDING]` |
| Product cards | Navigate to `/shop/:slug` | Router | `[PENDING]` |
| Fit and care | In-page anchor with sticky-header offset | DOM | `[PENDING]` |
| Menu | Opens/closes, traps focus, Escape returns focus | Component state | `[PENDING]` |
| Bag count | Reads persisted cart; updates after changes | `localStorage` | `[PENDING]` |

### Accessibility acceptance

- [ ] One `<h1>` ("A uniform, considered."); sections use `<h2>`.
- [ ] Header, nav, main, footer landmarks; skip link first in tab order.
- [ ] Hero image has manifest alt; decorative rules are `aria-hidden`.
- [ ] Stage rail is a list of links with `aria-current` when active.
- [ ] Category tiles are single links with accessible names including the count.
- [ ] Menu button `aria-expanded`, `aria-controls`; Escape closes; focus returns.
- [ ] No horizontal overflow at 390, 768, or 1440.
- [ ] All text/background pairs meet AA; focus visible on every interactive element.
- [ ] Reduced motion disables image scaling and menu transitions.
- [ ] Touch targets ≥44×44px.

---

## `/shop` — Catalogue

### Purpose

- **Primary job:** Help a visitor find the right pieces by category, stage, or
  search, and open a product.
- **Audience:** Parents/carers and students who know roughly what they need.
- **Success looks like:** The result count and cards respond correctly to every
  filter combination; no combination dead-ends without a clear reset.

### Wireframe

```text
┌───────────────────────────────────────────────────────────────────────┐
│ DEMO NOTICE                                                           │
├───────────────────────────────────────────────────────────────────────┤
│ FAIRHOLT        Shop  Junior  Senior  Sixth  Fit & care   Bag (0)     │
├───────────────────────────────────────────────────────────────────────┤
│  The collection                                                       │
│  Six sample pieces. Prices are illustrative.             6 pieces      │
│                                                                       │
│  [ Search pieces…                          ]  Sort: [ Featured  v ]   │
│  Category: [All] [Blazers] [Shirts] [Knitwear] [Skirts & Trousers]    │
│            [Accessories]                                              │
│  Stage:    [All stages] [Junior] [Senior] [Sixth]                     │
│  Showing 6 pieces · [Clear all]                                       │
├───────────────────────────────────────────────────────────────────────┤
│  ┌───────────┐  ┌───────────┐  ┌───────────┐                         │
│  │ IMAGE 4:5 │  │ IMAGE 4:5 │  │ IMAGE 4:5 │                         │
│  │ Shirts    │  │ Blazers   │  │ Knitwear  │                         │
│  │ Name      │  │ Name      │  │ Name      │                         │
│  │ Junior    │  │ Senior    │  │ Junior    │                         │
│  │ £26 Sample│  │ £78 Sample│  │ £34 Sample│                         │
│  └───────────┘  └───────────┘  └───────────┘                         │
│  … second row for the remaining three products                        │
├───────────────────────────────────────────────────────────────────────┤
│  Empty state (only when filters yield nothing)                        │
│  No pieces match that combination. [Clear filters]                    │
├───────────────────────────────────────────────────────────────────────┤
│  FOOTER                                                               │
└───────────────────────────────────────────────────────────────────────┘
```

- Wireframe status: `[VERIFIED]`

### Content inventory

| Item | Copy/content | Source | Status |
| --- | --- | --- | --- |
| Page heading | "The collection" | Agent copy | `[PROPOSED]` |
| Intro | "Six sample pieces for the school week. Prices are illustrative." | Agent copy | `[PROPOSED]` |
| Search label | "Search pieces" (visible label, not placeholder-only) | Agent copy | `[PROPOSED]` |
| Search placeholder | "Try 'shirt' or 'blazer'" | Agent copy | `[PROPOSED]` |
| Category filters | All, Blazers, Shirts, Knitwear, Skirts & Trousers, Accessories | Catalogue | `[PROPOSED]` |
| Stage filters | All stages, Junior, Senior, Sixth | Catalogue | `[PROPOSED]` |
| Sort options | Featured, Price low to high, Price high to low, Name A–Z | Agent copy | `[PROPOSED]` |
| Result count | "Showing N of 6 pieces" | Derived | `[PROPOSED]` |
| Clear all | "Clear all" | Agent copy | `[PROPOSED]` |
| Empty state | "No pieces match that combination." + "Clear filters" + "Browse everything" | Agent copy | `[PROPOSED]` |
| Product card | Category, name, stages, "£— Sample price" | Catalogue | `[PROPOSED]` |

### Asset slots

| Slot | Manifest ID | Aspect ratio | Treatment | Status |
| --- | --- | --- | --- | --- |
| Product cards (6) | `product-poplin-shirt`, `product-wool-blazer`, `product-striped-knit`, `product-cotton-skirt`, `product-twill-trouser`, `product-leather-loafer` | 4:5 | Cover crop per product guidance | `[VERIFIED]` |

### Layout and responsive behavior

| Width | Layout | Navigation | Notes | Status |
| --- | --- | --- | --- | --- |
| 390 | Single column; filters stacked; search full width; sort below; results 1 column | Menu button | Horizontal chip rows may scroll; no page overflow | `[PROPOSED]` |
| 768 | Filters 2 rows; results 2 columns | Menu button | Sort aligned right; chips wrap | `[PROPOSED]` |
| 1440 | Filter bar in 2 rows; results 3 columns | Full nav | 1240px shell; card gap 24px | `[PROPOSED]` |

### Components and tokens

| Component | Variant | Tokens | Status |
| --- | --- | --- | --- |
| Search input | Text | `--color-base-paper`, `--color-base-border-strong`, `--radius-md` | `[PROPOSED]` |
| Filter chip | Selectable | `--radius-pill`, `--color-base-blush`, `--color-base-oxblood` | `[PROPOSED]` |
| Sort select | Native | `--color-base-border-strong`, `--radius-md` | `[PROPOSED]` |
| Result count | Caption | `--font-size-sm`, `--color-text-secondary` | `[PROPOSED]` |
| Product grid | 1/2/3 columns | `--space-md`, `--radius-lg` | `[PROPOSED]` |
| Empty state | Notice block | `--color-base-blush`, `--color-base-oxblood` | `[PROPOSED]` |

### Interaction and state matrix

| Element | Default | Hover | Focus-visible | Active | Disabled | Loading | Error | Empty | Success |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Search | Empty field | n/a | Ring | n/a | n/a | n/a | n/a | "No pieces…" | Matching cards |
| Category chip | Outline | Blush fill | Ring | Selected: oxblood fill, inverse text | n/a | n/a | n/a | n/a | n/a |
| Stage chip | Outline | Blush fill | Ring | Selected: oxblood fill | n/a | n/a | n/a | n/a | n/a |
| Sort | Featured | n/a | Ring | n/a | n/a | n/a | n/a | n/a | Reorder grid |
| Clear all | Text button | Underline | Ring | n/a | Hidden when no filters | n/a | n/a | n/a | All six reset |
| Product card | Flat | Image scale | Ring | n/a | n/a | n/a | n/a | n/a | n/a |

### Real functionality

| Action | Behavior | Data source | Verified? |
| --- | --- | --- | --- |
| Search | Case-insensitive match on name, category, description, stage | Local catalogue | `[PENDING]` |
| Category filter | Single-select; updates results and URL `category` | Local catalogue | `[PENDING]` |
| Stage filter | Single-select; updates results and URL `stage` | Local catalogue | `[PENDING]` |
| Sort | Reorders by price/name; updates URL `sort` | Local catalogue | `[PENDING]` |
| Clear all | Resets search, category, stage, sort; updates URL | Router | `[PENDING]` |
| Deep links | `/shop?category=shirts&stage=junior` restores state on load | URLSearchParams | `[PENDING]` |
| Card click | Navigates to product detail | Router | `[PENDING]` |

Rules:

- Filtering is combinatorial and must never produce a blank page without the
  empty state.
- URL parameters are the source of truth for shareable state; invalid values
  fall back to "all".
- No backend; all six products are local data.

### Accessibility acceptance

- [ ] One `<h1>`; filters grouped with `<fieldset>`/`<legend>` or labelled groups.
- [ ] Search has a visible `<label>`; placeholder is supplementary.
- [ ] Chips are buttons with `aria-pressed`; selected state is not colour-only.
- [ ] Result changes announced once via a polite live region; not on every keypress.
- [ ] Empty state focus moves to its heading or first action.
- [ ] Sort is a native `<select>` with a visible label.
- [ ] Cards have one accessible name; no nested interactive elements.
- [ ] Keyboard reaches all filters and cards in logical order.

---

## `/shop/:slug` — Product detail

### Purpose

- **Primary job:** Give enough detail to choose a size and add the piece to the
  bag.
- **Audience:** A visitor who has shortlisted this piece.
- **Success looks like:** Add-to-bag works with a chosen size, the bag count
  updates, and invalid slugs show the 404 state.

### Wireframe

```text
┌───────────────────────────────────────────────────────────────────────┐
│ DEMO NOTICE                                                           │
├───────────────────────────────────────────────────────────────────────┤
│ FAIRHOLT        Shop  Junior  Senior  Sixth  Fit & care   Bag (1)     │
├───────────────────────────────────────────────────────────────────────┤
│  Home / Shop / Shirts                                                 │
│                                                                       │
│  ┌──────────────────────────────┐   Shirts                            │
│  │                              │   The Poplin Shirt                 │
│  │  IMAGE 4:5                   │   £26  Sample price                │
│  │  product-poplin-shirt        │                                    │
│  │                              │   Sample description…              │
│  │                              │                                    │
│  │                              │   Size  [ 3–4Y ][ 5–6Y ][ 7–8Y ]   │
│  │                              │         [ 9–10Y ][ 11–12Y ] …      │
│  └──────────────────────────────┘   [ - 1 + ]  [ Add to bag ]        │
│                                     Demo note: no real checkout.      │
│                                     ▸ Details and care                │
│                                     ▸ Size guide (sample)             │
├───────────────────────────────────────────────────────────────────────┤
│  Goes with                                                            │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐                           │
│  │ IMAGE     │ │ IMAGE     │ │ IMAGE     │                           │
│  └───────────┘ └───────────┘ └───────────┘                           │
└───────────────────────────────────────────────────────────────────────┘
```

- Wireframe status: `[VERIFIED]`

### Content inventory

| Item | Copy/content | Source | Status |
| --- | --- | --- | --- |
| Breadcrumb | Home / Shop / {Category} | Derived | `[PROPOSED]` |
| Category | Shirts | Catalogue | `[PROPOSED]` |
| Name | The Poplin Shirt | Catalogue | `[PROPOSED]` |
| Price | £26, labelled "Sample price" | Catalogue | `[PROPOSED]` |
| Description | Product-specific sample copy, 2–3 sentences | Catalogue | `[PROPOSED]` |
| Size legend | "Size" + "Sample size range" | Agent copy | `[PROPOSED]` |
| Add to bag | "Add to bag" | Agent copy | `[PROPOSED]` |
| Demo note | "Demonstration only — no payment is taken." | D-010 | `[PROPOSED]` |
| Details | Fabric composition and care, product-specific | Catalogue | `[PROPOSED]` |
| Size guide | Illustrative age/measurement table, labelled sample | Catalogue | `[PROPOSED]` |
| Related | "Goes with" + 3 products from other categories | Derived | `[PROPOSED]` |
| Invalid slug | 404 state: "This page has left the register." | Agent copy | `[PROPOSED]` |

### Asset slots

| Slot | Manifest ID | Aspect ratio | Treatment | Status |
| --- | --- | --- | --- | --- |
| Main image | Product image by slug | 4:5 | Contain/cover depending on image; 20px radius; no stretch | `[VERIFIED]` |
| Related cards (3) | Other product images | 4:5 | Product card crop | `[VERIFIED]` |

### Layout and responsive behavior

| Width | Layout | Navigation | Notes | Status |
| --- | --- | --- | --- | --- |
| 390 | Image first; details below; size buttons 3–4 per row; sticky add bar at bottom? No — keep inline to avoid obstruction | Menu button | Add to bag full width; related cards 1 column | `[PROPOSED]` |
| 768 | Image 1:1 with details; size buttons wrap; related 2 columns | Menu button | 24px gutters | `[PROPOSED]` |
| 1440 | 7/5 split; image sticky within its column; details right; related 3 columns | Full nav | 1240px shell | `[PROPOSED]` |

### Components and tokens

| Component | Variant | Tokens | Status |
| --- | --- | --- | --- |
| Breadcrumb | Text links | `--font-size-sm`, `--color-text-secondary` | `[PROPOSED]` |
| Size selector | Radio group | `--radius-md`, `--color-base-oxblood`, `--color-base-blush` | `[PROPOSED]` |
| Quantity stepper | − / value / + | `--color-base-border-strong`, `--radius-pill` | `[PROPOSED]` |
| Add to bag | Primary | `--color-base-oxblood`, `--radius-pill` | `[PROPOSED]` |
| Accordion | Details, size guide | `--color-base-border`, `--font-size-lg` | `[PROPOSED]` |
| Related card | Product card | Same as shop | `[PROPOSED]` |

### Interaction and state matrix

| Element | Default | Hover | Focus-visible | Active | Disabled | Loading | Error | Empty | Success |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Size radio | Outline | Blush | Ring | Selected: oxblood border + dot | Unavailable size: line-through + disabled | n/a | "Choose a size" if add without selection | n/a | n/a |
| Quantity | 1 | n/a | Ring | n/a | Minus at 1; plus at 10 | n/a | n/a | n/a | Value updates |
| Add to bag | Oxblood | Deep | Ring | Pressed | n/a | Brief "Adding…" ≤ 300ms, width stable | Size error | n/a | "Added to bag" status + count update |
| Accordion | Closed | Underline | Ring | Open/closed | n/a | n/a | n/a | n/a | n/a |
| Related card | Flat | Image scale | Ring | n/a | n/a | n/a | n/a | n/a | n/a |

### Real functionality

| Action | Behavior | Data source | Verified? |
| --- | --- | --- | --- |
| Load slug | Finds product; unknown slug renders 404 | Local catalogue | `[PENDING]` |
| Select size | Updates selected state; clears error | Component state | `[PENDING]` |
| Quantity | 1–10; disables at bounds | Component state | `[PENDING]` |
| Add to bag | Adds line (product + size), merges same size, persists, updates header count | `localStorage` | `[PENDING]` |
| Size error | Inline message, `aria-describedby`, focus moves to fieldset | Component state | `[PENDING]` |
| Details/size guide | Accessible disclosure; keyboard operable | `<details>` or button | `[PENDING]` |
| Related | Navigates to other product detail | Router | `[PENDING]` |

### Accessibility acceptance

- [ ] One `<h1>` = product name.
- [ ] Breadcrumb is a labelled `<nav>`; current page not a link.
- [ ] Size radios in a `<fieldset>` with `<legend>`; error associated.
- [ ] Add-to-bag result announced via `role="status"`.
- [ ] Buttons ≥44px; quantity buttons labelled.
- [ ] Accordion/disclosure works with keyboard and exposes expanded state.
- [ ] Product image alt matches the manifest.
- [ ] Price uses tabular numerals; "Sample price" is visible text, not a tooltip.

---

## `/cart` — Bag

### Purpose

- **Primary job:** Review the demonstration bag, change quantities, remove lines,
  and understand that checkout is not real.
- **Audience:** A visitor who has added at least one piece, or an empty-bag
  visitor who needs a route back.
- **Success looks like:** Every line change updates totals and persistence; the
  demo checkout explains itself without pretending to take payment.

### Wireframe

```text
┌───────────────────────────────────────────────────────────────────────┐
│ DEMO NOTICE                                                           │
├───────────────────────────────────────────────────────────────────────┤
│ FAIRHOLT        Shop  Junior  Senior  Sixth  Fit & care   Bag (2)     │
├───────────────────────────────────────────────────────────────────────┤
│  Your bag                                         2 pieces            │
│  Sample prices. No payment is taken.                                  │
│                                                                       │
│  ┌──────┐  The Poplin Shirt           [ - 1 + ]   £26   [Remove]      │
│  │ IMG  │  Shirts · Size 7–8Y                                       │
│  └──────┘                                                             │
│  ┌──────┐  The Wool Blazer            [ - 1 + ]   £78   [Remove]      │
│  │ IMG  │  Blazers · Size 13–14Y                                     │
│  └──────┘                                                             │
│                                                                       │
│  ┌──────────────────────────────┐                                     │
│  │ Subtotal (sample prices) £104│                                     │
│  │ [ Review demo checkout ]     │                                     │
│  │ Demo note                    │                                     │
│  │ [ Continue shopping ]        │                                     │
│  └──────────────────────────────┘                                     │
├───────────────────────────────────────────────────────────────────────┤
│  EMPTY: Your bag is empty. [Browse the collection]                    │
└───────────────────────────────────────────────────────────────────────┘
```

- Wireframe status: `[VERIFIED]`

### Content inventory

| Item | Copy/content | Source | Status |
| --- | --- | --- | --- |
| Heading | "Your bag" | Agent copy | `[PROPOSED]` |
| Count | "N pieces" (singular "1 piece") | Derived | `[PROPOSED]` |
| Demo note | "Sample prices. No payment is taken and no order is placed." | D-010 | `[PROPOSED]` |
| Line | Name, category, size, sample price, quantity, line total | Cart state | `[PROPOSED]` |
| Subtotal | Sum of sample prices × quantities | Derived | `[PROPOSED]` |
| Checkout CTA | "Review demo checkout" → dialog | Agent copy | `[PROPOSED]` |
| Dialog | "This is where a real checkout would begin. This demonstration does not take payment or place an order." + "Back to bag" | D-010 | `[PROPOSED]` |
| Empty | "Your bag is empty." + "Browse the collection" | Agent copy | `[PROPOSED]` |
| Continue | "Continue shopping" → `/shop` | Agent copy | `[PROPOSED]` |

### Asset slots

| Slot | Manifest ID | Aspect ratio | Treatment | Status |
| --- | --- | --- | --- | --- |
| Line thumbnail | Product image by slug | 1:1 | Cover crop, 12px radius, 72–88px | `[VERIFIED]` |

### Layout and responsive behavior

| Width | Layout | Navigation | Notes | Status |
| --- | --- | --- | --- | --- |
| 390 | Lines stacked; summary below; quantity controls compact; remove as text button | Menu button | No sticky checkout bar that covers content | `[PROPOSED]` |
| 768 | Lines full width; summary below or 2-column at ≥900 | Menu button | 24px gutters | `[PROPOSED]` |
| 1440 | Lines 7 columns; sticky summary 4 columns | Full nav | Summary `position: sticky` with offset | `[PROPOSED]` |

### Components and tokens

| Component | Variant | Tokens | Status |
| --- | --- | --- | --- |
| Cart line | Thumbnail + details | `--color-base-border`, `--space-md` | `[PROPOSED]` |
| Quantity stepper | − / value / + | Same as product | `[PROPOSED]` |
| Remove | Text button | `--color-text-error` | `[PROPOSED]` |
| Summary | Paper panel | `--color-base-paper`, `--shadow-card`, `--radius-lg` | `[PROPOSED]` |
| Checkout dialog | Native `<dialog>` | `--color-base-paper`, `--radius-lg` | `[PROPOSED]` |
| Empty state | Centred | `--color-base-blush`, `--radius-lg` | `[PROPOSED]` |

### Interaction and state matrix

| Element | Default | Hover | Focus-visible | Active | Disabled | Loading | Error | Empty | Success |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Quantity − | Enabled >1 | Blush | Ring | n/a | At 1 | n/a | n/a | n/a | Subtotal updates |
| Quantity + | Enabled <10 | Blush | Ring | n/a | At 10 | n/a | n/a | n/a | Subtotal updates |
| Remove | Text | Underline | Ring | n/a | n/a | n/a | n/a | Last line removes → empty state | Line removed; status announced |
| Checkout | Primary | Deep | Ring | n/a | n/a | n/a | n/a | Hidden when empty | Dialog opens |
| Dialog close | Text/icon | n/a | Ring | n/a | n/a | n/a | n/a | n/a | Returns focus to trigger |

### Real functionality

| Action | Behavior | Data source | Verified? |
| --- | --- | --- | --- |
| Load bag | Reads `fairholt.bag.v1`; validates shape; falls back empty | `localStorage` | `[PENDING]` |
| Change quantity | Updates line and subtotal; persists | `localStorage` | `[PENDING]` |
| Remove | Removes line; persists; announces change | `localStorage` | `[PENDING]` |
| Checkout | Opens native dialog; no network; close returns focus | `<dialog>` | `[PENDING]` |
| Empty CTA | Navigates to `/shop` | Router | `[PENDING]` |
| Header count | Reflects total quantity | Cart context | `[PENDING]` |

### Accessibility acceptance

- [ ] One `<h1>`; cart lines are a list with accessible names.
- [ ] Quantity buttons labelled with the product name and action.
- [ ] Remove button labelled "Remove {product}".
- [ ] Subtotal changes announced politely, debounced.
- [ ] Dialog has an accessible name, initial focus, Escape close, focus return.
- [ ] No keyboard trap outside the dialog.
- [ ] Empty state has one clear action.
- [ ] All totals are correct and use tabular numerals.

---

## `*` — 404

### Purpose

- **Primary job:** Recover a visitor from an unknown URL without a dead end.
- **Success looks like:** Clear explanation and working routes home/shop.

### Wireframe

```text
┌───────────────────────────────────────────────────────────────────────┐
│ DEMO NOTICE                                                           │
├───────────────────────────────────────────────────────────────────────┤
│ FAIRHOLT        Shop  Junior  Senior  Sixth  Fit & care   Bag (0)     │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  This page has left the register.                                     │
│  The address may be wrong, or the piece may have moved.               │
│                                                                       │
│  [ Back to the collection ]   [ Home ]                                │
│                                                                       │
├───────────────────────────────────────────────────────────────────────┤
│  FOOTER                                                               │
└───────────────────────────────────────────────────────────────────────┘
```

- Wireframe status: `[VERIFIED]`

### Content inventory

| Item | Copy/content | Source | Status |
| --- | --- | --- | --- |
| Heading | "This page has left the register." | Agent copy | `[PROPOSED]` |
| Body | "The address may be wrong, or the piece may have moved." | Agent copy | `[PROPOSED]` |
| Actions | "Back to the collection" → `/shop`; "Home" → `/` | Agent copy | `[PROPOSED]` |

### Responsive behavior

Single centred column at all widths, max `--typography-measure-body`; 16px
gutters on mobile; no images. `[PROPOSED]`

### Accessibility acceptance

- [ ] One `<h1>`; two working links; no autofocus.
- [ ] Page title identifies the error.
- [ ] Contrast and focus states inherited from global components.

---

## Global states

| State | Trigger | Design | Copy | Status |
| --- | --- | --- | --- | --- |
| Demo notice | Always | Blush bar, warning text/icon | "Demonstration storefront — products, prices, and checkout are illustrative." | `[PROPOSED]` |
| Mobile menu | Menu button <1024px | Paper panel, full-width, focus trapped | "Menu" / "Close" | `[PROPOSED]` |
| Empty search | Query/filters yield none | Blush panel, clear actions | "No pieces match that combination." | `[PROPOSED]` |
| Empty bag | No cart lines | Blush panel, one CTA | "Your bag is empty." | `[PROPOSED]` |
| Size error | Add without size | Inline error under fieldset | "Choose a size before adding to the bag." | `[PROPOSED]` |
| Added to bag | Successful add | Polite status + count badge | "Added to bag." | `[PROPOSED]` |
| Demo checkout | Checkout CTA | Native dialog | "This demonstration does not take payment or place an order." | `[PROPOSED]` |
| 404 | Unknown route/slug | Centred copy + links | "This page has left the register." | `[PROPOSED]` |
| Storage failure | Malformed localStorage | Silent reset to empty bag | No error shown; no console error | `[PROPOSED]` |

## Functional verification plan

| Function | How it will be tested | Expected result | Status |
| --- | --- | --- | --- |
| Home → shop | Browser click | `/shop` renders 6 cards | `[PENDING]` |
| Stage deep link | Click "Senior" | `/shop?stage=senior` shows only senior pieces; chip selected | `[PENDING]` |
| Category deep link | Click "Knitwear" | `/shop?category=knitwear` shows 1 card | `[PENDING]` |
| Combined filter | Category + stage + query | Correct subset; count updates; no blank page | `[PENDING]` |
| Search no results | Type "zzz" | Empty state with clear filters | `[PENDING]` |
| Sort | Price low/high | Cards reorder; URL `sort` persists | `[PENDING]` |
| Clear all | Click after filters | All 6 restore; URL clean | `[PENDING]` |
| Product load | Click card | Correct name, price, image, description | `[PENDING]` |
| Size validation | Add without size | Error shown, focus moves, no cart change | `[PENDING]` |
| Add to bag | Choose size, add | Status, count increments, persisted | `[PENDING]` |
| Merge same size | Add same product/size twice | One line, quantity 2 | `[PENDING]` |
| Cart quantity | +/− | Line and subtotal correct; persistence | `[PENDING]` |
| Cart remove | Remove line | Line gone; subtotal correct; empty state at 0 | `[PENDING]` |
| Demo checkout | Click CTA | Dialog explains demo; Escape closes; focus returns | `[PENDING]` |
| Reload persistence | Reload `/cart` | Bag restored | `[PENDING]` |
| Invalid slug | `/shop/not-a-product` | 404 state, not a blank page | `[PENDING]` |
| Mobile menu | 390px open/close/Escape | Focus trapped, returns to trigger, no scroll bleed | `[PENDING]` |
| Keyboard journey | Tab through J1 | Complete without pointer; focus always visible | `[PENDING]` |
| Asset integrity | `npm run validate:assets` | 0 errors | `[PENDING]` |

## Approval record

| Scope | Approved by | Date | Notes |
| --- | --- | --- | --- |
| Page specifications, catalogue, and interactions | Autonomous decision (brief mode) | 2026-11-11 | Sample content is labelled; no real inventory or policies invented |

## Phase 5 checklist

- [x] Every route has a purpose, wireframe, content, assets, and states.
- [x] Every image slot maps to a verified manifest asset.
- [x] 390/768/1440 behaviour is specified.
- [x] Every action has real behaviour or an approved non-goal.
- [x] Accessibility criteria are testable.
- [x] Approval recorded (autonomous mode).
- [x] Status updated in `docs/PHASE_STATUS.md`.
