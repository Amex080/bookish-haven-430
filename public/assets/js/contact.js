// Contact page: saves the enquiry in the database through the Node server.
import { api, showMessage } from "./store.js";

const form = document.getElementById("contact-form");
const feedback = document.getElementById("contact-feedback");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  const button = form.querySelector("button[type=submit]");
  button.disabled = true;

  try {
    await api("/api/public/contact", { method: "POST", body: data });
    form.reset();
    showMessage(feedback, "Thank you — your message has reached the bookshop desk.", "success");
  } catch (error) {
    showMessage(feedback, error.message, "error");
  } finally {
    button.disabled = false;
  }
});
