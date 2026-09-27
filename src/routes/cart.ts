import { createFileRoute } from "@tanstack/react-router";
import { renderPage } from "@/lib/site/layout";

export const Route = createFileRoute("/cart")({
  server: {
    handlers: {
      GET: () =>
        renderPage({
          title: "Your shopping cart",
          description:
            "Review the textbooks in your Ekiti State University bookshop cart before checking out.",
          active: "",
          path: "/cart",
          scripts: ["/assets/js/cart.js"],
          body: `
<section class="page-banner">
  <div class="container">
    <p class="eyebrow">Shopping cart</p>
    <h1>Your selected titles</h1>
    <p>Adjust quantities before you proceed to checkout.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div id="cart-empty" class="empty-state hidden">
      <h2>Your cart is empty</h2>
      <p class="muted">Browse the catalogue and add the titles on your course list.</p>
      <a class="btn btn-primary" href="/books">Browse catalogue</a>
    </div>
    <div id="cart-content" class="layout-split hidden">
      <div class="panel" id="cart-list"></div>
      <aside class="panel">
        <h2 style="font-size:1.2rem">Order summary</h2>
        <div id="cart-summary"></div>
      </aside>
    </div>
  </div>
</section>`,
        }),
    },
  },
});
