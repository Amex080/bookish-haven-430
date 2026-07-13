import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, ShieldCheck, Truck } from "lucide-react";
import heroImg from "@/assets/hero-books.jpg";
import { BOOKS, CATEGORIES } from "@/lib/books";
import { BookCard } from "@/components/BookCard";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const featured = BOOKS.slice(0, 4);
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <img
          src={heroImg}
          alt="Open book under a brass reading lamp"
          width={1600}
          height={1100}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/30" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-2 md:py-32">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-primary-foreground/80">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Ekiti State University
            </div>
            <h1 className="font-serif text-4xl leading-tight md:text-6xl">
              Every course, <span className="italic text-gold">every chapter</span> — delivered.
            </h1>
            <p className="mt-6 max-w-lg text-base text-primary-foreground/75">
              The official online bookshop of Ekiti State University, Ado-Ekiti. Browse recommended textbooks
              across nine faculties and order without queueing at the counter.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/books"
                className="inline-flex items-center gap-2 rounded-sm bg-gold px-5 py-3 text-sm font-semibold text-gold-foreground transition hover:brightness-105"
              >
                Browse the catalogue <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-sm border border-primary-foreground/30 px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10"
              >
                About the bookshop
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value strip */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-3">
          {[
            { icon: BookOpen, title: "Curated for your syllabus", body: "Titles selected with faculty across nine departments." },
            { icon: Truck, title: "Delivery nationwide", body: "Ship to campus, home or hostel across Nigeria." },
            { icon: ShieldCheck, title: "Secure checkout", body: "Merchant-account payments protected end-to-end." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-sm bg-primary/5 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="font-serif text-lg text-foreground">{title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Departments</div>
            <h2 className="mt-2 font-serif text-3xl">Shop by discipline</h2>
          </div>
          <Link to="/books" className="hidden text-sm text-primary hover:text-gold md:inline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              to="/books"
              search={{ category: c }}
              className="group relative overflow-hidden rounded-sm border border-border bg-card p-6 transition hover:border-gold hover:shadow-[var(--shadow-book)]"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Faculty</div>
              <div className="mt-2 font-serif text-xl text-foreground">{c}</div>
              <ArrowRight className="mt-6 h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-gold" />
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-10">
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Best sellers</div>
            <h2 className="mt-2 font-serif text-3xl">Recommended this semester</h2>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {featured.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/books" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-gold">
              See the full catalogue <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
