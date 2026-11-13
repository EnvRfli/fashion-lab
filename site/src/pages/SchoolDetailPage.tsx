import { useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EmptyState } from "../components/EmptyState";
import {
  ArrowLeftIcon,
  ExternalLinkIcon,
  ImageIcon,
  ShareIcon,
} from "../components/Icons";
import { LevelBadge } from "../components/LevelBadge";
import { PhotoGrid } from "../components/PhotoGrid";
import { PhotoPreviewDialog } from "../components/PhotoPreviewDialog";
import { SchoolCard } from "../components/SchoolCard";
import { getEducationLevel } from "../data/education-levels";
import { useDemoData } from "../data/useDemoData";
import {
  formatDate,
  formatPhotoCount,
  photosForSchool,
  schoolImage,
} from "../lib/schools";
import { usePageTitle } from "../lib/use-page-title";

type TabId = "galeri" | "informasi";

const TABS: { id: TabId; label: string }[] = [
  { id: "galeri", label: "Galeri" },
  { id: "informasi", label: "Informasi" },
];

export function SchoolDetailPage() {
  const { slug } = useParams();
  const { schools, photos } = useDemoData();
  const school = schools.find((item) => item.slug === slug);
  usePageTitle(school?.name ?? "Portofolio tidak ditemukan");

  const [tab, setTab] = useState<TabId>("galeri");
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
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
              (item) =>
                item.id !== school.id &&
                (school.level ? item.level === school.level : true),
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
            title="Portofolio tidak ditemukan"
            description="Tautan mungkin sudah berubah atau portofolio telah dihapus. Kembali ke daftar klien untuk melanjutkan."
            action={
              <Link to="/sekolah" className="btn btn-primary">
                Kembali ke daftar klien
              </Link>
            }
          />
        </div>
      </section>
    );
  }

  const level = school.level ? getEducationLevel(school.level) : undefined;
  const image = schoolImage(school, photos);
  const cover = schoolPhotos.find((photo) => photo.imagePath === image);

  const handleShare = async () => {
    setShareMessage("");
    const shareData = {
      title: `${school.name} — Galeri Seragam`,
      text: `Lihat portofolio hasil pekerjaan ${school.name}.`,
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
              Portofolio Klien
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
                  alt={cover?.alt ?? `Foto hasil pekerjaan ${school.name}`}
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
                {school.level ? <LevelBadge level={school.level} /> : null}
                <span className="muted-badge">
                  {level?.name ?? "Tanpa kategori"}
                </span>
              </div>
              <h1>{school.name}</h1>
              {school.location ? (
                <p className="school-location">{school.location}</p>
              ) : null}
              {school.description ? (
                <p className="school-summary">{school.description}</p>
              ) : null}
              <p className="school-count">
                <ImageIcon />
                {formatPhotoCount(schoolPhotos.length)} hasil pekerjaan
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section school-detail-body">
        <div className="shell">
          <div className="tabs" role="tablist" aria-label="Konten portofolio">
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
                  <p>Klik foto untuk melihat pratinjau dan kreditnya.</p>
                </div>
              </div>

              {schoolPhotos.length === 0 ? (
                <div className="inline-notice">
                  <ImageIcon />
                  <div>
                    <strong>Belum ada foto tersedia</strong>
                    <p>
                      Tambahkan foto melalui panel admin agar portofolio ini
                      dapat ditampilkan.
                    </p>
                  </div>
                </div>
              ) : null}

              <PhotoGrid
                photos={schoolPhotos}
                onSelect={setPreviewIndex}
                label={`Galeri foto ${school.name}`}
              />

              <div className="gallery-footnote">
                <p className="field-hint">
                  Kredit pembuat foto tercantum pada pratinjau galeri.
                </p>
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
                  <h2>Informasi Klien</h2>
                  <dl className="info-list">
                    <div>
                      <dt>Nama klien</dt>
                      <dd>{school.name}</dd>
                    </div>
                    <div>
                      <dt>Kategori</dt>
                      <dd>{level?.name ?? "Tanpa kategori"}</dd>
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
                  <h2>Tentang pekerjaan ini</h2>
                  <p>
                    {school.description ||
                      "Belum ada keterangan tambahan untuk portofolio ini."}
                  </p>
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
                <h2>
                  {school.level
                    ? `Klien lain di kategori ${school.level}`
                    : "Portofolio klien lain"}
                </h2>
                <p>
                  {school.level
                    ? "Lanjutkan menjelajahi pekerjaan dengan kategori yang sama."
                    : "Lihat portofolio klien lainnya."}
                </p>
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
          clientName={school.name}
          onClose={() => setPreviewIndex(null)}
        />
      ) : null}
    </>
  );
}
