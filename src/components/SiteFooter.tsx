import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <div className="font-serif text-2xl">EKSU</div>
          <div className="text-xs uppercase tracking-[0.25em] text-primary-foreground/60">Online Bookshop</div>
          <p className="mt-4 text-sm text-primary-foreground/70">
            The official online bookshop of Ekiti State University, Ado-Ekiti — bringing academic titles to every desk.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Browse</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/books" className="hover:text-gold">All titles</Link></li>
            <li><Link to="/books" search={{ category: "Accounting" }} className="hover:text-gold">Accounting</Link></li>
            <li><Link to="/books" search={{ category: "Economics" }} className="hover:text-gold">Economics</Link></li>
            <li><Link to="/books" search={{ category: "E-commerce" }} className="hover:text-gold">E-commerce</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Institution</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/about" className="hover:text-gold">About the bookshop</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Visit</h4>
          <p className="text-sm text-primary-foreground/70">
            Ekiti State University<br />
            P.M.B. 5363, Ado-Ekiti<br />
            Ekiti State, Nigeria
          </p>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-primary-foreground/50 md:flex-row">
          <span>© {new Date().getFullYear()} Ekiti State University All rights reserved.</span>
          <span>Designed as a case study — Kareem Saheed Abimbola, EKSU 2024.</span>
        </div>
      </div>
    </footer>
  );
}
