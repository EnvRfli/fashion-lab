# Admin UX v2 — Two Mandatory Inputs, Same Design Language

## One admin only

- A single authorized administrator can log in and log out.
- No public account creation, admin user invitation UI, user list, roles matrix or customer accounts.
- Real server-verified auth for write operations; no hardcoded passwords or localStorage-based authentication.
- Keep existing admin shell/colors/navigation if appropriate, but consolidate unnecessary menus instead of redesigning the UI.

## Portfolio list

Keep existing admin list if it already works. Essential fields: cover thumbnail, client name, number of photos and concise actions: `Edit`, `Tambah Foto` and `Hapus`. Search optional.

## Add portfolio — REQUIRED only

- `Nama klien` — single text input, trimmed, non-empty.
- `Foto hasil pekerjaan` — one multi-file picker, select multiple JPEG/PNG/WebP/AVIF photos, with previews and error handling. At least one photo required to publish a new portfolio.
- Button: `Simpan & Publikasikan`.
- Cover = first selected photo by default, with optional `Jadikan Sampul` shortcut.

## Optional only

Inside `Informasi tambahan` (collapsed by default), if necessary:

- `Kategori` — optional simple select, not a required school form, not a separate master screen.
- `Keterangan` — optional short description.

Do NOT add fields for school address, principal name, uniform dimensions, fabric SKU, contract numbers, year, minimum order quantity, telephone per client, logo, etc. unless user explicitly asks.

## Automatic fields

Slug (keep prior slug on edit), created/updated timestamps, photo count, cover, sort order. Handle duplicate name slug collisions automatically without additional admin questions.

## Edit behavior

- Preserve existing photos when editing name or adding images. Never overwrite the entire gallery with only newly selected files.
- `Tambah Foto` may open the same form with existing name already filled and multi-select available.
- Remove one photo with clear confirmation (or undo). Removing last photo from a published item should prevent broken public gallery; keep record and warn, do not silently delete client.
- Deleting entire client/portfolio must show a specific confirmation; do not bulk delete other records or files.
- Show upload progress and real error; prevent duplicate submits.
- Successful save message only after persistence is confirmed.

## UX acceptance path

`Login → Tambah Portofolio → Ketik nama → Pilih banyak foto → Simpan & Publikasikan`.

No forced category, no repeated photo forms, no mandatory description, no nested wizard.
