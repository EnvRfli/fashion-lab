# Production Requirements Without Rebuilding the Site

## Principle

User wants a real public website, but the current layout and seeded records are already useful. Add only the infrastructure needed to safely allow one administrator to publish portfolios. Do not erase frontend seed data while setting up persistence.

## Reuse first

Audit current backend/auth/database/storage before recommending new services. Reuse a working secure integration. Do not install Supabase (or another service) as a mandatory replacement if existing persistent services already satisfy requirements.

If no real persistence exists, propose and implement a minimal adapter/interface consistent with current stack. Supabase Auth/Postgres/Storage is an example, not an order to change providers. Credentials are external prerequisites; do not invent them or bake secrets into client code.

## Expected data model (logical, adapt to existing schema)

`Portfolio`: id, name, slug, optional category, optional description, cover_photo_id, created_at, updated_at, optional published_at/status.

`PortfolioPhoto`: id, portfolio_id, public/storage path, ordering, alt text optionally derived from client, metadata for validation.

Existing seeded portfolios/photo references MUST be mapped through the same public read interface or safely merged into the store with stable identity; no wholesale replacement.

## Admin security

- Exactly one authorized administrator is needed operationally. Use secure identity and write authorization; no public signup or user management menu.
- Backend/storage security rules must prevent anonymous writes or access to private admin operations.
- Admin API/DB rules must be independently enforced on server/provider, not merely hidden frontend buttons.
- Validate MIME/file signature and size; bound number/size of files per upload; sanitize names; protect from XSS and unauthorized deletion.

## Upload durability

- Product photos persist in backend object storage, not only local state, localStorage or Vercel ephemeral filesystem.
- Multiple image upload in one interaction; preview, progress, failures visible.
- Do not show success until the backend confirms writes.
- Keep original photos and their assignments intact if some new uploads fail.

## Release distinction

- `DESIGN/BUILD READY`: pages pass local build and visual checks.
- `ADMIN WRITE READY`: real admin can securely create/edit and new photos survive refresh and new browser session.
- `CONTENT APPROVED`: owner reviewed whether seeded client names/photos may be publicly shown as actual portfolio.
- `DEPLOY READY`: provider env vars, storage security, routes, image URLs and production checks verified.

If any verification is unavailable, report that readiness element as BLOCKED or UNVERIFIED. Preserve the existing site and data nonetheless. No push, deployment or paid service creation without user authorization.
