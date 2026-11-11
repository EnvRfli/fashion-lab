export const IMAGE_ACCEPT = "image/jpeg,image/png,image/webp";
export const IMAGE_MAX_BYTES = 2.5 * 1024 * 1024;
const COMPRESSED_MAX_BYTES = 900 * 1024;
const MAX_DIMENSION = 1400;

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function validateImageFile(file: File): string | null {
  const accepted = ["image/jpeg", "image/png", "image/webp"];
  const extension = file.name.split(".").pop()?.toLowerCase();
  const extensionAccepted = ["jpg", "jpeg", "png", "webp"].includes(
    extension ?? "",
  );
  if (!accepted.includes(file.type) && !extensionAccepted) {
    return "Pilih file JPG, PNG, atau WebP.";
  }
  if (file.size === 0) return "File gambar kosong.";
  if (file.size > IMAGE_MAX_BYTES) {
    return `Ukuran file maksimal ${formatBytes(IMAGE_MAX_BYTES)}.`;
  }
  return null;
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("File tidak dapat dibaca."));
    reader.readAsDataURL(file);
  });
}

function loadImage(source: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Gambar tidak dapat dibuka."));
    image.src = source;
  });
}

/**
 * Compress a real user photograph to a storage-friendly data URL. This never
 * draws or generates product imagery; it only resizes the uploaded photograph.
 */
export async function prepareImageFile(file: File): Promise<string> {
  const error = validateImageFile(file);
  if (error) throw new Error(error);

  const dataUrl = await readAsDataUrl(file);
  if (typeof document === "undefined") return dataUrl;

  const image = await loadImage(dataUrl);
  const scale = Math.min(
    1,
    MAX_DIMENSION / Math.max(image.width, image.height),
  );
  const targetWidth = Math.max(1, Math.round(image.width * scale));
  const targetHeight = Math.max(1, Math.round(image.height * scale));

  if (
    scale === 1 &&
    file.size <= COMPRESSED_MAX_BYTES &&
    file.type !== "image/png"
  ) {
    return dataUrl;
  }

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const context = canvas.getContext("2d");
  if (!context) return dataUrl;
  context.drawImage(image, 0, 0, targetWidth, targetHeight);
  return canvas.toDataURL("image/jpeg", 0.82);
}
