import { DEMO_ASSETS } from "./assets";
import type {
  DemoData,
  DemoUser,
  GalleryPhoto,
  School,
} from "./types";

const SEED_VERSION = 2;

interface SeedSchool {
  id: string;
  slug: string;
  name: string;
  level: School["level"];
  location: string;
  description: string;
  assets: string[];
  createdAt: string;
  updatedAt: string;
}

const SEED_SCHOOLS: SeedSchool[] = [
  {
    id: "school-sdn-001-bandung",
    slug: "sdn-001-bandung",
    name: "SDN 001 Bandung",
    level: "SD",
    location: "Bandung, Jawa Barat",
    description:
      "Contoh profil sekolah dasar untuk demonstrasi galeri. Halaman ini menunjukkan bagaimana identitas sekolah, jumlah foto, dan keterangan singkat ditampilkan.",
    assets: [
      "poplin-shirt",
      "cotton-skirt",
      "leather-loafer",
      "uniform-flatlay",
      "striped-knit",
      "atelier-rail",
    ],
    createdAt: "2026-11-10T09:00:00.000Z",
    updatedAt: "2026-11-10T09:00:00.000Z",
  },
  {
    id: "school-sdn-sukajadi",
    slug: "sdn-sukajadi",
    name: "SDN Sukajadi",
    level: "SD",
    location: "Bandung, Jawa Barat",
    description:
      "Data contoh untuk melihat daftar foto seragam jenjang SD. Seluruh isi galeri adalah foto stok demonstrasi, bukan seragam resmi sekolah.",
    assets: ["poplin-shirt", "cotton-skirt", "leather-loafer", "atelier-rail"],    createdAt: "2026-11-09T10:30:00.000Z",
    updatedAt: "2026-11-09T10:30:00.000Z",
  },
  {
    id: "school-smpn-3-bandung",
    slug: "smpn-3-bandung",
    name: "SMPN 3 Bandung",
    level: "SMP",
    location: "Bandung, Jawa Barat",
    description:
      "Contoh halaman sekolah jenjang SMP dengan galeri atasan, bawahan, dan pelengkap. Gunakan tab Informasi untuk melihat keterangan data demo.",
    assets: [
      "poplin-shirt",
      "wool-blazer",
      "cotton-skirt",
      "twill-trouser",
      "leather-loafer",
      "uniform-flatlay",
    ],
    createdAt: "2026-11-08T08:15:00.000Z",
    updatedAt: "2026-11-08T08:15:00.000Z",
  },
  {
    id: "school-sman-5-bandung",
    slug: "sman-5-bandung",
    name: "SMAN 5 Bandung",
    level: "SMA",
    location: "Bandung, Jawa Barat",
    description:
      "Contoh profil jenjang SMA untuk memperlihatkan tampilan galeri yang lebih lengkap, termasuk setelan dan aksesori pendukung.",
    assets: [
      "poplin-shirt",
      "wool-blazer",
      "twill-trouser",
      "leather-loafer",
      "uniform-flatlay",
      "atelier-rail",
    ],
    createdAt: "2026-11-07T13:45:00.000Z",
    updatedAt: "2026-11-07T13:45:00.000Z",
  },
  {
    id: "school-tk-tunas-ceria",
    slug: "tk-tunas-ceria",
    name: "TK Tunas Ceria",
    level: "TK",
    location: "Cimahi, Jawa Barat",
    description:
      "Contoh data taman kanak-kanak dengan pilihan foto yang lebih ringkas. Nama dan profil sekolah pada demo ini bersifat ilustratif.",
    assets: ["striped-knit", "poplin-shirt", "cotton-skirt", "leather-loafer"],
    createdAt: "2026-11-06T09:20:00.000Z",
    updatedAt: "2026-11-06T09:20:00.000Z",
  },
  {
    id: "school-tk-pertiwi-02",
    slug: "tk-pertiwi-02",
    name: "TK Pertiwi 02",
    level: "TK",
    location: "Bandung Barat, Jawa Barat",
    description:
      "Contoh halaman TK untuk menunjukkan pencarian, filter jenjang, dan galeri foto yang dapat diunduh.",
    assets: ["striped-knit", "cotton-skirt", "leather-loafer", "uniform-flatlay"],
    createdAt: "2026-11-05T11:00:00.000Z",
    updatedAt: "2026-11-05T11:00:00.000Z",
  },
  {
    id: "school-tk-al-hikmah",
    slug: "tk-al-hikmah",
    name: "TK Al-Hikmah",
    level: "TK",
    location: "Bandung, Jawa Barat",
    description:
      "Contoh profil TK dengan koleksi referensi atasan, bawahan, dan pelengkap. Semua foto adalah stok demonstrasi berlisensi.",
    assets: [
      "poplin-shirt",
      "cotton-skirt",
      "leather-loafer",
      "uniform-flatlay",
      "striped-knit",
    ],
    createdAt: "2026-11-04T14:10:00.000Z",
    updatedAt: "2026-11-04T14:10:00.000Z",
  },
  {
    id: "school-sdn-cihampelas-1",
    slug: "sdn-cihampelas-1",
    name: "SDN Cihampelas 1",
    level: "SD",
    location: "Bandung, Jawa Barat",
    description:
      "Contoh sekolah dasar dengan variasi foto atasan, bawahan, dan pelengkap. Data ini tidak mewakili sekolah sungguhan.",
    assets: [
      "poplin-shirt",
      "cotton-skirt",
      "twill-trouser",
      "leather-loafer",
      "striped-knit",
    ],
    createdAt: "2026-11-03T10:00:00.000Z",
    updatedAt: "2026-11-03T10:00:00.000Z",
  },
  {
    id: "school-smpn-1-lembang",
    slug: "smpn-1-lembang",
    name: "SMPN 1 Lembang",
    level: "SMP",
    location: "Lembang, Jawa Barat",
    description:
      "Contoh halaman SMP dengan galeri ringkas. Gunakan tombol Download Semua untuk mengunduh arsip foto yang benar-benar tersedia.",
    assets: ["poplin-shirt", "wool-blazer", "twill-trouser", "leather-loafer"],
    createdAt: "2026-11-02T08:45:00.000Z",
    updatedAt: "2026-11-02T08:45:00.000Z",
  },
  {
    id: "school-smpn-2-cimahi",
    slug: "smpn-2-cimahi",
    name: "SMPN 2 Cimahi",
    level: "SMP",
    location: "Cimahi, Jawa Barat",
    description:
      "Contoh profil SMP untuk memperlihatkan kombinasi atasan, bawahan, dan aksesori dalam galeri dua kolom di ponsel.",
    assets: [
      "poplin-shirt",
      "wool-blazer",
      "cotton-skirt",
      "twill-trouser",
      "leather-loafer",
      "atelier-rail",
    ],
    createdAt: "2026-11-01T15:30:00.000Z",
    updatedAt: "2026-11-01T15:30:00.000Z",
  },
  {
    id: "school-sman-2-cimahi",
    slug: "sman-2-cimahi",
    name: "SMAN 2 Cimahi",
    level: "SMA",
    location: "Cimahi, Jawa Barat",
    description:
      "Contoh halaman SMA dengan galeri tujuh foto. Semua foto adalah referensi visual berlisensi, bukan seragam resmi sekolah.",
    assets: [
      "poplin-shirt",
      "wool-blazer",
      "cotton-skirt",
      "twill-trouser",
      "leather-loafer",
      "uniform-flatlay",
      "atelier-rail",
    ],
    createdAt: "2026-10-31T09:00:00.000Z",
    updatedAt: "2026-10-31T09:00:00.000Z",
  },
  {
    id: "school-sma-harapan-bangsa",
    slug: "sma-harapan-bangsa",
    name: "SMA Harapan Bangsa",
    level: "SMA",
    location: "Bandung, Jawa Barat",
    description:
      "Contoh profil SMA dengan koleksi referensi setelan dan pelengkap. Nama sekolah digunakan sebagai contoh, bukan entitas terverifikasi.",
    assets: [
      "poplin-shirt",
      "wool-blazer",
      "twill-trouser",
      "leather-loafer",
      "uniform-flatlay",
    ],
    createdAt: "2026-10-30T12:00:00.000Z",
    updatedAt: "2026-10-30T12:00:00.000Z",
  },
];

const COVER_BY_SLUG: Record<string, string> = {
  "sdn-001-bandung": "poplin-shirt",
  "sdn-sukajadi": "cotton-skirt",
  "smpn-3-bandung": "wool-blazer",
  "sman-5-bandung": "uniform-flatlay",
  "tk-tunas-ceria": "striped-knit",
  "tk-pertiwi-02": "cotton-skirt",
  "tk-al-hikmah": "uniform-flatlay",
  "sdn-cihampelas-1": "twill-trouser",
  "smpn-1-lembang": "leather-loafer",
  "smpn-2-cimahi": "atelier-rail",
  "sman-2-cimahi": "wool-blazer",
  "sma-harapan-bangsa": "poplin-shirt",
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {  TK: "Seragam taman kanak-kanak dengan potongan nyaman untuk aktivitas bermain dan belajar.",
  SD: "Seragam sekolah dasar yang umum dipakai untuk kegiatan belajar harian.",
  SMP: "Seragam jenjang menengah pertama dengan atasan, bawahan, dan atribut pendukung.",
  SMA: "Seragam jenjang menengah atas, termasuk setelan dan aksesori untuk kegiatan sekolah.",
};

const SEED_USERS: DemoUser[] = [
  {
    id: "user-admin-demo",
    name: "Rani Admin",
    email: "rani@demo.local",
    role: "Admin Demo",
    createdAt: "2026-10-20T08:00:00.000Z",
  },
  {
    id: "user-staf-demo",
    name: "Bagas Staf",
    email: "bagas@demo.local",
    role: "Staf Demo",
    createdAt: "2026-10-21T09:30:00.000Z",
  },
  {
    id: "user-operator-demo",
    name: "Nadia Operator",
    email: "nadia@demo.local",
    role: "Operator Demo",
    createdAt: "2026-10-22T10:15:00.000Z",
  },
];

function makePhoto(
  school: SeedSchool,
  assetKey: string,
  index: number,
): GalleryPhoto {
  const asset = DEMO_ASSETS[assetKey];
  if (!asset) {
    throw new Error(`Unknown demo asset: ${assetKey}`);
  }
  return {
    id: `photo-${school.slug}-${assetKey}`,
    schoolId: school.id,
    imagePath: asset.path,
    title: asset.title,
    alt: asset.alt,
    category: asset.category,
    sourceUrl: asset.sourceUrl,
    creator: asset.creator,
    license: asset.license,
    licenseUrl: asset.licenseUrl,
    demonstration: true,
    createdAt: new Date(
      Date.parse(school.createdAt) + index * 60_000,
    ).toISOString(),
  };
}

export function createSeedData(): DemoData {
  const schools: School[] = SEED_SCHOOLS.map((school) => ({
    id: school.id,
    slug: school.slug,
    name: school.name,
    level: school.level,
    location: school.location,
    description: school.description,
    coverImage:
      DEMO_ASSETS[COVER_BY_SLUG[school.slug] ?? ""]?.path ?? undefined,
    createdAt: school.createdAt,
    updatedAt: school.updatedAt,
    isDemo: true,
  }));

  const photos: GalleryPhoto[] = SEED_SCHOOLS.flatMap((school) =>
    school.assets.map((assetKey, index) => makePhoto(school, assetKey, index)),
  );

  return {
    version: SEED_VERSION,
    schools,
    photos,
    categoryDescriptions: { ...CATEGORY_DESCRIPTIONS },
    users: SEED_USERS.map((user) => ({ ...user })),
  };
}

export { SEED_VERSION, CATEGORY_DESCRIPTIONS };
