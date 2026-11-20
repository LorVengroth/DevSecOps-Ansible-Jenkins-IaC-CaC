"use client";

import Link from "next/link";
import { Product } from "@/types/product";

interface Props {
  product: Product;
  onDelete: (id: string) => void;
}

export default function ProductCard({
  product,
  onDelete,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="flex h-44 items-center justify-center bg-gray-100">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>

      <div className="space-y-3 p-4">
        <div>
          <h2 className="text-lg font-semibold">
            {product.title}
          </h2>

          <p className="text-sm text-gray-500">
            {product.subtitle}
          </p>
        </div>

        <div className="flex justify-between">
          <span className="font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </span>

          <span className="text-sm text-gray-500">
            Stock: {product.stock ?? 0}
          </span>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/products/${product.id}/edit`}
            className="rounded bg-blue-600 px-4 py-2 text-sm text-white"
          >
            Edit
          </Link>

          <button
            onClick={() => onDelete(product.id)}
            className="rounded bg-red-600 px-4 py-2 text-sm text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}