import { describe, expect, it } from "vitest";
import {
  DEFAULT_FILTERS,
  countActiveFilters,
  filterProducts,
} from "./filter-products";

describe("filterProducts", () => {
  it("returns the full six-piece catalogue by default", () => {
    expect(filterProducts(DEFAULT_FILTERS)).toHaveLength(6);
  });

  it("filters by category", () => {
    const result = filterProducts({ ...DEFAULT_FILTERS, category: "shirts" });
    expect(result.map((product) => product.slug)).toEqual(["the-poplin-shirt"]);
  });

  it("filters by stage without inventing stock", () => {
    const juniors = filterProducts({ ...DEFAULT_FILTERS, stage: "junior" });
    expect(juniors.map((product) => product.slug)).toEqual([
      "the-poplin-shirt",
      "the-striped-knit",
      "the-cotton-skirt",
    ]);
  });

  it("combines category and stage filters", () => {
    const result = filterProducts({
      ...DEFAULT_FILTERS,
      category: "skirts-trousers",
      stage: "senior",
    });
    expect(result.map((product) => product.slug)).toEqual([
      "the-cotton-skirt",
      "the-twill-trouser",
    ]);
  });

  it("searches name, category, and description case-insensitively", () => {
    expect(
      filterProducts({ ...DEFAULT_FILTERS, query: "BLAZER" }).map(
        (product) => product.slug,
      ),
    ).toEqual(["the-wool-blazer"]);
    expect(
      filterProducts({ ...DEFAULT_FILTERS, query: "crewneck" }).map(
        (product) => product.slug,
      ),
    ).toEqual(["the-striped-knit"]);
  });

  it("returns an empty list for an impossible combination", () => {
    expect(
      filterProducts({
        ...DEFAULT_FILTERS,
        category: "shirts",
        stage: "sixth",
      }),
    ).toEqual([]);
  });

  it("sorts by price and name", () => {
    const ascending = filterProducts({
      ...DEFAULT_FILTERS,
      sort: "price-asc",
    });
    expect(ascending[0].price).toBe(26);
    expect(ascending.at(-1)?.price).toBe(78);

    const descending = filterProducts({
      ...DEFAULT_FILTERS,
      sort: "price-desc",
    });
    expect(descending[0].price).toBe(78);

    const byName = filterProducts({ ...DEFAULT_FILTERS, sort: "name" });
    expect(byName.map((product) => product.name)).toEqual([
      "The Cotton Skirt",
      "The Leather Loafer",
      "The Poplin Shirt",
      "The Striped Knit",
      "The Twill Trouser",
      "The Wool Blazer",
    ]);
  });
});

describe("countActiveFilters", () => {
  it("counts each non-default filter once", () => {
    expect(countActiveFilters(DEFAULT_FILTERS)).toBe(0);
    expect(
      countActiveFilters({
        query: "shirt",
        category: "shirts",
        stage: "junior",
        sort: "price-asc",
      }),
    ).toBe(4);
  });
});
