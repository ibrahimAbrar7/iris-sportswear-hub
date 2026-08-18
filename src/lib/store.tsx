import {
  createContext, useContext, useEffect, useMemo, useState, type ReactNode,
} from "react";
import { products, type Product } from "@/data/catalog";

export interface CartLine {
  slug: string;
  size: string;
  color: string;
  qty: number;
}

interface StoreValue {
  lines: CartLine[];
  wishlist: string[];
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  add: (p: Product, size: string, color: string, qty?: number) => void;
  remove: (slug: string, size: string, color: string) => void;
  setQty: (slug: string, size: string, color: string, qty: number) => void;
  clear: () => void;
  toggleWish: (slug: string) => void;
  count: number;
  subtotal: number;
}

const StoreContext = createContext<StoreValue | null>(null);
const KEY = "iris-store-v1";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setLines(parsed.lines ?? []);
        setWishlist(parsed.wishlist ?? []);
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ lines, wishlist }));
    } catch { /* ignore */ }
  }, [lines, wishlist]);

  const value = useMemo<StoreValue>(() => {
    const priceOf = (slug: string) => {
      const p = products.find((x) => x.slug === slug);
      return p ? (p.salePrice ?? p.price) : 0;
    };
    return {
      lines,
      wishlist,
      cartOpen,
      setCartOpen,
      add: (p, size, color, qty = 1) =>
        setLines((prev) => {
          const i = prev.findIndex((l) => l.slug === p.slug && l.size === size && l.color === color);
          if (i > -1) {
            const next = [...prev];
            next[i] = { ...next[i], qty: next[i].qty + qty };
            return next;
          }
          return [...prev, { slug: p.slug, size, color, qty }];
        }),
      remove: (slug, size, color) =>
        setLines((prev) => prev.filter((l) => !(l.slug === slug && l.size === size && l.color === color))),
      setQty: (slug, size, color, qty) =>
        setLines((prev) =>
          prev.flatMap((l) =>
            l.slug === slug && l.size === size && l.color === color
              ? qty <= 0 ? [] : [{ ...l, qty }]
              : [l],
          ),
        ),
      clear: () => setLines([]),
      toggleWish: (slug) =>
        setWishlist((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug])),
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + priceOf(l.slug) * l.qty, 0),
    };
  }, [lines, wishlist, cartOpen]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
