import { escapeHtml, formatNaira } from "./layout";
import type { BookRow } from "./data";

export function bookCard(book: BookRow): string {
  return `
<article class="book-card">
  <div class="book-cover" style="background:linear-gradient(160deg, ${escapeHtml(book.cover)} 0%, #101a2e 100%)">
    <span>${escapeHtml(book.title)}</span>
  </div>
  <div class="book-body">
    <p class="book-tag">${escapeHtml(book.category)}</p>
    <h3 class="book-title">${escapeHtml(book.title)}</h3>
    <p class="book-author">by ${escapeHtml(book.author)}</p>
    <p class="book-desc">${escapeHtml(book.description)}</p>
    <div class="book-foot">
      <span class="price">${formatNaira(book.price)}</span>
      <button class="btn btn-primary btn-sm" data-add-to-cart
        data-id="${escapeHtml(book.id)}"
        data-title="${escapeHtml(book.title)}"
        data-price="${book.price}"
        data-cover="${escapeHtml(book.cover)}">Add to cart</button>
    </div>
  </div>
</article>`;
}
