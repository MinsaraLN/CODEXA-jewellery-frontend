// src/lib/catalog.ts
import { Category, Gem, Product } from "@/lib/types";


const API_BASE = import.meta.env.VITE_API_BASE_URL || ""; // e.g. http://localhost:8080/api


async function http<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
        headers: { "Content-Type": "application/json" },
        ...init,
    });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Request failed ${res.status}: ${text || res.statusText}`);
    }
    return res.json() as Promise<T>;
}


/**
* Categories
* Backend options supported (choose what your Spring Boot exposes):
* - GET /categories?kind=PRODUCT | GEM
* - GET /categories/products and /categories/gems
* - GET /categories (return all; we filter on client)
*/
export async function getCategories(kind: "PRODUCT" | "GEM"): Promise<Category[]> {
    // Try common endpoints in order; fall back gracefully
    const candidates = [
        `/categories?kind=${kind}`,
        kind === "PRODUCT" ? "/categories/products" : "/categories/gems",
        "/categories",
    ];

    for (const path of candidates) {
        try {
            const all = (await http<Category[] | any>(path)) as Category[] | any;
            const arr: Category[] = Array.isArray(all) ? all : (all?.content ?? []);
            return arr.filter((c) =>
                kind === "GEM"
                    ? c?.isGem === true || c?.kind === "GEM" || c?.type === "GEM"
                    : c?.isGem === false || c?.kind === "PRODUCT" || c?.type === "PRODUCT" || c?.kind === "JEWELLERY" || c?.type === "JEWELLERY"
            );
        } catch (e) {
            // keep trying the next candidate
        }
    }
    return [];
}


/**
* Products
* Supported shapes:
* - GET /products?categoryId= or ?categorySlug=
* - GET /categories/{id}/products
* - GET /products (we filter client-side if needed)
*/
export async function getProductsByCategory(params: { categoryId?: string | number; categorySlug?: string } = {}): Promise<Product[]> {
    const { categoryId, categorySlug } = params;
    const candidates = [
        categoryId ? `/products?categoryId=${categoryId}` : "",
        categorySlug ? `/products?category=${encodeURIComponent(categorySlug)}` : "",
        categoryId ? `/categories/${categoryId}/products` : "",
        "/products",
    ].filter(Boolean) as string[];


    for (const path of candidates) {
        try {
            const data = await http<Product[] | { content: Product[] }>(path);
            const list: Product[] = Array.isArray(data) ? data : (data as any)?.content ?? [];
            // Normalize image arrays
            return list.map((p) => ({
                ...p,
                images: Array.isArray(p.images) ? p.images : [],
            }));
        } catch (e) {
            // try next
        }
    }
    return [];
}


/**
* Gems
*/
export async function getGemsByCategory(params: { categoryId?: string | number; categorySlug?: string } = {}): Promise<Gem[]> {
    const { categoryId, categorySlug } = params;
    const candidates = [
        categoryId ? `/gems?categoryId=${categoryId}` : "",
        categorySlug ? `/gems?category=${encodeURIComponent(categorySlug)}` : "",
        categoryId ? `/categories/${categoryId}/gems` : "",
        "/gems",
    ].filter(Boolean) as string[];


    for (const path of candidates) {
        try {
            const data = await http<Gem[] | { content: Gem[] }>(path);
            const list: Gem[] = Array.isArray(data) ? data : (data as any)?.content ?? [];
            return list;
        } catch (e) {
            // try next
        }
    }
    return [];
}