import { createContext } from "react";
import type { CartLine } from "./cart-storage";

export interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  addItem: (slug: string, size: string, quantity: number) => void;
  updateQuantity: (slug: string, size: string, quantity: number) => void;
  removeItem: (slug: string, size: string) => void;
}

export const CartContext = createContext<CartContextValue | null>(null);
