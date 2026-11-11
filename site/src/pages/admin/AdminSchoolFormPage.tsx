import { useRef, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AdminPageHeader } from "../../components/admin/AdminPageHeader";
import { ImageDropzone } from "../../components/admin/ImageDropzone";
import { ArrowLeftIcon, CheckIcon } from "../../components/Icons";
import { EDUCATION_LEVELS } from "../../data/education-levels";
import { useDemoData } from "../../data/useDemoData";
import type { SchoolInput } from "../../data/types";
import { usePageTitle } from "../../lib/use-page-title";

type Errors = Partial<Record<keyof SchoolInput, string>>;

export function AdminSchoolFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { schools, addSchool, updateSchool } = useDemoData();
  const school = id ? schools.find((item) => item.id === id) : undefined;
  usePageTitle(id ? "Edit Sekolah" : "Tambah Sekolah");

  const [values, setValues] = useState<SchoolInput>(() => ({
    name: school?.name ?? "",
    level: school?.level ?? "SD",
    location: school?.location ?? "",
    description: school?.description ?? "",
    coverImage: school?.coverImage,
  }));
  const [errors, setErrors] = useState<Errors>({});
  const nameRef = useRef<HTMLInputElement>(null);

  if (id && !school) {
    return (
      <section className="admin-panel">
        <h1>Sekolah tidak ditemukan</h1>
        <p className="admin-muted">
          Data sekolah ini tidak ada. Mungkin sudah dihapus atau data demo
          direset.
        </p>
        <Link to="/admin/sekolah" className="btn btn-primary">
          Kembali ke Data Sekolah
        </Link>
      </section>
    );
  }

  const update = <Key extends keyof SchoolInput>(
    key: Key,
    value: SchoolInput[Key],
  ) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (values.name.trim().length < 3) {
      next.name = "Nama sekolah minimal 3 karakter.";
    }
    if (values.name.trim().length > 80) {
      next.name = "Nama sekolah maksimal 80 karakter.";
    }
    if (values.location.trim().length > 100) {
      next.location = "Lokasi maksimal 100 karakter.";
    }
    if (values.description.trim().length > 500) {
      next.description = "Deskripsi maksimal 500 karakter.";
    }
    return next;
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.values(nextErrors).some(Boolean)) {
      setErrors(nextErrors);
      nameRef.current?.focus();
      return;
    }
    if (school) {
      updateSchool(school.id, values);
      navigate("/admin/sekolah", {
        state: { notice: `${values.name.trim()} berhasil diperbarui.` },
      });
    } else {
      addSchool(values);
      navigate("/admin/sekolah", {
        state: { notice: `${values.name.trim()} berhasil ditambahkan.` },
      });
    }
  };

  const remaining = 500 - values.description.length;

  return (
    <>
      <Link to="/admin/sekolah" className="back-link admin-back-link">
        <ArrowLeftIcon />
        Data Sekolah
      </Link>

      <AdminPageHeader
        eyebrow="Data Sekolah"
        title={school ? "Edit Sekolah" : "Tambah Sekolah"}
        description={
          school
            ? "Perbarui identitas sekolah demo. Perubahan langsung terlihat di situs publik."
            : "Tambahkan sekolah contoh baru. Nama dan kategori wajib diisi."
        }
      />

      <form className="admin-form" onSubmit={submit} noValidate>
        <section className="admin-panel form-panel">
          <h2>Identitas sekolah</h2>

          <div className="form-field">
            <label htmlFor="school-name" className="field-label">
              Nama Sekolah <span aria-hidden="true">*</span>
            </label>
            <input
              ref={nameRef}
              id="school-name"
              type="text"
              value={values.name}
              onChange={(event) => update("name", event.target.value)}
              placeholder="Contoh: SDN 001 Bandung"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "school-name-error" : undefined}
              maxLength={90}
            />
            {errors.name ? (
              <p className="field-error" id="school-name-error" role="alert">
                {errors.name}
              </p>
            ) : (
              <p className="field-hint">
                Gunakan nama yang jelas untuk data demonstrasi.
              </p>
            )}
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="school-level" className="field-label">
                Kategori <span aria-hidden="true">*</span>
              </label>
              <select
                id="school-level"
                value={values.level}
                onChange={(event) =>
                  update(
                    "level",
                    event.target.value as SchoolInput["level"],
                  )
                }
              >
                {EDUCATION_LEVELS.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.id} — {level.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="school-location" className="field-label">
                Lokasi
              </label>
              <input
                id="school-location"
                type="text"
                value={values.location}
                onChange={(event) => update("location", event.target.value)}
                placeholder="Contoh: Bandung, Jawa Barat"
                aria-invalid={errors.location ? true : undefined}
                aria-describedby={
                  errors.location ? "school-location-error" : undefined
                }
                maxLength={110}
              />
              {errors.location ? (
                <p
                  className="field-error"
                  id="school-location-error"
                  role="alert"
                >
                  {errors.location}
                </p>
              ) : null}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="school-description" className="field-label">
              Deskripsi
            </label>
            <textarea
              id="school-description"
              rows={5}
              value={values.description}
              onChange={(event) => update("description", event.target.value)}
              placeholder="Keterangan singkat tentang data sekolah demo ini."
              aria-invalid={errors.description ? true : undefined}
              aria-describedby={
                errors.description
                  ? "school-description-error"
                  : "school-description-hint"
              }
              maxLength={520}
            />
            <div className="field-foot">
              {errors.description ? (
                <p
                  className="field-error"
                  id="school-description-error"
                  role="alert"
                >
                  {errors.description}
                </p>
              ) : (
                <p className="field-hint" id="school-description-hint">
                  Deskripsi tampil di halaman detail sekolah.
                </p>
              )}
              <span className="char-count">{remaining} karakter tersisa</span>
            </div>
          </div>
        </section>

        <section className="admin-panel form-panel">
          <h2>Foto sampul</h2>
          <p className="admin-muted">
            Opsional. Jika kosong, foto galeri pertama akan dipakai sebagai
            sampul. Foto galeri tambahan dikelola melalui Data Foto.
          </p>
          <ImageDropzone
            label="Foto sampul sekolah"
            value={values.coverImage}
            onChange={(value) => update("coverImage", value)}
          />
        </section>

        <div className="form-actions">
          <Link to="/admin/sekolah" className="btn btn-secondary">
            Batal
          </Link>
          <button type="submit" className="btn btn-primary">
            <CheckIcon />
            Simpan
          </button>
        </div>
      </form>
    </>
  );
}
