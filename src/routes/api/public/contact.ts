import { createFileRoute } from "@tanstack/react-router";

const bad = (message: string, status = 400) =>
  new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "content-type": "application/json" },
  });

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json().catch(() => null)) as Record<string, string> | null;
        const name = body?.["name"]?.trim();
        const email = body?.["email"]?.trim();
        const message = body?.["message"]?.trim();

        if (!name || !email || !message) return bad("Name, email and message are required.");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad("Please provide a valid email address.");
        if (message.length > 4000) return bad("Your message is too long.");

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { error } = await supabaseAdmin.from("contact_messages").insert({
          name,
          email,
          subject: body?.["subject"]?.trim() ?? "",
          message,
        });

        if (error) {
          console.error("Contact insert failed:", error);
          return bad("We could not send your message. Please try again.", 500);
        }
        return Response.json({ ok: true });
      },
    },
  },
});
