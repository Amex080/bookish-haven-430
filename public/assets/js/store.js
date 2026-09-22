// Shared vanilla JavaScript (ES6+) module: cart storage, session and helpers.

const CART_KEY = "eksu-cart-v1";
const SESSION_KEY = "eksu-session-v1";

export const formatNaira = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);

export const getCart = () => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveCart = (items) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  document.dispatchEvent(new CustomEvent("cart:change", { detail: items }));
};

export const addToCart = (book, quantity = 1) => {
  const items = getCart();
  const existing = items.find((item) => item.id === book.id);
  if (existing) existing.quantity += quantity;
  else items.push({ ...book, quantity });
  saveCart(items);
};

export const setQuantity = (id, quantity) => {
  const items = getCart()
    .map((item) => (item.id === id ? { ...item, quantity } : item))
    .filter((item) => item.quantity > 0);
  saveCart(items);
};

export const removeFromCart = (id) => saveCart(getCart().filter((item) => item.id !== id));
export const clearCart = () => saveCart([]);
export const cartTotal = (items = getCart()) =>
  items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
export const cartCount = (items = getCart()) =>
  items.reduce((sum, item) => sum + item.quantity, 0);

// ---- session (customer accounts) ----
export const getSession = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
};
export const saveSession = (session) => localStorage.setItem(SESSION_KEY, JSON.stringify(session));
export const clearSession = () => localStorage.removeItem(SESSION_KEY);

export async function api(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const session = getSession();
    if (session?.access_token) headers.Authorization = `Bearer ${session.access_token}`;
  }
  const response = await fetch(path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`);
  return data;
}

export function showMessage(element, text, type = "success") {
  if (!element) return;
  element.textContent = text;
  element.className = `alert alert-${type}`;
  element.classList.remove("hidden");
}
