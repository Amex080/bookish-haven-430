import { createFileRoute } from "@tanstack/react-router";
import { renderPage, escapeHtml } from "@/lib/site/layout";
import { getBooks, getCategories } from "@/lib/site/data";
import { bookCard } from "@/lib/site/components";

export const Route = createFileRoute("/books")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const category = url.searchParams.get("category");
        const [books, categories] = await Promise.all([getBooks(category), getCategories()]);
        const current = categories.find((item) => item.slug === category);

        const body = `
<section class="page-banner">
  <div class="container">
    <p class="eyebrow">Catalogue</p>
    <h1>${current ? escapeHtml(current.name) : "All titles"}</h1>
    <p>${books.length} title(s) available for order and delivery.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <nav class="filters" aria-label="Filter by discipline">
      <a class="chip${category ? "" : " is-active"}" href="/books">All</a>
      ${categories
        .map(
          (item) =>
            `<a class="chip${item.slug === category ? " is-active" : ""}" href="/books?category=${item.slug}">${escapeHtml(item.name)}</a>`,
        )
        .join("")}
    </nav>
    ${
      books.length
        ? `<div class="book-grid">${books.map(bookCard).join("")}</div>`
        : `<div class="empty-state"><h2>No titles here yet</h2><p class="muted">Try another discipline or browse the full catalogue.</p><a class="btn btn-primary" href="/books">View all titles</a></div>`
    }
  </div>
</section>`;

        return renderPage({
          title: current ? `${current.name} textbooks` : "Catalogue of academic textbooks",
          description: current
            ? `Order ${current.name} textbooks from the Ekiti State University online bookshop, with nationwide delivery.`
            : "Browse every academic textbook stocked by the Ekiti State University online bookshop across nine disciplines.",
          body,
          active: "books",
          path: "/books",
        });
      },
    },
  },
});
