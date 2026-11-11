import { useDeferredValue, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  countActiveFilters,
  filterProducts,
  isCategoryId,
  isSortId,
  isStageId,
  SORT_OPTIONS,
  type SortId,
} from "../catalog/filter-products";
import { ProductCard } from "../components/ProductCard";
import { SearchIcon } from "../components/Icons";
import {
  CATEGORIES,
  PRODUCTS,
  STAGES,
  type CategoryId,
  type StageId,
} from "../data/products";
import { usePageTitle } from "../lib/use-page-title";

export function ShopPage() {
  usePageTitle("The collection");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchRef = useRef<HTMLInputElement>(null);

  const categoryParam = searchParams.get("category");
  const stageParam = searchParams.get("stage");
  const sortParam = searchParams.get("sort");

  const category: CategoryId | "all" = isCategoryId(categoryParam)
    ? categoryParam
    : "all";
  const stage: StageId | "all" = isStageId(stageParam) ? stageParam : "all";
  const sort: SortId = isSortId(sortParam) ? sortParam : "featured";
  const query = searchParams.get("q") ?? "";

  const updateFilters = (
    updates: Record<string, string | null>,
    options?: { focusSearch?: boolean },
  ) => {
    const next = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(updates)) {
      if (
        value === null ||
        value === "" ||
        value === "all" ||
        (key === "sort" && value === "featured")
      ) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    }
    setSearchParams(next, { replace: true });
    if (options?.focusSearch) {
      searchRef.current?.focus();
    }
  };

  const deferredQuery = useDeferredValue(query);
  const filtered = filterProducts({
    query: deferredQuery,
    category,
    stage,
    sort,
  });

  const activeFilters = countActiveFilters({ query, category, stage, sort });
  const hasFilters = activeFilters > 0;

  const clearAll = () => {
    setSearchParams({}, { replace: true });
    searchRef.current?.focus();
  };

  return (
    <div className="section">
      <div className="shell">
        <div className="max-w-[52rem]">
          <h1 className="heading-1">The collection</h1>
          <p className="mt-4 max-w-[58ch] text-[var(--color-text-secondary)]">
            Six sample pieces for the school week: blazers, shirts, knitwear,
            skirts, trousers, and one pair of shoes. Prices are illustrative.
          </p>
        </div>

        <div className="mt-10 border-y border-line py-5">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <label
                htmlFor="shop-search"
                className="mb-2 block text-sm font-medium text-ink"
              >
                Search pieces
              </label>
              <div className="relative max-w-xl">
                <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-text-secondary)]" />
                <input
                  ref={searchRef}
                  id="shop-search"
                  type="search"
                  className="field pl-11"
                  placeholder="Try “shirt” or “blazer”"
                  value={query}
                  onChange={(event) => {
                    updateFilters({ q: event.target.value });
                  }}
                />
              </div>
            </div>

            <div className="lg:pb-0.5">
              <label
                htmlFor="shop-sort"
                className="mb-2 block text-sm font-medium text-ink"
              >
                Sort
              </label>
              <select
                id="shop-sort"
                className="field max-w-xs"
                value={sort}
                onChange={(event) =>
                  updateFilters({ sort: event.target.value })
                }
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div
              role="group"
              aria-labelledby="category-filter-label"
              className="flex flex-wrap items-baseline gap-2"
            >
              <span
                id="category-filter-label"
                className="mr-1 text-sm font-medium text-ink"
              >
                Category
              </span>
              <button
                type="button"
                className="chip"
                aria-pressed={category === "all"}
                onClick={() => updateFilters({ category: null })}
              >
                All
              </button>
              {CATEGORIES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="chip"
                  aria-pressed={category === item.id}
                  onClick={() => updateFilters({ category: item.id })}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div
              role="group"
              aria-labelledby="stage-filter-label"
              className="flex flex-wrap items-baseline gap-2 lg:justify-end"
            >
              <span
                id="stage-filter-label"
                className="mr-1 text-sm font-medium text-ink"
              >
                Stage
              </span>
              <button
                type="button"
                className="chip"
                aria-pressed={stage === "all"}
                onClick={() => updateFilters({ stage: null })}
              >
                All stages
              </button>
              {STAGES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="chip"
                  aria-pressed={stage === item.id}
                  onClick={() => updateFilters({ stage: item.id })}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p
              className="text-sm text-[var(--color-text-secondary)]"
              aria-live="polite"
              aria-atomic="true"
            >
              Showing {filtered.length} of {PRODUCTS.length} pieces
              {hasFilters && activeFilters > 0
                ? ` (${activeFilters} ${activeFilters === 1 ? "filter" : "filters"} active)`
                : ""}
            </p>
            {hasFilters && (
              <button type="button" className="text-button" onClick={clearAll}>
                Clear all
              </button>
            )}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-state mt-10">
            <h2 className="font-display text-2xl text-ink">
              No pieces match that combination.
            </h2>
            <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Try a different stage, a broader search, or clear everything and
              start again.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" className="btn btn-primary" onClick={clearAll}>
                Clear filters
              </button>
              <Link className="btn btn-secondary" to="/shop">
                Browse everything
              </Link>
            </div>
          </div>
        )}

        <p className="mt-12 border-t border-line pt-5 text-xs leading-relaxed text-[var(--color-text-secondary)]">
          Product names, descriptions, sizes, and prices are sample content.
          Photographs are licensed stock used as demonstration imagery, not real
          inventory.
        </p>
      </div>
    </div>
  );
}
