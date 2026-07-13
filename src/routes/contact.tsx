import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — POLYNEK Online Bookshop" },
      { name: "description", content: "Contact the POLYNEK Bookshop team at Federal Polytechnic Nekede, Owerri." },
      { property: "og:title", content: "Contact POLYNEK Bookshop" },
      { property: "og:description", content: "Get in touch with our bookshop team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Contact</div>
      <h1 className="mt-2 font-serif text-4xl md:text-5xl">Get in touch</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Questions about a title, bulk orders for a department, or trouble with checkout? We'd love to help.
      </p>

      <div className="mt-14 grid gap-10 md:grid-cols-2">
        <div className="space-y-6">
          {[
            { icon: MapPin, title: "Address", body: "Federal Polytechnic Nekede\nP.M.B. 1036, Owerri, Imo State" },
            { icon: Phone, title: "Phone", body: "+234 803 000 0000" },
            { icon: Mail, title: "Email", body: "orders@polynek-bookshop.ng" },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-sm bg-primary/5 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="font-serif text-lg">{title}</div>
                <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            (e.currentTarget as HTMLFormElement).reset();
            alert("Thanks — your message has been received.");
          }}
          className="rounded-sm border border-border bg-card p-6"
        >
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Your name</label>
          <input required className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm" />
          <label className="mb-1.5 mt-4 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</label>
          <input required type="email" className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm" />
          <label className="mb-1.5 mt-4 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Message</label>
          <textarea required rows={4} className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm" />
          <button className="mt-6 inline-flex rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Send message
          </button>
        </form>
      </div>
    </div>
  );
}
