import { beforeEach, describe, expect, it } from "vitest";
import {
  CART_STORAGE_KEY,
  normaliseLines,
  readCart,
  writeCart,
  type CartLine,
} from "./cart-storage";

const shirtLine: CartLine = {
  slug: "the-poplin-shirt",
  size: "7–8Y",
  quantity: 1,
};

describe("cart storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("merges duplicate product and size lines", () => {
    const merged = normaliseLines([
      shirtLine,
      { ...shirtLine, quantity: 2 },
    ]);
    expect(merged).toEqual([{ ...shirtLine, quantity: 3 }]);
  });

  it("caps merged quantities at ten", () => {
    const merged = normaliseLines([
      { ...shirtLine, quantity: 8 },
      { ...shirtLine, quantity: 8 },
    ]);
    expect(merged[0].quantity).toBe(10);
  });

  it("ignores unknown products and bad quantities", () => {
    const merged = normaliseLines([
      shirtLine,
      { slug: "not-a-product", size: "7–8Y", quantity: 1 },
      { ...shirtLine, size: "9–10Y", quantity: 0 },
      { ...shirtLine, size: "11–12Y", quantity: 1.5 },
    ]);
    expect(merged).toEqual([shirtLine]);
  });

  it("returns an empty bag for missing or malformed storage", () => {
    expect(readCart()).toEqual([]);
    localStorage.setItem(CART_STORAGE_KEY, "{not json");
    expect(readCart()).toEqual([]);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ lines: [] }));
    expect(readCart()).toEqual([]);
  });

  it("round-trips valid lines", () => {
    writeCart([shirtLine, { slug: "the-wool-blazer", size: "13–14Y", quantity: 2 }]);
    expect(readCart()).toEqual([
      shirtLine,
      { slug: "the-wool-blazer", size: "13–14Y", quantity: 2 },
    ]);
    expect(localStorage.getItem(CART_STORAGE_KEY)).toContain("the-poplin-shirt");
  });
});
