# Nafa Collection — Realignment v2: PERTAHANKAN desain dan data yang sudah ada

**Tujuan paket:** menyempurnakan website `D:\personal_project\fashion-lab` yang SUDAH jadi. Ini adalah **perubahan terarah**, BUKAN redesign, reset, atau membuat project baru.

## Perubahan dari paket sebelumnya (v1)

Paket v1 terlalu agresif: berisi arahan menghapus data dummy, merombak tampilan, dan membuat ulang alur. **Semua arahan v1 yang bertentangan dengan v2 dinyatakan tidak berlaku.**

| Area | KEPUTUSAN FINAL v2 |
|---|---|
| Desain/layout sekarang | **PERTAHANKAN** (warna, typography, hero, grid, spacing, komponen, responsivitas) |
| Seluruh record/foto dummy atau seeded yang ada | **PERTAHANKAN** (tetap tampil dan tetap bisa dikelola) |
| Teks publik `Demo`, `Test`, `Dummy`, `Sample`, dsb. | **HILANGKAN hanya label/penanda prototipe di UI** |
| Model produk | Portofolio hasil produksi konveksi per klien, sering berupa sekolah |
| Publik | Lihat daftar klien → buka detail → lihat foto; tanpa unduh |
| Pengguna | Tidak ada user/registrasi publik; hanya satu admin |
| Input admin | Dua input wajib: **nama klien** dan **foto-foto** |
| Field lain | Opsional dan tidak mempersulit alur |
| Infrastruktur | Pertahankan bootstrap, skills, Git, build dan konfigurasi yang berjalan |
| Deploy | TIDAK otomatis deploy atau push tanpa izin |

**Penting:** `dummy` adalah istilah internal untuk sumber data awal, bukan instruksi menghapus data. Jangan hapus record, image, seed, fixture, mapping, atau hubungan data terkait. Data yang tampil di website harus tetap bisa dilihat setelah perubahan. Sebelum publikasi produksi, pemilik website tetap perlu memastikan nama dan foto yang ditampilkan memang boleh dipublikasikan—hapus label demo tidak berarti otomatis membuat klaim portofolio fiktif menjadi benar.

## Isi paket

- `ONE_SHOT_PROMPT.md` — arahan eksekusi lengkap satu sesi.
- `specs/01-CORRECTED_PROJECT_BRIEF.md` — brief final, dengan contoh halaman dan user journey.
- `specs/02-DESIGN_AND_ROUTE_LOCK.md` — larangan redesign; baseline screenshot dan per-page lock.
- `specs/03-SIMPLE_ADMIN_UX.md` — form minimum dan perilaku admin.
- `specs/04-DATA_PRESERVATION.md` — pelestarian seluruh record dummy/seed saat migrasi.
- `specs/05-COPY_AND_FEATURE_POLICY.md` — hapus label Demo/Test tanpa menghapus data, tidak ada download/user publik.
- `specs/06-PRODUCTION_INTEGRATION.md` — auth satu admin, persistence, environment Vercel.
- `specs/07-ACCEPTANCE_AND_QA.md` — uji berbasis bukti + non-regression.
- `specs/08-EXECUTION_AND_RECOVERY.md` — tahap audit hingga delivery, pemulihan.

## Penerapan tanpa menimpa project

1. **Download ZIP** ini di browser.
2. Buka **Windows PowerShell** (bukan CMD):

   ```powershell
   cd D:\personal_project\fashion-lab
   git status --short
   ```

3. File ZIP mungkin tidak berada di `Downloads`. Temukan dengan `Ctrl+J` di browser → **Show in folder**, lalu jalankan:

   ```powershell
   $zip = 'C:\Users\CAS-NB-0024\Downloads\nafa-portfolio-adjustment-v2.zip'
   if (-not (Test-Path -LiteralPath $zip)) { throw 'ZIP tidak ditemukan. Perbaiki path sesuai lokasi download.' }
   Expand-Archive -LiteralPath $zip -DestinationPath . -Force
   Test-Path .\nafa-portfolio-adjustment-v2\ONE_SHOT_PROMPT.md
   ```

   Ganti `$zip` bila lokasi download berbeda. Perintah ini mengekstrak ke folder `nafa-portfolio-adjustment-v2/`, **tidak menimpa** `AGENTS.md`, `docs/`, atau file aplikasi yang sudah ada.

4. Jalankan `opencode`, gunakan Build agent / model yang sudah berhasil, kemudian `/new`.
5. Tempel pesan berikut:

   ```text
   Read nafa-portfolio-adjustment-v2/ONE_SHOT_PROMPT.md and every specification it references. Execute the complete minimal-change adjustment in the existing repository. Preserve the existing visual design, layout, routes where possible, and ALL current seeded/dummy/client data and images. Remove public Demo/Test labels without deleting content. Simplify admin to client name + multiple photos, remove download and public-user features. Audit, take snapshots, implement, run regressions and visual QA. Do not stop after audit; do not push or deploy. Report evidence and blockers.
   ```

## Jangan salah menggunakan paket lama

Jika `nafa-portfolio-realignment/` (v1) masih ada di repo, **abaikan dokumen v1 yang bertentangan**. Jangan jalankan `ONE_SHOT_PROMPT.md` v1 bersamaan dengan v2. Agent v2 harus mencatat bahwa arahan sebelumnya tentang menghapus data dummy / merombak layout bersifat SUPERSEDED.

## Yang tidak boleh agent lakukan

- Menghapus data dummy/seed yang sudah terlihat; membersihkan database secara massal; mereset storage; menghapus foto.
- Mengganti color palette, hero, kartu, navbar atau grid karena ingin lebih modern/elegan.
- Membuat ulang website dari nol atau mengulang bootstrap.
- Mengganti record yang ada menjadi empty state hanya karena layanan backend belum terkoneksi.
- Mengklaim upload tersimpan permanen jika ternyata hanya frontend/localStorage.
- Memaksakan data kontak, testimoni, harga, atau nama klien baru yang tidak disediakan.
- Mengubah konfigurasi production/Vercel yang berjalan tanpa bukti kebutuhan.

**Hasil yang diinginkan:** website visualnya terasa sama seperti sekarang, data yang sama tetap ada, tetapi fungsi publik dan admin menjadi jauh lebih sederhana.
