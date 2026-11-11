import { useEffect } from "react";

const BASE_TITLE = "Galeri Seragam — Referensi Seragam Sekolah";

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — Galeri Seragam` : BASE_TITLE;
    return () => {
      document.title = BASE_TITLE;
    };
  }, [title]);
}
