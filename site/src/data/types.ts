import type { EducationLevelId } from "./education-levels";

/**
 * A client portfolio. The interface keeps the original `School` name and field
 * names so existing localStorage records and seed data remain compatible.
 * `level` is optional so the model is no longer school-only.
 */
export interface School {
  id: string;
  slug: string;
  name: string;
  level?: EducationLevelId;
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
  level?: EducationLevelId;
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

export interface PortfolioInput {
  name: string;
  level?: EducationLevelId;
  location?: string;
  description?: string;
}

export interface PortfolioSaveInput extends PortfolioInput {
  /** Omit to create, include to edit. */
  id?: string;
  /** Compressed data URLs selected in the multi-image picker. */
  newPhotos?: string[];
  /** Photo IDs the administrator explicitly confirmed for removal. */
  removedPhotoIds?: string[];
}

export interface PortfolioSaveResult {
  school: School;
  persisted: boolean;
}

export interface UserInput {
  name: string;
  email: string;
  role: DemoUser["role"];
}
