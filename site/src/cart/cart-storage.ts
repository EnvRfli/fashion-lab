import { PRODUCT_BY_SLUG } from "../data/products";

export const CART_STORAGE_KEY = "fairholt.bag.v1";
export const MAX_QUANTITY = 10;

export interface CartLine {
  slug: string;
  size: string;
  quantity: number;
}

function isValidLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false;
  const line = value as Record<string, unknown>;
  if (typeof line.slug !== "string" || !PRODUCT_BY_SLUG.has(line.slug)) {
    return false;
  }
  if (typeof line.size !== "string" || line.size.length === 0) return false;
  if (
    typeof line.quantity !== "number" ||
    !Number.isInteger(line.quantity) ||
    line.quantity < 1 ||
    line.quantity > MAX_QUANTITY
  ) {
    return false;
  }
  return true;
}

export function normaliseLines(lines: CartLine[]): CartLine[] {
  const merged = new Map<string, CartLine>();
  for (const line of lines) {
    if (!isValidLine(line)) continue;
    const key = `${line.slug}::${line.size}`;
    const existing = merged.get(key);
    if (existing) {
      existing.quantity = Math.min(
        MAX_QUANTITY,
        existing.quantity + line.quantity,
      );
    } else {
      merged.set(key, { ...line });
    }
  }
  return [...merged.values()];
}

function getStorage(): Storage | undefined {
  try {
    return globalThis.localStorage;
  } catch {
    return undefined;
  }
}

export function readCart(storage: Storage | undefined = getStorage()): CartLine[] {
  if (!storage) return [];
  try {
    const raw = storage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return normaliseLines(parsed.filter(isValidLine));
  } catch {
    return [];
  }
}

export function writeCart(
  lines: CartLine[],
  storage: Storage | undefined = getStorage(),
): void {
  if (!storage) return;
  try {
    storage.setItem(CART_STORAGE_KEY, JSON.stringify(normaliseLines(lines)));
  } catch {
    // Storage can be unavailable or full. The in-memory cart still works.
  }
}
