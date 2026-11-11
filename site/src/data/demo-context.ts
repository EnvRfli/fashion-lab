import { createContext } from "react";
import type {
  DemoData,
  DemoUser,
  GalleryPhoto,
  PhotoInput,
  School,
  SchoolInput,
  UserInput,
} from "./types";

export type PersistenceState = "saved" | "unavailable";

export interface DemoDataContextValue {
  data: DemoData;
  schools: School[];
  photos: GalleryPhoto[];
  users: DemoUser[];
  categoryDescriptions: Record<string, string>;
  persistence: PersistenceState;
  isDemoSignedIn: boolean;
  addSchool: (input: SchoolInput) => School;
  updateSchool: (id: string, input: SchoolInput) => void;
  deleteSchool: (id: string) => void;
  addPhoto: (input: PhotoInput) => GalleryPhoto;
  deletePhoto: (id: string) => void;
  updateCategoryDescription: (levelId: string, description: string) => void;
  addUser: (input: UserInput) => DemoUser;
  deleteUser: (id: string) => void;
  resetData: () => void;
  signInDemo: () => void;
  signOutDemo: () => void;
}

export const DemoDataContext = createContext<DemoDataContextValue | null>(
  null,
);
