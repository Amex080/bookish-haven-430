// Cart page: renders the basket held in the browser and keeps it in sync.
import { getCart, setQuantity, removeFromCart, cartTotal, formatNaira } from "./store.js";

const list = document.getElementById("cart-list");
const summary = document.getElementById("cart-summary");
const empty = document.getElementById("cart-empty");
const content = document.getElementById("cart-content");

const DELIVERY = 1500;

function render() {
  const items = getCart();
  if (!items.length) {
    empty.classList.remove("hidden");
    content.classList.add("hidden");
    return;
  }
  empty.classList.add("hidden");
  content.classList.remove("hidden");

  list.innerHTML = items
    .map(
      (item) => `
      <div class="cart-row">
        <div class="cart-thumb" style="background:${item.cover || "#14213d"}"></div>
        <div>
          <p class="cart-title">${item.title}</p>
          <p class="cart-meta">${formatNaira(item.price)} each</p>
          <button class="link-danger" data-remove="${item.id}">Remove</button>
        </div>
        <div style="text-align:right">
          <div class="qty">
            <button data-dec="${item.id}" aria-label="Decrease quantity">&minus;</button>
            <span>${item.quantity}</span>
            <button data-inc="${item.id}" aria-label="Increase quantity">+</button>
          </div>
          <p class="price" style="margin:.4rem 0 0">${formatNaira(item.price * item.quantity)}</p>
        </div>
      </div>`,
    )
    .join("");

  const subtotal = cartTotal(items);
  summary.innerHTML = `
    <div class="summary-line"><span>Subtotal</span><span>${formatNaira(subtotal)}</span></div>
    <div class="summary-line"><span>Delivery</span><span>${formatNaira(DELIVERY)}</span></div>
    <div class="summary-total"><span>Total</span><span>${formatNaira(subtotal + DELIVERY)}</span></div>
    <a class="btn btn-primary btn-block" style="margin-top:1rem" href="/checkout">Proceed to checkout</a>`;
}

list?.addEventListener("click", (event) => {
  const target = event.target.closest("button");
  if (!target) return;
  const items = getCart();
  const find = (id) => items.find((item) => item.id === id);
  if (target.dataset.inc) setQuantity(target.dataset.inc, find(target.dataset.inc).quantity + 1);
  if (target.dataset.dec) setQuantity(target.dataset.dec, find(target.dataset.dec).quantity - 1);
  if (target.dataset.remove) removeFromCart(target.dataset.remove);
});

document.addEventListener("cart:change", render);
render();
