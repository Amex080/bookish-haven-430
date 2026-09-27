import { createFileRoute } from "@tanstack/react-router";
import { renderPage, escapeHtml, formatNaira } from "@/lib/site/layout";
import { getBooks, getCategories } from "@/lib/site/data";
import { bookCard } from "@/lib/site/components";

export const Route = createFileRoute("/")({
  server: {
    handlers: {
      GET: async () => {
        const [books, categories] = await Promise.all([getBooks(), getCategories()]);
        const featured = books.slice(0, 8);
        const counts = new Map<string, number>();
        for (const book of books) counts.set(book.category, (counts.get(book.category) ?? 0) + 1);

        const body = `
<section class="hero">
  <img class="hero-bg" src="/assets/img/hero-books.jpg" alt="Stacked academic textbooks on a library table">
  <div class="container hero-inner">
    <p class="eyebrow">Ekiti State University, Ado-Ekiti</p>
    <h1>Every textbook your course list asks for — ordered online.</h1>
    <p>The official EKSU bookshop brings accounting, economics, sociology, statistics and building technology titles to one shelf, with nationwide delivery and campus pickup.</p>
    <div class="hero-actions">
      <a class="btn btn-gold" href="/books">Browse the catalogue</a>
      <a class="btn btn-outline" style="border-color:#e3c887;color:#e3c887" href="/about">About the bookshop</a>
    </div>
  </div>
</section>

<section class="value-strip">
  <div class="container value-grid">
    <div><h3>Verified editions</h3><p>Titles recommended by lecturers across nine faculties.</p></div>
    <div><h3>Student pricing</h3><p>Naira prices, no hidden charges, delivery flat rate.</p></div>
    <div><h3>Campus &amp; nationwide</h3><p>Pick up at the bookshop or have it delivered to your address.</p></div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <div>
        <p class="eyebrow">Shop by discipline</p>
        <h2>Nine departments, one shelf</h2>
      </div>
      <a class="btn btn-ghost btn-sm" href="/books">View all titles</a>
    </div>
    <div class="category-grid">
      ${categories
        .map(
          (category) => `<a class="category-card" href="/books?category=${category.slug}">
            <strong>${escapeHtml(category.name)}</strong>
            <span>${counts.get(category.name) ?? 0} title(s)</span>
          </a>`,
        )
        .join("")}
    </div>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="container">
    <div class="section-head">
      <div>
        <p class="eyebrow">Fresh on the shelf</p>
        <h2>Featured titles</h2>
      </div>
    </div>
    <div class="book-grid">${featured.map(bookCard).join("")}</div>
    <p class="center" style="margin-top:2rem">
      <a class="btn btn-primary" href="/books">See all ${books.length} titles</a>
    </p>
  </div>
</section>

<section class="section-tight" style="background:#fff;border-top:1px solid var(--line)">
  <div class="container info-grid">
    <div><h3>Opening hours</h3><p class="muted">Monday to Friday, 8:00am – 5:00pm. Saturday, 9:00am – 1:00pm.</p></div>
    <div><h3>Delivery</h3><p class="muted">Flat ${formatNaira(1500)} nationwide, 2–5 working days.</p></div>
    <div><h3>Bulk orders</h3><p class="muted">Departments and student associations enjoy negotiated rates.</p></div>
  </div>
</section>`;

        return renderPage({
          title: "Academic textbooks for every discipline",
          description:
            "The official online bookshop of Ekiti State University, Ado-Ekiti. Browse and order academic textbooks across accounting, economics, e-commerce, sociology and more.",
          body,
          active: "home",
          path: "/",
        });
      },
    },
  },
});
