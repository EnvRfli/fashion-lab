import type { EducationLevelId } from "./education-levels";

export interface School {
  id: string;
  slug: string;
  name: string;
  level: EducationLevelId;
  location: string;
  description: string;
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
  isDemo: true;
}

export interface GalleryPhoto {
  id: string;
  schoolId: string;
  imagePath: string;
  title: string;
  alt: string;
  category: string;
  sourceUrl: string;
  creator: string;
  license: string;
  licenseUrl: string;
  demonstration: true;
  createdAt: string;
}

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: "Admin Demo" | "Staf Demo" | "Operator Demo";
  createdAt: string;
}

export interface DemoData {
  version: number;
  schools: School[];
  photos: GalleryPhoto[];
  categoryDescriptions: Record<string, string>;
  users: DemoUser[];
}

export interface SchoolInput {
  name: string;
  level: EducationLevelId;
  location: string;
  description: string;
  coverImage?: string;
}

export interface PhotoInput {
  schoolId: string;
  imagePath: string;
  title: string;
  alt: string;
  category: string;
  sourceUrl: string;
  creator: string;
  license: string;
  licenseUrl: string;
}

export interface UserInput {
  name: string;
  email: string;
  role: DemoUser["role"];
}
