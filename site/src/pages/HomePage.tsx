import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DemoNote } from "../components/DemoNote";
import { EducationLevelCards } from "../components/EducationLevelCards";
import { EmptyState } from "../components/EmptyState";
import {
  ArrowRightIcon,
  DownloadIcon,
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
              Direktori seragam sekolah
            </p>
            <h1>Koleksi Seragam Sekolah</h1>
            <p className="hero-description">
              Temukan berbagai referensi seragam sekolah berdasarkan jenjang
              pendidikan. Cari sekolah, buka galerinya, lalu unduh foto yang
              tersedia.
            </p>

            <SearchBar
              id="hero-search"
              value={search}
              onChange={setSearch}
              onSubmit={submitSearch}
            />

            <DemoNote className="hero-demo" />
          </div>

          <div className="hero-media" aria-label="Contoh foto referensi seragam">
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
                <strong>{photos.length}</strong> foto referensi
              </span>
            </div>
            <div className="hero-badge hero-badge-bottom">
              <DownloadIcon />
              <span>Unduh per foto atau sekaligus</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-categories">
        <div className="shell">
          <div className="section-heading">
            <div>
              <h2>Pilih Kategori Sekolah</h2>
              <p>Mulai dari jenjang yang Anda cari.</p>
            </div>
          </div>
          <EducationLevelCards counts={levelCounts} />
        </div>
      </section>

      <section className="section section-listing">
        <div className="shell">
          <div className="section-heading section-heading-row">
            <div>
              <div className="heading-with-badge">
                <h2>Daftar Sekolah</h2>
                <span className="demo-badge">Data demo</span>
              </div>
              <p>Contoh data sekolah untuk menjelajahi alur galeri.</p>
            </div>
            <Link to="/sekolah" className="text-link">
              Lihat semua sekolah
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
              title="Tidak ada sekolah yang cocok"
              description="Coba pilih kategori lain atau hapus filter untuk melihat seluruh daftar."
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
                Lihat {listing.length} sekolah lainnya
              </Link>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section section-how">
        <div className="shell">
          <div className="how-card">
            <div>
              <h2>Cara memakai galeri</h2>
              <p>
                Galeri ini membantu Anda melihat referensi seragam, bukan
                membeli produk. Semua foto adalah contoh berlisensi.
              </p>
            </div>
            <ol className="how-list">
              <li>
                <span>1</span>
                <div>
                  <strong>Cari sekolah</strong>
                  <p>Gunakan nama sekolah atau pilih jenjang TK–SMA.</p>
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
                  <strong>Unduh referensi</strong>
                  <p>Unduh satu foto atau seluruh arsip yang tersedia.</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
