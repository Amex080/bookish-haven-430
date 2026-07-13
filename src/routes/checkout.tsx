import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatNaira } from "@/lib/books";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — EKSU Bookshop" },
      { name: "description", content: "Complete your order at EKSU Online Bookshop." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

// Fields per §3.9 Input/Output Specifications of the project report.
type Field = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "select" | "textarea";
  required?: boolean;
  options?: string[];
  default?: string;
  full?: boolean;
};

const FIELDS: Field[] = [
  { name: "surname", label: "Surname", type: "text", required: true },
  { name: "firstName", label: "First name", type: "text", required: true },
  { name: "email", label: "E-mail address", type: "email", required: true },
  { name: "phone", label: "Mobile phone", type: "tel", required: true },
  { name: "gender", label: "Gender", type: "select", options: ["Female", "Male", "Prefer not to say"], required: true },
  { name: "country", label: "Country", type: "text", required: true, default: "Nigeria" },
  { name: "zip", label: "Zip / Postal code", type: "text", required: true },
  { name: "office", label: "Office address", type: "text" },
  { name: "delivery", label: "Delivery address", type: "textarea", required: true, full: true },
];

function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [placed, setPlaced] = useState(false);

  if (items.length === 0 && !placed) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-serif text-4xl">Nothing to check out</h1>
        <p className="mt-3 text-muted-foreground">Add books to your cart first.</p>
        <Link to="/books" className="mt-8 inline-flex rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          Browse catalogue
        </Link>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-gold" />
        <h1 className="mt-6 font-serif text-4xl">Order confirmed</h1>
        <p className="mt-3 text-muted-foreground">
          Thank you — your order has been received. A confirmation email is on its way, and the bookshop will be in
          touch with delivery details.
        </p>
        <Link to="/" className="mt-8 inline-flex rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          Return home
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clear();
    setPlaced(true);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-serif text-4xl">Checkout</h1>
      <p className="mt-2 text-sm text-muted-foreground">Complete your delivery details to place the order.</p>

      <form onSubmit={handleSubmit} className="mt-10 grid gap-10 md:grid-cols-[1fr_360px]">
        <div className="rounded-sm border border-border bg-card p-6">
          <h2 className="font-serif text-xl">Customer & delivery information</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {FIELDS.map((f) => (
              <div key={f.name} className={"full" in f && f.full ? "md:col-span-2" : ""}>
                <label htmlFor={f.name} className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {f.label}{f.required && <span className="text-destructive"> *</span>}
                </label>
                {f.type === "select" ? (
                  <select
                    id={f.name}
                    name={f.name}
                    required={f.required}
                    className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
                  >
                    <option value="">Select…</option>
                    {"options" in f && f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : f.type === "textarea" ? (
                  <textarea
                    id={f.name}
                    name={f.name}
                    required={f.required}
                    rows={3}
                    className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
                  />
                ) : (
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type}
                    required={f.required}
                    defaultValue={"default" in f ? f.default : undefined}
                    className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="submit"
              className="inline-flex items-center rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Submit order
            </button>
            <button
              type="reset"
              className="inline-flex items-center rounded-sm border border-input bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-accent"
            >
              Reset
            </button>
          </div>
        </div>

        <aside className="h-fit rounded-sm border border-border bg-card p-6">
          <h2 className="font-serif text-xl">Your order</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {items.map(({ book, qty }) => (
              <li key={book.id} className="flex justify-between gap-3">
                <span className="text-foreground">
                  {book.title} <span className="text-muted-foreground">× {qty}</span>
                </span>
                <span className="whitespace-nowrap font-medium">{formatNaira(book.price * qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between border-t border-border pt-4 text-base">
            <span className="font-serif">Total</span>
            <span className="font-semibold">{formatNaira(total)}</span>
          </div>
        </aside>
      </form>
    </div>
  );
}
