import { describe, expect, it } from "vitest";
import type { GalleryPhoto } from "../data/types";
import {
  archiveFileName,
  photoFileName,
} from "./downloads";
import {
  formatBytes,
  validateImageFile,
} from "./image-file";

const basePhoto: GalleryPhoto = {
  id: "photo-test",
  schoolId: "school-test",
  imagePath: "/images/product-poplin-shirt.jpg",
  title: "Kemeja Putih",
  alt: "Kemeja putih.",
  category: "Atasan",
  sourceUrl: "https://www.pexels.com/photo/28576622/",
  creator: "Jonathan Borba",
  license: "Pexels License",
  licenseUrl: "https://www.pexels.com/license/",
  demonstration: true,
  createdAt: "2026-11-11T00:00:00.000Z",
};

describe("download file names", () => {
  it("uses a numbered, safe file name", () => {
    expect(photoFileName(basePhoto, 0)).toBe("01-kemeja-putih.jpg");
  });

  it("detects data URL image extensions", () => {
    expect(
      photoFileName(
        { ...basePhoto, imagePath: "data:image/png;base64,abc" },
        2,
      ),
    ).toBe("03-kemeja-putih.png");
  });

  it("creates an archive name from the school", () => {
    expect(archiveFileName("SDN 001 Bandung")).toBe("seragam-sdn-001-bandung.zip");
  });
});

describe("image upload validation", () => {
  it("accepts a JPEG under the size limit", () => {
    const file = new File(["photo"], "uniform.jpg", { type: "image/jpeg" });
    expect(validateImageFile(file)).toBeNull();
  });

  it("rejects non-image files", () => {
    const file = new File(["text"], "notes.txt", { type: "text/plain" });
    expect(validateImageFile(file)).toContain("JPG");
  });

  it("rejects empty files", () => {
    const file = new File([], "empty.jpg", { type: "image/jpeg" });
    expect(validateImageFile(file)).toContain("kosong");
  });

  it("formats bytes for helper text", () => {
    expect(formatBytes(500)).toBe("500 B");
    expect(formatBytes(2048)).toBe("2 KB");
  });
});
