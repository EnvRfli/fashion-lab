import { Link } from "react-router-dom";
import {
  BookIcon,
  CapIcon,
  ChevronDownIcon,
  TeddyIcon,
  TrophyIcon,
} from "../components/Icons";
import { EDUCATION_LEVELS } from "../data/education-levels";
import { useDemoData } from "../data/useDemoData";
import { countSchoolsByLevel, formatPhotoCount } from "../lib/schools";
import { usePageTitle } from "../lib/use-page-title";

const ICONS = {
  teddy: TeddyIcon,
  cap: CapIcon,
  book: BookIcon,
  trophy: TrophyIcon,
} as const;

export function CategoriesPage() {
  usePageTitle("Kategori Klien");
  const { schools, photos, categoryDescriptions } = useDemoData();
  const counts = countSchoolsByLevel(schools);

  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <p className="eyebrow">Kategori</p>
          <h1>Kategori Klien</h1>
          <p>
            Empat kategori pendidikan utama. Pilih kategori untuk melihat daftar
            klien dan galeri hasil pekerjaannya.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="category-overview">
            {EDUCATION_LEVELS.map((level) => {
              const Icon = ICONS[level.icon];
              const schoolCount = counts[level.id] ?? 0;
              const photoCount = photos.filter((photo) =>
                schools.some(
                  (school) =>
                    school.level === level.id && school.id === photo.schoolId,
                ),
              ).length;
              return (
                <article
                  key={level.id}
                  className="category-card"
                  data-level={level.id}
                >
                  <div className="category-card-top">
                    <span className="category-card-icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <div>
                      <h2>
                        <span className="level-code">{level.id}</span>
                        {level.name}
                      </h2>
                      <p>{categoryDescriptions[level.id] ?? level.description}</p>
                    </div>
                  </div>
                  <div className="category-card-stats">
                    <span>{schoolCount} Klien</span>
                    <span>{formatPhotoCount(photoCount)}</span>
                  </div>
                  <Link
                    to={`/sekolah?kategori=${level.id}`}
                    className="category-card-link"
                  >
                    Lihat klien {level.id}
                    <ChevronDownIcon />
                  </Link>
                </article>
              );
            })}
          </div>

          <div className="category-footer">
            <div>
              <h2>Belum menemukan klien?</h2>
              <p>
                Gunakan pencarian di halaman portofolio untuk mencari
                berdasarkan nama klien atau lokasi.
              </p>
            </div>
            <Link to="/sekolah" className="btn btn-primary">
              Buka daftar klien
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
