import { useCallback, useMemo, useState, type ReactNode } from "react";
import {
  addPhotoToData,
  addSchoolToData,
  addUserToData,
  deletePhotoFromData,
  deleteSchoolFromData,
  deleteUserFromData,
  DEMO_SESSION_KEY,
  isStorageAvailable,
  loadDemoData,
  resetDemoData,
  saveDemoData,
  updateCategoryDescriptionInData,
  updateSchoolInData,
} from "./demo-store";
import {
  DemoDataContext,
  type DemoDataContextValue,
  type PersistenceState,
} from "./demo-context";
import type {
  DemoData,
  PhotoInput,
  SchoolInput,
  UserInput,
} from "./types";

function readSession(): boolean {
  try {
    return window.localStorage.getItem(DEMO_SESSION_KEY) === "active";
  } catch {
    return false;
  }
}

export function DemoDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<DemoData>(() => loadDemoData());
  const [persistence, setPersistence] = useState<PersistenceState>(() =>
    isStorageAvailable() ? "saved" : "unavailable",
  );
  const [isDemoSignedIn, setIsDemoSignedIn] = useState(() => readSession());

  const apply = useCallback((next: DemoData) => {
    const saved = saveDemoData(next);
    setData(next);
    setPersistence(saved ? "saved" : "unavailable");
  }, []);

  const addSchool = useCallback(
    (input: SchoolInput) => {
      const result = addSchoolToData(data, input);
      apply(result.data);
      return result.school;
    },
    [data, apply],
  );

  const updateSchool = useCallback(
    (id: string, input: SchoolInput) => {
      apply(updateSchoolInData(data, id, input));
    },
    [data, apply],
  );

  const deleteSchool = useCallback(
    (id: string) => {
      apply(deleteSchoolFromData(data, id));
    },
    [data, apply],
  );

  const addPhoto = useCallback(
    (input: PhotoInput) => {
      const result = addPhotoToData(data, input);
      apply(result.data);
      return result.photo;
    },
    [data, apply],
  );

  const deletePhoto = useCallback(
    (id: string) => {
      apply(deletePhotoFromData(data, id));
    },
    [data, apply],
  );

  const updateCategoryDescription = useCallback(
    (levelId: string, description: string) => {
      apply(updateCategoryDescriptionInData(data, levelId, description));
    },
    [data, apply],
  );

  const addUser = useCallback(
    (input: UserInput) => {
      const result = addUserToData(data, input);
      apply(result.data);
      return result.user;
    },
    [data, apply],
  );

  const deleteUser = useCallback(
    (id: string) => {
      apply(deleteUserFromData(data, id));
    },
    [data, apply],
  );

  const resetData = useCallback(() => {
    const seed = resetDemoData();
    const saved = saveDemoData(seed);
    setData(seed);
    setPersistence(saved ? "saved" : "unavailable");
  }, []);

  const signInDemo = useCallback(() => {
    try {
      window.localStorage.setItem(DEMO_SESSION_KEY, "active");
    } catch {
      // The visual demo session is optional and never used as a guard.
    }
    setIsDemoSignedIn(true);
  }, []);

  const signOutDemo = useCallback(() => {
    try {
      window.localStorage.removeItem(DEMO_SESSION_KEY);
    } catch {
      // Ignore unavailable storage.
    }
    setIsDemoSignedIn(false);
  }, []);

  const value = useMemo<DemoDataContextValue>(
    () => ({
      data,
      schools: data.schools,
      photos: data.photos,
      users: data.users,
      categoryDescriptions: data.categoryDescriptions,
      persistence,
      isDemoSignedIn,
      addSchool,
      updateSchool,
      deleteSchool,
      addPhoto,
      deletePhoto,
      updateCategoryDescription,
      addUser,
      deleteUser,
      resetData,
      signInDemo,
      signOutDemo,
    }),
    [
      data,
      persistence,
      isDemoSignedIn,
      addSchool,
      updateSchool,
      deleteSchool,
      addPhoto,
      deletePhoto,
      updateCategoryDescription,
      addUser,
      deleteUser,
      resetData,
      signInDemo,
      signOutDemo,
    ],
  );

  return (
    <DemoDataContext.Provider value={value}>
      {children}
    </DemoDataContext.Provider>
  );
}
