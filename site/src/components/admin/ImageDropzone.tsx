import { useId, useRef, useState, type DragEvent } from "react";
import {
  formatBytes,
  IMAGE_ACCEPT,
  IMAGE_MAX_BYTES,
  prepareImageFile,
  validateImageFile,
} from "../../lib/image-file";
import { CloseIcon, ImageIcon, SpinnerIcon, UploadIcon } from "../Icons";

export function ImageDropzone({
  label,
  value,
  onChange,
  error,
  hint,
  required = false,
}: {
  label: string;
  value?: string;
  onChange: (value: string | undefined) => void;
  error?: string;
  hint?: string;
  required?: boolean;
}) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileError, setFileError] = useState("");
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const message = error || fileError;

  const processFile = async (file: File | undefined) => {
    if (!file) return;
    const validation = validateImageFile(file);
    if (validation) {
      setFileError(validation);
      return;
    }
    setBusy(true);
    setFileError("");
    try {
      const dataUrl = await prepareImageFile(file);
      onChange(dataUrl);
    } catch (caught) {
      setFileError(
        caught instanceof Error ? caught.message : "Gambar tidak dapat dibaca.",
      );
    } finally {
      setBusy(false);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    void processFile(event.dataTransfer.files?.[0]);
  };

  return (
    <div className="form-field">
      <label htmlFor={id} className="field-label">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>

      {value ? (
        <div className="image-preview">
          <img src={value} alt="Pratinjau foto yang dipilih" />
          <button
            type="button"
            className="image-preview-remove"
            onClick={() => onChange(undefined)}
            aria-label="Hapus foto yang dipilih"
          >
            <CloseIcon />
          </button>
        </div>
      ) : (
        <div
          className={`image-dropzone ${dragging ? "is-dragging" : ""} ${
            message ? "has-error" : ""
          }`}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <span className="dropzone-icon" aria-hidden="true">
            {busy ? <SpinnerIcon /> : <UploadIcon />}
          </span>
          <p>
            {busy ? "Memproses foto..." : "Pilih atau seret foto ke area ini"}
          </p>
          <p className="dropzone-hint" id={hintId}>
            JPG, PNG, atau WebP · maksimal {formatBytes(IMAGE_MAX_BYTES)}
            {hint ? ` · ${hint}` : ""}
          </p>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            aria-describedby={message ? errorId : hintId}
          >
            <ImageIcon />
            Pilih foto
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        id={id}
        type="file"
        className="sr-only"
        accept={IMAGE_ACCEPT}
        aria-label={label}
        aria-describedby={message ? errorId : hintId}
        onChange={(event) => {
          const file = event.target.files?.[0];
          void processFile(file);
          event.target.value = "";
        }}
      />

      {value ? (
        <div className="image-preview-actions">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
          >
            {busy ? <SpinnerIcon /> : <UploadIcon />}
            Ganti foto
          </button>
        </div>
      ) : null}

      {message ? (
        <p className="field-error" id={errorId} role="alert">
          {message}
        </p>
      ) : null}
    </div>
  );
}
