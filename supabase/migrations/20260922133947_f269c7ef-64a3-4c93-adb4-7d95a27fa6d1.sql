
CREATE TABLE public.categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE
);
GRANT SELECT ON public.categories TO anon, authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories are public" ON public.categories FOR SELECT USING (true);

CREATE TABLE public.books (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  category_id INTEGER NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
  price NUMERIC(10,2) NOT NULL,
  cover TEXT NOT NULL DEFAULT '#1f2a44',
  description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT ON public.books TO anon, authenticated;
GRANT ALL ON public.books TO service_role;
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Books are public" ON public.books FOR SELECT USING (true);

CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY,
  full_name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  surname TEXT NOT NULL,
  first_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  gender TEXT NOT NULL DEFAULT '',
  country TEXT NOT NULL DEFAULT 'Nigeria',
  zip TEXT NOT NULL DEFAULT '',
  office TEXT NOT NULL DEFAULT '',
  address TEXT NOT NULL,
  total NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own orders" ON public.orders FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  book_id UUID REFERENCES public.books(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  unit_price NUMERIC(10,2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1
);
GRANT SELECT ON public.order_items TO authenticated;
GRANT ALL ON public.order_items TO service_role;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own order items" ON public.order_items FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND o.user_id = auth.uid()));

CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

INSERT INTO public.categories (name, slug) VALUES
  ('Accounting','accounting'),
  ('E-commerce','e-commerce'),
  ('Public Administration','public-administration'),
  ('Economics','economics'),
  ('Building Technology','building-technology'),
  ('Statistics','statistics'),
  ('Materials','materials'),
  ('General','general'),
  ('Sociology','sociology');

INSERT INTO public.books (title, author, category_id, price, cover, description)
SELECT v.title, v.author, c.id, v.price, v.cover, v.description
FROM (VALUES
  ('Principles of Financial Accounting','O. Adeyemi','Accounting',4500,'#7c4a1e','A comprehensive introduction to double-entry bookkeeping, ledgers and financial statement preparation.'),
  ('Cost & Management Accounting','C. Nwosu','Accounting',5200,'#4a4540','Costing methods, budgeting, and decision-making tools for modern managers.'),
  ('Auditing & Assurance','V. Onuoha','Accounting',5400,'#7a6410','Standards, ethics and the audit process end-to-end.'),
  ('Foundations of E-Commerce','K. Saheed','E-commerce',6100,'#2f3a8f','From storefronts to secure payment gateways - the architecture of online trade.'),
  ('Digital Marketplaces','R. Okafor','E-commerce',5800,'#1f4b8f','Case studies in platform economics, marketplace design and consumer behaviour.'),
  ('Public Administration in Nigeria','A. Bello','Public Administration',4800,'#16624a','Structures, ethics and reform of the Nigerian civil service.'),
  ('Policy Analysis & Governance','M. Adekunle','Public Administration',5300,'#125f5f','Frameworks for evaluating public policy in developing economies.'),
  ('Principles of Economics','F. Ojo','Economics',4700,'#8f2020','Micro and macroeconomic fundamentals with African case illustrations.'),
  ('Development Economics','P. Eze','Economics',5600,'#8f2a44','Growth, inequality and industrial policy across emerging markets.'),
  ('Data-Driven Economics','N. Adaora','Economics',6000,'#8f2470','Applied econometrics with real datasets.'),
  ('Introduction to Building Technology','S. Umar','Building Technology',6200,'#8f5010','Materials, structures and construction methods for civil works.'),
  ('Statistical Methods for Science','T. Balogun','Statistics',5000,'#5a2f8f','Descriptive and inferential statistics with worked examples.'),
  ('Engineering Materials','H. Yusuf','Materials',5900,'#3c4552','Properties, selection and testing of metals, polymers and composites.'),
  ('General Studies Companion','Editorial Board','General',3200,'#4a4a4a','Use of English, logic and Nigerian peoples & culture - one volume.'),
  ('Introductory Sociology','L. Anyanwu','Sociology',4400,'#7c2080','Society, culture and institutions - a first course.'),
  ('Sociology of Development','J. Ikenna','Sociology',4900,'#5c2a8f','Modernization, dependency and post-colonial perspectives.')
) AS v(title, author, category, price, cover, description)
JOIN public.categories c ON c.name = v.category;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name',''), COALESCE(NEW.email,''))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
