import { createFileRoute, Link } from "@tanstack/react-router";
import { BOOKS, CATEGORIES } from "@/lib/books";
import { BookCard } from "@/components/BookCard";

type Search = { category?: string };

export const Route = createFileRoute("/books")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    category: typeof s.category === "string" ? s.category : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Catalogue — EKSU Online Bookshop" },
      { name: "description", content: "Browse academic textbooks across nine disciplines at EKSU Bookshop." },
      { property: "og:title", content: "EKSU Bookshop Catalogue" },
      { property: "og:description", content: "Academic titles across accounting, economics, e-commerce, sociology and more." },
    ],
  }),
  component: BooksPage,
});

function BooksPage() {
  const { category } = Route.useSearch();
  const filtered = category ? BOOKS.filter((b) => b.category === category) : BOOKS;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-10">
        <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Catalogue</div>
        <h1 className="mt-2 font-serif text-4xl">{category ?? "All titles"}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "title" : "titles"} available.
        </p>
      </header>

      <div className="mb-10 flex flex-wrap gap-2">
        <Link
          to="/books"
          className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
            !category ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
          }`}
        >
          All
        </Link>
        {CATEGORIES.map((c) => {
          const active = category === c;
          return (
            <Link
              key={c}
              to="/books"
              search={{ category: c }}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
                active ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {c}
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>
    </div>
  );
}
