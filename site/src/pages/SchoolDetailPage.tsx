import { useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DemoNote } from "../components/DemoNote";
import { EmptyState } from "../components/EmptyState";
import {
  ArrowLeftIcon,
  CheckIcon,
  DownloadIcon,
  ExternalLinkIcon,
  ImageIcon,
  ShareIcon,
  SpinnerIcon,
} from "../components/Icons";
import { LevelBadge } from "../components/LevelBadge";
import { PhotoGrid } from "../components/PhotoGrid";
import { PhotoPreviewDialog } from "../components/PhotoPreviewDialog";
import { SchoolCard } from "../components/SchoolCard";
import { getEducationLevel } from "../data/education-levels";
import { useDemoData } from "../data/useDemoData";
import { downloadPhotosAsArchive } from "../lib/downloads";
import {
  formatDate,
  formatPhotoCount,
  photosForSchool,
  schoolImage,
} from "../lib/schools";
import { usePageTitle } from "../lib/use-page-title";

type TabId = "galeri" | "informasi";
type DownloadState = "idle" | "busy" | "success" | "error";

const TABS: { id: TabId; label: string }[] = [
  { id: "galeri", label: "Galeri" },
  { id: "informasi", label: "Informasi" },
];

export function SchoolDetailPage() {
  const { slug } = useParams();
  const { schools, photos } = useDemoData();
  const school = schools.find((item) => item.slug === slug);
  usePageTitle(school?.name ?? "Sekolah tidak ditemukan");

  const [tab, setTab] = useState<TabId>("galeri");
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [downloadState, setDownloadState] =
    useState<DownloadState>("idle");
  const [downloadMessage, setDownloadMessage] = useState("");
  const [shareMessage, setShareMessage] = useState("");
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({
    galeri: null,
    informasi: null,
  });

  const schoolPhotos = useMemo(
    () => (school ? photosForSchool(photos, school.id) : []),
    [photos, school],
  );
  const related = useMemo(
    () =>
      school
        ? schools
            .filter(
              (item) => item.id !== school.id && item.level === school.level,
            )
            .slice(0, 3)
        : [],
    [schools, school],
  );

  if (!school) {
    return (
      <section className="section">
        <div className="shell">
          <EmptyState
            title="Sekolah tidak ditemukan"
            description="Tautan mungkin sudah berubah atau data demo telah direset. Kembali ke daftar sekolah untuk melanjutkan."
            action={
              <Link to="/sekolah" className="btn btn-primary">
                Kembali ke daftar sekolah
              </Link>
            }
          />
        </div>
      </section>
    );
  }

  const level = getEducationLevel(school.level);
  const image = schoolImage(school, photos);
  const cover = schoolPhotos.find(
    (photo) => photo.imagePath === image,
  );

  const handleBulkDownload = async () => {
    setDownloadState("busy");
    setDownloadMessage("");
    try {
      const count = await downloadPhotosAsArchive(schoolPhotos, school.name);
      setDownloadState("success");
      setDownloadMessage(`Arsip ${count} foto berhasil dibuat.`);
    } catch (error) {
      setDownloadState("error");
      setDownloadMessage(
        error instanceof Error
          ? error.message
          : "Arsip gagal dibuat. Coba lagi.",
      );
    }
  };

  const handleShare = async () => {
    setShareMessage("");
    const shareData = {
      title: `${school.name} — Galeri Seragam`,
      text: `Lihat galeri referensi seragam ${school.name}.`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareMessage("Tautan dibagikan.");
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setShareMessage("Tautan disalin.");
      } else {
        setShareMessage("Salin tautan dari bilah alamat browser.");
      }
    } catch {
      setShareMessage("Berbagi dibatalkan atau tidak tersedia.");
    }
  };

  const focusTab = (current: TabId, direction: 1 | -1) => {
    const index = TABS.findIndex((item) => item.id === current);
    const next = TABS[(index + direction + TABS.length) % TABS.length];
    setTab(next.id);
    tabRefs.current[next.id]?.focus();
  };

  return (
    <>
      <section className="school-detail-header">
        <div className="shell">
          <div className="detail-topbar">
            <Link to="/sekolah" className="back-link">
              <ArrowLeftIcon />
              Daftar Sekolah
            </Link>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleShare}
            >
              <ShareIcon />
              Bagikan
            </button>
          </div>
          {shareMessage ? (
            <p className="inline-status" role="status">
              {shareMessage}
            </p>
          ) : null}

          <div className="school-identity">
            <div className="school-identity-media">
              {image ? (
                <img
                  src={image}
                  alt={cover?.alt ?? `Foto referensi ${school.name}`}
                />
              ) : (
                <div className="media-missing">
                  <ImageIcon />
                  <span>Belum ada foto</span>
                </div>
              )}
            </div>
            <div className="school-identity-copy">
              <div className="school-identity-badges">
                <LevelBadge level={school.level} />
                <span className="muted-badge">{level.name}</span>
                <span className="demo-badge">Data demo</span>
              </div>
              <h1>{school.name}</h1>
              <p className="school-location">{school.location}</p>
              <p className="school-summary">{school.description}</p>
              <p className="school-count">
                <ImageIcon />
                {formatPhotoCount(schoolPhotos.length)} referensi tersedia
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section school-detail-body">
        <div className="shell">
          <div className="tabs" role="tablist" aria-label="Konten sekolah">
            {TABS.map((item) => (
              <button
                key={item.id}
                ref={(node) => {
                  tabRefs.current[item.id] = node;
                }}
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={tab === item.id}
                aria-controls={`panel-${item.id}`}
                tabIndex={tab === item.id ? 0 : -1}
                className={`tab ${tab === item.id ? "is-active" : ""}`}
                onClick={() => setTab(item.id)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowRight") {
                    event.preventDefault();
                    focusTab(item.id, 1);
                  }
                  if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    focusTab(item.id, -1);
                  }
                  if (event.key === "Home") {
                    event.preventDefault();
                    setTab("galeri");
                    tabRefs.current.galeri?.focus();
                  }
                  if (event.key === "End") {
                    event.preventDefault();
                    setTab("informasi");
                    tabRefs.current.informasi?.focus();
                  }
                }}
              >
                {item.label}
                {item.id === "galeri" ? (
                  <span className="tab-count">{schoolPhotos.length}</span>
                ) : null}
              </button>
            ))}
          </div>

          {tab === "galeri" ? (
            <div
              role="tabpanel"
              id="panel-galeri"
              aria-labelledby="tab-galeri"
              className="tab-panel"
            >
              <div className="gallery-toolbar">
                <div>
                  <h2>Galeri Foto</h2>
                  <p>
                    Klik foto untuk pratinjau, membaca kredit, atau mengunduh.
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleBulkDownload}
                  disabled={
                    schoolPhotos.length === 0 || downloadState === "busy"
                  }
                  title={
                    schoolPhotos.length === 0
                      ? "Belum ada foto yang dapat diunduh."
                      : undefined
                  }
                >
                  {downloadState === "busy" ? (
                    <SpinnerIcon />
                  ) : (
                    <DownloadIcon />
                  )}
                  {downloadState === "busy"
                    ? "Menyiapkan arsip..."
                    : `Download Semua (${schoolPhotos.length} Foto)`}
                </button>
              </div>

              {schoolPhotos.length === 0 ? (
                <div className="inline-notice">
                  <ImageIcon />
                  <div>
                    <strong>Belum ada foto tersedia</strong>
                    <p>
                      Tombol unduh dinonaktifkan sampai foto ditambahkan melalui
                      panel admin demo.
                    </p>
                  </div>
                </div>
              ) : null}

              {downloadMessage ? (
                <p
                  className={`inline-status ${
                    downloadState === "error" ? "is-error" : ""
                  }`}
                  role={downloadState === "error" ? "alert" : "status"}
                >
                  {downloadState === "success" ? <CheckIcon /> : null}
                  {downloadMessage}
                </p>
              ) : null}

              <PhotoGrid
                photos={schoolPhotos}
                onSelect={setPreviewIndex}
                label={`Galeri foto ${school.name}`}
              />

              <div className="gallery-footnote">
                <DemoNote>
                  Foto adalah stok demonstrasi berlisensi, bukan seragam resmi{" "}
                  {school.name}. Kredit pembuat tercantum pada pratinjau.
                </DemoNote>
              </div>
            </div>
          ) : (
            <div
              role="tabpanel"
              id="panel-informasi"
              aria-labelledby="tab-informasi"
              className="tab-panel"
            >
              <div className="info-grid">
                <div className="info-card">
                  <h2>Informasi Sekolah</h2>
                  <dl className="info-list">
                    <div>
                      <dt>Nama sekolah</dt>
                      <dd>{school.name}</dd>
                    </div>
                    <div>
                      <dt>Jenjang</dt>
                      <dd>{level.name}</dd>
                    </div>
                    <div>
                      <dt>Lokasi</dt>
                      <dd>{school.location || "Belum diisi"}</dd>
                    </div>
                    <div>
                      <dt>Jumlah foto</dt>
                      <dd>{formatPhotoCount(schoolPhotos.length)}</dd>
                    </div>
                    <div>
                      <dt>Terakhir diperbarui</dt>
                      <dd>{formatDate(school.updatedAt)}</dd>
                    </div>
                  </dl>
                </div>

                <div className="info-card">
                  <h2>Tentang data ini</h2>
                  <p>{school.description}</p>
                  <div className="info-callout">
                    <strong>Data demonstrasi</strong>
                    <p>
                      Profil sekolah, jumlah foto, dan seluruh isi galeri adalah
                      contoh untuk menunjukkan cara kerja aplikasi. Tidak ada
                      klaim afiliasi dengan sekolah sungguhan.
                    </p>
                  </div>
                  <h3>Sumber foto</h3>
                  <ul className="credit-list">
                    {Array.from(
                      new Map(
                        schoolPhotos.map((photo) => [
                          `${photo.creator}-${photo.sourceUrl}`,
                          photo,
                        ]),
                      ).values(),
                    ).map((photo) => (
                      <li key={`${photo.creator}-${photo.sourceUrl}`}>
                        {photo.title} — {photo.creator},{" "}
                        {photo.sourceUrl ? (
                          <a
                            href={photo.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {photo.license}
                            <ExternalLinkIcon />
                          </a>
                        ) : (
                          photo.license
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {related.length > 0 ? (
        <section className="section section-related">
          <div className="shell">
            <div className="section-heading">
              <div>
                <h2>Sekolah lain di jenjang {school.level}</h2>
                <p>Lanjutkan menjelajahi referensi dengan jenjang yang sama.</p>
              </div>
            </div>
            <div className="school-grid school-grid-three">
              {related.map((item) => (
                <SchoolCard key={item.id} school={item} photos={photos} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {previewIndex !== null ? (
        <PhotoPreviewDialog
          photos={schoolPhotos}
          startIndex={previewIndex}
          schoolName={school.name}
          onClose={() => setPreviewIndex(null)}
        />
      ) : null}
    </>
  );
}
