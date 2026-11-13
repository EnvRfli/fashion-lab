import { Link } from "react-router-dom";
import {
  ExternalLinkIcon,
  ImageIcon,
  InfoIcon,
  SchoolIcon,
  ShirtIcon,
} from "../components/Icons";
import { DEMO_ASSETS } from "../data/assets";
import { usePageTitle } from "../lib/use-page-title";

const FEATURES = [
  {
    icon: SchoolIcon,
    title: "Portofolio klien",
    body: "Lihat hasil pekerjaan berdasarkan nama klien dan kategori pendidikan.",
  },
  {
    icon: ImageIcon,
    title: "Galeri foto",
    body: "Setiap klien memiliki kumpulan foto hasil pekerjaan. Buka pratinjau untuk melihat detail dan kredit foto.",
  },
  {
    icon: ShirtIcon,
    title: "Produksi konveksi",
    body: "Dokumentasi seragam dan pakaian untuk sekolah, pesantren, dan organisasi.",
  },
  {
    icon: InfoIcon,
    title: "Dikelola admin",
    body: "Satu administrator mengelola nama klien dan foto melalui panel admin.",
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
            <p className="eyebrow">Tentang Nafa Collection</p>
            <h1>Portofolio produksi, tanpa alur belanja.</h1>
            <p>
              Galeri Seragam menampilkan dokumentasi pekerjaan konveksi Nafa
              Collection untuk sekolah, pesantren, dan organisasi. Aplikasi ini
              bukan toko, tidak memiliki keranjang, dan tidak menjual produk.
            </p>
          </div>
          <figure className="about-photo">
            <img src={rail.path} alt={rail.alt} />
            <figcaption>
              Foto oleh {rail.creator} ·{" "}
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
            <h2>Tentang portofolio dan foto</h2>
            <p>
              Nama klien dan keterangan pada halaman ini disusun sebagai
              dokumentasi portofolio. Pemilik website perlu memastikan izin
              publikasi nama dan foto sebelum situs digunakan secara publik.
            </p>
            <p>
              Foto galeri adalah stok berlisensi dari Pexels di bawah Pexels
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
            <h2>Status pengelolaan</h2>
            <p>
              Panel admin menyimpan perubahan di <code>localStorage</code>{" "}
              browser ini. Data tidak dibagikan antarperangkat dan belum
              terhubung ke autentikasi server.
            </p>
            <ul>
              <li>Tanpa keranjang atau checkout.</li>
              <li>Tanpa harga atau pembayaran.</li>
              <li>Tanpa akun publik.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="shell cta-band">
          <div>
            <h2>Mulai dari daftar klien</h2>
            <p>Cari klien atau pilih kategori, lalu buka galerinya.</p>
          </div>
          <div className="cta-actions">
            <Link to="/sekolah" className="btn btn-primary">
              <SchoolIcon />
              Lihat portofolio
            </Link>
            <Link to="/admin/masuk" className="btn btn-secondary">
              Masuk ke panel admin
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
