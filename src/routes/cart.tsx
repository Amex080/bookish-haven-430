import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatNaira } from "@/lib/books";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — POLYNEK Bookshop" },
      { name: "description", content: "Review the books in your cart before checkout." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-serif text-4xl">Your cart is empty</h1>
        <p className="mt-3 text-muted-foreground">Start browsing the catalogue to find your recommended titles.</p>
        <Link
          to="/books"
          className="mt-8 inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Browse catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-serif text-4xl">Your cart</h1>
      <p className="mt-2 text-sm text-muted-foreground">Review your selection before proceeding to checkout.</p>

      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_360px]">
        <ul className="divide-y divide-border rounded-sm border border-border bg-card">
          {items.map(({ book, qty }) => (
            <li key={book.id} className="flex gap-4 p-5">
              <div className={`h-24 w-16 shrink-0 rounded-sm bg-gradient-to-br ${book.cover}`} />
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-serif text-lg text-foreground">{book.title}</div>
                    <div className="text-xs text-muted-foreground">{book.author} · {book.category}</div>
                  </div>
                  <button onClick={() => remove(book.id)} className="text-muted-foreground hover:text-destructive" aria-label="Remove">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="inline-flex items-center rounded-sm border border-border">
                    <button onClick={() => setQty(book.id, qty - 1)} className="grid h-8 w-8 place-items-center text-muted-foreground hover:text-foreground" aria-label="Decrease">
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{qty}</span>
                    <button onClick={() => setQty(book.id, qty + 1)} className="grid h-8 w-8 place-items-center text-muted-foreground hover:text-foreground" aria-label="Increase">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="text-sm font-semibold">{formatNaira(book.price * qty)}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-sm border border-border bg-card p-6">
          <h2 className="font-serif text-xl">Order summary</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-medium">{formatNaira(total)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Delivery</dt>
              <dd className="font-medium">Calculated at checkout</dd>
            </div>
            <div className="mt-4 flex justify-between border-t border-border pt-4 text-base">
              <dt className="font-serif">Total</dt>
              <dd className="font-semibold">{formatNaira(total)}</dd>
            </div>
          </dl>
          <Link
            to="/checkout"
            className="mt-6 inline-flex w-full items-center justify-center rounded-sm bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}
