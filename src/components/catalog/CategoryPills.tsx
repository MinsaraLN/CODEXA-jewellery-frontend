// src/components/catalog/CategoryPills.tsx
import { Category } from "@/lib/types";
import { cn } from "@/lib/utils";


interface Props {
categories: Category[];
selected?: string | number;
onChange: (id: string | number, cat: Category) => void;
}


export default function CategoryPills({ categories, selected, onChange }: Props) {
return (
<div className="no-scrollbar -mx-2 mb-6 flex items-center gap-2 overflow-x-auto px-2 py-1">
{categories.map((c) => (
<button
key={String(c.id)}
onClick={() => onChange(c.id, c)}
className={cn(
"whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors",
selected === c.id ? "bg-foreground text-background" : "hover:bg-muted"
)}
>
{c.name}
</button>
))}
</div>
);
}