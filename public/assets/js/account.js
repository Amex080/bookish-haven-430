// Account page: register, sign in, and review past orders.
import { api, getSession, saveSession, clearSession, showMessage, formatNaira } from "./store.js";

const authPanel = document.getElementById("auth-panel");
const accountPanel = document.getElementById("account-panel");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const feedback = document.getElementById("auth-feedback");
const who = document.getElementById("account-who");
const ordersBox = document.getElementById("account-orders");
const signOutBtn = document.getElementById("sign-out");

async function loadOrders() {
  ordersBox.innerHTML = "<p class='muted'>Loading your orders...</p>";
  try {
    const { orders } = await api("/api/public/account/orders", { auth: true });
    if (!orders.length) {
      ordersBox.innerHTML = "<p class='muted'>You have not placed an order yet.</p>";
      return;
    }
    ordersBox.innerHTML = orders
      .map(
        (order) => `
        <article class="order-card">
          <header>
            <span>${new Date(order.created_at).toLocaleDateString("en-NG", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}</span>
            <span>Ref ${order.id.slice(0, 8).toUpperCase()} &middot; ${order.status}</span>
          </header>
          <ul>
            ${order.items
              .map(
                (item) =>
                  `<li><span>${item.title} &times; ${item.quantity}</span><span>${formatNaira(
                    item.unit_price * item.quantity,
                  )}</span></li>`,
              )
              .join("")}
          </ul>
          <div class="summary-total"><span>Total</span><span>${formatNaira(order.total)}</span></div>
        </article>`,
      )
      .join("");
  } catch (error) {
    ordersBox.innerHTML = `<p class="alert alert-error">${error.message}</p>`;
  }
}

function render() {
  const session = getSession();
  if (session) {
    authPanel.classList.add("hidden");
    accountPanel.classList.remove("hidden");
    who.textContent = session.email;
    loadOrders();
  } else {
    authPanel.classList.remove("hidden");
    accountPanel.classList.add("hidden");
  }
}

loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const body = Object.fromEntries(new FormData(loginForm).entries());
  try {
    const session = await api("/api/public/auth/login", { method: "POST", body });
    saveSession(session);
    render();
  } catch (error) {
    showMessage(feedback, error.message, "error");
  }
});

registerForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const body = Object.fromEntries(new FormData(registerForm).entries());
  try {
    const session = await api("/api/public/auth/register", { method: "POST", body });
    saveSession(session);
    registerForm.reset();
    render();
  } catch (error) {
    showMessage(feedback, error.message, "error");
  }
});

signOutBtn?.addEventListener("click", () => {
  clearSession();
  render();
});

render();
