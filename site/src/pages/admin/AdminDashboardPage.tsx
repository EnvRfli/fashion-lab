import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AdminPageHeader } from "../../components/admin/AdminPageHeader";
import { ConfirmDialog } from "../../components/admin/ConfirmDialog";
import { StatCard } from "../../components/admin/StatCard";
import {
  CategoryIcon,
  EyeIcon,
  ImageIcon,
  PencilIcon,
  PlusIcon,
  SchoolIcon,
  TrashIcon,
  UsersIcon,
} from "../../components/Icons";
import { LevelBadge } from "../../components/LevelBadge";
import { EDUCATION_LEVELS } from "../../data/education-levels";
import { useDemoData } from "../../data/useDemoData";
import {
  formatDate,
  photoCountBySchool,
} from "../../lib/schools";
import { usePageTitle } from "../../lib/use-page-title";

export function AdminDashboardPage() {
  usePageTitle("Dashboard Admin");
  const { schools, photos, users, deleteSchool, resetData } = useDemoData();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [resetOpen, setResetOpen] = useState(false);
  const counts = useMemo(() => photoCountBySchool(photos), [photos]);

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
        description="Pantau jumlah sekolah, foto, kategori, dan pengguna demo."
        actions={
          <>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setResetOpen(true)}
            >
              Reset data demo
            </button>
            <Link to="/admin/sekolah/baru" className="btn btn-primary">
              <PlusIcon />
              Tambah Sekolah
            </Link>
          </>
        }
      />

      <div className="stat-grid">
        <StatCard
          label="Total Sekolah"
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
          label="Kategori"
          value={EDUCATION_LEVELS.length}
          icon={<CategoryIcon />}
          tone="blue"
        />
        <StatCard
          label="Admin Demo"
          value={users.length}
          icon={<UsersIcon />}
          tone="amber"
        />
      </div>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <h2>Sekolah Terbaru</h2>
            <p>Lima sekolah yang terakhir diperbarui pada data demo ini.</p>
          </div>
          <Link to="/admin/sekolah" className="text-link">
            Lihat semua
          </Link>
        </div>

        {recent.length > 0 ? (
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">Nama Sekolah</th>
                  <th scope="col">Kategori</th>
                  <th scope="col" className="col-hide-sm">
                    Total Foto
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
                {recent.map((school) => (
                  <tr key={school.id}>
                    <td>
                      <div className="table-school">
                        <span className="table-school-name">{school.name}</span>
                        <span className="table-school-location">
                          {school.location}
                        </span>
                      </div>
                    </td>
                    <td>
                      <LevelBadge level={school.level} />
                    </td>
                    <td className="col-hide-sm">{counts.get(school.id) ?? 0}</td>
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
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="admin-empty">
            <p>Belum ada sekolah. Tambahkan sekolah demo pertama.</p>
            <Link to="/admin/sekolah/baru" className="btn btn-primary">
              Tambah Sekolah
            </Link>
          </div>
        )}
      </section>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <h2>Aksi cepat</h2>
            <p>Kelola isi galeri demo dari satu tempat.</p>
          </div>
        </div>
        <div className="quick-actions">
          <Link to="/admin/foto/baru" className="quick-action">
            <ImageIcon />
            <span>
              <strong>Tambah foto</strong>
              <small>Unggah foto atau pilih dari pustaka demo.</small>
            </span>
          </Link>
          <Link to="/admin/kategori" className="quick-action">
            <CategoryIcon />
            <span>
              <strong>Kelola kategori</strong>
              <small>Perbarui deskripsi empat jenjang utama.</small>
            </span>
          </Link>
          <Link to="/admin/pengguna" className="quick-action">
            <UsersIcon />
            <span>
              <strong>Pengguna demo</strong>
              <small>Lihat daftar akun contoh tanpa autentikasi.</small>
            </span>
          </Link>
        </div>
      </section>

      {target ? (
        <ConfirmDialog
          title={`Hapus ${target.name}?`}
          description="Sekolah dan seluruh foto yang terkait akan dihapus dari data demo browser ini. Tindakan ini tidak dapat dibatalkan."
          confirmLabel="Hapus sekolah"
          onCancel={() => setDeleteId(null)}
          onConfirm={() => {
            deleteSchool(target.id);
            setDeleteId(null);
          }}
        />
      ) : null}

      {resetOpen ? (
        <ConfirmDialog
          title="Reset seluruh data demo?"
          description="Semua perubahan lokal pada sekolah, foto, kategori, dan pengguna akan diganti dengan data awal demo. Tindakan ini tidak dapat dibatalkan."
          confirmLabel="Reset data"
          onCancel={() => setResetOpen(false)}
          onConfirm={() => {
            resetData();
            setResetOpen(false);
          }}
        />
      ) : null}
    </>
  );
}
