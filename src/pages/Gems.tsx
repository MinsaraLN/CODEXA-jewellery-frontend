// src/pages/Gems.tsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";
import CategoryPills from "@/components/catalog/CategoryPills";
import GemCard from "@/components/catalog/GemCard";
import { getCategories, getGemsByCategory } from "@/lib/catalog";
import type { Category } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";


export default function Gems() {
const [selected, setSelected] = React.useState<string | number | undefined>(undefined);


const { data: categories = [], isLoading: catLoading, isError: catError, refetch: refetchCats } = useQuery({
queryKey: ["categories", "GEM"],
queryFn: () => getCategories("GEM"),
});


const selCategory: Category | undefined = React.useMemo(
() => categories.find((c) => c.id === selected) ?? categories[0],
[categories, selected]
);


const { data: gems = [], isLoading: gemsLoading, isError: gemsError, refetch: refetchGems } = useQuery({
queryKey: ["gems", selCategory?.id],
enabled: !!selCategory,
queryFn: () => getGemsByCategory({ categoryId: selCategory!.id as any, categorySlug: selCategory?.slug }),
});


return (
<Layout>
<div className="container mx-auto px-4 py-8">
<h1 className="heading-display mb-2">Gems</h1>
<p className="text-elegant text-muted-foreground mb-6">Browse by gem type</p>


{catLoading ? (
<div className="mb-6 flex gap-2">
{Array.from({ length: 6 }).map((_, i) => (
<Skeleton key={i} className="h-9 w-24 rounded-full" />
))}
</div>
) : catError ? (
<div className="mb-6 rounded-lg border p-4 text-sm">
Failed to load categories. <button className="underline" onClick={() => refetchCats()}>Retry</button>
</div>
) : (
<CategoryPills
categories={categories}
selected={selCategory?.id}
onChange={(id) => setSelected(id)}
/>
)}


{gemsLoading ? (
<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
{Array.from({ length: 8 }).map((_, i) => (
<Skeleton key={i} className="aspect-square w-full rounded-2xl" />
))}
</div>
) : gemsError ? (
<div className="rounded-lg border p-4 text-sm">
Failed to load gems. <button className="underline" onClick={() => refetchGems()}>Retry</button>
</div>
) : (
<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
{gems.map((g) => (
<GemCard key={String(g.id)} gem={g} />
))}
{gems.length === 0 && (
<div className="col-span-full text-center text-muted-foreground">No gems in this category.</div>
)}
</div>
)}
</div>
</Layout>
);
}