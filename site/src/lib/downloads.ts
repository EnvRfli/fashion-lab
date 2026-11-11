import { zipSync } from "fflate";
import type { GalleryPhoto } from "../data/types";
import { slugify } from "./schools";

function extensionFor(path: string): string {
  if (path.startsWith("data:")) {
    const match = path.match(/^data:image\/([a-zA-Z0-9+.-]+);/);
    const subtype = match?.[1]?.toLowerCase();
    if (subtype === "jpeg" || subtype === "jpg") return "jpg";
    if (subtype === "png") return "png";
    if (subtype === "webp") return "webp";
    return "jpg";
  }
  const clean = path.split("?")[0];
  const match = clean.match(/\.([a-zA-Z0-9]+)$/);
  return match?.[1]?.toLowerCase() || "jpg";
}

export function photoFileName(photo: GalleryPhoto, index: number): string {
  const base = slugify(photo.title) || "foto-sekolah";
  const padded = String(index + 1).padStart(2, "0");
  return `${padded}-${base}.${extensionFor(photo.imagePath)}`;
}

export function archiveFileName(schoolName: string): string {
  return `seragam-${slugify(schoolName) || "sekolah"}.zip`;
}

async function fetchBytes(path: string): Promise<Uint8Array> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Foto tidak dapat diambil (${response.status}).`);
  }
  return new Uint8Array(await response.arrayBuffer());
}

function toBlobPart(bytes: Uint8Array): ArrayBuffer {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  return copy.buffer;
}

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function downloadPhoto(photo: GalleryPhoto): Promise<void> {
  const bytes = await fetchBytes(photo.imagePath);
  const extension = extensionFor(photo.imagePath);
  const type =
    extension === "png"
      ? "image/png"
      : extension === "webp"
        ? "image/webp"
        : "image/jpeg";
  triggerDownload(
    new Blob([toBlobPart(bytes)], { type }),
    photoFileName(photo, 0).replace(/^01-/, ""),
  );
}

export async function downloadPhotosAsArchive(
  photos: GalleryPhoto[],
  schoolName: string,
): Promise<number> {
  if (photos.length === 0) {
    throw new Error("Tidak ada foto yang dapat diunduh.");
  }

  const results = await Promise.allSettled(
    photos.map((photo) => fetchBytes(photo.imagePath)),
  );
  const failed = results.filter((result) => result.status === "rejected");
  if (failed.length > 0) {
    throw new Error(
      `${failed.length} dari ${photos.length} foto tidak dapat diambil. Arsip tidak dibuat agar tidak menyesatkan.`,
    );
  }

  const entries: Record<string, Uint8Array> = {};
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      entries[photoFileName(photos[index], index)] = result.value;
    }
  });

  const zipped = zipSync(entries, { level: 0 });
  triggerDownload(
    new Blob([toBlobPart(zipped)], { type: "application/zip" }),
    archiveFileName(schoolName),
  );
  return photos.length;
}
