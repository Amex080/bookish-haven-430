import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { BOOKS, type Book } from "./books";

export type CartItem = { book: Book; qty: number };

type CartCtx = {
  items: CartItem[];
  add: (id: string) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "polynek-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const rows: { id: string; qty: number }[] = JSON.parse(raw);
        setItems(
          rows
            .map((r) => {
              const book = BOOKS.find((b) => b.id === r.id);
              return book ? { book, qty: r.qty } : null;
            })
            .filter(Boolean) as CartItem[],
        );
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY, JSON.stringify(items.map((i) => ({ id: i.book.id, qty: i.qty }))));
  }, [items, hydrated]);

  const add = (id: string) =>
    setItems((prev) => {
      const found = prev.find((i) => i.book.id === id);
      if (found) return prev.map((i) => (i.book.id === id ? { ...i, qty: i.qty + 1 } : i));
      const book = BOOKS.find((b) => b.id === id);
      if (!book) return prev;
      return [...prev, { book, qty: 1 }];
    });

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.book.id !== id));
  const setQty = (id: string, qty: number) =>
    setItems((prev) => (qty <= 0 ? prev.filter((i) => i.book.id !== id) : prev.map((i) => (i.book.id === id ? { ...i, qty } : i))));
  const clear = () => setItems([]);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.book.price, 0);

  return <Ctx.Provider value={{ items, add, remove, setQty, clear, count, total }}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
