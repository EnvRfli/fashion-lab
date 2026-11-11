import { Link } from "react-router-dom";
import { DemoNote } from "../components/DemoNote";
import {
  DownloadIcon,
  ExternalLinkIcon,
  ImageIcon,
  SchoolIcon,
  UsersIcon,
} from "../components/Icons";
import { DEMO_ASSETS } from "../data/assets";
import { usePageTitle } from "../lib/use-page-title";

const FEATURES = [
  {
    icon: SchoolIcon,
    title: "Direktori sekolah",
    body: "Cari sekolah berdasarkan nama atau jenjang TK, SD, SMP, dan SMA. Data pada demo ini adalah contoh.",
  },
  {
    icon: ImageIcon,
    title: "Galeri foto",
    body: "Setiap sekolah memiliki kumpulan foto referensi. Buka pratinjau untuk melihat detail dan kredit foto.",
  },
  {
    icon: DownloadIcon,
    title: "Unduh referensi",
    body: "Unduh satu foto atau seluruh arsip sekolah. Arsip dibuat dari file foto yang benar-benar tersedia.",
  },
  {
    icon: UsersIcon,
    title: "Panel admin demo",
    body: "Kelola sekolah, kategori, foto, dan pengguna contoh. Perubahan disimpan di browser ini saja.",
  },
];

export function AboutPage() {
  usePageTitle("Tentang");
  const rail = DEMO_ASSETS["atelier-rail"];

  return (
    <>
      <section className="page-hero">
        <div className="shell about-hero">
          <div>
            <p className="eyebrow">Tentang galeri</p>
            <h1>Referensi seragam, tanpa alur belanja.</h1>
            <p>
              Galeri Seragam adalah aplikasi demonstrasi untuk mencari sekolah,
              melihat referensi seragam, dan mengunduh foto. Aplikasi ini bukan
              toko, tidak memiliki keranjang, dan tidak menjual produk.
            </p>
            <DemoNote />
          </div>
          <figure className="about-photo">
            <img src={rail.path} alt={rail.alt} />
            <figcaption>
              Foto demonstrasi oleh {rail.creator} ·{" "}
              <a href={rail.sourceUrl} target="_blank" rel="noreferrer">
                {rail.license}
                <ExternalLinkIcon />
              </a>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="feature-grid">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title} className="feature-card">
                  <span className="feature-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <h2>{feature.title}</h2>
                  <p>{feature.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-about-detail">
        <div className="shell about-detail-grid">
          <div>
            <h2>Tentang data dan foto</h2>
            <p>
              Seluruh nama sekolah, profil, dan jumlah foto pada demo ini adalah
              data contoh. Nama sekolah tidak diverifikasi sebagai entitas nyata
              dan tidak ada klaim afiliasi.
            </p>
            <p>
              Foto galeri adalah stok demonstrasi dari Pexels di bawah Pexels
              License. Setiap foto mencantumkan pembuat dan tautan sumber pada
              pratinjau. Foto tidak boleh dianggap sebagai seragam resmi sekolah
              mana pun.
            </p>
            <p>
              Tidak ada gambar seragam yang dibuat dengan SVG, CSS, atau Canvas.
              Jika foto tidak tersedia, antarmuka menampilkan status kosong yang
              jujur, bukan ilustrasi pengganti.
            </p>
          </div>
          <aside className="about-aside">
            <h2>Mode demo</h2>
            <p>
              Panel admin menyimpan perubahan di <code>localStorage</code>{" "}
              browser ini. Data tidak dibagikan antarperangkat dan tidak ada
              autentikasi aman. Tombol Login Admin hanya merupakan alur visual.
            </p>
            <ul>
              <li>Tanpa keranjang atau checkout.</li>
              <li>Tanpa harga atau pembayaran.</li>
              <li>Tanpa akun atau kata sandi nyata.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="shell cta-band">
          <div>
            <h2>Mulai dari daftar sekolah</h2>
            <p>Cari sekolah atau pilih jenjang, lalu buka galerinya.</p>
          </div>
          <div className="cta-actions">
            <Link to="/sekolah" className="btn btn-primary">
              <SchoolIcon />
              Lihat sekolah
            </Link>
            <Link to="/admin/masuk" className="btn btn-secondary">
              Masuk ke admin demo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
