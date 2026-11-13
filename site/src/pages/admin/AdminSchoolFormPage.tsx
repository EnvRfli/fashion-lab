import { useRef, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AdminPageHeader } from "../../components/admin/AdminPageHeader";
import { ConfirmDialog } from "../../components/admin/ConfirmDialog";
import { MultiImageDropzone } from "../../components/admin/MultiImageDropzone";
import { ArrowLeftIcon, CheckIcon } from "../../components/Icons";
import { EDUCATION_LEVELS, type EducationLevelId } from "../../data/education-levels";
import { useDemoData } from "../../data/useDemoData";
import type { GalleryPhoto } from "../../data/types";
import { usePageTitle } from "../../lib/use-page-title";

type Errors = {
  name?: string;
  photos?: string;
  location?: string;
  description?: string;
};

export function AdminSchoolFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { schools, photos, savePortfolio } = useDemoData();
  const school = id ? schools.find((item) => item.id === id) : undefined;
  const isEditing = Boolean(id && school);
  usePageTitle(isEditing ? "Edit Portofolio" : "Tambah Portofolio");

  const [name, setName] = useState(school?.name ?? "");
  const [level, setLevel] = useState<EducationLevelId | "">(
    school?.level ?? "",
  );
  const [location, setLocation] = useState(school?.location ?? "");
  const [description, setDescription] = useState(school?.description ?? "");
  const [newPhotos, setNewPhotos] = useState<string[]>([]);
  const [removedPhotoIds, setRemovedPhotoIds] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [submitError, setSubmitError] = useState("");
  const [busy, setBusy] = useState(false);
  const [removeTarget, setRemoveTarget] = useState<GalleryPhoto | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const photosRef = useRef<HTMLElement>(null);

  if (id && !school) {
    return (
      <section className="admin-panel">
        <h1>Portofolio tidak ditemukan</h1>
        <p className="admin-muted">
          Data klien ini tidak ada. Mungkin sudah dihapus.
        </p>
        <Link to="/admin/sekolah" className="btn btn-primary">
          Kembali ke Portofolio
        </Link>
      </section>
    );
  }

  const existingPhotos = school
    ? photos.filter((photo) => photo.schoolId === school.id)
    : [];
  const visiblePhotos = existingPhotos.filter(
    (photo) => !removedPhotoIds.includes(photo.id),
  );
  const totalPhotos = visiblePhotos.length + newPhotos.length;
  const remainingDescription = 500 - description.length;

  const validate = (): Errors => {
    const next: Errors = {};
    if (!name.trim()) {
      next.name = "Nama klien wajib diisi.";
    } else if (name.trim().length > 80) {
      next.name = "Nama klien maksimal 80 karakter.";
    }
    if (totalPhotos < 1) {
      next.photos = "Tambahkan minimal satu foto hasil pekerjaan.";
    }
    if (location.trim().length > 100) {
      next.location = "Lokasi maksimal 100 karakter.";
    }
    if (description.trim().length > 500) {
      next.description = "Keterangan maksimal 500 karakter.";
    }
    return next;
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;
    const nextErrors = validate();
    if (Object.values(nextErrors).some(Boolean)) {
      setErrors(nextErrors);
      setSubmitError("");
      if (nextErrors.name) {
        nameRef.current?.focus();
      } else if (nextErrors.photos) {
        photosRef.current?.scrollIntoView?.({ block: "center" });
      }
      return;
    }

    setBusy(true);
    setSubmitError("");
    try {
      const result = savePortfolio({
        id: school?.id,
        name: name.trim(),
        level: level || undefined,
        location,
        description,
        newPhotos,
        removedPhotoIds,
      });

      if (!result.persisted) {
        setSubmitError(
          "Perubahan belum tersimpan. Penyimpanan browser tidak tersedia atau penuh. Kurangi ukuran/jumlah foto lalu coba lagi.",
        );
        return;
      }

      navigate("/admin/sekolah", {
        state: {
          notice: isEditing
            ? `${result.school.name} berhasil diperbarui.`
            : `${result.school.name} berhasil dipublikasikan.`,
        },
      });
    } catch (caught) {
      setSubmitError(
        caught instanceof Error
          ? caught.message
          : "Portofolio gagal disimpan. Coba lagi.",
      );
    } finally {
      setBusy(false);
    }
  };

  const requestRemove = (photo: GalleryPhoto) => {
    if (totalPhotos <= 1) {
      setErrors((current) => ({
        ...current,
        photos:
          "Portofolio harus memiliki minimal satu foto. Tambahkan foto baru sebelum menghapus foto terakhir.",
      }));
      return;
    }
    setRemoveTarget(photo);
  };

  return (
    <>
      <Link to="/admin/sekolah" className="back-link admin-back-link">
        <ArrowLeftIcon />
        Portofolio
      </Link>

      <AdminPageHeader
        eyebrow="Portofolio"
        title={isEditing ? "Edit Portofolio" : "Tambah Portofolio"}
        description="Masukkan nama klien dan unggah foto hasil pekerjaan. Kategori dan keterangan bersifat opsional."
      />

      {submitError ? (
        <div className="admin-note" role="alert">
          <p>{submitError}</p>
        </div>
      ) : null}

      <form className="admin-form" onSubmit={submit} noValidate>
        <section className="admin-panel form-panel">
          <h2>Informasi klien</h2>
          <div className="form-field">
            <label htmlFor="client-name" className="field-label">
              Nama klien <span aria-hidden="true">*</span>
            </label>
            <input
              ref={nameRef}
              id="client-name"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setErrors((current) => ({ ...current, name: undefined }));
              }}
              placeholder="Nama klien"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "client-name-error" : undefined}
              maxLength={90}
              autoComplete="organization"
            />
            {errors.name ? (
              <p className="field-error" id="client-name-error" role="alert">
                {errors.name}
              </p>
            ) : (
              <p className="field-hint">
                Nama klien akan tampil sebagai judul portofolio di situs publik.
              </p>
            )}
          </div>
        </section>

        <section className="admin-panel form-panel" id="photos" ref={photosRef}>
          <h2>Foto hasil pekerjaan</h2>
          <p className="admin-muted">
            Pilih satu atau beberapa foto sekaligus. Foto pertama menjadi sampul
            jika portofolio belum memiliki sampul.
          </p>

          {existingPhotos.length > 0 ? (
            <div className="portfolio-photo-block">
              <h3 className="form-subheading">Foto tersimpan</h3>
              <ul className="portfolio-photo-grid">
                {existingPhotos.map((photo) => {
                  const removed = removedPhotoIds.includes(photo.id);
                  const isCover = photo.imagePath === school?.coverImage;
                  return (
                    <li
                      key={photo.id}
                      className={`portfolio-photo-item ${
                        removed ? "is-removed" : ""
                      }`}
                    >
                      <img src={photo.imagePath} alt={photo.alt} />
                      <div className="portfolio-photo-meta">
                        <span>{photo.category}</span>
                        {isCover && !removed ? (
                          <span className="cover-tag">Sampul</span>
                        ) : null}
                        {removed ? (
                          <span className="removed-tag">Akan dihapus</span>
                        ) : null}
                      </div>
                      {!removed ? (
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => requestRemove(photo)}
                        >
                          Hapus
                        </button>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
              {removedPhotoIds.length > 0 ? (
                <p className="field-hint">
                  {removedPhotoIds.length} foto akan dihapus saat disimpan.{" "}
                  <button
                    type="button"
                    className="text-link"
                    onClick={() => setRemovedPhotoIds([])}
                  >
                    Batalkan penghapusan
                  </button>
                </p>
              ) : null}
            </div>
          ) : null}

          <MultiImageDropzone
            label={isEditing ? "Tambah foto baru" : "Unggah foto"}
            values={newPhotos}
            onChange={(values) => {
              setNewPhotos(values);
              setErrors((current) => ({ ...current, photos: undefined }));
            }}
            onBusyChange={setBusy}
            error={errors.photos}
            required={!isEditing}
            hint="Foto akan dioptimalkan agar muat disimpan di browser."
          />

          {newPhotos.length > 0 ? (
            <p className="field-hint">
              {newPhotos.length} foto baru siap disimpan.{" "}
              {totalPhotos} foto total pada portofolio ini.
            </p>
          ) : null}
        </section>

        <details className="admin-panel form-panel form-details">
          <summary>Informasi tambahan (opsional)</summary>
          <div className="form-details-body">
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="client-level" className="field-label">
                  Kategori
                </label>
                <select
                  id="client-level"
                  value={level}
                  onChange={(event) =>
                    setLevel(event.target.value as EducationLevelId | "")
                  }
                >
                  <option value="">Tanpa kategori</option>
                  {EDUCATION_LEVELS.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.id} — {item.name}
                    </option>
                  ))}
                </select>
                <p className="field-hint">
                  Opsional. Gunakan jika klien termasuk jenjang pendidikan.
                </p>
              </div>

              <div className="form-field">
                <label htmlFor="client-location" className="field-label">
                  Lokasi
                </label>
                <input
                  id="client-location"
                  type="text"
                  value={location}
                  onChange={(event) => {
                    setLocation(event.target.value);
                    setErrors((current) => ({
                      ...current,
                      location: undefined,
                    }));
                  }}
                  placeholder="Kota, provinsi"
                  aria-invalid={errors.location ? true : undefined}
                  aria-describedby={
                    errors.location ? "client-location-error" : undefined
                  }
                  maxLength={110}
                />
                {errors.location ? (
                  <p
                    className="field-error"
                    id="client-location-error"
                    role="alert"
                  >
                    {errors.location}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="client-description" className="field-label">
                Keterangan
              </label>
              <textarea
                id="client-description"
                rows={4}
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                  setErrors((current) => ({
                    ...current,
                    description: undefined,
                  }));
                }}
                placeholder="Keterangan singkat tentang pekerjaan ini (opsional)."
                aria-invalid={errors.description ? true : undefined}
                aria-describedby={
                  errors.description
                    ? "client-description-error"
                    : "client-description-hint"
                }
                maxLength={520}
              />
              <div className="field-foot">
                {errors.description ? (
                  <p
                    className="field-error"
                    id="client-description-error"
                    role="alert"
                  >
                    {errors.description}
                  </p>
                ) : (
                  <p className="field-hint" id="client-description-hint">
                    Tampil di halaman detail portofolio.
                  </p>
                )}
                <span className="char-count">
                  {remainingDescription} karakter tersisa
                </span>
              </div>
            </div>
          </div>
        </details>

        <div className="form-actions">
          <Link to="/admin/sekolah" className="btn btn-secondary">
            Batal
          </Link>
          <button type="submit" className="btn btn-primary" disabled={busy}>
            <CheckIcon />
            {busy
              ? "Menyimpan..."
              : isEditing
                ? "Simpan Perubahan"
                : "Simpan & Publikasikan"}
          </button>
        </div>
      </form>

      {removeTarget ? (
        <ConfirmDialog
          title={`Hapus foto dari ${school?.name ?? "portofolio"}?`}
          description="Foto ini akan dihapus dari galeri setelah Anda menyimpan perubahan. Foto lain dan nama klien tetap dipertahankan."
          confirmLabel="Hapus foto"
          onCancel={() => setRemoveTarget(null)}
          onConfirm={() => {
            setRemovedPhotoIds((current) => [...current, removeTarget.id]);
            setRemoveTarget(null);
          }}
        />
      ) : null}
    </>
  );
}
