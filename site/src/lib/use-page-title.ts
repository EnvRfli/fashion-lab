import { useEffect } from "react";

const BASE_TITLE = "Galeri Seragam — Portofolio Konveksi Nafa Collection";

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — Galeri Seragam` : BASE_TITLE;
    return () => {
      document.title = BASE_TITLE;
    };
  }, [title]);
}
