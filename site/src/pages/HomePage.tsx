import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EducationLevelCards } from "../components/EducationLevelCards";
import { EmptyState } from "../components/EmptyState";
import {
  ArrowRightIcon,
  EyeIcon,
  ImageIcon,
  SchoolIcon,
} from "../components/Icons";
import { SchoolCard } from "../components/SchoolCard";
import { SchoolFilters } from "../components/SchoolFilters";
import { SearchBar } from "../components/SearchBar";
import { DEMO_ASSETS } from "../data/assets";
import { useDemoData } from "../data/useDemoData";
import {
  countSchoolsByLevel,
  filterAndSortSchools,
  type SchoolQuery,
} from "../lib/schools";
import { usePageTitle } from "../lib/use-page-title";

const HERO_IMAGES = [
  DEMO_ASSETS["poplin-shirt"],
  DEMO_ASSETS["wool-blazer"],
  DEMO_ASSETS["uniform-flatlay"],
];

export function HomePage() {
  usePageTitle();
  const navigate = useNavigate();
  const { schools, photos } = useDemoData();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState<SchoolQuery>({
    query: "",
    level: "semua",
    sort: "terbaru",
  });

  const levelCounts = useMemo(() => countSchoolsByLevel(schools), [schools]);
  const listing = useMemo(
    () => filterAndSortSchools(schools, photos, query),
    [schools, photos, query],
  );
  const visible = listing.slice(0, 4);

  const submitSearch = () => {
    const trimmed = search.trim();
    navigate(trimmed ? `/sekolah?q=${encodeURIComponent(trimmed)}` : "/sekolah");
  };

  return (
    <>
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <SchoolIcon />
              Portofolio konveksi Nafa Collection
            </p>
            <h1>Portofolio Seragam Klien</h1>
            <p className="hero-description">
              Lihat hasil pekerjaan konveksi untuk sekolah, pesantren, dan
              organisasi. Telusuri nama klien, buka galeri, dan periksa detail
              setiap foto.
            </p>

            <SearchBar
              id="hero-search"
              value={search}
              onChange={setSearch}
              onSubmit={submitSearch}
            />
          </div>

          <div className="hero-media" aria-label="Foto hasil pekerjaan konveksi">
            {HERO_IMAGES.map((asset, index) => (
              <figure
                key={asset.key}
                className={`hero-photo hero-photo-${index + 1}`}
              >
                <img src={asset.path} alt={asset.alt} />
              </figure>
            ))}
            <div className="hero-badge hero-badge-top">
              <ImageIcon />
              <span>
                <strong>{photos.length}</strong> foto portofolio
              </span>
            </div>
            <div className="hero-badge hero-badge-bottom">
              <EyeIcon />
              <span>Lihat galeri klien</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-categories">
        <div className="shell">
          <div className="section-heading">
            <div>
              <h2>Pilih Kategori Klien</h2>
              <p>Mulai dari kategori yang Anda cari.</p>
            </div>
          </div>
          <EducationLevelCards counts={levelCounts} />
        </div>
      </section>

      <section className="section section-listing">
        <div className="shell">
          <div className="section-heading section-heading-row">
            <div>
              <h2>Klien & Hasil Produksi</h2>
              <p>Daftar klien dan dokumentasi pekerjaan yang telah dikerjakan.</p>
            </div>
            <Link to="/sekolah" className="text-link">
              Lihat semua portofolio
              <ArrowRightIcon />
            </Link>
          </div>

          <SchoolFilters
            query={query}
            onChange={setQuery}
            showSearch={false}
          />

          {visible.length > 0 ? (
            <div className="school-grid">
              {visible.map((school) => (
                <SchoolCard key={school.id} school={school} photos={photos} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Tidak ada klien yang cocok"
              description="Coba pilih kategori lain atau hapus filter untuk melihat seluruh portofolio."
              action={
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() =>
                    setQuery({ query: "", level: "semua", sort: "terbaru" })
                  }
                >
                  Hapus filter
                </button>
              }
            />
          )}

          {listing.length > 4 ? (
            <div className="listing-more">
              <Link to="/sekolah" className="btn btn-secondary">
                Lihat {listing.length} portofolio lainnya
              </Link>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section section-how">
        <div className="shell">
          <div className="how-card">
            <div>
              <h2>Cara menjelajahi portofolio</h2>
              <p>
                Galeri ini menampilkan dokumentasi hasil pekerjaan konveksi,
                bukan katalog belanja. Setiap foto dapat dilihat lebih besar
                melalui pratinjau.
              </p>
            </div>
            <ol className="how-list">
              <li>
                <span>1</span>
                <div>
                  <strong>Cari klien</strong>
                  <p>Gunakan nama klien atau pilih kategori.</p>
                </div>
              </li>
              <li>
                <span>2</span>
                <div>
                  <strong>Buka galeri</strong>
                  <p>Lihat foto atasan, bawahan, dan pelengkap.</p>
                </div>
              </li>
              <li>
                <span>3</span>
                <div>
                  <strong>Periksa detail</strong>
                  <p>Buka pratinjau foto dan lihat kreditnya.</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
