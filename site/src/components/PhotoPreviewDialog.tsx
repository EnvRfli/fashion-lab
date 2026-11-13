import { useEffect, useRef, useState } from "react";
import type { GalleryPhoto } from "../data/types";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CloseIcon,
  ExternalLinkIcon,
} from "./Icons";

export function PhotoPreviewDialog({
  photos,
  startIndex,
  clientName,
  onClose,
}: {
  photos: GalleryPhoto[];
  startIndex: number;
  clientName: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [index, setIndex] = useState(startIndex);

  const photo = photos[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    closeRef.current?.focus();
    // No close() in cleanup: removing the dialog on unmount is enough. Calling
    // close() here fires a late close event during React StrictMode's effect
    // replay, which would immediately dismiss the freshly opened preview.
  }, []);

  if (!photo) return null;

  const go = (direction: 1 | -1) => {
    const next = (index + direction + photos.length) % photos.length;
    setIndex(next);
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
          <p className="preview-school">{clientName}</p>
          <h2 id="preview-title">{photo.title}</h2>
          <p className="preview-category">{photo.category}</p>

          <p className="preview-credit">
            Foto oleh {photo.creator}. Lisensi{" "}
            {photo.licenseUrl ? (
              <a href={photo.licenseUrl} target="_blank" rel="noreferrer">
                {photo.license}
                <ExternalLinkIcon />
              </a>
            ) : (
              photo.license
            )}
            .
            {photo.sourceUrl ? (
              <>
                {" "}
                Sumber:{" "}
                <a href={photo.sourceUrl} target="_blank" rel="noreferrer">
                  tautan foto
                  <ExternalLinkIcon />
                </a>
                .
              </>
            ) : null}
          </p>

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
