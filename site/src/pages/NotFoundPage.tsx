import { Link } from "react-router-dom";
import { usePageTitle } from "../lib/use-page-title";

export function NotFoundPage() {
  usePageTitle("Halaman tidak ditemukan");

  return (
    <section className="section">
      <div className="shell not-found">
        <p className="eyebrow">404</p>
        <h1>Halaman tidak ditemukan</h1>
        <p>
          Alamat ini tidak tersedia. Kembali ke beranda atau telusuri daftar
          klien yang ada.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            Kembali ke beranda
          </Link>
          <Link to="/sekolah" className="btn btn-secondary">
            Daftar klien
          </Link>
        </div>
      </div>
    </section>
  );
}
