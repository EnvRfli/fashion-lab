# Data Preservation / Non-destructive Migration (CRITICAL)

## Absolute directive

**NEVER delete any current dummy/seed/sample/client records or associated pictures.** These records are currently in use and must continue displaying in public galleries. They are not disposable just because their source is called `dummy` or `mock` in code.

## Audit first

Find ALL data stores: JSON/TS arrays, seed files, fixtures, localStorage, indexedDB, local DB, remote database, CMS, image manifest and `public/` assets. Do not assume data is only in one place.

For each available source record:
- Snapshot identifier/key and slug.
- Snapshot displayed client name.
- Snapshot photo references/count and cover.
- Snapshot count per source.
- Store baseline in `docs/NAFA_V2_BASELINE.md` with truthful provenance.

If remote data access is not available, report it; do not claim data count verified. Do not create a destructive migration just because current data source is unclear.

## Migration rules

- Prefer additive schema changes and adapters over replace/drop/rename.
- No `TRUNCATE`, `DROP TABLE`, mass DELETE, forced reseed or resetting image storage.
- No wiping `public/images/`, data JSON files, or media folders.
- Preserve IDs/URLs/slugs when possible; use redirects or mapping for changed route names.
- Keep seed images available and keep photo-client relationships intact.
- Don't replace populated portfolios with empty states when new backend has no records.
- Prevent duplicates with idempotent seed/import scripts if migrating to a real DB; seed only missing rows, preserve user edits.
- Existing data must survive reload, app restart and production build. If migration to persistence is attempted, have backup + rollback procedure and verify counts/media associations before activation.
- Never falsely present a frontend-only state update as durable storage.

## What may be changed

- UI-only prototype words such as `Demo / Test / Sample / Dummy` as captions, badges, headings, helper copy and placeholder text.
- Internal implementation identifiers can remain `mockData`, `dummyRecords`, `fixtures`, etc.; do not rename them mechanically or change datasets just to remove these words.
- Client names are data, not labels. Preserve them even if name contains the word `Test`; do NOT globally replace such substrings within names, paths or legal entities.

## Public release truthfulness

Preserving currently used example entries does not establish that every depicted client is a real paid customer or has approved publication. Keep them for development/continuity as user requested. Before publishing as actual customer portfolio, owner should review client names, photos, and usage rights. Do not add fabricated testimonials, customer counts, partnerships or endorsements.

## Acceptance invariant

For every available baseline record `r`: record `r` remains retrievable with the same photos after changes unless an explicit, individually authorized edit occurs. Test both record count and identifiers/image association, not just number of cards.
