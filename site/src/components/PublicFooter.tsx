import { Link } from "react-router-dom";
import { EDUCATION_LEVELS } from "../data/education-levels";
import { BrandMark } from "./BrandMark";

export function PublicFooter() {
  return (
    <footer className="public-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <BrandMark />
          <p>
            Portofolio hasil produksi konveksi Nafa Collection untuk sekolah,
            pesantren, dan organisasi.
          </p>
          <p className="footer-demo">
            Dokumentasi pekerjaan dan foto ditampilkan sebagai referensi
            portofolio.
          </p>
        </div>

        <nav aria-label="Jelajahi">
          <h2>Jelajahi</h2>
          <ul>
            <li>
              <Link to="/">Beranda</Link>
            </li>
            <li>
              <Link to="/sekolah">Portofolio Klien</Link>
            </li>
            <li>
              <Link to="/kategori">Kategori</Link>
            </li>
            <li>
              <Link to="/tentang">Tentang</Link>
            </li>
            <li>
              <Link to="/admin/masuk">Login Admin</Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Kategori klien">
          <h2>Kategori</h2>
          <ul>
            {EDUCATION_LEVELS.map((level) => (
              <li key={level.id}>
                <Link to={`/sekolah?kategori=${level.id}`}>
                  {level.id} — {level.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-credits">
          <h2>Foto & lisensi</h2>
          <p>
            Foto galeri adalah stok berlisensi dari Pexels di bawah{" "}
            <a
              href="https://www.pexels.com/license/"
              target="_blank"
              rel="noreferrer"
            >
              Pexels License
            </a>
            . Foto bukan seragam resmi sekolah mana pun.
          </p>
          <p>
            Setiap foto mencantumkan pembuat dan sumbernya di pratinjau galeri.
          </p>
        </div>
      </div>

      <div className="shell footer-bottom">
        <p>© 2026 Galeri Seragam — Nafa Collection.</p>
        <p>Dibuat dengan React, TypeScript, Vite, dan Tailwind CSS.</p>
      </div>
    </footer>
  );
}
