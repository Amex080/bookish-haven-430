import { createFileRoute } from "@tanstack/react-router";

const bad = (message: string, status = 400) =>
  new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "content-type": "application/json" },
  });

export const Route = createFileRoute("/api/public/auth/login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json().catch(() => null)) as Record<string, string> | null;
        const email = body?.["email"]?.trim().toLowerCase();
        const password = body?.["password"] ?? "";
        if (!email || !password) return bad("Email and password are required.");

        const { createClient } = await import("@supabase/supabase-js");
        const publicClient = createClient(
          process.env["SUPABASE_URL"]!,
          process.env["SUPABASE_PUBLISHABLE_KEY"]!,
          { auth: { persistSession: false, autoRefreshToken: false } },
        );

        const { data, error } = await publicClient.auth.signInWithPassword({ email, password });
        if (error || !data.session) return bad("Incorrect email or password.", 401);

        return Response.json({
          access_token: data.session.access_token,
          email: data.user?.email ?? email,
        });
      },
    },
  },
});
