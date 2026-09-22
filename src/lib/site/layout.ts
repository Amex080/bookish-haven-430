/**
 * Server-side HTML5 page renderer (Node.js).
 * Every page of the bookshop is assembled here as plain HTML5 and served by
 * the Node server, exactly like an Express view layer.
 */

export type PageOptions = {
  title: string;
  description: string;
  body: string;
  active?: string;
  scripts?: string[];
  image?: string;
  path?: string;
};

const SITE = "EKSU Online Bookshop";
const ORIGIN = "https://bookish-haven-430.lovable.app";

export const escapeHtml = (value: unknown): string =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const formatNaira = (amount: number): string =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

const NAV = [
  { href: "/", label: "Home", key: "home" },
  { href: "/books", label: "Catalogue", key: "books" },
  { href: "/about", label: "About", key: "about" },
  { href: "/contact", label: "Contact", key: "contact" },
];

function navHtml(active?: string): string {
  return NAV.map(
    (item) =>
      `<a class="nav-link${item.key === active ? " is-active" : ""}" href="${item.href}">${item.label}</a>`,
  ).join("");
}

export function renderPage(options: PageOptions): Response {
  const { title, description, body, active, scripts = [], image, path = "/" } = options;
  const fullTitle = `${title} | ${SITE}`;
  const ogImage = image ? `${ORIGIN}${image}` : `${ORIGIN}/assets/img/hero-books.jpg`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(fullTitle)}</title>
<meta name="description" content="${escapeHtml(description)}">
<meta name="author" content="Ekiti State University">
<link rel="canonical" href="${ORIGIN}${path}">
<meta property="og:site_name" content="${SITE}">
<meta property="og:title" content="${escapeHtml(fullTitle)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:type" content="website">
<meta property="og:image" content="${ogImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(fullTitle)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
<meta name="twitter:image" content="${ogImage}">
<link rel="icon" href="/favicon.ico" type="image/x-icon">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="/">
      <span class="brand-mark">EKSU</span>
      <span class="brand-text">
        <strong>Online Bookshop</strong>
        <small>Ekiti State University, Ado-Ekiti</small>
      </span>
    </a>
    <nav class="site-nav" aria-label="Primary">${navHtml(active)}</nav>
    <div class="header-actions">
      <a class="account-link" href="/account" id="account-link">Sign in</a>
      <a class="cart-link" href="/cart" aria-label="View cart">
        Cart <span class="cart-count" id="cart-count">0</span>
      </a>
      <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false">&#9776;</button>
    </div>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <h3 class="footer-brand">EKSU Online Bookshop</h3>
      <p>The official bookshop of Ekiti State University, Ado-Ekiti. Academic titles for every faculty, delivered nationwide.</p>
    </div>
    <div>
      <h4>Explore</h4>
      <ul>
        <li><a href="/books">Catalogue</a></li>
        <li><a href="/about">About us</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/account">My account</a></li>
      </ul>
    </div>
    <div>
      <h4>Visit</h4>
      <p>P.M.B. 5363, Ado-Ekiti,<br>Ekiti State, Nigeria</p>
      <p>+234 803 000 0000<br>orders@eksu-bookshop.ng</p>
    </div>
  </div>
  <div class="container footer-base">
    <p>&copy; ${new Date().getFullYear()} Ekiti State University Bookshop. All rights reserved.</p>
    <p>Built with HTML5, CSS3, JavaScript, Node.js and PostgreSQL.</p>
  </div>
</footer>
<script type="module" src="/assets/js/app.js"></script>
${scripts.map((src) => `<script type="module" src="${src}"></script>`).join("\n")}
</body>
</html>`;

  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
