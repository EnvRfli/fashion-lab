import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AdminPageHeader } from "../../components/admin/AdminPageHeader";
import { ConfirmDialog } from "../../components/admin/ConfirmDialog";
import {
  EyeIcon,
  ImageIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
} from "../../components/Icons";
import { LevelBadge } from "../../components/LevelBadge";
import { useDemoData } from "../../data/useDemoData";
import {
  formatDate,
  normalizeText,
  photoCountBySchool,
  schoolImage,
} from "../../lib/schools";
import { usePageTitle } from "../../lib/use-page-title";

export function AdminSchoolsPage() {
  usePageTitle("Portofolio Klien");
  const { schools, photos, deletePortfolio } = useDemoData();
  const location = useLocation();
  const navigate = useNavigate();
  const notice = (location.state as { notice?: string } | null)?.notice;
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const counts = useMemo(() => photoCountBySchool(photos), [photos]);

  const filtered = useMemo(() => {
    const needle = normalizeText(search);
    return schools
      .filter((school) =>
        needle
          ? normalizeText(
              `${school.name} ${school.location} ${school.level ?? ""}`,
            ).includes(needle)
          : true,
      )
      .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
  }, [schools, search]);

  const target = schools.find((school) => school.id === deleteId);

  return (
    <>
      <AdminPageHeader
        eyebrow="Portofolio"
        title="Portofolio Klien"
        description="Kelola nama klien dan foto hasil pekerjaan. Perubahan langsung muncul di halaman publik."
        actions={
          <Link to="/admin/sekolah/baru" className="btn btn-primary">
            <PlusIcon />
            Tambah Portofolio
          </Link>
        }
      />

      {notice ? (
        <p className="inline-status" role="status">
          {notice}
        </p>
      ) : null}

      <section className="admin-panel">
        <div className="admin-toolbar">
          <div className="admin-search">
            <SearchIcon aria-hidden="true" />
            <label className="sr-only" htmlFor="admin-client-search">
              Cari klien
            </label>
            <input
              id="admin-client-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari nama klien, lokasi, atau kategori..."
            />
          </div>
          <p className="admin-result-count" role="status">
            {filtered.length} portofolio
          </p>
        </div>

        {filtered.length > 0 ? (
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
                {filtered.map((school) => {
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
                            to={`/admin/sekolah/${school.id}/edit#photos`}
                            className="icon-button icon-button-sm"
                            aria-label={`Tambah foto untuk ${school.name}`}
                          >
                            <ImageIcon />
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
            <p>Tidak ada klien yang cocok dengan pencarian.</p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setSearch("")}
            >
              Hapus pencarian
            </button>
          </div>
        )}
      </section>

      {target ? (
        <ConfirmDialog
          title={`Hapus ${target.name}?`}
          description="Portofolio klien dan seluruh foto terkait akan dihapus. Tindakan ini tidak dapat dibatalkan."
          confirmLabel="Hapus portofolio"
          onCancel={() => setDeleteId(null)}
          onConfirm={() => {
            const persisted = deletePortfolio(target.id);
            setDeleteId(null);
            navigate("/admin/sekolah", {
              replace: true,
              state: {
                notice: persisted
                  ? `${target.name} berhasil dihapus.`
                  : "Penghapusan belum tersimpan. Penyimpanan browser tidak tersedia.",
              },
            });
          }}
        />
      ) : null}
    </>
  );
}
