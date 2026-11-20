"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { Product, ProductRequest } from "@/types/product";

import {
  createProduct,
  updateProduct,
} from "@/features/serviices/product.service";

interface Props {
  product?: Product;
}

export default function ProductForm({ product }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: product?.title ?? "",
    subtitle: product?.subtitle ?? "",
    image: product?.image ?? "",
    price: String(product?.price ?? ""),
    // category: product?.category ?? "",
    stock: String(product?.stock ?? 0),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField(
    field: keyof typeof form,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data: ProductRequest = {
      title: form.title.trim(),
      subtitle: form.subtitle,
      image: form.image,
      price: Number(form.price),
    //   category: form.category,
      stock: Number(form.stock),
    };

    if (
      !data.title ||
      form.price.trim() === "" ||
      !Number.isFinite(data.price) ||
      data.price < 0 ||
      !Number.isInteger(data.stock) ||
      data.stock! < 0
    ) {
      setError("Please enter valid product information.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      if (product) {
        await updateProduct(product.id, data);
      } else {
        await createProduct(data);
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Save failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-xl space-y-4 rounded-xl border bg-white p-6"
    >
      <h1 className="text-2xl font-bold">
        {product ? "Edit Product" : "Add Product"}
      </h1>

      {(
        [
          ["title", "Product Title"],
          ["subtitle", "Subtitle"],
          ["image", "Image URL"],
        //   ["category", "Category"],
          ["price", "Price"],
          ["stock", "Stock"],
        ] as const
      ).map(([field, label]) => (
        <div key={field}>
          <label
            htmlFor={field}
            className="mb-1 block text-sm font-medium"
          >
            {label}
          </label>

          <input
            id={field}
            type={
              field === "price" || field === "stock"
                ? "number"
                : field === "image"
                  ? "url"
                  : "text"
            }
            step={field === "price" ? "0.01" : undefined}
            min={
              field === "price" || field === "stock"
                ? "0"
                : undefined
            }
            required={field === "title" || field === "price"}
            value={form[field]}
            onChange={(e) => updateField(field, e.target.value)}
            className="w-full rounded-lg border p-3"
          />
        </div>
      ))}

      {error && (
        <p role="alert" className="text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Product"}
      </button>
    </form>
  );
}