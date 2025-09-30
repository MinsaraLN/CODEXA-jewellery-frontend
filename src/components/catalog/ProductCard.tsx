// src/components/catalog/ProductCard.tsx
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import type { Product } from "@/lib/types";


function firstImage(images: Product["images"], fallback = "https://via.placeholder.com/600x600?text=Kalyani") {
if (!images || images.length === 0) return fallback;
const i = images[0] as any;
return typeof i === "string" ? i : i?.url || fallback;
}

export default function ProductCard({ product }: { product: Product }) {
const { addItem: addCart } = useCart();
const { addItem: addWish } = useWishlist();


return (
<Card className="group overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow">
<CardHeader className="p-0">
<Link to={`/product/${product.slug}`} className="block aspect-square overflow-hidden">
<img
src={firstImage(product.images)}
alt={product.title}
className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
loading="lazy"
/>
</Link>
</CardHeader>
<CardContent className="p-4">
<div className="flex items-start justify-between gap-2">
<h3 className="font-medium leading-tight text-foreground line-clamp-2">{product.title}</h3>
{product.badges?.slice(0, 2).map((b) => (
<Badge key={b} variant="secondary" className="shrink-0">{b}</Badge>
))}
</div>
<div className="mt-2 text-sm text-muted-foreground">
<span className="uppercase tracking-wide">{product.sku}</span>
{product.weight && <span> · {product.weight}</span>}
{product.metalPurity && <span> · {product.metalPurity}</span>}
</div>
{product.price != null && (
<div className="mt-2 font-semibold">LKR {Number(product.price).toLocaleString()}</div>
)}
</CardContent>
<CardFooter className="p-4 pt-0 flex items-center gap-2">
<Button
variant="default"
className="flex-1"
onClick={() =>
addCart({ id: String(product.id), slug: product.slug, title: product.title, price: Number(product.price || 0), image: firstImage(product.images), sku: product.sku })
}
>
Add to Cart
</Button>
<Button
variant="outline"
onClick={() =>
addWish({ id: String(product.id), slug: product.slug, title: product.title, price: Number(product.price || 0), image: firstImage(product.images), sku: product.sku, rating: Number(product.rating || 0) })
}
>
Wishlist
</Button>
</CardFooter>
</Card>
);
}