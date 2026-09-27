import { createFileRoute } from "@tanstack/react-router";
import { renderPage } from "@/lib/site/layout";

export const Route = createFileRoute("/contact")({
  server: {
    handlers: {
      GET: () =>
        renderPage({
          title: "Contact the bookshop desk",
          description:
            "Reach the Ekiti State University online bookshop about an order, a bulk request or a title you cannot find.",
          active: "contact",
          path: "/contact",
          scripts: ["/assets/js/contact.js"],
          body: `
<section class="page-banner">
  <div class="container">
    <p class="eyebrow">Contact</p>
    <h1>Talk to the bookshop desk</h1>
    <p>Questions about an order, a bulk request, or a title we do not list yet.</p>
  </div>
</section>

<section class="section">
  <div class="container layout-split">
    <div class="panel">
      <h2 style="font-size:1.25rem">Send a message</h2>
      <div id="contact-feedback" class="hidden"></div>
      <form id="contact-form" novalidate>
        <div class="field-row">
          <div class="field">
            <label for="name">Full name</label>
            <input id="name" name="name" required>
          </div>
          <div class="field">
            <label for="email">Email address</label>
            <input id="email" name="email" type="email" required>
          </div>
        </div>
        <div class="field">
          <label for="subject">Subject</label>
          <input id="subject" name="subject">
        </div>
        <div class="field">
          <label for="message">Message</label>
          <textarea id="message" name="message" required></textarea>
        </div>
        <button class="btn btn-primary" type="submit">Send message</button>
      </form>
    </div>
    <aside class="panel">
      <h2 style="font-size:1.25rem">Bookshop details</h2>
      <p class="muted">Ekiti State University Bookshop<br>P.M.B. 5363, Ado-Ekiti<br>Ekiti State, Nigeria</p>
      <p class="muted">Phone: +234 803 000 0000<br>Email: orders@eksu-bookshop.ng</p>
      <h3 style="margin-top:1.4rem">Opening hours</h3>
      <p class="muted">Monday – Friday: 8:00am – 5:00pm<br>Saturday: 9:00am – 1:00pm<br>Sunday: closed</p>
    </aside>
  </div>
</section>`,
        }),
    },
  },
});
