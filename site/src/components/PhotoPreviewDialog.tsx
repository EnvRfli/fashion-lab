import { useEffect, useRef, useState } from "react";
import type { GalleryPhoto } from "../data/types";
import { downloadPhoto } from "../lib/downloads";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CloseIcon,
  DownloadIcon,
  ExternalLinkIcon,
  SpinnerIcon,
} from "./Icons";

type DownloadState = "idle" | "busy" | "error";

export function PhotoPreviewDialog({
  photos,
  startIndex,
  schoolName,
  onClose,
}: {
  photos: GalleryPhoto[];
  startIndex: number;
  schoolName: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [index, setIndex] = useState(startIndex);
  const [download, setDownload] = useState<{
    index: number;
    state: DownloadState;
    message: string;
  }>({ index: startIndex, state: "idle", message: "" });

  const photo = photos[index];
  const downloadState = download.index === index ? download.state : "idle";
  const message = download.index === index ? download.message : "";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    closeRef.current?.focus();
    return () => {
      if (dialog?.open) dialog.close();
    };
  }, []);

  if (!photo) return null;

  const go = (direction: 1 | -1) => {
    const next = (index + direction + photos.length) % photos.length;
    setIndex(next);
    setDownload({ index: next, state: "idle", message: "" });
  };

  const handleDownload = async () => {
    setDownload({ index, state: "busy", message: "" });
    try {
      await downloadPhoto(photo);
      setDownload({ index, state: "idle", message: "Foto diunduh." });
    } catch (error) {
      setDownload({
        index,
        state: "error",
        message:
          error instanceof Error ? error.message : "Foto gagal diunduh.",
      });
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="preview-dialog"
      aria-labelledby="preview-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current.close();
      }}
      onKeyDown={(event) => {
        if (photos.length < 2) return;
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(-1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          go(1);
        }
      }}
    >
      <div className="preview-panel">
        <button
          ref={closeRef}
          type="button"
          className="icon-button preview-close"
          onClick={() => dialogRef.current?.close()}
          aria-label="Tutup pratinjau"
        >
          <CloseIcon />
        </button>

        <div className="preview-media">
          <img src={photo.imagePath} alt={photo.alt} />
        </div>

        <div className="preview-body">
          <p className="preview-school">{schoolName}</p>
          <h2 id="preview-title">{photo.title}</h2>
          <p className="preview-category">{photo.category}</p>

          <p className="preview-credit">
            Foto demonstrasi oleh {photo.creator}. Lisensi{" "}
            <a href={photo.licenseUrl} target="_blank" rel="noreferrer">
              {photo.license}
              <ExternalLinkIcon />
            </a>
            .
          </p>

          <div className="preview-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleDownload}
              disabled={downloadState === "busy"}
            >
              {downloadState === "busy" ? (
                <SpinnerIcon />
              ) : (
                <DownloadIcon />
              )}
              {downloadState === "busy" ? "Mengunduh..." : "Download Foto"}
            </button>
          </div>

          {message ? (
            <p
              className={`preview-message ${
                downloadState === "error" ? "is-error" : ""
              }`}
              role={downloadState === "error" ? "alert" : "status"}
            >
              {message}
            </p>
          ) : null}

          <div className="preview-nav">
            <button
              type="button"
              className="btn btn-secondary btn-icon"
              onClick={() => go(-1)}
              disabled={photos.length < 2}
              aria-label="Foto sebelumnya"
            >
              <ArrowLeftIcon />
            </button>
            <span aria-live="polite">
              {index + 1} / {photos.length}
            </span>
            <button
              type="button"
              className="btn btn-secondary btn-icon"
              onClick={() => go(1)}
              disabled={photos.length < 2}
              aria-label="Foto berikutnya"
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
