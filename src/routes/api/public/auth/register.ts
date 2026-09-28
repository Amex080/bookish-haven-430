import { createFileRoute } from "@tanstack/react-router";

const bad = (message: string, status = 400) =>
  new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "content-type": "application/json" },
  });

export const Route = createFileRoute("/api/public/auth/register")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json().catch(() => null)) as Record<string, string> | null;
        const email = body?.["email"]?.trim().toLowerCase();
        const password = body?.["password"] ?? "";
        const fullName = body?.["fullName"]?.trim() ?? "";

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad("Enter a valid email address.");
        if (password.length < 6) return bad("Password must be at least 6 characters.");

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { error } = await supabaseAdmin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: { full_name: fullName },
        });

        if (error) {
          return bad(
            error.message.toLowerCase().includes("already")
              ? "An account with that email already exists. Please sign in."
              : error.message,
          );
        }

        const { createClient } = await import("@supabase/supabase-js");
        const publicClient = createClient(
          process.env["SUPABASE_URL"]!,
          process.env["SUPABASE_PUBLISHABLE_KEY"]!,
          { auth: { persistSession: false, autoRefreshToken: false } },
        );
        const { data: signIn, error: signInError } = await publicClient.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError || !signIn.session) return bad("Account created. Please sign in.", 400);

        return Response.json({
          access_token: signIn.session.access_token,
          email: signIn.user?.email ?? email,
        });
      },
    },
  },
});
