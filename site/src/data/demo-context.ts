import { createContext } from "react";
import type {
  DemoData,
  GalleryPhoto,
  PortfolioSaveInput,
  PortfolioSaveResult,
  School,
} from "./types";

export type PersistenceState = "saved" | "unavailable";

export interface DemoDataContextValue {
  data: DemoData;
  schools: School[];
  photos: GalleryPhoto[];
  categoryDescriptions: Record<string, string>;
  persistence: PersistenceState;
  isAdminSignedIn: boolean;
  savePortfolio: (input: PortfolioSaveInput) => PortfolioSaveResult;
  deletePortfolio: (id: string) => boolean;
  signInAdmin: () => void;
  signOutAdmin: () => void;
}

export const DemoDataContext = createContext<DemoDataContextValue | null>(
  null,
);
