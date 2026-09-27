// Checkout page: order summary plus delivery details submitted to the Node server.
import { getCart, cartTotal, clearCart, formatNaira, api, showMessage } from "./store.js";

const DELIVERY = 1500;
const summary = document.getElementById("checkout-summary");
const form = document.getElementById("checkout-form");
const feedback = document.getElementById("checkout-feedback");
const emptyNote = document.getElementById("checkout-empty");

function renderSummary() {
  const items = getCart();
  if (!items.length) {
    emptyNote?.classList.remove("hidden");
    form?.classList.add("hidden");
    summary.innerHTML = "";
    return;
  }
  const subtotal = cartTotal(items);
  summary.innerHTML = `
    ${items
      .map(
        (item) =>
          `<div class="summary-line"><span>${item.title} &times; ${item.quantity}</span><span>${formatNaira(
            item.price * item.quantity,
          )}</span></div>`,
      )
      .join("")}
    <div class="summary-line"><span>Delivery</span><span>${formatNaira(DELIVERY)}</span></div>
    <div class="summary-total"><span>Total</span><span>${formatNaira(subtotal + DELIVERY)}</span></div>`;
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const items = getCart();
  if (!items.length) return;

  const data = Object.fromEntries(new FormData(form).entries());
  const button = form.querySelector("button[type=submit]");
  button.disabled = true;
  button.textContent = "Placing order...";

  try {
    const result = await api("/api/public/orders", {
      method: "POST",
      auth: true,
      body: {
        customer: data,
        items: items.map((item) => ({
          id: item.id,
          title: item.title,
          price: Number(item.price),
          quantity: item.quantity,
        })),
        delivery: DELIVERY,
      },
    });
    clearCart();
    form.classList.add("hidden");
    summary.innerHTML = "";
    showMessage(
      feedback,
      `Thank you, ${data.firstName}. Your order has been received. Reference: ${result.reference}.`,
      "success",
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    showMessage(feedback, error.message, "error");
  } finally {
    button.disabled = false;
    button.textContent = "Place order";
  }
});

renderSummary();
