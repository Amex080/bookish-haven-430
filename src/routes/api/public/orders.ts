import { createFileRoute } from "@tanstack/react-router";

type Item = { id?: string; title: string; price: number; quantity: number };

const bad = (message: string, status = 400) =>
  new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "content-type": "application/json" },
  });

export const Route = createFileRoute("/api/public/orders")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const payload = (await request.json().catch(() => null)) as
          | { customer?: Record<string, string>; items?: Item[]; delivery?: number }
          | null;

        const customer = payload?.customer;
        const items = Array.isArray(payload?.items) ? payload!.items : [];
        const delivery = Number(payload?.delivery ?? 0);

        if (!customer) return bad("Missing delivery details.");
        if (!items.length) return bad("Your cart is empty.");

        const required = ["surname", "firstName", "email", "phone"] as const;
        for (const field of required) {
          if (!customer[field]?.trim()) return bad(`Please provide your ${field}.`);
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer["email"]!)) {
          return bad("Please provide a valid email address.");
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        // Optional customer account: an order is linked when a session token is sent.
        let userId: string | null = null;
        const token = request.headers.get("authorization")?.replace("Bearer ", "");
        if (token) {
          const { data } = await supabaseAdmin.auth.getUser(token);
          userId = data.user?.id ?? null;
        }

        const total =
          items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0) + delivery;

        const { data: order, error } = await supabaseAdmin
          .from("orders")
          .insert({
            user_id: userId,
            surname: customer["surname"]!.trim(),
            first_name: customer["firstName"]!.trim(),
            email: customer["email"]!.trim(),
            phone: customer["phone"]!.trim(),
            gender: customer["gender"] ?? "",
            country: customer["country"] || "Nigeria",
            zip: customer["zip"] ?? "",
            office: customer["office"] ?? "",
            address: (customer["address"] ?? "").trim(),
            total,
          })
          .select("id")
          .single();

        if (error || !order) {
          console.error("Order insert failed:", error);
          return bad("We could not save your order. Please try again.", 500);
        }

        const { error: itemsError } = await supabaseAdmin.from("order_items").insert(
          items.map((item) => ({
            order_id: order.id,
            book_id: item.id ?? null,
            title: item.title,
            unit_price: Number(item.price),
            quantity: Number(item.quantity),
          })),
        );
        if (itemsError) console.error("Order items insert failed:", itemsError);

        return Response.json({
          ok: true,
          orderId: order.id,
          reference: String(order.id).slice(0, 8).toUpperCase(),
          total,
        });
      },
    },
  },
});
