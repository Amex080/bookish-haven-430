// Site-wide behaviour: cart badge, account link, mobile navigation, add-to-cart buttons.
import { addToCart, cartCount, getSession } from "./store.js";

const refreshBadge = () => {
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = String(cartCount());
};

const refreshAccountLink = () => {
  const link = document.getElementById("account-link");
  if (!link) return;
  const session = getSession();
  link.textContent = session ? "My account" : "Sign in";
};

document.addEventListener("cart:change", refreshBadge);

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add-to-cart]");
  if (!button) return;
  const { id, title, price, cover } = button.dataset;
  addToCart({ id, title, price: Number(price), cover }, 1);
  const original = button.textContent;
  button.textContent = "Added \u2713";
  button.disabled = true;
  setTimeout(() => {
    button.textContent = original;
    button.disabled = false;
  }, 1200);
});

const toggle = document.getElementById("nav-toggle");
toggle?.addEventListener("click", () => {
  const nav = document.querySelector(".site-nav");
  const open = nav?.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(Boolean(open)));
});

refreshBadge();
refreshAccountLink();
