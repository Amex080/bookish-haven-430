import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — EKSU Online Bookshop" },
      { name: "description", content: "About the EKSU Online Bookshop project — Ekiti State University, Ado-Ekiti." },
      { property: "og:title", content: "About EKSU Bookshop" },
      { property: "og:description", content: "Modernising the campus bookshop through e-commerce." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">About</div>
      <h1 className="mt-2 font-serif text-4xl md:text-5xl">The campus bookshop, brought online.</h1>
      <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/85">
        <p>
          EKSU Bookshop is the online arm of the Ekiti State University, Ado-Ekiti campus bookshop —
          operated by Ekiti State University. It replaces long queues, out-of-stock counters and paper
          receipts with a searchable catalogue and secure checkout available on any device.
        </p>
        <p>
          The platform was designed to computerise the operations and transactions previously conducted
          manually. Its goals are simple: reduce time wastage in locating titles, keep clean records of every
          transaction, and open the bookshop to students and readers wherever they study.
        </p>
        <h2 className="mt-10 font-serif text-2xl">How it's built</h2>
        <p>
          The system is developed with a modern JavaScript stack — a Node.js runtime powers the backend,
          PostgreSQL stores the catalogue and orders, and HTML, CSS and JavaScript deliver the interactive
          storefront. Payments are processed through a merchant-account gateway with end-to-end encryption.
        </p>
        <h2 className="mt-10 font-serif text-2xl">What you can do here</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Browse titles across nine departments — accounting, economics, e-commerce, and more.</li>
          <li>Add books to a persistent cart that follows you across sessions.</li>
          <li>Check out with delivery details and receive an order confirmation.</li>
        </ul>
        <p className="pt-4 text-sm italic text-muted-foreground">
          A case study for the B.Sc. Computer Science project of Kareem Saheed Abimbola (220903001),
          Department of Computer Science, Ekiti State University, Ado-Ekiti, 2024.
        </p>
      </div>
    </div>
  );
}
