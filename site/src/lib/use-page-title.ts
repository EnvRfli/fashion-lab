import { useEffect } from "react";

const BASE_TITLE = "Fairholt Schoolwear — demonstration storefront";

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — Fairholt Schoolwear` : BASE_TITLE;
    return () => {
      document.title = BASE_TITLE;
    };
  }, [title]);
}
