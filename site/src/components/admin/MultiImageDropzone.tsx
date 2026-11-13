import { useId, useRef, useState, type DragEvent } from "react";
import {
  formatBytes,
  IMAGE_ACCEPT,
  IMAGE_MAX_BYTES,
  prepareImageFile,
  validateImageFile,
} from "../../lib/image-file";
import { CloseIcon, ImageIcon, SpinnerIcon, UploadIcon } from "../Icons";

export function MultiImageDropzone({
  label,
  values,
  onChange,
  onBusyChange,
  error,
  hint,
  required = false,
  maxFiles = 20,
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  onBusyChange?: (busy: boolean) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  maxFiles?: number;
}) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileErrors, setFileErrors] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const message = error || (fileErrors.length > 0 ? fileErrors.join(" ") : "");
  const atLimit = values.length >= maxFiles;

  const setBusyState = (next: boolean) => {
    setBusy(next);
    onBusyChange?.(next);
  };

  const processFiles = async (files: File[]) => {
    if (files.length === 0) return;
    const room = Math.max(0, maxFiles - values.length);
    const selected = files.slice(0, room);
    const errors: string[] = [];
    if (files.length > room) {
      errors.push(`Maksimal ${maxFiles} foto per portofolio.`);
    }

    const valid: File[] = [];
    for (const file of selected) {
      const validation = validateImageFile(file);
      if (validation) {
        errors.push(`${file.name}: ${validation}`);
      } else {
        valid.push(file);
      }
    }

    if (valid.length === 0) {
      setFileErrors(errors);
      return;
    }

    setBusyState(true);
    setFileErrors(errors);
    setProgress({ done: 0, total: valid.length });
    const prepared: string[] = [];

    for (const [index, file] of valid.entries()) {
      try {
        prepared.push(await prepareImageFile(file));
      } catch (caught) {
        errors.push(
          `${file.name}: ${
            caught instanceof Error ? caught.message : "Gambar tidak dapat dibaca."
          }`,
        );
      }
      setProgress({ done: index + 1, total: valid.length });
    }

    if (prepared.length > 0) onChange([...values, ...prepared]);
    setFileErrors(errors);
    setProgress({ done: 0, total: 0 });
    setBusyState(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    void processFiles(Array.from(event.dataTransfer.files ?? []));
  };

  return (
    <div className="form-field">
      <label htmlFor={id} className="field-label">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>

      <div
        className={`image-dropzone ${dragActive ? "is-dragging" : ""} ${
          message ? "has-error" : ""
        }`}
        onDragOver={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <span className="dropzone-icon" aria-hidden="true">
          {busy ? <SpinnerIcon /> : <UploadIcon />}
        </span>
        <p>
          {busy
            ? `Memproses ${progress.done}/${progress.total} foto...`
            : "Pilih atau seret beberapa foto ke area ini"}
        </p>
        <p className="dropzone-hint" id={hintId}>
          JPG, PNG, atau WebP · maksimal {formatBytes(IMAGE_MAX_BYTES)} per foto ·
          hingga {maxFiles} foto
          {hint ? ` · ${hint}` : ""}
        </p>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => inputRef.current?.click()}
          disabled={busy || atLimit}
          aria-describedby={message ? errorId : hintId}
        >
          <ImageIcon />
          {atLimit ? "Batas foto tercapai" : "Pilih beberapa foto"}
        </button>
      </div>

      <input
        ref={inputRef}
        id={id}
        type="file"
        className="sr-only"
        accept={IMAGE_ACCEPT}
        multiple
        aria-label={label}
        aria-describedby={message ? errorId : hintId}
        onChange={(event) => {
          void processFiles(Array.from(event.target.files ?? []));
          event.target.value = "";
        }}
      />

      {values.length > 0 ? (
        <ul className="multi-image-grid" aria-label="Foto baru yang dipilih">
          {values.map((value, index) => (
            <li key={`${value.slice(0, 42)}-${index}`}>
              <img src={value} alt={`Pratinjau foto pilihan ${index + 1}`} />
              <button
                type="button"
                className="image-preview-remove"
                onClick={() =>
                  onChange(values.filter((_, itemIndex) => itemIndex !== index))
                }
                aria-label={`Hapus foto pilihan ${index + 1}`}
                disabled={busy}
              >
                <CloseIcon />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {message ? (
        <p className="field-error" id={errorId} role="alert">
          {message}
        </p>
      ) : null}
    </div>
  );
}
