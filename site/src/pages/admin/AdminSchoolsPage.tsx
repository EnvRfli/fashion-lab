import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AdminPageHeader } from "../../components/admin/AdminPageHeader";
import { ConfirmDialog } from "../../components/admin/ConfirmDialog";
import {
  EyeIcon,
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
} from "../../lib/schools";
import { usePageTitle } from "../../lib/use-page-title";

export function AdminSchoolsPage() {
  usePageTitle("Data Sekolah");
  const { schools, photos, deleteSchool } = useDemoData();
  const location = useLocation();
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
              `${school.name} ${school.location} ${school.level}`,
            ).includes(needle)
          : true,
      )
      .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
  }, [schools, search]);

  const target = schools.find((school) => school.id === deleteId);

  return (
    <>
      <AdminPageHeader
        eyebrow="Data Sekolah"
        title="Daftar sekolah demo"
        description="Tambah, ubah, atau hapus sekolah contoh. Perubahan langsung muncul di halaman publik."
        actions={
          <Link to="/admin/sekolah/baru" className="btn btn-primary">
            <PlusIcon />
            Tambah Sekolah
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
            <label className="sr-only" htmlFor="admin-school-search">
              Cari sekolah
            </label>
            <input
              id="admin-school-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari nama, lokasi, atau jenjang..."
            />
          </div>
          <p className="admin-result-count" role="status">
            {filtered.length} sekolah
          </p>
        </div>

        {filtered.length > 0 ? (
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
                {filtered.map((school) => (
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
            <p>Tidak ada sekolah yang cocok dengan pencarian.</p>
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
          description="Sekolah dan seluruh foto terkait akan dihapus dari data demo browser ini."
          confirmLabel="Hapus sekolah"
          onCancel={() => setDeleteId(null)}
          onConfirm={() => {
            deleteSchool(target.id);
            setDeleteId(null);
          }}
        />
      ) : null}
    </>
  );
}
