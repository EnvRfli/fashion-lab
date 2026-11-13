import { describe, expect, it } from "vitest";
import {
  addPhotoToData,
  addSchoolToData,
  addUserToData,
  deletePhotoFromData,
  deleteSchoolFromData,
  deleteUserFromData,
  isDemoData,
  loadDemoData,
  saveDemoData,
  savePortfolioToData,
  updateCategoryDescriptionInData,
  updateSchoolInData,
} from "./demo-store";
import { createSeedData, SEED_VERSION } from "./seed";

describe("data persistence and migration", () => {
  it("returns seed data when storage is empty", () => {
    const data = loadDemoData(localStorage);
    expect(data.schools).toHaveLength(12);
    expect(data.photos).toHaveLength(62);
    expect(data.users).toHaveLength(3);
    expect(data.version).toBe(SEED_VERSION);
  });

  it("round-trips data through storage", () => {
    const data = createSeedData();
    expect(saveDemoData(data, localStorage)).toBe(true);
    const loaded = loadDemoData(localStorage);
    expect(loaded.schools).toHaveLength(data.schools.length);
    expect(loaded.photos).toHaveLength(data.photos.length);
    expect(loaded.categoryDescriptions.SD).toContain("sekolah dasar");
  });

  it("migrates known seed descriptions without touching records or photos", () => {
    const seed = createSeedData();
    const legacy = {
      ...seed,
      version: 2,
      schools: seed.schools.map((school) =>
        school.id === "school-sdn-001-bandung"
          ? {
              ...school,
              description:
                "Contoh profil sekolah dasar untuk demonstrasi galeri. Halaman ini menunjukkan bagaimana identitas sekolah, jumlah foto, dan keterangan singkat ditampilkan.",
            }
          : school,
      ),
    };
    saveDemoData(legacy, localStorage);
    const loaded = loadDemoData(localStorage);
    const school = loaded.schools.find(
      (item) => item.id === "school-sdn-001-bandung",
    );
    expect(loaded.version).toBe(SEED_VERSION);
    expect(loaded.schools).toHaveLength(12);
    expect(loaded.photos).toHaveLength(62);
    expect(school?.slug).toBe("sdn-001-bandung");
    expect(school?.description).not.toMatch(/contoh|demo|demonstrasi/i);
  });

  it("does not overwrite an administrator-edited description", () => {
    const seed = createSeedData();
    const edited = {
      ...seed,
      version: 2,
      schools: seed.schools.map((school) =>
        school.id === "school-sdn-001-bandung"
          ? { ...school, description: "Keterangan yang diedit admin." }
          : school,
      ),
    };
    saveDemoData(edited, localStorage);
    const loaded = loadDemoData(localStorage);
    expect(
      loaded.schools.find((school) => school.id === "school-sdn-001-bandung")
        ?.description,
    ).toBe("Keterangan yang diedit admin.");
  });

  it("falls back to seed data for invalid JSON", () => {
    localStorage.setItem("galeri-seragam.demo.v2", "{not-json");
    const data = loadDemoData(localStorage);
    expect(data.version).toBe(SEED_VERSION);
    expect(data.schools.length).toBe(12);
  });

  it("rejects malformed data shapes", () => {
    expect(isDemoData({ version: 1, schools: [] })).toBe(false);
  });
});

describe("client mutations", () => {
  it("adds a client with a unique slug and optional category", () => {
    const data = createSeedData();
    const { data: next, school } = addSchoolToData(data, {
      name: "SDN 001 Bandung",
      location: "Bandung",
      description: "Portofolio baru",
    });
    expect(next.schools).toHaveLength(13);
    expect(school.slug).toBe("sdn-001-bandung-2");
    expect(school.level).toBeUndefined();
    expect(school.isDemo).toBe(true);
  });

  it("updates a client while preserving its public slug", () => {
    const data = createSeedData();
    const next = updateSchoolInData(data, "school-sdn-sukajadi", {
      name: "SDN Sukajadi Baru",
      level: "SD",
      location: "Bandung",
      description: "Diperbarui",
    });
    const school = next.schools.find(
      (item) => item.id === "school-sdn-sukajadi",
    );
    expect(school?.name).toBe("SDN Sukajadi Baru");
    expect(school?.slug).toBe("sdn-sukajadi");
    expect(school?.description).toBe("Diperbarui");
  });

  it("deletes one client and only its photos", () => {
    const data = createSeedData();
    const next = deleteSchoolFromData(data, "school-sdn-001-bandung");
    expect(next.schools).toHaveLength(11);
    expect(next.photos).toHaveLength(56);
    expect(
      next.photos.some((photo) => photo.schoolId === "school-sdn-001-bandung"),
    ).toBe(false);
    expect(
      next.photos.some((photo) => photo.schoolId === "school-sdn-sukajadi"),
    ).toBe(true);
  });
});

describe("portfolio save with multiple photos", () => {
  it("creates a client with multiple photos in one write and sets the first as cover", () => {
    const data = createSeedData();
    const result = savePortfolioToData(data, {
      name: "Pesantren Al-Falah",
      newPhotos: [
        "data:image/jpeg;base64,AAAA",
        "data:image/jpeg;base64,BBBB",
      ],
    });
    expect(result.data.schools).toHaveLength(13);
    expect(result.data.photos).toHaveLength(64);
    expect(result.data.users).toHaveLength(3);
    expect(result.school.name).toBe("Pesantren Al-Falah");
    expect(result.school.level).toBeUndefined();
    expect(result.school.slug).toBe("pesantren-al-falah");
    expect(result.school.coverImage).toBe("data:image/jpeg;base64,AAAA");
    const createdPhotos = result.data.photos.filter(
      (photo) => photo.schoolId === result.school.id,
    );
    expect(createdPhotos).toHaveLength(2);
    expect(createdPhotos.every((photo) => photo.category === "Dokumentasi")).toBe(
      true,
    );
    // Every pre-existing record is still present.
    expect(
      result.data.schools.some(
        (school) => school.id === "school-sdn-001-bandung",
      ),
    ).toBe(true);
    expect(
      result.data.photos.filter((photo) => photo.id.startsWith("photo-sdn-001"))
        .length,
    ).toBe(6);
  });

  it("edits a client, adds a photo, removes one photo, and keeps the rest", () => {
    const data = createSeedData();
    const removed = data.photos.find(
      (photo) => photo.id === "photo-sdn-001-bandung-cotton-skirt",
    );
    expect(removed).toBeDefined();
    const result = savePortfolioToData(data, {
      id: "school-sdn-001-bandung",
      name: "SDN 001 Bandung",
      level: "SD",
      location: "Bandung, Jawa Barat",
      description: "Deskripsi diperbarui.",
      newPhotos: ["data:image/jpeg;base64,NEW"],
      removedPhotoIds: [removed!.id],
    });
    const school = result.data.schools.find(
      (item) => item.id === "school-sdn-001-bandung",
    );
    const photos = result.data.photos.filter(
      (photo) => photo.schoolId === "school-sdn-001-bandung",
    );
    expect(school?.slug).toBe("sdn-001-bandung");
    expect(school?.name).toBe("SDN 001 Bandung");
    expect(school?.description).toBe("Deskripsi diperbarui.");
    expect(photos).toHaveLength(6);
    expect(photos.some((photo) => photo.id === removed!.id)).toBe(false);
    expect(photos.some((photo) => photo.imagePath === "data:image/jpeg;base64,NEW")).toBe(
      true,
    );
    expect(
      photos.some(
        (photo) => photo.id === "photo-sdn-001-bandung-poplin-shirt",
      ),
    ).toBe(true);
    expect(result.data.schools).toHaveLength(12);
    expect(result.data.photos).toHaveLength(62);
  });

  it("recalculates the cover when the cover photo is removed", () => {
    const data = createSeedData();
    const school = data.schools.find(
      (item) => item.id === "school-sdn-001-bandung",
    )!;
    const coverPhoto = data.photos.find(
      (photo) => photo.id === "photo-sdn-001-bandung-poplin-shirt",
    )!;
    expect(school.coverImage).toBe(coverPhoto.imagePath);
    const result = savePortfolioToData(data, {
      id: school.id,
      name: school.name,
      level: school.level,
      location: school.location,
      description: school.description,
      removedPhotoIds: [coverPhoto.id],
    });
    const updated = result.data.schools.find((item) => item.id === school.id);
    expect(updated?.coverImage).not.toBe(coverPhoto.imagePath);
    expect(updated?.coverImage).toBe(
      "/images/product-cotton-skirt.jpg",
    );
  });

  it("keeps existing photo IDs and associations when only the name changes", () => {
    const data = createSeedData();
    const before = data.photos.filter(
      (photo) => photo.schoolId === "school-sdn-sukajadi",
    );
    const result = savePortfolioToData(data, {
      id: "school-sdn-sukajadi",
      name: "SDN Sukajadi",
      level: "SD",
      location: "Bandung, Jawa Barat",
      description: "Nama tampilan tetap.",
    });
    const after = result.data.photos.filter(
      (photo) => photo.schoolId === "school-sdn-sukajadi",
    );
    expect(after.map((photo) => photo.id)).toEqual(
      before.map((photo) => photo.id),
    );
  });
});

describe("legacy photo, category, and user data helpers", () => {
  it("adds and deletes a photo while preserving other records", () => {
    const data = createSeedData();
    const { data: next, photo } = addPhotoToData(data, {
      schoolId: "school-tk-tunas-ceria",
      imagePath: "/images/product-poplin-shirt.jpg",
      title: "Kemeja tambahan",
      alt: "Kemeja putih pada gantungan kayu.",
      category: "Atasan",
      sourceUrl: "https://www.pexels.com/photo/28576622/",
      creator: "Jonathan Borba",
      license: "Pexels License",
      licenseUrl: "https://www.pexels.com/license/",
    });
    expect(next.photos[0].title).toBe("Kemeja tambahan");
    const removed = deletePhotoFromData(next, photo.id);
    expect(removed.photos.some((item) => item.id === photo.id)).toBe(false);
    expect(removed.photos).toHaveLength(62);
  });

  it("updates a category description without touching clients", () => {
    const data = createSeedData();
    const next = updateCategoryDescriptionInData(data, "SD", "Deskripsi baru");
    expect(next.categoryDescriptions.SD).toBe("Deskripsi baru");
    expect(next.schools).toHaveLength(12);
    expect(data.categoryDescriptions.SD).not.toBe("Deskripsi baru");
  });

  it("preserves user records in storage even though the UI is removed", () => {
    const data = createSeedData();
    const { data: next, user } = addUserToData(data, {
      name: "Sari Demo",
      email: "SARI@DEMO.LOCAL",
      role: "Staf Demo",
    });
    expect(user.email).toBe("sari@demo.local");
    expect(JSON.stringify(user)).not.toContain("password");
    expect(next.users).toHaveLength(4);
    const removed = deleteUserFromData(next, user.id);
    expect(removed.users).toHaveLength(3);
  });
});
