import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AdminPageHeader } from "../../components/admin/AdminPageHeader";
import { ConfirmDialog } from "../../components/admin/ConfirmDialog";
import { StatCard } from "../../components/admin/StatCard";
import {
  CategoryIcon,
  EyeIcon,
  HomeIcon,
  ImageIcon,
  PencilIcon,
  PlusIcon,
  SchoolIcon,
  TrashIcon,
} from "../../components/Icons";
import { LevelBadge } from "../../components/LevelBadge";
import { useDemoData } from "../../data/useDemoData";
import {
  formatDate,
  photoCountBySchool,
  schoolImage,
} from "../../lib/schools";
import { usePageTitle } from "../../lib/use-page-title";

export function AdminDashboardPage() {
  usePageTitle("Dashboard Admin");
  const { schools, photos, deletePortfolio } = useDemoData();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const counts = useMemo(() => photoCountBySchool(photos), [photos]);
  const usedCategories = useMemo(
    () => new Set(schools.map((school) => school.level).filter(Boolean)).size,
    [schools],
  );
  const averagePhotos = schools.length
    ? Math.round(photos.length / schools.length)
    : 0;

  const recent = useMemo(
    () =>
      [...schools]
        .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
        .slice(0, 5),
    [schools],
  );

  const target = schools.find((school) => school.id === deleteId);

  return (
    <>
      <AdminPageHeader
        eyebrow="Ringkasan"
        title="Dashboard"
        description="Pantau jumlah klien, foto, dan kategori portofolio."
        actions={
          <Link to="/admin/sekolah/baru" className="btn btn-primary">
            <PlusIcon />
            Tambah Portofolio
          </Link>
        }
      />

      <div className="stat-grid">
        <StatCard
          label="Total Klien"
          value={schools.length}
          icon={<SchoolIcon />}
          tone="burgundy"
        />
        <StatCard
          label="Total Foto"
          value={photos.length}
          icon={<ImageIcon />}
          tone="pink"
        />
        <StatCard
          label="Kategori Terpakai"
          value={usedCategories}
          icon={<CategoryIcon />}
          tone="blue"
        />
        <StatCard
          label="Rata-rata Foto"
          value={averagePhotos}
          icon={<ImageIcon />}
          tone="amber"
        />
      </div>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <h2>Portofolio Terbaru</h2>
            <p>Lima portofolio yang terakhir diperbarui.</p>
          </div>
          <Link to="/admin/sekolah" className="text-link">
            Lihat semua
          </Link>
        </div>

        {recent.length > 0 ? (
          <div className="table-scroll">
            <table className="data-table admin-portfolio-table">
              <thead>
                <tr>
                  <th scope="col">Klien</th>
                  <th scope="col">Kategori</th>
                  <th scope="col" className="col-hide-sm">
                    Foto
                  </th>
                  <th scope="col" className="col-hide-sm">
                    Diperbarui
                  </th>
                  <th scope="col" className="col-actions">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {recent.map((school) => {
                  const image = schoolImage(school, photos);
                  return (
                    <tr key={school.id}>
                      <td>
                        <div className="photo-cell">
                          {image ? (
                            <img src={image} alt="" />
                          ) : (
                            <span className="photo-cell-placeholder">
                              <ImageIcon />
                            </span>
                          )}
                          <div>
                            <span className="table-school-name">
                              {school.name}
                            </span>
                            <span className="table-school-location">
                              {school.location || "Tanpa lokasi"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        {school.level ? (
                          <LevelBadge level={school.level} />
                        ) : (
                          <span className="muted-badge">Tanpa kategori</span>
                        )}
                      </td>
                      <td className="col-hide-sm">
                        {counts.get(school.id) ?? 0}
                      </td>
                      <td className="col-hide-sm">
                        {formatDate(school.updatedAt)}
                      </td>
                      <td>
                        <div className="table-actions">
                          <Link
                            to={`/sekolah/${school.slug}`}
                            className="icon-button icon-button-sm"
                            aria-label={`Lihat ${school.name} di situs publik`}
                          >
                            <EyeIcon />
                          </Link>
                          <Link
                            to={`/admin/sekolah/${school.id}/edit`}
                            className="icon-button icon-button-sm"
                            aria-label={`Edit ${school.name}`}
                          >
                            <PencilIcon />
                          </Link>
                          <button
                            type="button"
                            className="icon-button icon-button-sm is-danger"
                            onClick={() => setDeleteId(school.id)}
                            aria-label={`Hapus ${school.name}`}
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="admin-empty">
            <p>Belum ada portofolio. Tambahkan klien pertama.</p>
            <Link to="/admin/sekolah/baru" className="btn btn-primary">
              Tambah Portofolio
            </Link>
          </div>
        )}
      </section>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <h2>Aksi cepat</h2>
            <p>Kelola portofolio klien dari satu tempat.</p>
          </div>
        </div>
        <div className="quick-actions">
          <Link to="/admin/sekolah/baru" className="quick-action">
            <PlusIcon />
            <span>
              <strong>Tambah portofolio</strong>
              <small>Masukkan nama klien dan beberapa foto sekaligus.</small>
            </span>
          </Link>
          <Link to="/admin/sekolah" className="quick-action">
            <ImageIcon />
            <span>
              <strong>Kelola portofolio</strong>
              <small>Edit nama, tambah foto, atau hapus portofolio.</small>
            </span>
          </Link>
          <Link to="/" className="quick-action">
            <HomeIcon />
            <span>
              <strong>Lihat situs</strong>
              <small>Buka tampilan publik yang dilihat klien.</small>
            </span>
          </Link>
        </div>
      </section>

      {target ? (
        <ConfirmDialog
          title={`Hapus ${target.name}?`}
          description="Portofolio klien dan seluruh foto yang terkait akan dihapus. Tindakan ini tidak dapat dibatalkan."
          confirmLabel="Hapus portofolio"
          onCancel={() => setDeleteId(null)}
          onConfirm={() => {
            deletePortfolio(target.id);
            setDeleteId(null);
          }}
        />
      ) : null}
    </>
  );
}
