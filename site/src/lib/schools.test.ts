import { describe, expect, it } from "vitest";
import { createSeedData } from "../data/seed";
import {
  countSchoolsByLevel,
  filterAndSortSchools,
  formatPhotoCount,
  parseLevelFilter,
  parseSort,
  photoCountBySchool,
  photosForSchool,
  slugify,
  uniqueSchoolSlug,
} from "./schools";

const data = createSeedData();

describe("school filtering and sorting", () => {
  it("searches school names and locations case-insensitively", () => {
    const result = filterAndSortSchools(data.schools, data.photos, {
      query: "sukajadi",
      level: "semua",
      sort: "terbaru",
    });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("SDN Sukajadi");
  });

  it("filters by education level", () => {
    const result = filterAndSortSchools(data.schools, data.photos, {
      query: "",
      level: "SMA",
      sort: "terbaru",
    });
    expect(result).toHaveLength(3);
    expect(result.every((school) => school.level === "SMA")).toBe(true);
  });

  it("sorts by photo count descending", () => {
    const result = filterAndSortSchools(data.schools, data.photos, {
      query: "",
      level: "semua",
      sort: "foto",
    });
    const counts = photoCountBySchool(data.photos);
    expect(counts.get(result[0].id)).toBeGreaterThanOrEqual(
      counts.get(result[result.length - 1].id) ?? 0,
    );
  });

  it("sorts names alphabetically", () => {
    const result = filterAndSortSchools(data.schools, data.photos, {
      query: "",
      level: "semua",
      sort: "nama",
    });
    const names = result.map((school) => school.name);
    expect(names).toEqual(
      [...names].sort((a, b) => a.localeCompare(b, "id")),
    );
  });

  it("returns no results for a missing term", () => {
    const result = filterAndSortSchools(data.schools, data.photos, {
      query: "tidak-ada-sekolah-ini",
      level: "semua",
      sort: "terbaru",
    });
    expect(result).toEqual([]);
  });
});

describe("school helpers", () => {
  it("counts schools per level", () => {
    expect(countSchoolsByLevel(data.schools)).toEqual({
      TK: 3,
      SD: 3,
      SMP: 3,
      SMA: 3,
    });
  });

  it("counts photos per school", () => {
    const counts = photoCountBySchool(data.photos);
    expect(counts.get("school-sdn-001-bandung")).toBe(6);
  });

  it("returns only photos for the requested school", () => {
    const photos = photosForSchool(data.photos, "school-sman-2-cimahi");
    expect(photos).toHaveLength(7);
    expect(photos.every((photo) => photo.schoolId === "school-sman-2-cimahi")).toBe(
      true,
    );
  });

  it("formats photo counts", () => {
    expect(formatPhotoCount(0)).toBe("0 Foto");
    expect(formatPhotoCount(12)).toBe("12 Foto");
  });

  it("parses level and sort values safely", () => {
    expect(parseLevelFilter("sd")).toBe("SD");
    expect(parseLevelFilter("universitas")).toBe("semua");
    expect(parseSort("foto")).toBe("foto");
    expect(parseSort("harga")).toBe("terbaru");
  });

  it("creates readable slugs and resolves duplicates", () => {
    expect(slugify("SDN 001 Bandung")).toBe("sdn-001-bandung");
    const slug = uniqueSchoolSlug("SDN 001 Bandung", data.schools);
    expect(slug).toBe("sdn-001-bandung-2");
  });
});
