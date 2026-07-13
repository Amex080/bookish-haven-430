import { Link } from "@tanstack/react-router";
import { BookOpen, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

export function SiteHeader() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-sm bg-primary text-primary-foreground">
            <BookOpen className="h-4 w-4" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-lg font-semibold text-foreground">EKSU</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Bookshop</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <Link to="/" className="hover:text-foreground [&.active]:text-foreground">Home</Link>
          <Link to="/books" className="hover:text-foreground [&.active]:text-foreground">Catalogue</Link>
          <Link to="/about" className="hover:text-foreground [&.active]:text-foreground">About</Link>
          <Link to="/contact" className="hover:text-foreground [&.active]:text-foreground">Contact</Link>
        </nav>
        <Link
          to="/cart"
          className="relative inline-flex items-center gap-2 rounded-sm border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition hover:border-gold"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>Cart</span>
          {count > 0 && (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1.5 text-[11px] font-semibold text-gold-foreground">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
