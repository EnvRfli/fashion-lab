# Public UI Copy + Feature Policy

## UI words to remove

Remove **prototype/staging indicators visible to site visitors or admins**, e.g.:

- `Demo`, `Test`, `Sample`, `Dummy`, `Mock`, `Prototype`, `Staging`
- `Contoh Website`, `Data Percobaan`, `Data Dummy`, `Versi Uji Coba`
- Fake debug ribbons, staging watermarks or proof-of-concept badges.

**Scope only text displayed as prototype labels.** Do not remove these words from internal tests/scripts, fixtures, log messages, package docs or underlying client names. Do not claim all content is real merely because labels are gone.

## Public content tone

Indonesian, concise, professional. Keep existing layout and copy length as close as possible; for instance:

| If currently shown as prototype label | Replace only that label / use professional neutral copy |
|---|---|
| `Demo Gallery` | `Portofolio` |
| `Contoh Klien` as section label | `Klien & Hasil Produksi` |
| `Coba Pencarian` | `Cari nama klien` |
| `Test Upload` as admin heading | `Unggah Foto` |

These are examples, not permission to rewrite all copy or remodel the hero.

## Remove features

- Remove `Download Foto`, `Unduh Gambar`, `Download Semua`, `Download ZIP`, browser anchor `download` actions and UI invoking file download.
- Preserve image display and click-to-preview/lightbox, zoom if already implemented.
- Remove `Daftar`, `Sign up`, visitor login/user profile and user management. Keep one admin login entrypoint.
- Remove checkout/payment/cart/pricing/buy actions if present, with minimal styling disturbance.
- Do not add client login, user comments, reviews or accounts.

Note: a displayed image cannot be made technologically impossible for a visitor to save using the browser; the request concerns **no explicit download action**.

## Keep features

- Existing gallery cards, client list, actual dummy/seed data and cover images.
- Browsing/search, responsive navigation, current design layout and lightbox.
- Existing useful category filters may remain visible if they already work; do not require category entry for an administrator. Avoid changing design to make a filter disappear unless necessary.
- Existing page URL structure where feasible.
