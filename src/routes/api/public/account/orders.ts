import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/account/orders")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const token = request.headers.get("authorization")?.replace("Bearer ", "");
        if (!token) {
          return new Response(JSON.stringify({ error: "Please sign in." }), {
            status: 401,
            headers: { "content-type": "application/json" },
          });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: userData } = await supabaseAdmin.auth.getUser(token);
        const user = userData.user;
        if (!user) {
          return new Response(JSON.stringify({ error: "Your session has expired." }), {
            status: 401,
            headers: { "content-type": "application/json" },
          });
        }

        const { data, error } = await supabaseAdmin
          .from("orders")
          .select("id, created_at, total, status, order_items(title, unit_price, quantity, access_code)")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Order history failed:", error);
          return new Response(JSON.stringify({ error: "Could not load your orders." }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }

        const orders = (data ?? []).map((order: Record<string, unknown>) => ({
          id: order["id"],
          created_at: order["created_at"],
          total: Number(order["total"]),
          status: order["status"],
          items: (order["order_items"] as Array<Record<string, unknown>>).map((item) => ({
            title: item["title"],
            access_code: item["access_code"],
            unit_price: Number(item["unit_price"]),
            quantity: Number(item["quantity"]),
          })),
        }));

        return Response.json({ orders });
      },
    },
  },
});
