import type { EducationLevelId } from "../data/education-levels";
import { EDUCATION_LEVELS } from "../data/education-levels";
import type { GalleryPhoto, School } from "../data/types";

export type SchoolSort = "terbaru" | "nama" | "foto";
export type LevelFilter = EducationLevelId | "semua";

export interface SchoolQuery {
  query: string;
  level: LevelFilter;
  sort: SchoolSort;
}

export const DEFAULT_QUERY: SchoolQuery = {
  query: "",
  level: "semua",
  sort: "terbaru",
};

export function normalizeText(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function parseLevelFilter(value: string | null): LevelFilter {
  if (!value) return "semua";
  const normalized = value.toUpperCase();
  return EDUCATION_LEVELS.some((level) => level.id === normalized)
    ? (normalized as EducationLevelId)
    : "semua";
}

export function parseSort(value: string | null): SchoolSort {
  if (value === "nama" || value === "foto" || value === "terbaru") {
    return value;
  }
  return "terbaru";
}

export function photoCountBySchool(photos: GalleryPhoto[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const photo of photos) {
    counts.set(photo.schoolId, (counts.get(photo.schoolId) ?? 0) + 1);
  }
  return counts;
}

export function photosForSchool(
  photos: GalleryPhoto[],
  schoolId: string,
): GalleryPhoto[] {
  return photos.filter((photo) => photo.schoolId === schoolId);
}

export function coverPhotoForSchool(
  school: School,
  photos: GalleryPhoto[],
): GalleryPhoto | undefined {
  return photos.find((photo) => photo.schoolId === school.id);
}

export function schoolImage(
  school: School,
  photos: GalleryPhoto[],
): string | undefined {
  return school.coverImage ?? coverPhotoForSchool(school, photos)?.imagePath;
}

export function filterAndSortSchools(
  schools: School[],
  photos: GalleryPhoto[],
  query: SchoolQuery,
): School[] {
  const needle = normalizeText(query.query);
  const counts = photoCountBySchool(photos);
  const levelName = new Map(
    EDUCATION_LEVELS.map((level) => [level.id, normalizeText(level.name)]),
  );

  const filtered = schools.filter((school) => {
    if (query.level !== "semua" && school.level !== query.level) {
      return false;
    }
    if (!needle) return true;
    const haystack = [
      school.name,
      school.location,
      school.level ?? "",
      school.level ? (levelName.get(school.level) ?? "") : "",
    ]
      .map(normalizeText)
      .join(" ");
    return haystack.includes(needle);
  });

  return [...filtered].sort((a, b) => {
    if (query.sort === "nama") {
      return a.name.localeCompare(b.name, "id", { sensitivity: "base" });
    }
    if (query.sort === "foto") {
      const difference = (counts.get(b.id) ?? 0) - (counts.get(a.id) ?? 0);
      return difference !== 0
        ? difference
        : a.name.localeCompare(b.name, "id", { sensitivity: "base" });
    }
    return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
  });
}

export function countSchoolsByLevel(schools: School[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const level of EDUCATION_LEVELS) counts[level.id] = 0;
  for (const school of schools) {
    if (!school.level) continue;
    counts[school.level] = (counts[school.level] ?? 0) + 1;
  }
  return counts;
}

export function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);
}

export function uniqueSchoolSlug(
  name: string,
  schools: School[],
  ignoreId?: string,
): string {
  const base = slugify(name) || "klien";
  const used = new Set(
    schools.filter((school) => school.id !== ignoreId).map((s) => s.slug),
  );
  if (!used.has(base)) return base;
  let suffix = 2;
  while (used.has(`${base}-${suffix}`)) suffix += 1;
  return `${base}-${suffix}`;
}

export function formatPhotoCount(count: number): string {
  return `${count} Foto`;
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}
