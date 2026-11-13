import { createSeedData, SEED_DESCRIPTIONS, SEED_VERSION } from "../data/seed";
import type {
  DemoData,
  DemoUser,
  GalleryPhoto,
  PhotoInput,
  PortfolioSaveInput,
  School,
  SchoolInput,
  UserInput,
} from "../data/types";
import { uniqueSchoolSlug } from "../lib/schools";

export const DEMO_STORAGE_KEY = "galeri-seragam.demo.v2";
export const ADMIN_SESSION_KEY = "galeri-seragam.admin.session";
export const LEGACY_SESSION_KEY = "galeri-seragam.demo.session";

/**
 * Exact descriptions shipped before the v2 copy adjustment. The migration only
 * rewrites a description when it still equals one of these strings, so any
 * administrator edit is left untouched.
 */
const LEGACY_SEED_DESCRIPTIONS: Record<string, string> = {
  "school-sdn-001-bandung":
    "Contoh profil sekolah dasar untuk demonstrasi galeri. Halaman ini menunjukkan bagaimana identitas sekolah, jumlah foto, dan keterangan singkat ditampilkan.",
  "school-sdn-sukajadi":
    "Data contoh untuk melihat daftar foto seragam jenjang SD. Seluruh isi galeri adalah foto stok demonstrasi, bukan seragam resmi sekolah.",
  "school-smpn-3-bandung":
    "Contoh halaman sekolah jenjang SMP dengan galeri atasan, bawahan, dan pelengkap. Gunakan tab Informasi untuk melihat keterangan data demo.",
  "school-sman-5-bandung":
    "Contoh profil jenjang SMA untuk memperlihatkan tampilan galeri yang lebih lengkap, termasuk setelan dan aksesori pendukung.",
  "school-tk-tunas-ceria":
    "Contoh data taman kanak-kanak dengan pilihan foto yang lebih ringkas. Nama dan profil sekolah pada demo ini bersifat ilustratif.",
  "school-tk-pertiwi-02":
    "Contoh halaman TK untuk menunjukkan pencarian, filter jenjang, dan galeri foto yang dapat diunduh.",
  "school-tk-al-hikmah":
    "Contoh profil TK dengan koleksi referensi atasan, bawahan, dan pelengkap. Semua foto adalah stok demonstrasi berlisensi.",
  "school-sdn-cihampelas-1":
    "Contoh sekolah dasar dengan variasi foto atasan, bawahan, dan pelengkap. Data ini tidak mewakili sekolah sungguhan.",
  "school-smpn-1-lembang":
    "Contoh halaman SMP dengan galeri ringkas. Gunakan tombol Download Semua untuk mengunduh arsip foto yang benar-benar tersedia.",
  "school-smpn-2-cimahi":
    "Contoh profil SMP untuk memperlihatkan kombinasi atasan, bawahan, dan aksesori dalam galeri dua kolom di ponsel.",
  "school-sman-2-cimahi":
    "Contoh halaman SMA dengan galeri tujuh foto. Semua foto adalah referensi visual berlisensi, bukan seragam resmi sekolah.",
  "school-sma-harapan-bangsa":
    "Contoh profil SMA dengan koleksi referensi setelan dan pelengkap. Nama sekolah digunakan sebagai contoh, bukan entitas terverifikasi.",
};

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

/**
 * Additive copy migration. It changes only the top-level version and known
 * seeded descriptions; records, IDs, slugs, photos and timestamps stay intact.
 */
export function migrateDemoData(data: DemoData): DemoData {
  if (data.version >= SEED_VERSION) return data;
  return {
    ...data,
    version: SEED_VERSION,
    schools: data.schools.map((school) => {
      const legacy = LEGACY_SEED_DESCRIPTIONS[school.id];
      if (legacy && school.description === legacy) {
        return {
          ...school,
          description: SEED_DESCRIPTIONS[school.id] ?? school.description,
        };
      }
      return school;
    }),
  };
}

export function loadDemoData(storage: Storage | null = browserStorage()): DemoData {
  if (!storage) return createSeedData();
  try {
    const raw = storage.getItem(DEMO_STORAGE_KEY);
    if (!raw) return createSeedData();
    const parsed: unknown = JSON.parse(raw);
    if (!isDemoData(parsed)) return createSeedData();
    const migrated = migrateDemoData(parsed);
    if (migrated.version !== parsed.version) {
      // Persist the additive copy migration so refreshed sessions see the same
      // professional descriptions. Records are not reseeded or deleted.
      saveDemoData(migrated, storage);
    }
    return migrated;
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

function clientPhoto(
  schoolId: string,
  clientName: string,
  imagePath: string,
  createdAt: string,
  index: number,
): GalleryPhoto {
  return {
    id: createId("photo"),
    schoolId,
    imagePath,
    title: `Dokumentasi ${clientName}`,
    alt: `Foto hasil pekerjaan untuk ${clientName}.`,
    category: "Dokumentasi",
    sourceUrl: "",
    creator: "Nafa Collection",
    license: "Dokumentasi internal",
    licenseUrl: "",
    demonstration: true,
    createdAt: new Date(Date.parse(createdAt) + index * 1_000).toISOString(),
  };
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
            // Keep the existing slug so public URLs remain stable on edit.
            level: input.level,
            location: input.location.trim(),
            description: input.description.trim(),
            coverImage: input.coverImage ?? school.coverImage,
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

/**
 * Create or edit a client portfolio in one write. New photos are prepended,
 * existing photos are retained unless their IDs are explicitly removed, and
 * the cover falls back to the first available photo.
 */
export function savePortfolioToData(
  data: DemoData,
  input: PortfolioSaveInput,
): { data: DemoData; school: School } {
  const now = touch();
  const name = input.name.trim();
  const newPhotos = input.newPhotos ?? [];

  if (input.id) {
    const existing = data.schools.find((school) => school.id === input.id);
    if (!existing) {
      throw new Error("Portofolio tidak ditemukan.");
    }

    const removed = new Set(input.removedPhotoIds ?? []);
    const remainingPhotos = data.photos.filter(
      (photo) => !(photo.schoolId === existing.id && removed.has(photo.id)),
    );
    const addedPhotos = newPhotos.map((imagePath, index) =>
      clientPhoto(existing.id, name || existing.name, imagePath, now, index),
    );
    const photos = [...addedPhotos, ...remainingPhotos];
    const schoolPhotos = photos.filter(
      (photo) => photo.schoolId === existing.id,
    );

    let coverImage = existing.coverImage;
    if (
      coverImage &&
      !schoolPhotos.some((photo) => photo.imagePath === coverImage)
    ) {
      coverImage = undefined;
    }
    if (!coverImage) coverImage = schoolPhotos[0]?.imagePath;

    const updated: School = {
      ...existing,
      name,
      level: input.level,
      location: input.location?.trim() ?? "",
      description: input.description?.trim() ?? "",
      coverImage,
      updatedAt: now,
    };

    return {
      data: {
        ...data,
        schools: data.schools.map((school) =>
          school.id === existing.id ? updated : school,
        ),
        photos,
      },
      school: updated,
    };
  }

  const school: School = {
    id: createId("school"),
    slug: uniqueSchoolSlug(name, data.schools),
    name,
    level: input.level,
    location: input.location?.trim() ?? "",
    description: input.description?.trim() ?? "",
    coverImage: newPhotos[0],
    createdAt: now,
    updatedAt: now,
    isDemo: true,
  };
  const photos = newPhotos.map((imagePath, index) =>
    clientPhoto(school.id, name, imagePath, now, index),
  );

  return {
    data: {
      ...data,
      schools: [school, ...data.schools],
      photos: [...photos, ...data.photos],
    },
    school,
  };
}

export function addPhotosToData(
  data: DemoData,
  schoolId: string,
  imagePaths: string[],
): { data: DemoData; photos: GalleryPhoto[] } {
  const school = data.schools.find((item) => item.id === schoolId);
  if (!school) throw new Error("Portofolio tidak ditemukan.");
  const now = touch();
  const photos = imagePaths.map((imagePath, index) =>
    clientPhoto(schoolId, school.name, imagePath, now, index),
  );
  return {
    data: {
      ...data,
      photos: [...photos, ...data.photos],
      schools: data.schools.map((item) =>
        item.id === schoolId
          ? { ...item, coverImage: item.coverImage ?? photos[0]?.imagePath }
          : item,
      ),
    },
    photos,
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
  const photo = data.photos.find((item) => item.id === id);
  if (!photo) return data;
  const photos = data.photos.filter((item) => item.id !== id);
  const school = data.schools.find((item) => item.id === photo.schoolId);
  const schoolPhotos = photos.filter(
    (item) => item.schoolId === photo.schoolId,
  );
  const coverImage =
    school?.coverImage &&
    schoolPhotos.some((item) => item.imagePath === school.coverImage)
      ? school.coverImage
      : schoolPhotos[0]?.imagePath;

  return {
    ...data,
    photos,
    schools: data.schools.map((item) =>
      item.id === photo.schoolId ? { ...item, coverImage } : item,
    ),
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

export { SEED_VERSION };
