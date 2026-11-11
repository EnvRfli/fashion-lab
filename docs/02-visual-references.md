# 02 — Visual References

> **SUPERSEDED DIRECTION — 2026-11-11.** The references and "Outfitter's
> Ledger" comparison below were researched for the old e-commerce brief. They
> remain historical research. The active visual target is the supplied primary
> reference `docs/references/primary/galeri-seragam-main.png`, analysed in
> `docs/DESIGN_ALIGNMENT.md` and implemented as the Galeri Seragam system in
> `docs/04-design-system.md`. Do not use the e-commerce direction to justify
> active UI decisions.
>
> **Status: HISTORICAL — three external references were verified plus the
> earlier mockup.** Access date for all external references: 2026-11-11.

## Status legend

- `[PROPOSED]` — agent suggestion; not verified or approved.
- `[VERIFIED]` — checked against a URL, screenshot, or source.
- `[APPROVED]` — human approval, or a recorded autonomous decision.
- `[PENDING]` — awaiting information or a decision.
- `[BLOCKED]` — cannot proceed; reason and corrective action required.

## Research parameters

| Field | Value | Status |
| --- | --- | --- |
| Brief version | `docs/01-product-brief.md`, Phase 1 / commit `55d745c` | `[VERIFIED]` |
| Research date | 2026-11-11 | `[VERIFIED]` |
| Researcher | OpenCode agent (DeepSeek V4.1 Flash), browser via `agent-browser` | `[VERIFIED]` |
| Categories researched | Direct schoolwear retail, adjacent apparel retail, non-obvious curated retail (bookshop) | `[VERIFIED]` |
| Viewports | 1440×900 desktop, 390×844 mobile; full-page captures | `[VERIFIED]` |

## Verified references

| # | Name | URL | Accessed | What to use | What not to copy | Screenshot | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | Supplied reference mockup ("Galeri Seragam") | User-supplied JPEG, no URL | 2026-11-11 | Crimson brand colour with soft blush surfaces; generous rounded product cards; product photography placed on calm fields; stage/category tiles as a fast entry point; clear price/product hierarchy | Brand name, logo, Indonesian copy, school names/crests, statistics, admin screens, exact layouts, garment photography | `docs/references/WhatsApp Image 2026-11-11 at 15.12.56.jpeg` | `[VERIFIED]` |
| 1 | Stevensons | https://www.stevensons.co.uk/ | 2026-11-11 | Two-door role split (parents / schools); calm service strip; uniform photography on light studio fields; navy as a grounding footer colour; restrained utility type | Stevensons wordmark, "750 schools" statistic, staff/student portraits, all copy, return-policy claims | `artifacts/visual-qa/references/stevensons-desktop-1440.png`, `...-mobile-390.png` | `[VERIFIED]` |
| 2 | Folk | https://www.folkclothing.com/ | 2026-11-11 | Full-bleed editorial campaign as the opening move; product rows on neutral grey; tiny utility text; quiet chrome that lets garments carry colour; image-first category storytelling | Folk brand, campaign photography, product names, collaboration references, prices | `artifacts/visual-qa/references/folk-desktop-1440.png`, `...-mobile-390.png` | `[VERIFIED]` |
| 3 | Daunt Books | https://dauntbooks.co.uk/ | 2026-11-11 | Curated rows with plain section labels; product covers as the colour field; centred serif masthead; deep, solid footer as an anchor; generous white space; "see more" as a quiet link | Daunt Books wordmark, book covers, shop copy, event listings, green identity | `artifacts/visual-qa/references/dauntbooks-desktop-1440.png`, `...-mobile-390.png` | `[VERIFIED]` |

### Screenshot inspection note

All six external screenshots were read as image content with the `read` tool and
are readable at full-page scale. The Daunt Books and Folk mobile captures contain
large blank regions caused by those sites' own lazy-loading/carousel behaviour;
their mobile layouts were therefore **not** used as structural evidence. Desktop
captures and the supplied mockup were fully legible. This limitation is recorded
rather than hidden.

## Reference analysis

### Common conventions

- `[VERIFIED]` A large image-led opening establishes category and tone before
  any product grid.
- `[VERIFIED]` Product grids are calm: neutral fields, consistent image ratios,
  small metadata, and little chrome.
- `[VERIFIED]` Direct schoolwear retail splits the audience early — parents vs
  schools, or school-specific vs plain uniform. This is a real navigation job,
  not decoration.
- `[VERIFIED]` Reassurance (service, sizing, returns) sits close to the first
  decision, not buried in a footer.
- `[VERIFIED]` Strong brand colour is concentrated in a masthead, a hero field,
  and a footer, while the product area stays quiet.
- `[VERIFIED]` The supplied mockup uses crimson + blush + white, 16–24px card
  radii, and photography on pale neutral backgrounds. Those relationships are
  the most transferable part of it.

### Conventions to reject

- `[VERIFIED]` Copying any reference's wordmark, photography, copy, school
  names, statistics, or layout verbatim.
- `[VERIFIED]` The mockup's admin dashboard, school directory, and "download all
  photos" workflows — out of scope and unrelated to the brief's four routes.
- `[VERIFIED]` Stevensons' school-specific search: we have no real school list,
  and inventing one would violate the brief.
- `[VERIFIED]` Heavy promotional badge clutter and countdown-style urgency. A
  uniform purchase is planned, not impulse-driven.
- `[PROPOSED]` Generic AI-design defaults: warm cream + terracotta serif,
  acid-green-on-black, identical rounded cards with the same soft shadow,
  decorative all-caps eyebrows, and arrows appended to every link.

### Non-obvious opportunity

- `[PROPOSED]` **The curated shelf.** Daunt Books proves that a product grid can
  feel edited rather than endless: a plain section label, a short row, and a
  quiet "see all" link. Translate that to uniform "layers" (blazers, shirts,
  knitwear, lower half, sport) instead of an undifferentiated 20-card wall.
- `[PROPOSED]` **The outfitter's ledger.** A school uniform is a list before it
  is a look: parents work from a requirements list. A ledger-like structure —
  tabular prices, hairline rules, stage labels, precise garment names — gives the
  storefront a specific organising idea that the references do not have.
- `[PROPOSED]` **One stage rail.** A single horizontal "Junior / Senior / Sixth"
  rail that behaves like a timetable strip, repeated on home and shop, replaces
  the mockup's four category cards plus a separate school directory.

### Constraints from the brief

- `[VERIFIED]` Four routes only: home, shop, product, cart.
- `[VERIFIED]` Real licensed photography, demonstration-labelled; no generated
  or illustrated garments.
- `[VERIFIED]` Sample product content must be visibly identified.
- `[VERIFIED]` No invented school names, reviews, statistics, or credentials.
- `[VERIFIED]` React, TypeScript, Vite, Tailwind CSS.
- `[VERIFIED]` Responsive at 390/768/1440, accessible, and visually reviewed
  against the supplied reference.

## Direction options

### Option A — The Outfitter's Ledger (selected)

- **Principle:** A calm, precise schoolwear catalogue set like a well-kept
  outfitter's ledger: oxblood masthead, blush paper, hairline rules, and garments
  photographed flat and true.
- **Color:** Oxblood `#7A2230`, deep oxblood `#521720`, blush `#F6E5E3`, chalk
  `#FBF9F5`, ink `#1E2430`, brass `#B08A4F`. Product areas stay chalk-white;
  oxblood is concentrated in the masthead, hero field, primary actions, and
  footer.
- **Type:** Fraunces (variable serif) for display and product names; Archivo
  (variable grotesque) for body, labels, prices, and controls. Tabular numerals
  for prices and quantities.
- **Layout:** 12-column grid, 1240px max, asymmetric 7/5 hero. A double hairline
  under the masthead; a stage rail like a timetable; product rows introduced by
  plain section labels; a solid oxblood footer. Cards use a 20px radius and a
  hairline border rather than shadows.
- **Imagery:** Garment-focused photography on pale neutral fields; one full-bleed
  editorial image as the hero's right panel; consistent 4:5 product crops;
  category tiles use the same crop language.
- **Risk:** Heritage serif + warm paper can drift into the generic "artisan"
  look. Controlled by cool chalk rather than cream, oxblood rather than
  terracotta, a ledger grid rather than decorative flourishes, and no all-caps
  eyebrows.
- **Status:** `[APPROVED]` (autonomous, D-012)

```text
┌──────────────────────────────────────────────────────────────┐
│ FAIRHOLT SCHOOLWEAR        Shop  Stages  Fit & care   Cart 2 │
├──────────────────────────────────────────────────────────────┤
│  A uniform,                      ┌─────────────────────────┐ │
│  considered.                     │                         │ │
│  [blush field]                   │   IMAGE: hero-editorial │ │
│  Copy + primary action           │   4:5, garment focus    │ │
│  Stage rail: Junior Senior Sixth │                         │ │
│  ─────────────────────────────   └─────────────────────────┘ │
├──────────────────────────────────────────────────────────────┤
│  Shop by layer                                  See all →    │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐                 │
│  │ IMAGE  │ │ IMAGE  │ │ IMAGE  │ │ IMAGE  │                 │
│  │ Blazer │ │ Shirt  │ │ Knit   │ │ Lower  │                 │
│  └────────┘ └────────┘ └────────┘ └────────┘                 │
├──────────────────────────────────────────────────────────────┤
│  Term essentials                                See all →    │
│  product row: image / name / stage / sample price            │
├──────────────────────────────────────────────────────────────┤
│  Fit, care, and the school gate           IMAGE: detail      │
├──────────────────────────────────────────────────────────────┤
│  OXBLOOD FOOTER — navigation, demonstration note, credits    │
└──────────────────────────────────────────────────────────────┘
```

### Option B — The Term List

- **Principle:** Shop the school term like a checklist: a utility-first list of
  what each stage needs, with uniform pieces attached to each line.
- **Color:** Chalk `#F5F3EC`, ink `#17201D`, forest `#244C3B`, signal orange
  `#D9683E`, sky `#DDE9E7`.
- **Type:** Bricolage Grotesque display, Public Sans body.
- **Layout:** A long checklist with sticky stage tabs; rows rather than a grid;
  square corners; numbered steps 01–04 for the actual fitting sequence.
- **Imagery:** Small documentary crops beside each row, one large editorial
  image per stage.
- **Risk:** Reads as a form or school portal; weak emotional pull; the
  checklist metaphor invites invented uniform requirements.
- **Status:** `[PROPOSED]` — rejected

```text
┌──────────────────────────────────────────────────────────┐
│ FAIRHOLT        Shop   Stages   Fit & care        Cart   │
├──────────────────────────────────────────────────────────┤
│ The term list                                            │
│ [Junior] [Senior] [Sixth]                                │
│ 01  Blazer        — required —        [thumb]  £—        │
│ 02  Shirt         — two recommended   [thumb]  £—        │
│ 03  Lower half    — choose one        [thumb]  £—        │
│ 04  Sport         — optional          [thumb]  £—        │
└──────────────────────────────────────────────────────────┘
```

### Option C — Playground Colour-Block

- **Principle:** A confident, student-facing mosaic where each school stage owns
  a colour block and garments sit inside bold fields.
- **Color:** Cobalt `#2447A8`, crimson `#C92C3E`, butter `#F0C24E`, chalk
  `#FFFFFF`, ink `#121318`.
- **Type:** Archivo Black display, Archivo body.
- **Layout:** Full-bleed colour blocks, oversized stage tiles, overlapping
  headlines, four-column mosaic.
- **Imagery:** Cut-out garment photography over flat colour.
- **Risk:** Loud and trend-led; weaker trust signal for parents and school
  staff; cut-outs would force image treatment that our stock photography may not
  support.
- **Status:** `[PROPOSED]` — rejected

```text
┌──────────────────────────────────────────────────────────┐
│ FAIRHOLT                                     Cart        │
├───────────────────────┬──────────────────────────────────┤
│ JUNIOR                │ SENIOR                           │
│ [cobalt block]        │ [crimson block]                  │
│ IMAGE                 │ IMAGE                            │
├───────────────────────┴──────────────────────────────────┤
│ SIXTH          │ SPORT                                   │
│ [butter block] │ [ink block]                             │
└──────────────────────────────────────────────────────────┘
```

## Selected direction

| Field | Value | Status |
| --- | --- | --- |
| Selected option | A — The Outfitter's Ledger | `[APPROVED]` |
| Rationale | It carries the supplied mockup's crimson/blush warmth and rounded product cards, borrows Stevensons' calm service structure and Folk's image-led merchandising, and adds a subject-specific ledger logic (stages, layers, tabular prices) that makes the storefront feel like an outfitter rather than a generic DTC theme. | `[VERIFIED]` |
| Alternatives rejected | B — too form-like and invites invented uniform rules; C — too loud and weak on trust for parents/schools. | `[VERIFIED]` |
| Approval mode | `autonomous` | `[VERIFIED]` |
| Human approval | Not required; autonomous decision D-012 recorded 2026-11-11 | `[APPROVED]` |

## Anti-reference

- `[PROPOSED]` No warm-cream + terracotta + high-contrast-serif default; we use
  cool chalk, oxblood, and blush, with the serif reserved for display and product
  names.
- `[PROPOSED]` No decorative eyebrows, all-caps section labels, numbered
  markers without a real sequence, or arrows appended to every link.
- `[PROPOSED]` No identical shadowed cards for every content type; sections use
  rules, rows, and editorial splits, with cards reserved for products and
  categories.
- `[PROPOSED]` No fake urgency, countdowns, ratings, review stars, or "as worn
  by" claims.
- `[PROPOSED]` No children used as product models or implied endorsement; prefer
  garment-focused photography.
- `[PROPOSED]` No SVG, CSS, or generated garment illustrations — ever.

## Phase 2 checklist

- [x] At least three references reached and recorded with access dates.
- [x] Screenshots captured at desktop and mobile and verified as readable images.
- [x] Analysis distinguishes use from copying.
- [x] Direction options are specific and asset-compatible.
- [x] Selection and rationale recorded.
- [x] Approval recorded if in approval mode (autonomous mode; decision D-012).
- [x] Status updated in `docs/PHASE_STATUS.md`.
