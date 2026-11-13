import { useCallback, useMemo, useState, type ReactNode } from "react";
import {
  ADMIN_SESSION_KEY,
  deleteSchoolFromData,
  isStorageAvailable,
  LEGACY_SESSION_KEY,
  loadDemoData,
  saveDemoData,
  savePortfolioToData,
} from "./demo-store";
import {
  DemoDataContext,
  type DemoDataContextValue,
  type PersistenceState,
} from "./demo-context";
import type {
  DemoData,
  PortfolioSaveInput,
  PortfolioSaveResult,
} from "./types";

function readSession(): boolean {
  try {
    return (
      window.localStorage.getItem(ADMIN_SESSION_KEY) === "active" ||
      window.localStorage.getItem(LEGACY_SESSION_KEY) === "active"
    );
  } catch {
    return false;
  }
}

export function DemoDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<DemoData>(() => loadDemoData());
  const [persistence, setPersistence] = useState<PersistenceState>(() =>
    isStorageAvailable() ? "saved" : "unavailable",
  );
  const [isAdminSignedIn, setIsAdminSignedIn] = useState(() => readSession());

  const apply = useCallback((next: DemoData): boolean => {
    const saved = saveDemoData(next);
    setData(next);
    setPersistence(saved ? "saved" : "unavailable");
    return saved;
  }, []);

  const savePortfolio = useCallback(
    (input: PortfolioSaveInput): PortfolioSaveResult => {
      const result = savePortfolioToData(data, input);
      const persisted = apply(result.data);
      return { school: result.school, persisted };
    },
    [data, apply],
  );

  const deletePortfolio = useCallback(
    (id: string): boolean => apply(deleteSchoolFromData(data, id)),
    [data, apply],
  );

  const signInAdmin = useCallback(() => {
    try {
      window.localStorage.setItem(ADMIN_SESSION_KEY, "active");
    } catch {
      // The session indicator is optional; it never grants server access.
    }
    setIsAdminSignedIn(true);
  }, []);

  const signOutAdmin = useCallback(() => {
    try {
      window.localStorage.removeItem(ADMIN_SESSION_KEY);
      window.localStorage.removeItem(LEGACY_SESSION_KEY);
    } catch {
      // Ignore unavailable storage.
    }
    setIsAdminSignedIn(false);
  }, []);

  const value = useMemo<DemoDataContextValue>(
    () => ({
      data,
      schools: data.schools,
      photos: data.photos,
      categoryDescriptions: data.categoryDescriptions,
      persistence,
      isAdminSignedIn,
      savePortfolio,
      deletePortfolio,
      signInAdmin,
      signOutAdmin,
    }),
    [
      data,
      persistence,
      isAdminSignedIn,
      savePortfolio,
      deletePortfolio,
      signInAdmin,
      signOutAdmin,
    ],
  );

  return (
    <DemoDataContext.Provider value={value}>
      {children}
    </DemoDataContext.Provider>
  );
}
