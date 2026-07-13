import { formatNaira, type Book } from "@/lib/books";
import { useCart } from "@/lib/cart";
import { Plus } from "lucide-react";

export function BookCard({ book }: { book: Book }) {
  const { add } = useCart();
  return (
    <article className="group flex flex-col">
      <div className={`relative aspect-[3/4] overflow-hidden rounded-sm bg-gradient-to-br ${book.cover} shadow-[var(--shadow-book)]`}>
        <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-white/10 to-transparent" />
        <div className="absolute left-0 top-6 h-[calc(100%-3rem)] w-1 bg-black/25" />
        <div className="absolute inset-0 flex flex-col justify-between p-5 text-white">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-white/60">{book.category}</div>
            <h3 className="mt-2 font-serif text-lg leading-tight">{book.title}</h3>
          </div>
          <div className="text-xs italic text-white/70">{book.author}</div>
        </div>
        <button
          onClick={() => add(book.id)}
          className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-gold text-gold-foreground opacity-0 shadow-lg transition group-hover:opacity-100"
          aria-label={`Add ${book.title} to cart`}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <div className="font-serif text-base text-foreground">{book.title}</div>
          <div className="text-xs text-muted-foreground">{book.author}</div>
        </div>
        <div className="whitespace-nowrap text-sm font-semibold text-foreground">{formatNaira(book.price)}</div>
      </div>
    </article>
  );
}
