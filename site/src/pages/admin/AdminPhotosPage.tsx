import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AdminPageHeader } from "../../components/admin/AdminPageHeader";
import { ConfirmDialog } from "../../components/admin/ConfirmDialog";
import {
  EyeIcon,
  PlusIcon,
  TrashIcon,
} from "../../components/Icons";
import { useDemoData } from "../../data/useDemoData";
import { formatDate } from "../../lib/schools";
import { usePageTitle } from "../../lib/use-page-title";

export function AdminPhotosPage() {
  usePageTitle("Data Foto");
  const { photos, schools, deletePhoto } = useDemoData();
  const location = useLocation();
  const notice = (location.state as { notice?: string } | null)?.notice;
  const [schoolFilter, setSchoolFilter] = useState("semua");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      [...photos]
        .filter(
          (photo) =>
            schoolFilter === "semua" || photo.schoolId === schoolFilter,
        )
        .sort(
          (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
        ),
    [photos, schoolFilter],
  );

  const target = photos.find((photo) => photo.id === deleteId);
  const schoolName = (id: string) =>
    schools.find((school) => school.id === id)?.name ?? "Sekolah dihapus";
  const schoolSlug = (id: string) =>
    schools.find((school) => school.id === id)?.slug;

  return (
    <>
      <AdminPageHeader
        eyebrow="Data Foto"
        title="Galeri foto demo"
        description="Kelola foto yang tampil pada galeri sekolah. Setiap foto menyertakan kredit sumber."
        actions={
          <Link to="/admin/foto/baru" className="btn btn-primary">
            <PlusIcon />
            Tambah Foto
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
          <div className="filter-field">
            <label htmlFor="photo-school-filter">Filter sekolah</label>
            <div className="filter-control">
              <select
                id="photo-school-filter"
                value={schoolFilter}
                onChange={(event) => setSchoolFilter(event.target.value)}
              >
                <option value="semua">Semua sekolah</option>
                {schools.map((school) => (
                  <option key={school.id} value={school.id}>
                    {school.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="admin-result-count" role="status">
            {filtered.length} foto
          </p>
        </div>

        {filtered.length > 0 ? (
          <div className="table-scroll">
            <table className="data-table data-table-photos">
              <thead>
                <tr>
                  <th scope="col">Foto</th>
                  <th scope="col" className="col-hide-sm">
                    Sekolah
                  </th>
                  <th scope="col" className="col-hide-sm">
                    Kategori
                  </th>
                  <th scope="col" className="col-hide-sm">
                    Ditambahkan
                  </th>
                  <th scope="col" className="col-actions">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((photo) => {
                  const slug = schoolSlug(photo.schoolId);
                  return (
                    <tr key={photo.id}>
                      <td>
                        <div className="photo-cell">
                          <img src={photo.imagePath} alt="" />
                          <div>
                            <span className="table-school-name">
                              {photo.title}
                            </span>
                            <span className="table-school-location">
                              {photo.creator} · {photo.license}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="col-hide-sm">
                        <div className="table-school">
                          <span className="table-school-name">
                            {schoolName(photo.schoolId)}
                          </span>
                          <span className="table-school-location">
                            {schools.find(
                              (school) => school.id === photo.schoolId,
                            )?.level ?? "—"}
                          </span>
                        </div>
                      </td>
                      <td className="col-hide-sm">{photo.category}</td>
                      <td className="col-hide-sm">
                        {formatDate(photo.createdAt)}
                      </td>
                      <td>
                        <div className="table-actions">
                          {slug ? (
                            <Link
                              to={`/sekolah/${slug}`}
                              className="icon-button icon-button-sm"
                              aria-label={`Lihat galeri ${schoolName(
                                photo.schoolId,
                              )}`}
                            >
                              <EyeIcon />
                            </Link>
                          ) : null}
                          <button
                            type="button"
                            className="icon-button icon-button-sm is-danger"
                            onClick={() => setDeleteId(photo.id)}
                            aria-label={`Hapus foto ${photo.title}`}
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
            <p>Tidak ada foto pada filter ini.</p>
            <Link to="/admin/foto/baru" className="btn btn-primary">
              Tambah Foto
            </Link>
          </div>
        )}
      </section>

      {target ? (
        <ConfirmDialog
          title={`Hapus foto "${target.title}"?`}
          description="Foto akan dihapus dari galeri demo. File stok asli pada pustaka tidak berubah."
          confirmLabel="Hapus foto"
          onCancel={() => setDeleteId(null)}
          onConfirm={() => {
            deletePhoto(target.id);
            setDeleteId(null);
          }}
        />
      ) : null}
    </>
  );
}
