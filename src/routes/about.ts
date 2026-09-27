import { createFileRoute } from "@tanstack/react-router";
import { renderPage } from "@/lib/site/layout";

export const Route = createFileRoute("/about")({
  server: {
    handlers: {
      GET: () =>
        renderPage({
          title: "About the university bookshop",
          description:
            "How the Ekiti State University online bookshop serves students, lecturers and departments across Ado-Ekiti and beyond.",
          active: "about",
          path: "/about",
          body: `
<section class="page-banner">
  <div class="container">
    <p class="eyebrow">About us</p>
    <h1>The bookshop of Ekiti State University</h1>
    <p>Serving students, lecturers and departments since the university opened its doors.</p>
  </div>
</section>

<section class="section">
  <div class="container prose">
    <p>The EKSU Online Bookshop is the digital counter of the university bookshop at Ado-Ekiti. It was built so that a student can find a recommended text, confirm the price and place an order without queuing between lectures.</p>

    <h2>What we stock</h2>
    <p>Our shelves follow the course lists of the faculties we serve: accounting, economics, e-commerce, public administration, sociology, statistics, building technology, engineering materials and general studies.</p>

    <h2>How ordering works</h2>
    <ul>
      <li>Browse the catalogue by discipline and add titles to your cart.</li>
      <li>Enter your delivery details at checkout — no payment card required online.</li>
      <li>Pay on delivery, or at the bookshop counter when you collect.</li>
      <li>Create an account to keep a record of every order you place.</li>
    </ul>

    <h2>How the site is built</h2>
    <p>This bookshop is built with HTML5 and CSS3 for the pages, vanilla JavaScript (ES6+) for the shopping cart and forms, a Node.js server for the pages and the order API, and PostgreSQL for the catalogue, customer accounts, orders and enquiries.</p>

    <h2>Visit the counter</h2>
    <p>Ekiti State University Bookshop, P.M.B. 5363, Ado-Ekiti, Ekiti State, Nigeria.<br>
    Monday to Friday, 8:00am – 5:00pm. Saturday, 9:00am – 1:00pm.</p>
  </div>
</section>`,
        }),
    },
  },
});
