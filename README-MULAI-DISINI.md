# Paket Koreksi Website Galeri Seragam

Paket ini **bukan project website baru**. Paket ini menyediakan brief lengkap, analisis referensi, screenshot asli, dan instruksi agent untuk memperbaiki project OpenCode **yang sudah terlanjur menjadi website fashion/e-commerce**.

## Isi paket

- `docs/PROJECT_BRIEF.md` — kebutuhan produk, fitur, halaman, batasan, dan kriteria selesai.
- `docs/DESIGN_ALIGNMENT.md` — analisis dan pemetaan tiap bagian screenshot.
- `docs/references/primary/galeri-seragam-main.png` — screenshot yang Anda lampirkan.
- `docs/references/REFERENCE_MANIFEST.md` — peran dan prioritas referensi.
- `docs/REALIGNMENT_EXECUTION.md` — instruksi audit + perbaikan **dalam satu eksekusi**.

## Cara menggunakan

1. **Buka root repository OpenCode yang lama** (yang memiliki `AGENTS.md`). Tidak perlu membuat repo/Bootstrap baru.
2. **Ekstrak isi ZIP ke root repo tersebut** sambil mempertahankan folder `docs/`. File `docs/PROJECT_BRIEF.md` dalam paket ini menggantikan brief e-commerce yang salah. Jika ingin menyimpan versi lama, backup atau buat Git checkpoint sebelum menimpa.
3. Buat sesi baru di OpenCode menggunakan `/new` dan pilih provider/model aktif `opencode-go/deepseek-v4.1-flash`.
4. **Paste satu prompt ini:**

```text
Read docs/REALIGNMENT_EXECUTION.md and execute the entire realignment workflow autonomously against the current repository. Use docs/PROJECT_BRIEF.md and docs/references/primary/galeri-seragam-main.png as the authoritative product and visual targets. Preserve verified bootstrap tooling. Audit, checkpoint, plan, implement, validate and report; do not stop after the audit unless a genuine blocker prevents further work.
```

5. Periksa hasil frontend dan laporan QA agent. Screenshot final sebaiknya diperbandingkan terhadap *bagian-bagian* gambar referensi, bukan seluruh kolase sebagai satu laman.

**Catatan:** aset foto dalam mockup tidak otomatis merupakan foto asli milik sekolah dan tidak boleh dianggap siap dipakai sebagai katalog yang terverifikasi. Untuk prototype, gunakan foto demonstrasi berizin atau empty-state yang jujur.
