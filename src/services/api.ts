import {
  Product,
  Category,
  FALLBACK_PRODUCTS,
  FALLBACK_CATEGORIES,
} from '../data/fallbackData';

const API_BASE_URLS = [
  'https://api.api-store.workers.dev/api/bazardor',
  'https://openapi.programming-hero.com/api/bazardor',
  'https://api.abcz.workers.dev/api/bazardor',
];

let cachedProducts: Product[] | null = null;
let cachedCategories: Category[] | null = null;

async function fetchFromApiWithFallback<T>(endpoint: string, fallback: T): Promise<T> {
  for (const baseUrl of API_BASE_URLS) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 1800);
      const res = await fetch(`${baseUrl}${endpoint}`, {
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (res.ok) {
        const json = await res.json();
        const data = json?.data ?? json;
        if (data && (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0)) {
          return data as T;
        }
      }
    } catch {
      // Try next base URL
    }
  }
  return fallback;
}

export async function fetchAllProducts(): Promise<Product[]> {
  if (cachedProducts) return cachedProducts;
  const products = await fetchFromApiWithFallback<Product[]>('/products', FALLBACK_PRODUCTS);
  cachedProducts = Array.isArray(products) && products.length > 0 ? products : FALLBACK_PRODUCTS;
  return cachedProducts;
}

export async function fetchAllCategories(): Promise<Category[]> {
  if (cachedCategories) return cachedCategories;
  const categories = await fetchFromApiWithFallback<Category[]>(
    '/categories',
    FALLBACK_CATEGORIES
  );
  cachedCategories =
    Array.isArray(categories) && categories.length > 0 ? categories : FALLBACK_CATEGORIES;
  return cachedCategories;
}

export async function fetchProductsByCategory(categorySlug: string): Promise<{
  category: Category | null;
  products: Product[];
}> {
  const [categories, allProducts] = await Promise.all([
    fetchAllCategories(),
    fetchAllProducts(),
  ]);
  const category =
    categories.find((c) => c.slug === categorySlug || c.id === categorySlug) || null;
  if (!category) {
    return { category: null, products: [] };
  }
  const filtered = allProducts.filter(
    (p) => p.category === categorySlug || p.category === category.id
  );
  return { category, products: filtered };
}

export async function fetchProductBySlug(slugOrId: string): Promise<Product | null> {
  const allProducts = await fetchAllProducts();
  const found = allProducts.find(
    (p) => p.slug === slugOrId || String(p.id) === String(slugOrId)
  );
  return found || null;
}

export function clearApiCache(): void {
  cachedProducts = null;
  cachedCategories = null;
}

