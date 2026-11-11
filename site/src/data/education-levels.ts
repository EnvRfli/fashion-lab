export const EDUCATION_LEVELS = [
  {
    id: "TK",
    label: "TK",
    name: "Taman Kanak-kanak",
    description:
      "Referensi seragam untuk jenjang taman kanak-kanak, umumnya dengan potongan yang nyaman dan warna ceria.",
    icon: "teddy",
  },
  {
    id: "SD",
    label: "SD",
    name: "Sekolah Dasar",
    description:
      "Referensi seragam sekolah dasar: kemeja, rok atau celana, dan atribut pelengkap harian.",
    icon: "cap",
  },
  {
    id: "SMP",
    label: "SMP",
    name: "Sekolah Menengah Pertama",
    description:
      "Referensi seragam jenjang menengah pertama dengan variasi atasan, bawahan, dan atribut.",
    icon: "book",
  },
  {
    id: "SMA",
    label: "SMA",
    name: "Sekolah Menengah Atas",
    description:
      "Referensi seragam jenjang menengah atas, termasuk setelan dan aksesori pendukung.",
    icon: "trophy",
  },
] as const;

export type EducationLevelId = (typeof EDUCATION_LEVELS)[number]["id"];

export const EDUCATION_LEVEL_IDS = EDUCATION_LEVELS.map(
  (level) => level.id,
) as EducationLevelId[];

export function isEducationLevel(value: string): value is EducationLevelId {
  return EDUCATION_LEVEL_IDS.includes(value as EducationLevelId);
}

export function getEducationLevel(level: EducationLevelId) {
  return EDUCATION_LEVELS.find((item) => item.id === level)!;
}
