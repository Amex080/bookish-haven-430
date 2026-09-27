import { createFileRoute } from "@tanstack/react-router";
import { renderPage } from "@/lib/site/layout";

export const Route = createFileRoute("/account")({
  server: {
    handlers: {
      GET: () =>
        renderPage({
          title: "Your bookshop account",
          description:
            "Create an account or sign in to track the textbook orders you have placed with the Ekiti State University bookshop.",
          active: "",
          path: "/account",
          scripts: ["/assets/js/account.js"],
          body: `
<section class="page-banner">
  <div class="container">
    <p class="eyebrow">My account</p>
    <h1>Orders and sign in</h1>
    <p>Keep a record of every textbook you order from the bookshop.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div id="auth-feedback" class="hidden"></div>

    <div id="auth-panel" class="layout-split hidden">
      <div class="panel">
        <h2 style="font-size:1.25rem">Sign in</h2>
        <form id="login-form" novalidate>
          <div class="field">
            <label for="login-email">Email address</label>
            <input id="login-email" name="email" type="email" required autocomplete="email">
          </div>
          <div class="field">
            <label for="login-password">Password</label>
            <input id="login-password" name="password" type="password" required autocomplete="current-password">
          </div>
          <button class="btn btn-primary btn-block" type="submit">Sign in</button>
        </form>
      </div>
      <div class="panel">
        <h2 style="font-size:1.25rem">Create an account</h2>
        <form id="register-form" novalidate>
          <div class="field">
            <label for="reg-name">Full name</label>
            <input id="reg-name" name="fullName" required autocomplete="name">
          </div>
          <div class="field">
            <label for="reg-email">Email address</label>
            <input id="reg-email" name="email" type="email" required autocomplete="email">
          </div>
          <div class="field">
            <label for="reg-password">Password</label>
            <input id="reg-password" name="password" type="password" required minlength="6" autocomplete="new-password">
            <p class="form-note">At least 6 characters.</p>
          </div>
          <button class="btn btn-gold btn-block" type="submit">Create account</button>
        </form>
      </div>
    </div>

    <div id="account-panel" class="hidden">
      <div class="panel" style="display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap">
        <p style="margin:0">Signed in as <strong id="account-who"></strong></p>
        <button class="btn btn-ghost btn-sm" id="sign-out" type="button">Sign out</button>
      </div>
      <div class="panel">
        <h2 style="font-size:1.25rem">Order history</h2>
        <div id="account-orders"></div>
      </div>
    </div>
  </div>
</section>`,
        }),
    },
  },
});
