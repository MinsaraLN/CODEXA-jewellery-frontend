// src/components/catalog/GemCard.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Gem } from "@/lib/types";


function gemImage(g: Gem, fallback = "https://via.placeholder.com/600x600?text=Gem") {
if (g.image) return g.image;
if (g.images && g.images.length) return g.images[0]!;
return fallback;
}


export default function GemCard({ gem }: { gem: Gem }) {
return (
<Card className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow">
<CardHeader className="p-0">
<div className="aspect-square overflow-hidden">
<img src={gemImage(gem)} alt={gem.name} className="h-full w-full object-cover" loading="lazy" />
</div>
</CardHeader>
<CardContent className="p-4">
<h3 className="font-medium leading-tight text-foreground">{gem.name}</h3>
<div className="mt-1 text-sm text-muted-foreground">
{[gem.color, gem.cut, gem.clarity, gem.carat ? `${gem.carat}ct` : undefined]
.filter(Boolean)
.join(" · ")}
</div>
</CardContent>
</Card>
);
}