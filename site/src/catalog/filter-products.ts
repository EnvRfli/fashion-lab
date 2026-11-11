import {
  CATEGORIES,
  PRODUCTS,
  STAGES,
  getStagesLabel,
  type CategoryId,
  type Product,
  type StageId,
} from "../data/products";

export type SortId = "featured" | "price-asc" | "price-desc" | "name";

export const SORT_OPTIONS: { id: SortId; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price low to high" },
  { id: "price-desc", label: "Price high to low" },
  { id: "name", label: "Name A–Z" },
];

export interface CatalogFilters {
  query: string;
  category: CategoryId | "all";
  stage: StageId | "all";
  sort: SortId;
}

export const DEFAULT_FILTERS: CatalogFilters = {
  query: "",
  category: "all",
  stage: "all",
  sort: "featured",
};

export function isCategoryId(value: string | null): value is CategoryId {
  return CATEGORIES.some((category) => category.id === value);
}

export function isStageId(value: string | null): value is StageId {
  return STAGES.some((stage) => stage.id === value);
}

export function isSortId(value: string | null): value is SortId {
  return SORT_OPTIONS.some((option) => option.id === value);
}

export function filterProducts(
  filters: CatalogFilters,
  products: Product[] = PRODUCTS,
): Product[] {
  const query = filters.query.trim().toLocaleLowerCase("en-GB");
  const filtered = products.filter((product) => {
    if (filters.category !== "all" && product.category !== filters.category) {
      return false;
    }
    if (filters.stage !== "all" && !product.stages.includes(filters.stage)) {
      return false;
    }
    if (!query) return true;
    const haystack = [
      product.name,
      product.categoryLabel,
      product.summary,
      product.description,
      getStagesLabel(product.stages),
    ]
      .join(" ")
      .toLocaleLowerCase("en-GB");
    return haystack.includes(query);
  });

  return [...filtered].sort((a, b) => {
    switch (filters.sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name, "en-GB");
      case "featured":
      default:
        return PRODUCTS.indexOf(a) - PRODUCTS.indexOf(b);
    }
  });
}

export function countActiveFilters(filters: CatalogFilters): number {
  let count = 0;
  if (filters.query.trim()) count += 1;
  if (filters.category !== "all") count += 1;
  if (filters.stage !== "all") count += 1;
  if (filters.sort !== "featured") count += 1;
  return count;
}
