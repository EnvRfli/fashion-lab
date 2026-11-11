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
  updateCategoryDescriptionInData,
  updateSchoolInData,
} from "./demo-store";
import { createSeedData } from "./seed";

describe("demo data persistence", () => {
  it("returns seed data when storage is empty", () => {
    const data = loadDemoData(localStorage);
    expect(data.schools).toHaveLength(12);
    expect(data.photos.length).toBeGreaterThan(50);
    expect(data.users).toHaveLength(3);
  });

  it("round-trips data through storage", () => {
    const data = createSeedData();
    expect(saveDemoData(data, localStorage)).toBe(true);
    const loaded = loadDemoData(localStorage);
    expect(loaded.schools).toHaveLength(data.schools.length);
    expect(loaded.categoryDescriptions.SD).toContain("sekolah dasar");
  });

  it("falls back to seed data for invalid JSON", () => {
    localStorage.setItem("galeri-seragam.demo.v2", "{not-json");
    const data = loadDemoData(localStorage);
    expect(data.version).toBe(2);
    expect(data.schools.length).toBe(12);
  });

  it("rejects malformed data shapes", () => {
    expect(isDemoData({ version: 1, schools: [] })).toBe(false);
  });
});

describe("school mutations", () => {
  it("adds a school with a unique slug", () => {
    const data = createSeedData();
    const { data: next, school } = addSchoolToData(data, {
      name: "SDN 001 Bandung",
      level: "SD",
      location: "Bandung",
      description: "Demo",
    });
    expect(next.schools).toHaveLength(13);
    expect(school.slug).toBe("sdn-001-bandung-2");
    expect(school.isDemo).toBe(true);
  });

  it("updates a school and refreshes the slug", () => {
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
    expect(school?.slug).toBe("sdn-sukajadi-baru");
    expect(school?.description).toBe("Diperbarui");
  });

  it("deletes a school and its photos", () => {
    const data = createSeedData();
    const next = deleteSchoolFromData(data, "school-sdn-001-bandung");
    expect(next.schools).toHaveLength(11);
    expect(
      next.photos.some((photo) => photo.schoolId === "school-sdn-001-bandung"),
    ).toBe(false);
  });
});

describe("photo, category, and user mutations", () => {
  it("adds and deletes a photo", () => {
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
  });

  it("updates a category description", () => {
    const data = createSeedData();
    const next = updateCategoryDescriptionInData(data, "SD", "Deskripsi baru");
    expect(next.categoryDescriptions.SD).toBe("Deskripsi baru");
    expect(data.categoryDescriptions.SD).not.toBe("Deskripsi baru");
  });

  it("adds and deletes a demo user without storing passwords", () => {
    const data = createSeedData();
    const { data: next, user } = addUserToData(data, {
      name: "Sari Demo",
      email: "SARI@DEMO.LOCAL",
      role: "Staf Demo",
    });
    expect(user.email).toBe("sari@demo.local");
    expect(JSON.stringify(user)).not.toContain("password");
    const removed = deleteUserFromData(next, user.id);
    expect(removed.users.some((item) => item.id === user.id)).toBe(false);
  });
});
