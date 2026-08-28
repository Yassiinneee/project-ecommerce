export type Category = {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compare_at_price: number | null;
  image_url: string;
  gallery: string[] | null;
  category_id: string | null;
  rating: number;
  review_count: number;
  stock: number;
  featured: boolean;
  badge: string | null;
  created_at: string;
};

export type Review = {
  id: string;
  product_id: string;
  author_name: string;
  rating: number;
  comment: string;
  created_at: string;
};

export type ProductWithCategory = Product & {
  category: Pick<Category, 'id' | 'name' | 'slug'> | null;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
