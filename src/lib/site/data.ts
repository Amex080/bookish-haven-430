/** Server-side PostgreSQL data access for the bookshop. */

export type BookRow = {
  id: string;
  title: string;
  author: string;
  price: number;
  cover: string;
  description: string;
  category: string;
};

export type CategoryRow = { id: number; name: string; slug: string };

async function db() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

export async function getCategories(): Promise<CategoryRow[]> {
  const supabase = await db();
  const { data, error } = await supabase.from("categories").select("id, name, slug").order("name");
  if (error) throw new Error(error.message);
  return (data ?? []) as CategoryRow[];
}

export async function getBooks(categorySlug?: string | null): Promise<BookRow[]> {
  const supabase = await db();
  let query = supabase
    .from("books")
    .select("id, title, author, price, cover, description, categories!inner(name, slug)")
    .order("title");

  if (categorySlug) query = query.eq("categories.slug", categorySlug);

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  return (data ?? []).map((row: Record<string, unknown>) => {
    const category = row["categories"] as { name: string } | null;
    return {
      id: String(row["id"]),
      title: String(row["title"]),
      author: String(row["author"]),
      price: Number(row["price"]),
      cover: String(row["cover"]),
      description: String(row["description"]),
      category: category?.name ?? "General",
    };
  });
}
