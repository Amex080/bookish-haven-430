import { createFileRoute } from "@tanstack/react-router";
import { renderPage } from "@/lib/site/layout";

export const Route = createFileRoute("/checkout")({
  server: {
    handlers: {
      GET: () =>
        renderPage({
          title: "Checkout and delivery details",
          description:
            "Enter your delivery details to complete your order at the Ekiti State University online bookshop.",
          active: "",
          path: "/checkout",
          scripts: ["/assets/js/checkout.js"],
          body: `
<section class="page-banner">
  <div class="container">
    <p class="eyebrow">Checkout</p>
    <h1>Delivery details</h1>
    <p>Orders are confirmed by email and dispatched within two working days.</p>
  </div>
</section>

<section class="section">
  <div class="container layout-split">
    <div class="panel">
      <div id="checkout-feedback" class="hidden"></div>
      <div id="checkout-empty" class="empty-state hidden">
        <h2>Nothing to check out</h2>
        <p class="muted">Add a few titles to your cart first.</p>
        <a class="btn btn-primary" href="/books">Browse catalogue</a>
      </div>
      <form id="checkout-form" novalidate>
        <div class="field-row">
          <div class="field">
            <label for="surname">Surname</label>
            <input id="surname" name="surname" required autocomplete="family-name">
          </div>
          <div class="field">
            <label for="firstName">First name</label>
            <input id="firstName" name="firstName" required autocomplete="given-name">
          </div>
        </div>
        <div class="field-row">
          <div class="field">
            <label for="email">Email address</label>
            <input id="email" name="email" type="email" required autocomplete="email">
          </div>
          <div class="field">
            <label for="phone">Phone number</label>
            <input id="phone" name="phone" type="tel" required autocomplete="tel">
          </div>
        </div>
        <div class="field-row">
          <div class="field">
            <label for="gender">Gender</label>
            <select id="gender" name="gender">
              <option value="">Select</option>
              <option>Female</option>
              <option>Male</option>
              <option>Prefer not to say</option>
            </select>
          </div>
          <div class="field">
            <label for="country">Country</label>
            <input id="country" name="country" value="Nigeria" required autocomplete="country-name">
          </div>
        </div>
        <div class="field-row">
          <div class="field">
            <label for="zip">Zip / postal code</label>
            <input id="zip" name="zip" autocomplete="postal-code">
          </div>
          <div class="field">
            <label for="office">Office (optional)</label>
            <input id="office" name="office">
          </div>
        </div>
        <div class="field">
          <label for="address">Delivery address</label>
          <textarea id="address" name="address" required autocomplete="street-address"></textarea>
        </div>
        <button class="btn btn-primary btn-block" type="submit">Place order</button>
        <p class="form-note" style="margin-top:.8rem">Payment is completed on delivery or at the bookshop counter.</p>
      </form>
    </div>
    <aside class="panel">
      <h2 style="font-size:1.2rem">Order summary</h2>
      <div id="checkout-summary"></div>
    </aside>
  </div>
</section>`,
        }),
    },
  },
});
