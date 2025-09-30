import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const MULTIPART_MODE: "JSON" | "FIELDS" =
  ((import.meta.env.VITE_FORM_MODE as any) || "JSON");
const API_BASE = import.meta.env.VITE_API_BASE_URL || "";
const CREATE_PATH = import.meta.env.VITE_PRODUCT_CREATE_PATH || "/product";

type ProductForm = {
  name: string;
  brand: string;
  description: string;
  price: string;
  category: string;
  stockQuantity: string;
  releaseDate: string;
  productAvailable: boolean;
};

export default function ProductCreate() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [form, setForm] = React.useState<ProductForm>({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    releaseDate: "",
    productAvailable: false,
  });
  const [image, setImage] = React.useState<File | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.currentTarget as any;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };
  const onImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files?.[0] ?? null);
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!image) {
      toast({ title: "Image required", description: "Choose a product image.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("imageFile", image);

      if (MULTIPART_MODE === "JSON") {
        const product = {
          name: form.name,
          brand: form.brand,
          description: form.description,
          price: Number(form.price || 0),
          category: form.category,
          stockQuantity: Number(form.stockQuantity || 0),
          releaseDate: form.releaseDate,
          productAvailable: form.productAvailable,
        };
        fd.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));
      } else {
        fd.append("name", form.name);
        fd.append("brand", form.brand);
        fd.append("description", form.description);
        fd.append("price", form.price);
        fd.append("category", form.category);
        fd.append("stockQuantity", form.stockQuantity);
        fd.append("releaseDate", form.releaseDate);
        fd.append("productAvailable", String(form.productAvailable));
      }

      const res = await fetch(`${API_BASE}${CREATE_PATH}`, { method: "POST", body: fd });
      if (!res.ok) throw new Error((await res.text().catch(() => "")) || "Failed to create product");

      toast({ title: "Product added", description: "Product created successfully." });
      navigate("/admin/products");
    } catch (err: any) {
      toast({ title: "Error", description: String(err?.message || err), variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Create Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={form.name} onChange={onChange} placeholder="Product name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Metal Type</Label>
              <select id="brand" name="brand" value={form.brand} onChange={onChange}
                className="w-full rounded-md border bg-background px-3 py-2">
                <option value="">Select metal type</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Platinum">Platinum</option>
                <option value="Titanium">Titanium</option>
                <option value="Copper">Copper</option>
              </select>
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" value={form.description} onChange={onChange} placeholder="Add product description" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" type="number" value={form.price} onChange={onChange} placeholder="Eg: 1000" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select id="category" name="category" value={form.category} onChange={onChange}
                className="w-full rounded-md border bg-background px-3 py-2">
                <option value="">Select category</option>
                <option value="Necklace">Necklace</option>
                <option value="Chain">Chain</option>
                <option value="Pendant">Pendant</option>
                <option value="Bangle">Bangle</option>
                <option value="Earring">Earring</option>
                <option value="Ring">Ring</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stockQuantity">Stock Quantity</Label>
              <Input id="stockQuantity" name="stockQuantity" type="number" value={form.stockQuantity} onChange={onChange} placeholder="Stock remaining" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="releaseDate">Release Date</Label>
              <Input id="releaseDate" name="releaseDate" type="date" value={form.releaseDate} onChange={onChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <Input id="image" name="image" type="file" accept="image/*" onChange={onImage} />
            </div>

            <div className="flex items-center gap-2">
              <input id="productAvailable" name="productAvailable" type="checkbox"
                checked={form.productAvailable} onChange={onChange} className="h-4 w-4" />
              <Label htmlFor="productAvailable" className="cursor-pointer">Product Available</Label>
            </div>

            <div className="md:col-span-2">
              <Button type="submit" disabled={submitting} className="w-full md:w-auto">
                {submitting ? "Submitting..." : "Create Product"}
              </Button>
            </div>
          </form>

          <p className="mt-4 text-xs text-muted-foreground">
            Mode: <code>{MULTIPART_MODE}</code> → POST <code>{API_BASE}{CREATE_PATH}</code>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
