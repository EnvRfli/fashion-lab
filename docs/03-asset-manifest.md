# 03 — Asset Manifest

> **Status: TEMPLATE — no assets have been sourced.**
> Do not treat the empty manifest or example rows as approved assets.

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
- AI image generation is prohibited unless explicitly authorized in
  `docs/01-product-brief.md`.
- Every asset must be downloaded locally, validated, hashed, and recorded here.
- Stock/sourced photos must be labeled as demonstration imagery.
- Never fabricate a source URL, creator, or license.

## Machine-readable manifest

> The validator reads only the JSON between the markers below. Keep it valid
> JSON. The surrounding document is the human-readable record. Replace the
> empty array with real entries during Phase 3.

<!-- BEGIN ASSET MANIFEST JSON -->
{
  "version": 1,
  "assets": []
}
<!-- END ASSET MANIFEST JSON -->

## Asset inventory

| ID | Kind | Local path | Source | Creator | License | Accessed | Dimensions | SHA-256 | Demo? | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| _none yet_ | — | — | — | — | — | — | — | — | — | `[PENDING]` |

## Manifest field reference

| Field | Required | Meaning |
| --- | --- | --- |
| `id` | Yes | Stable kebab-case identifier used by code and specs. |
| `kind` | Yes | `product`, `editorial`, `logo`, `icon`, or `decorative`. |
| `localPath` | Yes | Path relative to the repository root, e.g. `site/public/images/products/x.webp`. |
| `sourceUrl` | Yes for sourced assets | Page where the asset was found, not the raw file URL. |
| `provider` | Yes for sourced assets | Source name, e.g. Unsplash, Pexels, Wikimedia Commons. |
| `creator` | Yes for sourced assets | Photographer/author as credited by the source. |
| `license` | Yes for sourced assets | License name. |
| `licenseUrl` | Yes for sourced assets | URL to the license terms. |
| `accessedAt` | Yes for sourced assets | ISO date the source was accessed. |
| `sha256` | Yes | Lowercase SHA-256 of the local file. |
| `width`, `height` | Yes | Pixel dimensions. |
| `alt` | Yes for content images | Meaningful alternative text. |
| `demonstration` | Yes | `true` for stock/sourced demonstration imagery. |
| `notes` | No | Crop, variant, restrictions, or attribution requirements. |

## Source verification checklist

For each sourced photo, record:

- [ ] Source page opened and verified.
- [ ] Creator/attribution confirmed.
- [ ] License terms read and compatible with this use.
- [ ] File downloaded (not hotlinked).
- [ ] File is a valid raster image with non-zero dimensions.
- [ ] SHA-256 computed and recorded.
- [ ] Demonstration label applied.
- [ ] No implication that the photo is the client's real inventory.

## Validation log

| Date | Command | Result | Notes |
| --- | --- | --- | --- |
| _none_ | `npm run validate:assets -- --require-assets` | `[PENDING]` | _No assets yet_ |

## Blockers

| Asset ID | Problem | Evidence | Impact | Corrective action | Status |
| --- | --- | --- | --- | --- | --- |
| _none_ | — | — | — | — | — |

## Phase 3 checklist

- [ ] Asset list derived from the brief and page specs.
- [ ] Every required product photo sourced and licensed.
- [ ] Every file downloaded and validated locally.
- [ ] Manifest complete and valid JSON.
- [ ] `validate:assets --require-assets` passes.
- [ ] No SVG/CSS/Canvas/emoji/AI substitutes for products.
- [ ] Status updated in `docs/PHASE_STATUS.md`.
