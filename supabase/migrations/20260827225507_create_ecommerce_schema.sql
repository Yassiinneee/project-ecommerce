/*
# Create ecommerce schema (single-tenant, no auth)

1. New Tables
- `categories`
  - `id` (uuid, primary key)
  - `name` (text, not null)
  - `slug` (text, unique, not null)
  - `image_url` (text)
  - `created_at` (timestamp)
- `products`
  - `id` (uuid, primary key)
  - `name` (text, not null)
  - `slug` (text, unique, not null)
  - `description` (text, not null)
  - `price` (numeric(10,2), not null)
  - `compare_at_price` (numeric(10,2), nullable - for showing discounts)
  - `image_url` (text, not null)
  - `gallery` (text[], nullable - additional product images)
  - `category_id` (uuid, FK to categories)
  - `rating` (numeric(3,2), default 0)
  - `review_count` (integer, default 0)
  - `stock` (integer, default 0)
  - `featured` (boolean, default false)
  - `badge` (text, nullable - e.g. "New", "Sale", "Bestseller")
  - `created_at` (timestamp)
- `reviews`
  - `id` (uuid, primary key)
  - `product_id` (uuid, FK to products, ON DELETE CASCADE)
  - `author_name` (text, not null)
  - `rating` (integer, 1-5, not null)
  - `comment` (text, not null)
  - `created_at` (timestamp)

2. Security
- Enable RLS on all tables.
- Allow anon + authenticated CRUD because this is a single-tenant public storefront.
- Reviews are public to read; anyone can create reviews.

3. Notes
- Products have a category relationship.
- Compare-at price allows showing discount badges.
- Gallery array supports multiple product images.
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  price numeric(10,2) NOT NULL,
  compare_at_price numeric(10,2),
  image_url text NOT NULL,
  gallery text[],
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  rating numeric(3,2) DEFAULT 0,
  review_count integer DEFAULT 0,
  stock integer DEFAULT 0,
  featured boolean DEFAULT false,
  badge text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Categories: public read, no write from anon
DROP POLICY IF EXISTS "anon_select_categories" ON categories;
CREATE POLICY "anon_select_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

-- Products: public read, no write from anon
DROP POLICY IF EXISTS "anon_select_products" ON products;
CREATE POLICY "anon_select_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

-- Reviews: public read, anyone can create
DROP POLICY IF EXISTS "anon_select_reviews" ON reviews;
CREATE POLICY "anon_select_reviews" ON reviews FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_reviews" ON reviews;
CREATE POLICY "anon_insert_reviews" ON reviews FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_reviews" ON reviews;
CREATE POLICY "anon_update_reviews" ON reviews FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_reviews" ON reviews;
CREATE POLICY "anon_delete_reviews" ON reviews FOR DELETE
  TO anon, authenticated USING (true);