import { useRef, useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AdminPageHeader } from "../../components/admin/AdminPageHeader";
import { ImageDropzone } from "../../components/admin/ImageDropzone";
import {
  ArrowLeftIcon,
  CheckIcon,
  InfoIcon,
} from "../../components/Icons";
import { DEMO_ASSET_LIST } from "../../data/assets";
import { useDemoData } from "../../data/useDemoData";
import { usePageTitle } from "../../lib/use-page-title";

const CATEGORY_OPTIONS = [
  "Atasan",
  "Bawahan",
  "Pelengkap",
  "Setelan",
  "Referensi",
];

const UPLOAD_CREDIT = {
  sourceUrl: "",
  creator: "Pengguna demo",
  license: "Unggahan lokal (demo)",
  licenseUrl: "",
};

type Errors = Record<string, string>;

export function AdminPhotoFormPage() {
  usePageTitle("Tambah Foto");
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { schools, addPhoto } = useDemoData();

  const firstSchool = schools[0]?.id ?? "";
  const [schoolId, setSchoolId] = useState(
    params.get("sekolah") ?? firstSchool,
  );
  const [mode, setMode] = useState<"upload" | "library">("upload");
  const [imagePath, setImagePath] = useState<string | undefined>();
  const [selectedAsset, setSelectedAsset] = useState<string | undefined>();
  const [title, setTitle] = useState("");
  const [alt, setAlt] = useState("");
  const [category, setCategory] = useState("Referensi");
  const [credit, setCredit] = useState(UPLOAD_CREDIT);
  const [errors, setErrors] = useState<Errors>({});
  const titleRef = useRef<HTMLInputElement>(null);

  if (schools.length === 0) {
    return (
      <section className="admin-panel">
        <h1>Belum ada sekolah</h1>
        <p className="admin-muted">
          Tambahkan sekolah terlebih dahulu sebelum menambahkan foto.
        </p>
        <Link to="/admin/sekolah/baru" className="btn btn-primary">
          Tambah Sekolah
        </Link>
      </section>
    );
  }

  const clearImage = () => {
    setImagePath(undefined);
    setSelectedAsset(undefined);
  };

  const switchMode = (next: "upload" | "library") => {
    setMode(next);
    clearImage();
    setErrors((current) => ({ ...current, image: "" }));
    if (next === "upload") {
      setCredit(UPLOAD_CREDIT);
    }
  };

  const handleUpload = (value: string | undefined) => {
    setImagePath(value);
    setSelectedAsset(undefined);
    if (value) {
      setCredit(UPLOAD_CREDIT);
      setErrors((current) => ({ ...current, image: "" }));
    }
  };

  const chooseAsset = (key: string) => {
    const asset = DEMO_ASSET_LIST.find((item) => item.key === key);
    if (!asset) return;
    setSelectedAsset(key);
    setImagePath(asset.path);
    setTitle(asset.title);
    setAlt(asset.alt);
    setCategory(
      CATEGORY_OPTIONS.includes(asset.category) ? asset.category : "Referensi",
    );
    setCredit({
      sourceUrl: asset.sourceUrl,
      creator: asset.creator,
      license: asset.license,
      licenseUrl: asset.licenseUrl,
    });
    setErrors({});
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!schoolId) next.school = "Pilih sekolah.";
    if (title.trim().length < 3) next.title = "Judul foto minimal 3 karakter.";
    if (alt.trim().length < 10) {
      next.alt = "Teks alt minimal 10 karakter agar foto dapat dipahami.";
    }
    if (!imagePath) next.image = "Pilih atau unggah foto.";
    if (!credit.creator.trim()) next.credit = "Nama pembuat foto wajib diisi.";
    if (!credit.license.trim()) next.credit = "Lisensi foto wajib diisi.";
    return next;
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.values(nextErrors).some(Boolean)) {
      setErrors(nextErrors);
      if (nextErrors.title) titleRef.current?.focus();
      return;
    }
    addPhoto({
      schoolId,
      imagePath: imagePath!,
      title,
      alt,
      category,
      sourceUrl: credit.sourceUrl,
      creator: credit.creator,
      license: credit.license,
      licenseUrl: credit.licenseUrl,
    });
    navigate("/admin/foto", {
      state: { notice: `Foto "${title.trim()}" berhasil ditambahkan.` },
    });
  };

  return (
    <>
      <Link to="/admin/foto" className="back-link admin-back-link">
        <ArrowLeftIcon />
        Data Foto
      </Link>

      <AdminPageHeader
        eyebrow="Data Foto"
        title="Tambah Foto"
        description="Pilih sekolah, tentukan sumber foto, lalu simpan ke galeri demo."
      />

      <form className="admin-form" onSubmit={submit} noValidate>
        <section className="admin-panel form-panel">
          <h2>Sumber foto</h2>
          <div className="segmented" role="group" aria-label="Sumber foto">
            <button
              type="button"
              className={`segmented-button ${mode === "upload" ? "is-active" : ""}`}
              onClick={() => switchMode("upload")}
              aria-pressed={mode === "upload"}
            >
              Unggah foto
            </button>
            <button
              type="button"
              className={`segmented-button ${mode === "library" ? "is-active" : ""}`}
              onClick={() => switchMode("library")}
              aria-pressed={mode === "library"}
            >
              Pustaka demo
            </button>
          </div>

          {mode === "upload" ? (
            <>
              <ImageDropzone
                label="Foto galeri"
                value={imagePath}
                onChange={handleUpload}
                error={errors.image}
                required
                hint="Foto disimpan di localStorage setelah dikompresi"
              />
              <p className="field-hint">
                Unggahan Anda tetap berupa foto asli; aplikasi hanya
                mengecilkan ukuran file agar muat disimpan di browser.
              </p>
            </>
          ) : (
            <div className="asset-picker">
              <p className="field-hint">
                Delapan foto demonstrasi berlisensi Pexels. Pilih satu untuk
                dipakai pada galeri sekolah.
              </p>
              <div className="asset-grid">
                {DEMO_ASSET_LIST.map((asset) => (
                  <button
                    key={asset.key}
                    type="button"
                    className={`asset-picker-item ${
                      selectedAsset === asset.key ? "is-selected" : ""
                    }`}
                    onClick={() => chooseAsset(asset.key)}
                    aria-pressed={selectedAsset === asset.key}
                  >
                    <img src={asset.path} alt={asset.alt} loading="lazy" />
                    <span>{asset.title}</span>
                    <small>{asset.creator}</small>
                  </button>
                ))}
              </div>
            </div>
          )}

          {imagePath ? (
            <div className="selected-image">
              <img src={imagePath} alt="Pratinjau foto terpilih" />
              <div>
                <strong>Pratinjau foto</strong>
                <p>
                  {selectedAsset
                    ? "Dipilih dari pustaka demo."
                    : "Diunggah dari perangkat ini."}
                </p>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={clearImage}
                >
                  Hapus pilihan
                </button>
              </div>
            </div>
          ) : null}
        </section>

        <section className="admin-panel form-panel">
          <h2>Detail foto</h2>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="photo-school" className="field-label">
                Sekolah <span aria-hidden="true">*</span>
              </label>
              <select
                id="photo-school"
                value={schoolId}
                onChange={(event) => setSchoolId(event.target.value)}
                aria-invalid={errors.school ? true : undefined}
              >
                {schools.map((school) => (
                  <option key={school.id} value={school.id}>
                    {school.name} ({school.level})
                  </option>
                ))}
              </select>
              {errors.school ? (
                <p className="field-error" role="alert">
                  {errors.school}
                </p>
              ) : null}
            </div>

            <div className="form-field">
              <label htmlFor="photo-category" className="field-label">
                Jenis foto
              </label>
              <select
                id="photo-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {CATEGORY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="photo-title" className="field-label">
              Judul foto <span aria-hidden="true">*</span>
            </label>
            <input
              ref={titleRef}
              id="photo-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Contoh: Kemeja putih"
              aria-invalid={errors.title ? true : undefined}
              maxLength={80}
            />
            {errors.title ? (
              <p className="field-error" role="alert">
                {errors.title}
              </p>
            ) : null}
          </div>

          <div className="form-field">
            <label htmlFor="photo-alt" className="field-label">
              Teks alt <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="photo-alt"
              rows={3}
              value={alt}
              onChange={(event) => setAlt(event.target.value)}
              placeholder="Jelaskan isi foto untuk pembaca layar."
              aria-invalid={errors.alt ? true : undefined}
              maxLength={240}
            />
            {errors.alt ? (
              <p className="field-error" role="alert">
                {errors.alt}
              </p>
            ) : (
              <p className="field-hint">
                Jelaskan apa yang terlihat, bukan sekadar "foto seragam".
              </p>
            )}
          </div>
        </section>

        <section className="admin-panel form-panel">
          <h2>Kredit dan lisensi</h2>
          <div className="admin-note compact">
            <InfoIcon />
            <p>
              Setiap foto wajib menyebutkan sumber. Untuk unggahan lokal,
              kredit diisi sebagai "Pengguna demo" dan lisensi "Unggahan lokal
              (demo)".
            </p>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="photo-creator" className="field-label">
                Pembuat / pemilik foto
              </label>
              <input
                id="photo-creator"
                type="text"
                value={credit.creator}
                onChange={(event) =>
                  setCredit((current) => ({
                    ...current,
                    creator: event.target.value,
                  }))
                }
                aria-invalid={errors.credit ? true : undefined}
              />
            </div>
            <div className="form-field">
              <label htmlFor="photo-license" className="field-label">
                Lisensi
              </label>
              <input
                id="photo-license"
                type="text"
                value={credit.license}
                onChange={(event) =>
                  setCredit((current) => ({
                    ...current,
                    license: event.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="photo-source" className="field-label">
              URL sumber (opsional)
            </label>
            <input
              id="photo-source"
              type="url"
              value={credit.sourceUrl}
              onChange={(event) =>
                setCredit((current) => ({
                  ...current,
                  sourceUrl: event.target.value,
                }))
              }
              placeholder="https://..."
            />
          </div>

          {errors.credit ? (
            <p className="field-error" role="alert">
              {errors.credit}
            </p>
          ) : null}
        </section>

        <div className="form-actions">
          <Link to="/admin/foto" className="btn btn-secondary">
            Batal
          </Link>
          <button type="submit" className="btn btn-primary">
            <CheckIcon />
            Simpan Foto
          </button>
        </div>
      </form>
    </>
  );
}
