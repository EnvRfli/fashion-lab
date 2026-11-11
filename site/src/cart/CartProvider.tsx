import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { PRODUCT_BY_SLUG } from "../data/products";
import {
  MAX_QUANTITY,
  readCart,
  writeCart,
  type CartLine,
} from "./cart-storage";
import { CartContext } from "./CartContext";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => readCart());

  useEffect(() => {
    writeCart(lines);
  }, [lines]);

  const addItem = useCallback(
    (slug: string, size: string, quantity: number) => {
      if (!PRODUCT_BY_SLUG.has(slug) || !size) return;
      const safeQuantity = Math.min(
        MAX_QUANTITY,
        Math.max(1, Math.trunc(quantity)),
      );
      setLines((current) => {
        const existing = current.find(
          (line) => line.slug === slug && line.size === size,
        );
        if (existing) {
          return current.map((line) =>
            line.slug === slug && line.size === size
              ? {
                  ...line,
                  quantity: Math.min(
                    MAX_QUANTITY,
                    line.quantity + safeQuantity,
                  ),
                }
              : line,
          );
        }
        return [...current, { slug, size, quantity: safeQuantity }];
      });
    },
    [],
  );

  const updateQuantity = useCallback(
    (slug: string, size: string, quantity: number) => {
      const safeQuantity = Math.min(
        MAX_QUANTITY,
        Math.max(1, Math.trunc(quantity)),
      );
      setLines((current) =>
        current.map((line) =>
          line.slug === slug && line.size === size
            ? { ...line, quantity: safeQuantity }
            : line,
        ),
      );
    },
    [],
  );

  const removeItem = useCallback((slug: string, size: string) => {
    setLines((current) =>
      current.filter((line) => !(line.slug === slug && line.size === size)),
    );
  }, []);

  const value = useMemo(() => {
    const count = lines.reduce((total, line) => total + line.quantity, 0);
    const subtotal = lines.reduce((total, line) => {
      const product = PRODUCT_BY_SLUG.get(line.slug);
      return total + (product ? product.price * line.quantity : 0);
    }, 0);
    return { lines, count, subtotal, addItem, updateQuantity, removeItem };
  }, [lines, addItem, updateQuantity, removeItem]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
