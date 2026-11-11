# 03 — Asset Manifest

> **Status: PHASE 3 COMPLETE — eight licensed photographs downloaded, inspected,
> hashed, and recorded as demonstration imagery.**
> All assets are stock photography from Pexels, used under the Pexels License.
> They are **not** the client's inventory and must never be presented as such.

## Status legend

- `[PROPOSED]` — candidate asset; not verified or approved.
- `[VERIFIED]` — file downloaded, inspected, hashed, and provenance checked.
- `[APPROVED]` — accepted for use in the design.
- `[PENDING]` — awaiting download, permission, or information.
- `[BLOCKED]` — cannot use; reason and corrective action required.

## Policy summary

- Physical products must use real photographs.
- SVG, CSS, HTML, Canvas, emoji, and procedural placeholders are not product
  imagery. SVG is allowed for icons, logos, UI indicators, and simple decoration.
- AI image generation is prohibited unless explicitly authorised in
  `docs/01-product-brief.md`. The brief prohibits generated product photography.
- Every asset must be downloaded locally, validated, hashed, and recorded here.
- Stock/sourced photos must be labelled as demonstration imagery.
- Never fabricate a source URL, creator, or license.

## Machine-readable manifest

> The validator reads only the JSON between the markers below. Keep it valid
> JSON. The surrounding document is the human-readable record.

<!-- BEGIN ASSET MANIFEST JSON -->
{
  "version": 1,
  "assets": [
    {
      "id": "hero-uniform-flatlay",
      "kind": "editorial",
      "localPath": "site/public/images/hero-uniform-flatlay.jpg",
      "sourceUrl": "https://www.pexels.com/photo/36910113/",
      "provider": "Pexels",
      "creator": "Luk Sauvage",
      "license": "Pexels License",
      "licenseUrl": "https://www.pexels.com/license/",
      "accessedAt": "2026-11-11",
      "sha256": "daf3295ac6229b88a88586a0aed18dddf6e3caa71300b2f29664892418a0cc32",
      "width": 1600,
      "height": 2133,
      "alt": "Flat lay of a checked blazer, striped tie, blue shirt, rust trousers, and brown loafers arranged on a striped cotton surface.",
      "demonstration": true,
      "notes": "Homepage hero. Stock photograph, not client inventory. Original 6048x8064; local 1600px delivery copy. Source download kept at assets/downloads/hero-uniform-flatlay.jpg."
    },
    {
      "id": "editorial-atelier-rail",
      "kind": "editorial",
      "localPath": "site/public/images/editorial-atelier-rail.jpg",
      "sourceUrl": "https://www.pexels.com/photo/7671167/",
      "provider": "Pexels",
      "creator": "Ivan S",
      "license": "Pexels License",
      "licenseUrl": "https://www.pexels.com/license/",
      "accessedAt": "2026-11-11",
      "sha256": "5e57b401581686f6c46f55f7314f5911e7fa42ab2dca87185bf66837afed8868",
      "width": 1600,
      "height": 1067,
      "alt": "A pale stone overshirt hanging alone on a black rail against a plaster wall, with empty hangers beside it.",
      "demonstration": true,
      "notes": "Fit and care editorial. Stock photograph, not client inventory. Original 6720x4480; local 1600px delivery copy. Source download kept at assets/downloads/editorial-atelier-rail.jpg."
    },
    {
      "id": "product-poplin-shirt",
      "kind": "product",
      "localPath": "site/public/images/product-poplin-shirt.jpg",
      "sourceUrl": "https://www.pexels.com/photo/28576622/",
      "provider": "Pexels",
      "creator": "Jonathan Borba",
      "license": "Pexels License",
      "licenseUrl": "https://www.pexels.com/license/",
      "accessedAt": "2026-11-11",
      "sha256": "0554d0139201b76005797f4b7ce3b4403c3f233932cea79e2c6d151de198d232",
      "width": 1600,
      "height": 2400,
      "alt": "A white cotton poplin shirt on wooden hangers, held at the collar by a hand.",
      "demonstration": true,
      "notes": "The Poplin Shirt. Stock photograph, not client inventory or a real stock item. Card crop focuses below the collar. Original 3648x5472; local 1600px delivery copy. A third-party label may be visible in the full frame; no affiliation is implied."
    },
    {
      "id": "product-wool-blazer",
      "kind": "product",
      "localPath": "site/public/images/product-wool-blazer.jpg",
      "sourceUrl": "https://www.pexels.com/photo/19109151/",
      "provider": "Pexels",
      "creator": "Zayona Fashion",
      "license": "Pexels License",
      "licenseUrl": "https://www.pexels.com/license/",
      "accessedAt": "2026-11-11",
      "sha256": "9cb197ca9b047488a424df59970f550a2318d70cbe271ced021592e30cb1c367",
      "width": 1600,
      "height": 2400,
      "alt": "A navy single-breasted blazer on a tailor's mannequin over a stone knit top.",
      "demonstration": true,
      "notes": "The Wool Blazer. Stock photograph of a retail display, not client inventory. Card crop focuses on the jacket body. Original 3648x5472; local 1600px delivery copy."
    },
    {
      "id": "product-striped-knit",
      "kind": "product",
      "localPath": "site/public/images/product-striped-knit.jpg",
      "sourceUrl": "https://www.pexels.com/photo/45982/",
      "provider": "Pexels",
      "creator": "Dom J",
      "license": "Pexels License",
      "licenseUrl": "https://www.pexels.com/license/",
      "accessedAt": "2026-11-11",
      "sha256": "f87e98b22c04aeb678b1432cdce49f8df1172f1a287d45a7b4398b39d2a564b7",
      "width": 1600,
      "height": 1081,
      "alt": "A folded navy and grey striped knitted crewneck on a pale background.",
      "demonstration": true,
      "notes": "The Striped Knit. Stock photograph, not client inventory. Original 5054x3416; local 1600px delivery copy. A small care label is visible; no affiliation is implied."
    },
    {
      "id": "product-cotton-skirt",
      "kind": "product",
      "localPath": "site/public/images/product-cotton-skirt.jpg",
      "sourceUrl": "https://www.pexels.com/photo/38266547/",
      "provider": "Pexels",
      "creator": "Eugenia Remark",
      "license": "Pexels License",
      "licenseUrl": "https://www.pexels.com/license/",
      "accessedAt": "2026-11-11",
      "sha256": "2aecbcecdc474903a92fa9b6272c38d8b2865619d4c4775a45cde383f5fbf6ae",
      "width": 1600,
      "height": 2133,
      "alt": "A cream straight-cut skirt with fine pinstripes, laid flat on white linen.",
      "demonstration": true,
      "notes": "The Cotton Skirt. Stock photograph, not client inventory. Original 3024x4032; local 1600px delivery copy. The garment is shown unironed, as photographed."
    },
    {
      "id": "product-twill-trouser",
      "kind": "product",
      "localPath": "site/public/images/product-twill-trouser.jpg",
      "sourceUrl": "https://www.pexels.com/photo/33633245/",
      "provider": "Pexels",
      "creator": "Rafael Oliveira",
      "license": "Pexels License",
      "licenseUrl": "https://www.pexels.com/license/",
      "accessedAt": "2026-11-11",
      "sha256": "8403d35c2f2c6c5af59f41a7a4e1c8f0f0bffbbb28f1085e97b242ba97dd5f48",
      "width": 1600,
      "height": 1599,
      "alt": "Folded stone-coloured twill trousers beside a grey knit, leather belt, and black boots on navy fabric.",
      "demonstration": true,
      "notes": "The Twill Trouser. Styled flat lay: the trousers are the named product, but a knit, belt, and boots also appear; copy must not imply they are included. Original 3456x3454; local 1600px delivery copy."
    },
    {
      "id": "product-leather-loafer",
      "kind": "product",
      "localPath": "site/public/images/product-leather-loafer.jpg",
      "sourceUrl": "https://www.pexels.com/photo/10259873/",
      "provider": "Pexels",
      "creator": "Rujwal Pradhan",
      "license": "Pexels License",
      "licenseUrl": "https://www.pexels.com/license/",
      "accessedAt": "2026-11-11",
      "sha256": "a929377019700dd38a28cab4460bafdd3eb1c63edf29595a7b78a8613a452912",
      "width": 1600,
      "height": 1600,
      "alt": "A pair of black leather penny loafers lit against a dark background.",
      "demonstration": true,
      "notes": "The Leather Loafer. Stock product photograph, not client inventory. Original 5184x5184; local 1600px delivery copy."
    }
  ]
}
<!-- END ASSET MANIFEST JSON -->

## Asset inventory

| ID | Kind | Local path | Source | Creator | License | Accessed | Dimensions | SHA-256 | Demo? | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| hero-uniform-flatlay | editorial | `site/public/images/hero-uniform-flatlay.jpg` | [Pexels 36910113](https://www.pexels.com/photo/36910113/) | Luk Sauvage | Pexels License | 2026-11-11 | 1600×2133 | `daf3295a…a0cc32` | Yes | `[VERIFIED]` |
| editorial-atelier-rail | editorial | `site/public/images/editorial-atelier-rail.jpg` | [Pexels 7671167](https://www.pexels.com/photo/7671167/) | Ivan S | Pexels License | 2026-11-11 | 1600×1067 | `5e57b401…ed8868` | Yes | `[VERIFIED]` |
| product-poplin-shirt | product | `site/public/images/product-poplin-shirt.jpg` | [Pexels 28576622](https://www.pexels.com/photo/28576622/) | Jonathan Borba | Pexels License | 2026-11-11 | 1600×2400 | `0554d013…98d232` | Yes | `[VERIFIED]` |
| product-wool-blazer | product | `site/public/images/product-wool-blazer.jpg` | [Pexels 19109151](https://www.pexels.com/photo/19109151/) | Zayona Fashion | Pexels License | 2026-11-11 | 1600×2400 | `9cb197ca…c1c367` | Yes | `[VERIFIED]` |
| product-striped-knit | product | `site/public/images/product-striped-knit.jpg` | [Pexels 45982](https://www.pexels.com/photo/45982/) | Dom J | Pexels License | 2026-11-11 | 1600×1081 | `f87e98b2…a564b7` | Yes | `[VERIFIED]` |
| product-cotton-skirt | product | `site/public/images/product-cotton-skirt.jpg` | [Pexels 38266547](https://www.pexels.com/photo/38266547/) | Eugenia Remark | Pexels License | 2026-11-11 | 1600×2133 | `2aecbcec…fbf6ae` | Yes | `[VERIFIED]` |
| product-twill-trouser | product | `site/public/images/product-twill-trouser.jpg` | [Pexels 33633245](https://www.pexels.com/photo/33633245/) | Rafael Oliveira | Pexels License | 2026-11-11 | 1600×1599 | `8403d35c…dd5f48` | Yes | `[VERIFIED]` |
| product-leather-loafer | product | `site/public/images/product-leather-loafer.jpg` | [Pexels 10259873](https://www.pexels.com/photo/10259873/) | Rujwal Pradhan | Pexels License | 2026-11-11 | 1600×1600 | `a9293770…452912` | Yes | `[VERIFIED]` |

## License verification

- `[VERIFIED]` Each source page was opened through the Pexels website on
  2026-11-11 and displayed the Pexels "Free" license. The license terms are at
  <https://www.pexels.com/license/>.
- `[VERIFIED]` The Pexels License permits free use, including commercial use,
  without required attribution. Attribution is nevertheless recorded here and in
  the site footer as good practice.
- `[VERIFIED]` No asset was hotlinked; every file is stored locally.
- `[VERIFIED]` No AI generation, SVG, CSS art, Canvas, or procedural substitute
  was used for any product image.
- `[PROPOSED]` All photographs are **demonstration imagery**, not the client's
  inventory, and the interface says so.

## Source download record

The files under `assets/downloads/` are the 1600px Pexels delivery copies and
match the hashes of the public files. The original camera files are larger and
remain available at each source page; they were not committed to avoid a
repository dominated by multi-megabyte originals. This is a documented
equivalent to storing the full original, and the exact delivered file used by
the site is preserved twice (source record and public asset).

| ID | Source download |
| --- | --- |
| hero-uniform-flatlay | `assets/downloads/hero-uniform-flatlay.jpg` |
| editorial-atelier-rail | `assets/downloads/editorial-atelier-rail.jpg` |
| product-poplin-shirt | `assets/downloads/product-poplin-shirt.jpg` |
| product-wool-blazer | `assets/downloads/product-wool-blazer.jpg` |
| product-striped-knit | `assets/downloads/product-striped-knit.jpg` |
| product-cotton-skirt | `assets/downloads/product-cotton-skirt.jpg` |
| product-twill-trouser | `assets/downloads/product-twill-trouser.jpg` |
| product-leather-loafer | `assets/downloads/product-leather-loafer.jpg` |

`scripts/fetch-assets.mjs` re-downloads the exact set and prints the hashes.

## Image inspection record

- `[VERIFIED]` All eight 1600px files were opened with the `read` tool as image
  content on 2026-11-11.
- `[VERIFIED]` Observed: a checked blazer/tie/shirt/trouser/loafer flat lay; a
  pale overshirt on a black rail; a white shirt held on hangers; a navy blazer
  on a mannequin; a folded navy/grey striped knit; a cream skirt on white linen;
  folded stone trousers with a knit, belt, and boots on navy fabric; black
  leather loafers on a dark field.
- `[VERIFIED]` No broken, corrupt, or non-photographic image was found.
- `[VERIFIED]` The trouser image is a styled flat lay containing additional
  props; the spec and copy must make clear that only the trousers are sold.
- `[VERIFIED]` The blazer and shirt photographs contain retail display/hand
  elements and small third-party labels; no brand affiliation is implied.

## Source verification checklist

- [x] Source page opened and verified for every asset.
- [x] Creator/attribution confirmed for every asset.
- [x] License terms read and compatible with this use.
- [x] File downloaded (not hotlinked).
- [x] File is a valid raster image with non-zero dimensions.
- [x] SHA-256 computed and recorded.
- [x] Demonstration label applied.
- [x] No implication that the photo is the client's real inventory.

## Validation log

| Date | Command | Result | Notes |
| --- | --- | --- | --- |
| 2026-11-11 | `npm run validate:assets -- --require-assets` | PASSED — see `docs/PHASE_STATUS.md` | 8 assets, 0 errors, 0 warnings |

## Blockers

| Asset ID | Problem | Evidence | Impact | Corrective action | Status |
| --- | --- | --- | --- | --- | --- |
| — | None | — | — | — | — |

The unavoidable scope limitation is that licensed stock photography does not
provide a full, coherent school-uniform catalogue. The site therefore presents a
six-piece demonstration capsule, and the interface labels it as sample content
rather than claiming a complete uniform range.

## Phase 3 checklist

- [x] Asset list derived from the brief and page specs.
- [x] Every required product photo sourced and licensed.
- [x] Every file downloaded and validated locally.
- [x] Manifest complete and valid JSON.
- [x] `validate:assets --require-assets` passes.
- [x] No SVG/CSS/Canvas/emoji/AI substitutes for products.
- [x] Status updated in `docs/PHASE_STATUS.md`.
