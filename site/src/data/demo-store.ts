import { createSeedData, SEED_VERSION } from "../data/seed";
import type {
  DemoData,
  DemoUser,
  GalleryPhoto,
  PhotoInput,
  School,
  SchoolInput,
  UserInput,
} from "../data/types";
import { uniqueSchoolSlug } from "../lib/schools";

export const DEMO_STORAGE_KEY = "galeri-seragam.demo.v2";
export const DEMO_SESSION_KEY = "galeri-seragam.demo.session";

function browserStorage(): Storage | null {
  try {
    if (typeof window === "undefined" || !window.localStorage) return null;
    const probe = "__galeri_seragam_probe__";
    window.localStorage.setItem(probe, "1");
    window.localStorage.removeItem(probe);
    return window.localStorage;
  } catch {
    return null;
  }
}

export function isDemoData(value: unknown): value is DemoData {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<DemoData>;
  return (
    typeof candidate.version === "number" &&
    Array.isArray(candidate.schools) &&
    Array.isArray(candidate.photos) &&
    Array.isArray(candidate.users) &&
    !!candidate.categoryDescriptions &&
    typeof candidate.categoryDescriptions === "object"
  );
}

export function loadDemoData(storage: Storage | null = browserStorage()): DemoData {
  if (!storage) return createSeedData();
  try {
    const raw = storage.getItem(DEMO_STORAGE_KEY);
    if (!raw) return createSeedData();
    const parsed: unknown = JSON.parse(raw);
    if (!isDemoData(parsed)) return createSeedData();
    return parsed;
  } catch {
    return createSeedData();
  }
}

export function saveDemoData(
  data: DemoData,
  storage: Storage | null = browserStorage(),
): boolean {
  if (!storage) return false;
  try {
    storage.setItem(DEMO_STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function clearDemoData(
  storage: Storage | null = browserStorage(),
): void {
  try {
    storage?.removeItem(DEMO_STORAGE_KEY);
  } catch {
    // Storage is optional; ignore unavailable storage.
  }
}

export function isStorageAvailable(): boolean {
  return browserStorage() !== null;
}

export function createId(prefix: string): string {
  const random =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  return `${prefix}-${random}`;
}

function touch(): string {
  return new Date().toISOString();
}

export function addSchoolToData(
  data: DemoData,
  input: SchoolInput,
): { data: DemoData; school: School } {
  const now = touch();
  const school: School = {
    id: createId("school"),
    slug: uniqueSchoolSlug(input.name, data.schools),
    name: input.name.trim(),
    level: input.level,
    location: input.location.trim(),
    description: input.description.trim(),
    coverImage: input.coverImage,
    createdAt: now,
    updatedAt: now,
    isDemo: true,
  };
  return {
    data: { ...data, schools: [school, ...data.schools] },
    school,
  };
}

export function updateSchoolInData(
  data: DemoData,
  id: string,
  input: SchoolInput,
): DemoData {
  return {
    ...data,
    schools: data.schools.map((school) =>
      school.id === id
        ? {
            ...school,
            name: input.name.trim(),
            slug: uniqueSchoolSlug(input.name, data.schools, id),
            level: input.level,
            location: input.location.trim(),
            description: input.description.trim(),
            coverImage: input.coverImage,
            updatedAt: touch(),
          }
        : school,
    ),
  };
}

export function deleteSchoolFromData(data: DemoData, id: string): DemoData {
  return {
    ...data,
    schools: data.schools.filter((school) => school.id !== id),
    photos: data.photos.filter((photo) => photo.schoolId !== id),
  };
}

export function addPhotoToData(
  data: DemoData,
  input: PhotoInput,
): { data: DemoData; photo: GalleryPhoto } {
  const photo: GalleryPhoto = {
    id: createId("photo"),
    schoolId: input.schoolId,
    imagePath: input.imagePath,
    title: input.title.trim(),
    alt: input.alt.trim(),
    category: input.category.trim() || "Referensi",
    sourceUrl: input.sourceUrl.trim(),
    creator: input.creator.trim(),
    license: input.license.trim(),
    licenseUrl: input.licenseUrl.trim(),
    demonstration: true,
    createdAt: touch(),
  };
  return { data: { ...data, photos: [photo, ...data.photos] }, photo };
}

export function deletePhotoFromData(data: DemoData, id: string): DemoData {
  return {
    ...data,
    photos: data.photos.filter((photo) => photo.id !== id),
  };
}

export function updateCategoryDescriptionInData(
  data: DemoData,
  levelId: string,
  description: string,
): DemoData {
  return {
    ...data,
    categoryDescriptions: {
      ...data.categoryDescriptions,
      [levelId]: description.trim(),
    },
  };
}

export function addUserToData(
  data: DemoData,
  input: UserInput,
): { data: DemoData; user: DemoUser } {
  const user: DemoUser = {
    id: createId("user"),
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    role: input.role,
    createdAt: touch(),
  };
  return { data: { ...data, users: [...data.users, user] }, user };
}

export function deleteUserFromData(data: DemoData, id: string): DemoData {
  return { ...data, users: data.users.filter((user) => user.id !== id) };
}

export function resetDemoData(
  storage: Storage | null = browserStorage(),
): DemoData {
  clearDemoData(storage);
  return createSeedData();
}

export { SEED_VERSION };
